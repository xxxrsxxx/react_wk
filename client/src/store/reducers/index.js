import { combineReducers } from 'redux';
import ui from './uiReducer/uiReducer';
import user from './userReducer/userReducer';
import cart from './cartReducer/cartReducer';
const rootReducer = combineReducers({ ui, user, cart });

export default rootReducer;
