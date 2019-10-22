import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Pagination from '../../HelperComponents/Pagination/Pagination';
import ReceivedFriendRequests from './ReceivedFriendRequests';
import SentFriendRequests from './SentFriendRequests';
import InvitedFriends from './InvitedFriends';
import InviteCodeBlock from '../../AppBlocks/InviteCodeBlock/InviteCodeBlock';
import TransitionedBlock from '../../HelperComponents/TransitionedBlock/TransitionedBlock';

import { getFriendsRequests, patchAcceptFriendRequest, deleteFriend } from "../../../actions/friendsActions";

import './FriendsContent.scss';

class FriendsContent extends Component {
    state = {
        value: 'received',
        activePages: {
            received: 1,
            sent: 1,
            invited: 1
        },
        loadingAccept: null,
        disabled: null
    };

    componentDidMount() {
        const { value, activePages } = this.state;
        this.doRequest(value, activePages[value]);
    }

    doRequest = (type, page, setPage) => {
        const { getFriendsRequests } = this.props;
        let params = [];
        params.push(`type=${type}`);
        params.push(`page=${page}`);
        params.push(`page_size=10`);

        getFriendsRequests(`?${params.join('&')}`).then(res => {
            if(res.payload && res.payload.status && res.payload.status === 200) {
                if(setPage) {
                    this.setState(({activePages}) => ({
                        activePages: {...activePages, [type]: page}
                    }));
                }
                setTimeout(() => this.setState({disabled: null}), 500);
            }
        });
    };

    changeTab = (event, value) => {
        const { activePages } = this.state;
        this.setState({ value });
        this.doRequest(value, activePages[value]);
    };

    acceptRequest = (id) => {
        const { patchAcceptFriendRequest } = this.props;
        const { value, activePages } = this.state;
        let obj = {
            accepted: true
        };
        this.setState({loadingAccept: id, disabled: id});
        patchAcceptFriendRequest(id, obj).then(() => {
            this.doRequest(value, activePages[value]);
            this.setState({loadingAccept: null});
        });
    };

    deleteRequest = (id) => {
        const { deleteFriend } = this.props;
        const { value, activePages } = this.state;
        deleteFriend(id).then(() => {
            this.doRequest(value, activePages[value]);
        });
    };

    changePage = (name, page) => {
        this.doRequest(name, page, true);
    };

    render(){
        const { friends:{friends_requests, invitation} } = this.props;
        const { value, activePages, loadingAccept, disabled } = this.state;
        return (
            <TransitionedBlock>
                <div className={`friends_content ${invitation.code === null ? 'friends_content_full_height' : ''}`}>
                    <div className="default_box">
                        <Tabs
                            value={value}
                            onChange={this.changeTab}
                            classes={{
                                flexContainer: 'tabs_buttons_container'
                            }}
                        >
                            <Tab
                                label="Received Friend Requests"
                                value="received"
                                classes={{
                                    root: 'tab_wrapper',
                                    selected: 'tab_selected'
                                }}
                            />
                            <Tab
                                label="Sent Friend Requests"
                                value="sent"
                                classes={{
                                    root: 'tab_wrapper',
                                    selected: 'tab_selected'
                                }}
                            />
                            <Tab
                                label="Invited Friends"
                                value="invited"
                                classes={{
                                    root: 'tab_wrapper',
                                    selected: 'tab_selected'
                                }}
                            />
                        </Tabs>
                        <div className="friends_content_inner">
                            {value === 'received' && friends_requests.received ?
                                <Fragment>
                                    <ReceivedFriendRequests
                                        data={friends_requests.received}
                                        acceptRequest={(id) => this.acceptRequest(id)}
                                        deleteRequest={this.deleteRequest}
                                        loadingAccept={loadingAccept}
                                        disabled={disabled}
                                        current={activePages[value]}
                                    />
                                    {friends_requests.received.count > 10 ?
                                        <Pagination
                                            name="received"
                                            current={activePages[value]}
                                            onChange={this.changePage}
                                            total={friends_requests.received.count}
                                            pageCount={10}
                                        />
                                        : null
                                    }
                                </Fragment>
                                :
                                null
                            }
                            {value === 'sent' && friends_requests.sent ?
                                <Fragment>
                                    <SentFriendRequests
                                        data={friends_requests.sent}
                                        deleteRequest={this.deleteRequest}
                                        current={activePages[value]}
                                    />
                                    {friends_requests.sent.count > 10 ?
                                        <Pagination
                                            name="sent"
                                            current={activePages[value]}
                                            onChange={this.changePage}
                                            total={friends_requests.sent.count}
                                            pageCount={10}
                                        />
                                        : null
                                    }
                                </Fragment>

                                :
                                null
                            }
                            {value === 'invited' && friends_requests.invited ?
                                <Fragment>
                                    <InvitedFriends
                                        data={friends_requests.invited}
                                        current={activePages[value]}
                                    />
                                    {friends_requests.invited.count > 10 ?
                                        <Pagination
                                            name="invited"
                                            current={activePages[value]}
                                            onChange={this.changePage}
                                            total={friends_requests.invited.count}
                                            pageCount={10}
                                        />
                                        : null
                                    }
                                </Fragment>
                                :
                                null
                            }

                        </div>
                    </div>
                    {invitation.code !== null ?
                        <InviteCodeBlock  {...invitation} />
                        : null
                    }
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
        getFriendsRequests,
        patchAcceptFriendRequest,
        deleteFriend
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsContent);