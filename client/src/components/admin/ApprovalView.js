import React, { Component } from 'react';
import styled, {css} from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as adminActions from '../../modules/admin';
import Progress from '../Progress';
import Dimmed from '../Dimmed';

const Wrapper = styled.div`
    width : 90%;
    margin : 0 auto;

    .progress-wrapper {
        width : 100%;
        height : 50vh;
    }
`

const Title = styled.div`
    font-weight : 600;
    padding : 1rem;
`

const Content = styled.div`
    
`
const ContentHeader = styled.div`
    display : flex;
    width : 100%;
    margin-bottom : 2rem;
    margin-top : 2rem;

    &>*:nth-child(1) {
        flex : 1;
        display : flex;
        align-items : center;
        justify-content : center;
    }
    &>*:nth-child(2) {
        flex : 3;
        display : flex;
        align-items : center;
        justify-content : center;
    }
    &>*:nth-child(3) {
        flex : 2;
        display : flex;
        align-items : center;
        justify-content : center;
    }
    &>*:nth-child(4) {
        flex : 3;
        display : flex;
        align-items : center;
        justify-content : center;
    }
    &>*:nth-child(5) {
        flex : 3;
        display : flex;
        align-items : center;
        justify-content : center;
    }
    &>*:nth-child(6) {
        flex : 1;
        display : flex;
        align-items : center;
        justify-content : center;
    }
    &>*:nth-child(7) {
        flex : 3;
        display : flex;
        align-items : center;
        justify-content : center;
    }
    &>*:nth-child(8) {
        flex : 4;
        display : flex;
        align-items : center;
        justify-content : center;
    }
    &>*:nth-child(9) {
        flex : 3;
        display : flex;
        align-items : center;
        justify-content : center;
    }
    &>*:nth-child(10) {
        flex : 2;
        display : flex;
        align-items : center;
        justify-content : center;
    }
`
const InfoBox = styled.div`
    display : flex;
    width : 100%;
    margin-bottom : 10px;
    border: 1px solid rgba(0,0,0,0.2);
    font-size: 17px;
    font-weight: 600;
    padding: 5px;

    .approve-btn {
        padding : 5px 10px;
        background-color : green;
        color : white;
        border-radius : 5px;

        &:hover {
            background-color : #2bbb2b;
            cursor : pointer;
        }
        &:active {
            background-color : #196419fc;
        }
    }

    &>*:nth-child(1) {
        flex : 1;
        display : flex;
        align-items : center;
        justify-content : center;
    }
    &>*:nth-child(2) {
        flex : 3;
        display : flex;
        align-items : center;
        justify-content : center;
    }
    &>*:nth-child(3) {
        flex : 2;
        display : flex;
        align-items : center;
        justify-content : center;
    }
    &>*:nth-child(4) {
        flex : 3;
        display : flex;
        align-items : center;
        justify-content : center;
    }
    &>*:nth-child(5) {
        flex : 3;
        display : flex;
        align-items : center;
        justify-content : center;
    }
    &>*:nth-child(6) {
        flex : 1;
        display : flex;
        align-items : center;
        justify-content : center;
    }
    &>*:nth-child(7) {
        flex : 3;
        display : flex;
        align-items : center;
        justify-content : center;
    }
    &>*:nth-child(8) {
        flex : 4;
        display : flex;
        align-items : center;
        justify-content : center;
    }
    &>*:nth-child(9) {
        flex : 3;
        display : flex;
        align-items : center;
        justify-content : center;
    }
    &>*:nth-child(10) {
        flex : 2;
        display : flex;
        align-items : center;
        justify-content : center;
    }
`

const MessageBox = styled.div`
    width : 100%;
    display : flex;
    justify-content : center;
    align-items : center;
    padding : 1rem;
    font-weight : 600;
`
class ApprovalView extends Component {
    componentDidMount() {
        const { AdminActions, AdminState } = this.props;

        AdminActions.getCounselorsToApproveAction();

    }

    handleApprove = (seq) => {
        const { AdminActions } = this.props;

        AdminActions
            .approveCounselorAction(seq)
            .then(() => {
                AdminActions.getCounselorsToApproveAction();
            })
    }
    
    render() {
        const { 
            AdminActions, 
            AdminState, 
            AuthState 
        } = this.props;

        const {
            fetching : getFetching,
            result : getResult,
            counselors
        } = AdminState.getCounselors;

        const {
            fetching : approveFetching,
            result : approveResult
        } = AdminState.approveCounselor;

        const progressVisible = getFetching;
        const dimmedVisible = approveFetching;

        return (
            <Wrapper>
                <Title>상담사 가입 승인 요청 목록</Title>
                <Content>
                <ContentHeader>
                    <div>번호</div>
                    <div>아이디</div>
                    <div>이름</div>
                    <div>전화번호</div>
                    <div>생년월일</div>
                    <div>성별</div>
                    <div>자격증</div>
                    <div>최종학력</div>
                    <div>전공</div>
                    <div>허가</div>
                </ContentHeader>
                {
                    getFetching
                    && (
                        <div className="progress-wrapper">
                            <Progress/>
                        </div>
                    )
                }
                {
                    getResult === 'SUCCESS'
                    ? (
                            counselors.map(item => {
                                return (
                                    <InfoBox>
                                        <span>{item.seq}</span>
                                        <span>{item.id}</span>
                                        <span>{item.name}</span>
                                        <span>{item.phone}</span>
                                        <span>{item.birth}</span>
                                        <span>{item.gender?'남':'여'}</span>
                                        <span>{item.license}</span>
                                        <span>{`${item.school} ${item.degree} ${item.graduated}`}</span>
                                        <span>{item.major}</span>
                                        <span>
                                            <div className="approve-btn" onClick={()=>this.handleApprove(item.seq)}>승인</div>
                                        </span>
                                    </InfoBox>
                                )
                            })
                    ) :
                    getResult === 'FAILURE'
                    ? (
                        <MessageBox>
                            승인을 기다리는 상담사가 없습니다.
                        </MessageBox>
                    ) : ('')
                }
                </Content>
                <Dimmed visible={dimmedVisible} progress={dimmedVisible}/>
            </Wrapper>
        );
    }
}

export default connect(
    (state) => ({
        AdminState : state.admin.toJS(),
        AuthState : state.authentication.toJS()
    }),
    (dispatch) => ({
        AdminActions : bindActionCreators(adminActions, dispatch)
    })
)(ApprovalView);