import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import axios from 'axios';

export const INITIALIZE_STORE = 'counseling/INITIALIZE_STORE';
export const OPEN_MODAL = 'counseling/OPEN_MODAL';
export const CLOSE_MODAL = 'counseling/CLOSE_MODAL';
export const SEARCH_CHANGED = 'counseling/SEARCH_CHANGED';
export const GET_COUNSELING = 'counseling/GET_COUNSELING';
export const GET_COUNSELING_SUCCESS = 'counseling/GET_COUNSELING_SUCCESS';
export const GET_COUNSELING_FAILURE = 'counseling/GET_COUNSELING_FAILURE';
export const GET_COUNSELOR_INFO = 'counseling/GET_COUNSELOR_INFO';
export const GET_COUNSELOR_INFO_SUCCESS = 'counseling/GET_COUNSELOR_INFO_SUCCESS';
export const GET_COUNSELOR_INFO_FAILURE = 'counseling/GET_COUNSELOR_INFO_FAILURE';
export const GET_CATEGORIES = 'counseling/GET_CATEGORIES';
export const GET_CATEGORIES_SUCCESS = 'counseling/GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAILURE = 'counseling/GET_CATEGORIES_FAILURE';
export const TOGGLE_CATEGORY = 'counseling/TOGGLE_CATEGORY';
export const UNCHECK_CATEGORY = 'counseling/UNCHECK_CATEGORY';
export const NEXT_STAGE = 'counseling/NEXT_STAGE';
export const PREV_STAGE = 'counseling/PREV_STAGE';
export const GET_SCHEDULES = 'counseling/GET_SCHEDULES';
export const GET_SCHEDULES_SUCCESS = 'counseling/GET_SCHEDULES_SUCCESS';
export const GET_SCHEDULES_FAILURE = 'counseling/GET_SCHEDULES_FAILURE';
export const TOGGLE_SCHEDULE = 'counseling/TOGGLE_SCHEDULE';
export const UNCHECK_SCHEDULE = 'counseling/UNCHECK_SCHEDULE';
export const GET_PREV_DATE = 'counseling/GET_PREV_DATE';
export const GET_NEXT_DATE = 'counseling/GET_NEXT_DATE';
export const RESERVE_COUNSELING = 'counseling/RESERVE_COUNSELING';
export const RESERVE_COUNSELING_SUCCESS = 'counseling/RESERVE_COUNSELING_SUCCESS';
export const RESERVE_COUNSELING_FAILURE = 'counseling/RESERVE_COUNSELING_FAILURE';
export const CHANGE_MESSAGE = 'counselig/CHANGE_MESSAGE';   //예약 마지막 메세제


export const initializeStore = createAction(INITIALIZE_STORE);
export const openModal = createAction(OPEN_MODAL);
export const closeModal = createAction(CLOSE_MODAL);
export const getCounseling = createAction(GET_COUNSELING);
export const getCounselingSuccess = createAction(GET_COUNSELING_SUCCESS);
export const getCounselingFailure = createAction(GET_COUNSELING_FAILURE);
export const getCounselorInfo = createAction(GET_COUNSELOR_INFO);
export const getCounselorInfoSuccess = createAction(GET_COUNSELOR_INFO_SUCCESS);
export const getCounselorInfoFailure = createAction(GET_COUNSELOR_INFO_FAILURE);
export const getCategories = createAction(GET_CATEGORIES);
export const getCategoriesSuccess = createAction(GET_CATEGORIES_SUCCESS);
export const getCategoriesFailure = createAction(GET_CATEGORIES_FAILURE);
export const toggleCategory = createAction(TOGGLE_CATEGORY);
export const uncheckCategory = createAction(UNCHECK_CATEGORY);
export const nextStage = createAction(NEXT_STAGE);
export const prevStage = createAction(PREV_STAGE);
export const getSchedules = createAction(GET_SCHEDULES);
export const getSchedulesSuccess = createAction(GET_SCHEDULES_SUCCESS);
export const getSchedulesFailure = createAction(GET_SCHEDULES_FAILURE);
export const toggleSchedule = createAction(TOGGLE_SCHEDULE);
export const uncheckSchedule = createAction(UNCHECK_SCHEDULE);
export const getPrevDate = createAction(GET_PREV_DATE);
export const getNextDate = createAction(GET_NEXT_DATE);
export const reserveCounseling = createAction(RESERVE_COUNSELING);
export const reserveCounselingSuccess = createAction(RESERVE_COUNSELING_SUCCESS);
export const reserveCounselingFailure = createAction(RESERVE_COUNSELING_FAILURE);
export const changeMessage = createAction(CHANGE_MESSAGE);


const defaultState = Map({
    counselings : null,
    fetching : false,
    result : null,
    search : '',
    getCounselorInfo : Map({
        fetching : false,
        result : null,
        counselorInfo : null
    }),
    getCategories : Map({
        fetching : false,
        result : null,
        categories : null
    }),
    getSchedules : Map({
        fetching : false,
        result : null,
        schedules : null,
        selected : 0    // schedules 리스트 인덱스
    }),
    stage : 1,
    reservedInfo : Map({
        category : null,
        date : null,
        week : null,
        time : null,
        message : ''
    }),
    modal : Map({
        open : false,
        title : '',
        content : ''
    }),
    reservation : Map({
        fetching : false,
        result : null,
    })
});

export const getCategoriesAction = (params) => (dispatch) => {
    dispatch({type : GET_CATEGORIES});

    const URL = `/api/get/counselor/category?counselorSeq=${params}`;

    axios
        .get(URL)
        .then(resData => {
            const {categories} = resData.data;
            const parsedCategories = categories.map( category => {
                category.checked = false;
                return category;
            });
            dispatch({type : GET_CATEGORIES_SUCCESS, payload : {parsedCategories}});
        })
        .catch(err => {
            dispatch({type : GET_CATEGORIES_FAILURE});
        })
}

export const getCounselorInfoAction = (params) => (dispatch) => {
    dispatch({type : GET_COUNSELOR_INFO});

    const URL = `/api/get/counselorInfo?counselorSeq=${params}`;

    axios
        .get(URL)
        .then(resData => {
            const {counselorInfo} = resData.data;
            dispatch({type : GET_COUNSELOR_INFO_SUCCESS, payload : {counselorInfo}});
        })
        .catch(err => {
            dispatch({type : GET_COUNSELOR_INFO_FAILURE});
        });
}

export const getCounselings = (params) => (dispatch) => {

    dispatch({type : GET_COUNSELING});

    
    const URL = 
    (params.type === "name")
    ? `/api/get/counselings/byname?name=${params.name}`   //input에 이름으로 입력했을 경우
    : `/api/get/counselings/bycategory?category=${params.category}`; // 카테고리란을 클릭했을 경우

    
    axios
        .get(URL)
        .then(resData => {
            const counselings = resData.data.counselings;
            dispatch({type : GET_COUNSELING_SUCCESS, payload : {counselings}});
        })
        .catch(err => {
            dispatch({type:GET_COUNSELING_FAILURE});
        })
}

export const getSchedulesAction = (params) => (dispatch) => {
    dispatch({type : GET_SCHEDULES});

    axios
        .get(`/api/get/counselor/schedule?counselorSeq=${params}`)
        .then(resData => {
            const schedulesData = resData.data.schedules;
            const schedules = schedulesData.map( schedule => {
                let scheduleObj = {};
                let timeList = [];
                let weeks = ['일', '월', '화', '수', '목', '금', '토'];
                for(let key in schedule) {
                    if(key === 'date' || key === 'seq') {
                        scheduleObj[key] = schedule[key];
                    } else if (key === 'week') {
                        scheduleObj[key] = weeks[schedule[key] -1];
                    } else {
                        // 컬럼 't0900' => '09:00 ~ 09:30' 파싱작업
                        const startTime = key.substring(1, 3) + ":" + key.substring(3, key.length);
                        const endTime = 
                        (Number(key.substring(3, key.length)) + 30 === 60)
                        ?  String((Number(key.substring(1, 3)) + 1)) + ":00"
                        : key.substring(1, 3) + ":" + "30"
                        
                        const parsedTime = startTime + " ~ " + endTime // parsedKey = 09:00 ~ 09:30
                        timeList.push({
                            time : parsedTime,
                            checked : false,
                            status : schedule[key]  // 0 : 예약불가(상담불가시간) / 1: 예약 가능 / 2 : 예약불가(이미 예약된 상태)
                        });
                    }
                }
                scheduleObj.time = timeList;
                return scheduleObj;
            });

            dispatch({type : GET_SCHEDULES_SUCCESS, payload : {schedules}});
        })
        .catch(err => {
            dispatch({type : GET_SCHEDULES_FAILURE});
        })
}


export const reserveCounselingAction =  (data) => (dispatch) => {
    dispatch({type : RESERVE_COUNSELING});

    const URL = "/api/member/reservation"

    return axios
                .post(URL,data)
                .then(resData => {
                    dispatch({type : RESERVE_COUNSELING_SUCCESS});
                })
                .catch(err => {
                    dispatch({type : RESERVE_COUNSELING_FAILURE});
                })
}

export default handleActions({
    [INITIALIZE_STORE] : (state, action) => {
        return state.setIn(['getCategories', 'categories'], null)
                    .setIn(['getSchedules', 'schedules'], null)
                    .set('stage', 1);
    },
    [GET_COUNSELING] : (state, action) => {
        return state.set('fetching', true);
    },
    [GET_COUNSELING_SUCCESS] : (state, action) => {
        return state.set('fetching', false)
                    .set('result', 'success')
                    .set('counselings', action.payload.counselings);
    },
    [GET_COUNSELING_FAILURE] : (state, action) => {
        return state.set('fetching', false)
                    .set('result', 'failure')
                    .set('counselings', null);
    },
    [GET_COUNSELOR_INFO] : (state, action) => {
        return state.setIn(['getCounselorInfo', 'fetching'], true);
    },
    [GET_COUNSELOR_INFO_SUCCESS] : (state, action) => {
        return state.setIn(['getCounselorInfo', 'counselorInfo'], action.payload.counselorInfo)
                    .setIn(['getCounselorInfo', 'result'], 'SUCCESS')
                    .setIn(['getCounselorInfo', 'fetching'], false);
    },
    [GET_COUNSELOR_INFO_FAILURE] : (state, action) => {
        return state.setIn(['getCounselorInfo', 'counselorInfo'], null)
                    .setIn(['getCounselorInfo', 'result'], 'FAILURE')
                    .setIn(['getCounselorInfo', 'fetching'], false);
    },
    [GET_CATEGORIES] : (state, action) => {
        return state.setIn(['getCategories', 'fetching'], true);
    },
    [GET_CATEGORIES_SUCCESS] : (state, action) => {
        return state.setIn(['getCategories', 'categories'], action.payload.parsedCategories)
                    .setIn(['getCategories', 'result'], 'SUCCESS')
                    .setIn(['getCategories', 'fetching'], false);
    },
    [GET_CATEGORIES_FAILURE] : (state, action) => {
        return state.setIn(['getCategories', 'categories'], null)
                    .setIn(['getCategories', 'result'], 'FAILURE')
                    .setIn(['getCategories', 'fetching'], false);
    },
    [TOGGLE_CATEGORY] : (state, action) => {
        if (state.getIn(['getCategories', 'categories', action.payload.key, 'checked']) === false) {    // will be true
            return state.setIn(['reservedInfo', 'category'], state.getIn(['getCategories', 'categories', action.payload.key, 'category']))
                        .setIn(['getCategories', 'categories', action.payload.key, 'checked'], !state.getIn(['getCategories', 'categories', action.payload.key, 'checked']));            
        }else { //will be false
            return state.setIn(['reservedInfo', 'category'], null)
                        .setIn(['getCategories', 'categories', action.payload.key, 'checked'], !state.getIn(['getCategories', 'categories', action.payload.key, 'checked']));
        }
    },
    [UNCHECK_CATEGORY] : (state, action) => {
        return state.setIn(['getCategories', 'categories', action.payload.key, 'checked'], false);
    },
    [NEXT_STAGE] : (state, action) => {
        return state.set('stage', state.get('stage') + 1);
    },
    [PREV_STAGE] : (state, action) => {
        return state.set('stage', state.get('stage') - 1);
    },
    [GET_SCHEDULES] : (state, action) => {
        return state.setIn(['getSchedules', 'fetching'], true);
    },
    [GET_SCHEDULES_SUCCESS] : (state, action) => {
        return state.setIn(['getSchedules', 'schedules'], action.payload.schedules)
                    .setIn(['getSchedules', 'selected'], 0)
                    .setIn(['getSchedules', 'result'], 'SUCCESS')
                    .setIn(['getSchedules', 'fetching'], false);
    },
    [GET_SCHEDULES_FAILURE] : (state, action) => {
        return state.setIn(['getSchedules', 'schedules'], null)
                    .setIn(['getSchedules', 'result'], 'FAILURE')
                    .setIn(['getSchedules', 'fetching'], false);
    },
    [TOGGLE_SCHEDULE] : (state, action) => {
        if(state.getIn(['getSchedules', 'schedules', state.getIn(['getSchedules', 'selected']), 'time', action.payload.selectedIndex, 'status']) != 1) {
            return state;
        }

        //will be true
        if(state.getIn(['getSchedules', 'schedules', state.getIn(['getSchedules', 'selected']), 'time', action.payload.selectedIndex, 'checked']) === false) {
            return state.setIn(['reservedInfo', 'time'], state.getIn(['getSchedules', 'schedules', state.getIn(['getSchedules', 'selected']), 'time', action.payload.selectedIndex, 'time']))
                        .setIn(['reservedInfo', 'date'], state.getIn(['getSchedules', 'schedules', state.getIn(['getSchedules', 'selected']), 'date']))
                        .setIn(['reservedInfo', 'week'], state.getIn(['getSchedules', 'schedules', state.getIn(['getSchedules', 'selected']), 'week']))
                        .setIn(['getSchedules', 'schedules', state.getIn(['getSchedules', 'selected']), 'time', action.payload.selectedIndex, 'checked'], !state.getIn(['getSchedules', 'schedules', state.getIn(['getSchedules', 'selected']), 'time', action.payload.selectedIndex, 'checked']));
        } else { //will be false
            return state.setIn(['getSchedules', 'schedules', state.getIn(['getSchedules', 'selected']), 'time', action.payload.selectedIndex, 'checked'], !state.getIn(['getSchedules', 'schedules', state.getIn(['getSchedules', 'selected']), 'time', action.payload.selectedIndex, 'checked']));
        }
    },
    [UNCHECK_SCHEDULE] : (state, action) => {
        return state.setIn(['getSchedules', 'schedules',  state.getIn(['getSchedules', 'selected']), 'time', action.payload.prevIndex, 'checked'], false);
    },
    [GET_PREV_DATE] : (state, action) => {
        if(state.getIn(['getSchedules', 'selected']) === 0) {
            return state;
        }
        return state.setIn(['reservedInfo', 'time'], null)
                    .setIn(['reservedInfo', 'date'], null)
                    .setIn(['reservedInfo', 'week'], null)
                    .setIn(['getSchedules', 'selected'], state.getIn(['getSchedules', 'selected']) - 1);
    },
    [GET_NEXT_DATE] : (state, action) => {
        if(state.getIn(['getSchedules', 'selected']) === state.getIn(['getSchedules', 'schedules']).length-1) {
            return state;
        }
        return state.setIn(['reservedInfo', 'time'], null)
                    .setIn(['reservedInfo', 'date'], null)
                    .setIn(['reservedInfo', 'week'], null)
                    .setIn(['getSchedules', 'selected'], state.getIn(['getSchedules', 'selected']) + 1)
    },
    [CLOSE_MODAL] : (state, action) => {
        return state.setIn(['modal', 'open'], false);
    },
    [RESERVE_COUNSELING] : (state, action) => {
        return state.setIn(['reservation', 'fetching'], true);
    },
    [RESERVE_COUNSELING_SUCCESS] : (state, action) => {
        return state.setIn(['reservation', 'fetching'], false)
                    .setIn(['reservation', 'result'], 'SUCCESS');
    },
    [RESERVE_COUNSELING_FAILURE] : (state, action) => {
        return state.setIn(['reservation', 'fetching'], false)
                    .setIn(['reservation', 'result'], 'FAILURE');
    },
    [CHANGE_MESSAGE] : (state, action) => {
        return state.setIn(['reservedInfo', 'message'], action.payload.message);
    },
    [OPEN_MODAL] : (state, action) => {
        return state.setIn(['modal', 'open'], true)
                    .setIn(['modal', 'title'], action.payload.title)
                    .setIn(['modal', 'content'], action.payload.content);
    }
}, defaultState);


