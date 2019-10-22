import * as types from "../actions/constants";

const INITIAL_STATE = {
    leaderboard_list: {},
    error: []
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case types.LEADERBOARD_SUCCESS :
            let leaderboardList = action.payload.data;
            let [x,y,z] = leaderboardList.top3;
            leaderboardList.top3 = [{...y, place: 2},{...x, place: 1},{...z, place: 3}];
            return {...state, leaderboard_list: leaderboardList};
        case types.LEADERBOARD_FAIL :
            return {...state, error : action.error.response.data};
        default:
            return state;
    }
}