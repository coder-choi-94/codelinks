import { combineReducers } from 'redux';

import authentication from './authentication';
import member from './member';
import categories from './categories';
import counseling from './counseling';
import modal from './modal';
import counselor from './counselor';
import customer from './customer';
import admin from './admin';

//모든 액션을 한곳에서 관리하는것보다는, 이렇게 서브 리듀서들을 분류를 해서 관리하는것이 훨씬 편합니다.
export default combineReducers({
    authentication,
    member,
    categories,
    counseling,
    modal,
    counselor,
    customer,
    admin
})
