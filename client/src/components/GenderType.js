import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

class GenderType extends Component {
    render() {
        const{name, value, handleChange} = this.props;
        return (
            <div>
                <FormControl component="fieldset">
                    <RadioGroup
                        name={name}
                        value={value}
                        onChange={handleChange}
                        row
                        >
                        <FormControlLabel
                            value="남"
                            control={<Radio color="primary" />}
                            label="남"
                            labelPlacement="end"
                            style={{marginRight : '4rem'}}
                        />
                        <FormControlLabel
                            value="여"
                            control={<Radio />}
                            label="여"
                            labelPlacement="end"
                        />
                    </RadioGroup>
                </FormControl>
            </div>
        );
    }
}

export default GenderType;