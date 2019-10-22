import React from 'react';
import { connect } from 'react-redux';
import {Link, NavLink} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Badged from '../HelperComponents/Badged/Badged';

import AddIcon from '@material-ui/icons/Add';
import GameCenterImg from '../../assets/image/nav_gamecenter.svg';
import ChallengesImg from '../../assets/image/nav_challenges.svg';
import MessagesImg from '../../assets/image/nav_messages.svg';
import FriendsImg from '../../assets/image/nav_friends.svg';
import WalletImg from '../../assets/image/nav_wallet.svg';
import LeaderboardImg from '../../assets/image/nav_leaderboard.svg';
import SettingsImg from '../../assets/image/nav_settings.svg';

import './AppSidebar.scss';

const AppSidebar = (props) => {
    const {
        game_center = 0,
        messages = 0,
        friends = 0,
        wallet = 0,
        dispute_center = 0
    } = props.notifications.notifications_sections;
    const { balance } = props.wallet.balance;
    return (
        <aside className="sidebar_wrapper">
            <div className="balance_info_wrapper">
                <IconButton
                    component={Link}
                    to="/admin/wallet/deposit"
                    classes={{
                        root: 'add_points_button'
                    }}
                >
                    <div>
                        <AddIcon/>
                    </div>
                </IconButton>
                <div className="balance_info">
                    <span>
                        {!isNaN(balance) ?
                            `${balance} €`
                            :
                            null
                        }
                    </span>
                </div>
            </div>
            <nav>
                <Badged
                    content={game_center}
                    classes="sidebar_badge"
                >
                    <NavLink
                        to="/admin/game-center"
                        activeClassName="active"
                    >
                        <div className="nav_link_image">
                            <img src={GameCenterImg} alt="game center"/>
                        </div>
                        Game Center
                    </NavLink>
                </Badged>
                <NavLink
                    to="/admin/challenges"
                    activeClassName="active"
                >
                    <div className="nav_link_image">
                        <img src={ChallengesImg} alt="challenges"/>
                    </div>
                    Daily Challenges
                </NavLink>
                <Badged
                    content={messages}
                    classes="sidebar_badge"
                >
                    <NavLink
                        to="/admin/messages"
                        activeClassName="active"
                    >
                        <div className="nav_link_image">
                            <img src={MessagesImg} alt="messages"/>
                        </div>
                        Messages
                    </NavLink>
                </Badged>
                <Badged
                    content={friends}
                    classes="sidebar_badge"
                >
                    <NavLink
                        to="/admin/friends"
                        activeClassName="active"
                    >
                        <div className="nav_link_image">
                            <img src={FriendsImg} alt="friends"/>
                        </div>
                        Friends
                    </NavLink>
                </Badged>
                <Badged
                    content={wallet}
                    classes="sidebar_badge"
                >
                    <NavLink
                        to="/admin/wallet"
                        activeClassName="active"
                    >
                        <div className="nav_link_image">
                            <img src={WalletImg} alt="wallet"/>
                        </div>
                        Wallet
                    </NavLink>
                </Badged>
                <NavLink
                    to="/admin/leaderboard"
                    activeClassName="active"
                >
                    <div className="nav_link_image">
                        <img src={LeaderboardImg} alt="leaderboard"/>
                    </div>
                    Leaderboard
                </NavLink>
            </nav>
            <nav>
                <NavLink
                    to="/admin/settings"
                    activeClassName="active"
                >
                    <div className="nav_link_image">
                        <img src={SettingsImg} alt="settings"/>
                    </div>
                    Settings
                </NavLink>
                <Badged
                    content={dispute_center}
                    classes="sidebar_badge no_number"
                >
                    <NavLink
                        to="/admin/dispute-center"
                        activeClassName="active"
                    >
                        Dispute Center
                    </NavLink>
                </Badged>
                <NavLink
                    to="/admin/info"
                    activeClassName="active"
                >
                    FAQ & Support
                </NavLink>
            </nav>
        </aside>
    );
};

const mapStateToProps = ({notifications, wallet}) => {
    return {
        notifications,
        wallet
    }
};

export default connect(mapStateToProps)(AppSidebar);