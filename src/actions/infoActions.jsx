import * as types from './constants.jsx';

//info actions

export function getInfo(section) {
    return {
        type: types.GET_INFO,
        payload: {
            client: 'default',
            request: {
                url: `/staticpage/${section}/`,
                method: "get"
            }
        },
        section
    };
}

export function getFaq() {
    return {
        type: types.GET_FAQ,
        payload: {
            client: 'default',
            request: {
                url: `/faqs/`,
                method: "get"
            }
        }
    };
}

export function postSupport(data) {
    return {
        type: types.SUPPORT,
        payload: {
            client: 'default',
            request: {
                url: `/support/message/`,
                method: "post",
                data
            }
        }
    };
}

export function getGamesList() {
    return {
        type: types.GAMES_LIST,
        payload: {
            client: 'default',
            request: {
                url: `/game/`,
                method: "get"
            }
        }
    };
}

export function getGameRules(id) {
    return {
        type: types.GAME_RULES,
        payload: {
            client: 'default',
            request: {
                url: `/game/rules/?game=${id}`,
                method: "get"
            }
        }
    };
}