import * as types from "./constants";

export function getChallengesList() {
    return {
        type: types.CHALLENGES_LIST,
        payload: {
            client: 'default',
            request: {
                url: `/me/challenges/`,
                method: "get"
            }
        }
    };
}

export function postChallengeReward(data) {
    return {
        type: types.CHALLENGE_REWARD,
        payload: {
            client: 'default',
            request: {
                url: `/me/claim-challenge/`,
                method: "post",
                data
            }
        }
    };
}
