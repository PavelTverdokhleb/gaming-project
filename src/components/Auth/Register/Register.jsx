import React, {Component} from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import RenderField from '../../HelperComponents/RenderField/RenderField';
import RenderCheckField from '../../HelperComponents/RenderCheckField/RenderCheckField';
import AuthButton from '../../Buttons/AuthButton/AuthButton';
import AuthSocials from '../AuthSocials/AuthSocials';
import IconButton from '@material-ui/core/IconButton';
import DialogComponent from '../../HelperComponents/DialogComponent/DialogComponent';
import AuthPromo from '../AuthPromo/AuthPromo';

import { postRegister } from "../../../actions/authActions";

import RegisterPromo from '../../../assets/image/register_promo.png';
import RegisterSuccessIcon from '../../../assets/image/register_success.svg';
import DialogClose from '../../../assets/image/dialog_close.svg';

import './Register.scss';

class Register extends Component {
    state = {
        loading: false,
        open: false
    };

    submitForm = data => {
        const { postRegister, history } = this.props;
        const { years_old, ...rest } = data;
        if(years_old) {
            this.setState({loading: true});
            return postRegister(rest).then(res => {
                if(res.payload && res.payload.status && res.payload.status === 200) {
                    sessionStorage.security_token = res.payload.data.security_token;
                    history.push('/auth/approve');
                } else {
                    this.setState({loading: false});
                    throw new SubmissionError({...res.error.response.data});
                }
            });
        }
    };

    toggleDialog = () => {
        this.setState(({open}) => ({
            open: !open
        }));
    };

    render(){
        const { history, handleSubmit, submitting, pristine, valid } = this.props;
        const { loading, open } = this.state;
        return (
            <main className="auth_container">
                <AuthPromo
                    image={<img src={RegisterPromo} alt="register promo"/>}
                    section="register"
                />
                <section className="auth_section">
                    <div className="round_inside_block"></div>
                    <div className="auth_section_block">
                        <h2 className="auth_title">Register</h2>
                        <p className="auth_subtitle">Please register using form, or social media</p>
                        <form onSubmit={handleSubmit(this.submitForm)}>
                            <Field name="username" type="text" component={RenderField} label="Your Username" />
                            <Field name="email" type="text" component={RenderField} label="Your Email" />
                            <Field name="password" type="password" component={RenderField} label="Password" />
                            <Field name="repeat_password" type="password" component={RenderField} label="Retry Password" />
                            <div className="auth_login_options">
                                <Field name="years_old" component={RenderCheckField} label={<span>I am at least 18 years old and accept the<br/>terms and conditions</span>} />
                            </div>
                            <div className="auth_buttons_wrapper">
                                <AuthButton
                                    formAction
                                    disabled={submitting || pristine || !valid}
                                    loading={loading}
                                >
                                    Sign Up
                                </AuthButton>
                                <AuthButton
                                    type="link"
                                    to={`/auth`}
                                    variant="outlined"
                                >
                                    Login
                                </AuthButton>
                            </div>
                        </form>
                        <AuthSocials
                            history={history}
                        />
                    </div>
                    <DialogComponent
                        open={open}
                        onClose={this.toggleDialog}
                    >
                        <IconButton
                            onClick={this.toggleDialog}
                            classes={{
                                root: 'dialog_close_button'
                            }}
                        >
                            <img src={DialogClose} alt="dialog close icon"/>
                        </IconButton>
                        <div className="registration_success">
                            <img src={RegisterSuccessIcon} alt="register success icon"/>
                            <h3>Thank you!</h3>
                            <p>Thank you for Registration. We send a confirmation code on your email</p>
                            <button>Re-send email</button>
                        </div>
                    </DialogComponent>
                </section>
            </main>
        );
    }
}

const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = 'Required'
    } else if (values.username.length < 3) {
        errors.username = 'Must be 3 characters or more'
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(values.email)) {
        errors.email = 'Invalid email'
    }
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
    if (!values.years_old) {
        errors.years_old = 'Required'
    }
    return errors
};

Register = reduxForm({
    form: 'RegisterForm',
    validate
})(Register);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        postRegister
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(Register);