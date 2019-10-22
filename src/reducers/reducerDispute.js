import * as types from "../actions/constants";

const INITIAL_STATE = {
    disputes_list: {loaded: false, results:[]},
    dispute_detail: {},
    dispute_messages: {results: [], load: false},
    error: {}
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case types.DISPUTES_LIST_SUCCESS :
            return {...state, disputes_list: {loaded: true, ...action.payload.data}};
        case types.DISPUTE_DETAIL_SUCCESS :
            return {...state, dispute_detail: action.payload.data};
        case types.DISPUTE_MESSAGES_SUCCESS :
            return {...state, dispute_messages: {load: true, ...action.payload.data}};

        case types.UPDATE_DISPUTE_MESSAGE_LIST :
            let objMessages = state.dispute_messages;

            if(objMessages && objMessages.results) {
                objMessages.results = [action.data, ...objMessages.results];
            }

            return {...state, dispute_messages : objMessages} ;

        case types.UPDATE_DISPUTE_RESULT :
            let objDisputeDetail = state.dispute_detail;

            if(objDisputeDetail && objDisputeDetail.id) {
                objDisputeDetail.resolved = action.data.resolved;
                objDisputeDetail.game_lobby.my_result = action.data.my_result;
            }

            return {...state, dispute_detail : objDisputeDetail} ;



        case types.DISPUTES_LIST_FAIL :
            return {...state, error : action.error.response.data};
        case types.DISPUTE_DETAIL_FAIL :
            return {...state, error : action.error.response.data};
        default:
            return state;
    }
}