import * as types from './constants.jsx';

export function updateProfile(id, data) {
    return {
        type: types.UPDATE_PROFILE,
        id,
        data
    }
}

export function updateUserProfile(data) {
    return {
        type: types.UPDATE_USER_PROFILE,
        data
    }
}

export function updateIntroPlatform(id, data) {
    return {
        type: types.UPDATE_INTRO_PPLATFORM,
        id,
        data
    }
}

export function updateIntro(data) {
    return {
        type: types.UPDATE_INTRO,
        data
    }
}

//game actions

export function setGameData(field, data) {
    return {
        type: types.SET_GAME_DATA,
        data,
        field
    }
}

//wallet actions

export function setWalletData(field, data) {
    return {
        type: types.SET_WALLET_DATA,
        data,
        field
    }
}

