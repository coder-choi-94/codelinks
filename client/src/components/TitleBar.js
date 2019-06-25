import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const StyledTitleBar = styled.div`
    width : 450px;
    margin : 0 auto;
    margin-top : 1rem;
    margin-bottom : 1rem;
    padding : 1rem;
    text-align : center;

    /* background-color : #132651; */
    color : #132651;

    font-weight : 600;
    font-size : 30px;
    border-bottom : 3px solid #132651;
    border-top : 3px solid #132651;

    border-radius : 4px;

    &:hover {
        cursor : pointer;
    }
`;

const TitleBar = ({title, color}) => {
    return (
        <StyledTitleBar color={color}>
            {title}
        </StyledTitleBar>
    );
}

export default TitleBar;