import * as types from './constants.jsx';

//game center actions

export function getUsersOnline() {
    return {
        type: types.USERS_ONLINE,
        payload: {
            client: 'default',
            request: {
                url: `/users-online/`,
                method: "get"
            }
        }
    };
}

export function getCenterInfo() {
    return {
        type: types.CENTER_INFO,
        payload: {
            client: 'default',
            request: {
                url: `/game_center/`,
                method: "get"
            }
        }
    };
}

export function postStartCreateGame(data) {
    return {
        type: types.START_CREATE_GAME,
        payload: {
            client: 'default',
            request: {
                url: `/game_center/`,
                method: "post",
                data
            }
        }
    };
}

export function postUploadResult(data) {
    return {
        type: types.UPLOAD_RESULT,
        payload: {
            client: 'default',
            request: {
                url: `/dispute-center/upload-image/`,
                method: "post",
                data
            }
        }
    };
}

export function deleteSelectFriend() {
    return {
        type: types.DELETE_SELECT_FRIEND,
        payload: {
            client: 'default',
            request: {
                url: `/game_center/select-friend/`,
                method: "delete"
            }
        }
    };
}

export function deleteInviteFriend() {
    return {
        type: types.DELETE_INVITE_FRIEND,
        payload: {
            client: 'default',
            request: {
                url: `/game_center/invite-friend/`,
                method: "delete"
            }
        }
    };
}

export function postSelectFriendForGame(data) {
    return {
        type: types.SELECT_FRIEND_FOR_GAME,
        payload: {
            client: 'default',
            request: {
                url: `/game_center/select-friend/`,
                method: "post",
                data
            }
        }
    };
}

export function postInviteFriendForGame() {
    return {
        type: types.INVITE_FRIEND_FOR_GAME,
        payload: {
            client: 'default',
            request: {
                url: `/game_center/invite-friend/`,
                method: "post"
            }
        }
    };
}

export function getGameFriendRequest(id) {
    return {
        type: types.GAME_FRIEND_REQUEST,
        payload: {
            client: 'default',
            request: {
                url: `/game_center/invite-friend/${id}/`,
                method: "get"
            }
        }
    };
}

export function postGameFriendRequestAccept(id) {
    return {
        type: types.GAME_FRIEND_REQUEST_ACCEPT,
        payload: {
            client: 'default',
            request: {
                url: `/game_center/invite-friend/${id}/`,
                method: "post"
            }
        }
    };
}

export function deleteGameFriendRequestCancel(id) {
    return {
        type: types.GAME_FRIEND_REQUEST_CANCEL,
        payload: {
            client: 'default',
            request: {
                url: `/game_center/invite-friend/${id}/`,
                method: "delete"
            }
        }
    };
}

export function getGameRematchRequest(id) {
    return {
        type: types.GAME_REMATCH_REQUEST,
        payload: {
            client: 'default',
            request: {
                url: `/game_center/rematch/${id}/`,
                method: "get"
            }
        }
    };
}

export function postGameRematchRequestAccept(id) {
    return {
        type: types.GAME_REMATCH_REQUEST_ACCEPT,
        payload: {
            client: 'default',
            request: {
                url: `/game_center/rematch/${id}/`,
                method: "post"
            }
        }
    };
}

export function deleteGameRematchRequestCancel(id) {
    return {
        type: types.GAME_REMATCH_REQUEST_CANCEL,
        payload: {
            client: 'default',
            request: {
                url: `/game_center/rematch/${id}/`,
                method: "delete"
            }
        }
    };
}

export function postStartFrindGame(data) {
    return {
        type: types.START_FRIEND_GAME,
        payload: {
            client: 'default',
            request: {
                url: `/game_center/invite-friend-full/`,
                method: "post",
                data
            }
        }
    };
}