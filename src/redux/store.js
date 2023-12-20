
import { createStore, combineReducers,applyMiddleware } from 'redux';
import authReducer from './reducers/authReducer';
import { thunk } from 'redux-thunk';
const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers as needed
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
