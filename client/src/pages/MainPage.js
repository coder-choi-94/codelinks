import React, { Component } from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MemberHeader from '../components/MemberHeader';
import * as authActions from '../modules/authentication';
import * as modalActions from '../modules/modal';
import Progress from '../components/Progress';
import SearchCounselor from '../components/customer/SearchCounselor';
import MemberReservation from '../components/customer/MemberReservation';
import MemberFooter from '../components/MemberFooter';
import {Route, Switch} from 'react-router-dom';
import styled from 'styled-components';
import AlertModal from '../components/Alert';
import DoCounseling from '../components/counselor/DoCounseling';
import ReservationStatus from '../components/counselor/ReservationStatus';
import MakeCounseling from '../components/counselor/MakeCounseling';
import Index from '../components/Index';
import CounselingStatus from '../components/customer/CounselingStatus';
import CustomerQuestion from '../components/common/CustomerQuestion';
import CustomerQuestionView from '../components/common/CustomerQuestionView';
import NotFound from './NotFound';
import {FaHome} from 'react-icons/fa';
import NoticeListView from '../components/customer/NoticeListView';
import NoticeView from '../components/customer/NoticeView';


const Wrapper = styled.div`
    height : 100vh;
`;
const Contents = styled.div`
    position : relative;
    margin-top : 80px;
    height : 1200px;
    background-color : pink;
    z-index : -10;
`;


const CallBox = styled.div`
    position : fixed;
    top : 50%;
    left : 50%;
    transform : translate(-50%, -50%); 

`

const AdminRemoteController = styled.div`
    position: fixed;
    bottom: 50px;
    left: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: #30426c;
    color: white;
    border-radius: 50%;
    &:hover {
        background-color: #4e669e;
        cursor : pointer;
    }
    &:active {
        background-color: #253251;
    }
`

class MainPage extends Component {

    phoneRef = null;

    componentDidMount() {
        const {AuthActions} = this.props;

        //요청 시작을 알림
        AuthActions.checkIsLoggedIn();
        
        return axios.get('/api/getuser')
                    .then((responseData) => {
                        const {seq, id, name, type, point, profile} = responseData.data;
                            AuthActions.checkisLoggedInSuccess({seq, id, name, type, point, profile});
                    })
                    .catch((err) => {
                        AuthActions.checkisLoggedInFailure();
                    });
    }
    handleGoHome = () => {
        this.props.history.push('/admin');
    }
    render() {
        const loginInfo = this.props.loginInfo.toJS();
        const checkIsLoggedIn = this.props.checkIsLoggedIn.toJS();
        const {ModalState, ModalActions} = this.props;
        const {match, location} = this.props;
        if(checkIsLoggedIn.fetching || checkIsLoggedIn.result === null) {
            return <Progress/>
        }

        return (
            <Wrapper>
                <MemberHeader isLoggedIn={loginInfo.isLoggedIn} userType={loginInfo.userType} username={loginInfo.userName}/>

                <Switch>
                    <Route exact path={`${match.url}`} component={Index}/>
                    <Route exact path={`${match.url}/search/counselor`} component={SearchCounselor}/>{/* 고객 :  상담사 찾기 */}
                    <Route exact path={`${match.url}/search/schedule`} component={CounselingStatus}/>{/* 고객 : 내 상담 현황 */}
                    <Route exact path={`${match.url}/reservation`} component={MemberReservation}/>{/* 고객 : 상담 예약 */}

                    <Route exact path={`${match.url}/status/reservation`} component={ReservationStatus}/>{/* 상담사 : 예약 현황 */}
                    <Route exact path={`${match.url}/make/counseling`} component={MakeCounseling}/> {/*상담사 : 상담 등록*/}
                    <Route exact path={`${match.url}/counseling`} component={DoCounseling}/>{/* 상담사 : 상담 시작 */}

                    <Route exact path={`${match.url}/customer/question/:pageNum`} component={CustomerQuestion}/>
                    <Route exact path={`${match.url}/customer/question/view/:bId`} component={CustomerQuestionView}/>
                    <Route exact path={`${match.url}/notice/:pageNum`} component={NoticeListView}/>
                    <Route exact path={`${match.url}/notice/view/:seq`} component={NoticeView}/>


                    <Route component={NotFound}/>
                </Switch>

                {
                    loginInfo.userType === 'admin'
                    && (
                        <AdminRemoteController onClick={this.handleGoHome}>
                            <FaHome/>
                        </AdminRemoteController>
                    )
                }
                
                <AlertModal
                    open={ModalState.visible}
                    title={ModalState.title}
                    content={ModalState.content}
                    onClose={ModalActions.closeModal}
                />
                
            </Wrapper>
        );
        
    }
}

export default connect(
    (state) => ({
        checkIsLoggedIn : state.authentication.get('checkIsLoggedIn'),
        loginInfo : state.authentication.get('loginInfo'),
        ModalState : state.modal.toJS()
    }),
    (dispatch) => ({
        AuthActions : bindActionCreators(authActions, dispatch),
        ModalActions : bindActionCreators(modalActions, dispatch)
    })
)(MainPage);