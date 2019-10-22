import React, {Component} from 'react';
import {connect} from 'react-redux';
import ChatList from './ChatList/ChatList';
import Chat from './Chat/Chat';
import {API_SOCKET_BASE_URL} from "../../config";

import { updateMessageList, updateChatsRead } from "../../actions/chatActions";

import './ChatPage.scss';


class ChatPage extends Component {

    componentDidMount() {
        this.connectSocket();
    }

    componentWillUnmount() {
        const { lobby } = this.props;
        if(!lobby) {
            this.props.chat.current_chat = null;
            this.props.chat.chat_messages = {load: false, results:[]};
        }
        this.socket.close();
        clearTimeout(this.reconnect);
    }

    connectSocket = () => {
        this.socket = new WebSocket(`wss://${API_SOCKET_BASE_URL}/ws/chat/?token=${localStorage.token}`);
        this.socket.onopen = this.onOpen;
        this.socket.onmessage = this.onMessage;
        this.socket.onclose = this.onClose;
        this.socket.onerror = this.onError;
    };

    onOpen = (e) => {
        console.log('Chat socket connected', e);
        this.setState({connected: true});
    };

    onMessage = (e) => {
        const { updateMessageList, updateChatsRead } = this.props;
        let data = JSON.parse(e.data);
        console.log(data);
        const { id, text, create_date, image, room_id, receiver_id} = data.data;
        let obj = {
            id,
            text,
            create_date,
            is_mine: data.type === 'echo',
            image: image || null,
            room_id: Number(room_id),
            receiver_id: Number(receiver_id)
        };
        if(data.type === 'echo') {
            updateMessageList(obj);
        } else if(data.type === 'chat_read') {
            updateChatsRead(data.data.room_id);
        } else if (data.type === 'error') {
            alert(data.data.message);
        } else {
            updateMessageList(obj);
        }
    };

    onClose = (e) => {
        console.error('Chat socket closed', e);
        if(!e.wasClean) {
            this.reconnect = setTimeout(() => this.connectSocket(), 5000);
        }
    };

    onError = (error) => {
        console.error("Chat socket error " + error);
    };

    render(){
        const { chat:{current_chat, chat_messages, chats_list}, lobby, maxHeight } = this.props;
        
        console.log(current_chat, chat_messages);
        
        let classNames = "chat_page_container";
        if(lobby) classNames = "chat_lobby_container";
        return (
            <div className={classNames}>
                {!lobby ?
                    <ChatList
                        current_chat={current_chat}
                        chats_list={chats_list}
                    />
                    : null
                }

                {this.socket !== undefined ?
                    <Chat
                        socket={this.socket}
                        current_chat={current_chat}
                        chat_messages={chat_messages}
                        maxHeight={maxHeight}
                        lobby={lobby}
                    />
                    : null
                }
            </div>
        );
    }
}

const mapStateToProps = ({chat}) => {
    return{
        chat
    }
};

const mapDispatchToProps = {
    updateMessageList,
    updateChatsRead
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);