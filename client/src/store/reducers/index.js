import { combineReducers } from 'redux';
import user from './userReducer/userReducer';
const rootReducer = combineReducers({ user });

export default rootReducer;
