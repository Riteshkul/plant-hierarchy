
import { createStore, combineReducers } from 'redux';
// import authReducer from '../reducers/authReducer';
import authReducer from './reducers/authReducer';
const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers as needed
});

const store = createStore(rootReducer);

export default store;
