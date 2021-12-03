import {
    api,
    apiPostMethod,
  } from "./DbConfig";
  
  import Cookies from "js-cookie";
  
  export const fileUpload = data => {
    return new Promise((resolve, reject) => {
      let url = api.S3_FILE_UPLOAD,
        header = {};
      header.authorization = Cookies.get("loginUserToken");
      apiPostMethod(url, data, header)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
  
  