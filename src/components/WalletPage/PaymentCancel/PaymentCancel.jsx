import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import DefaultButton from '../../Buttons/DefaultButton/DefaultButton';

import {setWalletData} from "../../../actions/updateRedux";

import ArrowIcon from '@material-ui/icons/KeyboardArrowLeft';
import PaymentError from '../../../assets/image/payment_error.svg';
import PaypalIcon from '../../../assets/image/paypal.png';
import VisaMastercardIcon from '../../../assets/image/visa_mastercard.svg';

import './PaymentCancel.scss';


const PaymentCancel = ({wallet:{payment_cancel}, setWalletData, history}) => {
    if(payment_cancel === null) history.push('/admin/wallet');
    return (
        <div className="wallet_operations_wrapper">
            <Link to="/admin/wallet"><ArrowIcon/>Back to Gaming Stars</Link>
            <div className="payment_result_wrapper">
                <div className="payment_result_inner payment_cancel_wrapper">
                    <img src={PaymentError} alt="error"/>
                    <h4>Payment Failed!</h4>
                    <p>{payment_cancel}</p>
                    <Link
                        to="/admin/wallet"
                        onClick={() => setWalletData('payment_cancel', null)}
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentCancel);