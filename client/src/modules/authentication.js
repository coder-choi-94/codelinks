import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import axios from 'axios';
import { type } from 'os';

//액션 타입
export const LOGIN = 'authentication/LOGIN';
export const LOGIN_SUCCESS = 'authentication/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'authentication/LOGIN_FAILURE';
export const LOGIN_INPUT_CHANGED = 'authentication/LOGIN_INPUT_CHANGED';

export const CHECK_ISLOGGEDIN = 'authentication/CHECK_ISLOGGEDIN';
export const CHECK_ISLOGGEDIN_SUCCESS = 'authentication/CHECK_ISLOGGEDIN_SUCCESS';
export const CHECK_ISLOGGEDIN_FAILURE = 'authentication/CHECK_ISLOGGEDIN_FAILURE';

export const MEMBER_SIGNUP = 'authentication/MEMBER_SIGNUP';
export const MEMBER_SIGNUP_SUCCESS = 'authentication/MEMBER_SIGNUP_SUCCESS';
export const MEMBER_SIGNUP_FAILURE = 'authentication/MEMBER_SIGNUP_FAILURE';
export const MEMBER_SIGNUP_INITIALIZE = 'authentication/MEMBER_SIGNUP_INITIALIZE';
export const MEMBER_SIGNUP_INPUT_CHANGED = 'authentication/MEMBER_SIGNUP_INPUT_CHANGED';
export const MEMBER_VALIDATE = 'authentication/MEMBER_VALIDATE';
export const MEMBER_VALIDATE_SUCCESS = 'authentication/MEMBER_VALIDATE_SUCCESS';
export const MEMBER_VALIDATE_FAILURE = 'authentication/MEMBER_VALIDATE_FAILURE';
export const MEMBER_WARNING_SHOW = 'authentication/MEMBER_WARNING_SHOW';
export const MEMBER_WARNING_HIDE = 'authentication/MEMBER_WARNING_HIDE';


export const COUNSELOR_SIGNUP = 'authentication/COUNSELOR_SIGNUP';
export const COUNSELOR_SIGNUP_SUCCESS = 'authentication/COUNSELOR_SIGNUP_SUCCESS';
export const COUNSELOR_SIGNUP_FAILURE = 'authentication/COUNSELOR_SIGNUP_FAILURE';
export const COUNSELOR_SIGNUP_INITIALIZE = 'authentication/COUNSELOR_SIGNUP_INITIALIZE';
export const COUNSELOR_SIGNUP_INPUT_CHANGED = 'authentication/COUNSELOR_SIGNUP_INPUT_CHANGED';
export const COUNSELOR_VALIDATE = 'authentication/COUNSELOR_VALIDATE';
export const COUNSELOR_VALIDATE_SUCCESS = 'authentication/COUNSELOR_VALIDATE_SUCCESS';
export const COUNSELOR_VALIDATE_FAILURE = 'authentication/COUNSELOR_VALIDATE_FAILURE';
export const COUNSELOR_WARNING_SHOW = 'authentication/COUNSELOR_WARNING_SHOW';
export const COUNSELOR_WARNING_HIDE = 'authentication/COUNSELOR_WARNING_HIDE';


export const MODAL_OPEN = 'authentication/MODAL_OPEN';
export const MODAL_CLOSE = 'authentication/MODAL_CLOSE';

export const ADD_LICENSE_FORM = 'authentication/ADD_LICENSE_FORM';
export const DELETE_LICENSE_FORM = 'authentication/DELETE_LICENSE_FORM';

//액션 생성자
export const login = createAction(LOGIN);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginFailure = createAction(LOGIN_FAILURE);
export const loginInputChanged = createAction(LOGIN_INPUT_CHANGED);

export const checkIsLoggedIn = createAction(CHECK_ISLOGGEDIN);
export const checkisLoggedInSuccess = createAction(CHECK_ISLOGGEDIN_SUCCESS);
export const checkisLoggedInFailure = createAction(CHECK_ISLOGGEDIN_FAILURE);

export const memberSignup = createAction(MEMBER_SIGNUP);
export const memberSignupSuccess = createAction(MEMBER_SIGNUP_SUCCESS);
export const memberSignupFailure = createAction(MEMBER_SIGNUP_FAILURE);
export const memberSignupInitialize = createAction(MEMBER_SIGNUP_INITIALIZE);
export const memberSignupInputChanged = createAction(MEMBER_SIGNUP_INPUT_CHANGED);
export const memberValidate = createAction(MEMBER_VALIDATE);
export const memberValidateSuccess = createAction(MEMBER_VALIDATE_SUCCESS);
export const memberValidateFailure = createAction(MEMBER_VALIDATE_FAILURE);
export const memberWarningShow = createAction(MEMBER_WARNING_SHOW);
export const memberWarningHide = createAction(MEMBER_WARNING_HIDE);

export const counselorSignup = createAction(COUNSELOR_SIGNUP);
export const counselorSignupSuccess = createAction(COUNSELOR_SIGNUP_SUCCESS);
export const counselorSignupFailure = createAction(COUNSELOR_SIGNUP_FAILURE);
export const counselorSignupInitialize = createAction(COUNSELOR_SIGNUP_INITIALIZE);
export const counselorSignupInputChanged = createAction(COUNSELOR_SIGNUP_INPUT_CHANGED);
export const counselorValidate = createAction(COUNSELOR_VALIDATE);
export const counselorValidateSuccess = createAction(COUNSELOR_VALIDATE_SUCCESS);
export const counselorValidateFailure = createAction(COUNSELOR_VALIDATE_FAILURE);
export const counselorWarningShow = createAction(COUNSELOR_WARNING_SHOW);
export const counselorWarningHide = createAction(COUNSELOR_WARNING_HIDE);


export const modalOpen = createAction(MODAL_OPEN);
export const modalClose = createAction(MODAL_CLOSE);

export const addLicenseForm = createAction(ADD_LICENSE_FORM);
export const deleteLicenseForm = createAction(DELETE_LICENSE_FORM);



//초기 스테이트
const defaultState = Map({
    loginInfo : Map({
        fetching : false,
        result : null,
        resultMessage : '',
        isLoggedIn : false,
        userSeq : null,
        userId : null,
        userName : null,
        userType : null,
        point : null,
        profile : null
    }),
    inputData : Map({
        id : '',
        pw : '',
        type : 'member'
    }),
    checkIsLoggedIn : Map({
        fetching : false,
        result : null
    }),
    signupData : Map({
        member : Map({
            id : '',
            pw1 : '',
            pw2 : '',
            name : '',
            phone : '',
            birth : '2000-01-01',
            gender : '남',
            fetching : false,
            result : null,
            validate : false,
            warningText : false
        }),
        counselor : Map({
            id : '',
            pw1 : '',
            pw2 : '',
            name : '',
            phone : '',
            birth : '2000-01-01',
            gender : '남',
            fetching : false,
            result : null,
            validate : false,
            warningText : false,
            profileName : '프로필 사진을 등록하세요',
            profile : null,
            licenseNo : '',
            licenseName : '',
            licensePath : '대표 자격증을 등록하세요',
            license : '',
            degree : '',
            school : '',
            major : '',
            graduated : '',
            comment : '',
            education : '',
            educationName : '학력 증명서를 등록하세요'
        })
    }),
    modal : Map({
        title : '',
        content : '',
        open : false
    }),
    licenseOfNum : 1
});

//Thunk
export const memberSignUpAction = data => dispatch => {
    // 회원가입 요청을 시작함을 알림
    dispatch({type : MEMBER_SIGNUP});

    const URL = '/api/member/signup';
    return axios.post(URL, data)
            .then(resData => {
                dispatch({type : MEMBER_SIGNUP_SUCCESS});
            })
            .catch(err => {
                dispatch({type : MEMBER_SIGNUP_FAILURE});
            });

}

export const counselorSignUpAction = data => dispatch => {
    // 회원가입 요청을 시작함을 알림
    dispatch({type : COUNSELOR_SIGNUP});

    const URL = '/api/counselor/signup';
    const config = {
        headers : {
            'content-type': 'multipart/form-data'
        }
    }
    const formData = new FormData();
    formData.append('id', data.id);  
    formData.append('pw', data.pw1);
    formData.append('name', data.name);
    formData.append('phone', data.phone);
    formData.append('birth', data.birth);
    formData.append('gender', data.gender);
    formData.append('profile', data.profile);
    formData.append('licenseNo', data.licenseNo);
    formData.append('licenseName', data.licenseName);
    formData.append('license', data.license);
    formData.append('degree', data.degree);
    formData.append('school', data.school);
    formData.append('major', data.major);
    formData.append('graduated', data.graduated);
    formData.append('comment', data.comment);
    formData.append('education', data.education);

    return axios.post(URL, formData, config)
            .then(resData => {
                dispatch({type : COUNSELOR_SIGNUP_SUCCESS});
            })
            .catch(err => {
                dispatch({type : COUNSELOR_SIGNUP_FAILURE});
            });
}

export const validateAction = (id, type) => dispatch => {
    //중복확인 요청을 알림
    if(type === 'member')
        dispatch({type : MEMBER_VALIDATE});
    else
        dispatch({type : COUNSELOR_VALIDATE});


    const URL = type === 'member' ? `/api/member/validate?id=${id}` :  `/api/counselor/validate?id=${id}`;

    return axios.get(URL)
                .then(resData => {
                    const {result} = resData.data;
                    
                    if(result === 'EXISTS') {
                        if(type === 'member')
                            dispatch({type : MEMBER_VALIDATE_FAILURE});
                        else
                            dispatch({type : COUNSELOR_VALIDATE_FAILURE});
                    } else {
                        if(type === 'member')
                            dispatch({type : MEMBER_VALIDATE_SUCCESS});
                        else
                            dispatch({type : COUNSELOR_VALIDATE_SUCCESS});
                    }
                })
                .catch(err => {
                    dispatch({type : MEMBER_VALIDATE_FAILURE});
                });

}


export const loginAction = loginData => dispatch => {

    const {reqId, reqPw, reqType} = loginData;

    // 로그인 요청을 시작함을 알림
    dispatch({type: LOGIN});

    // 로그인 요청
    const URL = reqType === "member" ? "/api/member/login" :(reqType === "counselor") ? "/api/counselor/login" : "/api/admin/login"
    return axios.post(URL,{reqId, reqPw})
            .then(responseData => {
                // 요청이 성공했을경우, 서버 응답내용을 payload 로 설정하여 GET_POST_SUCCESS 액션을 디스패치합니다.
                const { seq, id, name, type, point, profile } = responseData.data;   //서버 세션의 로그인정보 가져오기
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: {
                        seq,
                        id,
                        name,
                        type,
                        point,
                        profile
                    }
                });
            })
            .catch(error => {
                dispatch({
                    type: LOGIN_FAILURE,
                    payload: {
                        errorMessage : error.response.data.error
                    }
                });
            });
    // 여기서 만든 promise 를 return 해줘야, 나중에 컴포넌트에서 호출 할 때 getPost().then(...) 을 할 수 있습니다

}


//리듀서
export default handleActions({
    [LOGIN] : (state, action) => {
        return state.setIn(['loginInfo', 'fetching'], true)
                    .setIn(['loginInfo', 'result'], null);
    },
    [LOGIN_SUCCESS] : (state, action) => {
        return state.setIn(['loginInfo', 'fetching'], false)
                    .setIn(['loginInfo', 'result'], 'SUCCESS')
                    .setIn(['loginInfo', 'isLoggedIn'], true)
                    .setIn(['loginInfo', 'userSeq'], action.payload.seq)
                    .setIn(['loginInfo', 'userId'], action.payload.id)
                    .setIn(['loginInfo', 'userName'], action.payload.name)
                    .setIn(['loginInfo', 'userType'], action.payload.type)
                    .setIn(['loginInfo', 'point'], action.payload.point)
                    .setIn(['loginInfo', 'profile'], action.payload.profile);
    },
    [LOGIN_FAILURE] : (state, action) => {
        return state.setIn(['loginInfo', 'fetching'], false)
                    .setIn(['loginInfo', 'result'], 'FAILURE')
                    .setIn(['loginInfo', 'isLoggedIn'], false)
                    .setIn(['loginInfo', 'resultMessage'], action.payload.errorMessage);
    },
    [LOGIN_INPUT_CHANGED] : (state, action) => {
        return state.setIn(['inputData', action.payload.name], action.payload.value);
    },
    [CHECK_ISLOGGEDIN] : (state, action) => {
        return state.setIn(['loginInfo', 'fetching'], true)
                    .setIn(['loginInfo', 'result'], null);
    },
    [CHECK_ISLOGGEDIN] : (state, action) => {
        return state.setIn(['checkIsLoggedIn', 'fetching'], true)
                    .setIn(['checkIsLoggedIn', 'result'], null);
    },
    [CHECK_ISLOGGEDIN_SUCCESS] : (state, action) => {
        return state.setIn(['checkIsLoggedIn', 'fetching'], false)
                    .setIn(['checkIsLoggedIn', 'result'], 'SUCCESS')
                    .setIn(['loginInfo', 'isLoggedIn'], true)
                    .setIn(['loginInfo', 'userSeq'], action.payload.seq)
                    .setIn(['loginInfo', 'userId'], action.payload.id)
                    .setIn(['loginInfo', 'userName'], action.payload.name)
                    .setIn(['loginInfo', 'userType'], action.payload.type)
                    .setIn(['loginInfo', 'point'], action.payload.point)
                    .setIn(['loginInfo', 'profile'], action.payload.profile);
    },
    [CHECK_ISLOGGEDIN_FAILURE] : (state, action) => {
        return state.setIn(['checkIsLoggedIn', 'fetching'], false)
                    .setIn(['checkIsLoggedIn', 'result'], 'FAILURE');
    },
    [MEMBER_SIGNUP] : (state, action) => {
        return state.setIn(['signupData', 'member', 'fetching'], true)
                    .setIn(['signupData', 'member', 'result'], null);
    },
    [MEMBER_SIGNUP_SUCCESS] : (state, action) => {
        return state.setIn(['signupData', 'member', 'fetching'], false)
                    .setIn(['signupData', 'member', 'result'], 'SUCCESS');
    },
    [MEMBER_SIGNUP_FAILURE] : (state, action) => {
        return state.setIn(['signupData', 'member', 'fetching'], false)
                    .setIn(['signupData', 'member', 'result'], 'FAILURE');
    },
    [MEMBER_SIGNUP_INITIALIZE] : (state, action) => {
        return state.setIn(['signupData', 'member', 'id'], '')
                    .setIn(['signupData', 'member', 'pw1'], '')
                    .setIn(['signupData', 'member', 'pw2'], '')
                    .setIn(['signupData', 'member', 'name'], '')
                    .setIn(['signupData', 'member', 'phone'], '')
                    .setIn(['signupData', 'member', 'birth'], '2000-01-01')
                    .setIn(['signupData', 'member', 'gender'], '남');
    },
    [MEMBER_VALIDATE] : (state, action) => {
        return state.setIn(['signupData', 'member', 'fetching'], true);
    },
    [MEMBER_VALIDATE_SUCCESS] : (state, action) => {
        return state.setIn(['signupData', 'member', 'fetching'], false)
                    .setIn(['signupData', 'member', 'validate'], true);
    },
    [MEMBER_VALIDATE_FAILURE] : (state, action) => {
        return state.setIn(['signupData', 'member', 'fetching'], false)
                    .setIn(['signupData', 'member', 'validate'], false);
    },
    [MEMBER_SIGNUP_INPUT_CHANGED] : (state, action) => {
        return state.setIn(['signupData', 'member', action.payload.name], action.payload.value);
    },
    [MEMBER_WARNING_SHOW] : (state, action) => {
        return state.setIn(['signupData', 'member', 'warningText'], 'SHOW');
    },
    [MEMBER_WARNING_HIDE] : (state, action) => {
        return state.setIn(['signupData', 'member', 'warningText'], 'HIDE')
    },
    [COUNSELOR_SIGNUP] : (state, action) => {
        return state.setIn(['signupData', 'counselor', 'fetching'], true)
                    .setIn(['signupData', 'counselor', 'result'], null);
    },
    [COUNSELOR_SIGNUP_SUCCESS] : (state, action) => {
        return state.setIn(['signupData', 'counselor', 'fetching'], false)
                    .setIn(['signupData', 'counselor', 'result'], 'SUCCESS');
    },
    [COUNSELOR_SIGNUP_FAILURE] : (state, action) => {
        return state.setIn(['signupData', 'counselor', 'fetching'], false)
                    .setIn(['signupData', 'counselor', 'result'], 'FAILURE');
    },
    [COUNSELOR_SIGNUP_INITIALIZE] : (state, action) => {
        return state.setIn(['signupData', 'counselor', 'id'], '')
                    .setIn(['signupData', 'counselor', 'pw1'], '')
                    .setIn(['signupData', 'counselor', 'pw2'], '')
                    .setIn(['signupData', 'counselor', 'name'], '')
                    .setIn(['signupData', 'counselor', 'phone'], '')
                    .setIn(['signupData', 'counselor', 'birth'], '2000-01-01')
                    .setIn(['signupData', 'counselor', 'gender'], '남')
                    .setIn(['signupData', 'counselor', 'profileName'], '프로필 사진을 등록하세요')
                    .setIn(['signupData', 'counselor', 'profile'], null)
                    .setIn(['signupData', 'counselor', 'licenseNo'], '')
                    .setIn(['signupData', 'counselor', 'licenseName'], '')
                    .setIn(['signupData', 'counselor', 'license'], null)
                    .setIn(['signupData', 'counselor', 'degree'], '')
                    .setIn(['signupData', 'counselor', 'school'], '')
                    .setIn(['signupData', 'counselor', 'major'], '')
                    .setIn(['signupData', 'counselor', 'graduated'], '')
                    .setIn(['signupData', 'counselor', 'educationName'], '학력 증명서를 등록하세요')
                    .setIn(['signupData', 'counselor', 'licensePath'], '대표 자격증을 등록하세요');
    },
    [COUNSELOR_SIGNUP_INPUT_CHANGED] : (state, action) => {
        return state.setIn(['signupData', 'counselor', action.payload.name], action.payload.value);
    },
    [COUNSELOR_VALIDATE] : (state, action) => {
        return state.setIn(['signupData', 'counselor', 'fetching'], true);
    },
    [COUNSELOR_VALIDATE_SUCCESS] : (state, action) => {
        return state.setIn(['signupData', 'counselor', 'fetching'], false)
        .setIn(['signupData', 'counselor', 'validate'], true);
    },
    [COUNSELOR_VALIDATE_FAILURE] : (state, action) => {
        return state.setIn(['signupData', 'counselor', 'fetching'], false)
                    .setIn(['signupData', 'counselor', 'validate'], false);
    },
    [COUNSELOR_WARNING_SHOW] : (state, action) => {
        return state.setIn(['signupData', 'counselor', 'warningText'], 'SHOW');
    },
    [COUNSELOR_WARNING_HIDE] : (state, action) => {
        return state.setIn(['signupData', 'counselor', 'warningText'], 'HIDE')
    },
    [MODAL_OPEN] : (state, action) => {
        return state.setIn(['modal', 'title'], action.payload.title)
                    .setIn(['modal', 'content'], action.payload.content)
                    .setIn(['modal', 'open'], true)
    },
    [MODAL_CLOSE] : (state, action) => {
        return state.setIn(['modal', 'open'], false)
    },
    [ADD_LICENSE_FORM] : (state, action) => {
        return state.set('licenseOfNum', state.get('licenseOfNum') + 1);
    },
    [DELETE_LICENSE_FORM] : (state, action) => {
        return state.set('licenseOfNum', state.get('licenseOfNum') - 1);
    }
}, defaultState);
