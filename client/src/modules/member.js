import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';


export const MEMBER_SEARCH_COUNSELOR_CHANGED = 'member/MEMBER_SEARCH_COUNSELOR_CHANGED';


export const memberSearchCounselorChanged = createAction(MEMBER_SEARCH_COUNSELOR_CHANGED);



const defaultState = Map({
    member : Map({
        search : ''
    })
});



//리듀서
export default handleActions({
    [MEMBER_SEARCH_COUNSELOR_CHANGED] : (state, action) => {
        return state.setIn(['member', action.payload.name], action.payload.value);
    }
}, defaultState);