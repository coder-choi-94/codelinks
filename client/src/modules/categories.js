import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import axios from 'axios';

export const INSERT_CATEGORIES = 'categories/INSERT_CATEGORIES';
export const TOGGLE_CATEGORY = 'categories/TOGGLE_CATEGORY';
export const UNCHECK_CATEGORY = 'categories/UNCHECK_CATEGORY';
export const GET_CATEGORIES = 'categories/GET_CATEGORIES';
export const GET_CATEGORIES_SUCCESS = 'categories/GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAILURE = 'categories/GET_CATEGORIES_FAILURE';


export const insertCategories = createAction(INSERT_CATEGORIES);
export const toggleCategory = createAction(TOGGLE_CATEGORY);
export const uncheckCategory = createAction(UNCHECK_CATEGORY);
export const getCategories = createAction(GET_CATEGORIES);
export const getCategoriesSuccess = createAction(GET_CATEGORIES_SUCCESS);
export const getCategoriesFailure = createAction(GET_CATEGORIES_FAILURE);

const defaultState = Map({
    categories : null,
    fetching : false,
    result : null
});


export const getCategoriesAction = () => (dispatch) => {

    dispatch({type : GET_CATEGORIES});
    axios
        .get('/api/get/categories')
        .then( resData => {
                const categories = resData.data.categories;
                const categoriesWithChecked = categories.map(category => {
                category.checked = false; // 카테고리 배열의 각 객체에 checked 컬럼 추가
                return category;   
            });
            dispatch({type : GET_CATEGORIES_SUCCESS, payload : {categoriesWithChecked}});
        })
        .catch( err => {
            dispatch({type : GET_CATEGORIES_FAILURE});
        });
}
export default handleActions({
    [GET_CATEGORIES] : (state, action) => {
        return state.set('fetching', true);
    },
    [GET_CATEGORIES_SUCCESS] : (state, action) => {
        return state.set('categories', action.payload.categoriesWithChecked)
                    .set('fetching', false)
                    .set('result', 'success');
    },
    [GET_CATEGORIES_FAILURE] : (state, action) => {
        return state.set('fetching', false)
                    .set('result', 'failure');
    },
    [UNCHECK_CATEGORY] : (state, action) => {
        return state.setIn(['categories', action.payload.key, 'checked'], false);
    },
    [TOGGLE_CATEGORY] : (state, action) => {
        return state.setIn(['categories', action.payload.key, 'checked'], !state.getIn(['categories', action.payload.key, 'checked']));
    }
}, defaultState);