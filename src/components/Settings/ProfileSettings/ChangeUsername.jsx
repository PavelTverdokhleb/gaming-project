import React, {Component} from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import RenderField from "../../HelperComponents/RenderField/RenderField";
import AuthButton from '../../Buttons/AuthButton/AuthButton';

import { patchMyProfile } from "../../../actions/userActions";

class ChangeUsername extends Component {

    submitForm = data => {
        const { patchMyProfile, onClose, username } = this.props;
        if(data.username === username) {
            onClose();
        } else {
            return patchMyProfile(data).then(res => {
                if(res.payload && res.payload.status && res.payload.status === 200) {
                    onClose();
                } else {
                    throw new SubmissionError({...res.error.response.data});
                }
            });
        }
    };

    render(){
        const { handleSubmit, valid } = this.props;
        return (
            <form onSubmit={handleSubmit(this.submitForm)} className="flex-center-btw">
                <Field name="username" component={RenderField} label="New Username"/>
                <AuthButton
                    variant="outlined"
                    disabled={!valid}
                    formAction
                >
                    Save
                </AuthButton>
            </form>
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
    return errors
};


ChangeUsername = reduxForm({
    form: 'ChangeUsernameForm',
    enableReinitialize: true,
    validate
})(ChangeUsername);

function mapStateToProps(state, props) {
    return{
        initialValues: {
            username: props.username
        }
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        patchMyProfile
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeUsername);