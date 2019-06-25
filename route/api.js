/*
    Web Framework : EXPRESS
*/
const express = require('express'); //express 웹 프레임 워크

//path
const path = require('path');   // extname() : 확장자 파싱 , join() : 경로 쉽게


/*
    Data Base : MY SQL
*/
const mysql = require('mysql');     //mysql
// const mariadb = require('mariadb');     //maria
let dbconfig = require(__dirname+'/../config/db-config.json');  //mysql config
let connection = mysql.createPool(dbconfig);              //mysql connection : createConnection => createPool 로 수정(heroku db가 자주 끊겨서..) => 커넥션은 여러 쿼리를 단일하게 연결, 풀은 여러 쿼리를 끊임없이 병렬처리하기때문이라나?

/*
    Router
*/
const apiRouter = express.Router();
// var exec = require("child_process").exec;

/*
    AWS S3, Multer : 파일 업로드 (파일은 AWS S3 버킷에 저장, 파일업로드는 Multer 라이브러리로 해결)
*/
const AWS = require("aws-sdk");     //AWS SDK
AWS.config.loadFromPath(__dirname + "/../config/awsconfig.json");   //AWS config (AWS key파일 경로)
let s3 = new AWS.S3();         //AWS S3 서비스를 이용하기 위한 AWS S3 객체

const FILE_PATH = '';
const multer = require('multer');
const multerS3= require('multer-s3');
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "codelinkupload",
        key: function (req, file, cb) {
             const extension = path.extname(file.originalname);
             const FILE_PATH= Date.now().toString() + extension;
             cb(null, FILE_PATH);
        },
        acl: 'public-read-write',
    })
})

//아래는 AWS S3가 아닌, 현 서버에 파일 업로드시 썻던 코드 ( Heroku는 파일 업로드하기에 부적합하기에 AWS S3에 파일 업로드하기로 결정)
// const upload = multer({ // 타임스탬프 + 파일네임으로 저장하게끔
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'upload/');
//     },
//     filename: function (req, file, cb) {
//       cb(null, new Date().valueOf() + "_" + file.originalname);
//     }
//   }),
// });


//================api==========

apiRouter.get('/dw', (req, res) => {
    res.json({
        session :req.session
    })
})
// URL : /api/getuser
apiRouter.get('/getuser', (req, res) => {
    const session = req.session;
    console.log('session=', session);
    if(session.loginInfo === undefined) {
        res.status(401).json({
            error : "session does not exists"
        });
    }
    res.json(req.session.loginInfo);
});


// URL : /api/admin/login
apiRouter.post('/admin/login', (req, res) => {
    const sql = "SELECT * FROM ADMIN WHERE ID = ?";
    const params = [req.body.reqId];

    connection.query(sql, params, (err, rows) => {
        if(err) throw err;
        console.log(params);
        if(rows.length) {
            console.log(rows[0]);
            if(req.body.reqPw === rows[0].pw) {

                let session = req.session;
                session.loginInfo = {
                    type : 'admin',
                    seq : rows[0].seq,
                    id : rows[0].id,
                    name : rows[0].name,
                    permission : rows[0].permission,
                    profile : '',
                    point : ''                    
                };
                res.json({
                    success : true,
                    ...session.loginInfo
                })
            } else {
                res.status(401).json({
                    error : "PASSWORD IS NOT CORRECT"
                })
            }
        } else {
            res.status(401).json({
                error : "ID IS NOT CORRECT"
            });
        }

    });  
});

// URL : /api/counselor/login
apiRouter.post('/counselor/login', (req, res) => {

    let sql = "SELECT * FROM COUNSELOR WHERE ID = ?";
    let params = [req.body.reqId];

    connection.query(sql, params, (err, rows) => {
        if(err) throw err;

        if(rows.length) {

            if(req.body.reqPw === rows[0].pw) {
                console.log("@@@@@@@2 ", rows[0])
                if(rows[0].approval === 0) {
                    return res.status(401).json({
                        error : "NOT ALLOWED"
                    })
                }
                let session = req.session;
                session.loginInfo = {
                    type : 'counselor',
                    seq : rows[0].seq,
                    id : rows[0].id,
                    name : rows[0].name,
                    point : rows[0].point,
                    profile : rows[0].profile
                };
                console.log('counselor login => ', session.loginInfo);

                sql = `update counselor set status = 1 where seq=?`
                params = [rows[0].seq];
                connection.query(sql, params, (err, rows) => {
                    if (err) throw err;

                    if(rows.affectedRows > 0) {
                        res.json({
                            success : true,
                            ...session.loginInfo
                        })
                    } else {
                        res.status(401).json({
                            error : "PASSWORD IS NOT CORRECT"
                        })
                    }
                });
            } else {
                res.status(401).json({
                    error : "PASSWORD IS NOT CORRECT"
                })
            }
        } else {
            res.status(401).json({
                error : "ID IS NOT CORRECT"
            });
        }

    });  
});

