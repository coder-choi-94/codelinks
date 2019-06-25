import React, { Component } from 'react';
import styled from 'styled-components';
import '../styles/animation/zoomIn.css';

const Wrapper = styled.div`
    position : fixed;
    top : 50%;
    left : 50%;
    transform : translate(-50%, -50%);
    z-index : 50;
`

const Modal = styled.div`

    display : flex;
    flex-direction : column;
    border-radius : 10px;
    width : 450px;
    min-height : 200px;

    .title {
        flex: 1;
        border-top-right-radius : 10px;
        border-top-left-radius : 10px;
        padding : 5px 0;
        display : flex;
        align-items : center;
        justify-content : center;
        border-bottom : 1px solid white;
        background-color : pink;
        background : #97bdff;
        color : white;
        font-weight: 600;
    }

    .content {
        flex : 3;
        border-bottom-right-radius : 10px;
        border-bottom-left-radius : 10px;
        display : flex;
        align-items : center;
        justify-content : center;
        padding : 1rem;
        background-color : white;
    }
`

class MyAlert extends Component {

    render() {

        if(!this.props.visible) {
            return null;
        }

        return (
            <Wrapper>
                <Modal className="animated zoomIn">
                    <div className="title">{this.props.title}</div>
                    <div className="content">{this.props.content}</div>
                </Modal>
            </Wrapper>
        );
    }
}

export default MyAlert;