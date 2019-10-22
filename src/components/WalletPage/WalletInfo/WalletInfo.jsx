import React from 'react';
import { Link } from 'react-router-dom';
import DefaultButton from '../../Buttons/DefaultButton/DefaultButton';
import AuthButton from '../../Buttons/AuthButton/AuthButton';
import TransitionedBlock from '../../HelperComponents/TransitionedBlock/TransitionedBlock';

import QuestionIcon from '../../../assets/image/question.svg';

import './WalletInfo.scss';

const WalletInfo = ({balance, withdraw}) => {
    return (
        <TransitionedBlock classes="wallet_info">
            <div className="wallet_balance_info">
                <h4>Balance:</h4>
                <p className="balance_green">
                    {!isNaN(balance) ?
                        `€${balance}`
                        : null
                    }
                    </p>
                <Link to="/admin/wallet/deposit">
                    <DefaultButton
                        type="green"
                    >
                        Deposit
                    </DefaultButton>
                </Link>
                <span className="wallet_info_amount">Minimum deposit amount - €5</span>
            </div>
            <hr/>
            <div className="wallet_withdraw_info">
                <h4>Available to Withdraw:</h4>
                <p className="balance_white">
                    {!isNaN(withdraw) ?
                        `€${withdraw}`
                        : null
                    }
                    </p>
                <AuthButton
                    variant="outlined"
                    type="link"
                    to="/admin/wallet/withdraw"
                >
                    Withdraw
                </AuthButton>
                <span className="wallet_info_amount">Minimum withdrawal amount - €5</span>
            </div>
            <hr/>
            <div className="wallet_info_question_wrapper">
                <img src={QuestionIcon} alt="question"/>
                <p className="wallet_info_question">Deposited funds can be spent only for gaming operations on Gaming Stars.</p>
                <img src={QuestionIcon} alt="question"/>
                <p className="wallet_info_question">You can withdraw only those funds that were gained during games on Gaming Stars.</p>
            </div>
        </TransitionedBlock>
    );
};

export default WalletInfo;