// URL : /api/member/login
apiRouter.post('/member/login', (req, res) => {

    const sql = "SELECT * FROM MEMBER WHERE ID = ?";
    const params = [req.body.reqId];

    connection.query(sql, params, (err, rows) => {
        if(err) throw err;

        if(rows.length) {
            console.log(rows[0].id);
            if(req.body.reqPw === rows[0].pw) {

                let session = req.session;
                session.loginInfo = {
                    type : 'member',
                    seq : rows[0].seq,
                    id : rows[0].id,
                    name : rows[0].name,
                    point : rows[0].point,
                    profile : rows[0].profile
                };
                console.log('member login => ', session.loginInfo);
                res.json({
                    success : true,
                    ...session.loginInfo
                });
            } else {
                res.status(401).json({
                    error : "PASSWORD IS NOT CORRECT"
                })
            }
        } else {
            res.status(401).json({
                error : "ID IS NOT CORRECT"
            });
        }

    });  
});

// URL : /api/member/signup
apiRouter.post('/member/signup', (req, res) => {
    const sql = "INSERT INTO MEMBER(ID, PW, NAME, PHONE, BIRTH, GENDER) VALUES(?,?,?,?,?,?)";
    const params = [req.body.id, req.body.pw1, req.body.name, req.body.phone, req.body.birth, req.body.gender];

    connection.query(sql, params, (err, result) => {
        if(err) throw err;

        if(result.affectedRows === 1) {
            res.json({
                result : 'SUCCESS'
            });
        } else {
            res.status(401).json({
                result : 'FAILURE'
            });
        }
    });
});

// URL : /api/counselor/signup
apiRouter.post(
    '/counselor/signup', 
    upload.fields([
        {name : 'profile', maxCount : 1}, //name이 profile이엇던 파일
        {name : 'license', maxCount : 1},//name이 license이엇던 파일
        {name : 'education', maxCount : 1}//name이 education이엇던 파일
    ]) , (req, res) => {
    // ex ) upload.single('img') = >폼데이터의 속성명이 img이거나 폼 태그 인풋의 name이 img인 파일 하나를 받겠다는 뜻
    //파일은 req.files로 접근가능하고 파일들은 req.files[name][0]로 접근 가능  파일이 아닌 나머지 텍스트인풋들은 req.body로 접근
    let sql = "INSERT INTO COUNSELOR(ID, PW, NAME, PHONE, BIRTH, GENDER, PROFILE, COMMENT) VALUES(?,?,?,?,?,?,?,?)";
    const profilePath = req.files['profile'][0].location;
    let params = [req.body.id, req.body.pw, req.body.name, req.body.phone, req.body.birth, req.body.gender, profilePath, req.body.comment];
    let insertedSeq = null;
    
    // 1. 상담원 테이블에 데이터 삽입
    connection.query(sql, params, (err, result) => {
        if(err) throw err;

        if(result.affectedRows > 0) {
            insertedSeq = result.insertId;
            //2. 자격증 테이블에 데이터 삽입
            sql = "INSERT INTO LICENSE(counselor_seq, serial_no, name, path) VALUES(?,?,?,?)";
            const licensePath = req.files['license'][0].location;
            params = [insertedSeq, req.body.licenseNo, req.body.licenseName, licensePath];
            connection.query(sql, params, (err, result) => {
                if(err) throw err;

                if(result.affectedRows > 0) {
                    //3. 학위 테이블에 데이터 삽입
                    sql = "INSERT INTO EDUCATION(COUNSELOR_SEQ, DEGREE, SCHOOL, MAJOR, GRADUATED, PATH) VALUES(?,?,?,?,?,?)";
                    const educationPath = req.files['education'][0].location;
                    params = [insertedSeq, req.body.degree, req.body.school, req.body.major, req.body.graduated, educationPath];
                    connection.query(sql, params, (err, result) => {
                        if(err) throw err;

                        if(result.affectedRows > 0) {
                            // 세 가지 쿼리 완료후 success 응답
                            res.json({
                                result : 'SUCCESS'
                            });
                        } else {
                            res.status(401).json({
                                result : 'FAILURE'
                            });
                        }
                    });
                } else {
                    res.status(401).json({
                        result : 'FAILURE'
                    });
                }
            });
        } else {
            res.status(401).json({
                result : 'FAILURE'
            });
        }
    });
});

// URL : /api/member/validate
apiRouter.get('/member/validate', (req, res) => {
    const sql = "SELECT ID FROM MEMBER WHERE ID = ?";
    const params = [req.query.id];
    
    connection.query(sql, params, (err, rows) => {
        if(err) throw err;

        if(rows.length > 0) {
            res.json({
                result : 'EXISTS'
            });
        } else {
            res.json({
                result : 'NOT EXISTS'
            });
        }
    });
});


// URL : /api/counselor/validate
apiRouter.get('/counselor/validate', (req, res) => {
    const sql = "SELECT ID FROM COUNSELOR WHERE ID = ?";
    const params = [req.query.id];
    
    connection.query(sql, params, (err, rows) => {
        if(err) throw err;

        if(rows.length > 0) {
            res.json({
                result : 'EXISTS'
            });
        } else {
            res.json({
                result : 'NOT EXISTS'
            });
        }
    });
});


