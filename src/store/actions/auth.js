import * as actionType from './actionType';

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
  // localStorage.removeItem('token');
  // localStorage.removeItem('expirationDate');
  // localStorage.removeItem('userId');
  return {
    type: actionType.AUTH_INITIATE_LOGOUT
  };
};

export const logoutSucceed = () =>{
  return {
    type: actionType.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = (expirationTime) => {
  // return dispatch => {
  //   setTimeout(() => {
  //     dispatch(logout());
  //   },expirationTime*1000);
  // };
  return {
    type:actionType.AUTH_CHECK_TIMEOUT,
    expirationTime: expirationTime
  };
};

export const auth = (email, password, isSignUp) => {
  return {
    type: actionType.AUTH_USER,
    email: email,
    password: password,
    isSignUp: isSignUp
  }
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionType.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authCheckState = () => {
  return {
    type: actionType.AUTH_CHECK_STATE
  };
};
