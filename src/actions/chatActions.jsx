import * as types from './constants.jsx';

//chat actions

export function getChatsList() {
    return {
        type: types.GET_CHATS_LIST,
        payload: {
            client: 'default',
            request: {
                url: `/chat/private-room/`,
                method: "get"
            }
        }
    };
}

export function selectChat(data, load) {
    return {
        type: types.SELECT_CHAT,
        data,
        load
    }
}

export function updateMessageList(data) {
    return {
        type: types.UPDATE_MESSAGE_LIST,
        data
    }
}

export function getChatMessages(query) {
    return {
        type: types.GET_CHAT_MESSAGES,
        payload: {
            client: 'default',
            request: {
                url: `/chat/private-message/${query}`,
                method: "get"
            }
        }
    };
}

export function postChatImage(data) {
    return {
        type: types.POST_CHAT_IMAGE,
        payload: {
            client: 'default',
            request: {
                url: `/chat/image/`,
                method: "post",
                data
            }
        }
    };
}

export function updateChatsRead(id) {
    return {
        type: types.UPDATE_CHATS_READ,
        id
    }
}

export function getChatUsersStatus() {
    return {
        type: types.GET_CHAT_USERS_STATUS,
        payload: {
            client: 'default',
            request: {
                url: `/chat/user-online/`,
                method: "get"
            }
        }
    };
}