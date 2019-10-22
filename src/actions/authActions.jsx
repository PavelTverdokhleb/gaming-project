import * as types from './constants.jsx';

//authentication actions

export function postLogin(data) {
    return {
        type: types.LOGIN,
        payload: {
            client: 'default',
            request: {
                url: `/auth/signin/`,
                method: "post",
                data
            }
        }
    };
}

export function postRegister(data) {
    return {
        type: types.REGISTER,
        payload: {
            client: 'default',
            request: {
                url: `/auth/signup/`,
                method: "post",
                data
            }
        }
    };
}

export function postRegisterConfirm(data) {
    return {
        type: types.REGISTER_CONFIRM,
        payload: {
            client: 'default',
            request: {
                url: `/auth/signup/confirm/`,
                method: "post",
                data
            }
        }
    };
}

export function postRecoveryEmail(data) {
    return {
        type: types.RECOVERY_EMAIL,
        payload: {
            client: 'default',
            request: {
                url: `/auth/password/recover/`,
                method: "post",
                data
            }
        }
    };
}

export function postRecoveryConfirm(data) {
    return {
        type: types.RECOVERY_CONFIRM,
        payload: {
            client: 'default',
            request: {
                url: `/auth/password/recover/confirm/`,
                method: "post",
                data
            }
        }
    };
}

export function postRecoveryNewPassword(data) {
    return {
        type: types.RECOVERY_NEW_PASSWORD,
        payload: {
            client: 'default',
            request: {
                url: `/auth/password/recover/set-new/`,
                method: "post",
                data
            }
        }
    };
}

export function postResendCode(data) {
    return {
        type: types.RESEND_CODE,
        payload: {
            client: 'default',
            request: {
                url: `/auth/resend-email/`,
                method: "post",
                data
            }
        }
    };
}

export function postLoginTwitch(data) {
    return {
        type: types.LOGIN_TWITCH,
        payload: {
            client: 'default',
            request: {
                url: `/auth/signin/twitch/`,
                method: "post",
                data
            }
        }
    };
}

export function postLoginFacebook(data) {
    return {
        type: types.LOGIN_FACEBOOK,
        payload: {
            client: 'default',
            request: {
                url: `/auth/signin/facebook/`,
                method: "post",
                data
            }
        }
    };
}

export function postFacebookEmail(data) {
    return {
        type: types.FACEBOOK_EMAIL,
        payload: {
            client: 'default',
            request: {
                url: `/auth/signin/facebook/enter-email/`,
                method: "post",
                data
            }
        }
    };
}

export function postFacebookEmailConfirm(data) {
    return {
        type: types.FACEBOOK_EMAIL_CONFIRM,
        payload: {
            client: 'default',
            request: {
                url: `/auth/signin/facebook/confirm-email/`,
                method: "post",
                data
            }
        }
    };
}