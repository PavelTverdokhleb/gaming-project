import * as types from './constants.jsx';

//user actions

export function getMyProfile(data) {
    return {
        type: types.MY_PROFILE,
        payload: {
            client: 'default',
            request: {
                url: `/me/`,
                method: "get"
            }
        }
    };
}

export function patchMyProfile(data) {
    return {
        type: types.EDIT_MY_PROFILE,
        payload: {
            client: 'default',
            request: {
                url: `/me/`,
                method: "patch",
                data
            }
        }
    };
}

export function postChangePassword(data) {
    return {
        type: types.CHANGE_PASSWORD,
        payload: {
            client: 'default',
            request: {
                url: `/auth/password/change/`,
                method: "post",
                data
            }
        }
    };
}

export function getPreferences() {
    return {
        type: types.PREFERENCES,
        payload: {
            client: 'default',
            request: {
                url: `/me/preferences/`,
                method: "get"
            }
        }
    };
}

export function patchPreferences(data) {
    return {
        type: types.SET_PREFERENCES,
        payload: {
            client: 'default',
            request: {
                url: `/me/preferences/`,
                method: "patch",
                data
            }
        }
    };
}