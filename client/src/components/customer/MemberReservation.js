import React, { Component } from 'react';
import styled, {css} from 'styled-components';
import Progress from '../Progress';
import oc from 'open-color';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as counselingReducer from '../../modules/counseling';
import * as modalReducer from '../../modules/modal';
import {FaCheck} from 'react-icons/fa';
import NextButton from '../NextButton';
import PrevButton from '../PrevButton';
import {FaAngleRight, FaAngleLeft} from "react-icons/fa";
import '../../styles/animation/fadeinright.css';
import '../../styles/animation/fadeinleft.css';
import '../../styles/animation/fadeoutleft.css';
import '../../styles/animation/fadeoutright.css';
import '../../styles/animation/zoomIn.css';
import ReactTooltip from 'react-tooltip'
import AlertModal from '../Alert';
import Dimmed from '../Dimmed';
const Wrapper = styled.div`
    width : 100%;
    overflow : hidden;
    padding-top : 80px;
    background-color : #e8ebfb;
    min-height : 100vh;
`;

const CounselorInfoBox = styled.div`
    background-color : #dce3ff;
    /* background : white; */
    min-width : 1000px;
    display : flex;
    flex-direction : column;
    padding : 3rem 7rem;
`;

const InfoRow = styled.div`
    display : flex;
    align-items : center;
`;

const ProfileItem = styled.div`
    flex : 1;
    .counselor-profile {
        width : 240px;
        height :240px;
        border-radius : 50%;
        box-shadow : 2px 2px 10px 1px rgba(0,0,0,.3);
        border : 1px solid #bababa;
    }
`;

const ContentItem = styled.div`
    flex : 3.5;
    margin-left : 2rem;
    display : flex;
    flex-direction : column;
    justify-content : center;
    color : #3a3a3a;

    .counselor-education::before {
        content : '';
        min-width : 500px;
        display : block;
        border-bottom : 2.5px solid white;
        margin-bottom : 1rem;
    }

    .counselor-education, .counselor-license {
        font-size : 0.8rem;
        font-weight : 600;
    }

    .bold {
        font-weight : 600;
        font-size : 2rem;
    }

    &>* {
        margin-bottom  :1rem;
    }
`;


const CategoryBox = styled.div`
    position : relative;
    min-width : 1000px;
    background-color : #e8ebfb;
    /* background : white; */

    .category-title {
        text-align : center;
        font-weight : 600;
        color : #b8b8b8
    }

`;

const CategoryList = styled.div`
    width : 400px;
    margin : 0 auto;

    display : flex;
    flex-direction : column;
    padding : 1rem;
    justify-content : center;
    align-items : center;
`;

const CategoryItem = styled.div`
    padding : 5px 12px;
    
    position: relative;
    text-align : center;
    border-radius : 5px;
    margin : 1rem;

    box-shadow : 2px 2px 10px 1px rgba(0,0,0,.3);
    transition : all .125s ease-in-out;

    &:hover {
        background-color : #c9c9ee;
        color : white;
        cursor : pointer;
    }

    &:active {
        background-color : #dadaff;
        color : white;
        cursor : pointer;
    }

    ${props => 
        (props.checked === true)
        ? css`
            background-color : #c9c9ee;
            color : white;
        `
        : css`
            background-color : white;
            color : black;
        `
    }
`;


const ScheduleBox = styled.div`
    position : relative;
    min-width : 1000px;
    background-color : #e8ebfb;
    flex  :1;

    .schedule-title {
        padding-top : 1rem;
        text-align : center;
        font-weight : 600;
        color : #b8b8b8
    }

    .warning-message {
        text-align: center;
        font-size: 2rem;
        padding: 1rem;
        font-weight: 600;
        margin-top : 2rem;

        transition : all 1s ease-out;
    }
`;


const ScheduleList = styled.div`
    margin : 0 auto;
    width : 450px;
    display : flex;
    flex-wrap : wrap;
    padding : 1rem;
    justify-content : flex-start;
    align-items : center;
`;

