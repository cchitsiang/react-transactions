import {
  TRANSACTION_LIST_REQUEST,
  TRANSACTION_LIST_FAILURE,
  TRANSACTION_LIST_SUCCESS,
  REFUND_TRANSACTION_REQUEST,
  REFUND_TRANSACTION_FAILURE,
  REFUND_TRANSACTION_SUCCESS,
} from './constants';

const initialState = {isLoading: false};

function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case TRANSACTION_LIST_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case TRANSACTION_LIST_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
      });
    case TRANSACTION_LIST_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        ...action.payload,
      });
    case REFUND_TRANSACTION_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case REFUND_TRANSACTION_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
      });
    case REFUND_TRANSACTION_SUCCESS:
      var transactions = state.data;
      if (transactions) {
        transactions = transactions.map(
          transaction => {
            if (action.payload.data && transaction.transactionID === action.payload.data.transactionID) {
              //TODO: Move REFUNDED to constant
              transaction.status = 'REFUNDED';
            }
            return transaction;
          }
        );
      }
      return Object.assign({}, state, {
        isLoading: false,
        data: transactions
      });
    default:
      return state;
  }
}

export default transactionReducer;
