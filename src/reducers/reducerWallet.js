import * as types from "../actions/constants";

const INITIAL_STATE = {
    transactions: {results:[]},
    games: {results:[]},
    balance: {},
    promocode_invitation: null,
    payment_cancel: null,
    payment_success: null,
    error: []
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case types.TRANSACTIONS_SUCCESS :
            let transactionObj = {
                ...state.transactions,
                ...action.payload.data,
                results: [...state.transactions.results, ...action.payload.data.results]
            };
            let balanceObj = {
                balance: action.payload.data.balance,
                withdraw: action.payload.data.withdraw
            };
            return {...state, transactions : transactionObj, balance: balanceObj, promocode_invitation: action.payload.data.can_apply_invitation};
        case types.WALLET_GAMES_SUCCESS :
            console.log(state.games.results, action.payload.data.results);
            let gamesObj = {
                ...state.games,
                ...action.payload.data,
                results: [...state.games.results, ...action.payload.data.results]
            };
            let balanceObj2 = {
                balance: action.payload.data.balance,
                withdraw: action.payload.data.withdraw
            };

            return {...state, games : gamesObj, balance: balanceObj2, promocode_invitation: action.payload.data.can_apply_invitation};
        case types.SET_WALLET_DATA :
            return {...state, [action.field] : action.data};


        case types.TRANSACTIONS_FAIL :
            return {...state, error : action.error.response.data};
        case types.WALLET_GAMES_FAIL :
            return {...state, error : action.error.response.data};
        case types.CREATE_WITHDRAW_FAIL :
            return {...state, error : action.error.response.data};
        default:
            return state;
    }
}