import React, { Component } from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as memberReducers from '../../modules/member';
import * as cateReducers from '../../modules/categories';
import * as counselingReducers from '../../modules/counseling';
import { bindActionCreators } from 'redux';
import oc from  'open-color';
import Progress from '../Progress';
import Button from '@material-ui/core/Button';
import '../../styles/animation/zoomIn.css';
import * as customerActions from '../../modules/customer';
import * as modalActions from '../../modules/modal';
import axios from 'axios';
import Dimmed from '../Dimmed';

const Wrapper = styled.div`
    margin-top : 1rem;
    width : 768px;
    margin : 0 auto;
    padding-top : 80px;
`;

const SearchWrapper = styled.div`
    margin-top : 2rem;
    position : relative;
    display : flex;
    flex-direction : column;
    width : 100%;
    border-bottom : 2px solid black;
    padding-bottom : 2rem;

    .title {
        font-size : 15px;
        font-weight : 600;
        margin-bottom : 1.5rem;
    }
    .sub-title {
        font-size : 13px;
        margin-bottom : -10px;
    }
    .search-input {
        margin-top : 1.5rem;
        padding : 10px 5px;
        border : 2px solid #132641;
        border-radius : 8px;
        outline : none;
        text-align : center;
        margin-bottom : 1rem;

    }

    .search-icon {
        position : absolute;
        top : 87px; left : 25px;
    }
`;


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
    font-weight : 500;
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
    /* background-color : ${props => props.checked === true && "#91bde9;"};
    color : ${props => props.checked === true && "white"};

    &:last-child {
        
    }
    &:hover {
        cursor : pointer;
        color : white;
        background-color : #91bde9;
    }
    &:active {
        color : ${oc.gray[0]};
        background-color : #66a6e6;
    }         */
`;


const CounselingList = styled.ul`
    display : flex;
    flex-direction : column;
    width : 100%;
    padding : 0;
`;

const CounselingItem = styled.li`
    margin-bottom : 1rem;
    padding : 1rem;

    display : flex;
    align-items : flex-start;
    padding : 1rem;

    box-shadow: 1px 1px 1px #efece8;
    border: 1px #efece8 solid;
    border-bottom : 1px #eeeeee solid;
`;

const ProfileRow = styled.div`
    flex : 1;
    &>img {
        border : 1px solid #ededed;
        border-radius : 50%;
        width : 140px;
        height : 140px;
    }
`;
const ContentRow = styled.div`
    flex : 4;

    display : flex;
    flex-direction :column;
    padding : 0.5rem;

    &>* {
        margin-bottom : 1rem;
    }

    .name {
        font-size : 20px;
        font-weight : 600;
    }

    .comment {
        color : ${oc.gray[6]};
        font-size : 15px;
        font-weight : 500;
    }


`;
const ButtonRow = styled.div`
    flex : 1;

    display : flex;
    flex-direction :column;
    padding : 1.25rem;

    .reservation-btn {
        border-radius : 10px;
        background-color : ${oc.gray[4]};
        color : ${oc.gray[0]};
        padding : 3px 12px;
    }
`;

const InfoWrapper = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    width : 100%;
`;
class SearchCounselor extends Component {



    //상담사 이름검색 부분
    handleChanged = (evt) => {
        const {name, value} = evt.target;

        this.props.MemberAction.memberSearchCounselorChanged({name, value});

        const params = {type : "name", name : value};
        this.props.CounselingReducers.getCounselings(params);
    }

    //카테고리 클릭 이벤트
    handleCategoryClick = (clickedIndex) => {
        let params = {};

        //기존에 클릭된 카테고리 인덱스 얻어오기
        const beforeIndex = this.props.categories.findIndex(category => category.checked === true); 

        //카테고리 TOGGLE(클릭/언클릭) 처리
        this.props.CateReducers.toggleCategory({key : clickedIndex});   

        if(beforeIndex !== clickedIndex) {
            this.props.CateReducers.uncheckCategory({key : beforeIndex});   //기존 카테고리 클릭해제
            params = {type : "category", category : this.props.categories[clickedIndex].name};
        } else {
            params = {type : "category", category : ''};
        }
        this.props.CounselingReducers.getCounselings(params);


    }

    componentDidMount() {
        if(this.props.categories !== null) {
            return;
        }
        this.props.CateReducers.getCategoriesAction();
    }
    
