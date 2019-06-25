import {createAction, handleActions} from 'redux-actions';
import {Map, List} from 'immutable';
import { GET_COUNSELING } from './counseling';
import {OPEN_MODAL } from './modal';
import axios from 'axios';


const getToday = () => {
    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth()+1<10 ? '0'+(date.getMonth()+1) : date.getMonth()+1}-${date.getDate()<10 ? '0'+date.getDate() : date.getDate()}`;
    return today;
}

const getTimeList = () => {
    const timeList = [
        '09:00 ~ 09:30','09:30 ~ 10:00','10:00 ~ 10:30','10:30 ~ 11:00','11:00 ~ 11:30',
        '11:30 ~ 12:00','12:00 ~ 12:30','12:30 ~ 13:00','13:00 ~ 13:30','13:30 ~ 14:00',
        '14:00 ~ 14:30','14:30 ~ 15:00','15:00 ~ 15:30','15:30 ~ 16:00','16:00 ~ 16:30',
        '16:30 ~ 17:00','17:00 ~ 17:30','17:30 ~ 18:00',
    ];

    return timeList.map( time => {
        const timeObject = {}
        timeObject.time = time;
        timeObject.checked = false;
        return timeObject;
    })

}

const defaultState = Map({
    mode : 'normal',
    getCounselings : Map({
        fetching : false,
        result : null,
        counselings : null,
        selectedDate : getToday()
    }),
    getMemberInfo : Map({
        fetching : false,
        result : null,
        memberInfo : null
    }),
    selectedCounseling : null,
    memo : '',
    getHistories : Map({
        fetching : false,
        result : null,
        histories : null
    }),
    saveMemoAction : Map({
        fetching : false,
        result : null
    }),
    myReserveDate : new Date(),
    makeCounselingDate : new Date(),
    getCounselingsByDate : Map({
        fetching : false,
        result : null,
        counselings : null
    }),
    modal : Map({
        visible : false,
        title : '',
        content : ''
    }),
    getCategories : Map({
        fetching : false,
        result : null,
        categories : null
    }),
    clickCategory : Map({
        fetching : false,
        result : null
    }),
    getMySchedules : Map({
        fetching : false,
        result : null,
        schedules : null
    }),
    makeCounseling : Map({
        fetching : false,
        result : null
    }),
    changeTime : Map({
        fetching : false,
        result : null
    }),
    timeList : getTimeList(),
    snackbar : Map({
        visible : false,
        title : '',
        content : ''
    }),
    getCounselingQuestions : Map({
        fetching : false,
        result : null,
        questions : null
    }),
    getCounselingQuestion : Map({
        fetching : false,
        result : null,
        question : null
    }),
    addBlackList : Map({
        fetching : false,
        result : null
    }),
    callingStatus : Map({
        calling : false,
        hold : false,
        mute : false,
        muteVisible : false,
        holdVisible : false
    }),
    setStatus : Map({
        fetching : false,
        result : null,
        status : 'Available'
    }),
    completeCounseling : Map({
        fetching : false,
        result : null
    })
});


export const GET_MY_COUNSELINGS = 'counselor/GET_MY_COUNSELINGS';
export const GET_MY_COUNSELINGS_SUCCESS = 'counselor/GET_MY_COUNSELINGS_SUCCESS';
export const GET_MY_COUNSELINGS_FAILURE = 'counselor/GET_MY_COUNSELINGS_FAILURE';
export const NEXT_DATE = 'counselor/NEXT_DATE';
export const PREV_DATE = 'counselor/PREV_DATE';
export const SELECT_COUNSELING = 'counselor/SELECT_COUNSELING';
export const GET_MEMBER_INFO = 'counselor/GET_MEMBER_INFO';
export const GET_MEMBER_INFO_SUCCESS = 'counselor/GET_MEMBER_INFO_SUCCESS';
export const GET_MEMBER_INFO_FAILURE = 'counselor/GET_MEMBER_INFO_FAILURE';
export const CHANGE_MEMO = 'counselor/CHANGE_MEMO';
export const GET_HISTORIES = 'counselor/GET_HISTORIES';
export const GET_HISTORIES_SUCCESS = 'counselor/GET_HISTORIES_SUCCESS';
export const GET_HISTORIES_FAILURE = 'counselor/GET_HISTORIES_FAILURE';
export const SAVE_MEMO = 'counselor/SAVE_MEMO';
export const SAVE_MEMO_SUCCESS = 'counselor/SAVE_MEMO_SUCCESS';
export const SAVE_MEMO_FAILURE = 'counselor/SAVE_MEMO_FAILURE';
export const CLICK_RESERVE_DATE = 'counselor/CLICK_RESERVE_DATE';
export const CLICK_COUNSELING_DATE = 'counselor/CLICK_COUNSELING_DATE';
export const GET_MY_COUNSELINGS_BY_DATE = 'counselor/GET_MY_COUNSELINGS_BY_DATE';
export const GET_MY_COUNSELINGS_BY_DATE_SUCCESS = 'counselor/GET_MY_COUNSELINGS_BY_DATE_SUCCESS';
export const GET_MY_COUNSELINGS_BY_DATE_FAILURE = 'counselor/GET_MY_COUNSELINGS_BY_DATE_FAILURE';
export const OPEN_MY_MODAL = 'counselor/OPEN_MY_MODAL';
export const CLOSE_MY_MODAL = 'counselor/CLOSE_MY_MODAL';
export const GET_CATEGORIES = 'counselor/GET_CATEGORIES';
export const GET_CATEGORIES_SUCCESS = 'counselor/GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAILURE = 'counselor/GET_CATEGORIES_FAILURE';
export const CLICK_CATEGORY = 'counselor/CLICK_CATEGORY';
export const CLICK_CATEGORY_SUCCESS = 'counselor/CLICK_CATEGORY_SUCCESS';
export const CLICK_CATEGORY_FAILURE = 'counselor/CLICK_CATEGORY_FAILURE';
export const INITIALIZE_MAKE_COUNSELING = 'counselor/INITIALIZE_MAKE_COUNSELING';
export const INITIALIZE_RESERVATION_STATUS = 'counselor/INITIALIZE_RESERVATION_STATUS';
export const GET_MY_SCHEDULES = 'counselor/GET_MY_SCHEDULES';
export const GET_MY_SCHEDULES_SUCCESS = 'counselor/GET_MY_SCHEDULES_SUCCESS';
export const GET_MY_SCHEDULES_FAILURE = 'counselor/GET_MY_SCHEDULES_FAILURE';
export const CHANGE_MODE = 'counselor/CHANGE_MODE';
export const CLICK_TIME = 'counselor/CLICK_TIME';
export const MAKE_COUNSELING = 'counselor/MAKE_COUNSELING';
export const MAKE_COUNSELING_SUCCESS = 'counselor/MAKE_COUNSELING_SUCCESS';
export const MAKE_COUNSELING_FAILURE = 'counselor/MAKE_COUNSELING_FAILURE';
export const INITIALIZE_TIME_LIST = 'counselor/INITIALIZE_TIME_LIST';
export const CHANGE_TIME = 'counselor/CHANGE_TIME';
export const CHANGE_TIME_SUCCESS = 'counselor/CHANGE_TIME_SUCCESS';
export const CHANGE_TIME_FAILURE = 'counselor/CHANGE_TIME_FAILURE';
export const OPEN_SNACK_BAR = 'counselor/OPEN_SNACK_BAR';
export const CLOSE_SNACK_BAR = 'counselor/CLOSE_SNACK_BAR';
export const GET_COUNSELING_QUESTIONS = 'counselor/GET_COUNSELING_QUESTIONS';
export const GET_COUNSELING_QUESTIONS_SUCCESS = 'counselor/GET_COUNSELING_QUESTIONS_SUCCESS';
export const GET_COUNSELING_QUESTIONS_FAILURE = 'counselor/GET_COUNSELING_QUESTIONS_FAILURE';
export const GET_COUNSELING_QUESTION = 'counselor/GET_COUNSELING_QUESTION';
export const GET_COUNSELING_QUESTION_SUCCESS = 'counselor/GET_COUNSELING_QUESTION_SUCCESS';
export const GET_COUNSELING_QUESTION_FAILURE = 'counselor/GET_COUNSELING_QUESTION_FAILURE';
export const ADD_BLACK_LIST = 'counselor/ADD_BLACK_LIST';
export const ADD_BLACK_LIST_SUCCESS = 'counselor/ADD_BLACK_LIST_SUCCESS';
export const ADD_BLACK_LIST_FAILURE = 'counselor/ADD_BLACK_LIST_FAILURE';
export const CALL = 'counselor/CALL';
export const CALL_FINISH = 'counselor/CALL_FINISH';
export const STOP_CALL = 'counselor/STOP_CALL';
export const SET_HOLD = 'counselor/SET_HOLD';
export const SET_RESUME = 'counselor/SET_RESUME';
export const SET_HOLD_UNVISIBLE = 'counselor/SET_HOLD_UNVISIBLE';
export const SET_MUTE = 'counselor/SET_MUTE';
export const SET_MUTE_UNVISIBLE = 'counselor/SET_MUTE_UNVISIBLE';
export const SET_STATUS = 'counselor/SET_STATUS';
export const SET_STATUS_SUCCESS = 'counselor/SET_STATUS_SUCCESS';
export const SET_STATUS_FAILURE = 'counselor/SET_STATUS_FAILURE';
export const COMPLETE_COUNSELING = 'counselor/COMPLETE_COUNSELING';
export const COMPLETE_COUNSELING_SUCCESS = 'counselor/COMPLETE_COUNSELING_SUCCESS';
export const COMPLETE_COUNSELING_FAILURE = 'counselor/COMPLETE_COUNSELING_FAILURE';



export const getMyCounselings = createAction(GET_MY_COUNSELINGS);
export const getMyCounselingsSuccess = createAction(GET_MY_COUNSELINGS_SUCCESS);
export const getMyCounselingsFailure = createAction(GET_MY_COUNSELINGS_FAILURE);
export const nextDate = createAction(NEXT_DATE);
export const prevDate = createAction(PREV_DATE);
export const selectCounseling = createAction(SELECT_COUNSELING);
export const getMemberInfo = createAction(GET_MEMBER_INFO);
export const getMemberInfoSuccess = createAction(GET_MEMBER_INFO_SUCCESS);
export const getMemberInfoFailure = createAction(GET_MEMBER_INFO_FAILURE);
export const changeMemo = createAction(CHANGE_MEMO);
export const getHistory = createAction(GET_HISTORIES);
export const getHistoriesSuccess = createAction(GET_HISTORIES_SUCCESS);
export const getHistoriesFailure = createAction(GET_HISTORIES_FAILURE);
export const saveMemo = createAction(SAVE_MEMO);
export const saveMemoSuccess = createAction(SAVE_MEMO_SUCCESS);
export const saveMemoFailure = createAction(SAVE_MEMO_FAILURE);
export const clickReserveDate = createAction(CLICK_RESERVE_DATE);
export const clickCounselingDate = createAction(CLICK_COUNSELING_DATE);
export const getMyCounselingsByDate = createAction(GET_MY_COUNSELINGS_BY_DATE);
export const getMyCounselingsByDateSuccess = createAction(GET_MY_COUNSELINGS_BY_DATE_SUCCESS);
export const getMyCounselingsByDateFailure = createAction(GET_MY_COUNSELINGS_BY_DATE_FAILURE);
export const openMyModal = createAction(OPEN_MY_MODAL);
export const closeMyModal = createAction(CLOSE_MY_MODAL);
export const getCategories = createAction(GET_CATEGORIES);
export const getCategoriesSuccess = createAction(GET_CATEGORIES_SUCCESS);
export const getCategoriesFailure = createAction(GET_CATEGORIES_FAILURE);
export const clickCategory = createAction(CLICK_CATEGORY);
export const clickCategorySuccess = createAction(CLICK_CATEGORY_SUCCESS);
export const clickCategoryFailure = createAction(CLICK_CATEGORY_FAILURE);
export const initializeMakeCounselor = createAction(INITIALIZE_MAKE_COUNSELING);
export const initializeReservationStatus = createAction(INITIALIZE_RESERVATION_STATUS)
export const getMySchedules = createAction(GET_MY_SCHEDULES);
export const getMySchedulesSuccess = createAction(GET_MY_SCHEDULES_SUCCESS);
export const getMySchedulesFailure = createAction(GET_MY_SCHEDULES_FAILURE);
export const changeMode = createAction(CHANGE_MODE);
export const clickTime = createAction(CLICK_TIME);
export const makeCounseling = createAction(MAKE_COUNSELING);
export const makeCounselingSuccess = createAction(MAKE_COUNSELING_SUCCESS);
export const makeCounselingFailure = createAction(MAKE_COUNSELING_FAILURE);
export const initializeTimeList = createAction(INITIALIZE_TIME_LIST);
export const changeTime = createAction(CHANGE_TIME);
export const changeTimeSuccess = createAction(CHANGE_TIME_SUCCESS);
export const changeTimeFailure = createAction(CHANGE_TIME_FAILURE);
export const openSnackBar = createAction(OPEN_SNACK_BAR);
export const closeSnackBar = createAction(CLOSE_SNACK_BAR);
export const getCounselingQuestions = createAction(GET_COUNSELING_QUESTIONS);
export const getCounselingQuestionsSuccess = createAction(GET_COUNSELING_QUESTIONS_SUCCESS);
export const getCounselingQuestionsFailure = createAction(GET_COUNSELING_QUESTIONS_FAILURE);
export const getCounselingQuestion = createAction(GET_COUNSELING_QUESTION);
export const getCounselingQuestionSuccess = createAction(GET_COUNSELING_QUESTION_SUCCESS);
export const getCounselingQuestionFailure = createAction(GET_COUNSELING_QUESTION_FAILURE);
export const addBlackList = createAction(ADD_BLACK_LIST);
export const addBlackListSuccess = createAction(ADD_BLACK_LIST_SUCCESS);
export const addBlackListFailure = createAction(ADD_BLACK_LIST_FAILURE);
export const call = createAction(CALL);
export const callFinish = createAction(CALL_FINISH);
export const stopCall = createAction(STOP_CALL);
export const setHold = createAction(SET_HOLD);
export const setResume = createAction(SET_RESUME);
export const setMute = createAction(SET_MUTE);
export const setMuteUnvisible = createAction(SET_MUTE_UNVISIBLE);
export const setHoldUnvisible = createAction(SET_HOLD_UNVISIBLE);
export const setStatus = createAction(SET_STATUS);
export const setStatusSuccess = createAction(SET_STATUS_SUCCESS);
export const setStatusFailure = createAction(SET_STATUS_FAILURE);
export const completeCounseling = createAction(COMPLETE_COUNSELING);
export const completeCounselingSuccess = createAction(COMPLETE_COUNSELING_SUCCESS);
export const completeCounselingFailure = createAction(COMPLETE_COUNSELING_FAILURE);


export const completeCounselingAction = (seq) => (dispatch) => {
    dispatch({type : COMPLETE_COUNSELING});

    console.log(seq);
    const URL = `/api/counselor/complete/counseling`;
    const params = {
        seq
    }
    return axios
        .post(URL, params)
        .then(resData => {
            const {result} = resData.data;
            if(result === 'SUCCESS') {
                dispatch({type : COMPLETE_COUNSELING_SUCCESS});
            } else {
                dispatch({type : COMPLETE_COUNSELING_FAILURE});
            }
        })
        .catch(err => {
            dispatch({type : COMPLETE_COUNSELING_FAILURE});
        })
}



export const addBlackListAction = (data) => (dispatch) => {
    dispatch({type : ADD_BLACK_LIST});

    const URL = '/api/add/blacklist'
    const params = data;
    return axios
        .post(URL, params)
        .then(resData => {
            const {result} = resData.data;
            if (result === 'SUCCESS') {
                dispatch({type : ADD_BLACK_LIST_SUCCESS});
                return 1;
            } else {
                dispatch({type : ADD_BLACK_LIST_FAILURE});
                return 0;
            }
        })
        .catch(err => {
            dispatch({type : ADD_BLACK_LIST_FAILURE});
        })
}

//api/get/counseling/question
export const getCounselingQuestionAction = (bId) => (dispatch) => {
    dispatch({type : GET_COUNSELING_QUESTION});

    const URL = `/api/get/counseling/question?bId=${bId}`;

    axios
        .get(URL)
        .then(resData => {
            const {result, question} = resData.data;
            if(result === 'SUCCESS') {
                dispatch({type : GET_COUNSELING_QUESTION_SUCCESS, payload : {question}});
                return 1;
            } else {
                dispatch({type : GET_COUNSELING_QUESTION_FAILURE});
                return 0;
            }
        })
        .catch(err => {
            dispatch({type : GET_COUNSELING_QUESTION_FAILURE});
            return 0;
        })
}

//api/get/counseling/questions
export const getCounselingQuestionsAction = (pageNum) => (dispatch) => {
    dispatch({type : GET_COUNSELING_QUESTIONS});

    const URL = `/api/get/counseling/questions?pageNum=${pageNum}`;
    axios
        .get(URL)
        .then(resData => {
            const data = resData.data;
            if (data.result === 'SUCCESS') {
                dispatch({type : GET_COUNSELING_QUESTIONS_SUCCESS, payload : {questions : data.questions}});
            } else {
                dispatch({type : GET_COUNSELING_QUESTIONS_FAILURE});
            }
        })
        .catch(err => {
            dispatch({type : GET_COUNSELING_QUESTIONS_FAILURE});
        })

}


export const changeTimeAction = (data) => (dispatch) => {
    dispatch({type : CHANGE_TIME});
    const {colname, colvalue, index} = data;
    const URL = `/api/counselor/edit/schedule`;
    const params = {
        colname,
        colvalue,
        seq : data.counselorSeq,
        date : data.date
    }

    return axios
        .post(URL, params)
        .then(resData => {
            const data = resData.data;
            if(data.result === 'SUCCESS') {
                dispatch({type : CHANGE_TIME_SUCCESS, payload : {index, value : colvalue}});
            } else {
                dispatch({type : CHANGE_TIME_FAILURE});
            }
        })
        .catch(err => {
            dispatch({type : CHANGE_TIME_FAILURE});
        });

}

export const makeCounselingAction = (counselorSeq, date, timeValues) => (dispatch) => {

    dispatch({type : MAKE_COUNSELING});

    const URL = `/api/counselor/makecounseling`;
    const params = {
        counselorSeq,
        date,
        tv1 : timeValues[0],
        tv2 : timeValues[1],
        tv3 : timeValues[2],
        tv4 : timeValues[3],
        tv5 : timeValues[4],
        tv6 : timeValues[5],
        tv7 : timeValues[6],
        tv8 : timeValues[7],
        tv9 : timeValues[8],
        tv10 : timeValues[9],
        tv11 : timeValues[10],
        tv12 : timeValues[11],
        tv13 : timeValues[12],
        tv14 : timeValues[13],
        tv15 : timeValues[14],
        tv16 : timeValues[15],
        tv17 : timeValues[16],
        tv18 : timeValues[17]
    }

    return axios
        .post(URL, params)
        .then(resData => {
            const data = resData.data;

            if (data.result === 'SUCCESS') {
                dispatch({type : MAKE_COUNSELING_SUCCESS});
            } else {
                dispatch({type : MAKE_COUNSELING_FAILURE});
            }
        })
        .catch(err => {
            dispatch({type : MAKE_COUNSELING_FAILURE});
        });
}




export const getMySchedulesAction = (params) => (dispatch) => {
    dispatch({type : GET_MY_SCHEDULES});

    const URL = `/api/get/myschedule?counselorSeq=${params.counselorSeq}&date=${params.date}`;

    axios
        .get(URL)
        .then(resData => {
            const data = resData.data;
            if (data.result === 'SUCCESS') {
                const schedules = data.schedules;

                delete schedules['counselor_seq'];
                delete schedules['date'];

                
                // 객체 -> 리스트 컨버싱
                const scheduleList = [];
                for(let item in schedules) 
                    scheduleList.push(schedules[item])
                           
                let timeList = getTimeList();

                const parsedTimeList = timeList.map((item, index) => {
                    item.status = scheduleList[index];
                    return item;
                })
                dispatch({type : GET_MY_SCHEDULES_SUCCESS, payload : {schedules : parsedTimeList}});
                // dispatch({type : GET_MY_SCHEDULES_SUCCESS, payload : {schedules}});
            } else {
                dispatch({type : GET_MY_SCHEDULES_FAILURE});    
            }
        })
        .catch(resData => {
            dispatch({type : GET_MY_SCHEDULES_FAILURE});
        })
}


export const clickCategoryAction = (counselorSeq, clickedIndex, categoryName, checked) => (dispatch) => {
    dispatch({type : CLICK_CATEGORY});

    let URL = ``;
    if(checked) {
        URL = `/api/counselor/drop/category`;
    } else {
        URL = `/api/counselor/add/category`;
    }
    const data = {
        counselorSeq,
        category : categoryName
    };

    axios
        .post(URL, data)
        .then(resData => {
            dispatch({type : CLICK_CATEGORY_SUCCESS, payload : {clickedIndex}});
        })
        .catch(err => {
            dispatch({type : CLICK_CATEGORY_FAILURE});
        })

}


export const getCategoriesAction = (counselorSeq) => (dispatch) => {

    dispatch({type : GET_CATEGORIES});

    axios
        .get('/api/get/categories')
        .then( resData => {
            const categories = resData.data.categories;
            console.log(categories);
            axios
                .get(`/api/get/mycategory?seq=${counselorSeq}`)
                .then( resData => {
                    const myCategories = resData.data.myCategories;
                    let categoriesWithChecked;
                    if(myCategories === null) {
                        categoriesWithChecked = categories.map(category => {
                            category.checked = false;
                            return category;   
                        });
                    } else {
                        categoriesWithChecked = categories.map(category => {
                            category.checked = false;
                            for(let i=0 ; i<myCategories.length ; i++) {
                                if (category.name === myCategories[i].category){
                                    category.checked = true;   
                                }
                            }
                            return category;   
                        });
                    }
                    

                    dispatch({type : GET_CATEGORIES_SUCCESS, payload : {categoriesWithChecked}});
                })
                .catch( err => {
                    dispatch({type : GET_CATEGORIES_FAILURE});        
                })
        })
        .catch( err => {
            dispatch({type : GET_CATEGORIES_FAILURE});
        });
}


export const getMyCounselingsByDateAction = (params) => (dispatch) => {
    dispatch({type : GET_MY_COUNSELINGS_BY_DATE});

    const URL = `/api/get/mycounseling/bydate?seq=${params.counselorSeq}&date=${params.date}`
    // const URL = `/api/get/mycounseling/bydate?seq=${132}&date=${'2019-05-26'}`
    axios
        .get(URL)
        .then( resData => {
            const data = resData.data;
            if (data.result === 'SUCCESS') {
                dispatch({
                    type : GET_MY_COUNSELINGS_BY_DATE_SUCCESS,
                    payload : {
                        counselings : data.counselings
                    }
                });
            } else {
                dispatch({type : GET_MY_COUNSELINGS_BY_DATE_FAILURE});
            }
        })
        .catch( err => {
            dispatch({type : GET_MY_COUNSELINGS_BY_DATE_FAILURE});
        })
}

export const getHistoriesAction = (params) => (dispatch) => {

    dispatch({type : GET_HISTORIES});

    const URL = `/api/get/counselinghistory?memberseq=${params.memberSeq}&counselorseq=${params.counselorSeq}`;

    axios
        .get(URL)
        .then( resData => {
            const data = resData.data;
            if(data.result === 'SUCCESS') {
                dispatch({type : GET_HISTORIES_SUCCESS, payload : {histories : data.histories}});
            } else {
                dispatch({type : GET_HISTORIES_FAILURE});
            }
        })
        .catch( err => {
            dispatch({type : GET_HISTORIES_FAILURE});
        })


}

export const saveMemoAction = (params) => (dispatch) => {

    dispatch({type : SAVE_MEMO});

    const URL = "/api/counselor/save/history"
    return axios
        .post(URL, params)
        .then( resData => {
            if(resData.data.result === 'SUCCESS') {
                dispatch({type : SAVE_MEMO_SUCCESS});  
                const modalData = {
                    title : '알림',
                    content : '상담 히스토리가 정상적으로 등록되었습니다!'
                }
                dispatch({type : OPEN_MODAL, payload : modalData}); //modal module의 openmodal
            } else {
                const modalData = {
                    title : '알림',
                    content : '다시 시도해 주세요.'
                }
                dispatch({type : SAVE_MEMO_FAILURE});            
            }
        })
        .catch( err => {
            dispatch({type : SAVE_MEMO_FAILURE}); 
            console.log(err);
        })

}

export const getCounselingsAction = (params) => (dispatch) => {

    dispatch({type : GET_MY_COUNSELINGS});

    const URL = `/api/get/mycounseling?seq=${params.counselor_seq}`;
    axios
        .get(URL)
        .then(resData => {
            const {result, counselings} = resData.data;
            if(result === 'SUCCESS') {
                const parsedCounselings = counselings.map(counseling => {
                    console.log(counseling);
                    counseling.checked = false;
                    return counseling;
                });
                dispatch({type : GET_MY_COUNSELINGS_SUCCESS, payload : {
                    counselings : parsedCounselings
                }});
            } else {
                dispatch({type : GET_MY_COUNSELINGS_FAILURE});
            }
        })
        .catch(err => {

        })
}

export const getMemberInfoAction = (param) => (dispatch) => {

    dispatch({type : GET_MEMBER_INFO});

    const URL = `/api/get/memberinfo?seq=${param}`;
    axios
        .get(URL)
        .then(resData => {
            const {result, memberInfo} = resData.data;
            if(result === 'SUCCESS') {
                dispatch({type : GET_MEMBER_INFO_SUCCESS, payload : {
                    memberInfo
                }});
            } else {
                dispatch({type : GET_MEMBER_INFO_FAILURE});
            }
        })
        .catch(err => {

        })
}

export default handleActions({
    [GET_MY_COUNSELINGS] : (state, action) => {
        return state.setIn(['getCounselings', 'fetching'], true);
    },
    [GET_MY_COUNSELINGS_SUCCESS] : (state, action) => {
        return state.setIn(['getCounselings', 'fetching'], false)
                    .setIn(['getCounselings', 'result'], 'SUCCESS')
                    .setIn(['getCounselings', 'counselings'], action.payload.counselings);
    },
    [GET_MY_COUNSELINGS_FAILURE] : (state, action) => {
        return state.setIn(['getCounselings', 'fetching'], false)
                    .setIn(['getCounselings', 'result'], 'FAILURE')
                    .setIn(['getCounselings', 'counselings'], null);
    },
    [NEXT_DATE] : (state, action) => {
        const dateArr = state.getIn(['getCounselings', 'selectedDate']).split('-');

        //현재 선택된 날짜를 연도,월,일 로 파싱
        let currYear = parseInt(dateArr[0]);
        let currMonth = parseInt(dateArr[1]);
        let currDay = parseInt(dateArr[2]);

        //현재 선택된 월의 마지막 일 가져오기
        const maxDay = new Date(currYear, currMonth, 0).getDate();

        //날짜 +1 증가시켜주는 조건문
        if ((currDay+1) > maxDay ) {
            if ((currMonth+1) > 12) {
                currYear += 1;
                currMonth = 1;
                currDay = 1;
            } else {
                currMonth +=1;
                currDay = 1;
            }
        } else {
            currDay += 1;
        }

        if(currMonth < 10) 
            currMonth = `0${currMonth}`;
        if(currDay < 10)
            currDay = `0${currDay}`;

        const nextDate = `${currYear}-${currMonth}-${currDay}`;
        return state.setIn(['getCounselings', 'selectedDate'], nextDate);
    },
    [PREV_DATE] : (state, action) => {
        const dateArr = state.getIn(['getCounselings', 'selectedDate']).split('-');

        //현재 선택된 날짜를 연도,월,일 로 파싱
        let currYear = parseInt(dateArr[0]);
        let currMonth = parseInt(dateArr[1]);
        let currDay = parseInt(dateArr[2]);

        
        //날짜 -1 감소시켜주는 조건문
        if ((currDay-1) < 1) {
            if ((currMonth-1) < 1) {
                currYear -= 1;
                currMonth = 12;
                currDay = new Date(currYear, currMonth, 0).getDate();//현재 선택된 월의 마지막 일 가져오기
            } else {
                currMonth -= 1;
                currDay = new Date(currYear, currMonth, 0).getDate();//현재 선택된 월의 마지막 일 가져오기
            }
        } else {
            currDay -= 1;
        }

        if(currMonth < 10) 
            currMonth = `0${currMonth}`;
        if(currDay < 10)
            currDay = `0${currDay}`;

        const prevDate = `${currYear}-${currMonth}-${currDay}`;
        return state.setIn(['getCounselings', 'selectedDate'], prevDate);
    },
    [GET_MEMBER_INFO] : (state, action) => {
        return state.setIn(['getMemberInfo', 'fetching'], true);
    },
    [GET_MEMBER_INFO_SUCCESS] : (state, action) => {
        return state.setIn(['getMemberInfo', 'fetching'], false)
                    .setIn(['getMemberInfo', 'result'], 'SUCCESS')
                    .setIn(['getMemberInfo', 'memberInfo'], action.payload.memberInfo);
    },
    [GET_MEMBER_INFO_FAILURE] : (state, action) => {
        return state.setIn(['getMemberInfo', 'fetching'], false)
                    .setIn(['getMemberInfo', 'result'], 'FAILURE')
                    .setIn(['getMemberInfo', 'memberInfo'], null);
    },
    [SELECT_COUNSELING] : (state, action) => {
        const prevIndex = state.getIn(['getCounselings', 'counselings']).findIndex(counseling => counseling.checked === true);
        const selectedIndex = state.getIn(['getCounselings', 'counselings']).findIndex(counseling => counseling.seq === action.payload.clickedSeq);

        if(prevIndex === selectedIndex ) {
            if(state.getIn(['getCounselings', 'counselings', prevIndex, 'checked']) === true) {
                console.log('리턴전!');
                return state.set('selectedCounseling', null)
                            .setIn(['getCounselings', 'counselings', selectedIndex, 'checked'], false);
            } else {
                console.log('리턴전!');
                return state.set('selectedCounseling', action.payload.clickedSeq)
                            .setIn(['getCounselings', 'counselings', selectedIndex, 'checked'], true);
            }
        } else {
            console.log('리턴전!');
            return state.set('selectedCounseling', action.payload.clickedSeq)
                        .setIn(['getCounselings', 'counselings', selectedIndex, 'checked'], !state.getIn(['getCounselings', 'counselings', selectedIndex, 'checked']))
                        .setIn(['getCounselings', 'counselings', prevIndex, 'checked'], false);
        }
    },
    [CHANGE_MEMO] : (state, action) => {
        return state.set(action.payload.name, action.payload.value);
    },
    [GET_HISTORIES] : (state, action) => {
        return state.setIn(['getHistories', 'fetching'], true);
    },
    [GET_HISTORIES_SUCCESS] : (state, action) => {
        return state.setIn(['getHistories', 'fetching'], false)
                    .setIn(['getHistories', 'result'], 'SUCCESS')
                    .setIn(['getHistories', 'histories'], action.payload.histories);
    },
    [GET_HISTORIES_FAILURE] : (state, action) => {
        return state.setIn(['getHistories', 'fetching'], false)
                    .setIn(['getHistories', 'result'], 'FAILURE')
                    .setIn(['getHistories', 'histories'], null);
    },
    [SAVE_MEMO] : (state, action) => {
        return state.setIn(['saveMemoAction', 'fetching'], true);
    },
    [SAVE_MEMO_SUCCESS] : (state, action) => {
        return state.setIn(['saveMemoAction', 'fetching'], false)
                    .setIn(['saveMemoAction', 'result'], 'SUCCESS');
    },
    [SAVE_MEMO_FAILURE] : (state, action) => {
        return state.setIn(['saveMemoAction', 'fetching'], false)
                    .setIn(['saveMemoAction', 'result'], 'FAILURE');
    },
    [CLICK_RESERVE_DATE] : (state, action) => {
        return state.set('myReserveDate', action.payload.date);
    },
    [CLICK_COUNSELING_DATE] : (state, action) => {
        return state.set('makeCounselingDate', action.payload.date);
    },
    [GET_MY_COUNSELINGS_BY_DATE] : (state, action) => {
        return state.setIn(['getCounselingsByDate', 'fetching'], true);
    },
    [GET_MY_COUNSELINGS_BY_DATE_SUCCESS] : (state, action) => {
        return state.setIn(['getCounselingsByDate', 'fetching'], false)
                    .setIn(['getCounselingsByDate', 'result'], 'SUCCESS')
                    .setIn(['getCounselingsByDate', 'counselings'], action.payload.counselings);
        
    },
    [GET_MY_COUNSELINGS_BY_DATE_FAILURE] : (state, action) => {
        return state.setIn(['getCounselingsByDate', 'fetching'], false)
                    .setIn(['getCounselingsByDate', 'result'], 'FAILURE')
                    .setIn(['getCounselingsByDate', 'counselings'], null);
    },
    [OPEN_MY_MODAL] : (state, action) => {
        return state.setIn(['modal', 'visible'], true)
                    .setIn(['modal', 'title'], action.payload.title)
                    .setIn(['modal', 'content'], action.payload.content);
    },
    [CLOSE_MY_MODAL] : (state, action) => {
        return state.setIn(['modal', 'visible'], false);
    },
    [GET_CATEGORIES] : (state, action) => {
        return state.setIn(['getCategories', 'fetching'], true);
    },
    [GET_CATEGORIES_SUCCESS] : (state, action) => {
        return state.setIn(['getCategories', 'fetching'], false)
                    .setIn(['getCategories', 'result'], 'SUCCESS')
                    .setIn(['getCategories', 'categories'], action.payload.categoriesWithChecked);
    },
    [GET_CATEGORIES_FAILURE] : (state, action) => {
        return state.setIn(['getCategories', 'fetching'], false)
                    .setIn(['getCategories', 'result'], 'FAILURE')
                    .setIn(['getCategories', 'categories'], null);
    },
    [CLICK_CATEGORY] : (state, action) => {
        return state.setIn(['clickCategory', 'fetching'], true);
    },
    [CLICK_CATEGORY_SUCCESS] : (state, action) => {
        return state.setIn(['clickCategory', 'fetching'], false)
                    .setIn(['clickCategory', 'result'], 'SUCCESS')
                    .setIn(['getCategories', 'categories', action.payload.clickedIndex, 'checked'], !state.getIn(['getCategories', 'categories', action.payload.clickedIndex, 'checked']));
    },
    [CLICK_CATEGORY_FAILURE] : (state, action) => {
        return state.setIn(['clickCategory', 'fetching'], false)
                    .setIn(['clickCategory', 'result'], 'FAILURE')
    },
    [INITIALIZE_MAKE_COUNSELING] : (state, action) => {
        return state.set('makeCounselingDate', new Date())
                    .set('mode', 'normal');
    },
    [INITIALIZE_RESERVATION_STATUS] : (state, action) => {
        return state.set('myReserveDate', new Date());
    },
    [GET_MY_SCHEDULES] : (state, action) => {
        return state.setIn(['getMySchedules', 'fetching'], true);
    },
    [GET_MY_SCHEDULES_SUCCESS] : (state, action) => {
        return state.setIn(['getMySchedules', 'fetching'], false)
                    .setIn(['getMySchedules', 'result'], 'SUCCESS')
                    .setIn(['getMySchedules', 'schedules'], action.payload.schedules);
    },
    [GET_MY_SCHEDULES_FAILURE] : (state, action) => {
        return state.setIn(['getMySchedules', 'fetching'], false)
                    .setIn(['getMySchedules', 'result'], 'FAILURE')
    },
    [CHANGE_MODE] : (state, action) => {
        return state.set('mode', action.payload.mode);
    },
    [CLICK_TIME] : (state, action) => {
        if(action.payload.all) {    //모두선택
            return state.setIn(['timeList', 0, 'checked'], true)
                        .setIn(['timeList', 1, 'checked'], true)
                        .setIn(['timeList', 2, 'checked'], true)
                        .setIn(['timeList', 3, 'checked'], true)
                        .setIn(['timeList', 4, 'checked'], true)
                        .setIn(['timeList', 5, 'checked'], true)
                        .setIn(['timeList', 6, 'checked'], true)
                        .setIn(['timeList', 7, 'checked'], true)
                        .setIn(['timeList', 8, 'checked'], true)
                        .setIn(['timeList', 9, 'checked'], true)
                        .setIn(['timeList', 10, 'checked'], true)
                        .setIn(['timeList', 11, 'checked'], true)
                        .setIn(['timeList', 12, 'checked'], true)
                        .setIn(['timeList', 13, 'checked'], true)
                        .setIn(['timeList', 14, 'checked'], true)
                        .setIn(['timeList', 15, 'checked'], true)
                        .setIn(['timeList', 16, 'checked'], true)
                        .setIn(['timeList', 17, 'checked'], true);
        } else {
            return state.setIn(['timeList', action.payload.clickedIndex, 'checked'], !state.getIn(['timeList', action.payload.clickedIndex, 'checked']));
        }
    },
    [MAKE_COUNSELING] : (state, action) => {
        return state.setIn(['makeCounseling', 'fetching'], true);
    },
    [MAKE_COUNSELING_SUCCESS] : (state, action) => {
        return state.setIn(['makeCounseling', 'fetching'], false)
                    .setIn(['makeCounseling', 'result'], 'SUCCESS');
    },
    [MAKE_COUNSELING_FAILURE] : (state, action) => {
        return state.setIn(['makeCounseling', 'fetching'], false)
                    .setIn(['makeCounseling', 'result'], 'FAILURE');
    },
    [INITIALIZE_TIME_LIST] : (state, action) => {
        return state.setIn(['timeList', 0, 'checked'], false)
                    .setIn(['timeList', 1, 'checked'], false)
                    .setIn(['timeList', 2, 'checked'], false)
                    .setIn(['timeList', 3, 'checked'], false)
                    .setIn(['timeList', 4, 'checked'], false)
                    .setIn(['timeList', 5, 'checked'], false)
                    .setIn(['timeList', 6, 'checked'], false)
                    .setIn(['timeList', 7, 'checked'], false)
                    .setIn(['timeList', 8, 'checked'], false)
                    .setIn(['timeList', 9, 'checked'], false)
                    .setIn(['timeList', 10, 'checked'], false)
                    .setIn(['timeList', 11, 'checked'], false)
                    .setIn(['timeList', 12, 'checked'], false)
                    .setIn(['timeList', 13, 'checked'], false)
                    .setIn(['timeList', 14, 'checked'], false)
                    .setIn(['timeList', 15, 'checked'], false)
                    .setIn(['timeList', 16, 'checked'], false)
                    .setIn(['timeList', 17, 'checked'], false);
    },
    [CHANGE_TIME] : (state, action) => {
        return state.setIn(['changeTime', 'fetching'], true);
    },
    [CHANGE_TIME_SUCCESS] : (state, action) => {
        return state.setIn(['changeTime', 'fetching'], false)
                    .setIn(['changeTime', 'result'], 'SUCCESS')
                    .setIn(['getMySchedules', 'schedules', action.payload.index, 'status'], action.payload.value);
    },
    [CHANGE_TIME_FAILURE] : (state, action) => {
        return state.setIn(['changeTime', 'fetching'], false)
                    .setIn(['changeTime', 'result'], 'FAILURE');
    },
    [OPEN_SNACK_BAR] : (state, action) => {
        return state.setIn(['snackbar', 'visible'], true)
                    .setIn(['snackbar', 'message'], action.payload.message)
                    .setIn(['snackbar', 'variant'], action.payload.variant);
    },
    [CLOSE_SNACK_BAR] : (state, action) => {
        return state.setIn(['snackbar', 'visible'], false);
    },
    [GET_COUNSELING_QUESTIONS] : (state, action) => {
        return state.setIn(['getCounselingQuestions', 'fetching'], true);
    },
    [GET_COUNSELING_QUESTIONS_SUCCESS] : (state, action) => {
        return state.setIn(['getCounselingQuestions', 'fetching'], false)
                    .setIn(['getCounselingQuestions', 'result'], 'SUCCESS')
                    .setIn(['getCounselingQuestions', 'questions'], action.payload.questions);
    },
    [GET_COUNSELING_QUESTIONS_FAILURE] : (state, action) => {
        return state.setIn(['getCounselingQuestions', 'fetching'], false)
                    .setIn(['getCounselingQuestions', 'result'], 'FAILURE')
                    .setIn(['getCounselingQuestions', 'questions'], null);
    },
    [GET_COUNSELING_QUESTION] : (state, action) => {
        return state.setIn(['getCounselingQuestion', 'fetching'], true);
    },
    [GET_COUNSELING_QUESTION_SUCCESS] : (state, action) => {
        return state.setIn(['getCounselingQuestion', 'fetching'], false)
                    .setIn(['getCounselingQuestion', 'result'], 'SUCCESS')
                    .setIn(['getCounselingQuestion', 'question'], action.payload.question);
    },
    [GET_COUNSELING_QUESTION_FAILURE] : (state, action) => {
        return state.setIn(['getCounselingQuestion', 'fetching'], false)
                    .setIn(['getCounselingQuestion', 'result'], 'FAILURE')
                    .setIn(['getCounselingQuestion', 'question'], null);
    },
    [ADD_BLACK_LIST] : (state, action) => {
        return state.setIn(['addBlackList', 'fetching'], true);
    },
    [ADD_BLACK_LIST_SUCCESS] : (state, action) => {
        return state.setIn(['addBlackList', 'fetching'], false)
                    .setIn(['addBlackList', 'result'], 'SUCCESS');
    },
    [ADD_BLACK_LIST_FAILURE] : (state, action) => {
        return state.setIn(['addBlackList', 'fetching'], false)
                    .setIn(['addBlackList', 'result'], 'FAILURE');
    },
    [CALL] : (state, action) => {
        return state.setIn(['callingStatus', 'fetching'], true);
    },
    [CALL_FINISH] : (state, action) => {
        return state.setIn(['callingStatus', 'calling'], true)
                    .setIn(['callingStatus', 'fetching'], false);
    },
    [SET_HOLD] : (state, action) => {
        return state.setIn(['callingStatus', 'hold'], true)
                    .setIn(['callingStatus', 'holdVisible'], true);
    },
    [SET_RESUME] : (state, action) => {
        return state.setIn(['callingStatus', 'hold'], false)
                    .setIn(['callingStatus', 'holdVisible'], true);
    },
    [SET_MUTE] : (state, action) => {
        return state.setIn(['callingStatus', 'mute'], !state.getIn(['callingStatus', 'mute']))
                    .setIn(['callingStatus', 'muteVisible'], true);
    },
    [SET_MUTE_UNVISIBLE] : (state, action) => {
        return state.setIn(['callingStatus', 'muteVisible'], false);
    },
    [SET_HOLD_UNVISIBLE] : (state, action) => {
        return state.setIn(['callingStatus', 'holdVisible'], false);
    },
    [STOP_CALL] : (state, action) => {
        return state.setIn(['callingStatus', 'calling'], false)
                    .setIn(['callingStatus', 'hold'], false)
                    .setIn(['callingStatus', 'mute'], false)
    },
    [SET_STATUS] : (state, action) => {
        return state.setIn(['setStatus', 'fetching'], true)
                    .setIn(['setStatus', 'result'], null);
    },
    [SET_STATUS_SUCCESS] : (state, action) => {
        return state.setIn(['setStatus', 'fetching'], false)
                    .setIn(['setStatus', 'result'], 'SUCCESS')
                    .setIn(['setStatus', 'status'], action.payload.status);
    },
    [SET_STATUS_FAILURE] : (state, action) => {
        return state.setIn(['setStatus', 'fetching'], false)
                    .setIn(['setStatus', 'result'], 'FAILURE');
    },
    [COMPLETE_COUNSELING] : (state, action) => {
        return state.setIn(['completeCounseling', 'fetching'], true);
    },
    [COMPLETE_COUNSELING_SUCCESS] : (state, action) => {
        return state.setIn(['completeCounseling', 'fetching'], false)
                    .setIn(['completeCounseling', 'result'], 'SUCCESS');
    },
    [COMPLETE_COUNSELING_FAILURE] : (state, action) => {
        return state.setIn(['completeCounseling', 'fetching'], false)
                    .setIn(['completeCounseling', 'result'], 'FAILURE');
    }
}, defaultState);