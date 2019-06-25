import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import logo from '../images/codelink_logo1.png';
import {Link} from 'react-router-dom';
import oc from  'open-color';
import ArrowToDown from '@material-ui/icons/ArrowDropDown';

const Wrapper = styled.div`
    width : 100%;
    height : 80px;
    box-shadow : 0 2px 4px 0 rgba(0,0,0,.2);

    display : flex;
    justify-content : space-between;
    
    position : fixed;
    background-color : white;
    top : 0;
    z-index : 10;
    min-width : 1024px;
`;


const LeftMenu = styled.ul`
    display : flex;
    justify-content : space-around;
    align-items : center;
    width : 800px;
    color : #56718d;
    font-weight : 600;

    & a:hover {
        color : ${oc.gray[4]};
    }
    & a:active {
        color : ${oc.gray[6]};
    }
    

    .question { 
        position :relative;
        .question-box {
            position : absolute;
            top : 20px;
            left : 25%;
            height : 0;
            width : 130px;
            opacity : 0;
            display : flex;
            flex-direction : column;
            align-items: center;
            justify-content : center;
            padding : 1rem;
            background: white;
            box-shadow: 1px 1px 5px 0 rgba(0,0,0,0.3);

            transition : .25s all ease-in-out;
            overflow : hidden;
            &>* {
                font-size : 15px;
                padding : 10px 0;
            }
        }

        &:hover {
            cursor : pointer;
            .question-box {
                opacity : 1;
                height : 70px;

            }
        }
    }
`;

const RightMenu = styled.ul`
    display : flex;
    justify-content : space-around;
    align-items : center;
    width :300px;
    color : ${oc.gray[5]};
    font-size : 15px;
    font-weight : 600;

    &>a:hover {
        color : #50555a;
    }
    &>a:active {
        color : #0f1010;
    }

    .user-info-button {
        position : relative;
    }
    .user-info-button:hover {
        cursor : pointer;
        .user-info {
            height : 120px;
            opacity : 1;
        }
    }
    .username {
        color : #7e94ac;
        font-weight : 600;
    }
`;

const UserInfo = styled.div`
    position : absolute;
    left : 25%; top : 30px;
    width : 150px;
    height : 0;
    opacity : 0;
    background-color : white;

    display : flex;
    padding-top : 1rem;
    padding-right : 1rem;
    flex-direction : column;
    align-items : flex-end;
    border-bottom  : rgba(0, 0, 0, .2);
    box-shadow : 0 2px 4px 0 rgba(0,0,0,.2);
    overflow : hidden;

    transition : .25s all ease-in-out;


    .menu-item {
        font-size: 13px;
        color: #56718d;
        margin-bottom: 13px;
        display: inline-block;
    }

    .menu-item:hover {
        color : #1c4774;
    }
`;



class MemberHeader extends Component {
    
    render() {
        const {isLoggedIn, username, userType} = this.props;
        return (
            <Wrapper>
                <LeftMenu>
                    <Link to="/main"><li><img src={logo} alt="로고"/></li></Link>
                    {
                        (isLoggedIn && (userType === 'member'))
                        ? (
                            <Fragment>
                                <Link to="/main/notice/1"><li>{'공지사항'}</li></Link>
                                <Link to="/main/search/counselor"><li>상담사 찾기</li></Link>
                                <Link to="/main/search/schedule"><li>내 상담 현황</li></Link>
                                <Link to="/main/customer/question/1"><li>{'Q&A'}</li></Link>
                            </Fragment>
                        )
                        :(isLoggedIn && (userType === 'counselor'))
                        ? (
                            <Fragment>
                                <Link to="/main/notice/1"><li>{'공지사항'}</li></Link>
                                <Link to="/main/make/counseling"><li>상담 등록</li></Link>
                                <Link to="/main/status/reservation"><li>예약 현황</li></Link>
                                <Link to="/main/counseling"><li>상담 시작</li></Link>
                                <Link to="/main/customer/question/1"><li>{'Q&A'}</li></Link>
                            </Fragment>
                        )
                        : (
                            <Fragment>
                                <Link to="/main/notice/1"><li>{'공지사항'}</li></Link>
                                <Link to="/main/search/counselor"><li>상담사 찾기</li></Link>
                                <Link to="/main/customer/question/1"><li>{'Q&A'}</li></Link>
                                <div></div>
                            </Fragment>
                        )
                    }
                </LeftMenu>
                <RightMenu>
                    {
                        isLoggedIn
                        ? <li className="user-info-button">
                            <span className="username">{username}</span><span>님 안녕하세요</span>
                            <ArrowToDown style={{position : 'relative', top : '5px'}}/>
                            <UserInfo className="user-info">
                                <a href="/api/logout"><span className="menu-item">로그 아웃</span></a>
                                <Link to="#"><span className="menu-item">개인정보 수정</span></Link>
                                {
                                    userType === 'member' ? (
                                        <Link to="#"><span className="menu-item">포인트 충전</span></Link>
                                    ) : (
                                        <Link to="#"><span className="menu-item">미정...</span></Link>
                                    )
                                }
                                
                            </UserInfo>
                          </li>
                        : (
                            <Fragment>
                                <Link to="/authentication/signin"><li>로그인</li></Link>
                                <Link to="/authentication/signup"><li>회원가입</li></Link>
                            </Fragment>
                          )
                    }
                </RightMenu>
            </Wrapper>
        );
    }
}

export default MemberHeader;