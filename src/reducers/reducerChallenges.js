import * as types from "../actions/constants";

const INITIAL_STATE = {
    challenges_list: {loaded: false, results: []},
    error: []
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case types.CHALLENGES_LIST_SUCCESS :
            return {...state, challenges_list: {loaded: true, results: action.payload.data}};
        case types.CHALLENGE_REWARD_SUCCESS :
            return {...state, challenges_list: {loaded: true, results: action.payload.data}};
        case types.CHALLENGES_LIST_FAIL :
            return {...state, error : action.error.response.data};
        default:
            return state;
    }
}