const ScheduleItem = styled.div`
    padding : 5px 12px;

    position : relative;
    text-align : center;
    border-radius : 5px;
    margin : 1rem;
    z-index : 11;

    

    ${props =>
        props.status === 0 || props.status === 2
        ? css`
            background-color : #e4c3c3;
            cursor : pointer;
            transition : all .5s ease-in-out;
        `
        : props.status === 1
        && css`
            ${props => 
                (props.checked === true)
                ? css`
                    background-color : #c9c9ee;
                    color : white;
                `
                : css`
                    background-color : white;
                    color : black;
                `
            }
            box-shadow : 2px 2px 10px 1px rgba(0,0,0,.3);
            transition : all .125s ease-in-out;
            &:hover {
                background-color : #c9c9ee;
                color : white;
                cursor : pointer;
            }

            &:active {
                background-color : #dadaff;
                color : white;
                cursor : pointer;
            }
        `
    }
`;

const DateBox = styled.div`
    margin : 0 auto;
    padding-top : 2rem;
    width : 300px;
    text-align : center;
    font-size : 1.7rem;
    font-weight : 600;

    .left-icon,
    .right-icon {
        color : ${oc.gray[6]};
        transition : all .15s ease-out;
    }
    .left-icon {
        position : absolute;
        top : 88px;
        left : 30%;
        &:hover {
            cursor : pointer;
            color : black;
        }
    }
    .right-icon {
        position : absolute;
        top : 88px;
        right : 30%;
        &:hover {
            cursor : pointer;
            color : black;
        }
    }
`;


const ConfirmWrapper = styled.div`
    min-width : 1000px;
    height : 100%;
    position : relative;
`;

const ConfirmBox = styled.div`

    width : 420px;
    /* min-width : 1000px; */
    margin : 0 auto;
    padding : 1rem;

    background-color : #e8ebfb;
    display : flex;
    flex-direction : column;
    align-items : center;

    .confirm-title {
        padding-top : 1rem;
        text-align : center;
        font-weight : 600;
        color : #b8b8b8
    }
`;

const ConfirmRow = styled.div`
    display : flex;
    width : 100%;
    .title {
        padding : 1rem;
        flex : 2;
        display : flex;
        font-weight : 600;
        align-items : center;
        justify-content : center;
    }
    .content {
        padding : 1rem;
        flex : 3;
        display : flex;
        font-weight : 600;
        align-items : center;
        justify-content : center;
    }
    .text-area-wrapper {
        flex : 1;
        height : 100px;
        position : relative;

        border : 1px solid rgba(0, 0, 0, 0.3);
        border-radius : 5px;
        
    }
    .text-area{
        flex : 1; 
        position : absolute;
        width : 100%;
        top : 0; left : 0; right : 0; bottom : 0;
        padding : 8px;
        font-size : 15px;
        line-height : 18px;
        resize : none;
        border : none;
        font-weight : 600;
        &:focus {
            outline : none;
        }
        
    }

    .reserve-button {
        flex : 1;
        margin-top: 1rem;
        padding: 10px;
        border-radius: 10px;
        border : none;
        outline : none;
        background-color : #a5a5cf;
        color : white;
        font-weight : 600;

        &:hover {
            background-color : #b7b7d3;
        }
        &:active {
            background-color : #8181b2;
        }
    }
`;


class MemberReservation extends Component {

    stage1Form = null;
    stage2Form = null;
    stage3Form = null;

    componentDidMount() {
        const {CounselingReducer} = this.props;
        const counselorSeq = this.props.CustomerState.selectedCounselorSeq;   // 전 페이지에서 클릭한 상담원의 기본키
        
        // Initialize Store
        CounselingReducer.initializeStore();

        //1.선택한 상담원 정보 가져오기
        CounselingReducer.getCounselorInfoAction(counselorSeq);     

        //2.상담원이 등록한 카테고리 리스트 가져오기
        CounselingReducer.getCategoriesAction(counselorSeq);

        //3. 스케줄 가져오기
        CounselingReducer.getSchedulesAction(counselorSeq);

        //react-tooltip 셋팅
        ReactTooltip.rebuild();
    }

    componentDidUpdate() {
        //react-tooltip 셋팅
        ReactTooltip.rebuild();
    }

    //카테고리 클릭 이벤트
    handleCategoryClick = (clickedIndex) => {
        const {CounselingReducer} = this.props; 
        const {categories} = this.props.CounselingState.toJS().getCategories;   //카테고리 리스트

        //기존에 클릭된 카테고리 인덱스 얻어오기
        const beforeIndex = categories.findIndex(category => category.checked === true); 

        //카테고리 TOGGLE(클릭/언클릭) 처리
        CounselingReducer.toggleCategory({key : clickedIndex});   

        if(beforeIndex !== clickedIndex) {
            CounselingReducer.uncheckCategory({key : beforeIndex});   //기존 카테고리 클릭해제
        }
    }

    handleScheduleClick = (selectedIndex) => {
        const {CounselingReducer} = this.props;
        const {schedules, selected} = this.props.CounselingState.toJS().getSchedules;
        const prevIndex = schedules[selected].time.findIndex( time => time.checked === true);

        CounselingReducer.toggleSchedule({selectedIndex});
        
        if(prevIndex !== selectedIndex) {
            CounselingReducer.uncheckSchedule({prevIndex});
        }
    }

    handlePrevButtonClick = () => {
        const {CounselingReducer} = this.props;
        const stage = this.props.CounselingState.get('stage');

        if(stage === 2) {
            this.stage2Form.classList.remove('fadeInRight');
            this.stage2Form.classList.add('fadeOutRight');

            setTimeout(()=> {
                CounselingReducer.prevStage();
                this.stage1Form.classList.remove('fadeInRight');
                this.stage1Form.classList.add('fadeInLeft');
            },400);
        } else if(stage === 3) {
            this.stage3Form.classList.remove('fadeInRight');
            this.stage3Form.classList.add('fadeOutRight');

            setTimeout(()=> {
                CounselingReducer.prevStage();
                this.stage2Form.classList.remove('fadeInRight');
                this.stage2Form.classList.add('fadeInLeft');
            },400);
        }
    }

    handleNextButtonClick = () => {
        const {CounselingReducer} = this.props;
        const stage = this.props.CounselingState.get('stage');

        // 사라지는 애니메이션을 추가해줌으로써 사라지는 애니메이션을 즉각반영후 
        // 애니메이션 시간이 0.5초이니, 0.5초 뒤에 stage를 바꿔서 다음 stage를 보여줌.
        if (stage === 1) {  // 1 -> 2
            this.stage1Form.classList.remove('fadeInRight');
            this.stage1Form.classList.add('fadeOutLeft');
        } else if (stage === 2) { // 2 -> 3
            this.stage2Form.classList.remove('fadeInRight');
            this.stage2Form.classList.add('fadeOutLeft');

        }

        setTimeout(() => {
            CounselingReducer.nextStage();
        }, 400);
        
    }

    handleChangeDate = (type) => {
        const {CounselingReducer, ModalReducer} = this.props;
        
        //스케쥴을 가져와서 최근에 클릭된 시간대를 uncheck 처리 데이트를 바꿨기때문에 초기화해주기 위함.
        const {schedules, selected} = this.props.CounselingState.toJS().getSchedules;
        const prevIndex = schedules[selected].time.findIndex( time => time.checked === true);

        
        if(type === 'prev') {
            if(selected === 0) {        //현재 보이는 스케줄 정보가 스케줄 배열의 0번째 데이터라면
                ModalReducer.openModal({title : '알림', content : '상담사가 등록한 시간대가 더이상 존재하지 않습니다.'});
            } else {
                CounselingReducer.uncheckSchedule({prevIndex});
                CounselingReducer.getPrevDate();
            }
        }else {
            if(selected === schedules.length-1) {        //현재 보이는 스케줄 정보가 스케줄 배열의 0번째 데이터라면
                ModalReducer.openModal({title : '알림', content : '상담사가 등록한 시간대가 더이상 존재하지 않습니다.'});
            } else {
                CounselingReducer.uncheckSchedule({prevIndex});
                CounselingReducer.getNextDate();
            }
        }
    }
    

    handleChangeMessage = (evt) => {
        const{value} = evt.target;
        const {CounselingReducer}  = this.props;

        CounselingReducer.changeMessage({message : value});
    }

