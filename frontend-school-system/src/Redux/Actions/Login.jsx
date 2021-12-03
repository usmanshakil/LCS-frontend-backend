// action types
import { LOGIN_USER_INFO, REMEMBER_ME } from './ActionTypes'


// saving login user info when user logged in
export function saveLoginUserInfo(data) {
    return ({ type: LOGIN_USER_INFO, data: data })
}

// save login, password and remember me 

export function rememberUser(data) {
    return ({ type: REMEMBER_ME, data: data })
}
