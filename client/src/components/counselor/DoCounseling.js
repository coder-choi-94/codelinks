import $ from 'jquery'
import React, { Component, Fragment } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import authentication from '../../modules/authentication';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from '../../modules/authentication';
import * as counselorActions from '../../modules/counselor';
import * as modalActions from '../../modules/modal';
import Progress from '../Progress';
import { Scrollbars } from 'react-custom-scrollbars';
import styled, {css} from 'styled-components';
import Button from '@material-ui/core/Button';
import AnswerModal from '../AnswerModal';
import {
    FaAngleRight, 
    FaAngleLeft,
    FaPhoneVolume,
    FaPhoneSlash,
    FaPhoneSquare,
    FaClock,
    FaVolumeMute,
    FaVolumeUp,
    FaPause,
    FaPlay
} from "react-icons/fa";
import oc from 'open-color';
import Dimmed from '../Dimmed';
import '../../styles/animation/flash.css';
import '../../styles/animation/zoomIn.css';

const Wrapper = styled.div`
    padding: 100px 2rem; /* 헤더 때문*/

    display : flex;
    flex-direction : column;
    min-width : 1295px;
    &>* { 
        margin-top : 1rem;
    }
    &>*:first-child { 
        margin-top : 0;
    }
`


const Column = styled.div`
    display : flex;
    width : 100%;
    &>* { 
        margin-left : 1rem;
    }
    &>*:first-child {
        margin-left : 0;
    }
`
const BoxTitle = styled.div`
    position :absolute;
    top : 0;
    left : 50%;   /*scrollbar width 의 반 */
    padding-left : 1rem;
    padding-right : 1rem;
    z-index: 5;
    transform : translate(-50%, -50%);  
    background-color : white;
    font-size : 15px;
    font-weight : 600;
`

const ScrollbarsWrapper = styled.div`
    position : relative;    /*BoxTitle 위치떄문*/
    width  :30%;
    border : 1px solid rgba(0,0,0,0.3);
    border-radius : 5px;
    padding-top : 1rem;
`

/* 상담원 정보 CSS */
const CounselorInfoContent = styled.div`
    display : flex;
    padding : 1rem;
    height : 100%;

    .profile {
        border : 1px solid rgba(0,0,0,0.2);
        border-radius : 50%;
        width : 50%;
        height : 60%;
        display : flex;
        align-items : center;
        justify-content : center;

        
    }

    .info {
        display : flex;
        flex-direction : column;
        margin-left : 1rem;
        font-size : 15px;
        font-weight : 600;

        color : black;
        padding-top : 1rem;

        &>.name  {
            font-size : 18px;
        }
        
        &>* {
            margin-top : 1rem;
        }
        &>*:first-child {
            margin-top : 0;
        }
    }

`

const InfoWrapper = styled.div`
    width : 100%;
    height : 100%;
    display :flex;
    align-items  :center;
    justify-content : center;
`

/* 고객 정보 CSS */
const CustomerInfoContent = styled.div`
    padding : 1rem;
    display : flex;
    flex-direction : column;
    width : 100%;
    height : 100%;
`
const CustomerInfoItem = styled.div`
    display : flex;
    align-items : center;
    justify-content : space-around;
    padding : 1rem;
    border-radius : 8px;
    margin-bottom : 1rem;
    font-size : 20px;
    font-weight : 600;
`

/* 상담 내용 CSS */
const CounselingContent = styled.div`
    padding : 10px 1rem;
    display : flex;
    flex-direction : column;
    width : 100%;

    .counseling-memo {
        width : 100%;
        height : 200px;
        resize : none;
        font-size : 12px;
    }
    

    &>* {
        margin-bottom : 1rem;
    }
`


/* 예약 현황 CSS */
const ReservationContent = styled.div`
    padding : 1rem;
    display : flex;
    flex-direction : column;
    width : 100%;
    height : 100%;
    align-items : center;
    position : relative; /*좌우 화살표를 위해서*/
    
    

    .content-title {
        /* margin-top : 1rem; */
        margin-bottom : 1rem;
        position : relative;

        .left-icon {
            position : absolute;
            top : 5px;
            left : -30px;
        }
        .right-icon {
            position : absolute;
            top : 5px;
            right : -30px;
        }

        .left-icon,
        .right-icon {
            &:hover {
                color : #bebebe;
            }
            &:active {
                color : #707070;
            }
        }
    }
`

const ReservationContentRow = styled.div`
    display : flex;
    width : 100%;
    align-items : center;
    justify-content : space-between;

    border: none;
    padding: 20px 50px;
    background-color: #ededed;
    color: black;
    font-size: 17px;
    font-weight: 600;
    margin-bottom: 1rem;

    transition : all .125s ease-out;
    &:hover {
        cursor : pointer;
        background-color : #5e6aad;
        color : white;
    }
    &:active {
        background-color : #3444a0;
        color : white;
    }

    ${props => 
        (props.checked) 
        && css`
            background-color : #3444a0;
            color : white;
        `
    }

    position : relative;

    &>.time>.clock-icon {
        position :absolute;
        top : 21px;
        left : 25px;
    }




`

/* 예약 현황 및 상담 로그 CSS */
const CounselingLogContent = styled.div`
    padding : 1rem;
    display : flex;
    flex-direction : column;
    width : 100%;
    height : 100%;
    align-items : center;
`

const CounselingLogItem = styled.div`
    display : flex;
    justify-content : center;

    padding : 5px 8px;
    background-color : ${oc.gray[1]};
    border-radius : 8px;
    margin-bottom : 1rem;
    font-size : 15px;
    font-weight : 600;
    width : 100%;
`

const HistoryContainer = styled.div`
    margin-top : 1rem;
    padding : 10px;

    display : flex;
    flex-direction : column;
    width : 100%;

    .title {
        font-weight: 600;
        padding: 5px 10px;
        text-align: center;
        background-color: #3444a0;
        color: white;
        border-radius: 8px;
        margin-bottom: 1rem;
    }
`

const HisotryBox = styled.div`
    padding : 1rem;
    width : 100%;
    background-color : #4385c7;
    margin-bottom  :10px;
    border-radius : 5px;
    color : white;
    overflow : hidden;

    display : flex;
    flex-direction : column;
    
    .memo {
        font-weight : 600;
        margin-bottom : 10px;
    }
    .date,
    .time {
        font-size : 12px;
        align-self : flex-end;
    }

    &:hover {
        cursor : pointer;
        background-color : #0083ff;
    }
`


const ContentItem = styled.div`
    border : 1px solid black;
    width : 90%;
    background-color : gray;
`

const FunctionWrapper = styled.div`
    padding : 1rem;
    display : flex;
    flex-direction : column;
    width : 30%;
    height : 300px;
    align-items : center;

    .row {
        display : flex;
        align-items : center;
        justify-content : space-around;
        width : 100%;
        margin-bottom : 1rem;
        .complete {
            border-radius : 5px;
            background-color : #42C125;
            padding : 1rem;
            text-align : center;
            font-size : 20px;
            font-weight : 600;
            width : 100%;
            color : white;
            &:hover {
                cursor : pointer;
                background-color : #31B114;
            }
            &:active { 
                background-color : #53D236;
            }
        }
        .black { 
            border-radius : 5px;
            background-color : #403f3f;
            padding : 1rem;
            text-align : center;
            font-size : 20px;
            font-weight : 600;
            width : 100%;
            color : white;
            &:hover {
                cursor : pointer;
                background-color : #696767;
            }
            &:active { 
                background-color : #2a2929;
            }
        }

        .phone-number {
            flex : 1;
            padding : 3px 1rem 3px 1rem;
            color : #3f51b5;
            min-width  :260px;
            text-align : center;
            border : 1px solid rgba(0,0,0,0.5);
            border-radius : 5px;
            font-size : 1.5rem;
        }

        .call-btn,
        .cancel-btn,
        .mute-btn,
        .pause-btn {
            position : relative;
            width : 45%;
            .icon {
                position :absolute;
                top : 8px;
                left : 20px;
                color : white;
            }
        }
        .away-btn,
        .lunch-btn,
        .disturb-btn,
        .available-btn {
            position : relative;
            width : 45%;
            height : 80px;
            color : white;
        }
        .away-btn {
            background-color : #d28900;
        }
        .lunch-btn {
            background-color : #42c125;
        }
        .disturb-btn {
            background-color : #bb0a0a;
        }
        .available-btn {
            background-color : #257912;
        }


    }

    .status-row {
        margin-top : 3rem;
        display : flex;
        align-items : center;

        width : 100%;
        margin-bottom : 1.5rem;
        .name {
            font-weight : 600;
            font-size : 20px;
        }
    }
    .row:last-child {
        margin-bottom : 0;
    }
`;

