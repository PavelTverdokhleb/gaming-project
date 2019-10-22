import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {API_SOCKET_BASE_URL} from "../../../config";

import SearchBlock from '../GameBlocks/SearchBlock/SearchBlock';
import ApproveOpponent from '../GameBlocks/ApproveOpponent/ApproveOpponent';
import GameBoard from '../GameBlocks/GameBoard/GameBoard';

import { setGameData } from "../../../actions/updateRedux";
import { selectChat } from "../../../actions/chatActions";

class GameLobby extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connected: false,
            state: props.game_center.center_info.state || ''
        };
    }

    componentDidMount() {
        this.connectSocket()
    }

    componentWillUnmount() {
        const { state } = this.state;
        if(state !== 'looking_for_opponent') {
            this.socket.close();
        }
        clearTimeout(this.reconnect);
    }

    connectSocket = () => {
        this.socket = new WebSocket(`wss://${API_SOCKET_BASE_URL}/ws/lobby/?token=${localStorage.token}`);
        this.socket.onopen = this.onOpen;
        this.socket.onmessage = this.onMessage;
        this.socket.onclose = this.onClose;
        this.socket.onerror = this.onError;
    };

    onOpen = (e) => {
        console.log('Lobby socket connected', e);
        this.setState({connected: true});
    };

    onMessage = (e) => {
        const { setGameData, selectChat, game_center:{ waiting_for_start } } = this.props;
        let data = JSON.parse(e.data);
        console.log(data);

        //timeout and leave dont do anything here
        if(data.type === "opponent_leaves" || data.type === 'timeout' || data.type === 'i_left' || data.type === 'opponent_doesnt_respond') {
            return
        }

        //set data in store for chat
        if((data.new_state === 'waiting_for_start' || data.state === 'waiting_for_start' || data.state === 'in_game' || data.state === 'submitting_result') && data.data.opponent) {
            console.log('setting chat');
            let obj = this.getObj(data);
            selectChat(obj, true);
        }

        //set data in store
        if(
            (data.state === 'approving_opponent' && data.data.opponent && data.type !== 'opponents_ready') ||
            (data.type === 'opponent_found' && data.data.opponent) ||
            (data.state === 'waiting_for_friend' && data.data.opponent && data.type !== 'opponents_ready') ||
            (data.state === 'waiting_for_rematch' && data.data.opponent && data.type !== 'opponents_ready')
        ) {
            setGameData('approving_opponent', data.data);
        } else if((data.state === 'waiting_for_start' && data.data.opponent) || (data.type === 'opponents_ready' && data.data.opponent && data.state !== 'in_game')) {
            setGameData('waiting_for_start', data.data);
        } else if((data.state === 'in_game' && data.data.opponent && data.type !== 'opponents_ready') || data.state === "submitting_result") {
            setGameData('waiting_for_start', data.data);
        } else if((data.state === 'in_game' && data.type === 'opponent_accepts')) {
            setGameData('waiting_for_start', {...waiting_for_start, ended: data.data.ended});
        }

        //set new state
        if (data.state === 'looking_for_opponent' && data.type === 'timeout') {
            setGameData("search_data", data.data);
        } else {
            this.setState({state: data.new_state || data.state});
        }
    };

    onClose = (e) => {
        console.error('Lobby socket closed ', e);
        if(!e.wasClean) {
            console.log('Socket close not clean. Reconnect');
            this.reconnect = setTimeout(() => this.connectSocket(), 5000);
        }
    };

    onError = (error) => {
        console.error("Lobby socket error " + error, error);
    };

    getObj = (data) => {
        let obj = {
            avatar: data.data.opponent.avatar,
            is_online: true,
            username: data.data.opponent.username,
            id: data.data.opponent.id
        };
        if(data.data.chat_room && data.data.chat_room !== null) obj.room_id = data.data.chat_room;
        return obj;
    };

    getContent = () => {
        const { state } = this.state;
        if(state === 'looking_for_opponent') {
            return (
                <SearchBlock
                    socket={this.socket}
                    connectSocket={this.connectSocket}
                />
            );
        } else if (state === 'approving_opponent' || state === 'waiting_for_friend' || state === 'waiting_for_rematch') {
            return (
                <ApproveOpponent
                    socket={this.socket}
                    state={state}
                    setNewState={this.setNewState}
                    connectSocket={this.connectSocket}
                />
            );
        } else if (state === 'waiting_for_start' || state === 'in_game' || state === 'submitting_result') {
            return (
                <GameBoard
                    socket={this.socket}
                    state={state}
                    setNewState={this.setNewState}
                />
            );
        } else {
            return null;
        }
    };

    setNewState = (state) => {
        this.setState({state});
    };

    render(){
        const { connected } = this.state;
        let content = this.getContent();
        if(!connected) return null;
        console.log(this.state.state);
        return (
            <Fragment>
                {content}
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return{
        game_center: state.game_center
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setGameData,
        selectChat
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GameLobby);