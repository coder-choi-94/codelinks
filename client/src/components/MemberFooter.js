import React, { Component } from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
    position : relative;
    bottom : 0; left : 0;
    width : 100%;
    height : 80px;
    box-shadow : 0 2px 4px 0 rgba(0,0,0,.2);
    background-color : black;

    display : flex;
    justify-content : center;
    align-items : center;
`;

class MemberFooter extends Component {
    render() {
        return (
            <Wrapper>
                
            </Wrapper>
        );
    }
}

export default MemberFooter;