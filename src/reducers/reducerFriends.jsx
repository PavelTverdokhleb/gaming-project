import * as types from "../actions/constants";
import { checkActionForParam } from "../helpers/functions";

const INITIAL_STATE = {
    friends_list: {},
    friends_requests: {},
    search_friends: {results:[]},
    search_users: {results:[]},
    invitation: {},
    error: []
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case types.FRIENDS_LIST_SUCCESS :
            let friendsPage = checkActionForParam(action, 'page');
            let friends = {...action.payload.data};
            if(friendsPage !== null && friendsPage !== '1') {
                friends.results = [...state.friends_list.results, ...action.payload.data.results];
            }
            return {...state, friends_list: friends};
        case types.SEARCH_FRIENDS_SUCCESS :
            let searchFriendsPage = checkActionForParam(action, 'page');
            let searchFriends = {...action.payload.data};
            if(searchFriendsPage !== null && searchFriendsPage !== '1') {
                searchFriends.results = [...state.search_friends.results, ...action.payload.data.results];
            }
            return {...state, search_friends: searchFriends};
        case types.SEARCH_USERS_SUCCESS :
            let searchUsersPage = checkActionForParam(action, 'page');
            let searchUsers = {...action.payload.data};
            if(searchUsersPage !== null && searchUsersPage !== '1') {
                searchUsers.results = [...state.search_users.results, ...action.payload.data.results];
            }
            return {...state, search_users: searchUsers};
        case types.FRIENDS_REQUESTS_SUCCESS :
            let params = new URLSearchParams(action.meta.previousAction.payload.request.url.split('?')[1]);
            let type = params.get('type');
            let obj = { ...state.friends_requests, [type]: action.payload.data};
            return {...state, friends_requests: obj, invitation:{code: action.payload.data.invitation, reward: action.payload.data.invitation_reward}};
        case types.FRIENDS_LIST_FAIL :
            return {...state, error : action.error.response.data};
        case types.SEARCH_FRIENDS_FAIL :
            return {...state, error : action.error.response.data};
        case types.SEARCH_USERS_FAIL :
            return {...state, error : action.error.response.data};
        case types.FRIENDS_REQUESTS_FAIL :
            return {...state, error : action.error.response.data};
        default:
            return state;
    }
}