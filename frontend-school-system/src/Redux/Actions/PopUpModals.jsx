import { SHOW_COOKIE_POLICY } from './ActionTypes';



// when user visit first time show cookie policy popup
export function showCookiePolicyModal(data) {
    return ({
        type: SHOW_COOKIE_POLICY,
        data: data
    })

}