    handleReservation = () => {
        if(this.props.CounselingState.get('reservation').toJS().fetching) {
            return;
        }
        const {userSeq, userId, userType, userName} = this.props.AuthState.get('loginInfo').toJS();
        const {CounselingReducer, ModalReducer} = this.props;
        if(userSeq === null ||userId === null ||userType === null ||userName === null) {
            const modalData = {
                title : '알림', 
                content : '먼저, 로그인을 해주세요'
            };
            ModalReducer.openModal(modalData);
            return;
        }
        
        const reservedInfo = this.props.CounselingState.get('reservedInfo').toJS();
        const {counselor_seq} = this.props.CounselingState.get('getCounselorInfo').toJS().counselorInfo;
        const {selected} = this.props.CounselingState.get('getSchedules').toJS();
        const schedule_seq = this.props.CounselingState.get('getSchedules').toJS().schedules[selected].seq;
        reservedInfo['counselor_seq'] = counselor_seq;
        reservedInfo['member_seq'] = userSeq;
        // reservedInfo['schedule_seq'] = schedule_seq;

        CounselingReducer.reserveCounselingAction(reservedInfo)
        .then( () => {
            if (this.props.CounselingState.get('reservation').toJS().result === 'SUCCESS') {
                const modalData = {
                    title : '알림',
                    content : '예약되었습니다!\n'
                };
                ModalReducer.openModal(modalData);
                this.props.history.push('/main');
            } else {
                const modalData = {
                    title : '에러',
                    content : '예상치 못한 에러가 발생했습니다.\n잠시 후 다시 시도해 주세요.'
                };
                ModalReducer.closeModal(modalData);
            }
        })
    }

