import { combineReducers } from 'redux';
import ui from './uiReducer/uiReducer';
import user from './userReducer/userReducer';
const rootReducer = combineReducers({ ui, user });

export default rootReducer;
