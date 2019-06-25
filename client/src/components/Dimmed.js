import React, {Component} from 'react';
import styled from 'styled-components';
import Progress from './Progress';
import oc from 'open-color';


const StyledDimmed = styled.div`
    position: fixed;
    z-index: 20;
    left: 0;
    right: 0;
    bottom: 0;
    top : 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.3);
`

const Message = styled.div`
    position: relative;
    top: -60%;
    left: 50%;
    transform: translateX(-110px);
    
`

const Dimmed = ({visible, progress, onClick, zindex, msgVisible, msg}) => {
    if(!visible) {
        return null;
    }

    return (
        <StyledDimmed
            onClick={onClick}>
            {
                progress && <Progress/>
            }
            {
                msgVisible && <Message>{msg}</Message>
            }
        </StyledDimmed>
    );
}

export default Dimmed;