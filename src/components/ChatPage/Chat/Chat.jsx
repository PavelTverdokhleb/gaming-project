import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Preloader from '../../HelperComponents/Preloader/Preloader';
import Message from './Message';
import { Scrollbars } from 'react-custom-scrollbars';
import moment from 'moment';
import PopoverComponent from '../../HelperComponents/PopoverComponent/PopoverComponent';
import Chip from '@material-ui/core/Chip';
import Lightbox from 'react-images';

import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

import { isArray } from "../../../helpers/functions";
import { getChatMessages, postChatImage } from "../../../actions/chatActions";

import NoMessagesImg from '../../../assets/image/no_messages.svg';
import GLogo from '../../../assets/image/g_logo.svg';
import FileIcon from '../../../assets/image/file.svg';
import SendIcon from '../../../assets/image/send.svg';
import SmileIcon from '../../../assets/image/smile.svg';
import SmileActiveIcon from '../../../assets/image/smile_active.svg';
import ArrowIcon from '@material-ui/icons/KeyboardArrowRight';

import './Chat.scss';


class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            file: null,
            anchorEl: null,
            image: null,
            errorMessage: null
        };
    }

    componentDidMount() {
        const { socket, current_chat, chat_messages } = this.props;
        const { scrollbar } = this.refs;
        socket.addEventListener('message', (e) => {
            const { current_chat } = this.props;
            const { scrollbar } = this.refs;
            const { value } = this.state;
            let data = JSON.parse(e.data);
            console.log(data);
            if(data.type === 'echo') {
                this.setState({value: ''});
                if(scrollbar) {
                    scrollbar.scrollToBottom();
                }
            } else {
                this.setState({value});

                if(current_chat !== null && Number(data.data.room_id) === current_chat.room_id) {
                    console.log('mark as read');
                    socket.send(JSON.stringify({
                        "type": "mark_read",
                        "data": {
                            "message_id": data.data.id
                        }
                    }));
                }

                if(scrollbar) {
                    let obj = scrollbar.getValues();
                    if((obj.scrollHeight - (obj.scrollTop + obj.clientHeight)) < 400 ) {
                        scrollbar.scrollToBottom();
                    }
                }
            }
        });

        if(current_chat !== null && current_chat.room_id && !isArray(chat_messages.results)) {
            this.getData(`?room_id=${current_chat.room_id}`, false);
        } else if (isArray(chat_messages.results) && scrollbar) {
            scrollbar.scrollToBottom();
        }
    }

    componentDidUpdate(prevProps) {
        const { current_chat } = this.props;

        if (
            (current_chat !== null && prevProps.current_chat === null) ||
            (current_chat !== null && current_chat.room_id && prevProps.current_chat.room_id && current_chat.room_id !== prevProps.current_chat.room_id) ||
            (current_chat !== null && current_chat.room_id && !prevProps.current_chat.room_id)
        ) {
            this.getData(`?room_id=${current_chat.room_id}`, false);
            this.setState({file: null});
        }
    }

    getData = (query, scrolled) => {
        const { getChatMessages } = this.props;
        const { scrollbar } = this.refs;

        getChatMessages(query).then(() => {
            if(scrollbar) {
                if(scrolled) {
                    scrollbar.scrollTop(scrollbar.getScrollHeight() - scrolled);
                } else {
                    scrollbar.scrollToBottom();
                }
            }
        });
    };

    onKeyDown = (e) => {
        if(e.keyCode === 13) {
            this.sendMessage();
        }
    };

    onChange = (e) => {
        let value =  e.target.value;
        if(value.length <= 2000) {
            this.setState({value: e.target.value, errorMessage: null});
        } else {
            this.setState({errorMessage: 'Message can\'t be more than 2000 characters'});
        }
    };

    sendMessage = () => {
        const { postChatImage } = this.props;
        const { file } = this.state;

        if(file !== null) {
            const formData = new FormData();
            formData.append('image', file);
            postChatImage(formData).then(res => {
                if(res.payload && res.payload.status && res.payload.status === 201) {
                    this.sendSocket(res.payload.data.id);
                    this.setState({file: null});
                } else if(res.error && res.error.response && res.error.response.status === 400) {
                    if(res.error.response.data.image && res.error.response.data.image[0]) {
                        this.setState({errorMessage: res.error.response.data.image[0]});
                    }
                }
            })
        } else {
            this.sendSocket();
        }
    };

    sendSocket = (image_id) => {
        const { socket, current_chat } = this.props;
        const { value, errorMessage } = this.state;

        if(errorMessage !== null) {
            this.setState({errorMessage: null});
        }

        let messageObj = {
            type: "private_message",
            data: {
                "message": value,
            }
        };

        if (current_chat.room_id) messageObj.data.to_room = current_chat.room_id;
        else if (current_chat.id) messageObj.data.to_user = current_chat.id;

        if (image_id) messageObj.data.image_id = image_id;

        socket.send(JSON.stringify(messageObj));
    };

    handleScroll = (e) => {
        const { chat_messages } = this.props;
        if(e.target.scrollTop === 0 && chat_messages.next && chat_messages.next !== null) {
            let query = chat_messages.next.split('private-message/')[1];
            this.getData(query, e.target.scrollHeight);
        }
    };

    renderThumb({ style, ...props }) {
        let thumbStyle = {
            width: '10px'
        };
        return (
            <div
                className="custom_scrollbar_thumb"
                style={{...style, ...thumbStyle}}
                {...props}
            />
        );
    }

    renderTrack({ style, ...props }) {
        let trackStyle = {
            top: '2px',
            right: '2px',
            bottom: '2px',
            width: '10px'
        };
        return (
            <div
                className="custom_scrollbar_track"
                style={{...style, ...trackStyle}}
                {...props}
            />
        );
    }

    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };


    handleImageChange(e) {
        e.preventDefault();
        let file = e.target.files[0];
        if(file) {
            this.setState({file, errorMessage: null});
            document.getElementById('chat_page_input').focus();
        }
    }

    openImageBox = (image) => {
        this.setState({image});
    };

    closeImageBox = () => {
        this.setState({image: null});
    };

    render(){
        const { current_chat, chat_messages, maxHeight = 'calc(100vh - 260px)', lobby } = this.props;
        const { value, anchorEl, file, image, errorMessage } = this.state;

        if(current_chat === null) return (
            <div className="chat_no_conversation">
                <img src={NoMessagesImg} alt="no messages"/>
                <p>Choose your chat to start a conversation</p>
            </div>
        );

        const active = Boolean(anchorEl);
        let isLoaded = chat_messages && chat_messages.load;

        const { username, is_online, avatar } = current_chat;
        return (
            <div className="chat_wrapper">
                <div className="chat_header">
                    <div>
                        <Link
                            to={`/admin/friends/${current_chat.id}`}
                        >
                            <div className="chat_header_avatar">
                                <span className={is_online ? "online_user user_status" : "offline_user user_status"}></span>
                                <Avatar
                                    src={avatar}
                                    classes={{
                                        root: 'chat_avatar'
                                    }}
                                />
                            </div>
                        </Link>
                        <div className="chat_header_info">
                            <p><img src={GLogo} alt="app logo"/>{username}</p>
                            <span>{is_online ? 'Online' : 'Offline'}</span>
                        </div>
                    </div>
                    {lobby ?
                        <Link
                            className="chat_full_view"
                            to="/admin/messages"
                        >
                            Open Full view
                            <span><ArrowIcon/></span>
                        </Link>
                        : null
                    }
                </div>
                <div className="chat_body">
                    <div className="chat_messages_wrapper">
                        {!isLoaded ? <Preloader/> : null}
                        <Scrollbars
                            onScroll={this.handleScroll}
                            renderThumbVertical={this.renderThumb}
                            renderTrackVertical={this.renderTrack}
                            hideTracksWhenNotNeeded
                            autoHeight
                            autoHeightMax={maxHeight}
                            ref="scrollbar"
                        >
                            {isLoaded ?
                                <div className="chat_messages">
                                    {chat_messages.results.map((message, i) => {
                                        let lastIndex = chat_messages.results.length - 1;
                                        let timeNow = moment(message.create_date).format("YYYY:MM:DD");
                                        let timeNext = timeNow;
                                        if( i + 1 <= lastIndex ) {
                                            timeNext = moment(chat_messages.results[i + 1].create_date).format("YYYY:MM:DD");
                                        }
                                        return (
                                            <Fragment key={message.id}>
                                                <Message
                                                    avatar={current_chat.avatar}
                                                    openImageBox={this.openImageBox}
                                                    {...message}
                                                />
                                                {timeNow !== timeNext || i === lastIndex
                                                    ? <div className="messages_time_row">{moment(message.create_date).format('MMMM DD, YYYY')}</div>
                                                    : null
                                                }
                                            </Fragment>
                                        );
                                    })}
                                </div>
                                : null
                            }
                        </Scrollbars>
                    </div>

                    {isLoaded ?
                        <div className="chat_panel">
                            {file !== null ?
                                <Chip
                                    label={file.name}
                                    onDelete={() => this.setState({file: null, errorMessage: null})}
                                    classes={{
                                        root: 'chat_image_preview'
                                    }}
                                />
                                : null
                            }

                            <input
                                id="chat_input"
                                className="fileInput"
                                type="file"
                                onChange={(e)=>this.handleImageChange(e)}
                            />

                            <IconButton
                                classes={{
                                    root: 'chat_file_btn'
                                }}
                                onClick={() => document.getElementById('chat_input').click() }
                            >
                                <img src={FileIcon} alt="file"/>
                            </IconButton>
                            <div className="chat_field">
                                <input
                                    id="chat_page_input"
                                    type="text"
                                    value={value}
                                    onChange={this.onChange}
                                    onKeyDown={this.onKeyDown}
                                    placeholder="Type a massage here..."
                                    autoComplete="off"
                                />
                                <button
                                    className="emoji_btn"
                                    onClick={this.handleClick}
                                >
                                    <img src={active ? SmileActiveIcon : SmileIcon} alt="smile"/>
                                </button>
                                <IconButton
                                    classes={{
                                        root: 'chat_send_btn'
                                    }}
                                    onClick={this.sendMessage}
                                >
                                    <img src={SendIcon} alt="send"/>
                                </IconButton>
                                {errorMessage !== null ?
                                    <p className="chat_field_error">{errorMessage}</p>
                                    : null
                                }
                            </div>
                        </div>
                        : null
                    }
                </div>
                <Lightbox
                    images={image !== null ? [{src: image}] : []}
                    isOpen={image !== null}
                    onClose={this.closeImageBox}
                    backdropClosesModal
                    showImageCount={false}
                />
                <PopoverComponent
                    anchor={anchorEl}
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    classes="emoji_popover_wrapper"
                >
                    <Picker
                        onSelect={((e) => {
                            this.setState(({value}) => ({
                                value: value + e.native
                            }))
                        })}
                    />
                </PopoverComponent>
            </div>
        );
    }
}

const mapDispatchToProps = {
    getChatMessages,
    postChatImage
};

export default connect(null, mapDispatchToProps)(Chat);