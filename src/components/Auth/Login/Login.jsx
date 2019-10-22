import React, {Component} from 'react';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import RenderField from '../../HelperComponents/RenderField/RenderField';
import AuthButton from '../../Buttons/AuthButton/AuthButton';
import AuthSocials from '../AuthSocials/AuthSocials';
import AuthPromo from '../AuthPromo/AuthPromo';
import SnackBar from '../../HelperComponents/SnackBar/SnackBar';

import { postLogin } from "../../../actions/authActions";
import { updateIntro } from "../../../actions/updateRedux";

import LoginPromo from '../../../assets/image/login_promo.png';

class Login extends Component {
    state = {
        loading: false,
        errorOpen: false
    };

    componentWillMount() {
        localStorage.clear();
        sessionStorage.clear();
    }

    submitForm = data => {
        const { postLogin, updateIntro, history } = this.props;
        this.setState({loading: true, errorOpen: false});
        return postLogin(data).then(res => {
            if(res.payload && res.payload.status && res.payload.status === 200) {
                if(res.payload.data.security_token) {
                    sessionStorage.security_token = res.payload.data.security_token;
                    history.push('/auth/approve');
                } else {
                    const { token, ...rest } = res.payload.data;
                    localStorage.token = token;
                    updateIntro(rest);
                    if(!rest.intro_step_1_completed) {
                        history.push('/get-started');
                    } else if(rest.intro_step_1_completed && !rest.intro_step_2_completed) {
                        history.push('/get-started/credits');
                    } else {
                        history.push('/admin');
                    }
                }
            } else {
                this.setState({loading: false, errorOpen: res.error.response.data.detail});
                throw new SubmissionError({...res.error.response.data, _error: res.error.response.data.detail});
            }
        });
    };

    closeError = () => {
        this.setState({errorOpen: false});
    };

    render(){
        const { history, handleSubmit, submitting, pristine, valid, match, error } = this.props;
        const { loading, errorOpen } = this.state;
        return (
            <main className="auth_container">
                <AuthPromo
                    image={<img src={LoginPromo} alt="login promo"/>}
                    section="login"
                />
                <section className="auth_section">
                    <div className="round_inside_block"></div>
                    <div className="auth_section_block">
                        <h2 className="auth_title">Login</h2>
                        <p className="auth_subtitle">Welcome back, please login to your account</p>
                        <form onSubmit={handleSubmit(this.submitForm)}>
                            <Field name="email" type="text" component={RenderField} label="Your Email" />
                            <Field name="password" type="password" component={RenderField} label="Password" />
                            <div className="auth_login_options">
                                <Link
                                    className="auth_nav_link"
                                    to={`${match.url}/password-recovery`}
                                >
                                    Forgot Password
                                </Link>
                            </div>
                            <div className="auth_buttons_wrapper">
                                <AuthButton
                                    formAction
                                    disabled={submitting || pristine || !valid}
                                    loading={loading}
                                >
                                    Login
                                </AuthButton>
                                <AuthButton
                                    type="link"
                                    to={`${match.url}/register`}
                                    variant="outlined"
                                >
                                    Register
                                </AuthButton>
                            </div>
                        </form>
                        <AuthSocials
                            history={history}
                        />
                    </div>
                    <SnackBar
                        open={errorOpen && error !== undefined}
                        onClose={this.closeError}
                        classes="error"
                    >
                        {error}
                    </SnackBar>
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
    if (!values.password) {
        errors.password = 'Required'
    } else if (values.password.length < 8) {
        errors.password = 'Must be 8 characters or more'
    }
    return errors
};

Login = reduxForm({
    form: 'LoginForm',
    validate
})(Login);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        postLogin,
        updateIntro
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(Login);