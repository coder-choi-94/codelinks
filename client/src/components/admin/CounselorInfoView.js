import React, {Component} from 'react';
import styled from 'styled-components';
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
    justify-content : space-around;
    align-items : center;
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

const Content = styled.div`
    margin-top : 2rem;

    display : flex;
    flex-direction : column;
`

const ContentHeader = styled.div`
    display : flex;
    width : 100%;
    margin-bottom : 2rem;

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
`
const InfoBox = styled.div`
    display : flex;
    width : 100%;
    margin-bottom : 10px;
    border: 1px solid rgba(0,0,0,0.2);
    font-size: 17px;
    font-weight: 600;
    padding: 5px;

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
`

const MessageBox = styled.div`
    display : flex;
    justify-content : center;

`

class CounselorInfoView extends Component {
    componentDidMount() {
        const { AdminActions } = this.props;
        AdminActions.initializeSearchValue();
    }
    
    handleInputChange = (evt) => {
        const { AdminActions } = this.props;
        const {name, value} = evt.target;
        AdminActions.changeSearchValue({value});
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
    handleKeyUp = (evt) => {
        if(evt.charCode === 13) {
            this.handleSearch();
        }
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
                    <ComboBox onChange={AdminActions.changeSearchKey} value={AdminState.search.key}/>
                    <SearchInput onChange={this.handleInputChange} value={AdminState.search.value} onKeyPress={this.handleKeyUp}/>
                    <SearchButton onClick={this.handleSearch}>검색</SearchButton>
                </SearchWrapper>
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
)(CounselorInfoView);