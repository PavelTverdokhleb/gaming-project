import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import ProfileInfo from '../Profile/ProfileInfo/ProfileInfo';
import Preloader from '../HelperComponents/Preloader/Preloader';
import TransitionedBlock from '../HelperComponents/TransitionedBlock/TransitionedBlock';
import UserConnectedConsole from './UserConnectedConsole';
import DialogComponent from '../HelperComponents/DialogComponent/DialogComponent';
import DefaultButton from '../Buttons/DefaultButton/DefaultButton';
import IconButton from '@material-ui/core/IconButton';
import NotFound from '../NotFound/NotFound';

import { isArray } from "../../helpers/functions";

import { getUserProfile } from "../../actions/profileActions";
import { postAddToFriends, deleteFriend, patchAcceptFriendRequest } from "../../actions/friendsActions";
import { selectChat } from "../../actions/chatActions";
import { updateUserProfile } from "../../actions/updateRedux";

import LockerImg from '../../assets/image/locked_profiles.svg';
import BackLinkImg from '../../assets/image/back_link.svg';
import CloseIcon from '@material-ui/icons/Close';

import './UserProfileDetail.scss';

class UserProfileDetail extends Component {
    state = {
        open: false,
        loadingSend: false,
        loadingAccept: false
    };

    componentDidMount() {
        const { getUserProfile, match:{params} } = this.props;
        if(!isNaN(params.id)) {
            getUserProfile(params.id);
        }
    }

    componentWillUnmount() {
        this.props.profile.user_profile = {};
    }

    addToFriends = () => {
        const { postAddToFriends, updateUserProfile, match:{params} } = this.props;
        let obj = {
            recipient: Number(params.id)
        };
        let update = {
            friend_request: true,
            friend_request_sent_by_me: true
        };
        this.setState({loadingSend: true});
        postAddToFriends(obj).then(res => {
            if(res.payload && res.payload.status && res.payload.status === 201) {
                updateUserProfile(update);
                this.setState({loadingSend: false});
            }
        });
    };

    getBackLink = (from) => {
        const { history } = this.props;
        switch (from) {
            case 'friends':
                return (
                    <span
                        className="back_link"
                        onClick={() => history.goBack()}
                    >
                        <img src={BackLinkImg} alt="back link"/>
                        Back to All Friends
                    </span>
                );
            case 'leaderboard':
                return (
                    <Link
                        className="back_link"
                        to="/admin/leaderboard"
                    >
                        <img src={BackLinkImg} alt="back link"/>
                        Back to Leaderboard
                    </Link>
                );
            default:
                return null;
        }
    };

    removeFromFriends = () => {
        const { deleteFriend, match:{params}, history } = this.props;
        deleteFriend(params.id).then(res => {
            if(res.payload && res.payload.status && res.payload.status === 204) {
                history.push('/admin/friends');
            }
        });
    };

    toggleDialog = () => {
        this.setState(({open}) => ({
            open: !open
        }));
    };

    massageLink = data => {
        const { selectChat, history } = this.props;
        selectChat(data);
        history.push('/admin/messages');
    };

    acceptRequest = () => {
        const { patchAcceptFriendRequest, updateUserProfile, profile:{user_profile} } = this.props;
        let obj = {
            accepted: true
        };
        let update = {
            friend: true
        };
        this.setState({loadingAccept: true});
        patchAcceptFriendRequest(user_profile.id, obj).then(() => {
            updateUserProfile(update);
            this.setState({loadingAccept: false});
        });
    };

    render(){
        const { profile:{user_profile, user_profile_error}, user:{ user_info }, match } = this.props;
        const { open, loadingSend, loadingAccept } = this.state;
        const from = match.url.split('/')[2];
        const isFriend = user_profile.friend;
        
        if(user_profile_error.detail || isNaN(match.params.id)) return <NotFound />;
        else if(!user_profile.username) return <Preloader/>;
        return (
            <TransitionedBlock>
                <div className="profile_detail_wrapper">
                    <section className="profile_detail_box profile_detail_info">
                        <div className="profile_detail_head">
                            {this.getBackLink(from)}
                            {isFriend ?
                                <button
                                    className="remove_user_btn"
                                    onClick={this.toggleDialog}
                                >
                                    Remove from friends
                                </button>
                                :
                                null
                            }
                        </div>
                        <hr className="profile_hr"/>
                        <ProfileInfo
                            {...user_profile}
                            addToFriends={this.addToFriends}
                            acceptRequest={this.acceptRequest}
                            massageLink={this.massageLink}
                            loadingSend={loadingSend}
                            loadingAccept={loadingAccept}
                            user={user_info.username}
                        />
                        <hr className="profile_hr"/>
                        <div className="profile_info_games">
                            <p>Games played:</p>
                            <div className="played_games_wrapper">
                                {isArray(user_profile.recently_played_games) ?
                                    user_profile.recently_played_games.map(({logo, name, platform}, i) => (
                                        <div className="recently_played_game" key={i}>
                                            <img src={logo} alt="game played"/>
                                            <p>{`${name} (${platform})`}</p>
                                        </div>
                                    ))
                                    :
                                    'No items'
                                }
                            </div>
                        </div>
                    </section>
                    <section className="profile_detail_box profile_connected_info">
                        <div className="profile_detail_head">
                            <h4>Connected Profiles:</h4>
                        </div>
                        <hr className="profile_hr"/>
                        {isFriend ?
                            <div className="unlocked_connected_profiles">
                                <p>Add your friend on all platforms to have quick access when making a game</p>
                                <UserConnectedConsole
                                    platforms={user_profile.platforms}
                                />
                            </div>

                            :
                            <div className="locked_connected_profiles">
                                <img src={LockerImg} alt="locker"/>
                                <p>
                                    To see this information, you<br/>have to be friends
                                </p>
                            </div>
                        }
                    </section>
                    <DialogComponent
                        open={open}
                        onClose={this.toggleDialog}
                    >
                        <div className="remove_friend_wrapper">
                            <h3>Are you Sure?</h3>
                            <div className="logout_buttons">
                                <DefaultButton
                                    type="red"
                                    size="small"
                                    onClick={this.removeFromFriends}
                                >
                                    YES
                                </DefaultButton>
                                <DefaultButton
                                    type="green"
                                    size="small"
                                    onClick={this.toggleDialog}
                                >
                                    NO
                                </DefaultButton>
                            </div>
                            <IconButton
                                classes={{
                                    root: 'dialog_close_btn'
                                }}
                                onClick={this.toggleDialog}
                            >
                                <CloseIcon/>
                            </IconButton>
                        </div>
                    </DialogComponent>
                </div>
            </TransitionedBlock>
        );
    }
}

function mapStateToProps(state) {
    return{
        profile: state.profile,
        user: state.user
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUserProfile,
        postAddToFriends,
        deleteFriend,
        updateUserProfile,
        patchAcceptFriendRequest,
        selectChat
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileDetail);