import axios from 'axios';

export const apiGetMethod = (url, headers) => {
    return new Promise((resolve, reject) => {
        axios.get(url, { headers }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.response)
        })
    })
}