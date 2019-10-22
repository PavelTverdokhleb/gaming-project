import React, {Component} from 'react';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import RenderField from '../../HelperComponents/RenderField/RenderField';
import AuthButton from "../../Buttons/AuthButton/AuthButton";
import ResendButton from "../../Buttons/ResendButton/ResendButton";
import SnackBar from '../../HelperComponents/SnackBar/SnackBar';

import { postRegisterConfirm, postRecoveryConfirm, postResendCode, postFacebookEmailConfirm } from "../../../actions/authActions";

import SendIcon from '../../../assets/image/sended.svg';
import DoneIcon from '@material-ui/icons/Done';

class CodeConfirm extends Component {
    state = {
        loading: false,
        errorOpen: false,
        success: false,
        errorText: ''
    };

    componentWillMount() {
        const { history } = this.props;
        if(!sessionStorage.security_token || sessionStorage.security_token === 'undefined') {
            history.push('/auth');
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    submitForm = data => {
        const { postRegisterConfirm, postRecoveryConfirm, postFacebookEmailConfirm, history, location } = this.props;
        let obj = {
            security_token: sessionStorage.security_token,
            ...data
        };
        this.setState({loading: true});
        if(location.pathname.includes('password-recovery')) {
            return postRecoveryConfirm(obj).then(res => {
                if(res.payload && res.payload.status && res.payload.status === 200) {
                    sessionStorage.clear();
                    sessionStorage.security_token = res.payload.data.security_token;
                    history.push('/auth/password-recovery/set-new');
                } else {
                    this.setState({loading: false});
                    throw new SubmissionError({...res.error.response.data});
                }
            });
        } else if (location.pathname.includes('facebook')) {
            return postFacebookEmailConfirm(obj).then(res => {
                if(res.payload && res.payload.status && res.payload.status === 200) {
                    sessionStorage.clear();
                    localStorage.token = res.payload.data.token;
                    history.push('/admin');
                } else {
                    this.setState({loading: false});
                    throw new SubmissionError({...res.error.response.data});
                }
            });
        } else {
            return postRegisterConfirm(obj).then(res => {
                if(res.payload && res.payload.status && res.payload.status === 200) {
                    sessionStorage.clear();
                    localStorage.token = res.payload.data.token;
                    history.push('/get-started');
                } else {
                    this.setState({loading: false});
                    throw new SubmissionError({...res.error.response.data});
                }
            });
        }
    };

    resendCode = () => {
        const { postResendCode } = this.props;
        let obj = {
            security_token: sessionStorage.security_token
        };
        this.setState({errorOpen: false});
        return postResendCode(obj).then(res => {
            if(res.payload && res.payload.status && res.payload.status === 200) {
                this.setState({success: true});
                this.timeout = setTimeout(()=> {
                    this.setState({success: false});
                }, 4000);
            } else {
                this.setState({errorOpen: true, errorText: res.error.response.data.detail[0]});
            }
        });
    };

    closeError = () => {
        this.setState({errorOpen: false});
    };

    render(){
        const { handleSubmit, submitting, pristine, valid } = this.props;
        const { loading, errorOpen, errorText, success } = this.state;
        return (
            <main className="auth_container">
                <section className="auth_center">
                    <div className="auth_steps_box code_confirm_wrapper">
                        <img src={SendIcon} alt="send icon"/>
                        <h3 className="auth_title">Enter code</h3>
                        <p className="auth_subtitle">We've sent the code to your email, enter the<br/>code from the email here</p>
                        <form onSubmit={handleSubmit(this.submitForm)}>
                            <Field name="code" type="number" component={RenderField} label="Your Code" placeholder="XXXXXX"/>
                            <AuthButton
                                formAction
                                disabled={submitting || pristine || !valid}
                                loading={loading}
                            >
                                Submit
                            </AuthButton>
                            <div className="resend_wrapper">
                                <ResendButton
                                    onClick={this.resendCode}
                                >
                                    Re-send Code
                                </ResendButton>
                                {success ?
                                    <div className="success_resend">
                                        <DoneIcon/>
                                    </div>
                                    :
                                    null
                                }
                            </div>
                        </form>
                    </div>
                    <SnackBar
                        open={errorOpen && errorText !== ''}
                        onClose={this.closeError}
                        classes="error"
                    >
                        {errorText}
                    </SnackBar>
                </section>
            </main>
        );
    }
}

const validate = values => {
    const errors = {};
    if (!values.code) {
        errors.code = 'Required'
    }
    return errors
};

CodeConfirm = reduxForm({
    form: 'CodeConfirmForm',
    validate
})(CodeConfirm);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        postRegisterConfirm,
        postRecoveryConfirm,
        postFacebookEmailConfirm,
        postResendCode
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(CodeConfirm);