import * as types from './constants.jsx';

//intro actions

export function getIntro() {
    return {
        type: types.INTRO,
        payload: {
            client: 'default',
            request: {
                url: `/intro/status/`,
                method: "get"
            }
        }
    };
}

export function getIntroPlatforms() {
    return {
        type: types.INTRO_PLATFORMS,
        payload: {
            client: 'default',
            request: {
                url: `/intro/platforms/`,
                method: "get"
            }
        }
    };
}

export function patchIntroPlatform(id, data) {
    return {
        type: types.INTRO_PATCH_PLATFORM,
        payload: {
            client: 'default',
            request: {
                url: `/intro/platforms/${id}/`,
                method: "patch",
                data
            }
        }
    };
}

export function getCreditsVideo() {
    return {
        type: types.CREDITS_VIDEO,
        payload: {
            client: 'default',
            request: {
                url: `/intro/video/`,
                method: "get"
            }
        }
    };
}

export function patchIntro(data) {
    return {
        type: types.PATCH_INTRO,
        payload: {
            client: 'default',
            request: {
                url: `/intro/status/`,
                method: "patch",
                data
            }
        }
    };
}