import axios from 'axios';

export async function login(params) {
  return axios({
    url: '/api/login',
    method: 'post',
    data: params,
  });
}

export async function postUserRegister(params) {
  return axios({
    url: '/api/register',
    method: 'post',
    data: params,
  });
}

export async function postUserLogout() {
  return axios({
    url: '/api/logout',
    method: 'post',
  });
}

export async function getUserProfile() {
  return axios('/api/profile');
}

export async function getTransactions() {
  return axios('/api/transactions')
}

export async function postRefundTransaction(params) {
  return axios({
    url: `/api/transactions/${params.transactionId}/refund`,
    method: 'post',
  });
}

export default {
  postUserRegister,
  postUserLogout,
  getUserProfile,
  getTransactions,
  postRefundTransaction
};
