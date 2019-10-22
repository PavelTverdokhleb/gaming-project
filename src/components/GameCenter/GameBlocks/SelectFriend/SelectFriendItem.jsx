import React from 'react';
import Avatar from '@material-ui/core/Avatar';

import CircleIcon from '@material-ui/icons/FiberManualRecord';

const SelectFriendItem = ({id, avatar, username, is_online, in_lobby, selectFriend}) => (
    <div
        className="select_friend_item flex-center-btw"
        onClick={() => !in_lobby ? selectFriend(id) : null}
    >
        <div className="flex-center">
            <Avatar
                classes={{
                    root: 'select_friend_avatar'
                }}
                src={avatar}
            />
            <p>
                {username}
            </p>
            <CircleIcon
                classes={{
                    root: is_online ? 'online' : 'offline'
                }}
            />
        </div>
        <span>
             {in_lobby
                 ? 'IN GAME'
                 : null
             }
        </span>
    </div>
);

export default SelectFriendItem;