/*
======================================== End of Authentacation ===========================================
*/

// api/get/categories : 상담원 찾기를 할 때 카테고리 리스트를 얻어오기 위해 필요한 API
apiRouter.get('/get/categories', (req, res) => {
    const sql = 'select name from category';
    
    connection.query(sql, (err, result, fields) => {
        if(err) throw err;
        if(result.length > 0) {
            res.json({
                categories : result
            });
        } else {
            res.status(401).json({
                error : true
            });
        }
    }) 
});

// api/get/counselings/byname : 이름으로 검색하여 상담원 리스트들을 얻어올때 필요한 API
apiRouter.get('/get/counselings/byname', (req, res) => {
    const sql =`select *
    from counselor, registered_counseling, schedule
    where counselor.seq = registered_counseling.counselor_seq and counselor.seq = schedule.counselor_seq
    and schedule.date > now() and counselor.name like ?
    group by counselor.seq`

    const params = (req.query.name === '') 
                    ? [''] //공백으로 입력이 들어왔을때 파라미터값이 '%' 가 되는 것을 방지
                    : `%` + [req.query.name] + '%';
    connection.query(sql, params, (err, result) => {
        if(err) throw err;
        
        if(result.length > 0) {
            res.json({
                counselings : result
            });
        } else {
            res.status(401).json({
                error : 'no data'
            });
        }
    }) 
});

//  /api/get/counselings/bycategory : 상담 카테고리별로 상담원 리스트들을 얻어올때 필요한 API
apiRouter.get('/get/counselings/bycategory', (req, res) => {
    const sql = 'select * ' +
                'from counselor, registered_counseling, schedule ' +
                'where counselor.seq = registered_counseling.counselor_seq and counselor.seq = schedule.counselor_seq' +
                ` and schedule.date > now() and registered_counseling.category = ?` +
                ' group by counselor.seq';

    
    const params = [req.query.category];
    connection.query(sql, params, (err, result) => {
        if(err) throw err;
        if(result.length > 0) {
            res.json({
                counselings : result
            });
        } else {
            res.status(401).json({
                error : 'no data'
            });
        }
    }) 
});

// /api/get/counselor/category : 상담예약 버튼 눌렀을때 나오는 화면 중간에 상담원이 등록했던 상담 카테고리 리스트를 위한 API
apiRouter.get('/get/counselor/category', (req, res) => {
    const sql = `select * from registered_counseling where counselor_seq = ?`;
    const params = [req.query.counselorSeq];
    connection.query(sql, params, (err, result) => {
        if (err) throw err;
        if(result.length > 0) {
            console.log(result);
            return res.json({
                categories : result
            });
        }else {
            return res.status(401).json({
                error : 'no data'
            });
        }
    })
});


// /api/get/counseorInfo : 상담예약 버튼 눌렀을때 나오는 화면의 최상단에 상담원 정보 관련 API
apiRouter.get('/get/counselorInfo', (req, res) => {
    // const sql = `select counselor.seq as 'counselor_seq', id, pw, counselor.name as 'counselor_name', phone, birth, gender, profile, comment, education.seq as 'education_seq', degree, school, major, graduated, education.path as 'education_path', license.seq as 'license_seq', serial_no, license.name as 'license_name', license.path as 'license_path', schedule.seq as 'schedule_seq', t0900, t0930, t1000, t1030, t1100, t1130, t1200, t1230, t1300, t1330, t1400, t1430, t1500, t1530, t1600, t1630, t1700, t1730
    // from counselor, education, license, schedule
    // where counselor.seq = education.counselor_seq and counselor.seq = license.counselor_seq and counselor.seq = schedule.counselor_seq and counselor.seq = ?;`;
    const sql = `select counselor.seq as 'counselor_seq', id, pw, counselor.name as 'counselor_name', phone, birth, gender, profile, comment, education.seq as 'education_seq', degree, school, major, graduated, education.path as 'education_path', license.seq as 'license_seq', serial_no, license.name as 'license_name', license.path as 'license_path'
    from counselor, education, license
    where counselor.seq = education.counselor_seq and counselor.seq = license.counselor_seq and counselor.seq = ?;`;
    const params = [req.query.counselorSeq];
    connection.query(sql, params, (err, result) => {
        if (err) throw err;
        console.log(params, result);
        if(result.length > 0) {
            return res.json({
                counselorInfo : result[0]
            });
        }else {
            return res.status(401).json({
                error : 'no data'
            });
        }
    })
});

// /api/get/counselor/schedule : 상담 예약 두번째 절차중에 상담사가 등록한 상담 스케줄(시간대) 정보 관련 API
apiRouter.get('/get/counselor/schedule', (req, res) => {
    //당일 예약이 불가하기 때문에
    //내일 스케쥴을 뽑아옴
    const sql = `select t0900, t0930, t1000, t1030, t1100, t1130, t1200, t1230, t1300, t1330, t1400, t1430, t1500, t1530, t1600, t1630, t1700, t1730, DATE_FORMAT(date, '%Y-%m-%d') as date, DAYOFWEEK(date) as week
    from schedule
    where counselor_seq = ? and date > now()
    order by date asc;`;

    const params = [req.query.counselorSeq];
    connection.query(sql, params, (err, result) => {
        if (err) throw err;

        if(result.length > 0) {
            return res.json({
                schedules : result
            });
        }else {
            return res.status(401).json({
                error : 'no data'
            });
        }
    })
});

