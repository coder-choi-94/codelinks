import React, { Component } from 'react';
import styled, {css} from 'styled-components';
import '../../styles/animation/zoomIn.css';
import '../../styles/animation/zoomOut.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as customerActions from '../../modules/customer';
import * as modalActions from '../../modules/modal';
import * as adminActions from '../../modules/admin';
import Dimmed from '../Dimmed';

const Wrapper = styled.div`
    position : fixed;
    top : 50%;
    left : 50%;
    transform : translate(-50%, -50%);
    transition : .2s all ease-in-out;
    z-index : 20;
`

const Form = styled.div`

    width : 600px;
    height : 600px;
    background-color : white;
    padding : 1rem;

    display : flex;
    flex-direction : column;

    .title {
        flex : 1;
        width : 100%;
        padding: 0 1rem;
        background-color : #FAFAFA;    
        margin-bottom : 40px;
        border : none;
        font-size : 20px;
        &:focus {
            outline : none;
        }
    }
    .content { 
        flex : 5;
        width : 100%;
        padding: 1rem;
        background-color : #F4F3F3;
        border : none;
        resize : none;
        font-size : 20px;
        &:focus {
            outline : none;
        }
    }
    .btn-row {
        padding-top : 1rem;
        display : flex;
        justify-content : flex-end;
        align-items : center;


        .submit-btn {
            padding: 10px;
            width: 100px;
            border : none;
            outline : none;
            color:white;
            font-weight : 600;
            background-color : #2cb06d;
            &:hover { 
                background-color : #53d794;
            }
            &:active { 
                background-color : #049d4f;
            }
        }
        .cancel-btn {
            padding: 10px;
            width: 100px;
            border : none;
            outline : none;
            margin-right : 1rem;
            color : white;
            font-weight : 600;
            background-color : #e43d6d;
            &:hover { 
                background-color : #f05f89;
            }
            &:active { 
                background-color : #c52654;
            }
        }
    }
`




class QuestionForm extends Component{
    wrapperRef = null;

    handleOnClose = () => {
        const {CustomerActions} = this.props;
        this.wrapperRef.classList.remove('zoonIn');
        this.wrapperRef.classList.add('zoomOut');
        setTimeout(() => {
            CustomerActions.closeModal();
        }, 200);
    }
    
    handleonSubmit = () => {
        
        const {AuthState, CustomerActions, CustomerState, ModalActions, reply, AdminActions} = this.props;
        const {
            userId : id,
            userName : name 
        } = AuthState.loginInfo;

        const {
            title,
            content
        } = CustomerState.modal;

        if(title === null || title === '' || content === null || content === '') {
            alert('모든 항목을 입력해 주세요.');
            return;
        }

        if(!reply) {
            CustomerActions
                .submitQuestionAction(id, name, title, content)
                .then(() => {
                    if(this.props.CustomerState.submitQuestion.result === 'SUCCESS') {
                        ModalActions.openModal({
                            title : '알림',
                            content : '문의 글이 정상적으로 등록되었습니다.'
                        });
                        const {CustomerActions, CustomerState} = this.props;
                        CustomerActions.getCustomerQuestionsAction(CustomerState.currPage);
                        CustomerActions.initializeQuestion();
                    } else {
                        ModalActions.openModal({
                            title : '알림',
                            content : '다시 시도해 주세요.'
                        });
                        const {CustomerActions, CustomerState} = this.props;
                        CustomerActions.getCustomerQuestionsAction(CustomerState.currPage);
                        CustomerActions.initializeQuestion();
                    }
                })

        } else {
            const {
                bLevel,
                bGroup
            } = CustomerState.getCustomerQuestion.question;
            AdminActions
                .replyQuestionAction({id, name, title, content, bLevel, bGroup})
                .then( (result)=> {
                    if(result) {
                        ModalActions.openModal({
                            title : '알림',
                            content : '답변이 정상적으로 등록되었습니다.'
                        });
                        CustomerActions.initializeQuestion();
                        this.props.history.goBack();
                    } else {
                        ModalActions.openModal({
                            title : '알림',
                            content : '다시 시도해 주세요.'
                        });
                    }
                })

        }
    }
    
     handleOnChange = (evt) => {
        const {name, value} = evt.target; 
        const {CustomerActions} = this.props;
        CustomerActions.changeQuestion({name, value});

    }

    render() {
        if(!this.props.visible)    return null;

        const {CustomerState, CustomerActions, AdminState} = this.props;
        const {
            fetching : submitQuestionFetching
        } = CustomerState.submitQuestion;
        const {
            fetching : replyQuestionFetching
        } = AdminState.replyQuestion;

        const dimmedVisible = submitQuestionFetching || replyQuestionFetching;
        return (
            <Wrapper className="animated zoomIn" ref={ref => this.wrapperRef = ref}>
                <Form>
                    <input type="text" className="title" placeholder="제목" name="title" value={CustomerState.modal.title} onChange={this.handleOnChange}/>
                    <textarea className="content" placeholder="내용" name="content" value={CustomerState.modal.content} onChange={this.handleOnChange}></textarea>
                    <div className="btn-row">
                        <button className="cancel-btn" onClick={this.handleOnClose}>취소</button>
                        <button className="submit-btn" onClick={this.handleonSubmit}>작성</button>
                    </div>
                </Form>
                <Dimmed visible={dimmedVisible} progress={dimmedVisible}/>
            </Wrapper>
        );
    }
}

export default connect(
    (state) => ({
        CustomerState : state.customer.toJS(),
        AuthState : state.authentication.toJS(),
        AdminState : state.admin.toJS()
    }),
    (dispatch) => ({
        CustomerActions : bindActionCreators(customerActions, dispatch),
        ModalActions : bindActionCreators(modalActions, dispatch),
        AdminActions : bindActionCreators(adminActions, dispatch)
    })
)(QuestionForm);