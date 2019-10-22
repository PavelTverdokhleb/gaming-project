import * as types from './constants.jsx';

//friends actions

export function getFriendsList(query) {
    return {
        type: types.FRIENDS_LIST,
        payload: {
            client: 'default',
            request: {
                url: `/user/my_friends/?${query}`,
                method: "get"
            }
        }
    };
}

export function getSearchFriends(query) {
    return {
        type: types.SEARCH_FRIENDS,
        payload: {
            client: 'default',
            request: {
                url: `/user/friends/search/?${query}`,
                method: "get"
            }
        }
    };
}

export function getSearchUsers(query) {
    return {
        type: types.SEARCH_USERS,
        payload: {
            client: 'default',
            request: {
                url: `/user/search/?${query}`,
                method: "get"
            }
        }
    };
}

export function postAddToFriends(data) {
    return {
        type: types.ADD_TO_FRIENDS,
        payload: {
            client: 'default',
            request: {
                url: `/user/friends/`,
                method: "post",
                data
            }
        }
    };
}

export function getFriendsRequests(params) {
    return {
        type: types.FRIENDS_REQUESTS,
        payload: {
            client: 'default',
            request: {
                url: `/user/friends/${params}`,
                method: "get"
            }
        }
    };
}

export function patchAcceptFriendRequest(id, data) {
    return {
        type: types.ACCEPT_FRIEND_REQUEST,
        payload: {
            client: 'default',
            request: {
                url: `/user/friends/${id}/`,
                method: "patch",
                data
            }
        }
    };
}

export function deleteFriend(id) {
    return {
        type: types.REMOVE_FRIEND,
        payload: {
            client: 'default',
            request: {
                url: `/user/friends/${id}/`,
                method: "delete"
            }
        }
    };
}