import * as actionType from './actionType';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionType.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionType.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const authFail = (error) => {
  return {
    type: actionType.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  return {
    type: actionType.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    },expirationTime*1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    // ... autthenticate the user
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAcXvvvMM2mDsjaKTfkLet5e8SmEOCLwoE';
    if (!isSignUp) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAcXvvvMM2mDsjaKTfkLet5e8SmEOCLwoE';
    }
    axios.post(url, authData)
    .then(response => {
      console.log(response);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch(err =>{
      console.log(err);
      dispatch(authFail(err.response.data.error));
    })
  };
};
