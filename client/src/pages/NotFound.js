import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    font-size : 25px;
    font-weight : 600;
    padding : 100px;
    width : 100%;
    height : 100%;
    display : flex;
    justify-content : center;
    align-items : center;

`
class NotFound extends Component {
    render() {
        return (
            <Wrapper>
                요청하신 페이지를 찾을 수 없습니다.
            </Wrapper>
        );
    }
}

export default NotFound;