import * as types from './constants.jsx';

//leaderboard actions

export function getLeaderboard() {
    return {
        type: types.LEADERBOARD,
        payload: {
            client: 'default',
            request: {
                url: `/leaderboard/`,
                method: "get"
            }
        }
    };
}
