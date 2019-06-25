import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as adminActions from '../../modules/admin';
import Progress from '../Progress';

const Wrapper = styled.div`
    padding-top : 100px;
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

class NoticeView extends Component {
    componentDidMount() {
        const {AdminActions} = this.props;
        const { seq } = this.props.match.params;
        AdminActions.getNoticeOneAction(seq);
    }


    handleGoBack = () => {
        this.props.history.goBack();
    }
    
    render() {
        
        const {AuthState, AdminState} = this.props;

        const {
            fetching,
            result,
            notice
        } = AdminState.getNoticeOne;


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
                                <div className="title">{notice.title}</div>
                                <div className="sub-title">
                                    <div className="date">{notice.created.substring(0,10)}</div>
                                </div>
                            </div>
                            <div className="content">{notice.content}</div>
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
                                className="btn">
                                    수정하기
                            </Button>
                        </ButtonWrapper>
                    )
                }
                {/* <QuestionForm 
                    visible={modal.visible} 
                    CustomerActions={CustomerActions}
                    reply={true}
                    id={AuthState.loginInfo.userId}
                    name={AuthState.loginInfo.userName}
                    history={this.props.history}/> */}
            </Wrapper>
        );
    }
}

export default connect(
    (state) => ({
        AdminState : state.admin.toJS(),
        AuthState : state.authentication.toJS()
    }),
    (dispatch) => ({
        AdminActions : bindActionCreators(adminActions, dispatch)
    })
)(NoticeView);