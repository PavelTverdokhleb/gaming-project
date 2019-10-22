import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ChatListItem = (props) => {
    const { user: {avatar, username, is_online}, user, id, last_message, unread_count, selectChat, isActive } = props;
    let today = moment().format("YYYY:MM:DD");
    let lastMessage = '';
    if(last_message && last_message !== null) {
        lastMessage = moment(last_message.create_date).format("YYYY:MM:DD");
    }
    let isNew = unread_count !== 0;
    return (
        <div
            className={`chat_list_item ${isActive ? 'chat_list_item_active' : ''}`}
            onClick={() => !isActive && selectChat({...props.user, room_id: id})}
        >
            <Link
                to={`/admin/friends/${user.id}`}
                className="chat_list_item_avatar"
                onClick={e => e.stopPropagation()}
            >
                <span className={is_online ? "online_user user_status" : "offline_user user_status"}></span>
                <Avatar
                    src={avatar}
                    classes={{
                        root: 'chat_list_avatar'
                    }}
                />
            </Link>
            {last_message && last_message !== null ?
                <div className="chat_list_item_info">
                    <div className="chat_list_item_top_info">
                        <p>{username}</p>
                        <div className="chat_list_item_date">
                            <span>{moment(last_message.create_date).format(today !== lastMessage ? "DD.MM.YY HH:mm" : "HH:mm")}</span>
                            {isNew
                                ? <span className="new_massage_indicator"></span>
                                : null
                            }
                        </div>
                    </div>
                    <span className="chat_list_item_message">{last_message.image !== null && last_message.image !== undefined ? 'Photo' : last_message.text}</span>
                </div>
                :
                <div className="chat_list_item_info">
                    <div>
                        <p>{username}</p>
                    </div>
                </div>
            }
        </div>
    );
};

export default ChatListItem;