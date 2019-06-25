import React, { Component } from 'react';
import styled from 'styled-components';
import logo from '../images/codelink_logo.png';
import {Link} from 'react-router-dom';

const Header = styled.div`
    height : 40%;
    background-color : #132651;

    display : flex;
    justify-content : center;
    align-items : center;
`;

const LogoHeader = ({link}) => {
    return (
        <Header>
            <Link to={"/main"}>
                <img className="logo" src={logo} alt={"logo"}/>
            </Link>
        </Header>
    );
    
}

export default LogoHeader;