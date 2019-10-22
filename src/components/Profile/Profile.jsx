import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import GameProfile from './GameProfile/GameProfile';
import LastPlayedGame from '../LastPlayedGame/LastPlayedGame';
import Preloader from '../HelperComponents/Preloader/Preloader';
import TransitionedBlock from '../HelperComponents/TransitionedBlock/TransitionedBlock';

import { getProfile, patchProfilePlatform } from "../../actions/profileActions";
import { postStartCreateGame } from "../../actions/gameCenterActions";
import { updateProfile } from "../../actions/updateRedux";

import './Profile.scss';

class Profile extends Component {
    state = {
        error: null
    };

    componentDidMount() {
        const { getProfile, profile:{ my_profile } } = this.props;
        if(!my_profile.username) {
            getProfile();
        }
    }

    rematch = () => {
        const { postStartCreateGame, history } = this.props;
        let obj = {
            type: "rematch"
        };
        postStartCreateGame(obj).then(res => {
            if(res.payload && res.payload.status && res.payload.status === 201) {
                history.push('/admin/game-center/lobby');
            } else if (res.error.response.data.detail && res.error.response.data.detail[0]) {
                this.setState({
                    error: res.error.response.data.detail[0]
                });
            }
        });
    };

    render(){
        const { profile:{ my_profile: { last_played_game, platforms, ...profile_info  } }, patchProfilePlatform, updateProfile } = this.props;
        const { error } = this.state;
        if(!profile_info.username) return <Preloader/>;
        return (
            <TransitionedBlock>
                <div className="profile_page_wrapper">
                    <div className="default_box settings_profile_info">
                        <ProfileInfo
                            status="my profile"
                            {...profile_info}
                            platforms={platforms}
                        />
                    </div>
                    <h3>Your Game Profiles</h3>
                    <div className="game_profiles_wrapper">
                        {platforms.map((item) => (
                            <GameProfile
                                key={item.id}
                                form={`${item.name}ProfileForm`}
                                patchPlatform={patchProfilePlatform}
                                updatePlatform={updateProfile}
                                {...item}
                            />
                        ))}
                    </div>
                    {last_played_game !== null ?
                        <Fragment>
                            <h3>Last Played Game:</h3>
                            <LastPlayedGame
                                {...last_played_game}
                                error={error}
                                rematch={this.rematch}
                            />
                        </Fragment>
                        : null
                    }
                </div>
            </TransitionedBlock>
        );
    }
}

function mapStateToProps(state) {
    return{
        profile: state.profile
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getProfile,
        patchProfilePlatform,
        updateProfile,
        postStartCreateGame
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);