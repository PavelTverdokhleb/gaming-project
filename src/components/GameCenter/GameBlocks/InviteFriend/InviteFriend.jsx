import React, {Component} from 'react';
import {connect} from 'react-redux';
import TransitionedBlock from '../../../HelperComponents/TransitionedBlock/TransitionedBlock';
import DefaultButton from '../../../Buttons/DefaultButton/DefaultButton';
import AuthButton from '../../../Buttons/AuthButton/AuthButton';
import Avatar from '@material-ui/core/Avatar';
import PopperInfo from '../../../HelperComponents/PopperInfo/PopperInfo';

import { deleteInviteFriend, postInviteFriendForGame } from "../../../../actions/gameCenterActions";
import { getConsoleIcon, isArray } from "../../../../helpers/functions";

import './InviteFriend.scss';

class InviteFriend extends Component {
    state = {
        anchorEl: null,
        message: null
    };

    cancelInviteFriend = () => {
        const { deleteInviteFriend, history } = this.props;
        deleteInviteFriend().then(res => {
            if(res.payload && res.payload.status && res.payload.status === 204) {
                history.push('/admin/game-center');
            } else if (res.error && res.error.response && res.error.response.status && res.error.response.status === 400) {
                if(res.error.response.data.detail && res.error.response.data.detail[0] === 'invalid state') {
                    history.push('/admin/game-center');
                }
            }
        })
    };

    inviteFriendForGame = () => {
        const { postInviteFriendForGame, history } = this.props;
        postInviteFriendForGame().then(res => {
            if(res.payload && res.payload.status && res.payload.status === 201) {
                history.push('/admin/game-center/lobby');
            } else if (res.error && res.error.response && res.error.response.status && res.error.response.status === 400) {
                if(res.error.response.data.detail && res.error.response.data.detail[0] === 'invalid state') {
                    history.push('/admin/game-center');
                } else if (res.error.response.data.detail && res.error.response.data.detail[0]) {
                    this.setState({
                        anchorEl: document.getElementsByClassName('default_button_green')[0],
                        message: res.error.response.data.detail[0]
                    });
                }
            }
        })
    };

    clickAway = () => {
        this.setState({anchorEl: null});
    };

    render(){
        const { game_center: {friend} } = this.props;
        const { avatar, username, platforms } = friend;
        const { anchorEl, message } = this.state;
        return (
            <TransitionedBlock>
                <div className="block_center">
                    <div className="content_center invite_friend">
                        <div className="select_friend_top_block">
                            <h2 className="title">Challenge your friend</h2>
                            <div className="invite_friend_wrapper flex-center">
                                <Avatar
                                    classes={{
                                        root: 'invite_friend_avatar'
                                    }}
                                    src={avatar}
                                />
                                <div className="invite_friend_info">
                                    <p>{username}</p>
                                    <div>
                                        {isArray(platforms) ?
                                            platforms.map(el => getConsoleIcon(el.name.toLowerCase()))
                                            : null
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="opponent_need_add_friends">
                                <p>Add your opponent to your friends on your console in the next step.</p>
                            </div>
                        </div>
                        <div className="invite_friend_bottom_block">
                            <DefaultButton
                                type="green"
                                onClick={this.inviteFriendForGame}
                            >
                                SEND REQUEST
                            </DefaultButton>
                            <AuthButton
                                variant="outlined"
                                onClick={this.cancelInviteFriend}
                            >
                                Cancel
                            </AuthButton>
                        </div>
                    </div>
                    <PopperInfo
                        classes="instant_rematch_popper"
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        clickAway={this.clickAway}
                    >
                        {message}
                    </PopperInfo>
                </div>
            </TransitionedBlock>
        );
    }
}

const mapStateToProps = ({game_center}) => {
    return{
        game_center
    }
};

const mapDispatchToProps = {
    deleteInviteFriend,
    postInviteFriendForGame
};

export default connect(mapStateToProps, mapDispatchToProps)(InviteFriend);