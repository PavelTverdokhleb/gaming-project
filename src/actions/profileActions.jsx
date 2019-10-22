import * as types from './constants.jsx';

//profile actions

export function getProfile() {
    return {
        type: types.PROFILE,
        payload: {
            client: 'default',
            request: {
                url: `/profile/`,
                method: "get"
            }
        }
    };
}

export function patchProfilePlatform(id, data) {
    return {
        type: types.PROFILE_PLATFORM,
        payload: {
            client: 'default',
            request: {
                url: `/profile/platform/${id}/`,
                method: "patch",
                data
            }
        }
    };
}

export function getUserProfile(id) {
    return {
        type: types.USER_PROFILE,
        payload: {
            client: 'default',
            request: {
                url: `/user/profile/${id}/`,
                method: "get"
            }
        }
    };
}