const Status = styled.div`
    width : 20px;
    height: 20px; 
    border-radius : 50%;
    margin-right : 1rem;
    ${props => 
        props.status === 'Available'
        ? css`
            background-color : #257912;
        `
        :props.status === 'Away'
        ? css`
            background-color : #D28900;
        `
        :props.status === 'Custom 1'
        ? css`
            background-color : #42C125;
        `
        :props.status === 'Out of office'
        ? css`
            background-color : #BB0A0A;
        `
        :''
    }
`

const CallingIconWrapper = styled.div`
    position : fixed;
    top:0;left:0;right:0;bottom:0;
    width:100%;height:100%;
    background-color : rgba(0,0,0,0.5);
    display : flex;
    justify-content : center;
    align-items : center;
    z-index : 100;

    font-size : 5rem;
    color : white;

`

class DoCounseling extends Component {

    componentDidMount() {

        // const {checkIsLoggedIn, loginInfo} = this.props.AuthState;

        // if(checkIsLoggedIn.result !== 'SUCCESS' || loginInfo.userType !== 'counselor') {
        //     this.props.history.push('/main');
        // }

        //State
        const {CounselorState, AuthState} = this.props;

        //Actions
        const {CounselorActions} = this.props;


    
        // GET COUNSELINGS : 예약 현황 리스트
        let params = {counselor_seq : AuthState.loginInfo.userSeq};
        CounselorActions.getCounselingsAction(params);
    }

    handleChangeDate = (type) => {
        const {ModalActions, CounselorState} = this.props;
        if(CounselorState.callingStatus.calling) {
            const modalData = {
                title : '알림',
                content : '통화를 끊고 다시 시도해주세요.'
            }
            ModalActions.openModal(modalData);
            return;
        }

        const {CounselorActions} = this.props;
        if(type === 'prev') {
            CounselorActions.prevDate();
        } else {
            CounselorActions.nextDate();
        }
    }

    handleCounselingClick = (counseling) => {
        const {ModalActions, CounselorState} = this.props;
        if(counseling.done) {
            const modalData = {
                title : '알림',
                content : '이미 종료된 상담입니다.'
            }
            ModalActions.openModal(modalData);
            return;
        }
        if(CounselorState.callingStatus.calling) {
            const modalData = {
                title : '알림',
                content : '통화를 끊고 다시 시도해주세요.'
            }
            ModalActions.openModal(modalData);
            return;
        }
        const {
            CounselorActions, 
            AuthState
        } = this.props;
        //상담 선택 액션 : 선택된 상담 인덱스 스토어에 저장
        CounselorActions.selectCounseling({clickedSeq : counseling.seq, memberSeq : counseling.member_seq});

        //선택된 상담을 신청한 고객정보를 가져옴
        CounselorActions.getMemberInfoAction(counseling.member_seq);

        // GET HISTORIES : 상담 히스토리
        const {userSeq : counselorSeq} = AuthState.loginInfo;
        const memberSeq = counseling.member_seq;
        const params = {counselorSeq, memberSeq};
        CounselorActions.getHistoriesAction(params);
        

        
    }

    handleChangeMemo = (evt) => {
        
        const {name, value} = evt.target;
        const {CounselorActions} = this.props;

        CounselorActions.changeMemo({name, value});
    }

    handleSaveMemo = () => {
        const {ModalActions, CounselorState} = this.props;
        if(CounselorState.callingStatus.calling) {
            const modalData = {
                title : '알림',
                content : '통화를 끊고 다시 시도해주세요.'
            }
            ModalActions.openModal(modalData);
            return;
        }
        const {CounselorActions, AuthState} = this.props;
        const {memo, selectedCounseling} = CounselorState;

        if(selectedCounseling === null) {
            const modalData = {
                title : '알림',
                content : '선택된 상담이 없습니다'
            }
            ModalActions.openModal(modalData);
            return;
        }

        if(CounselorState.memo === '') {
            const modalData = {
                title : '알림',
                content : '내용을 입력해 주세요.'
            }
            ModalActions.openModal(modalData);
            return;
        }

        
        const {seq : memberSeq} = CounselorState.getMemberInfo.memberInfo;
        const {counselings} = CounselorState.getCounselings;
        const {userSeq : counselorSeq} = AuthState.loginInfo;

        const selectedIndex = counselings.findIndex(counseling => counseling.seq === selectedCounseling);
        const {date, time} = counselings[selectedIndex];

        CounselorActions.saveMemoAction({memberSeq, counselorSeq, date, time, memo});

        CounselorActions.changeMemo({name : "memo",value: ""}); //memo 초기화

    }

