import React, {Component} from 'react';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import AppCircle from '../../AppBlocks/AppCircle/AppCircle';
import RenderField from '../../HelperComponents/RenderField/RenderField';
import AuthButton from "../../Buttons/AuthButton/AuthButton";
import SnackBar from '../../HelperComponents/SnackBar/SnackBar';

import { postChangePassword } from "../../../actions/userActions";

import PasswordIcon from '../../../assets/image/settings_password.svg';

class PasswordSettings extends Component {
    state = {
        success: false
    };

    submitForm = data => {
        const { postChangePassword, dispatch } = this.props;
        return postChangePassword(data).then(res => {
            if(res.payload && res.payload.status && res.payload.status === 200) {
                localStorage.token = res.payload.data.token;
                dispatch(reset('PasswordSettingsForm'));
                this.toggleSnack();
            } else {
                throw new SubmissionError({...res.error.response.data});
            }
        });
    };

    toggleSnack = () => {
        this.setState(({success}) => ({
            success: !success
        }));
    };

    render(){
        const { handleSubmit, submitting, pristine, valid } = this.props;
        const { success } = this.state;
        return (
            <div className="settings_content_block password_block">
                <AppCircle
                    image={PasswordIcon}
                />
                <div className="settings_form_wrapper">
                    <h3>Edit your Password</h3>
                    <p>Don't forget to save changes</p>
                    <form onSubmit={handleSubmit(this.submitForm)}>
                        <Field name="old_password" type="password" component={RenderField} label="Current Password" />
                        <Field name="new_password" type="password" component={RenderField} label="New Password" />
                        <Field name="repeat_new_password" type="password" component={RenderField} label="Retry Password" />
                        <div className="auth_buttons_wrapper">
                            <AuthButton
                                formAction
                                disabled={submitting || pristine || !valid}
                            >
                                Save new password
                            </AuthButton>
                        </div>
                    </form>
                </div>
                <SnackBar
                    open={success}
                    onClose={this.toggleSnack}
                    classes="success"
                >
                    Password successfully saved
                </SnackBar>
            </div>
        );
    }
}

const validate = values => {
    const errors = {};
    if (!values.old_password) {
        errors.old_password = 'Required'
    } else if (values.old_password.length < 8) {
        errors.old_password = 'Must be 8 characters or more'
    }
    if (!values.new_password) {
        errors.new_password = 'Required'
    } else if (values.new_password.length < 8) {
        errors.new_password = 'Must be 8 characters or more'
    }
    if (!values.repeat_new_password) {
        errors.repeat_new_password = 'Required'
    } else if (values.repeat_new_password.length < 8) {
        errors.repeat_new_password = 'Must be 8 characters or more'
    } else if (values.new_password !== values.repeat_new_password) {
        errors.repeat_new_password = 'Passwords do not match'
    }
    return errors
};


PasswordSettings = reduxForm({
    form: 'PasswordSettingsForm',
    validate
})(PasswordSettings);

function mapStateToProps(state) {
    return{
        //name: state.name,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        postChangePassword
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordSettings);