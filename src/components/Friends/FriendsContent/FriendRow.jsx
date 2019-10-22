import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';

const FriendRow = ({num, id, avatar, username, min_bet, max_bet, children, style}) => {
    return (
        <div className="friend_row" style={style}>
            <div className="friend_row_avatar">
                <span>#{num}</span>
                <Avatar
                    src={avatar}
                />
            </div>
            <div>
                <p>{username}</p>
            </div>
            <div>
                <p>
                    <span>Stake Range:&nbsp;</span>
                    {min_bet === null || max_bet === null ?
                        '-'
                        :
                        `${min_bet}-${max_bet} €`
                    }
                </p>
            </div>
            <div>
                <Link
                    to={`/admin/friends/${id}`}
                    className="profile_button"
                >
                    View Profile
                </Link>
            </div>
            {children}
        </div>
    );
};

export default FriendRow;