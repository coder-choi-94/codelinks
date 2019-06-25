import React, { Component } from 'react';
import TitleBar from '../../components/TitleBar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import GenderType from '../../components/GenderType';
import oc from 'open-color';
import {connect} from 'react-redux';
import * as AuthReducers from '../../modules/authentication';
import { bindActionCreators } from 'redux';

const Wrapper = styled.div`
    position : relative;
`;
const Box = styled.div`
    width : 770px;
    height : 850px;
    position : absolute;
    top : -50px; left : 0; right : 0; bottom : 0;
    margin : auto;
    z-index : -10;
    background-color : #efefef;
`;

const FormWrapper = styled.form`
    width : 500px;
    height : 700px;

    margin : 0 auto;
    margin-top : 4rem;
    display : flex;
    flex-direction : column;


    .row {
        display : flex;
        align-items : center;
        justify-content : space-between;
        margin-bottom : 1rem;
        Button {
            margin-left : 2rem;
        }
    }

    .warning-text {
        color : red;
        font-size : 12px;
        font-weight : 600;
    }
`;

class SignUpMember extends Component {

    handleSubmit = (evt) => {
        evt.preventDefault();

        // 모든 항목 검사
        const {id, pw1, pw2, name, phone, birth, gender} = this.props.inputData.toJS();
        if(id === '' || pw1 === '' || pw2 === '' || name === '' || phone === '' || birth === '' || gender === ''){
            this.props.authReducers.modalOpen({title:'알림 메세지', content : '모든 항목을 입력해 주세요!'});
            return;
        }

        //중복 확인 검사
        if(!this.props.inputData.toJS().validate){
            this.props.authReducers.modalOpen({title:'알림 메세지', content : '아이디 중복확인을 해주세요!'});
            return;
        }

        // 패스워드 일치 여부 검사
        if(pw1 !== pw2) {
            this.props.authReducers.modalOpen({title:'알림 메세지', content : '패스워드가 서로 다릅니다!'});
            return;
        }

        // 비밀번호 정규식 검사
        const regExpPw = /^[A-Za-z0-9]{6,20}$/;
        if(!regExpPw.test(pw1)) {
            this.props.authReducers.modalOpen({title:'알림 메세지', content : '비밀번호는 영문자와 숫자 조합으로 6~20자리여야 합니다.'});
            return;
        }

        // 이름 정규식 검사
        const regExpName = /^[가-힣]{2,5}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;
        if(!regExpName.test(name)) {
            this.props.authReducers.modalOpen({title:'알림 메세지', content : '올바른 이름을 입력해 주세요.'});
            return;
        }

        // 전화번호 정규식 검사
        var regExpPhone = /^\d{3}-\d{3,4}-\d{4}$/;
        if(!regExpPhone.test(phone)) {
            this.props.authReducers.modalOpen({title:'알림 메세지', content : '전화번호 : -를 포함해서 입력해주세요\n( 예시 : 010-1234-1234 )'});
            return;
        }


        const data = {
            id,
            pw1,  
            name,
            phone,
            birth,
            gender : gender === '남' ? 1 : 2
        };

        const { memberSignUpAction } = this.props.authReducers;

        memberSignUpAction(data)
            .then(() => {
                const {result} = this.props.inputData.toJS();
                if(result === 'SUCCESS') {
                    this.props.history.push('/authentication/signin');
                    this.props.authReducers.modalOpen({title : '회원가입 완료', content : '회원가입을 축하드립니다!\n가입된 계정으로 로그인 해주세요/'});
                    this.props.authReducers.memberSignupInitialize();
                } else {
                    this.props.authReducers.modalOpen({title : 'ERROR', content : '잠시 후, 다시 시도해 주세요.'});
                }
            });
    }

    handleValidate = () => {
        const {id} = this.props.inputData.toJS();

        if(id === '') {
            this.props.authReducers.modalOpen({title:'알림 메세지', content : '아이디를 입력해 주세요!'});
            return;
        }

        const regExpId = /^[A-Za-z0-9]{5,20}$/;
        if(!regExpId.test(id)) {
            this.props.authReducers.modalOpen({title:'알림 메세지', content : '아이디는 영문자와 숫자 조합으로 5~20자리여야 합니다.'});
            return;
        }

        this.props.authReducers.validateAction(id, 'member')
            .then(() => {
                const {validate} = this.props.inputData.toJS();
                if(validate === true) {
                    this.props.authReducers.modalOpen({title : '알림 메세지', content: '사용 가능한 아이디입니다!'});
                } else {
                    this.props.authReducers.modalOpen({title : '알림 메세지', content: '중복되는 아이디입니다!'});
                }
            })
    }

    handleChange = (evt) => {
        const {authReducers}= this.props;

        const {name, value} = evt.target;
        authReducers.memberSignupInputChanged({name, value});

        if(name === 'pw2') {    //패스워드 일치 여부 검사
            const {pw1} = this.props.inputData.toJS();
            if(pw1 !== value) {
                this.props.authReducers.memberWarningShow();
            } else {
                this.props.authReducers.memberWarningHide();
            }
        } else if(name === 'pw1') {
            const {pw2} = this.props.inputData.toJS();
            if(pw2 !== value) {
                this.props.authReducers.memberWarningShow();
            } else {
                this.props.authReducers.memberWarningHide();
            }
        }
    }

    render() {
        const {handleSubmit, handleChange, handleValidate} = this;
        const {id, pw1, pw2, name, phone, birth, gender, warningText} = this.props.inputData.toJS();
        

        return (
            <Wrapper>
                <Box/>
                <TitleBar title="일반 회원가입"/>
                <FormWrapper>
                    <div className="row">
                        <TextField label="아이디" variant="outlined" name='id' value={id} onChange={handleChange}/>
                        <Button variant="contained" color="secondary" onClick={handleValidate}>중복 확인</Button>
                    </div>
                    <div className="row">
                        <TextField label="비밀번호" variant="outlined" type="password" name="pw1" value={pw1} onChange={handleChange}/>
                    </div>
                    <div className="row">
                        <TextField label="비밀번호 확인" variant="outlined" type="password" name="pw2" value={pw2} onChange={handleChange}/>
                        {
                            warningText === 'SHOW' 
                            ? <span className="warning-text">비밀번호가 동일하지 않습니다.</span>
                            : null
                        }
                    </div>
                    <div className="row">
                        <TextField label="이름" variant="outlined" name="name" value={name} onChange={handleChange}/>
                    </div>
                    <div className="row">
                        <TextField label="전화번호" variant="outlined" name="phone" value={phone} onChange={handleChange}/>
                    </div>
                    <div className="row">
                        <TextField
                            label="생년월일"
                            type="date"
                            defaultValue={birth}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            name="birth"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="row">
                        <GenderType name="gender" value={gender} handleChange={handleChange}/>
                    </div>
                    <Button variant="contained" color="primary" style={{minHeight : '80px'}} onClick={handleSubmit}>회원 가입</Button>
                </FormWrapper>
            </Wrapper>
        );
    }
}

export default connect(
    (state) => ({
        inputData : state.authentication.getIn(['signupData', 'member'])
    }),
    (dispatch) => ({
        authReducers : bindActionCreators(AuthReducers, dispatch)
    })
)(SignUpMember);