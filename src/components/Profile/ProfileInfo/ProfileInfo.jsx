import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AuthButton from '../../Buttons/AuthButton/AuthButton';
import DefaultButton from '../../Buttons/DefaultButton/DefaultButton';
import IconButton from '@material-ui/core/IconButton';

import { getConnectedConsoles, convertPosition, convertMinutes } from "../../../helpers/functions";

import MessageIcon from '../../../assets/image/user_profile_message.svg';

import './ProfileInfo.scss';

function getButton({friend, friend_request, friend_request_sent_by_me, id}, addToFriends, loadingSend, acceptRequest, loadingAccept, massageLink, message_data) {
    if(friend !== undefined && friend) {
        return (
            <div className="flex-center">
                <AuthButton
                    variant="outlined"
                    type="link"
                    to={`/admin/game-center?friend=${id}`}
                >
                    Create Challenge
                </AuthButton>
                <IconButton
                    classes={{
                        root: 'btn_nav'
                    }}
                    onClick={() => massageLink(message_data)}
                >
                    <img src={MessageIcon} alt="message icon"/>
                </IconButton>
            </div>
        );
    } else if(!friend_request && friend_request_sent_by_me === null) {
        return (
            <DefaultButton
                type="green"
                onClick={addToFriends}
                loading={loadingSend}
            >
                Add to friends
            </DefaultButton>
        );
    } else if(friend_request && friend_request_sent_by_me) {
        return (
            <DefaultButton
                type="green"
            >
                Waiting for response...
            </DefaultButton>
        );
    } else if(friend_request && !friend_request_sent_by_me) {
        return (
            <DefaultButton
                type="green"
                onClick={acceptRequest}
                loading={loadingAccept}
            >
                ACCEPT
            </DefaultButton>
        );
    } else {
        return (
            <AuthButton
                variant="outlined"
                type="link"
                to="/admin/settings"
                classes="small_btn"
            >
                Account Settings
            </AuthButton>
        );
    }
}

const ProfileInfo = (
    {
        avatar,
        username,
        friend,
        friend_request,
        friend_request_sent_by_me,
        games_played,
        leaderboard_position,
        time_played,
        wins_count,
        losses_count,
        min_bet,
        max_bet,
        platforms,
        addToFriends,
        loadingSend,
        acceptRequest,
        loadingAccept,
        massageLink,
        is_online,
        user,
        game,
        id,
        room
    }) => {
    const statuses = {
        friend,
        friend_request,
        friend_request_sent_by_me,
        id
    };
    const message_data = {
        avatar,
        id,
        username,
        is_online,
        room_id: room
    };
    const showButton = username !== user && !game;
    return (
        <div className="profile_info_wrapper">
            <div className="profile_info_row">
                <div className="profile_info_main">
                    <Avatar
                        classes={{
                            root: 'profile_user_avatar'
                        }}
                        src={avatar}
                    />
                    <div className="profile_info_main_inner">
                        <div className="profile_title_wrapper">
                            <h4 className="profile_username">{username}</h4>
                            {getConnectedConsoles(platforms)}
                        </div>
                        <span className="profile_subtitle">{`${games_played} Games played`}</span>
                    </div>
                </div>
                {showButton
                    ? getButton(statuses, addToFriends, loadingSend, acceptRequest, loadingAccept, massageLink, message_data)
                    : null
                }
            </div>
            <div className="profile_info_row">
                <div className="profile_sub_info">
                    <span>In Leaderboard?</span>
                    <p>
                        {leaderboard_position !== null
                            ? convertPosition(leaderboard_position)
                            : '-'
                        }
                    </p>
                </div>
                <div className="profile_sub_info">
                    <span>Game Time</span>
                    <p>
                        {time_played !== null
                            ? convertMinutes(time_played)
                            : '-'
                        }
                    </p>
                </div>
                <div className="profile_sub_info">
                    <span>Win/Lost Rate:</span>
                    <p>{`${wins_count}/${losses_count}`}</p>
                </div>
                <div className="profile_sub_info">
                    <span>Stake Range:</span>
                    <p>
                        {min_bet === null || max_bet === null ?
                            '-'
                            :
                            `${min_bet}-${max_bet} €`
                        }
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;