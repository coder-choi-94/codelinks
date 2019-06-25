import {createAction, handleActions} from 'redux-actions';
import {Map, List} from 'immutable';
import axios from 'axios';


const defaultState = Map({
    pageNum : 1,
    search : Map({
        key : 'id',
        value : ''
    }),
    noticeForm : Map({
        visible : false,
        title : '',
        content : ''
    }),
    replyQuestion : Map({
        fetching : false,
        result : null
    }),
    searchCustomer : Map({
        fetching : false,
        result : null,
        customers : null
    }),
    searchCounselor : Map({
        fetching : false,
        result : null,
        counselors : null
    }),
    getNotice : Map({
        fetching : false,
        result : null,
        notice : null
    }),
    getMaxPage : Map({
        fetching : false,
        result : null,
        maxPage : null
    }),
    getNoticeOne : Map({
        fetching : false,
        result : null,
        notice : null
    }),
    submitNotice : Map({
        fetching : false,
        result : null
    }),
    getCounselors : Map({
        fetching: false,
        result : null,
        counselors : null
    }),
    approveCounselor : Map({
        fetching: false,
        result : null
    }) 
})

export const REPLY_QUESTION = 'admin/REPLY_QUESTION';
export const REPLY_QUESTION_SUCCESS = 'admin/REPLY_QUESTION_SUCCESS';
export const REPLY_QUESTION_FAILURE = 'admin/REPLY_QUESTION_FAILURE';
export const SHOW_CUSTOMER_INFO = 'admin/SHOW_CUSTOMER_INFO';
export const SHOW_COUNSELOR_INFO = 'admin/SHOW_COUNSELOR_INFO';
export const SHOW_NOTICE = 'admin/SHOW_NOTICE';
export const SHOW_APPROVAL = 'admin/SHOW_APPROVAL';
export const SHOW_MONITOR = 'admin/SHOW_MONITOR';
export const CHANGE_SEARCH_VALUE = 'admin/CHANGE_SEARCH_VALUE';
export const CHANGE_SEARCH_KEY = 'admin/CHANGE_SEARCH_KEY';
export const SEARCH_CUSTOMER_BY_NAME = 'admin/SEARCH_CUSTOMER_BY_NAME';
export const SEARCH_CUSTOMER_BY_NAME_SUCCESS = 'admin/SEARCH_CUSTOMER_BY_NAME_SUCCESS';
export const SEARCH_CUSTOMER_BY_NAME_FAILURE = 'admin/SEARCH_CUSTOMER_BY_NAME_FAILURE';
export const SEARCH_CUSTOMER_BY_ID = 'admin/SEARCH_CUSTOMER_BY_ID';
export const SEARCH_CUSTOMER_BY_ID_SUCCESS = 'admin/SEARCH_CUSTOMER_BY_ID_SUCCESS';
export const SEARCH_CUSTOMER_BY_ID_FAILURE = 'admin/SEARCH_CUSTOMER_BY_ID_FAILURE';
export const SEARCH_COUNSELOR_BY_NAME = 'admin/SEARCH_COUNSELOR_BY_NAME';
export const SEARCH_COUNSELOR_BY_NAME_SUCCESS = 'admin/SEARCH_COUNSELOR_BY_NAME_SUCCESS';
export const SEARCH_COUNSELOR_BY_NAME_FAILURE = 'admin/SEARCH_COUNSELOR_BY_NAME_FAILURE';
export const SEARCH_COUNSELOR_BY_ID = 'admin/SEARCH_COUNSELOR_BY_ID';
export const SEARCH_COUNSELOR_BY_ID_SUCCESS = 'admin/SEARCH_COUNSELOR_BY_ID_SUCCESS';
export const SEARCH_COUNSELOR_BY_ID_FAILURE = 'admin/SEARCH_COUNSELOR_BY_ID_FAILURE';
export const SEARCH_COUNSELOR_BY_STATUS = 'admin/SEARCH_COUNSELOR_BY_STATUS';
export const SEARCH_COUNSELOR_BY_STATUS_SUCCESS = 'admin/SEARCH_COUNSELOR_BY_STATUS_SUCCESS';
export const SEARCH_COUNSELOR_BY_STATUS_FAILURE = 'admin/SEARCH_COUNSELOR_BY_STATUS_FAILURE';
export const INITIALIZE_SEARCH_VALUE = 'admin/INITIALIZE_SEARCH_VALUE';
export const GET_MAX_PAGE = 'admin/GET_MAX_PAGE';
export const GET_MAX_PAGE_SUCCESS = 'admin/GET_MAX_PAGE_SUCCESS';
export const GET_MAX_PAGE_FAILURE = 'admin/GET_MAX_PAGE_FAILURE';
export const GET_NOTICE = 'admin/GET_NOTICE';
export const GET_NOTICE_SUCCESS = 'admin/GET_NOTICE_SUCCESS';
export const GET_NOTICE_FAILURE = 'admin/GET_NOTICE_FAILURE';
export const GET_NOTICE_ONE = 'admin/GET_NOTICE_ONE';
export const GET_NOTICE_ONE_SUCCESS = 'admin/GET_NOTICE_ONE_SUCCESS';
export const GET_NOTICE_ONE_FAILURE = 'admin/GET_NOTICE_ONE_FAILURE';
export const ON_CHANGE_NOTICE_FORM = 'admin/ON_CHANGE_NOTICE_FORM';
export const OPEN_NOTICE_FORM = 'admin/OPEN_NOTICE_FORM';
export const CLOSE_NOTICE_FORM = 'admin/CLOSE_NOTICE_FORM';
export const SUBMIT_NOTICE = 'admin/SUBMIT_NOTICE';
export const SUBMIT_NOTICE_SUCCESS = 'admin/SUBMIT_NOTICE_SUCCESS';
export const SUBMIT_NOTICE_FAILURE = 'admin/SUBMIT_NOTICE_FAILURE';
export const GET_COUNSELORS_TO_APPROVE = 'admin/GET_COUNSELORS_TO_APPROVE';
export const GET_COUNSELORS_TO_APPROVE_SUCCESS = 'admin/GET_COUNSELORS_TO_APPROVE_SUCCESS';
export const GET_COUNSELORS_TO_APPROVE_FAILURE = 'admin/GET_COUNSELORS_TO_APPROVE_FAILURE';
export const APPROVE_COUNSELOR = 'admin/APPROVE_COUNSELOR';
export const APPROVE_COUNSELOR_SUCCESS = 'admin/APPROVE_COUNSELOR_SUCCESS';
export const APPROVE_COUNSELOR_FAILURE = 'admin/APPROVE_COUNSELOR_FAILURE';


export const replyQuestion = createAction(REPLY_QUESTION);
export const replyQuestionSuccess = createAction(REPLY_QUESTION_SUCCESS);
export const replyQuestionFailure = createAction(REPLY_QUESTION_FAILURE);
export const showCustomerInfo = createAction(SHOW_CUSTOMER_INFO);
export const showCounselorInfo = createAction(SHOW_COUNSELOR_INFO);
export const showNotice = createAction(SHOW_NOTICE);
export const showApproval = createAction(SHOW_APPROVAL);
export const showMonitor = createAction(SHOW_MONITOR);
export const changeSearchValue = createAction(CHANGE_SEARCH_VALUE);
export const changeSearchKey = createAction(CHANGE_SEARCH_KEY);
export const searchCustomerByName = createAction(SEARCH_CUSTOMER_BY_NAME);
export const searchCustomerByNameSuccess = createAction(SEARCH_CUSTOMER_BY_NAME_SUCCESS);
export const searchCustomerByNameFailure = createAction(SEARCH_CUSTOMER_BY_NAME_FAILURE);
export const searchCustomerById = createAction(SEARCH_CUSTOMER_BY_ID);
export const searchCustomerByIdSuccess = createAction(SEARCH_CUSTOMER_BY_ID_SUCCESS);
export const searchCustomerByIdFailure = createAction(SEARCH_CUSTOMER_BY_ID_FAILURE);
export const searchCounselorByName = createAction(SEARCH_COUNSELOR_BY_NAME);
export const searchCounselorByNameSuccess = createAction(SEARCH_COUNSELOR_BY_NAME_SUCCESS);
export const searchCounselorByNameFailure = createAction(SEARCH_COUNSELOR_BY_NAME_FAILURE);
export const searchCounselorById = createAction(SEARCH_COUNSELOR_BY_ID);
export const searchCounselorByIdSuccess = createAction(SEARCH_COUNSELOR_BY_ID_SUCCESS);
export const searchCounselorByIdFailure = createAction(SEARCH_COUNSELOR_BY_ID_FAILURE);
export const initializeSearchValue = createAction(INITIALIZE_SEARCH_VALUE);
export const searchCounselorByStatus = createAction(SEARCH_COUNSELOR_BY_STATUS);
export const searchCounselorByStatusSuccess = createAction(SEARCH_COUNSELOR_BY_STATUS_SUCCESS);
export const searchCounselorByStatusFailure = createAction(SEARCH_COUNSELOR_BY_STATUS_FAILURE);
export const getMaxPage = createAction(GET_MAX_PAGE);
export const getMaxPageSuccess = createAction(GET_MAX_PAGE_SUCCESS);
export const getMaxPageFailure = createAction(GET_MAX_PAGE_FAILURE);
export const getNotice = createAction(GET_NOTICE);
export const getNoticeSuccess = createAction(GET_NOTICE_SUCCESS);
export const getNoticeFailure = createAction(GET_NOTICE_FAILURE);
export const getNoticeOne = createAction(GET_NOTICE_ONE);
export const getNoticeOneSuccess = createAction(GET_NOTICE_ONE_SUCCESS);
export const getNoticeOneFailure = createAction(GET_NOTICE_ONE_FAILURE);
export const onChangeNoticeForm = createAction(ON_CHANGE_NOTICE_FORM);
export const openNoticeForm = createAction(OPEN_NOTICE_FORM);
export const closeNoticeForm = createAction(CLOSE_NOTICE_FORM);
export const submitNotice = createAction(SUBMIT_NOTICE);
export const submitNoticeSuccess = createAction(SUBMIT_NOTICE_SUCCESS);
export const submitNoticeFailure = createAction(SUBMIT_NOTICE_FAILURE);
export const getCounselorsToApprove = createAction(GET_COUNSELORS_TO_APPROVE);
export const getCounselorsToApproveSuccess = createAction(GET_COUNSELORS_TO_APPROVE_SUCCESS);
export const getCounselorsToApproveFailure = createAction(GET_COUNSELORS_TO_APPROVE_FAILURE);
export const approveCounselor = createAction(APPROVE_COUNSELOR);
export const approveCounselorSuccess = createAction(APPROVE_COUNSELOR_SUCCESS);
export const approveCounselorFailure = createAction(APPROVE_COUNSELOR_FAILURE);



export const getCounselorsToApproveAction = () => (dispatch) => {
    dispatch({type : GET_COUNSELORS_TO_APPROVE});

    const URL = `/api/get/counselor/approval`;
    return axios
        .get(URL)
        .then(res => {
            const {result, counselors} = res.data;
            if(result === 'SUCCESS') {
                dispatch({type : GET_COUNSELORS_TO_APPROVE_SUCCESS, payload : {counselors}});
            } else {
                dispatch({type : GET_COUNSELORS_TO_APPROVE_FAILURE});
            }
        })
        .catch(err => {
            dispatch({type : GET_COUNSELORS_TO_APPROVE_FAILURE});
        })
}


export const approveCounselorAction = (seq) => (dispatch) => {
    dispatch({type : APPROVE_COUNSELOR});

    const params = {seq};
    const URL = `/api/approve/counselor`;
    return axios
        .post(URL, params)
        .then(res => {
            const {result} = res.data;
            if(result === 'SUCCESS') {
                dispatch({type : APPROVE_COUNSELOR_SUCCESS});
            } else {
                dispatch({type : APPROVE_COUNSELOR_FAILURE});
            }
        })
        .catch(err => {
            dispatch({type : APPROVE_COUNSELOR_FAILURE});
        })
}



export const submitNoticeAction = (data) => (dispatch) => {
    dispatch({type : SUBMIT_NOTICE});

    const URL = `/api/submit/notice`;
    return axios
        .post(URL, data)
        .then(res => {
            const {result} = res.data;
            if(result === 'SUCCESS') {
                dispatch({type : SUBMIT_NOTICE_SUCCESS});
            } else {
                dispatch({type : SUBMIT_NOTICE_FAILURE});
            }
        })
        .catch(err => {
            dispatch({type : SUBMIT_NOTICE_FAILURE});
        })
}

export const getNoticeOneAction = (seq) => (dispatch) => {
    dispatch({type : GET_NOTICE_ONE});

    const URL = `/api/get/notice/one?seq=${seq}`;
    return axios
        .get(URL)
        .then(res => {
            const {result, notice} = res.data;
            if(result === 'SUCCESS') {
                dispatch({type : GET_NOTICE_ONE_SUCCESS, payload : {notice}});
            } else {
                dispatch({type : GET_NOTICE_ONE_FAILURE});
            }
        })
        .catch(err => {
            dispatch({type : GET_NOTICE_ONE_FAILURE});
        })
}


export const getMaxPageAction = () => (dispatch) => {
    dispatch({type : GET_MAX_PAGE});

    const URL = `/api/get/notice/maxpage`;
    return axios
        .get(URL)
        .then(res => {
            const {result, maxPage} = res.data;
            if(result === 'SUCCESS') {
                dispatch({type : GET_MAX_PAGE_SUCCESS, payload : {maxPage}});
            } else {
                dispatch({type : GET_MAX_PAGE_FAILURE});
            }
        })
        .catch(err => {
            dispatch({type : GET_MAX_PAGE_FAILURE});
        })
}

export const getNoticeAction = (pageNum) => (dispatch) => {
    dispatch({type : GET_NOTICE});

    const URL = `/api/get/notice?currPage=${pageNum}`;
    return axios
        .get(URL)
        .then(res => {
            const {result, notice} = res.data;
            if(result === 'SUCCESS') {
                dispatch({type : GET_NOTICE_SUCCESS, payload : {notice}});
            } else {
                dispatch({type : GET_NOTICE_FAILURE});
            }
        })
        .catch(err => {
            dispatch({type : GET_NOTICE_FAILURE});
        })
}


export const searchCustomerAction = (data) => (dispatch) => {
    const {key, value} = data;

    if(key === 'id') {
        dispatch({type : SEARCH_CUSTOMER_BY_ID});

        const URL = `/api/get/customer/byid?id=${value}`;
        return axios
            .get(URL)
            .then(resData => {
                const {result, customer} = resData.data;
                if(result === 'SUCCESS') {
                    dispatch({type : SEARCH_CUSTOMER_BY_ID_SUCCESS, payload : {customer}});
                } else {
                    dispatch({type : SEARCH_CUSTOMER_BY_ID_FAILURE});
                }
            })
            .catch(err => {
                dispatch({type : SEARCH_CUSTOMER_BY_ID_FAILURE});
            });
        
    } else if(key === 'name') {
        dispatch({type : SEARCH_CUSTOMER_BY_NAME});

        const URL = `/api/get/customer/byname?name=${value}`;
        return axios
            .get(URL)
            .then(resData => {
                const {result, customer} = resData.data;
                if(result === 'SUCCESS') {
                    dispatch({type : SEARCH_CUSTOMER_BY_NAME_SUCCESS, payload : {customer}});
                } else {
                    dispatch({type : SEARCH_CUSTOMER_BY_NAME_FAILURE});
                }
            })
            .catch(err => {
                dispatch({type : SEARCH_CUSTOMER_BY_NAME_FAILURE});
            });
    }
}

