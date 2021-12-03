import axios from 'axios';

export const apiDeleteMethod = (url, headers) => {
    return new Promise((resolve, reject) => {
        axios.delete(url, { headers }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.response)
        })
    })
}

export const apiMultiDeleteMethod = (url,headers,data) => {
    return new Promise((resolve, reject) => {
        axios.delete(url,{ headers,data }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.response)
        })
    })
}