import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from '../modules/authentication';

class LoginType extends Component {


    render() {
        const { inputData, handleChange } = this.props;
        const loginType = inputData.toJS().type;
        return (
            <div>
                <FormControl component="fieldset">
                    <RadioGroup
                        name="type"
                        value={loginType}
                        onChange={handleChange}
                        row
                        >
                        <FormControlLabel
                            value="member"
                            control={<Radio color="primary" />}
                            label="일반회원"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            value="counselor"
                            control={<Radio />}
                            label="상담원"
                            labelPlacement="end"
                        />
                    </RadioGroup>
                </FormControl>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        loginInfo : state.authentication.get('loginInfo'),  //로그인 상태 관련 state 가져오기
        inputData : state.authentication.get('inputData')   //로그인 입력 정보 가져오기
    }),
    (dispatch) => ({
        AuthActions : bindActionCreators(authActions, dispatch)
    })
)(LoginType);