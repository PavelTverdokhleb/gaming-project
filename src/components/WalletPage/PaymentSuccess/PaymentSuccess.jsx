import React from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import DefaultButton from '../../Buttons/DefaultButton/DefaultButton';

import {setWalletData} from "../../../actions/updateRedux";

import ArrowIcon from '@material-ui/icons/KeyboardArrowLeft';
import PaymentSuccessIcon from '../../../assets/image/payment_success.svg';
import PaypalIcon from '../../../assets/image/paypal.png';
import VisaMastercardIcon from '../../../assets/image/visa_mastercard.svg';


const PaymentSuccess = ({wallet:{payment_success}, setWalletData, history, match}) => {
    let isPayment = match.url.includes('payment');
    if(payment_success === null) history.push('/admin/wallet');
    return (
        <div className="wallet_operations_wrapper">
            <Link to="/admin/wallet"><ArrowIcon/>Back to Gaming Stars</Link>
            <div className="payment_result_wrapper">
                <div className="payment_result_inner payment_success_wrapper">
                    <img src={PaymentSuccessIcon} alt="success"/>
                    <h4>{isPayment ? 'Payment Successful!' : <span>Withdraw<br/>Successful!</span>}</h4>
                    <p className="balance_green">€{payment_success}</p>
                    <p>{isPayment ? 'Deposited to your Gaming Stars Account' : <span>Withdrawed from your Gaming<br/>Stars Account</span>}</p>
                    <Link
                        to="/admin/wallet"
                        onClick={() => setWalletData('payment_success', null)}
                    >
                        <DefaultButton
                            type="green"
                        >
                            Go to your Wallet
                        </DefaultButton>
                    </Link>
                    <div className="payment_result_methods">
                        <img src={PaypalIcon} alt="paypal"/>
                        <img src={VisaMastercardIcon} alt="visa_mastercard"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({wallet}) => {
    return{
        wallet
    }
};

const mapDispatchToProps = {
    setWalletData
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSuccess);