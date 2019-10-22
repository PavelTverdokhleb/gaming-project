import * as types from "../actions/constants";

const INITIAL_STATE = {
    info: {},
    platforms: [],
    video: {},
    error: []
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case types.INTRO_SUCCESS :
            localStorage.intro = "showed";
            return {...state, info : action.payload.data};
        case types.PATCH_INTRO_SUCCESS :
            return {...state, info : action.payload.data};
        case types.UPDATE_INTRO :
            localStorage.intro = "showed";
            return {...state, info : action.data};
        case types.INTRO_PLATFORMS_SUCCESS :
            return {...state, platforms : action.payload.data};
        case types.UPDATE_INTRO_PPLATFORM :
            let updateIntroPlatform = [...state.platforms];
            updateIntroPlatform = updateIntroPlatform.map(item => {
                if(item.id === action.id) return {...item, ...action.data};
                else return item;
            });
            return {...state, platforms : updateIntroPlatform};
        case types.CREDITS_VIDEO_SUCCESS :
            return {...state, video : action.payload.data};
        case types.INTRO_FAIL :
            return {...state, error : action.error.response.data};
        case types.INTRO_PLATFORMS_FAIL :
            return {...state, error : action.error.response.data};
        case types.CREDITS_VIDEO_FAIL :
            return {...state, error : action.error.response.data};
        default:
            return state;
    }
}