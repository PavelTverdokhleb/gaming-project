import * as types from "../actions/constants";

const INITIAL_STATE = {
    faq: {},
    policy: {},
    terms: {},
    games_list: [],
    game_rules: {},
    error: []
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case types.GET_INFO_SUCCESS :
            let section = action.meta.previousAction.section;
            return {...state, [section] : action.payload.data};
        case types.GET_FAQ_SUCCESS :
            return {...state, faq : action.payload.data};
        case types.GAMES_LIST_SUCCESS :
            return {...state, games_list : action.payload.data};
        case types.GAME_RULES :
            return {...state, error : {}};
        case types.GAME_RULES_SUCCESS :
            return {...state, game_rules : action.payload.data};
        case types.GET_INFO_FAIL :
            return {...state, error : action.error.response.data};
        case types.GET_FAQ_FAIL :
            return {...state, error : action.error.response.data};
        case types.GAMES_LIST_FAIL :
            return {...state, error : action.error.response.data};
        case types.GAME_RULES_FAIL :
            return {...state, error : action.error.response.data};
        default:
            return state;
    }
}