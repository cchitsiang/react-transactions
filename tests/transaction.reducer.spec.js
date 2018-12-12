import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import reducer from '../src/store/transaction/reducer';
import { fetchTransactionList, refundTransaction } from '../src/store/transaction/action';

import {
  TRANSACTION_LIST_REQUEST,
  TRANSACTION_LIST_FAILURE,
  TRANSACTION_LIST_SUCCESS,
  REFUND_TRANSACTION_REQUEST,
  REFUND_TRANSACTION_FAILURE,
  REFUND_TRANSACTION_SUCCESS,
} from '../src/store/transaction/constants';

const isEmpty = (element) => {
  if (element instanceof Array) {
    return element.length === 0;
  } else {
    return !element || Object.keys(element).length === 0;
  }
}

const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

const initialState = {
  isLoading: false
};

let httpMock, store;
beforeEach(() => {
  httpMock = new MockAdapter(axios);
  const mockStore = configureMockStore();
  store = mockStore({});
});

describe('Transaction reducer tests', () => {
  describe('Common', () => {
    it('should return the initial state', () => {
      const actualInitialState = reducer(undefined, {});
      expect(actualInitialState).toMatchObject(initialState);
      expect(isEmpty(actualInitialState.transaction));
    });
  });

  describe('Requests', () => {
    it('should handle transaction list request', () => {
      expect(reducer(initialState, { type: TRANSACTION_LIST_REQUEST })).toEqual({
        ...initialState,
        isLoading: true,
      });
    });

    it('should handle transaction list failure', () => {
      expect(reducer(initialState, { type: TRANSACTION_LIST_FAILURE })).toEqual({
        ...initialState,
        isLoading: false,
      });
    });

    it('should handle transaction list success', () => {
      expect(reducer(initialState, { type: TRANSACTION_LIST_SUCCESS })).toEqual({
        ...initialState,
        isLoading: false,
      });
    });

    it('should handle refund transaction request', () => {
      expect(reducer(initialState, { type: REFUND_TRANSACTION_REQUEST })).toEqual({
        ...initialState,
        isLoading: true,
      });
    });

    it('should handle refund transaction failure', () => {
      expect(reducer(initialState, { type: REFUND_TRANSACTION_FAILURE })).toEqual({
        ...initialState,
        isLoading: false,
      });
    });

    it('should handle refund transaction success', () => {
      expect(reducer(initialState, { type: REFUND_TRANSACTION_SUCCESS, payload: { transactionID: 'T123' } })).toEqual({
        ...initialState,
        isLoading: false
      });
    });
  });
});

describe('Transaction action tests', () => {
  describe('when user navigate to transaction list page', () => {
    it('should fires a transaction list request action', async () => {
      httpMock.onGet('/api/transactions').reply(200, {
        status: 200,
        statusText: 'ok',
        data: [{amount: 168,
          amountText: "RM 168.00",
          createdAt: 1544235050,
          currency: "MYR",
          description: "Ride",
          paymentMethod: "Card",
          status: "OK",
          statusCode: 1,
          transactionDate: "2018-12-7",
          transactionID: "T22060a95-5bb8-494b-b9b1-b672af5c4db6",
          transactionType: "Payment"
        }]
      });

      fetchTransactionList()(store.dispatch);
      await flushAllPromises();

      expect(store.getActions()).toEqual([
        {"type": TRANSACTION_LIST_REQUEST},
        {"payload": {"data": [{"amount": 168, "amountText": "RM 168.00", "createdAt": 1544235050, "currency": "MYR", "description": "Ride", "paymentMethod": "Card", "status": "OK", "statusCode": 1, "transactionDate": "2018-12-7", "transactionID": "T22060a95-5bb8-494b-b9b1-b672af5c4db6", "transactionType": "Payment"}], "status": 200, "statusText": "ok"}, "type": TRANSACTION_LIST_SUCCESS}])
    });
  });

  describe('when user refund transaction', () => {
    it('should fires a refund transaction action', async () => {
      httpMock.onPost('/api/transactions/T22060a95-5bb8-494b-b9b1-b672af5c4db6/refund').reply(200, {
        status: 200,
        statusText: 'ok',
        data: {
          transactionID: "T22060a95-5bb8-494b-b9b1-b672af5c4db6"
        }
      });

      refundTransaction({transactionId: "T22060a95-5bb8-494b-b9b1-b672af5c4db6"})(store.dispatch);
      await flushAllPromises();
      expect(store.getActions()).toEqual([
        {"type": REFUND_TRANSACTION_REQUEST},
        {"payload": {"data": {"transactionID": "T22060a95-5bb8-494b-b9b1-b672af5c4db6"}, "status": 200, "statusText": "ok"}, "type": REFUND_TRANSACTION_SUCCESS}])
    });
  });

})
