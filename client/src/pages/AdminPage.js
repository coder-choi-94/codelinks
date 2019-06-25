import React, { Component } from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import MemberHeader from '../components/MemberHeader';
import * as authActions from '../modules/authentication';
import * as modalActions from '../modules/modal';
import Progress from '../components/Progress';
import SearchCounselor from '../components/customer/SearchCounselor';
import MemberReservation from '../components/customer/MemberReservation';
import MemberFooter from '../components/MemberFooter';
import {Route, Switch, Link} from 'react-router-dom';
import styled, {css} from 'styled-components';
import AlertModal from '../components/Alert';
import DoCounseling from '../components/counselor/DoCounseling';
import ReservationStatus from '../components/counselor/ReservationStatus';
import MakeCounseling from '../components/counselor/MakeCounseling';
import Index from '../components/Index';
import CounselingStatus from '../components/customer/CounselingStatus';
import CustomerQuestion from '../components/common/CustomerQuestion';
import CustomerQuestionView from '../components/common/CustomerQuestionView';
import NotFound from './NotFound';
import * as adminActions from '../modules/admin';
import CustomerInfoView from '../components/admin/CustomerInfoView';
import CounselorInfoView from '../components/admin/CounselorInfoView';
import MonitorView from '../components/admin/MonitorView';
import NoticeListView from '../components/admin/NoticeListView';
import NoticeView from '../components/admin/NoticeView';
import ApprovalView from '../components/admin/ApprovalView';



const Wrapper = styled.div`
    width : 80%;
    min-width : 1024px;
    height : 100%;
    margin : 0 auto;
`

const Navigation = styled.ul`
    margin : 0;
    padding : 0;
    width : 100%;
    height : 120px;
    background-color : white;
    display : flex;
    align-items : center;
    justify-content : space-around;
    border-bottom : 2px solid black;
`
const NavItem = styled.li`
    font-weight : 600;
    display : flex;
    align-items : center;
    padding: 1rem 2rem;
    height : 99%;

    &:hover {
        background-color: #ede9e9;
        cursor : pointer;
    }
    &:active {
        color : #323232;
    }
    ${props => 
        props.isSelected
        && css`
            background-color: #ede9e9;
        `

    }
`
const Content = styled.div`
    width : 100%;
    background-color : white;
    margin-top : 2rem;
`


class AdminPage extends Component {

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    

    handleScroll = (evt) => {
        const { innerHeight } = window;
        const { scrollHeight } = document.body;
        // IE에서는 document.documentElement 를 사용.
        const scrollTop =
          (document.documentElement && document.documentElement.scrollTop) ||
          document.body.scrollTop;
        // 스크롤링 했을때, 브라우저의 가장 밑에서 100정도 높이가 남았을때에 실행하기위함.
        if (scrollHeight - innerHeight - scrollTop < 100) {
          console.log("Almost Bottom Of This Browser");
        }
    }
    
    handleClickNavItem = (view) => {
        const { AdminActions } = this.props;
        if(view === 'notice')
            this.props.history.push(`/admin/${view}/1`);
        else    
            this.props.history.push(`/admin/${view}`);
    }

    render() {
        if(this.props.AuthState.loginInfo.userType !== 'admin') {
            this.props.history.push('/main');
        }

        const { AdminState } = this.props;

        const view = this.props.location.pathname.split('/')[2];
        return (
            <Wrapper>
                <Navigation>
                    <Link to ="/main/customer/question/1" style={{height : '100%'}}><NavItem>문의 처리</NavItem></Link>
                    <NavItem onClick={() => this.handleClickNavItem('notice')} isSelected={view==='notice'}>공지사항 관리</NavItem>
                    <NavItem onClick={() => this.handleClickNavItem('customer')} isSelected={view==='customer'}>고객 조회</NavItem>
                    <NavItem onClick={() => this.handleClickNavItem('counselor')} isSelected={view==='counselor'}>상담사 조회</NavItem>
                    <NavItem onClick={() => this.handleClickNavItem('approval')} isSelected={view==='approval'}>상담사 가입요청</NavItem>
                    <NavItem onClick={() => this.handleClickNavItem('monitor')} isSelected={view==='monitor'}>상담원 모니터링</NavItem>
                </Navigation>
                <Content>
                    <Switch>
                        <Route path="/admin/customer" component={CustomerInfoView}/>
                        <Route path="/admin/counselor" component={CounselorInfoView}/>
                        <Route path="/admin/monitor" component={MonitorView}/>
                        <Route exact path="/admin/notice/:pageNum" component={NoticeListView}/>
                        <Route exact path="/admin/notice/view/:seq" component={NoticeView}/>
                        <Route exact path="/admin/approval" component={ApprovalView}/>
                    </Switch>
                </Content>
                <AlertModal
                    open={this.props.ModalState.visible}
                    title={this.props.ModalState.title}
                    content={this.props.ModalState.content}
                    onClose={this.props.ModalActions.closeModal}
                />
            </Wrapper>
        );
    }
}

export default connect(
    (state) => ({
        AdminState : state.admin.toJS(),
        ModalState : state.modal.toJS(),
        AuthState : state.authentication.toJS()
    }),
    (dispatch) => ({
        AdminActions : bindActionCreators(adminActions, dispatch),
        ModalActions : bindActionCreators(modalActions, dispatch)
    })
)(AdminPage);