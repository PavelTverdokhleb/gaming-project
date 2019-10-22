import React, {Component} from 'react';
import {connect} from 'react-redux';
import PromoCode from './PromoCode/PromoCode';
import WalletInfo from './WalletInfo/WalletInfo';
import Transactions from './Transactions/Transactions';
import GamesTransactions from './GamesTransactions/GamesTransactions';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TransitionedBlock from '../HelperComponents/TransitionedBlock/TransitionedBlock';
import Preloader from '../HelperComponents/Preloader/Preloader';

import './WalletPage.scss';

class WalletPage extends Component {
    state = {
        tab: 'transactions'
    };

    changeTab = (event, tab) => {
        this.setState({tab});
    };

    render(){
        const { wallet:{balance, transactions, games, promocode_invitation} } = this.props;
        const { tab } = this.state;
        console.log(balance);
        if(!balance.balance && balance.balance !== 0) return <Preloader/>;
        return (
            <TransitionedBlock classes="wallet_page_wrapper">
                <h2>Wallet</h2>
                <div className="wallet_page_top_block">
                    <WalletInfo {...balance} />
                    <PromoCode
                        promocode_invitation={promocode_invitation}
                        balance={balance}
                    />
                </div>
                <div className="wallet_page_bottom_block">
                    <Tabs
                        value={tab}
                        onChange={this.changeTab}
                        classes={{
                            root: 'tabs_wrapper',
                            flexContainer: 'tabs_buttons_container'
                        }}
                    >
                        <Tab
                            label="Transactions History"
                            value="transactions"
                            classes={{
                                root: 'tab_wrapper',
                                selected: 'tab_selected'
                            }}
                        />
                        <Tab
                            label="Match history"
                            value="match_history"
                            classes={{
                                root: 'tab_wrapper',
                                selected: 'tab_selected'
                            }}
                        />
                    </Tabs>
                    {tab === 'transactions' &&
                        <Transactions data={transactions}/>
                    }
                    {tab === 'match_history' &&
                        <GamesTransactions data={games}/>
                    }
                </div>
            </TransitionedBlock>
        );
    }
}

const mapStateToProps = ({wallet}) => {
    return{
        wallet
    }
};

const mapDispatchToProps = {
    // getTransactions
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletPage);