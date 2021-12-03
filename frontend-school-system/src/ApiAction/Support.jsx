import {api,apiPostMethod} from './DbConfig';
import Cookies from 'js-cookie';


export const supportInquiry = (data) => {
    return new Promise((resolve, reject) => {
        let url = api.SUPPORT, headers = {};
        headers.authorization = Cookies.get('loginUserToken');
        apiPostMethod(url, data, headers).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}