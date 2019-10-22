import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckOff from '../../../assets/image/checkbox_off.png';
import CheckOn from '../../../assets/image/checkbox_on.png';
import './RenderCheckField.scss';

const RenderField = ({ input, label, disabled, meta: {touched, error} }) => {
    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={input.value}
                    onChange={input.onChange}
                    checkedIcon={<img src={CheckOn} alt="check on"/>}
                    icon={<img src={CheckOff} alt="check off"/>}
                    disabled={disabled}
                />
            }
            label={label}
            classes={{
                root: 'custom_check'
            }}
        />

    );

};

export default RenderField;