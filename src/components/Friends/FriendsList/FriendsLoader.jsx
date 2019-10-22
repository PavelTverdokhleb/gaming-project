import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const FriendsLoader = (props) => {
    return (
        <div className="friends_loader">
            <CircularProgress />
        </div>

    );
};

export default FriendsLoader;