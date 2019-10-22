import React, {Component} from 'react';
import {connect} from 'react-redux';
import TransitionedBlock from '../../../HelperComponents/TransitionedBlock/TransitionedBlock';
import SelectFriendItem from './SelectFriendItem';
import ScrollBar from '../../../HelperComponents/ScrollBar/ScrollBar';
import IconButton from '@material-ui/core/IconButton';

import { isArray } from "../../../../helpers/functions";
import { deleteSelectFriend, postSelectFriendForGame } from "../../../../actions/gameCenterActions";
import { setGameData } from "../../../../actions/updateRedux";

import SearchIcon from '../../../../assets/image/search_icon.svg';

import './SelectFriend.scss';

class SelectFriend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };
    }

    cancelFriendsGame = () => {
        const { deleteSelectFriend, history } = this.props;
        deleteSelectFriend().then(res => {
            if(res.payload && res.payload.status && res.payload.status === 204) {
                history.push('/admin/game-center');
            } else if (res.error && res.error.response && res.error.response.status && res.error.response.status === 400) {
                if(res.error.response.data.detail && res.error.response.data.detail[0] === 'invalid state') {
                    history.push('/admin/game-center');
                }
            }
        });
    };

    selectFriend = (id) => {
        const { postSelectFriendForGame, setGameData, history } = this.props;
        postSelectFriendForGame({id}).then(res => {
            if(res.payload && res.payload.status && res.payload.status === 201) {
                setGameData('friend', res.payload.data.friend);
                history.push('/admin/game-center/invite-friend');
            } else if (res.error && res.error.response && res.error.response.status && res.error.response.status === 400) {
                if(res.error.response.data.detail && res.error.response.data.detail[0] === 'invalid state') {
                    history.push('/admin/game-center');
                }
            }
        })
    };


    changeValue = (e) => {
        this.setState({search: e.target.value});
    };

    render(){
        const { game_center: {friends} } = this.props;
        const { search } = this.state;
        
        let items = friends;
        if(search !== '') {
            items = friends.filter(el => el.username.toLowerCase().includes(search.toLowerCase()));
        }
        return (
            <TransitionedBlock>
                <div className="block_center">
                    <div className="content_center select_friend">
                        <div className="select_friend_top_block">
                            <h2 className="title">Challenge your friend</h2>
                            <div className="friends_search_container">
                                <div className="search_friend_wrapper">
                                    <input
                                        type="text"
                                        onChange={this.changeValue}
                                        onKeyDown={this.onKeyDown}
                                        onKeyUp={this.onKeyUp}
                                        value={search}
                                        placeholder="Enter friend name"
                                    />
                                    <IconButton>
                                        <img src={SearchIcon} alt="search icon"/>
                                    </IconButton>
                                </div>
                            </div>
                            <div className="select_friend_list">
                                <ScrollBar
                                    maxHeight="300px"
                                >
                                    {isArray(items) ?
                                        items.map(el => (
                                            <SelectFriendItem
                                                selectFriend={this.selectFriend}
                                                key={el.id}
                                                {...el}
                                            />
                                        ))
                                        : "No items to show"
                                    }
                                </ScrollBar>
                            </div>
                            <div className="opponent_need_add_friends">
                                <p>Select a friend to create an instant challenge.</p>
                            </div>
                        </div>
                        <div className="select_friend_bottom_block">
                            <button
                                className="cancel_btn"
                                onClick={this.cancelFriendsGame}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </TransitionedBlock>
        );
    }
}

const mapStateToProps = ({game_center}) => {
    return{
        game_center
    }
};

const mapDispatchToProps = {
    deleteSelectFriend,
    postSelectFriendForGame,
    setGameData
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectFriend);