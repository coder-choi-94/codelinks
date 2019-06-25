import React, {Component} from 'react';
import {FaAngleRight} from "react-icons/fa";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as counselingReducer from '../modules/counseling';
import styled from 'styled-components';
import oc from 'open-color';
import '../styles/animation/zoomIn.css';

//keyboard_arrow_right

const Wrapper = styled.div`
    .icon-right {
        position : absolute;
        font-size : 5rem;
        top : 50%;
        right : 25%;
        transform : translate(50%, -50%);
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

class NextButton extends Component {

    render() {
        const {show} = this.props;
        const handleNextButtonClick = this.props.onClick;

        if(!show) return null;
        return (
            <Wrapper>
                <FaAngleRight className="icon-right animated zoomIn" onClick={handleNextButtonClick}/>
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
)(NextButton);