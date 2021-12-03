import axios from 'axios';

export const apiPatchMethod = (url, data, headers) => {
    return new Promise((resolve, reject) => {
        axios.patch(url, data, { headers }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.response)
        })
    })
}
