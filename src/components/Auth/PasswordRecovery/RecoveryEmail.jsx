import React, {Component} from 'react';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import RenderField from '../../HelperComponents/RenderField/RenderField';
import AuthButton from "../../Buttons/AuthButton/AuthButton";

import { postRecoveryEmail } from "../../../actions/authActions";

class RecoveryEmail extends Component {

    submitForm = data => {
        const { postRecoveryEmail, history } = this.props;
        return postRecoveryEmail(data).then(res => {
            if(res.payload && res.payload.status && res.payload.status === 200) {
                sessionStorage.security_token = res.payload.data.security_token;
                history.push('/auth/password-recovery/approve');
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
                    <div className="auth_steps_box recovery_first_step_wrapper">
                        <h3 className="auth_title">Forgot password?</h3>
                        <p className="auth_subtitle">We'll send the password recovery code<br/>to your email </p>
                        <form onSubmit={handleSubmit(this.submitForm)}>
                            <Field name="email" type="text" component={RenderField} label="Your email"/>
                            <AuthButton
                                formAction
                                disabled={submitting || pristine || !valid}
                            >
                                Submit
                            </AuthButton>
                            <Link
                                to="/auth"
                                className="auth_link"
                            >
                                Cancel
                            </Link>
                        </form>
                    </div>
                </section>
            </main>
        );
    }
}

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(values.email)) {
        errors.email = 'Invalid email'
    }
    return errors
};

RecoveryEmail = reduxForm({
    form: 'RecoveryEmailForm',
    validate
})(RecoveryEmail);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        postRecoveryEmail
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(RecoveryEmail);