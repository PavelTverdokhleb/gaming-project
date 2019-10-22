import React from 'react';
import moment from 'moment';
import Avatar from '@material-ui/core/Avatar';
import ImageLoader from 'react-imageloader';
import CircularProgress from '@material-ui/core/CircularProgress';

const Message = ({id, text, is_mine, create_date, avatar, image, openImageBox}) => {
    let img = image &&
        <button
            onClick={() => openImageBox(image)}
        >
            <ImageLoader
                src={image}
                preloader={() => (<div className="chat_image_preload"><CircularProgress size={50}/></div>)}
                wrapper={React.createFactory('div')}
            >
                Image load failed!
            </ImageLoader>
        </button>

    ;
    if(is_mine) {
        return (
            <div className="message mine_message">
                <p>{text}</p>
                {img}
                <span>{moment(create_date).format("HH:mm")}</span>
            </div>
        );
    } else {
        return (
            <div className="message friend_message">
                <Avatar
                    src={avatar}
                    classes={{
                        root: 'message_avatar'
                    }}
                />
                <p>{text}</p>
                {img}
                <span>{moment(create_date).format("HH:mm")}</span>
            </div>
        );
    }
};

export default Message;