import React, { Component } from 'react';
import styled, {css} from 'styled-components';
import ComboBox from './ComboBox';
import Progress from '../Progress';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as adminActions from '../../modules/admin';

const Wrapper = styled.div`
    width : 100%;
    margin : 0 auto;
`
const SearchWrapper = styled.div`
    border-bottom: 2px solid black;
    padding : 1rem;
    display : flex;
    flex-direction : column;

    .row {
        display : flex;
        justify-content : space-around;
        align-items : center;
    }
    .row:nth-child(2) {
        margin-top : 2rem;
    }
`

const SearchInput = styled.input`
    height: 45px;
    border: 2px solid #535151;
    padding: 0 10px;
    text-align: center;
    outline : none;
    border-radius : 5px;
`

const SearchButton = styled.button`
    height: 45px;
    padding: 0 15px;
    outline: none;
    border: none;
    color: white;
    background: #9b9393;
    border-radius: 5px; 

    &:hover {
        background: #aca4a4;
    }
    &:active {
        background: #8a8282;
    }
`

const StatusItem = styled.div`
    padding: 13px;
    border-radius: 10px;
    background-color : ${props => props.color};
    color : white;

    &:hover {
        cursor : pointer;
        background-color : ${props => 
            props.type === 0
            ? '#cecece'
            :props.type === 1
            ? '#368a23'
            :props.type === 2
            ? '#e39a11'
            : props.type === 3
            ? '#cc1b1b'
            : props.type === 4
            && '#53d236'
        };
    }

    &:active {
        background-color : ${props => 
            props.type === 0
            ? '#acacac'
            :props.type === 1
            ? '#146812'
            :props.type === 2
            ? '#ca7800'
            : props.type === 3
            ? '#aa0909'
            : props.type === 4
            && '#31b014'
        };
    }
`

const Content = styled.div`
    margin-top : 2rem;

    display : flex;
    flex-direction : column;
`

const ContentHeader = styled.div`
    display : flex;
    width : 100%;
    margin-bottom : 2rem;
    font-size : 17px;

    &>*:nth-child(1) {
        flex : 1;
        display : flex;
        align-items : center;
        justify-content : center;
    }
    &>*:nth-child(2) {
        flex : 1;
        display : flex;
        align-items : center;
        justify-content : center;
    }
    &>*:nth-child(3) {
        flex : 3;
        display : flex;
        align-items : center;
        justify-content : center;
    }
    &>*:nth-child(4) {
        flex : 2;
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
        flex : 3;
        display : flex;
        align-items : center;
        justify-content : center;
    }
    &>*:nth-child(7) {
        flex : 1;
        display : flex;
        align-items : center;
        justify-content : center;
    }
    &>*:nth-child(8) {
        flex : 3;
        display : flex;
        align-items : center;
        justify-content : center;
    }
    &>*:nth-child(9) {
        flex : 4;
        display : flex;
        align-items : center;
        justify-content : center;
    }
    &>*:nth-child(10) {
        flex : 3;
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
    font-size: 14px;
    font-weight: 600;
    padding: 5px;

    &>*:nth-child(1) {
        flex : 0.4;
        display : flex;
        align-items : center;
        justify-content : center;
    }
    &>*:nth-child(2) {
        flex : 1;
        display : flex;
        align-items : center;
        justify-content : center;
    }
    &>*:nth-child(3) {
        flex : 3;
        display : flex;
        align-items : center;
        justify-content : center;
    }
    &>*:nth-child(4) {
        flex : 2;
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
        flex : 3;
        display : flex;
        align-items : center;
        justify-content : center;
    }
    &>*:nth-child(7) {
        flex : 1;
        display : flex;
        align-items : center;
        justify-content : center;
    }
    &>*:nth-child(8) {
        flex : 3;
        display : flex;
        align-items : center;
        justify-content : center;
    }
    &>*:nth-child(9) {
        flex : 4;
        display : flex;
        align-items : center;
        justify-content : center;
    }
    &>*:nth-child(10) {
        flex : 3;
        display : flex;
        align-items : center;
        justify-content : center;
    }
`

const MessageBox = styled.div`
    display : flex;
    justify-content : center;

`

const StatusCircle = styled.div`
    border-radius : 50%;
    width : 10px;
    height : 10px;
    
    background-color : ${props => 
        props.color === 0
        ? '#bdbaba'
        :props.color === 1
        ? '#257912'
        :props.color === 2
        ? '#D28900'
        : props.color === 3
        ? '#BB0A0A'
        : props.color === 4
        && '#42C125'
    };

    &:hover {
        background-color : ${props => 
            props.color === 0
            ? '#cecece'
            :props.color === 1
            ? '#368a23'
            :props.color === 2
            ? '#e39a11'
            : props.color === 3
            ? '#cc1b1b'
            : props.color === 4
            && '#53d236'
        };
    }

    &:active {
        background-color : ${props => 
            props.color === 0
            ? '#acacac'
            :props.color === 1
            ? '#1468a1'
            :props.color === 2
            ? '#ca7800'
            : props.color === 3
            ? '#aa0909'
            : props.color === 4
            && '#31b014'
        };
    }
`

