import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import ScrollBar from '../../HelperComponents/ScrollBar/ScrollBar';
import Preloader from '../../HelperComponents/Preloader/Preloader';

import { getWalletGames } from "../../../actions/walletActions";
import { setWalletData } from "../../../actions/updateRedux";
import { getGamesTransactionIcon, isArray } from "../../../helpers/functions";

class GamesTransactions extends Component {
    state = {
        activePage: 1
    };

    componentDidMount() {
        const { activePage } = this.state;
        this.getData(activePage);
    }

    componentWillUnmount() {
        const { setWalletData } = this.props;
        setWalletData('games', {results:[]});
    }

    getData = (page) => {
        const { getWalletGames } = this.props;
        getWalletGames(page);
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
        if(!data.balance && data.balance !== 0) return <Preloader/>;
        return (
            <div className="wallet_table game_transactions_columns">
                <div className="wallet_table_header">
                    <div className="wallet_row">
                        <p>Date:</p>
                        <p>Game:</p>
                        <p>Platform:</p>
                        <p>Match type:</p>
                        <p>Opponent:</p>
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
                                data.results.map(({id, game_end_date, short_name, platform, type_display, opponent, status_display, status, amount, math_amount}) => {
                                    let statusClasses = "";
                                    if(status !== null && math_amount > 0) {
                                        statusClasses += " in_status";
                                    } else if(status !== null && math_amount < 0) {
                                        statusClasses += " out_status";
                                    }
                                    return (
                                        <div className="wallet_row" key={id}>
                                            <p>{moment(game_end_date).format("DD.MM.YY")}</p>
                                            <p className="wallet_type">{getGamesTransactionIcon(status)}{short_name.toUpperCase()}</p>
                                            <p>{platform}</p>
                                            <p>{type_display}</p>
                                            <p>{opponent}</p>
                                            <p className={statusClasses}>{status_display}</p>
                                            <p>
                                                {amount !== null ?
                                                    <span className={`wallet_amount_status ${statusClasses}`}>
                                                        {`${status === 'draw' || status === null ? '' : math_amount > 0 ? '+' : '-' } €${amount}`}
                                                    </span>
                                                    : null
                                                }
                                            </p>
                                        </div>
                                    );
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
    getWalletGames,
    setWalletData
};

export default connect(null, mapDispatchToProps)(GamesTransactions);