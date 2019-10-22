import * as types from './constants.jsx';

//dispute actions

export function getDisputesList(page) {
    return {
        type: types.DISPUTES_LIST,
        payload: {
            client: 'default',
            request: {
                url: `/dispute/?page=${page}&page_size=9`,
                method: "get"
            }
        }
    };
}

export function getDisputeDetail(id) {
    return {
        type: types.DISPUTE_DETAIL,
        payload: {
            client: 'default',
            request: {
                url: `/dispute/${id}/`,
                method: "get"
            }
        }
    };
}

export function getDisputeMessages(query) {
    return {
        type: types.DISPUTE_MESSAGES,
        payload: {
            client: 'default',
            request: {
                url: `/chat/dispute-message/${query}`,
                method: "get"
            }
        }
    };
}

export function updateDisputeMessageList(data) {
    return {
        type: types.UPDATE_DISPUTE_MESSAGE_LIST,
        data
    }
}

export function updateDisputeResult(data) {
    return {
        type: types.UPDATE_DISPUTE_RESULT,
        data
    }
}