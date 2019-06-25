import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import * as AuthReducers from '../../modules/authentication';
import { bindActionCreators } from 'redux';
import LoginType from '../../components/LoginType';
import Dimmed from '../../components/Dimmed';

const SignInWrapper = styled.div`
    /* margin-top : 2rem; */
    display : flex;
    justify-content : center;
`;

const Form = styled.form`
    .row {
        margin-top : 2rem;
    }
    .row:nth-child(3),
    .row:nth-child(4) {
        margin-top : 1rem;
    }

    .row:nth-child(3) > div > fieldset > div {
        width : 260px;
        display : flex;
        justify-content : space-between;
    }
    .row > * {
        width : 260px;
    }
`;

const LinkContainer = styled.div`
    display : flex;
    justify-content : space-between;

    font-size : 0.7rem;
    font-weight : 600;
    color : #132651;
`;

class SignIn extends Component {

    handleSubmit = (evt) => {
        evt.preventDefault();
        
        const { authReducers, inputData } = this.props;
        const { id, pw, type } = inputData.toJS();
        let content;
        if(id === '') {
            content = '아이디를 입력해 주세요.'
            this.props.authReducers.modalOpen({title:'알림 메세지', content});
            return;
        } else if(pw === '') {
            content = '비밀번호를 입력해 주세요.'
            this.props.authReducers.modalOpen({title:'알림 메세지', content});
            return;
        }

        const loginData = {
            reqId : id,
            reqPw : pw,
            reqType : type
        }
        return authReducers.loginAction(loginData)
                .then(() => {
                    if(this.props.loginInfo.toJS().result === 'SUCCESS') {
                        this.props.history.push('/main');
                        // if(type === 'member') {
                        //     this.props.history.push('/member/main');
                        // } else {
                        //     this.props.history.push('/counselor/main');
                        // }
                    } else {    //에러 발생시
                        console.log("@@@@@@@@@@@ : ", this.props.loginInfo.toJS().resultMessage);
                        switch(this.props.loginInfo.toJS().resultMessage) {
                            case 'PASSWORD IS NOT CORRECT':
                                content = '비밀번호가 올바르지 않습니다.'
                                break;
                            case 'ID IS NOT CORRECT':
                                content = '아이디가 올바르지 않습니다.'
                                break;
                            case 'NOT ALLOWED':
                                content = '가입 승인 심사중입니다.'
                                break;
                            default:
                            break;
                        }
                        this.props.authReducers.modalOpen({title:'알림 메세지', content});
                        return;
                    }
                });
    }

    handleInputChange = (evt) => {
        const { name, value } = evt.target;
        const { authReducers } = this.props;
        authReducers.loginInputChanged({name, value});
    }

    handleKeyPress = (evt) => {
        if(evt.charCode === 13) {
            this.handleSubmit(evt);
        }
    }


    render() {
        const { handleSubmit, handleInputChange, handleKeyPress } = this;
        const {id, pw, type} = this.props.inputData.toJS();
        const {fetching, result} = this.props.loginInfo.toJS();
        return (
            <SignInWrapper>
                <Form onSubmit={handleSubmit}>
                    <div className="row">
                        <TextField label="아이디" name="id" value={id} onChange={handleInputChange} onKeyPress={handleKeyPress}/>
                    </div>
                    <div className="row">
                        <TextField label="비밀번호" name="pw" type="password" value={pw} onChange={handleInputChange} onKeyPress={handleKeyPress}/>
                    </div>
                    <div className="row">
                        <LoginType handleChange={handleInputChange}/>
                    </div>
                    <div className="row">
                        <Button variant="contained" onClick={handleSubmit} color={type === "member" ? "primary" : "secondary"}>로그인</Button>
                    </div>
                    <div className="row">
                        <LinkContainer>
                            <Link to="/authentication/find">아이디/비밀번호 찾기</Link>
                            <Link to="/authentication/signup">회원 가입</Link>
                        </LinkContainer>
                    </div>
                </Form>
                <Dimmed visible={fetching} progress={true}/>
            </SignInWrapper>
        );
    }
}
export default connect(
    (state) => ({
        loginInfo : state.authentication.get('loginInfo'),  //로그인 상태 관련 state 가져오기
        inputData : state.authentication.get('inputData')   //로그인 입력 정보 가져오기
    }),
    (dispatch) => ({
        authReducers : bindActionCreators(AuthReducers, dispatch)
    })
)(SignIn);