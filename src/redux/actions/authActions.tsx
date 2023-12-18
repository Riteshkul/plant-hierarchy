// authActions.js
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const REGISTER_START = 'REGISTER_START';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const loginStart = () => ({ type: LOGIN_START });
export const loginSuccess = (user: any) => ({ type: LOGIN_SUCCESS, payload: user });
export const loginFailure = (error: any) => ({ type: LOGIN_FAILURE, payload: error });
export const logout = () => ({ type: LOGOUT });

export const registerStart = () => ({ type: REGISTER_START });
export const registerSuccess = (user: any) => ({ type: REGISTER_SUCCESS, payload: user });
export const registerFailure = (error: any) => ({ type: REGISTER_FAILURE, payload: error });
