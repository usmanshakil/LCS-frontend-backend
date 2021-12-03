import { combineReducers } from 'redux'
//Reducer
import reducer from './Demo';
import loginReducer from './Login';
import adminReducer from './Admin';
import popUpModalsReducer from './PopUpModals'



const appReducer = combineReducers({
    reducer,
    loginReducer,
    adminReducer,
    popUpModalsReducer
});

export default appReducer;