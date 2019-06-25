import React, { Component } from 'react';
import oc from 'open-color';
import styled, {css} from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
import Calendar from 'react-calendar';
import {connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as counselorActions from '../../modules/counselor';
import * as authActions from '../../modules/authentication';
import * as cateActions from '../../modules/categories';
import * as modalActions from '../../modules/modal';
import Progress from '../Progress';
import Dimmed from '../Dimmed';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import {
    FaCalendarCheck,
    FaCheckCircle,
    FaRegCalendarPlus,
    FaRegCalendarMinus,
    FaDoorOpen,
    FaDoorClosed
} from "react-icons/fa";
import '../../styles/animation/zoomIn.css';


const RootWrapper = styled.div`
    padding-top : 80px;
    width : 100%;
    margin-bottom : 2rem;
    background : rgb(251, 251, 251);
`

const ContentWrapper = styled.div`
    max-width : 1200px;
    min-width : 900px;
    height : 100%;
    margin : 0 auto;
    background-color : white;
    padding : 1rem;

    &>.title {
        font-weight : 600;
        margin-top : 1rem;
        margin-bottom : 2rem;

        border-top: 1.5px solid #152852;
        border-bottom: 1.5px solid #152852;
        padding: 10px;
        color: #152852;
    }
    .sub-title {
        font-weight : 600;
        font-size : 18px;
    }
`
const Content = styled.div`
    margin-top : 1rem;
    display : flex;
    justify-content : space-between;
`

const CategoryWrapper = styled.ul`
    border : 1px solid #132641;
    border-radius : 5px;
    padding : 1rem;

    display : flex;
    flex-wrap : wrap;
    align-items : center;
    justify-content : space-around;

    width : 100%;
`;

const Category = styled.li`
    margin-bottom: 10px;
    list-style: none;
    width: 17%;
    padding: 3px 8px;
    border: 1.5px rgba(0,0,0,0.3);
    border-radius: 3px;
    background-color: #f1f1f1;
    font-size : 15px;
    font-weight : 600;
    text-align : center;
    line-height : 18px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    transition : .15s all ease-in-out;

    background-color : ${props => props.checked === true && "#295480;"};
    color : ${props => props.checked === true && "white"};

    &:hover {
        cursor : pointer;
        color : white;
        background-color : #2f5fc6;
    }
    &:active {
        color : ${oc.gray[0]};
        background-color : #204086;
    }        
`;
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

    background: #f2f1f1;
    border-radius: 10px;
    padding: 10px 0;
    color: black;
    font-weight: 600;
    font-size: 17px;

    transition : all .125s ease-out;

    &:hover {
        background: #55a5f4;
        color: white;
        cursor : pointer;
    }
    &:active {
        background: #006edc;
        color: white;
    }
`
const InfoWrapper = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    width : 100%;
    height : 100%;
    position : relative;

    .make-schedule-btn {
        height: 40%;
        width: 60%;
        font-size: 2rem;
        font-weight: 600;
    }
    .schedule-icon {
        font-size : 3rem;
        color : white;
        margin-right : 1rem;
    }
`;

const AddForm = styled.div`
    width : 100%;

    display : flex;
    flex-direction : column;
    align-items : center;

    &>.title {
        font-weight: 600;
        font-size: 1rem;
        margin: 1rem 0 2rem 0;
    }
    &>.submit-btn {
        margin: 2rem 0;
        width: 60%;
        padding: 10px;
    }
`

const AddFormRow = styled.div`
    width : 100%;
    display : flex;
    justify-content : space-around;
    align-items : center;
    padding : 5px 10px;
    /* background-color: #eae9e9; */
    border-radius: 5px;
    margin-bottom: 10px;

`

const AddFormRow2 = styled.div`
    width : 90%;
    display : flex;
    justify-content : space-around;
    align-items : center;
    padding : 5px 10px;
    /* background-color: #eae9e9; */
    border-radius: 5px;
    margin-bottom: 10px;

`

const SelectTime = styled.div`
        padding: 1rem;
        border-radius: 7px;
        box-shadow : 2px 2px 10px 2px #e6e6e6;
        transition : all .125s ease-out;

        &:hover {
            background-color : #4052b5;
            color : white;
            cursor : pointer;
        }
        &:active {
            background-color : #3041a4;
            color : white;
        }

        ${props =>
            (props.checked)
            ? css`
                background-color : #4052b5;
                color : white;
            `
            : css`
                background-color: #faf8f8;
                color : black;
            `
        }
`

const SelectTime2 = styled.div`
        padding: 1rem;
        border-radius: 7px;
        box-shadow : 2px 2px 10px 2px #e6e6e6;
        transition : all .125s ease-out;
        display : flex;
        align-items : center;
        justify-content : space-around;
        width: 50%;

        .door-icon {
            font-size : 2rem;
        }

        ${props =>
            (props.status === 1)
            ? css`
                background-color : #4052b5;
                color : white;
            `
            :(props.status === 2) 
            && css`
                background-color : #F1C07E;
                color : white;
            `
            
        }
`

const CheckIcon = styled.div`

    font-size : 2rem;
    transition: all .25s ease-out;

    &:hover {
        color : #4052b5;
        cursor : pointer;
    }
    &:active {
        color : #3041a4;
    }
    ${props =>
        (props.checked)
        ? css`
            color : #4052b5;
        `
        : css`
            color : #b0afaf;
        `
    }
`
const CheckIcon2 = styled.div`

    font-size : 2rem;
    transition: all .25s ease-out;
    color : #b0afaf;
    &:hover {
        cursor : pointer;
    }
    ${props =>
        (props.status === 1)
        ? css`
            color : #4052b5;
        `
        :(props.status === 2) 
        && css`
            color : #F1C07E;
        `
    }

    ${props =>
        (props.status === 1)
        ? css`
            &:hover {
                color : #b0afaf;
            }
            &:active {
                color : #a09e9e;
            }
        `
        :(props.status === 0)
        && css`
            &:hover {
                color : #4052b5;
            }
            &:active {
                color : #3041a4;
            }
        `

    }
`



class MakeCounseling extends Component {
    getToday = (date) => {
        const today = `${date.getFullYear()}-${date.getMonth()+1<10 ? '0'+(date.getMonth()+1) : date.getMonth()+1}-${date.getDate()<10 ? '0'+date.getDate() : date.getDate()}`;
        return today;
    }

    componentDidMount() {        
        // const {checkIsLoggedIn, loginInfo} = this.props.AuthState;

        // if(checkIsLoggedIn.result !== 'SUCCESS' || loginInfo.userType !== 'counselor') {
        //     this.props.history.push('/main');
        // }

        window.addEventListener("keyup", this.handleKeyDown, true);

        const {CounselorActions, AuthState, CounselorState} = this.props;
        const {userSeq : counselorSeq} = AuthState.loginInfo;
        //현 페이지 관련 state 초기화
        CounselorActions.initializeMakeCounselor();
        



        // 카테고리 리스트 가져오기
        CounselorActions.getCategoriesAction(counselorSeq);

        
        // 날짜별 스케줄 가져오기
        const parsedDate = this.getToday(CounselorState.makeCounselingDate);
        CounselorActions.getMySchedulesAction({counselorSeq, date : parsedDate});

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


    handleClickDay = (value) => {

        const {CounselorState, CounselorActions, AuthState} = this.props;

        
        //날짜를 클릭한 날짜로 변경
        CounselorActions.clickCounselingDate({date:value});

        //날짜를 변경하면 노멀모드로 초기화
        CounselorActions.changeMode({mode : 'normal'});

        // 날짜별 스케줄 가져오기
        const parsedDate = this.getToday(value);
        const {userSeq : counselorSeq} = AuthState.loginInfo;
        CounselorActions.getMySchedulesAction({counselorSeq, date : parsedDate});
    }

    //카테고리 클릭 이벤트
    handleCategoryClick = (clickedIndex, categoryName, checked) => {
        const {userSeq : counselorSeq} = this.props.AuthState.loginInfo;
        this.props.CounselorActions.clickCategoryAction(counselorSeq, clickedIndex, categoryName, checked);
    }

    //일정 생성 버튼 클릭
    handleClickMakeSchedule = () => {
        const {
            CounselorActions,
            CounselorState
        } = this.props;

        const {
            mode
        } = CounselorState


        // add 모드로 변경
        CounselorActions.changeMode({mode : 'add'});
    }

    handleClickTime = (clickedIndex) => {
        const {CounselorActions} = this.props;

        CounselorActions.clickTime({"all" : false, clickedIndex});
    }

    handleClickAllTime = () => {
        const {CounselorActions} = this.props;
        CounselorActions.clickTime({"all" : true});
    }

    handleChangeTime = (time, status, index) => {
        if(status === 2) {
            const {ModalActions} = this.props;
            const modalData = {
                title : '알림',
                content : '해당 시간대는 이미 예약이 되어있습니다!'
            }
            ModalActions.openModal(modalData);
            return;
        }
        const {CounselorActions, AuthState, CounselorState} = this.props;

        const {userSeq : counselorSeq} = AuthState.loginInfo;
        const {makeCounselingDate : date} = CounselorState;

        const parsedDate = this.parseDate(date);
        //CHEKCKDPW@@
        const colname = 't'+time.substring(0,2)+time.substring(3,5);
        const colvalue = status ? 0 : 1 //1인 상태면 0으로 바꾸고 아니면 1로바꾼다

        CounselorActions.changeTimeAction({counselorSeq, date : parsedDate, colname, colvalue, index});


    }
    
    handleMakeCounseling = () => {
        const {CounselorActions, CounselorState, AuthState} = this.props;

        const counselorSeq = AuthState.loginInfo.userSeq;
        const parsedDate = this.getToday(CounselorState.makeCounselingDate);
        const timeValues = CounselorState.timeList.map( item => item.checked ? 1 : 0);
        console.log(counselorSeq, parsedDate, timeValues);

        //check@@

        CounselorActions
        .makeCounselingAction(counselorSeq, parsedDate, timeValues)
        .then(() => {
            CounselorActions.getMySchedulesAction({counselorSeq, date : parsedDate});
            CounselorActions.initializeTimeList();
            // const snackData = {  
            //     message : '상담 등록 완료',
            //     variant : 'success'
            // }
            // CounselorActions.openSnackBar(snackData);
        })
    }

    handleSnackbarOpen = () => {

    }

    handleSnackbarClose = () => {

    }

    render() {
        if(this.props.AuthState.loginInfo.userType !== 'counselor') {
            this.props.history.push('/main');
        }

        const {
            makeCounselingDate,
            mode,
            timeList
        } = this.props.CounselorState;

        const {
            fetching : categoryFetching,
            result : categoryResult,
            categories
        } = this.props.CounselorState.getCategories;

        const {
            fetching : clickCategoryFetching,
            result : clickCategoryResult
        } = this.props.CounselorState.clickCategory;

        const {
            fetching : makeCounselingFetching,
            result : makeCounselingResult
        } = this.props.CounselorState.makeCounseling;

        const {
            fetching : changeTimeFetching,
            result : changeTimeResult
        } = this.props.CounselorState.changeTime;

        const {
            fetching : scheduleFetching,
            result : scheduleResult,
            schedules
        } = this.props.CounselorState.getMySchedules;

        return (
            <RootWrapper>      
                <ContentWrapper>
                    <div className="title">상담 등록</div>

                    <div className="sub-title">카테고리 등록 ></div>
                    <CategoryWrapper>
                        {
                            (categoryFetching === true)
                            ? <Progress/>
                            : (categories === null)
                            ? (
                                <InfoWrapper>
                                    카테고리가 존재하지 않습니다
                                </InfoWrapper>
                              )
                            : categories.map( (category, index) => {
                                return (
                                        <Category
                                            key={index}
                                            name={category.name}
                                            checked={category.checked}
                                            onClick={() => this.handleCategoryClick(index, category.name, category.checked)}
                                            >
                                            {category.name}
                                        </Category>
                                        )

                            })
                        }
                    </CategoryWrapper>

                    <div className="sub-title">일정 등록 ></div> 
                    <Content>
                        <Calendar
                            onClickDay={this.handleClickDay}
                            value={makeCounselingDate}
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
                                    (scheduleFetching)
                                    ? (
                                        <Progress/>
                                    )
                                    :(scheduleResult === 'SUCCESS')
                                    ? (
                                        <AddForm className="animated zoomIn">
                                            <div className="title">
                                                등록된 일정
                                            </div>
                                            {
                                                schedules.map( (item, index) => {
                                                    return (
                                                        <AddFormRow2 key={index}>
                                                            <SelectTime2 
                                                                className="time" 
                                                                status={item.status}>
                                                                    {
                                                                        item.status === 0 || item.status === 2
                                                                        ? <FaDoorClosed className="door-icon"/>
                                                                        : <FaDoorOpen className="door-icon"/>
                                                                    }
                                                                    {item.time}
                                                            </SelectTime2>
                                                            <CheckIcon2 
                                                                status={item.status}
                                                                onClick={() => this.handleChangeTime(item.time, item.status, index)}>
                                                                {
                                                                    item.status === 0 || item.status === 2
                                                                    ? <FaRegCalendarPlus/>
                                                                    : <FaRegCalendarMinus/>
                                                                }
                                                                
                                                            </CheckIcon2>
                                                        </AddFormRow2>
                                                    )
                                                })
                                            }    
                                        </AddForm>
                                        
                                    )
                                    : (scheduleResult === 'FAILURE')
                                    ? (   
                                        (mode === 'normal')
                                        ? (
                                            <InfoWrapper>
                                                <Button
                                                    color='primary'
                                                    variant='contained'
                                                    className="make-schedule-btn"
                                                    onClick={this.handleClickMakeSchedule}>
                                                    <FaCalendarCheck className="schedule-icon"/>
                                                    일정 생성
                                                </Button>
                                            </InfoWrapper>
                                        )
                                        : mode === 'add'
                                        ? (
                                            <AddForm className="animated zoomIn">
                                                <div className="title">
                                                    상담 가능한 시간대를 선택해주세요
                                                </div>
                                                <AddFormRow>
                                                    <Button 
                                                        style={{marginLeft : '65%', marginBottom : '20px'}} 
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={this.handleClickAllTime}>
                                                        모두 선택
                                                    </Button>
                                                </AddFormRow>
                                                {
                                                    timeList.map((item, index) => {
                                                        return (
                                                            <AddFormRow>
                                                                <SelectTime 
                                                                    className="time" 
                                                                    checked={item.checked} 
                                                                    onClick={() => this.handleClickTime(index)}>
                                                                    {item.time}
                                                                </SelectTime>
                                                                <CheckIcon 
                                                                    checked={item.checked}
                                                                    onClick={() => this.handleClickTime(index)}>
                                                                    <FaCheckCircle/>
                                                                </CheckIcon>
                                                            </AddFormRow>
                                                        )
                                                    })
                                                }
                                                <Button
                                                    className="submit-btn"
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={this.handleMakeCounseling}>
                                                    등록
                                                </Button>
                                            </AddForm>
                                        )
                                        : ''
                                    )
                                    : ""
                                }
                            </ScrollInner>
                        </Scrollbars>
                        
                    </Content>
                </ContentWrapper>
                <Dimmed visible={clickCategoryFetching} progress={true}/>
                <Dimmed visible={makeCounselingFetching} progress={true}/>
                <Dimmed visible={changeTimeFetching} progress={true}/>
                {/* <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={this.props.CounselorState.snackbar.visible}
                    autoHideDuration={2000}
                    onClose={this.handleSnackbarClose}
                >
                    <MySnackbarContentWrapper
                    onClose={this.handleSnackbarClose}
                    variant={this.props.CounselorState.snackbar.variant}
                    message={this.props.CounselorState.snackbar.message}
                    />
                </Snackbar> */}
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
        AuthActions : bindActionCreators(authActions, dispatch),
        ModalActions : bindActionCreators(modalActions, dispatch)
    })
)(MakeCounseling); 