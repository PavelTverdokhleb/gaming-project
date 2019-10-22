import React, {Component} from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import SnackBar from '../../HelperComponents/SnackBar/SnackBar';
import AuthButton from '../../Buttons/AuthButton/AuthButton';
import RenderField from "../../HelperComponents/RenderField/RenderField";

import { postSupport } from "../../../actions/infoActions";

class Support extends Component {
    state = {
        success: false
    };

    submitForm = data => {
        const { postSupport, reset } = this.props;
        return postSupport(data).then(res => {
            if(res.payload && res.payload.status && res.payload.status === 201) {
                this.setState({success: true});
                reset('SupportForm');
            }
            else if(res.error) {
                throw new SubmissionError({...res.error.response.data});
            }
        });
    };

    closeSuccess = () => {
        this.setState({success: false});
    };
    
    render(){
        const { handleSubmit, submitting, pristine, valid } = this.props;
        const { success } = this.state;
        return (
            <div className="support_wrapper">
                <h2>Contact us</h2>
                <form onSubmit={handleSubmit(this.submitForm)}>
                    <Field name="name" type="text" component={RenderField} label="Your Name" />
                    <Field name="email" type="text" component={RenderField} label="Your Email" />
                    <Field name="text" type="text" component={RenderField} label="Enter your question here" multiline />
                    <AuthButton
                        variant="contained"
                        disabled={submitting || pristine || !valid}
                        formAction
                    >
                        SUBMIT
                    </AuthButton>
                </form>
                <SnackBar
                    open={success}
                    onClose={this.closeSuccess}
                    classes="success"
                >
                    Your message sent successfully
                </SnackBar>
            </div>
        );
    }
}

const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Required'
    } else if (values.name.length > 50) {
        errors.name = 'Must be less than 50 characters'
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(values.email)) {
        errors.email = 'Invalid email'
    }
    if (!values.text) {
        errors.text = 'Required'
    }  else if (values.text.length > 2000) {
        errors.text = 'Must be less than 2000 characters'
    }
    return errors
};

Support = reduxForm({
    form: 'SupportForm',
    enableReinitialize: true,
    validate
})(Support);

const mapStateToProps = (state) => {
    return{
        initialValues: {
           email: (state.user.user_info && state.user.user_info.email) || ''
        }
    }
};

const mapDispatchToProps = {
    postSupport
};

export default connect(mapStateToProps, mapDispatchToProps)(Support);