    handleDoReservation = (counselorSeq) => {
        const {AuthState, ModalActions, CustomerActions} = this.props;
        
        //블랙리스트 여부 확인 시작
        CustomerActions.checkIsBlack();
        
        //로그인 여부 확인
        if(AuthState.checkIsLoggedIn.result !== 'SUCCESS') {
            CustomerActions.checkIsBlackFinish();
            ModalActions.openModal({title : '알림', content : '로그인이 필요한 서비스입니다.'});
            return;
        }

        //관리자 제한
        if(AuthState.loginInfo.userType === 'admin') {
            CustomerActions.checkIsBlackFinish();
            ModalActions.openModal({title : '알림', content : '관리자 서비스가 아닙니다.'});
            return;
        }

        //블랙리스트 여부 확인 
        const URL = `/api/confirm/blacklist?counselorSeq=${counselorSeq}&memberSeq=${AuthState.loginInfo.userSeq}`;
        axios
            .get(URL)
            .then(resData => {
                const {result} = resData.data;
                if(result === 'BLACK') {
                    CustomerActions.checkIsBlackFinish();
                    ModalActions.openModal({title : '알림', content : '해당 상담사에게 더 이상 상담을 받을 수 없습니다.'});
                    return;
                } else {
                    CustomerActions.checkIsBlackFinish();
                    //블랙리스트가아닐경우 상담 예약 진행;
                    CustomerActions.selectCounselor({counselorSeq});
                    this.props.history.push('/main/reservation');
                }
            })
            .catch(err => {
                    console.log('err ', err);
                    CustomerActions.checkIsBlackFinish();
                    ModalActions.openModal({title : '알림', content : '잠시 후 다시 시도해주세요.'});
                    return;
            })
    }
    render() {
        const { CustomerState } = this.props;
        return (
            <Wrapper>
                <SearchWrapper>
                    <span className="title">상담사 찾기</span>
                    <span className="sub-title">이름별 ></span>
                    <input type="text" name="search" value={this.props.member.search} onChange={this.handleChanged} className="search-input" placeholder="상담사 이름을 입력해 주세요" maxLength={20} />
                    <SearchIcon className="search-icon" fontSize="large"/>
                    <span className="sub-title">분야별 ></span>
                    <CategoryWrapper>
                        {
                            (this.props.categoriesFetching === true)
                            ? <Progress/>
                            : (this.props.categories === null)
                            ? (
                                <InfoWrapper>
                                    카테고리가 존재하지 않습니다.
                                </InfoWrapper>
                              )
                            : this.props.categories.map( (category, index) => {
                                return (
                                        <Category
                                            key={index}
                                            name={category.name}
                                            checked={category.checked}
                                            onClick={() => this.handleCategoryClick(index)}
                                            >
                                            {category.name}
                                        </Category>
                                        )

                            })
                        }
                    </CategoryWrapper>
                </SearchWrapper>
                <CounselingList>
                    {
                        this.props.counselingFetching === true 
                        ? <Progress/>
                        : this.props.counseling === null
                        ? (
                            <InfoWrapper>
                                조회되는 상담사가 없습니다.
                            </InfoWrapper>
                          )
                        : this.props.counseling.map( counseling => {
                                return (
                                        <CounselingItem className="animated zoomIn" key={counseling.seq}>
                                            <ProfileRow>
                                                <img src={`${counseling.profile}`} alt="프로필 사진"/>
                                            </ProfileRow>
                                            <ContentRow>
                                                <span className="name">{counseling.name} 상담사</span>
                                                <span className="comment">{counseling.comment}</span>
                                            </ContentRow>
                                            <ButtonRow>
                                                <Button 
                                                    variant="contained" 
                                                    color="primary"
                                                    onClick={() => this.handleDoReservation(counseling.counselor_seq)}>
                                                    상담예약
                                                </Button>
                                            </ButtonRow>
                                        </CounselingItem>
                                        )
                            })  
                    }
                </CounselingList>
                <Dimmed visible={CustomerState.checkIsBlack.fetching} progress={true}/>
            </Wrapper>
        );
    }
}

export default connect(
    (state) => ({
        member : state.member.get('member'),
        categories : state.categories.get('categories'),
        categoriesFetching : state.categories.get('fetching'),
        counseling : state.counseling.get('counselings'),
        counselingFetching : state.counseling.get('fetching'),
        CustomerState : state.customer.toJS(),
        AuthState : state.authentication.toJS()
    }),
    (dispatch) => ({
        MemberAction : bindActionCreators(memberReducers, dispatch),
        CateReducers : bindActionCreators(cateReducers, dispatch),
        CounselingReducers : bindActionCreators(counselingReducers, dispatch),
        CustomerActions : bindActionCreators(customerActions, dispatch),
        ModalActions : bindActionCreators(modalActions, dispatch)
    })
)(SearchCounselor);