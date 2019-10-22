import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import CircleIcon from '@material-ui/icons/FiberManualRecord';

const FriendItem = ({username, avatar, is_online, id}) => {
    return (
        <Link
            className="friend_item"
            to={`/admin/friends/${id}`}
        >
            <Avatar
                classes={{
                    root: 'friends_list_avatar'
                }}
                src={avatar}
            />
            <span>{username}</span>
            <CircleIcon
                classes={{
                    root: is_online ? 'online' : 'offline'
                }}
            />
        </Link>
    );
};

export default FriendItem;