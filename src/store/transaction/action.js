import {
  TRANSACTION_LIST_REQUEST,
  TRANSACTION_LIST_FAILURE,
  TRANSACTION_LIST_SUCCESS,
  REFUND_TRANSACTION_REQUEST,
  REFUND_TRANSACTION_FAILURE,
  REFUND_TRANSACTION_SUCCESS,
} from './constants';
import { getTransactions, postRefundTransaction } from '../../api';

const transactionListRequest = () => {
  return {
    type: TRANSACTION_LIST_REQUEST,
    isLoading: true,
  };
};

const transactionListFailure = (payload) => {
  return {
    type: TRANSACTION_LIST_FAILURE,
    isLoading: false,
    payload,
  };
};

const transactionListSuccess = (payload) => {
  return {
    type: TRANSACTION_LIST_SUCCESS,
    isLoading: false,
    payload,
  };
};

const refundTransactionRequest = () => {
  return {
    type: REFUND_TRANSACTION_REQUEST,
    isLoading: true,
  };
};

const refundTransactionFailure = (payload) => {
  return {
    type: REFUND_TRANSACTION_FAILURE,
    isLoading: false,
    payload,
  };
};

const refundTransactionSuccess = (payload) => {
  console.log(payload)
  return {
    type: REFUND_TRANSACTION_SUCCESS,
    isLoading: false,
    payload,
  };
};

export const fetchTransactionList = (params) => {
  return async (dispatch) => {
    dispatch(transactionListRequest());
    try {
      const response = await getTransactions(params);

      dispatch(transactionListSuccess(response.data));
    } catch (error) {
      dispatch(transactionListFailure(error));
    }
  };
};

export const refundTransaction = (params) => {
  return async (dispatch) => {
    dispatch(refundTransactionRequest());
    try {
      const response = await postRefundTransaction(params);

      dispatch(refundTransactionSuccess(response.data));
    } catch (error) {
      dispatch(refundTransactionFailure(error));
    }
  };
}
