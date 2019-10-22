import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import TooltipMessage from '../../HelperComponents/TooltipMessage/TooltipMessage';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '../../../assets/image/dialog_close.svg';
import ErrorIcon from '@material-ui/icons/Error';

import './RenderField.scss';

const RenderField = ({ input, placeholder, type, id, label, autoFocus, symbol, disabled, multiline, change, meta: {touched, error}}) => {
    return (
        <TextField
            {...input}
            type={type}
            label={label}
            variant="filled"
            disabled={disabled}
            error={touched && !!error}
            placeholder={placeholder}
            autoComplete="off"
            autoFocus={autoFocus}
            multiline={multiline}
            rows="4"
            rowsMax="10"
            classes={{
                root: 'custom_input_wrapper'
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        {change && input.value.length > 0 ?
                            <IconButton
                                type="button"
                                classes={{
                                    root: 'field_clear_btn'
                                }}
                                onClick={() => change(input.name, '')}
                            >
                                <img src={CloseIcon} alt="close"/>
                            </IconButton>
                            : null
                        }
                        {touched && !!error ?
                            <TooltipMessage
                                text={error}
                                delay={200}
                                error
                            >
                                <ErrorIcon/>
                            </TooltipMessage>
                            : ''
                        }
                    </InputAdornment>
                ),
                classes: {
                    root: 'custom_input',
                    focused: 'custom_input_focused',
                    error: 'custom_input_error',
                    adornedEnd: 'custom_input_adorned',
                    multiline: 'custom_input_multiline'
                }
            }}
            InputLabelProps={{
                classes: {
                    root: 'custom_input_label',
                    focused: 'custom_input_label_focused',
                    shrink: 'custom_input_label_active',
                    error: 'custom_input_label_error'
                }
            }}
        />
    );

};

export default RenderField;