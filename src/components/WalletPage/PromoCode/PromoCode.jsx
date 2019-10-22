import React, {Component, Fragment} from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import RenderField from "../../HelperComponents/RenderField/RenderField";
import DefaultButton from '../../Buttons/DefaultButton/DefaultButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import TransitionedBlock from '../../HelperComponents/TransitionedBlock/TransitionedBlock';
import DialogComponent from '../../HelperComponents/DialogComponent/DialogComponent';

import { postUsePromocode } from "../../../actions/walletActions";
import { setWalletData } from "../../../actions/updateRedux";

import PromoIcon from '../../../assets/image/promo_gift.svg';

import './PromoCode.scss';

class PromoCode extends Component {
    state = {
        success: false,
        loading: false,
        open: false,
        message: null
    };

    componentWillUnmount() {
        const { setWalletData } = this.props;
        setWalletData('promocode_invitation', null);
    }

    submitForm = data => {
        const { postUsePromocode, setWalletData, balance:{withdraw} } = this.props;
        this.setState({loading: true});
        return postUsePromocode(data).then(res => {
            if(res.payload && res.payload.status === 201) {
                this.setState({success: true, open: true, message: res.payload.data.invitation_reward, loading: false});
                setWalletData('balance', {balance: res.payload.data.balance, withdraw});
            } else if(res.error && res.error.response.status === 400) {
                this.setState({loading: false, open: true});
                throw new SubmissionError({...res.error.response.data});
            }
        });
    };

    toggleDialog = () => {
        const { setWalletData } = this.props;
        const { success } = this.state;
        if(success) {
            setWalletData('promocode_invitation', false);
        }
        this.setState({open: false});
    };

    render(){
        const { handleSubmit, submitting, pristine, valid, promocode_invitation } = this.props;
        const { success, loading, open, message } = this.state;
        if(promocode_invitation === null) return (
            <div className="promo_code_wrapper promocode_disabled">
                <CircularProgress size={50}/>
            </div>
        );
        else if(promocode_invitation !== null && !promocode_invitation) return (
            <div className="promo_code_wrapper promocode_disabled">
                <img src={PromoIcon} alt="gift"/>
                <p>You’ve already claimed the<br/>invite code from a friend</p>
            </div>
        );
        return (
            <TransitionedBlock classes="promo_code_wrapper">
                <div className="promo_code_header">
                    <img src={PromoIcon} alt="gift"/>
                    <h4>Reedem promocode</h4>
                </div>
                <p>Enter your promo or friend invitation<br/>code to get your reward</p>
                <form onSubmit={handleSubmit(this.submitForm)} className="promo_code_form">
                    <Field name="invitation" type="text" component={RenderField} label="Promocode" />
                    <DefaultButton
                        type="green"
                        size="small"
                        loading={loading}
                        disabled={submitting || pristine || !valid}
                        formAction
                    >
                        Claim
                    </DefaultButton>
                </form>
                <DialogComponent
                    open={open}
                    onClose={this.toggleDialog}
                >
                    <div className="promocode_dialog_wrapper">
                        {success ?
                            <Fragment>
                                <h3>Invitation code has been<br/>applied to your account</h3>
                                <p>€{message}</p>
                                <Link to="/admin/game-center">
                                    <DefaultButton
                                        type="green"
                                        size="big"
                                    >
                                        Start a Game
                                    </DefaultButton>
                                </Link>
                            </Fragment>
                            :
                            <Fragment>
                                <h3 className="promocode_error_title">The code you entered is<br/>incorrect or is no longer valid</h3>
                                <DefaultButton
                                    type="green"
                                    size="big"
                                    onClick={this.toggleDialog}
                                >
                                    Ok
                                </DefaultButton>
                            </Fragment>
                        }
                    </div>
                </DialogComponent>
            </TransitionedBlock>
        );
    }
}

PromoCode = reduxForm({
    form: 'PromoCodeForm'
})(PromoCode);

const mapDispatchToProps = {
    postUsePromocode,
    setWalletData
};

export default connect(null, mapDispatchToProps)(PromoCode);