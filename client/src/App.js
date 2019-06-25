import React, { Component } from 'react';
import Authentication from './pages/Authentication/Authentication';
import MainPage from './pages/MainPage';
import { BrowserRouter as Router , Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux';
import modules from './modules';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import AdminPage from './pages/AdminPage';
import NotFound from './pages/NotFound';
import RedirectPage from './pages/RedirectPage'
/* 로그 미들웨어를 생성 할 때 설정을 커스터마이징 할 수 있다고 함
   https://github.com/evgenyrodionov/redux-logger#options
*/
const logger = createLogger(); 

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(modules,  composeEnhancer(applyMiddleware(logger, thunk)));
const store = createStore(modules, applyMiddleware(thunk));


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={RedirectPage}/>
                        <Route path="/authentication" component={Authentication}/>
                        <Route path="/main" component={MainPage}/>
                        <Route path="/admin" component={AdminPage}/>
                        <Route component={NotFound}/>
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;