apiRouter.post("/member/reservation", (req, res) => {

    const {category, date, week, time, message, counselor_seq, member_seq, schedule_seq} = req.body;
    let params = [member_seq, counselor_seq, date, time, message, category];
    let sql = 'insert into counseling(member_seq, counselor_seq, date, time, message, category) values(?,?,?,?,?,?)';
    connection.query(sql, params, (err, result) => {
        if (err) throw err;

        if(result.affectedRows > 0) {   //inserting counseling is done.
            const parsedTime = 't' + time.substring(0, 2) + time.substring(3, 5);   //컬럼 이름 생성(ex : t0900)
            sql = `update schedule set ${parsedTime}=2 where counselor_seq=? and date=?`;
            params = [counselor_seq, date];
            connection.query(sql, params, (err, result) => {
                if (err) throw err;

                if(result.affectedRows > 0) {
                    res.json({
                        result : 'SUCCESS'
                    })
                } else {

                    res.status(401).json({
                        result : 'FAILURE'
                    })
                }
            });
        } else {
            res.status(401).json({
                result : 'FAILURE'
            })
        }
    })
})

// /api/get/mycounseling : 상담원이 자신의 상담예약 리스트를 뽑아올때 필요한 API
apiRouter.get('/get/mycounseling', (req, res) => {
    const sql = 'select counseling.seq, member_seq, counselor_seq, member.name, time, message, category, DATE_FORMAT(date, "%Y-%m-%d") as date, done from counseling, member where member.seq = counseling.member_seq and counselor_seq = ? order by date asc;';
    const params = [req.query.seq];

    connection.query(sql, params, (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            res.json({
                counselings : result,
                result : 'SUCCESS'
            })
        } else {
            res.json({
                counselings : null,
                result : 'FAILURE'
            })
        }
    })
});

// /api/get/memberinfo : 상담원이 상담 리스트를 클릭했을때 해당 상담을 예약한 고객정보를 가져올때 쓰이는 API
apiRouter.get('/get/memberinfo', (req, res) => {
    const sql = 'select seq, id, name, phone, DATE_FORMAT(birth, "%Y-%m-%d") as birth, gender from member where member.seq = ?';
    const params = [req.query.seq];

    connection.query(sql, params, (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            res.json({
                memberInfo : result[0],
                result : 'SUCCESS'
            })
        } else {
            res.json({
                memberInfo : null,
                result : 'FAILURE'
            })
        }
    })
});

// /api/get/counselinghistory : 상담원이 상담 리스트를 클릭했을때 해당 상담을 예약한 고객정보를 가져올때 쓰이는 API
apiRouter.get('/get/counselinghistory', (req, res) => {
    const sql = "select seq, member_seq, counselor_seq, DATE_FORMAT(date, '%Y-%m-%d')as date, time, memo from counseling_history where member_seq=? and counselor_seq=? order by date desc, time desc, seq desc";
    const params = [req.query.memberseq, req.query.counselorseq];

    connection.query(sql, params, (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            res.json({
                histories : result,
                result : 'SUCCESS'
            })
        } else {
            res.json({
                histories : null,
                result : 'FAILURE'
            })
        }
    })
});

// /api/counselor/save/history
apiRouter.post("/counselor/save/history", (req, res) => {

    const {memberSeq, counselorSeq, date, time, memo} = req.body;
    console.log(req.body.memberSeq);
    let params = [memberSeq, counselorSeq, date, time, memo];
    let sql = 'insert into counseling_history(member_seq, counselor_seq, date, time, memo) values(?,?,?,?,?);';

    connection.query(sql, params, (err, result) => {
        if (err) throw err;

        if(result.affectedRows > 0) {   //inserting counseling is done.
            res.json({
                result : 'SUCCESS'
            })
        } else {
            res.status(401).json({
                result : 'FAILURE'
            })
        }
    })
})


// /api/counselor/add/category  : 상담사가 카테고리 등록할때 필요한 API
apiRouter.post("/counselor/add/category", (req, res) => {

    const {counselorSeq, category} = req.body;
    let params = [counselorSeq, category];
    let sql = 'insert into registered_counseling values(null, ?, ?)';

    connection.query(sql, params, (err, result) => {
        if (err) throw err;
        console.log('Add');

        if(result.affectedRows > 0) {   //inserting counseling is done.
            res.json({
                result : 'SUCCESS'
            })
        } else {
            res.status(401).json({
                result : 'FAILURE'
            })
        }
    })
})

