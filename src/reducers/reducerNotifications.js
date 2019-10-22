import * as types from "../actions/constants";

const INITIAL_STATE = {
    notifications_list: {},
    notifications_sections: {},
    error: []
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case types.SET_NOTIFICATIONS_SECTIONS :
            return {...state, notifications_sections : action.data};
        case types.GET_NOTIFICATIONS_SUCCESS :
            return {...state, notifications_list : action.payload.data};
        case types.CLEAR_NOTIFICATIONS :
            return {...state, notifications_list : {}};
        case types.UPDATE_NOTIFICATIONS_SECTIONS_SUCCESS :
            return {...state, notifications_sections : action.payload.data};
        case types.CREDITS_VIDEO_FAIL :
            return {...state, error : action.error.response.data};
        default:
            return state;
    }
}