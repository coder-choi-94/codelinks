import React, { Component } from 'react';
import styled, {css} from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
import Calendar from 'react-calendar';
import {connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as counselorActions from '../../modules/counselor';
import * as authActions from '../../modules/authentication';
import * as customerActions from '../../modules/customer';
import Progress from '../Progress';
import Dimmed from '../Dimmed';
import MyAlert from '../MyAlert';
import {FaCalendarAlt} from 'react-icons/fa';

const RootWrapper = styled.div`
    padding-top : 80px;
    width : 100%;
    height : 100%;
    background : rgb(251, 251, 251);
`

const ContentWrapper = styled.div`
    max-width : 1200px;
    min-width : 768px;
    height : 100%;
    margin : 0 auto;
    background-color : white;
    padding : 1rem;

    &>.title {
        font-weight : 600;
        margin-top : 1rem;
        margin-bottom : 2rem;

        border-top: 1.5px solid #152852;
        border-bottom: 1.5px solid #152852;
        padding: 10px;
        color: #152852;

    }
`
const Content = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;

    .row {
        width : 70%;
        height : 150px;
        border : 1px solid rgba(0,0,0,0.5);
        box-shadow : 2px 2px 2px 0 rgba(0,0,0,0.3);
        margin-bottom : 1rem;
        display : flex;
        padding : 1rem;
        
        .profile {
            flex : 1;
            margin-right : 1rem;
            display : flex;
            justify-content : center;
            align-items : center;
            img {
                width : 125px;
                height : 125px;
                border-radius : 50%;
                border : 1px solid rgba(0,0,0,0.3);
            }
        }

        .text {
            flex : 3;
            flex-direction : column;
            .title {
                font-size : 20px;
                font-weight : 600;
                padding-bottom : 1rem;
                border-bottom : 1px solid rgba(0,0,0,0.5);
                margin-bottom : 1rem;
            }
            .content {
                display : flex;
                justify-content : space-between;
                align-items : center;
                .status {
                    font-size : 20px;
                    font-weight : 600;
                    color : #b0acac;
                }
                .date {
                    font-size : 12px;
                    color :#b0acac;
                }
            }
        }
    }

`




class CounselingStatus extends Component {
    
    componentDidMount() {
        const {
            CustomerActions,
            AuthState
        } = this.props;

        const memberSeq = AuthState.loginInfo.userSeq;

        CustomerActions.getReservationsAction(memberSeq);

    }
    
    render() {

        if(this.props.AuthState.loginInfo.userType !== 'member') {
            this.props.history.push('/main');
        }
        const {
            getReservations
        } = this.props.CustomerState;

        const {
            fetching,
            result,
            reservations
        } = getReservations;

        
        return (
            <div>
                <RootWrapper>      
                <ContentWrapper>
                    <div className="title">내 상담 내역</div>
                    <Content>
                        {
                            (!fetching && result === null)
                            ? (
                                ''
                            )
                            :(fetching)
                            ? (
                                <Progress/>
                            )
                            :(result === 'SUCCESS')
                            ? (
                                reservations.map(item => {
                                    return (
                                        <div className="row">
                                            <div className="profile">
                                                <img src={item.profile} alt="상담사 프로필"/>
                                            </div>
                                            <div className="text">
                                                <div className="title">{item.name} 상담사와 예약</div>
                                                <div className="content">
                                                    <span className="status">{!item.done ? "상담 전" : "상담 종료" }</span>
                                                    <span className="date">{`상담 일시 ${item.date.substring(0,10)} (${item.time})`}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            )
                            : (
                                '상담 내역 없음'
                            )

                        }
                    </Content>
                </ContentWrapper>
                {/* <Dimmed visible={modal.visible} onClick={this.props.CounselorActions.closeMyModal}/> */}
            </RootWrapper>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        ModalState : state.modal.toJS(),
        AuthState : state.authentication.toJS(),
        CustomerState : state.customer.toJS()
    }),
    (dispatch) => ({
        CustomerActions : bindActionCreators(customerActions, dispatch)
    })
)(CounselingStatus);