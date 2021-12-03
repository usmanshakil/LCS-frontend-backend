import {
    DISPLAY_ADMIN_PROFILE,
} from './ActionTypes';

// when admin see his own profile data contain true otherwise it contain false
export function displayAdminProfile(data) {
    return ({
        type: DISPLAY_ADMIN_PROFILE,
        data: data
    })
}

