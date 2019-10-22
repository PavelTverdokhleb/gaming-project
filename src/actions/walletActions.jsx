import * as types from './constants.jsx';

//wallet actions

export function postUsePromocode(data) {
    return {
        type: types.USE_PROMOCODE,
        payload: {
            client: 'default',
            request: {
                url: `/wallet/apply-invitation/`,
                method: "post",
                data
            }
        }
    };
}

export function getTransactions(page) {
    return {
        type: types.TRANSACTIONS,
        payload: {
            client: 'default',
            request: {
                url: `/wallet/transactions/?page=${page}&page_size=12`,
                method: "get"
            }
        }
    };
}

export function getWalletGames(page) {
    return {
        type: types.WALLET_GAMES,
        payload: {
            client: 'default',
            request: {
                url: `/wallet/games/?page=${page}&page_size=12`,
                method: "get"
            }
        }
    };
}

export function postCreateDeposit(data) {
    return {
        type: types.CREATE_DEPOSIT,
        payload: {
            client: 'default',
            request: {
                url: `/paypal/create-payment/`,
                method: "post",
                data
            }
        }
    };
}

export function postExecuteDeposit(data) {
    return {
        type: types.EXECUTE_DEPOSIT,
        payload: {
            client: 'default',
            request: {
                url: `/paypal/execute-payment/`,
                method: "post",
                data
            }
        }
    };
}

export function postCreateWithdraw(data) {
    return {
        type: types.CREATE_WITHDRAW,
        payload: {
            client: 'default',
            request: {
                url: `/paypal/withdraw/`,
                method: "post",
                data
            }
        }
    };
}