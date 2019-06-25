import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';

export const OPEN_MODAL = 'modal/OPEN_MODAL';
export const CLOSE_MODAL = 'modal/CLOSE_MODAL';
export const OPEN_MODAL_WITH_ANSWER = 'modal/OPEN_MODAL_WITH_ANSWER';
export const CLOSE_MODAL_WITH_ASNWER = 'modal/CLOSE_MODAL_WITH_ASNWER';
export const INITIALIZE_ANSWER = 'modal/INITIALIZE_ANSWER';


export const openModal = createAction(OPEN_MODAL);
export const closeModal = createAction(CLOSE_MODAL);
export const openModalWithAnswer = createAction(OPEN_MODAL_WITH_ANSWER);
export const closeModalWithAnswer = createAction(CLOSE_MODAL_WITH_ASNWER);
export const initializeAnswer = createAction(INITIALIZE_ANSWER);



const defaultState = Map({
    visible : false,
    title : '',
    content : '',
    answerModal : Map({
        visible : false,
        title : '',
        content : '',
        answer : ''
    })
})

export default handleActions({
    [OPEN_MODAL] : (state, action) => {
        return state.set('visible', true)
                    .set('title', action.payload.title)
                    .set('content', action.payload.content);
    },
    [CLOSE_MODAL] : (state, action) => {
        return state.set('visible', false)
    },
    [OPEN_MODAL_WITH_ANSWER] : (state, action) => {
        return state.setIn(['answerModal', 'visible'], true)
                    .setIn(['answerModal', 'title'], action.payload.title)
                    .setIn(['answerModal', 'content'], action.payload.content)
    },
    [CLOSE_MODAL_WITH_ASNWER] : (state, action) => {
        return state.setIn(['answerModal', 'visible'], false)
                    .setIn(['answerModal', 'answer'], action.payload.answer);
    },
    [INITIALIZE_ANSWER] : (state, action) => {
        return state.setIn(['answerModal', 'answer'], '');
    }
}, defaultState);