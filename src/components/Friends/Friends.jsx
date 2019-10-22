import React from 'react';
import FriendsList from './FriendsList/FriendsList';
import FriendsContent from './FriendsContent/FriendsContent';
import './Friends.scss';

const Friends = ({history, location}) => {
    return (
        <div className="blocks_row_wrapper friends_wrapper">
            <FriendsList
                history={history}
                location={location}
            />
            <FriendsContent/>
        </div>
    );
};

export default Friends;