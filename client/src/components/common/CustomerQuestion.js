import React, { Component, Fragment } from 'react';
import styled, {css } from 'styled-components';
import QustionTable from './QustionTable';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as customerActions from '../../modules/customer';
import QuestionForm from './QuestionForm';
import Dimmed from '../Dimmed';
import Progress from '../Progress';
import {
    FaChevronLeft,
    FaChevronRight
} from "react-icons/fa";

const Wrapper = styled.div`
    padding-top : 80px;
    min-width : 1200px;
    width : 100%;
    height : 100%;
    background-color : white;
    
`
const Content = styled.div`
    width : 75%;
    height : 100%;
    margin : 0 auto;
    background-color : white;
    padding-top : 1rem;

    .title {
        width : 100%;
        margin : 0 auto;
        margin-bottom : 1rem;
        padding : 1rem;

        border-top : 2px solid #5b5555;
        border-bottom : 2px solid #5b5555;
        font-size : 20px;
        font-weight : 600;

        .sub-title {
            display : inline-block;
            margin-left : 2rem;
            font-size: 13px;
        }
    }
    .write-btn {
        float: right;
        overflow: hidden;
        margin-bottom: 5px;
        height: 30px;
        font-size: 15px;
        line-height: 20px;
        width: 110px;
    }
`

const PageBox = styled.div`
    display : flex;
    width : 300px;
    margin : 0 auto;
    align-items : center;
    justify-content : space-between;
    font-size : 2rem;
    margin-bottom : 3rem;
    color : #797878;

    .move-btn:hover { 
        color : #bfbebe;
    }
    .move-btn:active { 
        color : #565656;
    }
    .text {
        font-size : 1rem;
    }

    .disable {
        color : #eaeaea;  
    }
`
class CustomerQuestion extends Component {

    componentDidMount() {
        const {CustomerActions, CustomerState} = this.props;
        const pageNum = parseInt(this.props.match.params.pageNum);
        CustomerActions.insertPageNum({pageNum});

        CustomerActions.getCustomerQuestionsAction(pageNum);
    }

    

    handleWrite = () => {
        const {CustomerActions} = this.props;
        CustomerActions.openModal();
    }

    handleMovePrevPage = () => {
        const {CustomerActions, CustomerState} = this.props;
        this.props.history.push(`/main/customer/question/${CustomerState.currPage-1}`);
        CustomerActions.insertPageNum({pageNum : CustomerState.currPage-1});
        CustomerActions.getCustomerQuestionsAction(CustomerState.currPage-1);
    }
    handleMoveNextPage = () => {
        const {CustomerActions, CustomerState} = this.props;
        this.props.history.push(`/main/customer/question/${CustomerState.currPage+1}`);
        CustomerActions.insertPageNum({pageNum : CustomerState.currPage+1});
        CustomerActions.getCustomerQuestionsAction(CustomerState.currPage+1);
    }
    render() {

        const {
            CustomerActions,
            CustomerState,
            AuthState
        } = this.props;

        const {modal} = CustomerState; 

        const {
            fetching : questionFetching,
            result : questionResult,
            questions
        } = CustomerState.getCustomerQuestions;

        const pageNum = this.props.match.params.pageNum;

        return (
            <Wrapper>
                <Content>
                    <div className="title">이용 문의 <span className="sub-title">궁금한것이 있다면 언제든 물어보세요</span></div>
                    {
                        (questionFetching)
                        ? (
                            <Progress/>
                        ):(questionResult === 'SUCCESS')
                        ? (
                            <Fragment>
                                {
                                    AuthState.checkIsLoggedIn.result === 'SUCCESS'
                                    && (
                                        <Button className="write-btn" variant="contained" color="primary" onClick={this.handleWrite}>
                                            글 작성
                                        </Button>
                                    )
                                }
                                <QustionTable
                                    data={questions}/>
                            </Fragment>
                        ): (
                            <Fragment>
                                {
                                    (AuthState.checkIsLoggedIn.result === 'SUCCESS')
                                    && (
                                        <Button className="write-btn" variant="contained" color="primary" onClick={this.handleWrite}>
                                            글 작성
                                        </Button>
                                    )
                                }
                            조회되는 글이 없습니다
                            </Fragment>
                        )
                    }
                    <PageBox>
                        {
                            1 === parseInt(CustomerState.currPage)
                            ?(
                                <FaChevronLeft className="move-btn disable"/>
                            )
                            :(
                                <FaChevronLeft className="move-btn" onClick={this.handleMovePrevPage}/>
                            )                            
                        }
                        <div className="text">페이지 이동</div>
                        {
                            CustomerState.maxPage === CustomerState.currPage
                            ?(
                                <FaChevronRight className="move-btn disable"/>
                            )
                            :(
                                <FaChevronRight className="move-btn" onClick={this.handleMoveNextPage}/>
                            )                            
                        }
                        
                    </PageBox>
                </Content>
                <Dimmed visible={modal.visible}/>
                <QuestionForm
                    visible={modal.visible} 
                    CustomerActions={CustomerActions}
                    reply={false}
                    id={AuthState.loginInfo.userId}
                    name={AuthState.loginInfo.userName}
                    history={this.props.history}/>
            </Wrapper>
        );
    }
}

export default connect(
    (state) => ({
        CustomerState : state.customer.toJS(),
        AuthState : state.authentication.toJS()
    }),
    (dispatch) => ({
        CustomerActions : bindActionCreators(customerActions,dispatch)
    })
)(CustomerQuestion);