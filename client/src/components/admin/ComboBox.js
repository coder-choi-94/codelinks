import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';


class ComboBox extends Component {
    handleChange = (evt) => {
        const {name, value} = evt.target;
        this.props.onChange({key : value});
    }
    render() {
        return (
            <FormControl>
                <InputLabel htmlFor="age-native-simple">검색</InputLabel>
                    <Select
                        native
                        value={this.props.value}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'key',
                            id: 'age-native-simple',
                        }}
                        >
                        <option value={"id"}>아이디</option>
                        <option value={"name"}>이름</option>
                    </Select>
          </FormControl>
        );
    }
}

export default ComboBox;