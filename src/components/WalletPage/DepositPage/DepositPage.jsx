import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { PayPalButton } from "react-paypal-button-v2";
import CircularProgress from '@material-ui/core/CircularProgress';

import { postCreateDeposit, postExecuteDeposit } from "../../../actions/walletActions";
import { setWalletData } from "../../../actions/updateRedux";

import ArrowIcon from '@material-ui/icons/KeyboardArrowLeft';

import './DepositPage.scss';

class DepositPage extends Component {
    values = [5,10,15,25,50];

    state = {
        amount: 0,
        loading: false
    };

    setAmount = amount => {
        this.setState({amount});
    };

    render(){
        const { user:{user_info}, wallet:{balance}, history, setWalletData, postExecuteDeposit } = this.props;
        const { amount, loading } = this.state;
        return (
            <div className="wallet_operations_wrapper">
                {loading ? <div className="deposit_preload_wrapper"><CircularProgress size={80}/></div> : null}
                <Link to="/admin/wallet"><ArrowIcon/>Back to Gaming Stars</Link>
                <div className="wallet_operations_balance">
                    <h2>Balance: <span>€{balance.balance}</span></h2>
                </div>
                <div className="wallet_operations_content">
                    <h2>Deposit</h2>
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
                    <div className="payment_methods_wrapper">
                        <div className="payment_item_wrapper">
                            <div className="payment_button_container">
                                {amount !== 0 ?
                                    <PayPalButton
                                        amount={amount}
                                        options={{
                                            clientId: user_info.paypal,
                                            currency: 'EUR'
                                        }}
                                        catchError={(e) => console.log('catch error', e)}
                                        onButtonReady={() => console.log('button ready')}
                                        onError={(e) => console.log('on error', e)}
                                        createOrder={() => {
                                            const { postCreateDeposit } = this.props;
                                            return postCreateDeposit({amount}).then(res => {
                                                if(res.payload && res.payload.status === 200) {
                                                    return res.payload.data.token;
                                                }
                                            });
                                        }}
                                        onApprove={(details) => {
                                            this.setState({loading: true});
                                            postExecuteDeposit({paymentID: details.paymentID}).then(res => {
                                                if(res.payload && res.payload.status === 200) {
                                                    setWalletData('payment_success', res.payload.data.amount);
                                                    history.push('/admin/wallet/success-payment');
                                                }
                                            });
                                        }}
                                        onCancel={() => {
                                            console.log('paypal deposit popup closed');
                                        }}
                                        style={{
                                            color: 'silver',
                                            shape: 'pill',
                                            label: 'paypal',
                                            tagline: false,
                                            height: 45
                                        }}
                                    />
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({user, wallet}) => {
    return{
        user,
        wallet
    }
};

const mapDispatchToProps = {
    postCreateDeposit,
    postExecuteDeposit,
    setWalletData
};

export default connect(mapStateToProps, mapDispatchToProps)(DepositPage);