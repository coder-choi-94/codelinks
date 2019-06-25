import React, { Component } from 'react';
import LogoHeader from '../../components/LogoHeader';
import SignIn from './SignIn';
import SignInAdmin from './AdminSignIn';
import SignUp from './SignUp';
import SignUpMember from './SignUpMember';
import SignUpCounselor from './SignUpCounselor';
import Find from './Find';
import {Route, Link} from 'react-router-dom';
import styled from 'styled-components';
import AlertModal from '../../components/Alert';
import { connect } from 'react-redux';
import * as AuthReducers from '../../modules/authentication';
import { bindActionCreators } from 'redux';


const Container = styled.div`
    width : 100%;
    height : 100%;
`;

const RemoteButton = styled.div`
    border-radius: 10px;
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    width: 130px;
    height: 50px;
    font-size: 15px;
    line-height: 18px;
    text-align: center;
    font-weight: 600;
    border: none;
    background-color: #3f51b5;
    color: white;
    padding: 15px;


    &:hover {
        background-color: #2d2d99;
        color: white;
    }
    &:active {
        background-color: #6969b4;
        color: white;
    }
`

class Authentication extends Component {
    render() {
        const {match, location} = this.props;
        return (
            <Container>
                <LogoHeader link={location.pathname}/>
                <Route exact path={`${match.url}/signin`} component={SignIn}/>
                <Route exact path={`${match.url}/signin/admin`} component={SignInAdmin}/>
                <Route exact path={`${match.url}/signup`} component={SignUp}/>
                <Route exact path={`${match.url}/signup/member`} component={SignUpMember}/>
                <Route exact path={`${match.url}/signup/counselor`} component={SignUpCounselor}/>
                <Route exact path={`${match.url}/find`} component={Find}/>
                <AlertModal
                    onClose={this.props.authReducers.modalClose}
                    open={this.props.modal.toJS().open}
                    title={this.props.modal.toJS().title}
                    content={this.props.modal.toJS().content.split('\n').map((line,i) => {
                        return (<span key={i}>{line}<br/></span>);
                      })}
                      />
                <Link to="/main">
                    <RemoteButton>
                        메인 페이지로
                    </RemoteButton>
                </Link>
                
            </Container>
        );
    }
}

export default connect(
    (state) => ({
        modal : state.authentication.get('modal')
    }),
    (dispatch) => ({
        authReducers : bindActionCreators(AuthReducers, dispatch)
    })
)(Authentication);