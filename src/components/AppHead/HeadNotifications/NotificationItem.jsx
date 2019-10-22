import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';

const getNotifContent = (item) => {
    const {
        action,
        emoji,
        text,
        timestamp,
        item_id,
        id,
        close,
        remove
    } = item;
    let time = moment(timestamp * 1000).fromNow();
    switch (action) {
        case 'friend_game':
            return (
                <div className="head_notification_item">
                    <div className="notification_emoji">
                        {emoji}
                    </div>
                    <div className="notification_item_title">
                        <div>
                            <h5>{text}</h5>
                            <Link
                                to={`/admin/friend-request/${item_id}`}
                                className="notif_sub_link"
                                onClick={() => {
                                    remove(id);
                                    close();
                                }}
                            >
                                View details
                            </Link>
                        </div>
                        <span>{time}</span>
                    </div>
                </div>
            );
        case 'rematch':
            return (
                <div className="head_notification_item">
                    <div className="notification_emoji">
                        {emoji}
                    </div>
                    <div className="notification_item_title">
                        <div>
                            <h5>{text}</h5>
                            <Link
                                to={`/admin/rematch-request/${item_id}`}
                                className="notif_sub_link"
                                onClick={() => {
                                    remove(id);
                                    close();
                                }}
                            >
                                View details
                            </Link>
                        </div>
                        <span>{time}</span>
                    </div>
                </div>
            );
        case 'friends':
            return (
                <Link
                    className="head_notification_item"
                    to="/admin/friends"
                    onClick={() => close()}
                >
                    <div className="notification_emoji">
                        {emoji}
                    </div>
                    <div className="notification_item_title">
                        <h5>{text}</h5>
                        <span>{time}</span>
                    </div>
                </Link>
            );
        case 'wallet':
            return (
                <Link
                    className="head_notification_item"
                    to="/admin/wallet"
                    onClick={() => {
                        remove(id);
                        close();
                    }}
                >
                    <div className="notification_emoji">
                        {emoji}
                    </div>
                    <div className="notification_item_title">
                        <h5>{text}</h5>
                        <span>{time}</span>
                    </div>
                </Link>
            );
        case "dispute":
            return (
                <div className="head_notification_item">
                    <div className="notification_emoji">
                        {emoji}
                    </div>
                    <div className="notification_item_title">
                        <div>
                            <h5>{text}</h5>
                            <Link
                                to={`/admin/dispute-center/${item_id}`}
                                className="notif_sub_link"
                                onClick={() => {
                                    remove(id);
                                    close();
                                }}
                            >
                                View the dispute
                            </Link>
                        </div>
                        <span>{time}</span>
                    </div>
                </div>
            );
        case 'lobby':
            if(text.includes('submit the results')) {
                return (
                    <div className="head_notification_item">
                        <div className="notification_emoji">
                            {emoji}
                        </div>
                        <div className="notification_item_title">
                            <div>
                                <h5>{text}</h5>
                                <Link
                                    to={`/admin/game-center/lobby`}
                                    className="notif_sub_link"
                                    onClick={() => {
                                        close();
                                    }}
                                >
                                    Submit the results
                                </Link>
                            </div>
                            <span>{time}</span>
                        </div>
                    </div>
                )
            } else {
                return (
                    <Link
                        className="head_notification_item"
                        to="/admin/game-center/lobby"
                        onClick={() => {
                            close();
                        }}
                    >
                        <div className="notification_emoji">
                            {emoji}
                        </div>
                        <div className="notification_item_title">
                            <div>
                                <h5>{text}</h5>
                            </div>
                            <span>{time}</span>
                        </div>
                    </Link>
                )
            }
        default:
            return (
                <div className="head_notification_item">
                    <div className="notification_emoji">
                        {emoji}
                    </div>
                    <div className="notification_item_title">
                        <h5>{text}</h5>
                        <span>{time}</span>
                    </div>
                </div>
            );
    }
};

const NotificationItem = (props) => {
    return getNotifContent(props);
};

export default NotificationItem;