    render() {
        const {CounselingState} = this.props;
        const {fetching : counselor_fetching, counselorInfo, result : counselor_result} = this.props.CounselingState.get('getCounselorInfo').toJS();
        const {fetching : category_fetching, categories, result : category_result} = this.props.CounselingState.get('getCategories').toJS();
        const {fetching : schedules_fetching, schedules, result : schedules_result, selected} = this.props.CounselingState.get('getSchedules').toJS();
        const reservedInfo = this.props.CounselingState.get('reservedInfo').toJS();
        const stage = this.props.CounselingState.get('stage');

        let clearedCategory = false;
        let clearedSchedule = false;

        //카테고리 가져오기를 완료했을 경우 카테고리 선택여부에 따라 다음 스테이지로 넘어가는 화살표를 노출할지 말지 결정
        if(categories !== null && category_result === 'SUCCESS' && category_fetching === false) {
            clearedCategory = categories.filter(category => category.checked === true).length > 0; 
        }

        //스케줄을 가져오기를 완료했을 경우 스케줄 선택여부에 따라 다음 스테이지로 넘어가는 화살표를 노출할지 말지 결정
        if(schedules !== null && schedules_result === 'SUCCESS' && schedules_fetching === false) {
            clearedSchedule = schedules[selected].time.findIndex( time => time.checked === true) > -1
        }
        
        
        

        return (
            <Wrapper>
                <CounselorInfoBox>
                    { 
                        counselor_result === null | counselor_fetching === true
                        ? <Progress size={50}/> 
                        : counselorInfo === null
                        ? ''
                        : (
                            <InfoRow>
                                <ProfileItem>
                                    <img className="counselor-profile" src={`${counselorInfo.profile}`} alt="프로필"/>
                                </ProfileItem>
                                <ContentItem>
                                    <div className="counselor-name">
                                        <span className="bold">{counselorInfo.counselor_name}</span> 상담사
                                    </div>
                                    <div className="counselor-comment">
                                        {counselorInfo.comment}
                                    </div>
                                    <div className="counselor-education">
                                        {counselorInfo.school} {counselorInfo.major} {counselorInfo.graduated}
                                    </div>
                                    <div className="counselor-license">
                                        {counselorInfo.license_name}
                                    </div>
                                </ContentItem>
                            </InfoRow>
                        )
                    }
                </CounselorInfoBox>
                {
                    (stage === 1) && (  
                        <CategoryBox className="animated fadeInRight" ref={ref => this.stage1Form = ref}>
                            <CategoryList>
                                <div className="category-title">상담 받으려는 분야를 선택하세요</div>
                                {
                                    (category_result === null | category_fetching === true)
                                    ? (<Progress size={50}/>)
                                    : categories === null
                                    ? ''
                                    : (
                                        categories.map( (category, index) => {
                                            return (  
                                            <CategoryItem
                                                key={index}
                                                checked={category.checked}
                                                onClick={() => this.handleCategoryClick(index)}>
                                                <span className="category-value">{category.category}</span>
                                            </CategoryItem>
                                            )
                                        })
                                    )
                                }
                            </CategoryList>
                            <NextButton show={clearedCategory} onClick={this.handleNextButtonClick}/>
                        </CategoryBox>
                    )
                }
                { 
                    (stage === 2) &&
                    (
                        <ScheduleBox className="animated fadeInRight" ref={ref => this.stage2Form = ref}>
                            <div className="schedule-title">상담 받으실 시간대를 선택하세요</div>
                            <DateBox>
                                <FaAngleLeft 
                                    className="left-icon"
                                    onClick={() => this.handleChangeDate('prev')}/>
                                {`${schedules[selected].date} (${schedules[selected].week})`}
                                <FaAngleRight 
                                    className="right-icon"
                                    onClick={() => this.handleChangeDate('next')}/>
                            </DateBox>
                            <ScheduleList>
                                {
                                    schedules[selected].time.map( (time, index) => {
                                        if (time.status !== 1) {    //1 이 아니면 온클릭 이벤트 제거 0과 2는 예약불가
                                            return (
                                                <ScheduleItem
                                                        key={index}
                                                        checked={time.checked}
                                                        status={time.status}
                                                        data-tip={(time.status === 0) ? "예약 불가능한 시간입니다" : "이미 예약된 시간입니다"}
                                                        >
                                                        <span className="time-value">{time.time}</span>
                                                </ScheduleItem>
                                            )
                                        } else {
                                            return (
                                                <ScheduleItem
                                                        key={index}
                                                        onClick={() => this.handleScheduleClick(index)}
                                                        checked={time.checked}
                                                        status={time.status}
                                                        >
                                                        <span className="time-value">{time.time}</span>
                                                </ScheduleItem>
                                            )
                                        }
                                    })
                                }
                                <ReactTooltip type='warning' effect='solid'/>   
                            </ScheduleList>
                            <PrevButton show={true} onClick={this.handlePrevButtonClick}/>
                            <NextButton show={clearedSchedule} onClick={this.handleNextButtonClick}/>
                        </ScheduleBox>
                    )
                }
                {
                    (stage === 3) && (
                        <ConfirmWrapper className="animated fadeInRight" ref={ref => this.stage3Form = ref}>
                            <ConfirmBox>
                                <div className="confirm-title">상담 예약 정보를 확인하세요.</div>
                                <ConfirmRow>
                                    <span className="title">상담 분야</span>
                                    <span className="content">{reservedInfo.category}</span>
                                </ConfirmRow>
                                <ConfirmRow>
                                    <span className="title">상담 날짜</span>
                                    <span className="content">{`${reservedInfo.date} ${reservedInfo.week}요일`}</span>
                                </ConfirmRow>
                                <ConfirmRow>
                                    <span className="title">상담 시간</span>
                                    <span className="content">{`${reservedInfo.time}`}</span>
                                </ConfirmRow>
                                <ConfirmRow>
                                    <div className="text-area-wrapper">
                                        <textarea 
                                            className="text-area" 
                                            placeholder="원활한 상담을 위해&#x0a;상담사에게 현재 자신의 상태를 알려주세요."
                                            onChange={this.handleChangeMessage}
                                            maxLength={100}>
                                        </textarea>
                                    </div>
                                </ConfirmRow>
                                <ConfirmRow>
                                    <button className="reserve-button" onClick={this.handleReservation}>
                                        예약 하기
                                    </button>
                                </ConfirmRow>
                            </ConfirmBox>
                            <PrevButton show={true} onClick={this.handlePrevButtonClick}/>
                        </ConfirmWrapper>
                    )
                }
                <Dimmed visible={this.props.CounselingState.get('reservation').toJS().fetching} progress={true}/>
            </Wrapper>
        );
    }
}

export default connect(
    (state) => ({
        CounselingState : state.counseling,
        AuthState : state.authentication,
        ModalState : state.modal.toJS(),
        CustomerState : state.customer.toJS()
    }),
    (dispatch) => ({
        CounselingReducer : bindActionCreators(counselingReducer, dispatch),
        ModalReducer : bindActionCreators(modalReducer, dispatch)
    })
)(MemberReservation);