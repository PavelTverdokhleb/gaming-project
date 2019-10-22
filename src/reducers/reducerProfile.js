import * as types from "../actions/constants";

const INITIAL_STATE = {
    my_profile: {},
    user_profile: {},
    user_profile_error: [],
    error: []
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case types.PROFILE_SUCCESS :
            return {...state, my_profile : action.payload.data};
        case types.UPDATE_PROFILE :
            let updateProfile = {...state.my_profile};
            updateProfile.platforms = updateProfile.platforms.map(item => {
                if(item.id === action.id) return {...item, ...action.data};
                else return item;
            });
            return {...state, my_profile : updateProfile};
        case types.USER_PROFILE_SUCCESS :
            return {...state, user_profile : action.payload.data};
        case types.UPDATE_USER_PROFILE :
            let updateUserProfile = {...state.user_profile, ...action.data};
            return {...state, user_profile : updateUserProfile};
        case types.PROFILE_FAIL :
            return {...state, error : action.error.response.data};
        case types.USER_PROFILE_FAIL :
            return {...state, user_profile_error : action.error.response.data};
        default:
            return state;
    }
}