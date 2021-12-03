import axios from 'axios';

export const apiPostMethod = (url, data, headers) => {
    return new Promise((resolve, reject) => {
        axios.post(url, data, { headers }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.response)
        })
    })
}
