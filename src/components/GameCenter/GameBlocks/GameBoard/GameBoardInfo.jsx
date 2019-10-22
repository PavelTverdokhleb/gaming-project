import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ProfileInfo from '../../../Profile/ProfileInfo/ProfileInfo';
import UserConnectedConsoles from '../../../UserProfileDetail/UserConnectedConsole';
import HowToStart from './HowToStart';
import GameDetails from './GameDetails';
import GameRules from './GameRules';

class GameBoardInfo extends Component {
    state = {
        tab: 'opponent_details'
    };

    changeTab = (event, tab) => {
        this.setState({ tab });
    };

    render(){
        const { opponent, platform, game, bet, rules } = this.props;
        const { tab } = this.state;
        return (
            <div className="game_board_info_wrapper">
                <Tabs
                    value={tab}
                    onChange={this.changeTab}
                    classes={{
                        flexContainer: 'tabs_buttons_container'
                    }}
                >
                    <Tab
                        label="Opponent Details"
                        value="opponent_details"
                        classes={{
                            root: 'tab_wrapper',
                            selected: 'tab_selected'
                        }}
                    />
                    <Tab
                        label="Game Details"
                        value="game_details"
                        classes={{
                            root: 'tab_wrapper',
                            selected: 'tab_selected'
                        }}
                    />
                    <Tab
                        label="How to Start"
                        value="how_to_start"
                        classes={{
                            root: 'tab_wrapper',
                            selected: 'tab_selected'
                        }}
                    />
                    {rules !== null ?
                        <Tab
                            label="Game Rules"
                            value="game_rules"
                            classes={{
                                root: 'tab_wrapper',
                                selected: 'tab_selected'
                            }}
                        />
                        : null
                    }
                </Tabs>
                <div>
                    {tab === 'opponent_details' &&
                    <Fragment>
                        <ProfileInfo
                            {...opponent}
                            platforms={opponent.connected_platforms}
                            game
                        />
                        <hr className="profile_hr"/>
                        <div>
                            <p className="game_board_platform_label">Username in {platform.name}:</p>
                            <UserConnectedConsoles
                                platforms={[platform]}
                                game
                            />
                        </div>
                    </Fragment>
                    }
                    {tab === 'game_details' &&
                    <GameDetails
                        {...game}
                        bet={bet}
                        platform={platform}
                    />
                    }
                    {tab === 'how_to_start' && <HowToStart/>}
                    {tab === 'game_rules' && rules !== null ?
                        <GameRules
                            rules={rules}
                        />
                        : null
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return{
        // game_center: state.game_center
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        //login
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GameBoardInfo);