export const searchCounselorAction = (data) => (dispatch) => {
    const {key, value} = data;

    if(key === 'id') {
        dispatch({type : SEARCH_COUNSELOR_BY_ID});

        const URL = `/api/get/counselor/byid?id=${value}`;
        return axios
            .get(URL)
            .then(resData => {
                const {result, counselor} = resData.data;
                if(result === 'SUCCESS') {
                    dispatch({type : SEARCH_COUNSELOR_BY_ID_SUCCESS, payload : {counselor}});
                } else {
                    dispatch({type : SEARCH_COUNSELOR_BY_ID_FAILURE});
                }
            })
            .catch(err => {
                dispatch({type : SEARCH_COUNSELOR_BY_ID_FAILURE});
            });
        
    } else if(key === 'name') {
        dispatch({type : SEARCH_COUNSELOR_BY_NAME});

        const URL = `/api/get/counselor/byname?name=${value}`;
        return axios
            .get(URL)
            .then(resData => {
                const {result, counselor} = resData.data;
                if(result === 'SUCCESS') {
                    dispatch({type : SEARCH_COUNSELOR_BY_NAME_SUCCESS, payload : {counselor}});
                } else {
                    dispatch({type : SEARCH_COUNSELOR_BY_NAME_FAILURE});
                }
            })
            .catch(err => {
                dispatch({type : SEARCH_COUNSELOR_BY_NAME_FAILURE});
            });
    } else if(key === 'status') {
        dispatch({type : SEARCH_COUNSELOR_BY_STATUS});

        const URL = `/api/get/counselor/bystatus?status=${value}`;
        return axios
            .get(URL)
            .then(resData => {
                const {result, counselors} = resData.data;
                if(result === 'SUCCESS') {
                    dispatch({type : SEARCH_COUNSELOR_BY_STATUS_SUCCESS, payload : {counselors}});
                } else {
                    dispatch({type : SEARCH_COUNSELOR_BY_STATUS_FAILURE});
                }
            })
            .catch(err => {
                dispatch({type : SEARCH_COUNSELOR_BY_STATUS_FAILURE});
            });
    }
}


export const replyQuestionAction = (data) => (dispatch) => {
    dispatch({type : REPLY_QUESTION});

    const {
        bLevel,
        bGroup,
        id,
        name,
        title,
        content
    } = data;
    const URL ='/api/customer/submit/reply'
    const params = {
        bLevel,
        bGroup,
        id,
        name,
        title,
        content
    };

    return axios
        .post(URL, params)
        .then(resData => {

            const {result} = resData.data;

            if(result === 'SUCCESS') {
                dispatch({type : REPLY_QUESTION_SUCCESS});
                return true;
            } else {
                dispatch({type : REPLY_QUESTION_FAILURE});
                return false;
            }

        })
        .catch(err => {
            dispatch({type : REPLY_QUESTION_FAILURE});
            return false;
        })
}


export default handleActions({
    [REPLY_QUESTION] : (state, action) => {
        return state.setIn(['replyQuestion', 'fetching'], true);
    },
    [REPLY_QUESTION_SUCCESS] : (state, action) => {
        return state.setIn(['replyQuestion', 'fetching'], false)
                    .setIn(['replyQuestion', 'result'], 'SUCCESS');
    },
    [REPLY_QUESTION_FAILURE] : (state, action) => {
        return state.setIn(['replyQuestion', 'fetching'], true)
                    .setIn(['replyQuestion', 'result'], 'FAILURE');
    },
    [SHOW_CUSTOMER_INFO] : (state, action) => {
        return state.set('view', 'customer');
    },
    [SHOW_COUNSELOR_INFO] : (state, action) => {
        return state.set('view', 'counselor');
    },
    [SHOW_NOTICE] : (state, action) => {
        return state.set('view', 'notice');
    },
    [SHOW_APPROVAL] : (state, action) => {
        return state.set('view', 'approval');
    },
    [SHOW_MONITOR] : (state, action) => {
        return state.set('view', 'monitor');
    },
    [CHANGE_SEARCH_VALUE] : (state, action) => {
        return state.setIn(['search', 'value'], action.payload.value);
    },
    [CHANGE_SEARCH_KEY] : (state, action) => {
        return state.setIn(['search', 'key'], action.payload.key);
    },
    [SEARCH_CUSTOMER_BY_ID] : (state, action) => {
        return state.setIn(['searchCustomer', 'fetching'], true);
    },
    [SEARCH_CUSTOMER_BY_ID_SUCCESS] : (state, action) => {
        return state.setIn(['searchCustomer', 'fetching'], false)
                    .setIn(['searchCustomer', 'result'], 'SUCCESS')
                    .setIn(['searchCustomer', 'customers'], action.payload.customer);
    },
    [SEARCH_CUSTOMER_BY_ID_FAILURE] : (state, action) => {
        return state.setIn(['searchCustomer', 'fetching'], false)
                    .setIn(['searchCustomer', 'result'], 'FAILURE')
                    .setIn(['searchCustomer', 'customers'], null);
    },
    [SEARCH_CUSTOMER_BY_NAME] : (state, action) => {
        return state.setIn(['searchCustomer', 'fetching'], true);
    },
    [SEARCH_CUSTOMER_BY_NAME_SUCCESS] : (state, action) => {
        return state.setIn(['searchCustomer', 'fetching'], false)
                    .setIn(['searchCustomer', 'result'], 'SUCCESS')
                    .setIn(['searchCustomer', 'customers'], action.payload.customer);
    },
    [SEARCH_CUSTOMER_BY_NAME_FAILURE] : (state, action) => {
        return state.setIn(['searchCustomer', 'fetching'], false)
                    .setIn(['searchCustomer', 'result'], 'FAILURE')
                    .setIn(['searchCustomer', 'customers'], null);
    },
    [SEARCH_COUNSELOR_BY_ID] : (state, action) => {
        return state.setIn(['searchCounselor', 'fetching'], true);
    },
    [SEARCH_COUNSELOR_BY_ID_SUCCESS] : (state, action) => {
        return state.setIn(['searchCounselor', 'fetching'], false)
                    .setIn(['searchCounselor', 'result'], 'SUCCESS')
                    .setIn(['searchCounselor', 'counselors'], action.payload.counselor);
    },
    [SEARCH_COUNSELOR_BY_ID_FAILURE] : (state, action) => {
        return state.setIn(['searchCounselor', 'fetching'], false)
                    .setIn(['searchCounselor', 'result'], 'FAILURE')
                    .setIn(['searchCounselor', 'counselors'], null);
    },
    [SEARCH_COUNSELOR_BY_NAME] : (state, action) => {
        return state.setIn(['searchCounselor', 'fetching'], true);
    },
    [SEARCH_COUNSELOR_BY_NAME_SUCCESS] : (state, action) => {
        return state.setIn(['searchCounselor', 'fetching'], false)
                    .setIn(['searchCounselor', 'result'], 'SUCCESS')
                    .setIn(['searchCounselor', 'counselors'], action.payload.counselor);
    },
    [SEARCH_COUNSELOR_BY_NAME_FAILURE] : (state, action) => {
        return state.setIn(['searchCounselor', 'fetching'], false)
                    .setIn(['searchCounselor', 'result'], 'FAILURE')
                    .setIn(['searchCounselor', 'counselors'], null);
    },
    [SEARCH_COUNSELOR_BY_STATUS] : (state, action) => {
        return state.setIn(['searchCounselor', 'fetching'], true);
    },
    [SEARCH_COUNSELOR_BY_STATUS_SUCCESS] : (state, action) => {
        return state.setIn(['searchCounselor', 'fetching'], false)
                    .setIn(['searchCounselor', 'result'], 'SUCCESS')
                    .setIn(['searchCounselor', 'counselors'], action.payload.counselors);
    },
    [SEARCH_COUNSELOR_BY_STATUS_FAILURE] : (state, action) => {
        return state.setIn(['searchCounselor', 'fetching'], false)
                    .setIn(['searchCounselor', 'result'], 'FAILURE')
                    .setIn(['searchCounselor', 'counselors'], null);
    },
    [INITIALIZE_SEARCH_VALUE] : (state, action) => {
        return state.setIn(['search', 'key'], 'id')
                    .setIn(['search', 'value'], '')
                    .setIn(['searchCounselor', 'counselors'], null)
                    .setIn(['searchCounselor', 'result'], null)
                    .setIn(['searchCounselor', 'fetching'], false)
                    .setIn(['searchCustomer', 'customers'], null)
                    .setIn(['searchCustomer', 'result'], null)
                    .setIn(['searchCustomer', 'fetching'], false);

    },
    [GET_MAX_PAGE] : (state, action) => {
        return state.setIn(['getMaxPage', 'fetching'], true);
    },
    [GET_MAX_PAGE_SUCCESS] : (state, action) => {
        return state.setIn(['getMaxPage', 'fetching'], false)
                    .setIn(['getMaxPage', 'result'], 'SUCCESS')
                    .setIn(['getMaxPage', 'maxPage'], action.payload.maxPage);
    },
    [GET_MAX_PAGE_FAILURE] : (state, action) => {
        return state.setIn(['getMaxPage', 'fetching'], false)
                    .setIn(['getMaxPage', 'result'], 'FAILURE')
                    .setIn(['getMaxPage', 'notice'], null);
    },
    [GET_NOTICE] : (state, action) => {
        return state.setIn(['getNotice', 'fetching'], true);
    },
    [GET_NOTICE_SUCCESS] : (state, action) => {
        return state.setIn(['getNotice', 'fetching'], false)
                    .setIn(['getNotice', 'result'], 'SUCCESS')
                    .setIn(['getNotice', 'notice'], action.payload.notice);
    },
    [GET_NOTICE_FAILURE] : (state, action) => {
        return state.setIn(['getNotice', 'fetching'], false)
                    .setIn(['getNotice', 'result'], 'FAILURE')
                    .setIn(['getNotice', 'notice'], null);
    },
    [GET_NOTICE_ONE] : (state, action) => {
        return state.setIn(['getNoticeOne', 'fetching'], true)
                    .setIn(['getNoticeOne', 'result'], null)
    },
    [GET_NOTICE_ONE_SUCCESS] : (state, action) => {
        return state.setIn(['getNoticeOne', 'fetching'], false)
                    .setIn(['getNoticeOne', 'result'], 'SUCCESS')
                    .setIn(['getNoticeOne', 'notice'], action.payload.notice);
    },
    [GET_NOTICE_ONE_FAILURE] : (state, action) => {
        return state.setIn(['getNoticeOne', 'fetching'], false)
                    .setIn(['getNoticeOne', 'result'], 'FAILURE')
                    .setIn(['getNoticeOne', 'notice'], null);
    },
    [ON_CHANGE_NOTICE_FORM] : (state, action) => {
        return state.setIn(['noticeForm', action.payload.name], action.payload.value);
    },
    [OPEN_NOTICE_FORM] : (state, action) => {
        return state.setIn(['noticeForm', 'visible'], true)
                    .setIn(['noticeForm', 'title'], '')
                    .setIn(['noticeForm', 'content'], '');
    },
    [CLOSE_NOTICE_FORM] : (state, action) => {
        return state.setIn(['noticeForm', 'visible'], false);
    },
    [SUBMIT_NOTICE] : (state, actio) => {
        return state.setIn(['submitNotice', 'fetching'], true)
                    .setIn(['noticeForm', 'visible'], false);
    },
    [SUBMIT_NOTICE_SUCCESS] : (state, action) => {
        return state.setIn(['submitNotice', 'fetching'], false)
                    .setIn(['submitNotice', 'result'], 'SUCCESS')
    },
    [SUBMIT_NOTICE_FAILURE] : (state, actio) => {
        return state.setIn(['submitNotice', 'fetching'], false)
                    .setIn(['submitNotice', 'result'], 'FAILURE')
    },
    [GET_COUNSELORS_TO_APPROVE] : (state, action) => {
        return state.setIn(['getCounselors', 'fetching'], true)
                    .setIn(['getCounselors', 'result'], null);
    },
    [GET_COUNSELORS_TO_APPROVE_SUCCESS] : (state, action) => {
        return state.setIn(['getCounselors', 'fetching'], false)
                    .setIn(['getCounselors', 'result'], 'SUCCESS')
                    .setIn(['getCounselors', 'counselors'], action.payload.counselors);
    },
    [GET_COUNSELORS_TO_APPROVE_FAILURE] : (state, action) => {
        return state.setIn(['getCounselors', 'fetching'], false)
                    .setIn(['getCounselors', 'result'], 'FAILURE')
                    .setIn(['getCounselors', 'counselors'], null);
    },
    [APPROVE_COUNSELOR] : (state, action) => {
        return state.setIn(['approveCounselor', 'fetching'], true)
                    .setIn(['approveCounselor', 'result'], null);
    },
    [APPROVE_COUNSELOR_SUCCESS] : (state, action) => {
        return state.setIn(['approveCounselor', 'fetching'], false)
                    .setIn(['approveCounselor', 'result'], 'SUCCESS');
    },
    [APPROVE_COUNSELOR_FAILURE] : (state, action) => {
        return state.setIn(['approveCounselor', 'fetching'], false)
                    .setIn(['approveCounselor', 'result'], 'FAILURE');
    }
}, defaultState);

