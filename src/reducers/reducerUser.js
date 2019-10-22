import * as types from "../actions/constants";

const INITIAL_STATE = {
    user_info: {},
    preferences: {},
    error: []
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case types.MY_PROFILE_SUCCESS :
            return {...state, user_info : action.payload.data};
        case types.EDIT_MY_PROFILE_SUCCESS :
            return {...state, user_info : action.payload.data};
        case types.PREFERENCES_SUCCESS :
            return {...state, preferences : action.payload.data};
        case types.SET_PREFERENCES_SUCCESS :
            return {...state, preferences : action.payload.data};
        case types.MY_PROFILE_FAIL :
            return {...state, error : action.error.response.data};
        case types.EDIT_MY_PROFILE_FAIL :
            return {...state, error : action.error.response.data};
        case types.PREFERENCES_FAIL :
            return {...state, error : action.error.response.data};
        case types.SET_PREFERENCES_FAIL :
            return {...state, error : action.error.response.data};
        default:
            return state;
    }
}