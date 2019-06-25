import React, { Component } from 'react';
import styled, {css} from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
import Calendar from 'react-calendar';
import {connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as counselorActions from '../../modules/counselor';
import * as authActions from '../../modules/authentication';
import Progress from '../Progress';
import Dimmed from '../Dimmed';
import MyAlert from '../MyAlert';
import {FaCalendarAlt} from 'react-icons/fa';


const RootWrapper = styled.div`
    padding-top : 80px;
    width : 100%;
    height : 100%;
    background : rgb(251, 251, 251);
`

const ContentWrapper = styled.div`
    max-width : 1200px;
    min-width : 768px;
    height : 100%;
    margin : 0 auto;
    background-color : white;
    padding : 1rem;

    .title {
        font-weight : 600;
        margin-top : 1rem;
        margin-bottom : 2rem;

        border-top: 1.5px solid #152852;
        border-bottom: 1.5px solid #152852;
        padding: 10px;
        color: #152852;

    }
`
const Content = styled.div`
    display : flex;
    justify-content : space-between;
`
const ScrollInner = styled.div`
    padding : 1rem;
    width : 100%;
    height : 100%;

    .no-data {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        font-weight: 600;
        font-size: 25px;
        text-align: center;
    }
`
const ScrollRow = styled.div`
    display : flex;
    align-items : center;
    justify-content : space-around;
    margin-bottom : 1rem;   
    padding : 1rem;

    background: #efefef;
    color: black;
    font-weight: 600;
    font-size: 17px;

    transition : all .125s ease-out;

    &:hover {
        background: #14385d;
        color: white;
        cursor : pointer;
        .reserve-icon {
            color : white;
        }
    }
    &:active {
        background: #006edc;
        color: white;
    }

    &>span {
        width : 33%;
        text-align : center;
    }

    &>.reserve-icon {
        color : #1e2f59;
        font-size : 2rem;
    }
`


class ReservationStatus extends Component {

    

    componentDidMount() {
        // const {checkIsLoggedIn, loginInfo} = this.props.AuthState;

        // if(checkIsLoggedIn.result !== 'SUCCESS' || loginInfo.userType !== 'counselor') {
        //     this.props.history.push('/main');
        // }

        window.addEventListener("keyup", this.handleKeyDown, true);

        const {CounselorActions, AuthState, CounselorState} = this.props;
        //현 페이지 관련 state 초기화
        CounselorActions.initializeReservationStatus();
        const params = {
            counselorSeq : AuthState.loginInfo.userSeq,
            date : this.parseDate(CounselorState.myReserveDate)
        }
        CounselorActions.getMyCounselingsByDateAction(params);
    }

    componentWillUnmount() {
        window.removeEventListener("keyup", this.handleKeyDown, true);
    }
    
    handleKeyDown = (evt) => {
        if (evt.which === 27) {
            if (this.props.CounselorState.modal.visible)
                this.props.CounselorActions.closeMyModal();
        }
    }

    parseDate = (date) => {
        return `${date.getFullYear()}-${date.getMonth()+1<10 ? '0'+(date.getMonth()+1) : date.getMonth()+1}-${date.getDate()<10 ? '0'+date.getDate() : date.getDate()}`;
    }
    
    handleOnChange = () => {
        alert('change');
    }

    handleClickDay = (value) => {
        const {CounselorState, CounselorActions, AuthState} = this.props;

        console.log(value);
        CounselorActions.clickReserveDate({date:value});

        const params = {
            counselorSeq : AuthState.loginInfo.userSeq,
            date : this.parseDate(value)
        }
        CounselorActions.getMyCounselingsByDateAction(params);
    }

    handleClickCounseling = (counselingSeq) => {
        const {counselings} = this.props.CounselorState.getCounselingsByDate;
        const {CounselorActions} = this.props;

        const selectedCounseling = counselings.filter( counseling => counseling.seq === counselingSeq);
        
        const modalData = {
            title : selectedCounseling[0].name + "님께서 남기신 메세지",
            content : selectedCounseling[0].message
        }
        CounselorActions.openMyModal(modalData);

    }

    

    render() {
        if(this.props.AuthState.loginInfo.userType !== 'counselor') {
            this.props.history.push('/main');
        }
        const {
            myReserveDate,
            getCounselingsByDate,
            modal
        } = this.props.CounselorState;

        return (
            <RootWrapper>      
                <ContentWrapper>
                    <div className="title">예약 현황</div>
                    <Content>
                        <Calendar
                            onClickDay={this.handleClickDay}
                            value={myReserveDate}
                            >
                        </Calendar>
                        <Scrollbars style={{
                            'marginLeft' : '1rem',
                            'width' : '60%',
                            'minWidth' : '30%', 
                            'height' :'400px', 
                            'border' : '1px solid #cccccc',
                            'borderRadius' : '10px'
                            }}>
                            <ScrollInner>
                                {
                                    (getCounselingsByDate.fetching)
                                    ? (
                                        <Progress/>
                                    )
                                    : (getCounselingsByDate.result === 'SUCCESS')
                                    ? (
                                        getCounselingsByDate.counselings.map( counseling => {
                                            return (
                                                <ScrollRow
                                                    key={counseling.seq}
                                                    onClick={() => this.handleClickCounseling(counseling.seq)}>
                                                    <span className="reserve-icon"><FaCalendarAlt/></span>
                                                    <span>{counseling.time}</span>
                                                    <span>{counseling.category}</span>
                                                    <span>{counseling.name}님</span>
                                                </ScrollRow>
                                            )
                                        })
                                    )
                                    : (getCounselingsByDate.result === 'FAILURE')
                                    ? (
                                        <div className="no-data">
                                            예약된 상담이 없습니다
                                        </div>
                                    )
                                    : null
                                }
                            </ScrollInner>
                        </Scrollbars>
                        
                    </Content>
                </ContentWrapper>
                <MyAlert visible={modal.visible} title={modal.title} content={modal.content}/>
                <Dimmed visible={modal.visible} onClick={this.props.CounselorActions.closeMyModal}/>
            </RootWrapper>
        );
    }
}

export default connect(
    (state) => ({
        CounselorState : state.counselor.toJS(),
        AuthState : state.authentication.toJS()
    }),
    (dispatch) => ({
        CounselorActions : bindActionCreators(counselorActions, dispatch),
        AuthActions : bindActionCreators(authActions, dispatch)
    })
)(ReservationStatus); 