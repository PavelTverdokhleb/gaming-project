import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import moment from "moment/moment";
import PopoverComponent from '../../HelperComponents/PopoverComponent/PopoverComponent';
import Preloader from '../../HelperComponents/Preloader/Preloader';
import Message from '../../ChatPage/Chat/Message';
import { Scrollbars } from 'react-custom-scrollbars';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import {API_SOCKET_BASE_URL} from "../../../config";
import Lightbox from 'react-images';

import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

import { getStatus } from "../../../helpers/functions";
import { postChatImage } from "../../../actions/chatActions";
import { getDisputeMessages, updateDisputeMessageList, updateDisputeResult } from "../../../actions/disputeActions";

import GLogo from '../../../assets/image/g_logo.svg';
import FileIcon from '../../../assets/image/file.svg';
import SendIcon from '../../../assets/image/send.svg';
import SmileIcon from '../../../assets/image/smile.svg';
import SmileActiveIcon from '../../../assets/image/smile_active.svg';

import './Dispute.scss';

class Dispute extends Component {
    state = {
        value: '',
        anchorEl: null,
        file: null,
        image: null,
        errorMessage: null
    };

    componentDidMount() {
        const { id } = this.props;
        this.connectSocket();
        this.getData(`?dispute_id=${id}`, false);
    }

    componentWillUnmount() {
        this.props.dispute.dispute_messages = {load: false, results:[]};
        this.socket.close();
        clearTimeout(this.reconnect);
    }

    getData = (query, scrolled) => {
        const { getDisputeMessages } = this.props;
        const { scrollbar } = this.refs;

        getDisputeMessages(query).then(() => {
            if(scrollbar) {
                if(scrolled) {
                    scrollbar.scrollTop(scrollbar.getScrollHeight() - scrolled);
                } else {
                    scrollbar.scrollToBottom();
                }
            }
        });
    };

    connectSocket = () => {
        this.socket = new WebSocket(`wss://${API_SOCKET_BASE_URL}/ws/dispute/?token=${localStorage.token}`);
        this.socket.onopen = this.onOpen;
        this.socket.onmessage = this.onMessage;
        this.socket.onclose = this.onClose;
        this.socket.onerror = this.onError;
    };

    onOpen = (e) => {
        console.log('Dispute socket connected', e);
        this.setState({connected: true});
    };

    onMessage = (e) => {
        const { updateDisputeMessageList, updateDisputeResult } = this.props;
        const { scrollbar } = this.refs;
        let data = JSON.parse(e.data);
        console.log(data);
        const { id, text, create_date, image, room_id, author} = data.data;
        let obj = {
            id,
            text,
            create_date,
            is_mine: data.type === 'echo',
            image: image || null,
            room_id: Number(room_id),
            author
        };
        if(data.type === 'echo') {
            updateDisputeMessageList(obj);
            this.setState({value: ''});
            scrollbar.scrollToBottom();
        } else if(data.type === 'dispute_read') {

        } else if (data.type === 'error') {
            alert(data.data.message);
        } else {
            updateDisputeMessageList(obj);
            this.socket.send(JSON.stringify({
                "type": "mark_read",
                "data": {
                    "message_id": data.data.id
                }
            }));

            if(scrollbar) {
                console.log('dispute scroll');
                let obj = scrollbar.getValues();
                if((obj.scrollHeight - (obj.scrollTop + obj.clientHeight)) < 400 ) {
                    scrollbar.scrollToBottom();
                }
            }
        }

        if(data.data.resolved) {
            let obj = {
                resolved: data.data.resolved,
                my_result: data.data.my_result,
            };
            updateDisputeResult(obj);
        }
    };

    onClose = (e) => {
        console.error('Dispute socket closed', e);
        if(!e.wasClean) {
            this.reconnect = setTimeout(() => this.connectSocket(), 5000);
        }
    };

    onError = (error) => {
        console.error("Dispute socket error " + error);
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
            this.setState({errorMessage: 'Message can\'t be more than 2000 characters'})
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
        const { socket, props:{id} } = this;
        const { value, errorMessage } = this.state;

        if(errorMessage !== null) {
            this.setState({errorMessage: null});
        }

        let messageObj = {
            type: "private_message",
            data: {
                "message": value,
                "to_dispute": id
            }
        };

        if (image_id) messageObj.data.image_id = image_id;

        socket.send(JSON.stringify(messageObj));
    };

    handleScroll = (e) => {
        const { dispute:{dispute_messages} } = this.props;
        if(e.target.scrollTop === 0 && dispute_messages.next && dispute_messages.next !== null) {
            let query = dispute_messages.next.split('dispute-message/')[1];
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
        }
    }

    openImageBox = (image) => {
        this.setState({image});
    };

    closeImageBox = () => {
        this.setState({image: null});
    };

    render(){
        const { opponent, me, game_lobby, dispute:{dispute_messages}, agent, resolved } = this.props;
        const { id, my_result } = game_lobby;
        const { value, anchorEl, file, image, errorMessage } = this.state;

        const status = (resolved && my_result) || 'pending';
        const active = Boolean(anchorEl);
        let isLoaded = dispute_messages && dispute_messages.load;

        const maxHeight = 'calc(100vh - 260px)';

        return (
            <div className="chat_wrapper">
                <div className="chat_header dispute_chat_header">
                    <div>
                        <div>
                            <span>Dispute# {id}</span>
                        </div>
                        <div className="flex-center">
                            <span>Status:</span>
                            {getStatus(status)}
                        </div>
                    </div>
                    <hr/>
                    <div className="dispute_header_info">
                        <div className="dispute_header_avatars">
                            <Avatar
                                src={me.avatar}
                            />
                            <Avatar
                                src={opponent.avatar}
                            />
                        </div>
                        <div className="dispute_header_usernames">
                            <span>Participants</span>
                            <p><img src={GLogo} alt="logo"/>{me.username}, <img src={GLogo} alt="logo"/>{opponent.username}</p>
                        </div>
                    </div>
                    {agent !== null ?
                        <Fragment>
                            <hr/>
                            <div>
                                <div className="agent_logo_big">
                                    <Avatar
                                        src={agent.avatar}
                                    />
                                </div>
                                <div className="dispute_header_agent">
                                    <span>Dispute Agent</span>
                                    <p>{agent.username}</p>
                                </div>
                            </div>
                        </Fragment>
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
                                    {dispute_messages.results.map((message, i) => {
                                        let lastIndex = dispute_messages.results.length - 1;
                                        let timeNow = moment(message.create_date).format("YYYY:MM:DD");
                                        let timeNext = timeNow;
                                        if( i + 1 <= lastIndex) {
                                            timeNext = moment(dispute_messages.results[i + 1].create_date).format("YYYY:MM:DD");
                                        }
                                        return (
                                            <Fragment key={message.id}>
                                                <Message
                                                    avatar={message.author.avatar}
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
                        resolved ?
                            <div className="dispute_resolved">
                                <p>The dispute is resolved, you can no longer write or send photos</p>
                            </div>

                            :
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

const mapStateToProps = ({dispute}) => {
    return{
        dispute
    }
};

const mapDispatchToProps = {
    postChatImage,
    getDisputeMessages,
    updateDisputeMessageList,
    updateDisputeResult
};

export default connect(mapStateToProps, mapDispatchToProps)(Dispute);