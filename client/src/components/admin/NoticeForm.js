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




class NoticeForm extends Component{
    wrapperRef = null;

    handleOnClose = () => {
        const {AdminActions} = this.props;
        this.wrapperRef.classList.remove('zoonIn');
        this.wrapperRef.classList.add('zoomOut');
        setTimeout(() => {
            AdminActions.closeNoticeForm();
        }, 200);
    }
    
    handleonSubmit = () => {
        
        const {AdminState, AuthState, AdminActions, ModalActions} = this.props;
        const {
            userId : writer
        } = AuthState.loginInfo;

        const {
            title,
            content
        } = AdminState.noticeForm;

        if(title === null || title === '' || content === null || content === '') {
            alert('모든 항목을 입력해 주세요.');
            return;
        }

        const data = {
            title,
            content,
            writer,
            date : new Date()
        };
        AdminActions
            .submitNoticeAction(data)
            .then(() => {
                if(this.props.AdminState.submitNotice.result === 'SUCCESS') {
                    ModalActions.openModal({title : '알림', content : '공지사항 등록 완료'});
                    AdminActions.getNoticeAction(parseInt(this.props.pageNum));
                } else {
                    ModalActions.openModal({title : '알림', content : '잠시 후 다시 시도해주세요'});
                }
            })

    }
    
     handleOnChange = (evt) => {
        const {name, value} = evt.target; 
        const {AdminActions} = this.props;
        AdminActions.onChangeNoticeForm({name, value});

    }

    render() {
        if(!this.props.visible)    return null;

        const { AdminState, AdminActions } = this.props;
        const {
            fetching,
            result
        } = AdminState.submitNotice;

        const dimmedVisible = fetching;
        return (
            <Wrapper className="animated zoomIn" ref={ref => this.wrapperRef = ref}>
                <Form>
                    <input type="text" className="title" placeholder="제목" name="title" value={AdminState.noticeForm.title} onChange={this.handleOnChange}/>
                    <textarea className="content" placeholder="내용" name="content" value={AdminState.noticeForm.content} onChange={this.handleOnChange}></textarea>
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
        AuthState : state.authentication.toJS(),
        AdminState : state.admin.toJS()
    }),
    (dispatch) => ({
        CustomerActions : bindActionCreators(customerActions, dispatch),
        ModalActions : bindActionCreators(modalActions, dispatch),
        AdminActions : bindActionCreators(adminActions, dispatch)
    })
)(NoticeForm);