import React, {Component} from 'react';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import RenderField from '../../HelperComponents/RenderField/RenderField';
import AuthButton from "../../Buttons/AuthButton/AuthButton";

import { postRecoveryNewPassword } from "../../../actions/authActions";

import PasswordIcon from '../../../assets/image/new_password.svg';

class SetNewPassword extends Component {

    submitForm = (data) => {
        const { postRecoveryNewPassword, history } = this.props;
        let obj = {
            security_token: sessionStorage.security_token,
            ...data
        };
        return postRecoveryNewPassword(obj).then(res => {
            if(res.payload && res.payload.status && res.payload.status === 200) {
                sessionStorage.clear();
                localStorage.token = res.payload.data.token;
                history.push('/admin');
            } else {
                throw new SubmissionError({...res.error.response.data});
            }
        });
    };

    render(){
        const { handleSubmit, submitting, pristine, valid } = this.props;
        return (
            <main className="auth_container">
                <section className="auth_center">
                    <div className="auth_steps_box set_password_wrapper">
                        <img src={PasswordIcon} alt="password icon"/>
                        <h3 className="auth_title">New Password</h3>
                        <p className="auth_subtitle">Thank you for confirmation. Enter your<br/>new password</p>
                        <form onSubmit={handleSubmit(this.submitForm)}>
                            <Field name="password" type="password" component={RenderField} label="Password"/>
                            <Field name="repeat_password" type="password" component={RenderField} label="Retry Password"/>
                            <AuthButton
                                formAction
                                disabled={submitting || pristine || !valid}
                            >
                                Submit
                            </AuthButton>
                        </form>
                    </div>
                </section>
            </main>
        );
    }
}

const validate = values => {
    const errors = {};
    if (!values.password) {
        errors.password = 'Required'
    } else if (values.password.length < 8) {
        errors.password = 'Must be 8 characters or more'
    }
    if (!values.repeat_password) {
        errors.repeat_password = 'Required'
    } else if (values.repeat_password.length < 8) {
        errors.repeat_password = 'Must be 8 characters or more'
    } else if (values.password !== values.repeat_password) {
        errors.repeat_password = 'Passwords do not match'
    }
    return errors
};

SetNewPassword = reduxForm({
    form: 'SetNewPasswordForm',
    validate
})(SetNewPassword);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        postRecoveryNewPassword
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(SetNewPassword);