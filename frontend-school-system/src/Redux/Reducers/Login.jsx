import { LOGIN_USER_INFO,REMEMBER_ME } from '../Actions/ActionTypes'


const INITIAL_STATE = {
    loginUserInfo: {},
    rememberUserInfo:{
        email:'',
        password:'',
        rememberMe:false
    }
}

const loginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER_INFO:
            return { ...state, loginUserInfo: action.data };
            case REMEMBER_ME:
            return { ...state, rememberUserInfo: action.data };
        default:
            return state;
    }
};
export default loginReducer;