class MonitorView extends Component {
    componentDidMount() {
        const { AdminActions } = this.props;
        AdminActions.initializeSearchValue();
    }
    
    handleInputChange = (evt) => {
        const { AdminActions } = this.props;
        const {name, value} = evt.target;
        AdminActions.changeSearchValue({value});
    }

    handleKeyUp = (evt) => {
        if(evt.charCode === 13) {
            this.handleSearch();
        }
    }
    handleSearchByStatus = (status) => {
        const { AdminActions, AdminState } = this.props;

        const data = {
            key : 'status',
            value : status
        };

        AdminActions.searchCounselorAction(data);
    }
    handleSearch = () => {
        const { AdminActions, AdminState } = this.props;
        const { key, value } = AdminState.search;

        const data = {
            key,
            value 
        };

        AdminActions.searchCounselorAction(data);
    }
    render() {
        const {AdminActions, AdminState} = this.props;

        const {
            fetching : counselorFetching,
            result : counselorResult,
            counselors
        } = AdminState.searchCounselor;
        return (
            <Wrapper>
                <SearchWrapper>
                    <div className="row">
                        <ComboBox onChange={AdminActions.changeSearchKey} value={AdminState.search.key}/>
                        <SearchInput onChange={this.handleInputChange} value={AdminState.search.value} onKeyPress={this.handleKeyUp}/>
                        <SearchButton onClick={this.handleSearch}>검색</SearchButton>
                    </div>
                    <div className="row">
                        <StatusItem color={'#bdbaba'} type={0} onClick={()=>this.handleSearchByStatus(0)}>Logout</StatusItem>
                        <StatusItem color={'#257912'} type={1} onClick={()=>this.handleSearchByStatus(1)}>Available</StatusItem>
                        <StatusItem color={'#D28900'} type={2} onClick={()=>this.handleSearchByStatus(2)}>Away</StatusItem>
                        <StatusItem color={'#BB0A0A'} type={3} onClick={()=>this.handleSearchByStatus(3)}>Do not disturb</StatusItem>
                        <StatusItem color={'#42C125'} type={4} onClick={()=>this.handleSearchByStatus(4)}>Lunch</StatusItem>
                    </div>
                </SearchWrapper>
                <Content>
                    <ContentHeader>
                        <div>상태</div>
                        <div>번호</div>
                        <div>아이디</div>
                        <div>이름</div>
                        <div>전화번호</div>
                        <div>생년월일</div>
                        <div>성별</div>
                        <div>자격증</div>
                        <div>최종학력</div>
                        <div>전공</div>
                    </ContentHeader>
                    {
                        counselorFetching
                        ? (
                            <Progress/>
                        ):
                        counselorResult === 'SUCCESS'
                        ? (
                            counselors instanceof Array
                            ?
                            counselors.map(item => {
                                return (
                                    <InfoBox>
                                        <span><StatusCircle color={item.status}/></span>
                                        <span>{item.seq}</span>
                                        <span>{item.id}</span>
                                        <span>{item.name}</span>
                                        <span>{item.phone}</span>
                                        <span>{item.birth}</span>
                                        <span>{item.gender?'남':'여'}</span>
                                        <span>{item.license}</span>
                                        <span>{`${item.school} ${item.degree} ${item.graduated}`}</span>
                                        <span>{item.major}</span>
                                    </InfoBox>
                                )
                            })
                            :
                            (
                                <InfoBox>
                                    <span><StatusCircle color={counselors.status}/></span>
                                    <span>{counselors.seq}</span>
                                    <span>{counselors.id}</span>
                                    <span>{counselors.name}</span>
                                    <span>{counselors.phone}</span>
                                    <span>{counselors.birth}</span>
                                    <span>{counselors.gender?'남':'여'}</span>
                                    <span>{counselors.license}</span>
                                    <span>{`${counselors.school} ${counselors.degree} ${counselors.graduated}`}</span>
                                    <span>{counselors.major}</span>
                                </InfoBox>
                            )
                        ):
                        counselorResult === 'FAILURE'
                        ? (
                            <MessageBox>
                                조회되는 상담사가 없습니다
                            </MessageBox>
                        )
                        : (
                            ''
                        )
                    }
                </Content>
            </Wrapper>
        );
    }
}

export default connect(
    (state) => ({
        AdminState : state.admin.toJS()
    }),
    (dispatch) => ({
        AdminActions : bindActionCreators(adminActions, dispatch)
    })
)(MonitorView);