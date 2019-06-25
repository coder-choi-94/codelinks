import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import logo from '../../images/codelink_logo.png';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../../modules/authentication';


const Wrapper = styled.div`
    display : flex;
    justify-content : center;
`;

const FormWrapper = styled.form`
    padding : 2rem;

    display : flex;
    flex-direction : column;

    Button {
        margin-top : 1rem;
    }
`;

class AdminSignIn extends Component {
    handleChange = (evt) => {
        const {AuthActions} = this.props;
        const{name, value} = evt.target;

        AuthActions.loginInputChanged({name, value});
    }
    handleLogin = () => {
        const {AuthActions, AuthState} = this.props;
        
        const loginData = {
            reqId : AuthState.inputData.id,
            reqPw : AuthState.inputData.pw,
            reqType : 'admin'
        }
        AuthActions
        .loginAction(loginData)
        .then(() => {
            if(this.props.AuthState.loginInfo.result === 'SUCCESS') {
                this.props.history.push('/admin');
            } else {    //에러 발생시
                let content = '';
                switch(this.props.AuthState.loginInfo.resultMessage) {
                    case 'PASSWORD IS NOT CORRECT':
                    content = '비밀번호가 올바르지 않습니다.'
                        break;
                    case 'ID IS NOT CORRECT':
                    content = '아이디가 올바르지 않습니다.'
                        break;
                    default:
                    break;
                }
                AuthActions.modalOpen({title:'알림 메세지', content});
                return;
            }
        });
    }

    handleKeyPress = (evt) => {
        if(evt.charCode === 13) {
            this.handleLogin();
        }
    }
    render() {
        const {AuthState} = this.props;
        return (
            <Wrapper>
                <FormWrapper>
                    <TextField label="관리자 아이디" name="id" onChange={this.handleChange} value={AuthState.inputData.id} onKeyPress={this.handleKeyPress}/>
                    <TextField label="관리자 비밀번호" name="pw" type="password" onChange={this.handleChange} value={AuthState.inputData.pw} onKeyPress={this.handleKeyPress}/>
                    <Button variant="contained" color="primary" onClick={this.handleLogin}>로그인</Button>
                </FormWrapper>
            </Wrapper>
        );
    }
}
export default connect(
    (state) => ({
        AuthState : state.authentication.toJS()
    }),
    (dispatch) => ({
        AuthActions : bindActionCreators(authActions, dispatch)
    })
)(AdminSignIn);
