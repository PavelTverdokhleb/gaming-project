import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import ChatListItem from './ChatListItem';
import Preloader from '../../HelperComponents/Preloader/Preloader';
import ScrollBar from '../../HelperComponents/ScrollBar/ScrollBar';

import { isArray } from "../../../helpers/functions";
import { getChatsList, selectChat, getChatUsersStatus } from "../../../actions/chatActions";

import SearchIcon from '../../../assets/image/search_icon.svg';

import './ChatList.scss';

class ChatList extends Component {
    state = {
        value: '',
        search_results: null,
        loading: true
    };

    componentDidMount() {
        const { getChatsList, getChatUsersStatus } = this.props;
        getChatsList().then(res => {
            if(res.payload && res.payload.status && res.payload.status === 200) {
                this.setState({loading: false});
            }
        });
        this.interval = setInterval(() => {
            getChatUsersStatus();
        }, 20000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    selectChat = data => {
        const { selectChat } = this.props;
        selectChat(data);
    };

    onChange = e => {
        this.setState({value: e.target.value});
    };

    onKeyDown = e => {
        if(e.keyCode === 13) {
            this.searchChats();
        }
    };

    searchChats = () => {
        const { chats_list } = this.props;
        const { value } = this.state;
        if(value === '') {
            this.setState({search_results: null});
        } else {
            this.setState({search_results: chats_list.filter(el => el.user.username.toLowerCase().includes(value.toLowerCase()))});
        }
    };

    render(){
        const { chats_list, current_chat } = this.props;
        const { value, search_results, loading } = this.state;

        let items = chats_list;
        if(search_results !== null) {
            items = search_results;
        }
        return (
            <div className="chat_list_wrapper">
                <div className="friends_search_container">
                    <div className="search_friend_wrapper">
                        <input
                            type="text"
                            onChange={this.onChange}
                            onKeyDown={this.onKeyDown}
                            value={value}
                            placeholder="Enter for search messages"
                        />
                        <IconButton
                            onClick={this.searchChats}
                        >
                            <img src={SearchIcon} alt="search icon"/>
                        </IconButton>
                    </div>
                </div>
                <ScrollBar
                    maxHeight="calc(100vh - 160px)"
                >
                    {loading ?
                        <Preloader/>
                        :
                        <Fragment>
                            {search_results !== null ?
                                <div className="chats_search_results">
                                    <p>Search Results</p>
                                </div>
                                : null
                            }
                            {isArray(items)  ?
                                items.map(item => (
                                    <ChatListItem
                                        key={item.id}
                                        isActive={current_chat && current_chat.room_id === item.id}
                                        {...item}
                                        selectChat={this.selectChat}
                                    />
                                ))
                                :
                                <span className="chats_no_items">No items to show…</span>
                            }
                        </Fragment>
                    }
                </ScrollBar>
            </div>
        );
    }
}

const mapDispatchToProps = {
    getChatsList,
    selectChat,
    getChatUsersStatus
};

export default connect(null, mapDispatchToProps)(ChatList);