// /api/counselor/drop/category  : 상담사가 카테고리 등록취소할때 필요한 API
apiRouter.post("/counselor/drop/category", (req, res) => {

    const {counselorSeq, category} = req.body;
    let params = [counselorSeq, category];
    let sql = 'delete from registered_counseling where counselor_seq=? and category=?';

    connection.query(sql, params, (err, result) => {
        if (err) throw err;
        console.log('Drop');

        if(result.affectedRows > 0) {   //inserting counseling is done.
            res.json({
                result : 'SUCCESS'
            })
        } else {
            res.status(401).json({
                result : 'FAILURE'
            })
        }
    })
})

// /api/get/mycounseling/bydate : 상담원이 날짜에 따른 자신의 상담예약 리스트를 뽑아올때 필요한 API
apiRouter.get('/get/mycounseling/bydate', (req, res) => {
    const sql = 'select counseling.seq, member_seq, counselor_seq, member.name, time, message, category, DATE_FORMAT(date, "%Y-%m-%d") as date '+
    'from counseling, member '+
    'where '+
    'member.seq = counseling.member_seq '+
    'and '+
    'counselor_seq = ? '+
    'and '+
    'date = ?'+
    'order by time asc;';
    const params = [req.query.seq, req.query.date];

    connection.query(sql, params, (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            res.json({
                counselings : result,
                result : 'SUCCESS'
            })
        } else {
            res.json({
                counselings : null,
                result : 'FAILURE'
            })
        }
    })
});


// /api/get/mycategory : 상담원이 카테고리 등록을 할때 자신이 등록한 것들을 가져오기 위한 API
apiRouter.get('/get/mycategory', (req, res) => {
    const sql = 'select * from registered_counseling where counselor_seq = ?;';
    const params = [req.query.seq];
    connection.query(sql, params, (err, result) => {
        if (err) throw err;
        
        if (result.length > 0) {
            res.json({
                myCategories : result,
                result : 'SUCCESS'
            })
        } else {
            res.json({
                myCategories : null,
                result : 'FAILURE'
            })
        }
    })
});

// /api/get/myschedule : 상담원이 일정 등록을 할때 날짜별 일정을 불러올때 사용되는 API
apiRouter.get('/get/myschedule', (req, res) => {
    const sql = 'select * from schedule where counselor_seq = ? and date = ?';
    const params = [req.query.counselorSeq, req.query.date];

    connection.query(sql, params, (err, result) => {
        if (err) throw err;
        console.log(params);
        if (result.length > 0) {
            res.json({
                schedules : result[0],
                result : 'SUCCESS'
            })
        } else {
            res.json({
                schedules : null,
                result : 'FAILURE'
            })
        }
    })
});


// /api/counselor/makecounseling  : 상담사가 일정을 등록할때 필요한 API
apiRouter.post("/counselor/makecounseling", (req, res) => {

    const {counselorSeq, date} = req.body;
    let sql = 'insert into schedule values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    let params = [
        counselorSeq, 
        date,
        req.body.tv1, req.body.tv2, req.body.tv3, req.body.tv4, req.body.tv5,
        req.body.tv6, req.body.tv7, req.body.tv8, req.body.tv9, req.body.tv10,
        req.body.tv11, req.body.tv12, req.body.tv13, req.body.tv14, req.body.tv15,
        req.body.tv16, req.body.tv17, req.body.tv18
    ];

    connection.query(sql, params, (err, result) => {
        if (err) throw err;
        console.log('Add');

        if(result.affectedRows > 0) {   
            res.json({
                result : 'SUCCESS'
            })
        } else {
            res.json({
                result : 'FAILURE'
            })
        }
    })
})

// /api/get/mycategory : 상담원이 카테고리 등록을 할때 자신이 등록한 것들을 가져오기 위한 API
apiRouter.get('/get/mycategory', (req, res) => {
    const sql = 'select * from registered_counseling where counselor_seq = ?;';
    const params = [req.query.seq];
    connection.query(sql, params, (err, result) => {
        if (err) throw err;
        
        if (result.length > 0) {
            res.json({
                myCategories : result,
                result : 'SUCCESS'
            })
        } else {
            res.json({
                myCategories : null,
                result : 'FAILURE'
            })
        }
    })
});


// /api/counselor/edit/schedule  : 상담사가 일정을 수정할때 필요한 API
apiRouter.post("/counselor/edit/schedule", (req, res) => {

    const {colname, colvalue, seq, date} = req.body;
    let sql = `update schedule set ${colname} = ${colvalue} where counselor_seq=? and date=?;`;
    let params = [seq,date];

    connection.query(sql, params, (err, result) => {
        if (err) throw err;
        
        if(result.affectedRows > 0) {   
            res.json({
                result : 'SUCCESS'
            })
        } else {
            res.json({
                result : 'FAILURE'
            })
        }
    })
})

// /api/add/blacklist  : 블랙리스트 추가
apiRouter.post("/add/blacklist", (req, res) => {

    const {memberSeq, counselorSeq, date, time} = req.body;
    let sql = `insert into blacklist(member_seq, counselor_seq) values(?,?)`;
    let params = [memberSeq, counselorSeq];

    connection.query(sql, params, (err, result) => {
        if (err) throw err;
        
        if(result.affectedRows > 0) {   
            sql = 'delete from counseling where member_seq=? and counselor_seq=?';
            let params = [memberSeq, counselorSeq];
            connection.query(sql, params, (err, result) => {
                if (err) throw err;
                if(result.affectedRows > 0) {
                    console.log(req.body);
                    sql = `update schedule set ${time} = 1 where counselor_seq=? and date=?`;
                    let params = [counselorSeq, date];
                    connection.query(sql, params, (err, result) => {
                        if (err) throw err;
                        if(result.affectedRows > 0) {
                            res.json({
                                result : 'SUCCESS'
                            })
                        } else {
                            res.json({
                                result : 'FAILURE'
                            })                            
                        }
                    });
                } else {
                    res.json({
                        result : 'FAILURE'
                    })
                }
            });
        } else {
            res.json({
                result : 'FAILURE'
            })
        }
    })
})


// /api/customer/get/reservation : 고객이 자신의 상담내역을 가져올때 쓰이는 API
apiRouter.get('/customer/get/reservation', (req, res) => {
    const sql = "select counseling.seq, counselor.name, counselor.profile, counseling.done, DATE_FORMAT(date, '%Y-%m-%d') as date, time " + 
    'from counseling, counselor ' +
    'where ' +
    'counseling.counselor_seq = counselor.seq ' +
    'and '+
    'counseling.member_seq = ?;'

    const params = [
        req.query.seq, 
    ];
    console.log(params);
    connection.query(sql, params, (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            res.json({
                reservations : result,
                result : 'SUCCESS'
            })
        } else {
            res.json({
                reservations : null,
                result : 'FAILURE'
            })
        }
    })
});

// /api/get/customer/questions
apiRouter.get('/get/customer/questions', (req, res) => {
    const VIEW_PER_PAGE = 4;
    const {pageNum} = req.query;
    const sql = `select * ` +
    `from  basic_qna ` +
    `where bGroup <= (select max(bGroup) from basic_qna) - ? ` +
    `and bGroup > (select max(bGroup) from basic_qna) - ? ` +
    `order by bGroup desc, bLevel asc`;
    const params = [((pageNum-1)*(VIEW_PER_PAGE*10)), ((pageNum)*(VIEW_PER_PAGE*10))];
    connection.query(sql, params, (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            res.json({
                questions : result,
                result : 'SUCCESS'
            })
        } else {
            res.json({
                questions : null,
                result : 'FAILURE'
            })
        }
    })
});

// /api/get/question/maxpage
apiRouter.get('/get/question/maxpage', (req, res) => {
    const sql = `select count(*) as 'total' from basic_qna;`
    connection.query(sql, (err, rows) => {
        if (err) throw err;

        if (rows) {
            const total = rows[0].total;
            const VIEW_PER_PAGE = 4;
            let maxPage = parseInt(total / VIEW_PER_PAGE);
            if (total % VIEW_PER_PAGE > 0)
                maxPage = maxPage+1;
            res.json({
                maxPage,
                result : 'SUCCESS'
            })
        } else {
            res.json({
                result : 'FAILURE'
            })
        }
    })
});


// /api/customer/submit/question  : 고객이 이용 문의글을 올릴때 쓰이는 API
apiRouter.post("/customer/submit/question", (req, res) => {

    const {id, name, title, content} = req.body;
    
    const sql = `insert `+
    `into basic_qna(bWriter, bName, bTitle, bContent, bDate, bGroup, bLevel, bIndent) ` +  
    `values (?,?,?,?,?, IFNULL((select * from (select max(bGroup)+10 from basic_qna) next), 2), 0, 0);`;
    const date = new Date();
    let params = [id, name, title, content, date];
    connection.query(sql, params, (err, result) => {
        if (err) throw err;
        
        if(result.affectedRows > 0) {   
            res.json({
                result : 'SUCCESS'
            })
        } else {
            res.json({
                result : 'FAILURE'
            })
        }
    })
})

// /api/customer/submit/reply  : 고객 이용 문의글 답변에 쓰이는 API
apiRouter.post("/customer/submit/reply", (req, res) => {

    const {bLevel, bGroup, id, name, title, content} = req.body;
    
    let sql = `update basic_qna set bLevel = ? where bGroup = ? and bLevel > ?`;
    let params = [bLevel+1, bGroup, bLevel];
    const date = new Date();
    console.log(req.body);
    connection.query(sql, params, (err, result) => {
        if(err) throw err;
        
        sql = `insert into basic_qna(bWriter, bName, bTitle, bContent, bDate, bGroup, bLevel, bIndent) ` +
        `values (?,?,?,?,?,?,?,?)`;
        params = [id, name, title, content, date, bGroup, bLevel+1, bLevel+1];
        connection.query(sql, params, (err, result) => {
            if (err) throw err;

            if(result.affectedRows > 0) {
                res.json({
                    result : 'SUCCESS'
                })
            } else {
                res.json({
                    result : 'FAILURE'
                })
            }
        });
    })
})

