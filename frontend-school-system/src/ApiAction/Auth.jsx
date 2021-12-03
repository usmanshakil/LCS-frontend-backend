import { apiPostMethod, api, header } from './DbConfig';

//login API
export const login = (data) => {
    return new Promise((resolve, reject) => {
        let url = api.LOG_IN;
        apiPostMethod(url, data, header).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}


//Sign up API
export const signUp = (data) => {
    return new Promise((resolve, reject) => {
        let url = api.SIGN_UP;
        apiPostMethod(url, data, header).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

//login with facebook API
export const loginWithFacebook = (data) => {
    return new Promise((resolve, reject) => {
        data = `access_token=${data.firstName}`;
        let url = api.LOG_IN_WITH_FACEBOOK;
        apiPostMethod(url, data, header).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

//login with Google API
export const loginWithGoogle = (data) => {
    return new Promise((resolve, reject) => {
        data = `access_token=${data.firstName}`;
        let url = api.LOG_IN_WITH_GOOGLE;
        apiPostMethod(url, data, header).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}




// forgot password
export const forgotPassword = (data) => {
    return new Promise((resolve, reject) => {
        let url = api.FORGOT_PASSWORD;
        apiPostMethod(url, data, header).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })

}

// reset password
export const resetPassword = (data) => {
    return new Promise((resolve, reject) => {
        let url = api.RESET_PASSWORD;
        apiPostMethod(url, data, header).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })

}