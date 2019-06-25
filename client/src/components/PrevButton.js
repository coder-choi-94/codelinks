import React, {Component} from 'react';
import {FaAngleLeft} from "react-icons/fa";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as counselingReducer from '../modules/counseling';
import styled from 'styled-components';
import oc from 'open-color';

//keyboard_arrow_right

const Wrapper = styled.div`
    .icon-left {
        position : absolute;
        font-size : 5rem;
        top : 50%;
        left : 25%;
        transform : translate(-50%, -50%);
        transition : all .25s ease-out;
        color : #a0a0da;

        &:hover {
            color : #656575;
        }
        &:active {
            color : #7979bc;
        }
    }
`;

class PrevButton extends Component {

    render() {
        const {show} = this.props;
        const handlePrevButtonClick = this.props.onClick;

        if(!show) return null;
        return (
            <Wrapper>
                <FaAngleLeft className="icon-left animated zoomIn" onClick={handlePrevButtonClick}/>
            </Wrapper>
        );
    }
}

export default connect(
    (state) => ({
        CounselingState : state.counseling
    }),
    (dispatch) => ({
        CounselingReducer : bindActionCreators(counselingReducer, dispatch)
    })
)(PrevButton);