import React, { Component, Fragment } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Loader from '../../components/HelperComponents/Loader/Loader';
import AppHead from '../../components/AppHead/AppHead';
import AppSidebar from '../../components/AppSidebar/AppSidebar';

import GameCenterContainer from '../GameCenterContainer/GameCenterContainer';
import ApproveFriend from '../../components/GameCenter/GameBlocks/ApproveFriend/ApproveFriend';
import ApproveRematch from '../../components/GameCenter/GameBlocks/ApproveRematch/ApproveRematch';

import Challenges from '../../components/Challenges/Challenges';

import Settings from '../../components/Settings/Settings';
import Profile from '../../components/Profile/Profile';
import Friends from '../../components/Friends/Friends';
import UserProfileDetail from '../../components/UserProfileDetail/UserProfileDetail';
import ChatPage from '../../components/ChatPage/ChatPage';
import Leaderboard from '../../components/Leaderboard/Leaderboard';
import DisputeList from '../../components/DisputeCenter/DisputeList/DisputeList';
import DisputeDetail from '../../components/DisputeCenter/DisputeDetail/DisputeDetail';
import InfoPage from '../../components/InfoPage/InfoPage';
import WalletPage from '../../components/WalletPage/WalletPage';
import DepositPage from '../../components/WalletPage/DepositPage/DepositPage';
import WithdrawPage from '../../components/WalletPage/WithdrawPage/WithdrawPage';
import PaymentCancel from '../../components/WalletPage/PaymentCancel/PaymentCancel';
import PaymentSuccess from '../../components/WalletPage/PaymentSuccess/PaymentSuccess';
import NotFound from '../../components/NotFound/NotFound';


import { getMyProfile } from "../../actions/userActions";

class Container extends Component {
    
    componentDidMount() {
        const { getMyProfile, history } = this.props;
        getMyProfile().then(res => {
            if(res.error && res.error.response && res.error.response.status && res.error.response.status === 401) {
                localStorage.clear();
                history.push('/auth');
            }
        });
    }
    
    render() {
        const { match, user:{ user_info }, history } = this.props;
        if(!localStorage.token) return <Redirect to="/auth" />;
        else if(!localStorage.intro) return <Redirect to="/get-started"/>;
        return (
            <Fragment>
                {!user_info.username ?
                    <Loader/>
                    :
                    <Fragment>
                        <AppHead
                            {...user_info}
                            history={history}
                        />
                        <AppSidebar/>
                        <main className="main_container">
                            <Switch>
                                <Route path={match.url} exact render={() => <Redirect to={`${match.url}/game-center`}/>} />

                                <Route path={`${match.url}/game-center`} component={GameCenterContainer} />
                                <Route path={`${match.url}/friend-request/:id`} exact component={ApproveFriend} />
                                <Route path={`${match.url}/rematch-request/:id`} exact component={ApproveRematch} />

                                <Route path={`${match.url}/challenges`} component={Challenges} />

                                <Route path={`${match.url}/settings`} component={Settings} />
                                <Route path={`${match.url}/profile`} component={Profile} />
                                <Route path={`${match.url}/friends`} exact component={Friends} />
                                <Route path={`${match.url}/friends/:id`} component={UserProfileDetail} />

                                <Route path={`${match.url}/messages`} component={ChatPage} />

                                <Route path={`${match.url}/wallet`} exact component={WalletPage} />
                                <Route path={`${match.url}/wallet/deposit`} exact component={DepositPage} />
                                <Route path={`${match.url}/wallet/withdraw`} exact component={WithdrawPage} />
                                <Route path={`${match.url}/wallet/cancel-payment`} exact component={PaymentCancel} />
                                <Route path={`${match.url}/wallet/success-payment`} exact component={PaymentSuccess} />
                                <Route path={`${match.url}/wallet/success-withdraw`} exact component={PaymentSuccess} />

                                <Route path={`${match.url}/leaderboard`} exact component={Leaderboard} />
                                <Route path={`${match.url}/leaderboard/:id`} component={UserProfileDetail} />

                                <Route path={`${match.url}/dispute-center`} exact component={DisputeList} />
                                <Route path={`${match.url}/dispute-center/:id`} component={DisputeDetail} />

                                <Route path={`${match.url}/info`} component={InfoPage} />

                                <Route component={NotFound} />
                            </Switch>
                        </main>
                    </Fragment>
                }
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getMyProfile
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