    handleDoCall = () => {
        const {ModalActions, CounselorActions, CounselorState} = this.props;
        const {memberInfo} = CounselorState.getMemberInfo;

        if(memberInfo === null  || CounselorState.selectedCounseling === null) {
            ModalActions.openModal({title : '알림', content : '선택된 상담이 없습니다.'})
            return;
        }

        //전화걸기 액션 시작
        CounselorActions.call();

        const phone = memberInfo.phone.split('-').join('');   

        axios
            .get(`http://localhost:45678/WCFWinService/DoCall/${phone}`)
            .then(resData => {
                console.log("ResultData : ", resData);
                CounselorActions.callFinish();
            })
            .catch(err => {
                console.log("Error : ", err);
                CounselorActions.callFinish();//전화상태로 전환 및 전화 걸기 로딩 끝
            });
    }

    handleStopCall = () => {
        const {ModalActions, CounselorActions, CounselorState} = this.props;
        const {memberInfo} = CounselorState.getMemberInfo;
        if(memberInfo === null  || CounselorState.selectedCounseling === null) {
            ModalActions.openModal({title : '알림', content : '선택된 상담이 없습니다.'})
            return;
        }

        axios
        .get(`http://localhost:45678/WCFWinService/DoStop`)
        .then(resData => {
            console.log("ResultData : ", resData);
            CounselorActions.stopCall();//toggle임 setstop과같음
        })
        .catch(err => {
            console.log("Error : ", err);
            CounselorActions.stopCall();
        });
    }
    
    handleMuteCall = () => {
        const {ModalActions, CounselorActions, CounselorState} = this.props;
        const {memberInfo} = CounselorState.getMemberInfo;
        if(memberInfo === null  || CounselorState.selectedCounseling === null) {
            ModalActions.openModal({title : '알림', content : '선택된 상담이 없습니다.'})
            return;
        }

        if(CounselorState.callingStatus.hold) {
            ModalActions.openModal({title : '알림', content : '통화 대기 중에는 음소거를 할 수 없습니다.'})
            return;
        }

        axios
        .get(`http://localhost:45678/WCFWinService/DoMute`)
        .then(resData => {
            console.log("ResultData : ", resData);
            CounselorActions.setMute();
            setTimeout(() => {
                CounselorActions.setMuteUnvisible();
            }, 1000);
        })
        .catch(err => {
            console.log("Error : ", err);
            CounselorActions.setMute();
            setTimeout(() => {
                CounselorActions.setMuteUnvisible();
            }, 1000);
        });
    }

    handleHoldCall = () => {
        const {ModalActions, CounselorActions, CounselorState} = this.props;
        const {memberInfo} = CounselorState.getMemberInfo;
        if(memberInfo === null  || CounselorState.selectedCounseling === null) {
            ModalActions.openModal({title : '알림', content : '선택된 상담이 없습니다.'})
            return;
        }

        axios
        .get(`http://localhost:45678/WCFWinService/DoHold`)
        .then(resData => {
            console.log("ResultData : ", resData);
            CounselorActions.setHold();
            setTimeout(() => {
                CounselorActions.setHoldUnvisible();
            }, 1000);
        })
        .catch(err => {
            console.log("Error : ", err);
            CounselorActions.setHold();
            setTimeout(() => {
                CounselorActions.setHoldUnvisible();
            }, 1000);
        });
    }

    handleResumeCall = () => {
        const {ModalActions, CounselorActions, CounselorState} = this.props;
        const {memberInfo} = CounselorState.getMemberInfo;
        if(memberInfo === null  || CounselorState.selectedCounseling === null) {
            ModalActions.openModal({title : '알림', content : '선택된 상담이 없습니다.'})
            return;
        }

        axios
        .get(`http://localhost:45678/WCFWinService/DoResume`)
        .then(resData => {
            console.log("ResultData : ", resData);
            CounselorActions.setResume();
            setTimeout(() => {
                CounselorActions.setHoldUnvisible();
            }, 1000);
        })
        .catch(err => {
            console.log("Error : ", err);
            CounselorActions.setResume();
            setTimeout(() => {
                CounselorActions.setHoldUnvisible();
            }, 1000);
        });
    }

    handleAddBlackList = () => {
    
        const {CounselorState, AuthState, CounselorActions, ModalActions} = this.props;
        
        const getMemberInfoResult = CounselorState.getMemberInfo.result;
        const selectedCounseling = CounselorState.selectedCounseling;
        if(getMemberInfoResult !== 'SUCCESS' || selectedCounseling === null) {
            const modalData = {
                title : '알림',
                content : '선택된 상담이 없습니다'
            }
            ModalActions.openModal(modalData);
            return;
        }
        const selectedIndex = CounselorState.selectedCounseling;
        const timeIndex = CounselorState.getCounselings.counselings.findIndex(item => item.seq === selectedIndex);
        const selectedTime = CounselorState.getCounselings.counselings[timeIndex].time;
        const parsedTime = "t"+selectedTime.substring(0,2)+selectedTime.substring(3,5);
        const data = {
            memberSeq : CounselorState.getMemberInfo.memberInfo.seq,
            counselorSeq : AuthState.loginInfo.userSeq,
            date : CounselorState.getCounselings.selectedDate,
            time : parsedTime
        };
        
        CounselorActions
            .addBlackListAction(data)
            .then((rstVal) => {
                if(rstVal) {          
                    window.location.reload();
                } else {
                    const modalData = {
                        title : '알림',
                        content : '잠시 후 다시 시도해주세요.'
                    }
                    ModalActions.openModal(modalData);            
                }
            });

    }

    handleSetStatus = (status) => {
        const {CounselorActions, AuthState} = this.props;
        CounselorActions.setStatus();

        const parsedStatus = status === 'Available'? 1 : status === 'Away' ? 2 : status === 'Out of office' ? 3 : status === 'Custom 1' && 4;

        const params = {
            status : parsedStatus,
            counselorSeq : AuthState.loginInfo.userSeq
        };

        axios
            .post('/api/counselor/setstatus', params)
            .then(resData => {
                axios
                    .get(`http://localhost:45678/WCFWinService/DoStatus/${status}`)
                    .then(resData => {
                        console.log("ResultData : ", resData);
                        CounselorActions.setStatusSuccess({status});
                    })
                    .catch(err => {
                        console.log("err : ", err);
                        CounselorActions.setStatusSuccess({status});
                    })
            })
            .catch(err => {

            });
    }

    handleCompleteCounseling = () => {
        const {CounselorState, CounselorActions, ModalActions} = this.props;
        const {selectedCounseling} = CounselorState;
        if(selectedCounseling === null) {
            const modalData = {
                title : '알림',
                content : '선택된 상담이 없습니다'
            }
            ModalActions.openModal(modalData);
            return;
        }

        ModalActions.openModalWithAnswer({
            title : '확인',
            content : '정말로 상담을 종료하시겠습니까?'
        })
    }

    componentDidUpdate = (prevProps, prevState) => {
        const {saveMemoAction : currSaveMemoAction} = this.props.CounselorState;
        const {saveMemoAction : prevSaveMemoAction} = prevProps.CounselorState;

        if(prevSaveMemoAction.fetching === true && currSaveMemoAction.fetching === false) {
            //상담 히스토리 등록과정을 거쳤다면 (성공이든 실패든)
            const {CounselorActions, AuthState, CounselorState} = this.props;

            const {counselings} = CounselorState.getCounselings;
            const selectedIndex = counselings.findIndex(counseling => counseling.seq === CounselorState.selectedCounseling);

            const {member_seq : memberSeq} = counselings[selectedIndex];
            const {userSeq : counselorSeq} = AuthState.loginInfo;
            const params = {counselorSeq, memberSeq};
            CounselorActions.getHistoriesAction(params);
        }
        
        const {ModalActions, ModalState, CounselorState, CounselorActions, AuthState} = this.props;
        if(ModalState.answerModal.answer === 1) {
            ModalActions.initializeAnswer();
            const answer = ModalState.answerModal.answer;   // 1은 상담종료 / 0은 취소
            if(answer) {    //상담 종료 버튼 클릭시
                const {selectedCounseling} = CounselorState;
                if(selectedCounseling === null) {
                    alert('선택된 고객이 없습니다.');
                    return;
                }
            
                CounselorActions.completeCounselingAction(selectedCounseling)
                    .then(() => {
                        let params = {counselor_seq : AuthState.loginInfo.userSeq};
                        CounselorActions.getCounselingsAction(params);
                    })
            }

        }
    }
    

    render() {
        if(this.props.AuthState.loginInfo.userType !== 'counselor') {
            this.props.history.push('/main');
        }
        
        //State
        const { AuthState, CounselorState, ModalState, ModalActions } = this.props;
        //Actions
        const {CounselorActions} = this.props;

        //선택된 상담 인덱스
        const {selectedCounseling} = CounselorState;

        //상담 리스트 가져오는 액션 관련 state
        const {
            fetching : counselingFetching, 
            result : counselingResult, 
            counselings
        } = CounselorState.getCounselings;

        //고객 정보 가져오는 액션 관련 state
        const {
            fetching : memberFetching, 
            result : memberResult, 
            memberInfo
        } = CounselorState.getMemberInfo;

        //상담 히스토리 가져오는 액션 관련 state
        const {
            fetching : historyFetching, 
            result : historyResult, 
            histories
        } = CounselorState.getHistories;

        //상담 히스토리 저장 액션 관련 state
        const {
            fetching : saveMemoFetching, 
            result : saveMemoResult
        } = CounselorState.saveMemoAction;

        //블랙리스트 등록 액션 관련 state
        const {
            fetching : addBlackFetching, 
            result : addBlackResult
        } = CounselorState.addBlackList;

        //3CX 전화 걸기 끊기 등 상태 관련 state
        const {
            calling,
            mute,
            hold,
            fetching : callFetching,
            muteVisible,
            holdVisible
        } = CounselorState.callingStatus;

        //3CX 상태변경 관련 state
        const {
            fetching : statusFetching,
            result : statusResult,
            status
        } = CounselorState.setStatus;
        
        //상담 종료 처리 관련 state
        const {
            fetching : completeFetching,
            result : completeResult
        } = CounselorState.completeCounseling;

        let counselingList = [];    //선택된 날짜에 보여질 예약된 상담 리스트들
        if(counselingFetching === false && counselingResult === 'SUCCESS') {
            counselingList = CounselorState.getCounselings.counselings.filter(counseling => counseling.date === CounselorState.getCounselings.selectedDate);
            //시간대 오름차순 정렬
            counselingList.sort( (a, b) => {
                return a.time > b.time ? 1 : a.time < b.time ? -1 : 0;
            });
        }

        


        // if(!(AuthState.loginInfo.isLoggedIn && AuthState.loginInfo.userType === 'counselor')) {
        //     this.props.history.push('/authentication/signin');
        // }
        
        
        return (
            <Wrapper>
                <Column>
                <ScrollbarsWrapper>
                        <BoxTitle>예약 현황</BoxTitle>
                        <Scrollbars style={{width : '100%', height : 300}}>
                            <ReservationContent>
                                <div className="content-title">
                                    <FaAngleLeft
                                        className="left-icon"
                                        onClick={() => this.handleChangeDate('prev')}/>
                                    <span>{CounselorState.getCounselings.selectedDate}</span>
                                    <FaAngleRight
                                        className="right-icon"
                                        onClick={() => this.handleChangeDate('next')}/>
                                </div>    
                                {
                                    CounselorState.getCounselings.fetching === true ||  CounselorState.getCounselings.result === null
                                    ? (
                                        <Progress/>
                                    )
                                    : (
                                        <Fragment>
                                            {
                                                (counselingList.length > 0)

                                                ? (
                                                    counselingList.map(counseling => {
                                                        return (
                                                            <ReservationContentRow
                                                                    key={counseling.seq}
                                                                    onClick={() => this.handleCounselingClick(counseling)}
                                                                    checked={counseling.checked}>
                                                                
                                                                <span className="time">
                                                                    <FaClock className="clock-icon"/> 
                                                                    {counseling.time}
                                                                </span>
                                                                <span>{counseling.name}님</span>
                                                                <span style={{fontSize : '12px', color : counseling.done ? 'red' : '#c5bdbd'}}>{counseling.done ?'상담 종료' : '상담 전'}</span>
                                                            </ReservationContentRow>
                                                        )
                                                    })
                                                )
                                                : (
                                                    <InfoWrapper>
                                                        예약된 상담이 없습니다
                                                    </InfoWrapper>
                                                )
                                            }
                                        </Fragment>
                                    )                        
                                }
                            </ReservationContent>
                        </Scrollbars>
                    </ScrollbarsWrapper>
                    <ScrollbarsWrapper>
                        <BoxTitle>상담 내용</BoxTitle>
                        <Scrollbars style={{width : '100%', height : 300}}>
                            <CounselingContent>    
                                <textarea name='memo' className="counseling-memo" value={CounselorState.memo} onChange={this.handleChangeMemo}></textarea>
                                <Button variant="contained" color="primary" onClick={this.handleSaveMemo}>저장</Button>
                            </CounselingContent>
                        </Scrollbars>
                    </ScrollbarsWrapper>
                    <FunctionWrapper>
                        <div className="row">
                            <div className="complete" onClick={this.handleCompleteCounseling}>
                                상담 종료
                            </div>
                        </div>
                        <div className="row">
                            <div className="black" onClick={this.handleAddBlackList}>
                                블랙리스트 등록
                            </div>
                        </div>
                        <div className="row">
                            <div className="phone-number">
                                {memberInfo !== null && selectedCounseling !== null ? memberInfo.phone : "* * * * *"}
                            </div>
                        </div>
                        <div className="row">
                            <Button variant="contained" color={!calling && "primary"} className="call-btn" 
                                    disabled={calling} onClick={this.handleDoCall}>
                                전화 걸기
                                <i className="icon"><FaPhoneVolume/></i>
                            </Button>
                            <Button variant="contained" className="cancel-btn" 
                                    style={{color : 'white', backgroundColor : calling ? '#f50057': '#a3a3a3'}}
                                    disabled={!calling} onClick={this.handleStopCall}>
                                전화 끊기
                                <i className="icon"><FaPhoneSquare/></i>
                            </Button>
                        </div>
                        <div className="row">
                            <Button variant="contained" className="pause-btn" 
                            style={{color : 'white', backgroundColor : calling && hold ? '#565151': '#a3a3a3'}}
                                    disabled={!calling} 
                                    onClick={hold ? this.handleResumeCall : this.handleHoldCall}>
                                { hold ? '시작' : '대기'}
                                {
                                    hold
                                    ? (<i className="icon"><FaPlay/></i>)
                                    : (<i className="icon"><FaPause/></i>)
                                }
                            </Button>
                            <Button variant="contained" className="mute-btn" 
                            style={{color : 'white', backgroundColor : calling && mute ? '#565151': '#a3a3a3'}}
                                    disabled={!calling} onClick={this.handleMuteCall}>
                                음소거
                                {
                                    mute
                                    ? (<i className="icon"><FaVolumeUp/></i>)
                                    : (<i className="icon"><FaVolumeMute/></i>)
                                }
                            </Button>
                        </div>
                    </FunctionWrapper>
                </Column>
                <Column>
                <ScrollbarsWrapper>
                        <BoxTitle>고객 정보</BoxTitle>
                        <Scrollbars style={{width : '100%', height : 300}}>
                            <CustomerInfoContent>    
                                {
                                    (memberFetching === false && memberResult === null) 
                                    ? (
                                        <InfoWrapper>
                                            선택된 고객이 없습니다
                                        </InfoWrapper>
                                    )
                                    : (memberFetching === true || memberResult === null) 
                                    ? (
                                        <Progress/>
                                    )
                                    : (memberResult === 'SUCCESS')
                                    ? (selectedCounseling !== null)
                                    ? (
                                        <Fragment>
                                            <CustomerInfoItem>
                                                <span>이름</span>
                                                <span>{memberInfo.name}</span>
                                            </CustomerInfoItem>
                                            <CustomerInfoItem>
                                                <span>아이디</span>
                                                <span>{memberInfo.id}</span>
                                            </CustomerInfoItem>
                                            <CustomerInfoItem>
                                                <span>전화번호</span>
                                                <span>{memberInfo.phone}</span>
                                            </CustomerInfoItem>
                                            <CustomerInfoItem>
                                                <span>생년월일</span>
                                                <span>{memberInfo.birth}</span>
                                            </CustomerInfoItem>
                                            <CustomerInfoItem>
                                                <span>성별</span>
                                                <span>{memberInfo.gender===1 ? '남' : '여'}</span>
                                            </CustomerInfoItem>
                                        </Fragment>
                                    )
                                    : (
                                        <InfoWrapper>
                                            선택된 고객이 없습니다
                                        </InfoWrapper>
                                    )
                                    : (
                                        "에러"
                                    )
                                }
                            </CustomerInfoContent>
                        </Scrollbars>
                    </ScrollbarsWrapper>
                    <ScrollbarsWrapper>
                        <BoxTitle>상담 정보</BoxTitle>
                        <Scrollbars style={{width : '100%', height : 300}}>
                            <CounselingLogContent>
                                {
                                    (selectedCounseling === null)
                                    ? (
                                        <InfoWrapper>
                                            선택된 고객이 없습니다
                                        </InfoWrapper>
                                    )
                                    : (
                                        counselings.map(counseling => {
                                            if(counseling.seq === selectedCounseling) {
                                                return (
                                                    <Fragment
                                                        key={counseling.seq}>
                                                        <CounselingLogItem>상담 분야 : {counseling.category}</CounselingLogItem>
                                                        <CounselingLogItem>고객 메세지 : {counseling.message}</CounselingLogItem>
                                                        {
                                                            (historyFetching)
                                                            ? (
                                                                <Progress/>
                                                            )
                                                            : (historyFetching === false && historyResult === 'SUCCESS')
                                                            ? (
                                                                <HistoryContainer>
                                                                <div className="title">상담 히스토리</div>
                                                                {
                                                                    histories.map( history => {
                                                                        return (
                                                                            <HisotryBox>
                                                                                <span className="memo">
                                                                                    {history.memo}
                                                                                </span>
                                                                                <span className="date">
                                                                                    {history.date}
                                                                                </span>
                                                                                <span className="time">
                                                                                    {history.time}
                                                                                </span>
                                                                            </HisotryBox>
                                                                        )
                                                                    })
                                                                }
                                                                </HistoryContainer>
                                                            )
                                                            : (
                                                                <InfoWrapper>
                                                                    상담 히스토리 없음
                                                                </InfoWrapper>
                                                            )
                                                        }
                                                    </Fragment>
                                                );
                                            }
                                        })    
                                    )
                                }
                            </CounselingLogContent>
                        </Scrollbars>
                    </ScrollbarsWrapper>

                    <FunctionWrapper>
                        <div className="status-row">
                            <Status status={status}/>
                            <span className="name"> 상태 변경 </span>
                        </div>
                        <div className="row">
                            <Button variant="contained" color="default" className="available-btn" onClick={()=>this.handleSetStatus('Available')}>
                                Available
                            </Button>
                            <Button variant="contained" color="default" className="away-btn" onClick={()=>this.handleSetStatus('Away')}>
                                Away
                            </Button>
                        </div>
                        <div className="row">
                            <Button variant="contained" color="default" className="disturb-btn" onClick={()=>this.handleSetStatus('Out of office')}>
                                Do Not Disturb
                            </Button>
                            <Button variant="contained" color="default" className="lunch-btn" onClick={()=>this.handleSetStatus('Custom 1')}>
                                Lunch
                            </Button>
                        </div>
                    </FunctionWrapper>
                </Column>
                <Dimmed 
                    visible={saveMemoFetching || addBlackFetching || statusFetching || completeFetching} 
                    progress={true} 
                    msgVisible={addBlackFetching} msg={"블랙리스트로 등록중입니다."}/>
                {
                    mute && muteVisible
                    ? (
                        <CallingIconWrapper>
                            <FaVolumeMute className="animated zoomIn mute-icon"/>
                        </CallingIconWrapper>
                    )
                    :(!mute && muteVisible)
                    && (
                        <CallingIconWrapper>
                            <FaVolumeUp className="animated zoomIn mute-icon"/>
                        </CallingIconWrapper>
                    )
                }
                {
                    hold && holdVisible
                    ? (
                        <CallingIconWrapper>
                            <FaPause className="animated zoomIn mute-icon"/>
                        </CallingIconWrapper>
                    )
                    :(!hold && holdVisible)
                    && (
                        <CallingIconWrapper>
                            <FaPlay className="animated zoomIn mute-icon"/>
                        </CallingIconWrapper>
                    )
                }
                {
                    callFetching
                    && (
                        <CallingIconWrapper>
                            <FaPhoneVolume className="animated infinite flash"/>
                        </CallingIconWrapper>
                    )
                }
                <AnswerModal
                    open={ModalState.answerModal.visible}
                    title={ModalState.answerModal.title}
                    content={ModalState.answerModal.content}
                    onClose={ModalActions.closeModalWithAnswer}
                />
            </Wrapper>
        );
    }
}

export default connect(
    (state) => ({
        AuthState : state.authentication.toJS(),
        CounselorState : state.counselor.toJS(),
        ModalState : state.modal.toJS()
    }),
    (dispatch) => ({
        AuthActions : bindActionCreators(authActions, dispatch),
        CounselorActions : bindActionCreators(counselorActions, dispatch),
        ModalActions : bindActionCreators(modalActions, dispatch)
    })
)(DoCounseling);