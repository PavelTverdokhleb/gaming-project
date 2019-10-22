import * as types from "../actions/constants";

const INITIAL_STATE = {
    chats_list: [],
    chat_messages: {results: [], load: false},
    current_chat: null,
    error: []
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case types.GET_CHATS_LIST_SUCCESS :
            return {...state, chats_list : action.payload.data};

        case types.GET_CHAT_MESSAGES_SUCCESS :
            let chatsList = state.chats_list.map(el => {
                if(el.id === state.current_chat.room_id) {
                    return {...el, unread_count: 0};
                } else {
                    return el;
                }
            });
            return {...state, chat_messages : {...action.payload.data, results: [...state.chat_messages.results, ...action.payload.data.results], load: true}, chats_list: chatsList };

        case types.UPDATE_MESSAGE_LIST :
            let objMessages = state.chat_messages;
            let objChatList = state.chats_list;
            let objCurrentChat = state.current_chat;
            const { room_id, receiver_id, is_mine } = action.data;

            if(state.current_chat && state.current_chat.room_id) {
                if(objMessages && objMessages.results && state.current_chat.room_id === room_id) {
                    objMessages.results = [action.data, ...objMessages.results];
                }
                objChatList = state.chats_list.map(el => {
                    if(el.id === room_id) {
                        return {...el, last_message: action.data, unread_count: state.current_chat.room_id !== room_id ? el.unread_count + 1 : el.unread_count};
                    } else {
                        return el;
                    }
                });
            } else if(state.current_chat && state.current_chat.id && state.current_chat.id === receiver_id) {
                objCurrentChat = {...objCurrentChat, room_id};
                let obj = {
                    unread_count: 0,
                    id: room_id,
                    last_message: {
                        create_date: action.data.create_date,
                        text: action.data.text
                    },
                    user: {
                        avatar: state.current_chat.avatar,
                        is_online: false,
                        username: state.current_chat.username,
                        id: state.current_chat.id
                    }
                };
                objChatList = [obj, ...objChatList];
            } else {
                objChatList = state.chats_list.map(el => {
                    if(el.id === room_id) {
                        return {...el, last_message: action.data, unread_count: !is_mine ? el.unread_count + 1 : 0};
                    } else {
                        return el;
                    }
                });
            }


            return {...state, chat_messages : objMessages, chats_list: objChatList, current_chat: objCurrentChat} ;

        case types.SELECT_CHAT :
            let objMessagesSelect = action.load ? state.chat_messages : {results:[], load: !action.data.room_id};
            return {...state, current_chat : action.data, chat_messages: objMessagesSelect };

        case types.GET_CHAT_USERS_STATUS_SUCCESS :
            let arrayChatsListStatus = state.chats_list.map(el => {
                let idx = action.payload.data.findIndex(elem => elem.id === el.user.id);
                if(idx !== -1) {
                    return {...el, user: {...el.user, is_online: action.payload.data[idx].is_online}};
                } else {
                    return el;
                }
            });
            return {...state, chats_list: arrayChatsListStatus };

        case types.UPDATE_CHATS_READ :
            let arrayChatsList = state.chats_list;
            arrayChatsList = arrayChatsList.map(el => {
                if(el.id === Number(action.id)) {
                    return {...el, unread_count: 0};
                } else {
                    return el;
                }
            });
            return {...state, chats_list: arrayChatsList };

        case types.GET_CHATS_LIST_FAIL :
            return {...state, error : action.error.response.data};
        default:
            return state;
    }
}