import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import DefaultButton from '../../Buttons/DefaultButton/DefaultButton';

import { postCreateWithdraw } from "../../../actions/walletActions";
import { setWalletData } from "../../../actions/updateRedux";

import ArrowIcon from '@material-ui/icons/KeyboardArrowLeft';
import PaypalIcon from '../../../assets/image/paypal.png';
import VisaMastercardIcon from '../../../assets/image/visa_mastercard.svg';
import RenderField from "../../HelperComponents/RenderField/RenderField";

class WithdrawPage extends Component {
    values = [5,10,15,25,50];

    state = {
        amount: 0,
        loading: false
    };

    setAmount = amount => {
        this.setState({amount});
    };

    submitForm = ({email}) => {
        const { postCreateWithdraw, history, setWalletData } = this.props;
        const { amount } = this.state;
        let obj = {
            amount,
            email
        };
        this.setState({loading: true});
        postCreateWithdraw(obj).then(res => {
            if(res.payload && res.payload.status === 200) {
                setWalletData('payment_success', amount);
                history.push('/admin/wallet/success-withdraw');
            } else {
                this.setState({loading: false});
            }
        });
    };

    render(){
        const { wallet:{balance}, handleSubmit, submitting, pristine, valid } = this.props;
        const { amount, loading } = this.state;
        return (
            <div className="wallet_operations_wrapper">
                <Link to="/admin/wallet"><ArrowIcon/>Back to Gaming Stars</Link>
                <div className="wallet_operations_balance">
                    <h2>Balance: <span>€{balance.balance}</span></h2>
                </div>
                <div className="wallet_operations_content">
                    <h2>Withdraw</h2>
                    <p>Choose one of the following Amount</p>
                    <div className="wallet_operation_values">
                        {this.values.map((item, i) => (
                            <button
                                className={amount === item ? "active" : ""}
                                onClick={() => this.setAmount(item)}
                                key={i}
                            >
                                {`€${item}`}
                            </button>
                        ))}
                    </div>
                    <p>Enter the email connected to<br/>your PayPal account</p>
                    <div className="payment_methods_wrapper">
                        <form className="payment_item_wrapper" onSubmit={handleSubmit(this.submitForm)}>
                            <div className="withdraw_field">
                                <Field name="email" type="text" component={RenderField} label="Your Email Address" />
                                <img src={PaypalIcon} alt="paypal"/>
                                <img src={VisaMastercardIcon} alt="visa_mastercard"/>
                            </div>
                            {amount !== 0 ?
                                <div className="withdraw_button_container">
                                    <DefaultButton
                                        type="green"
                                        disabled={submitting || pristine || !valid}
                                        loading={loading}
                                        formAction
                                    >
                                        Withdraw Via PayPal
                                    </DefaultButton>
                                </div>
                                : null
                            }
                        </form>
                    </div>
                </div>
            </div>
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

WithdrawPage = reduxForm({
    form: 'WithdrawPageForm',
    validate
})(WithdrawPage);

const mapStateToProps = ({wallet}) => {
    return{
        wallet
    }
};

const mapDispatchToProps = {
    postCreateWithdraw,
    setWalletData
};

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawPage);