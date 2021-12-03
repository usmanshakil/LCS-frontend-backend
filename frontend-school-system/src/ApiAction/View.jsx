import { api, apiGetMethod } from './DbConfig';
import Cookies from 'js-cookie';


export const viewChild = () => {
    return new Promise((resolve, reject) => {
        let headers = {};
        headers.Authorization = Cookies.get('loginUserToken');
        apiGetMethod(api.GET_CHILD_LIST, headers).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })

}

export const viewTeacherProfile = () => {
    return new Promise((resolve, reject) => {
        let headers = {};
        headers.Authorization = Cookies.get('loginUserToken');
        apiGetMethod(api.VIEW_TEACHER_PROFILE, headers).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const viewTeacherClass = () => {
    return new Promise((resolve, reject) => {
        let headers = {};
        headers.Authorization = Cookies.get('loginUserToken');
        apiGetMethod(api.CLASS_LIST, headers).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}