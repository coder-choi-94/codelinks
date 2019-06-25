import React, { Component } from 'react';
import styled from 'styled-components';
import TitleBar from '../../components/TitleBar';
import oc from 'open-color';
import Person from '@material-ui/icons/Person';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';

const SignUpWrapper = styled.div`
    margin-top : 4rem;
`;


const ButtonWrapper = styled.div`
    width : 700px;
    display : flex;
    align-items:center;
    justify-content : space-around;
    margin : 0 auto;
`;

const ButtonInner = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    padding : 2rem;
`;

const Title = styled.div`
    background-color : ${props => props.color};
    padding : 1rem;
    color : white;
    border-radius : 10px;
    width : 200px;

    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    
    font-weight : 600;

`;


class SignUp extends Component {
    render() {
        return (
            <SignUpWrapper>
                <ButtonWrapper>
                    <Link to="/authentication/signup/member">
                        <Button variant="contained" color={ "primary"} width="450px">
                            <ButtonInner>
                                <Person style={{fontSize : '100px'}}/>
                                <Title>일반 회원 가입</Title>
                            </ButtonInner>
                        </Button>
                    </Link>
                    <Link to="/authentication/signup/counselor">
                        <Button variant="contained" color={ "secondary"}>
                            <ButtonInner>
                                <Person style={{fontSize : '100px'}}/>
                                <Title>상담사 회원 가입</Title>
                            </ButtonInner>
                        </Button>
                    </Link>
                </ButtonWrapper>
            </SignUpWrapper>
        );
    }
}

export default SignUp;