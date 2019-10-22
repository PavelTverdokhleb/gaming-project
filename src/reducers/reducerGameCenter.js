import * as types from "../actions/constants";

const INITIAL_STATE = {
    users_online: null,
    center_info: {},
    approving_opponent: {},
    search_data: {},
    waiting_for_start: {},
    game_result: {},
    friends: [],
    friend_request: {},
    rematch_request: {},
    error: []
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case types.USERS_ONLINE_SUCCESS :
            return {...state, users_online : action.payload.data.count};
        case types.CENTER_INFO_SUCCESS :
            return {...state, center_info : action.payload.data};
        case types.SET_GAME_DATA :
            return {...state, [action.field] : action.data};
        case types.GAME_FRIEND_REQUEST_SUCCESS :
            return {...state, friend_request : action.payload.data};
        case types.GAME_REMATCH_REQUEST_SUCCESS :
            return {...state, rematch_request : action.payload.data};
        case types.USERS_ONLINE_FAIL :
            return {...state, error : action.error.response.data};
        case types.CENTER_INFO_FAIL :
            return {...state, error : action.error.response.data};
        default:
            return state;
    }
}