// authReducer.js
import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
} from '../actions/authActions';

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOGIN_START:
        case REGISTER_START:
            return { ...state, loading: true, error: null };

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return { ...state, loading: false, isAuthenticated: true, user: action.payload, error: null };

        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case LOGOUT:
            return { ...state, isAuthenticated: false, user: null };

        default:
            return state;
    }
};

export default authReducer;
