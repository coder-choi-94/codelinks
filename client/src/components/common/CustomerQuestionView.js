import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as customerActions from '../../modules/customer';
import Progress from '../Progress';
import QuestionForm from './QuestionForm';

const Wrapper = styled.div`
    padding-top : 120px;
    width : 100%;
    height: 100%;
    margin : 0 auto;
    min-width : 768px;

    .btn {
        margin-top  : 1rem;
        float : right;
        overflow : hidden;
    }
`

const ButtonWrapper = styled.div`
    width : 70%;
    margin : 0 auto;
    display : flex;
    margin-bottom : 1rem;
`
const ProgressWrapper = styled.div`
    position : fixed;
    top : 0;left:0;right:0;bottom:0;
    width : 100%;
    height : 100%;
`

const Form = styled.div`
    width : 70%;
    margin : 0 auto;
    display : flex;
    flex-direction : column;
    background-color : #fbf9f9;
    border-radius : 3px;

    .title-box {
        width : 100%;
        padding : 1rem;
        border-bottom : 1px solid rgba(0,0,0,0.5);

        display : flex;
        justify-content : space-between;
        .title {
            font-size : 22px;
        }
        .sub-title {
            display : flex;
            align-items : flex-end;
            font-size : 15px;
            .name {
                margin-right : 1rem;
            }
        }
    }

    .content { 
        width : 100%;
        padding : 1rem;
    }
`

class CustomerQuestionView extends Component {
    componentDidMount() {
        const {CustomerActions} = this.props;
        const { bId } = this.props.match.params;
        CustomerActions.initializeQuestion();
        CustomerActions.getCustomerQuestionAction(bId);
    }

    handleShowReplyForm = () => {
        const {CustomerActions} = this.props;
        CustomerActions.openModal();
    }

    handleGoBack = () => {
        this.props.history.goBack();
    }
    
    render() {
        
        const {AuthState, CustomerState, CustomerActions} = this.props;
        const {
            fetching,
            result,
            question
        } = CustomerState.getCustomerQuestion;
        const {
            modal
        } = CustomerState;
        console.log(fetching, result, question);
        return (
            <Wrapper>
                {
                    result === 'SUCCESS'
                    &&(
                        <ButtonWrapper>
                            <Button className="back-btn" variant="contained" color="primary" onClick={this.handleGoBack}>목록으로</Button>       
                        </ButtonWrapper>
                    )
                }
                {
                    fetching
                    ?(
                        <ProgressWrapper>
                            <Progress/>
                        </ProgressWrapper>
                    ):(result === 'SUCCESS')
                    ? (
                        <Form>
                            <div className="title-box">
                                <div className="title">{question.bTitle}</div>
                                <div className="sub-title">
                                    <div className="name">{question.bName}님</div>
                                    <div className="date">{question.bDate.substring(0,10)}</div>
                                </div>
                            </div>
                            <div className="content">{question.bContent}</div>
                        </Form>
                    ): (
                        'ERROR'
                    )
                }
                {
                    (AuthState.loginInfo.userType === 'admin' && result=== 'SUCCESS')
                    &&(
                        <ButtonWrapper>
                            <Button
                                variant="contained"
                                color="primary"
                                className="btn"
                                onClick={this.handleShowReplyForm}>
                                    답변하기
                            </Button>
                        </ButtonWrapper>
                    )
                }
                <QuestionForm 
                    visible={modal.visible} 
                    CustomerActions={CustomerActions}
                    reply={true}
                    id={AuthState.loginInfo.userId}
                    name={AuthState.loginInfo.userName}
                    history={this.props.history}/>
            </Wrapper>
        );
    }
}

export default connect(
    (state) => ({
        AuthState : state.authentication.toJS(),
        CustomerState : state.customer.toJS()
    }),
    (dispatch) => ({
        CustomerActions : bindActionCreators(customerActions, dispatch)
    })
)(CustomerQuestionView);