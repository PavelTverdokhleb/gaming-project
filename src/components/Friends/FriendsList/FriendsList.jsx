import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import FriendItem from './FriendItem';
import IconButton from '@material-ui/core/IconButton';
import FriendsListSection from './FriendsListSection';
import TransitionedBlock from '../../HelperComponents/TransitionedBlock/TransitionedBlock';
import FriendsLoader from './FriendsLoader';
import ScrollBar from '../../HelperComponents/ScrollBar/ScrollBar';

import { getFriendsList, getSearchFriends, getSearchUsers } from "../../../actions/friendsActions";
import { isArray } from "../../../helpers/functions";

import SearchIcon from '../../../assets/image/search_icon.svg';

import './FriendsList.scss';

class FriendsList extends Component {
    constructor(props) {
        super(props);
        let params = new URLSearchParams(props.location.search.substring(1));
        this.state = {
            search: params.get('query') || '',
            full: null,
            activePages: {
                list: 2,
                friends: 2,
                users: 2
            }
        };
    }

    componentDidMount() {
        const { search } = this.state;
        if(search !== '') {
            this.makeUsersSearch();
        } else {
            this.doFriendsRequest();
        }
    }

    doFriendsRequest = () => {
        const { getFriendsList } = this.props;
        let params = [];
        params.push(`page=1`);
        params.push(`page_size=15`);
        let query = params.join('&');
        getFriendsList(query);
    };

    makeUsersSearch = () => {
        const { getSearchUsers, getSearchFriends, history, friends:{friends_list} } = this.props;
        const { search } = this.state;
        this.setState({full: null, activePages: {friends: 2, users: 2}});

        let params = [];
        params.push(`query=${search}`);
        params.push(`page=1`);
        params.push(`page_size=15`);
        let query = params.join('&');

        if(search === '') {
            this.props.friends.search_friends = {results:[]};
            this.props.friends.search_users = {results:[]};
            if(!friends_list.count && friends_list.count !== 0) {
                this.doFriendsRequest();
            }
            history.push(`/admin/friends`);
        } else  {
            history.push(`/admin/friends?${query}`);
            getSearchFriends(query);
            getSearchUsers(query);
        }
    };

    changeValue = (e) => {
        this.setState({search: e.target.value});
    };

    onKeyDown = (e) => {
        if(e.keyCode === 13) {
            this.makeUsersSearch();
        }
    };

    fullView = name => {
        this.setState(({full}) => ({
            full: full !== name ? name : null
        }));
    };

    searchMore = (type, e) => {
        const { getSearchUsers, getSearchFriends } = this.props;
        const { search, activePages } = this.state;

        if (e.scrollHeight - e.scrollTop === e.clientHeight) {
            let params = [];
            params.push(`query=${search}`);
            params.push(`page=${activePages[type]}`);
            params.push(`page_size=15`);
            let query = params.join('&');

            this.setState(({activePages}) => ({
                activePages:{...activePages, [type]: activePages[type] + 1}
            }));

            if(type === 'friend') {
                getSearchFriends(query);
            } else {
                getSearchUsers(query);
            }
        }
    };

    moreFriends = (e) => {
        const { getFriendsList } = this.props;
        const { activePages } = this.state;

        let el = e.target;
        if (el.scrollHeight - el.scrollTop === el.clientHeight) {
            let params = [];
            params.push(`page=${activePages.list}`);
            params.push(`page_size=15`);
            let query = params.join('&');

            this.setState(({activePages}) => ({
                activePages:{...activePages, list: activePages.list + 1}
            }));

            getFriendsList(query);
        }
    };

    render(){
        const { friends:{friends_list, search_friends, search_users}, location } = this.props;
        const { search, full } = this.state;
        const isSearched = location.search !== '';
        return (
            <TransitionedBlock>
                <div className="friends_list_wrapper default_box">
                    <h3>Friend List</h3>
                    <div className="friends_search_container">
                        <div className="search_friend_wrapper">
                            <input
                                type="text"
                                onChange={this.changeValue}
                                onKeyDown={this.onKeyDown}
                                value={search}
                                placeholder="Enter for search…"
                            />
                            <IconButton
                                onClick={this.makeUsersSearch}
                            >
                                <img src={SearchIcon} alt="search icon"/>
                            </IconButton>
                        </div>
                    </div>
                    <div className="friends_list">
                        <ScrollBar
                            onScroll={friends_list.next !== null
                                ? this.moreFriends
                                : null
                            }
                            autoHeight
                        >
                            {!isSearched ?
                                !friends_list.count && friends_list.count !== 0 ?
                                    <FriendsLoader/>
                                    :
                                    isArray(friends_list.results) ?
                                        friends_list.results.map((item, i) => (
                                            <FriendItem
                                                key={i}
                                                {...item}
                                            />
                                        ))
                                        :
                                        <p className="no_items">
                                            You don't have friends yet
                                        </p>
                                :
                                null
                            }
                        </ScrollBar>
                        {isSearched && full !== "users" ?
                            <FriendsListSection
                                title="Your Friends"
                                data={search_friends}
                                type="friends"
                                onSeeAll={this.fullView}
                                full={full === "friends"}
                                searchMore={this.searchMore}
                            />
                            :
                            null
                        }
                        {isSearched && full !== "friends" ?
                            <FriendsListSection
                                title="Other People"
                                data={search_users}
                                type="users"
                                onSeeAll={this.fullView}
                                full={full === "users"}
                                searchMore={this.searchMore}
                            />
                            :
                            null
                        }
                    </div>
                </div>
            </TransitionedBlock>
        );
    }
}

function mapStateToProps(state) {
    return{
        friends: state.friends
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getFriendsList,
        getSearchFriends,
        getSearchUsers
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);