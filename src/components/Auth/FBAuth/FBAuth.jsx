import React, {Component} from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import RenderField from '../../HelperComponents/RenderField/RenderField';
import AuthButton from "../../Buttons/AuthButton/AuthButton";

import { postFacebookEmail } from "../../../actions/authActions";

class FBAuth extends Component {
    state = {
        loading: false
    };

    submitForm = ({email}) => {
        const { postFacebookEmail, history } = this.props;
        let obj = {
            email: email,
            security_token: sessionStorage.security_token
        };
        this.setState({loading: true});
        return postFacebookEmail(obj).then(res => {
            if(res.payload && res.payload.status && res.payload.status === 200) {
                sessionStorage.security_token = res.payload.data.security_token;
                history.push('/auth/facebook/approve');
            } else {
                this.setState({loading: false});
                throw new SubmissionError({...res.error.response.data});
            }
        })
    };

    render(){
        const { handleSubmit, submitting, pristine, valid } = this.props;
        const { loading } = this.state;
        return (
            <main className="auth_container">
                <section className="auth_center">
                    <div className="auth_steps_box facebook-auth_wrapper">
                        <h3 className="auth_title">One more step:</h3>
                        <p className="auth_subtitle">Please enter your email here</p>
                        <form onSubmit={handleSubmit(this.submitForm)}>
                            <Field name="email" type="text" component={RenderField} label="Your email"/>
                            <AuthButton
                                formAction
                                disabled={submitting || pristine || !valid}
                                loading={loading}
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

FBAuth = reduxForm({
    form: 'FBAuthForm',
    validate
})(FBAuth);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        postFacebookEmail
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(FBAuth);