// /api/get/customer/question : 이용 문의 글 불러오기
apiRouter.get('/get/customer/question', (req, res) => {
    const sql = 'select * from basic_qna where bId=?';
    const params = [req.query.bId];

    console.log(params);
    connection.query(sql, params, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json({
                question : result[0],
                result : 'SUCCESS'
            })
        } else {
            res.json({
                question : null,
                result : 'FAILURE'
            })
        }
    })
});




// /api/get/counseling/question : 상담 문의 글 불러오기
apiRouter.get('/get/counseling/question', (req, res) => {
    const sql = 'select * from counseling_qna where bId=?';
    const params = [req.query.bId];

    console.log(params);
    connection.query(sql, params, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json({
                question : result[0],
                result : 'SUCCESS'
            })
        } else {
            res.json({
                question : null,
                result : 'FAILURE'
            })
        }
    })
});

// /api/confirm/blacklist
apiRouter.get('/confirm/blacklist', (req, res) => {
    const sql = 'select * from blacklist where counselor_seq=? and member_seq=?';
    const {counselorSeq, memberSeq} = req.query;
    const params = [counselorSeq, memberSeq];

    console.log(params);
    connection.query(sql, params, (err, result) => {
        if (err) throw err;
        console.log(result);
        if (result.length > 0) {
            res.json({
                result : 'BLACK'
            })
        } else {
            res.json({
                result : 'NOT'
            })
        }
    })
});


// /api/counselor/complete/counseling  : 상담사가 상담종료버튼을 클릭했을때 상담종료처리 해주는 API
apiRouter.post("/counselor/complete/counseling", (req, res) => {

    const {seq} = req.body;
    let sql = `update counseling set done = 1 where seq = ?`;
    let params = [seq];
    console.log(seq);

    connection.query(sql, params, (err, result) => {
        if (err) throw err;
        
        if(result.affectedRows > 0) {   
            res.json({
                result : 'SUCCESS'
            })
        } else {
            res.json({
                result : 'FAILURE'
            })
        }
    })
})

// /api/get/customer/byid
apiRouter.get('/get/customer/byid', (req, res) => {
    const sql = 'select seq,id,name,phone,DATE_FORMAT(birth,"%y-%m-%d") as birth,gender from member where id=?';
    const {id} = req.query;
    const params = [id];
    console.log(params);
    connection.query(sql, params, (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            res.json({
                customer : result[0],
                result : 'SUCCESS'
            })
        } else {
            res.json({
                customer : null,
                result : 'FAILURE'
            })
        }
    });
});


// /api/get/customer/byname
apiRouter.get('/get/customer/byname', (req, res) => {
    const sql = 'select seq,id,name,phone,DATE_FORMAT(birth,"%y-%m-%d") as birth,gender from member where name=?';
    const {name} = req.query;
    const params = [name];

    connection.query(sql, params, (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            res.json({
                customer : result,
                result : 'SUCCESS'
            })
        } else {
            res.json({
                customer : null,
                result : 'FAILURE'
            })
        }
    });
});

// /api/get/counselor/byid
apiRouter.get('/get/counselor/byid', (req, res) => {
    const sql = 'select counselor.seq as seq,id,counselor.name as name,phone,DATE_FORMAT(birth, "%y-%m-%d") as birth, gender, license.name as license, education.school as school, education.degree as degree, education.graduated as graduated, education.major as major, status from counselor, license, education where  counselor.seq = license.counselor_seq and counselor.seq = education.counselor_seq and counselor.id = ?;';
    const {id} = req.query;
    const params = [id];
    console.log(params);
    connection.query(sql, params, (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            res.json({
                counselor : result[0],
                result : 'SUCCESS'
            })
        } else {
            res.json({
                counselor : null,
                result : 'FAILURE'
            })
        }
    });
});


// /api/get/counselor/byname
apiRouter.get('/get/counselor/byname', (req, res) => {
    const sql = 'select counselor.seq as seq,id,counselor.name as name,phone,DATE_FORMAT(birth, "%y-%m-%d") as birth, gender, license.name as license, education.school as school, education.degree as degree, education.graduated as graduated, education.major as major, status from counselor, license, education where  counselor.seq = license.counselor_seq and counselor.seq = education.counselor_seq and counselor.name = ?;';
    const {name} = req.query;
    const params = [name];

    connection.query(sql, params, (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            res.json({
                counselor : result,
                result : 'SUCCESS'
            })
        } else {
            res.json({
                counselor : null,
                result : 'FAILURE'
            })
        }
    });
});

apiRouter.post('/counselor/setstatus', (req,res) => {
    const sql = `update counselor set status = ? where seq = ?`;
    const {status, counselorSeq} = req.body;
    const params = [status, counselorSeq];
    connection.query(sql, params, (err, rows) => {
        if (err) throw err;

        if(rows.affectedRows > 0) {
            res.json({
                result : 'SUCCESS'
            })
        } else {
            res.json({
                result : 'FAILURE'
            })
        }
    });
});


apiRouter.get('/get/counselor/bystatus', (req,res) => {
    const sql = `select counselor.seq as seq,id,counselor.name as name,phone,DATE_FORMAT(birth, "%y-%m-%d") as birth, gender, license.name as license, education.school as school, education.degree as degree, education.graduated as graduated, education.major as major, status from counselor, license, education where  counselor.seq = license.counselor_seq and counselor.seq = education.counselor_seq and counselor.status = ?;`;
    const params = [req.query.status];

    connection.query(sql, params, (err, result) => {
        if(err) throw err;

        if(result.length > 0) {
            res.json({
                result : 'SUCCESS',
                counselors : result
            })
        } else {
            res.json({
                result : 'FAILURE',
                counselors : null 
            })
        }
    })
})

//   /api/logout
apiRouter.get('/logout', (req, res) => {
    let session = req.session;
    
    //상담원 로그아웃의 경우
    // status 변경후 로그아웃처리
    if(session.loginInfo.type === 'counselor') {
        let sql = `update counselor set status = 0 where seq = ?`
        let params = [session.loginInfo.seq];
        connection.query(sql, params, (err, rows) => {
            if (err) throw err;

            if(rows.affectedRows > 0) {
                req.session.destroy();
                res.redirect('/main');
            } else {

            }
        })
    } else {
        req.session.destroy();
        res.redirect('/main');
    }

});

//공지사항 총 페이지 수 계산
apiRouter.get('/get/notice/maxpage', (req, res) => {
    const MAX_VIEW_PER_PAGE = 5;
    const sql = `select count(*) as 'total' from notice;`
    connection.query(sql, (err, rows) => {
        if (err) throw err;
        let maxPage = parseInt(rows[0].total / MAX_VIEW_PER_PAGE);
        if(rows[0].total % MAX_VIEW_PER_PAGE)
            maxPage = maxPage + 1;
            
        if(rows.length) {
            res.json({
                result : 'SUCCESS',
                maxPage
            })
        } else {
            res.json({
                result : 'FAILURE',
                maxPage : null
            })
        }
    });
})

//공지사항 리스트 불러오기
apiRouter.get('/get/notice', (req, res) => {
    const MAX_VIEW_PER_PAGE = 5;

    const {currPage} = req.query;
    const sql = `select * from notice ` +
                `where seq <= (select max(seq) from notice)-((?-1)*${MAX_VIEW_PER_PAGE}*10) and ` + 
                `seq > (select max(seq) from notice)-((?)*${MAX_VIEW_PER_PAGE}*10) ` +
                `order by seq desc;`
    const params = [currPage, currPage];
    connection.query(sql, params, (err, result) => {
        if(err) throw err;

        if(result.length) {
            res.json({
                result : 'SUCCESS',
                notice : result
            })
        } else {
            res.json({
                result : 'FAILURE',
                notice : null
            })
        }
    });
})

//공지사항 1개 불러오기
apiRouter.get('/get/notice/one', (req, res) => {

    const {seq} = req.query;
    const sql = `select * from notice where seq = ?`;
    const params = [seq];
    connection.query(sql, params, (err, result) => {
        if(err) throw err;

        if(result.length) {
            res.json({
                result : 'SUCCESS',
                notice : result[0]
            })
        } else {
            res.json({
                result : 'FAILURE',
                notice : null
            })
        }
    });
})


//공지사항 작성
apiRouter.post('/submit/notice', (req, res) => {

    const {title,content,writer,date} = req.body;
    const sql = `insert into notice(title, content, writer, created) ` +
                `values(?,?,?,?)`;
    const params = [title,content,writer,date];
    connection.query(sql, params, (err, result) => {
        if(err) throw err;

        if(result.affectedRows) {
            res.json({
                result : 'SUCCESS'
            })
        } else {
            res.json({
                result : 'FAILURE'
            })
        }
    });
})


//가입요청중인 상담사리스트 가져오기
apiRouter.get('/get/counselor/approval', (req, res) => {

    const sql = `select counselor.seq as seq,id,counselor.name as name,phone,DATE_FORMAT(birth, "%y-%m-%d") as birth, gender, license.name as license, education.school as school, education.degree as degree, education.graduated as graduated, education.major as major, status from counselor, license, education where  counselor.seq = license.counselor_seq and counselor.seq = education.counselor_seq and counselor.approval = 0;`;
    connection.query(sql, (err, result) => {
        if(err) throw err;

        if(result.length) {
            res.json({
                result : 'SUCCESS',
                counselors : result
            })
        } else {
            res.json({
                result : 'FAILURE',
                counselors : null
            })
        }
    });
})

//가입요청중인 상담사리스트 가져오기
apiRouter.post('/approve/counselor', (req, res) => {

    const {seq} = req.body;
    const sql = `update counselor set approval = 1 where seq = ?`;
    const params = [seq];
    connection.query(sql, params, (err, result) => {

        if(err) throw err;

        if(result.affectedRows) {
            res.json({
                result : 'SUCCESS'
            })
        } else {
            res.json({
                result : 'FAILURE'
            })
        }
    });
})
module.exports = apiRouter;
