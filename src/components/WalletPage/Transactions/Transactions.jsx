import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import ScrollBar from '../../HelperComponents/ScrollBar/ScrollBar';
import Preloader from '../../HelperComponents/Preloader/Preloader';

import { getTransactions } from "../../../actions/walletActions";
import { setWalletData } from "../../../actions/updateRedux";
import { getTransactionIcon, isArray } from "../../../helpers/functions";

class Transactions extends Component {
    state = {
        activePage: 1
    };

    componentDidMount() {
        const { activePage } = this.state;
        this.getData(activePage);
    }

    componentWillUnmount() {
        const { setWalletData } = this.props;
        setWalletData('transactions', {results:[]});
    }

    getData = (page) => {
        const { getTransactions } = this.props;
        getTransactions(page);
    };

    onScroll = (e) => {
        const { data } = this.props;
        const { activePage } = this.state;
        if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight && data.next !== null) {
            this.getData(activePage + 1);
            this.setState(({activePage}) => ({activePage: activePage + 1}));
        }
    };


    render(){
        const { data } = this.props;
        console.log(data);
        if(!data.balance && data.balance !== 0) return <Preloader/>;
        return (
            <div className="wallet_table transactions_columns">
                <div className="wallet_table_header">
                    <div className="wallet_row">
                        <p>Date:</p>
                        <p>Type:</p>
                        <p>Description:</p>
                        <p>Status:</p>
                        <p>Amount:</p>
                    </div>
                </div>
                <div className="wallet_table_body">
                    <ScrollBar
                        maxHeight="calc(100vh - 520px)"
                        onScroll={this.onScroll}
                    >
                        <div className="table_body_inner">
                            {isArray(data.results) ?
                                data.results.map(({id, created_at, source_type, description, type, type_display, math_amount, amount, is_deposit, is_completed}) => {
                                    let statusClasses = "wallet_amount_status";
                                    if(is_completed && math_amount > 0) {
                                        statusClasses += " in_status";
                                    } else if(is_completed && math_amount < 0) {
                                        statusClasses += " out_status";
                                    }
                                    return (
                                        <div className="wallet_row" key={id}>
                                            <p>{moment(created_at).format("DD.MM.YY")}</p>
                                            <p className="wallet_type">{getTransactionIcon(type)}{type_display}</p>
                                            <p>{description}</p>
                                            <p>{is_completed ? 'Successful' : 'Pending'}</p>
                                            <p>
                                                <span className={statusClasses}>
                                                    {`${!is_completed ? '' : math_amount > 0 ? '+' : '-'} €${amount}`}
                                                </span>
                                            </p>
                                        </div>
                                    )
                                })
                                :
                                <div className="no_items">
                                    No items to show
                                </div>
                            }
                        </div>
                    </ScrollBar>
                </div>

            </div>
        );
    }
}

const mapDispatchToProps = {
    getTransactions,
    setWalletData
};

export default connect(null, mapDispatchToProps)(Transactions);