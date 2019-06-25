import React, { Component } from 'react';
import TitleBar from '../../components/TitleBar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';
import GenderType from '../../components/GenderType';
import {connect} from 'react-redux';
import * as AuthReducers from '../../modules/authentication';
import { bindActionCreators } from 'redux';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import defaultProfile from '../../images/default-profile.jpg';

const Wrapper = styled.div`
    position : relative;
`;
const Box = styled.div`
    width : 770px;
    
    position : fixed;
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
        position : relative;
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

    .none {
        display : none;
    }
    
    .prev-image {
        width : 120px;
        height : 110px;
        border-radius : 50%;
    }

    /* .prev-image-title {
        position : absolute;
        right : 59px;
        bottom : -15px;
        font-size : 10px;
        font-weight : 600;

    }

    
    .btn-add-profile {
        position : absolute;
        color : #F50057;
        right : 180px;
        bottom : 0;
        &:hover {
            color : #C51162;
        }
    } */

    .row-wrapper {
        margin-top : 20px;
        margin-bottom : 20px;
        width : 400px;
        border : 1px solid black;
        display : flex;
        flex-direction : column;
        padding : 10px 20px;
        &>* {
            margin-bottom : 20px;
        }
    }

    .profile-row-wrapper {
        width : 400px;
        margin-top : 20px;
        margin-bottom : 20px;
        display : flex;
        flex-direction : column;
        align-items : center;
        justify-content : center;
        border : 1px solid black;
        padding : 20px;
        &>* {
            margin-bottom : 20px;
        }
    }
`;

class SignUpCounselor extends Component {

    prevImage = null;   //프로필 이미지 미리보기 ref
    profileRef = null;
    licenseRef = null;
    educationRef = null;

    handleProfileUploadClick = (evt) => {
        this.profileRef.click();
    }
    handleLicenseUploadClick = (evt) => {
        this.licenseRef.click();
    }
    handleEducationUploadClick = () => {
        this.educationRef.click();
    }
    handleSubmit = (evt) => {
        evt.preventDefault();

        // 모든 항목 검사
        const {
            id, pw1, pw2, name, phone, birth, gender,
            profile, licenseNo, licenseName, license, 
            degree, school, major, graduated, comment,
            educationName, profileName, licensePath, education
        } = this.props.inputData.toJS();
        if(id === '' || pw1 === '' || pw2 === '' || name === '' || phone === '' || birth === '' || gender === '' ||
           profile === '' || profileName ==='프로필 사진을 등록하세요' || licenseNo === '' || licenseName === '' || license === '' ||
           degree === '' || school === '' || major === '' || graduated === '' || comment === ''||
           educationName === '학력 증명서를 등록하세요' || licensePath === '대표 자격증을 등록하세요'){
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
            this.props.authReducers.modalOpen({title:'알림 메세지', content : '전화번호 : - 를 포함해서 입력해주세요\n( 예시 : 010-1234-1234 )'});
            return;
        }


        const data = {
            id,
            pw1,  
            name,
            phone,
            birth,
            gender : gender === '남' ? 1 : 2,
            profile,
            licenseNo,
            licenseName,
            license,
            degree,
            school,
            major,
            graduated,
            comment,
            education
        };

        const { counselorSignUpAction } = this.props.authReducers;

        counselorSignUpAction(data)
            .then(() => {
                const {result} = this.props.inputData.toJS();
                if(result === 'SUCCESS') {
                    this.props.history.push('/authentication/signin');
                    this.props.authReducers.modalOpen({title : '회원가입 완료', content : '회원가입을 축하드립니다!\n가입된 계정으로 로그인 해주세요.'});
                    this.props.authReducers.counselorSignupInitialize();
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

        this.props.authReducers.validateAction(id, "counselor")
            .then(() => {
                const {validate} = this.props.inputData.toJS();
                if(validate === true) {
                    this.props.authReducers.modalOpen({title : '알림 메세지', content: '사용 가능한 아이디입니다!'});
                } else {
                    this.props.authReducers.modalOpen({title : '알림 메세지', content: '중복되는 아이디입니다!'});
                }
            })
    }

    handleFileChange = (evt) => {
        const {authReducers} = this.props;
        const {name, value} = evt.target;

        if (name === 'license') {
            authReducers.counselorSignupInputChanged({name, value : evt.target.files[0]});    //setState
            if(evt.target.files && evt.target.files[0])   // 파일을 올렸을때
                authReducers.counselorSignupInputChanged({name : 'licensePath', value});    //setState
            else 
                authReducers.counselorSignupInputChanged({name : 'licensePath', value : '대표 자격증을 등록하세요'});    //setState
            return;
        }

        if(name === 'education') {
            authReducers.counselorSignupInputChanged({name, value : evt.target.files[0]});    //setState
            if(evt.target.files && evt.target.files[0])   // 파일을 올렸을때
                authReducers.counselorSignupInputChanged({name : 'educationName', value});    //setState
            else 
                authReducers.counselorSignupInputChanged({name : 'educationName', value : '학력 증명서를 등록하세요'});    //setState
            return;
        }

        if(name === 'profile') {
            //아래 소스는 프로필 미리보기를 위한 코드
            if(evt.target.files && evt.target.files[0]) {   // 파일을 올렸을 때 (파일이 변경되었는데 null이 아니라면 파일이 올렸을때 해당)

                //이미지 파일 유효성 검사
                if (value.split('.')[1] !== 'jpg' && 
                    value.split('.')[1] !== 'jpeg' && 
                    value.split('.')[1] !== 'gif' && 
                    value.split('.')[1] !== 'png' && 
                    value.split('.')[1] !== 'bmp') {
                    this.props.authReducers.modalOpen({title : '파일 형식 오류', content : '이미지 파일만 업로드 가능합니다.\n(jpg, gif, png, bmp)'});
                    return;
                }

                //파일 사이즈 검사
                if (evt.target.files[0].size > (1024 * 1024 * 5)) {
                    this.props.authReducers.modalOpen({title : '파일 사이즈 초과', content : '파일은 5MB를 초과할 수 없습니다.'});
                    return;
                }

                authReducers.counselorSignupInputChanged({name, value : evt.target.files[0]});    //setState
                authReducers.counselorSignupInputChanged({name : 'profileName', value});    //evt.target.value가 파일 이름
                var reader = new FileReader();  
                reader.onload = (e) => {            //아래 readAsDataURL 호출시 발생할 이벤트 정의
                    let path = e.target.result;
                    this.prevImage.src = path;  //prevImage 엘리먼트 ref 값을 준 prevImage 변수에서 src 값을 줌.
                    this.prevImage.style.display = 'inline-block';
                }
                reader.readAsDataURL(evt.target.files[0]);
            } else {
                authReducers.counselorSignupInputChanged({name, value : evt.target.files[0]});    //setState
                authReducers.counselorSignupInputChanged({name : 'profileName', value : "프로필 사진을 등록하세요"});    
                this.prevImage.src = `${defaultProfile}`;
            }
        }
    }


    handleChange = (evt) => {
        const {authReducers}= this.props;

        const {name, value} = evt.target;

        authReducers.counselorSignupInputChanged({name, value});

        if(name === 'pw2') {    //패스워드 일치 여부 검사
            const {pw1} = this.props.inputData.toJS();
            if(pw1 !== value) {
                this.props.authReducers.counselorWarningShow();
            } else {
                this.props.authReducers.counselorWarningHide();
            }
        } else if(name === 'pw1') {
            const {pw2} = this.props.inputData.toJS();
            if(pw2 !== value) {
                this.props.authReducers.counselorWarningShow();
            } else {
                this.props.authReducers.counselorWarningHide();
            }
        }

    }

    

    render() {
        const {handleSubmit, handleChange, handleValidate, handleProfileUploadClick, handleLicenseUploadClick, handleFileChange, handleEducationUploadClick} = this;
        const {id, pw1, pw2, name, phone, birth, gender, warningText, profileName, school, graduated, licenseName, licenseNo, degree, major, educationName, licensePath} = this.props.inputData.toJS();


        return (
            <Wrapper>
                <Box/>
                <TitleBar title="상담사 회원가입"/>
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
                    <div className="profile-row-wrapper">
                        <img src={defaultProfile} ref={ref => {this.prevImage = ref}} className="prev-image" alt="프로필 사진 미리보기"/>
                        <TextField label="프로필 사진" disabled={true} name='profileName' value={profileName}/>
                        <Button variant="contained" color="secondary"  onClick={handleProfileUploadClick} name="profileUploadBtn">프로필 첨부</Button>
                        <input type="file" name="profile" className="none" onChange={handleFileChange} ref={ref => {this.profileRef = ref}}/>
                    </div>
                    <div className="row-wrapper">
                        <TextField label="대표 자격증 번호" variant="standard" name="licenseNo" value={licenseNo} onChange={handleChange} style={{width : '200px'}}/>
                        <TextField label="대표 자격증 이름" variant="standard" name="licenseName" value={licenseName} onChange={handleChange} style={{width : '200px'}}/>
                        <input type="file" name="license" className="none" onChange={handleFileChange} ref={ref => {this.licenseRef = ref}}/>
                        <TextField label="대표 자격증" disabled={true} name='licensePath' value={licensePath}/>
                        <Button variant="contained" color="secondary"  onClick={handleLicenseUploadClick} name="licenseUploadBtn">자격증 첨부</Button>
                    </div>
                    <div className="row-wrapper">
                        <FormControl>
                            <InputLabel htmlFor="select-multiple">학위</InputLabel>
                            <Select
                                value={degree}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'degree'
                                }}
                                style={{width : '130px'}}
                                >
                                <MenuItem value={"전문학사"}>전문학사</MenuItem>
                                <MenuItem value={"학사"}>학사</MenuItem>
                                <MenuItem value={"전문석사"}>전문석사</MenuItem>
                                <MenuItem value={"석사"}>석사</MenuItem>
                                <MenuItem value={"전문박사"}>전문박사</MenuItem>
                                <MenuItem value={"박사"}>박사</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField label="학교" variant="standard" name="school" value={school} onChange={handleChange} style={{width : '300px'}}/>
                        <TextField label="전공" variant="standard" name="major" value={major} onChange={handleChange} style={{width : '300px'}}/>
                        <FormControl>
                            <InputLabel htmlFor="select-multiple">졸업 여부</InputLabel>
                            <Select
                                value={graduated}
                                onChange={this.handleChange}
                                style={{width : '130px'}}
                                inputProps={{
                                    name: 'graduated'
                                }}
                                >
                                <MenuItem value={"재학"}>재학</MenuItem>
                                <MenuItem value={"졸업"}>졸업</MenuItem>
                                <MenuItem value={"중퇴"}>중퇴</MenuItem>
                            </Select>
                        </FormControl>
                        <input type="file" name="education" className="none" onChange={handleFileChange} ref={ref => {this.educationRef = ref}}/>
                        <TextField label="학력 증명서" disabled={true} name='educationName' value={educationName}/>
                        <Button variant="contained" color="secondary"  onClick={handleEducationUploadClick} name="educationUploadBtn">학력 증명서 첨부</Button>
                    </div>
                    <div className="row">
                    <TextField  // 상담사 한마디
                        id="outlined-full-width"
                        label="프로필 한 마디 작성하기"
                        style={{ margin: 8, marginTop : 10}}
                        placeholder="엄마같은 마음으로 따뜻한 상담을 하겠습니다."
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        name="comment"
                        onChange={handleChange}
                        />
                    </div>
                    <Button variant="contained" color="primary" style={{minHeight : '80px'}} onClick={handleSubmit} styles={{marginBottom : '50px', minHeight : '50px'}}>회원 가입</Button>
                </FormWrapper>
            </Wrapper>
        );
    }
}

export default connect(
    (state) => ({
        inputData : state.authentication.getIn(['signupData', 'counselor']),
        licenseOfNum : state.authentication.get('licenseOfNum')
    }),
    (dispatch) => ({
        authReducers : bindActionCreators(AuthReducers, dispatch)
    })
)(SignUpCounselor);