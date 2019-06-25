import {createAction, handleActions} from 'redux-actions';
import {Map, List} from 'immutable';
import axios from 'axios';


const defaultState = Map({
    modal : Map({
        visible : false,
        title : '',
        content : ''
    }),
    getReservations : Map({
        fetching : false,
        result : null,
        reservations : null
    }),
    submitQuestion : Map({
        fetching : false,
        result : null
    }),
    question : Map({
        title : '',
        content :''
    }),
    getCustomerQuestions : Map({
        fetching : false,
        result : null,
        questions : null
    }),
    getCustomerQuestion : Map({
        fetching : false,
        result : null,
        question : null
    }),
    currPage : 1,
    maxPage : null,
    selectedCounselorSeq : null,
    checkIsBlack : Map({
        fetching : false
    })
});


export const OPEN_MODAL = 'customer/OPEN_MODAL';
export const CLOSE_MODAL = 'customer/CLOSE_MODAL';
export const GET_RESERVATIONS = 'customer/GET_RESERVATIONS';
export const GET_RESERVATIONS_SUCCESS = 'customer/GET_RESERVATIONS_SUCCESS';
export const GET_RESERVATIONS_FAILURE = 'customer/GET_RESERVATIONS_FAILURE';
export const SUBMIT_QUESTION = 'customer/SUBMIT_QUESTION';
export const SUBMIT_QUESTION_SUCCESS = 'customer/SUBMIT_QUESTION_SUCCESS';
export const SUBMIT_QUESTION_FAILURE = 'customer/SUBMIT_QUESTION_FAILURE';
export const CHANGE_QUESTION = 'customer/CHANGE_QUESTION';
export const GET_CUSTOMER_QUESTIONS = 'customer/GET_CUSTOMER_QUESTIONS';
export const GET_CUSTOMER_QUESTIONS_SUCCESS = 'customer/GET_CUSTOMER_QUESTIONS_SUCCESS';
export const GET_CUSTOMER_QUESTIONS_FAILURE = 'customer/GET_CUSTOMER_QUESTIONS_FAILURE';
export const GET_CUSTOMER_QUESTION = 'customer/GET_CUSTOMER_QUESTION';
export const GET_CUSTOMER_QUESTION_SUCCESS = 'customer/GET_CUSTOMER_QUESTION_SUCCESS';
export const GET_CUSTOMER_QUESTION_FAILURE = 'customer/GET_CUSTOMER_QUESTION_FAILURE';
export const INITIALIZE_QUESTION = 'customer/INITIALIZE_QUESTION';
export const INSERT_PAGENUM = 'customer/INSERT_PAGENUM';
export const GET_MAX_PAGE = 'customer/GET_MAX_PAGE';
export const GET_MAX_PAGE_SUCCESS = 'customer/GET_MAX_PAGE_SUCCESS';
export const GET_MAX_PAGE_FAILURE = 'customer/GET_MAX_PAGE_FAILURE';
export const SELECT_COUNSELOR = 'customer/SELECT_COUNSELOR';
export const CHECK_IS_BLACK = 'customer/CHECK_IS_BLACK';
export const CHECK_IS_BLACK_FINISH = 'customer/CHECK_IS_BLACK_FINISH';

export const openModal = createAction(OPEN_MODAL);
export const closeModal = createAction(CLOSE_MODAL);
export const getReservations = createAction(GET_RESERVATIONS);
export const getReservationsSuccess = createAction(GET_RESERVATIONS_SUCCESS);
export const getReservationsFailure = createAction(GET_RESERVATIONS_FAILURE);
export const submitQuestion = createAction(SUBMIT_QUESTION);
export const submitQuestionSuccess = createAction(SUBMIT_QUESTION_SUCCESS);
export const submitQuestionFailure = createAction(SUBMIT_QUESTION_FAILURE);
export const changeQuestion = createAction(CHANGE_QUESTION);
export const getCustomerQuestions = createAction(GET_CUSTOMER_QUESTIONS);
export const getCustomerQuestionsSuccess = createAction(GET_CUSTOMER_QUESTIONS_SUCCESS);
export const getCustomerQuestionsFailure = createAction(GET_CUSTOMER_QUESTIONS_FAILURE);
export const getCustomerQuestion = createAction(GET_CUSTOMER_QUESTION);
export const getCustomerQuestionSuccess = createAction(GET_CUSTOMER_QUESTION_SUCCESS);
export const getCustomerQuestionFailure = createAction(GET_CUSTOMER_QUESTION_FAILURE);
export const initializeQuestion = createAction(INITIALIZE_QUESTION);
export const insertPageNum = createAction(INSERT_PAGENUM);
export const getMaxPage = createAction(GET_MAX_PAGE);
export const getMaxPageSuccess = createAction(GET_MAX_PAGE_SUCCESS);
export const getMaxPageFailure = createAction(GET_MAX_PAGE_FAILURE);
export const selectCounselor = createAction(SELECT_COUNSELOR);
export const checkIsBlack = createAction(CHECK_IS_BLACK);
export const checkIsBlackFinish = createAction(CHECK_IS_BLACK_FINISH);


export const getMaxPageAction = () => (dispatch) => {

    const URL = '/api/get/question/maxpage';
    axios
        .get(URL)
        .then(resData => {
            const {maxPage, result} = resData.data;
            if(result === 'SUCCESS')
                dispatch({type : GET_MAX_PAGE_SUCCESS, payload : {maxPage}});
            else
                dispatch({type : GET_MAX_PAGE_FAILURE});
        })
        .catch(err => {
            dispatch({type : GET_MAX_PAGE_FAILURE});
        })
}

//api/get/customer/question
export const getCustomerQuestionAction = (bId) => (dispatch) => {
    dispatch({type : GET_CUSTOMER_QUESTION});

    const URL = `/api/get/customer/question?bId=${bId}`;

    axios
        .get(URL)
        .then(resData => {
            const {result, question} = resData.data;
            if(result === 'SUCCESS') {
                dispatch({type : GET_CUSTOMER_QUESTION_SUCCESS, payload : {question}});
                return 1;
            } else {
                dispatch({type : GET_CUSTOMER_QUESTION_FAILURE});
                return 0;
            }
        })
        .catch(err => {
            dispatch({type : GET_CUSTOMER_QUESTION_FAILURE});
            return 0;
        })
}


export const getCustomerQuestionsAction = (pageNum) => (dispatch) => {
    dispatch({type : GET_CUSTOMER_QUESTIONS});
    const URL = `/api/get/customer/questions?pageNum=${pageNum}`;
    axios
        .get(URL)
        .then(resData => {
            const data = resData.data;
            console.log(data);
            if (data.result === 'SUCCESS') {
                axios
                    .get('/api/get/question/maxpage')
                    .then(resData => {
                        const {result, maxPage} = resData.data;
                        if(result === 'SUCCESS') {
                            dispatch({type : GET_CUSTOMER_QUESTIONS_SUCCESS, payload : {questions : data.questions, maxPage}});
                        } else {
                            dispatch({type : GET_CUSTOMER_QUESTIONS_FAILURE});
                        }
                    })
                    .catch(err => {
                        dispatch({type : GET_CUSTOMER_QUESTIONS_FAILURE});
                    })
            } else {
                dispatch({type : GET_CUSTOMER_QUESTIONS_FAILURE});
            }
        })
        .catch(err => {
            dispatch({type : GET_CUSTOMER_QUESTIONS_FAILURE});
        })

}


export const submitQuestionAction = (id, name, title, content) => (dispatch) => {
    dispatch({type : SUBMIT_QUESTION});

    const sql = '/api/customer/submit/question';
    const params = {
        id,
        name,
        title,
        content
    }
    return axios
        .post(sql,params)
        .then(resData => {
            const data = resData.data;
            if(data.result === 'SUCCESS'){
                dispatch({type : SUBMIT_QUESTION_SUCCESS});
                setTimeout(() => {
                    dispatch({type : CLOSE_MODAL});
                }, 200);
            }
            else
                dispatch({type : SUBMIT_QUESTION_FAILURE});
        })
        .catch(err => {
            dispatch({type : SUBMIT_QUESTION_FAILURE});
        })
}

export const getReservationsAction = (memberSeq) => (dispatch) => {
    dispatch({type : GET_RESERVATIONS});

    const URL=`/api/customer/get/reservation?seq=${memberSeq}`
    axios
        .get(URL)
        .then(resData => {
            const data = resData.data;
            if(data.result === 'SUCCESS') {
                dispatch({type : GET_RESERVATIONS_SUCCESS, payload : {reservations : data.reservations}});
            } else {
                dispatch({type : GET_RESERVATIONS_FAILURE});
            }
        })
        .catch(err => {
            dispatch({type : GET_RESERVATIONS_FAILURE});
        })
}

export default handleActions({
    [GET_RESERVATIONS] : (state, action) => {
        return state.setIn(['getReservations', 'fetching'], true);
    },
    [GET_RESERVATIONS_SUCCESS] : (state, action) => {
        return state.setIn(['getReservations', 'fetching'], false)
                    .setIn(['getReservations', 'result'], 'SUCCESS')
                    .setIn(['getReservations', 'reservations'], action.payload.reservations);
    },
    [GET_RESERVATIONS_FAILURE] : (state, action) => {
        return state.setIn(['getReservations', 'fetching'], false)
                    .setIn(['getReservations', 'result'], 'FAILURE')
                    .setIn(['getReservations', 'reservations'], null);
    },
    [OPEN_MODAL] : (state, action) => {
        return state.setIn(['modal', 'visible'], true);
                    // .setIn(['modal', 'title'], action.payload.title)
                    // .setIn(['modal', 'content'], action.payload.content);
    },
    [CLOSE_MODAL] : (state, action) => {
        return state.setIn(['modal', 'visible'], false);
    },
    [SUBMIT_QUESTION] : (state, action) => {
        return state.setIn(['submitQuestion', 'fetching'], true);
    },
    [SUBMIT_QUESTION_SUCCESS] : (state, action) => {
        return state.setIn(['submitQuestion', 'fetching'], false)
                    .setIn(['submitQuestion', 'result'], 'SUCCESS');
    },
    [SUBMIT_QUESTION_FAILURE] : (state, action) => {
        return state.setIn(['submitQuestion', 'fetching'], true)
                    .setIn(['submitQuestion', 'result'], 'FAILURE');
    },
    [CHANGE_QUESTION] : (state, action) => {
        return state.setIn(['modal', action.payload.name], action.payload.value);
    },
    [GET_CUSTOMER_QUESTIONS] : (state, action) => {
        return state.setIn(['getCustomerQuestions', 'fetching'], true);
    },
    [GET_CUSTOMER_QUESTIONS_SUCCESS] : (state, action) => {
        return state.setIn(['getCustomerQuestions', 'fetching'], false)
                    .setIn(['getCustomerQuestions', 'result'], 'SUCCESS')
                    .setIn(['getCustomerQuestions', 'questions'], action.payload.questions)
                    .set('maxPage', action.payload.maxPage);
    },
    [GET_CUSTOMER_QUESTIONS_FAILURE] : (state, action) => {
        return state.setIn(['getCustomerQuestions', 'fetching'], false)
                    .setIn(['getCustomerQuestions', 'result'], 'FAILURE')
                    .setIn(['getCustomerQuestions', 'questions'], null);
    },
    [GET_CUSTOMER_QUESTION] : (state, action) => {
        return state.setIn(['getCustomerQuestion', 'fetching'], true);
    },
    [GET_CUSTOMER_QUESTION_SUCCESS] : (state, action) => {
        return state.setIn(['getCustomerQuestion', 'fetching'], false)
                    .setIn(['getCustomerQuestion', 'result'], 'SUCCESS')
                    .setIn(['getCustomerQuestion', 'question'], action.payload.question);
    },
    [GET_CUSTOMER_QUESTION_FAILURE] : (state, action) => {
        return state.setIn(['getCustomerQuestion', 'fetching'], false)
                    .setIn(['getCustomerQuestion', 'result'], 'FAILURE')
                    .setIn(['getCustomerQuestion', 'question'], null);
    },
    [INITIALIZE_QUESTION] : (state, action) => {
        return state.setIn(['modal', 'title'], '')
                    .setIn(['modal', 'content'], '')
                    .setIn(['modal', 'visible'], false)
                    .setIn(['getCustomerQuestion', 'result'], null);
    },
    [INSERT_PAGENUM] : (state, action) => {
        return state.set('currPage', action.payload.pageNum);
    },
    [SELECT_COUNSELOR] : (state, action) => {
        return state.set('selectedCounselorSeq', action.payload.counselorSeq);
    },
    [CHECK_IS_BLACK] : (state, action) => {
        return state.setIn(['checkIsBlack', 'fetching'], true);
    },
    [CHECK_IS_BLACK_FINISH] : (state, action) => {
        return state.setIn(['checkIsBlack', 'fetching'], false);
    }
},defaultState);
