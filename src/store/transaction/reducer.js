import {
  TRANSACTION_LIST_REQUEST,
  TRANSACTION_LIST_FAILURE,
  TRANSACTION_LIST_SUCCESS,
  REFUND_TRANSACTION_REQUEST,
  REFUND_TRANSACTION_FAILURE,
  REFUND_TRANSACTION_SUCCESS,
} from './constants';

const initialState = {};

function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case TRANSACTION_LIST_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    case TRANSACTION_LIST_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    case TRANSACTION_LIST_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        ...action.payload,
      });
    case REFUND_TRANSACTION_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    case REFUND_TRANSACTION_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
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
        isLoading: action.isLoading,
        data: transactions
      });
    default:
      return state;
  }
}

export default transactionReducer;
