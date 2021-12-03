import { api, apiPostMethod, apiDeleteMethod } from "./DbConfig";
import Cookies from "js-cookie";

export const addChild = data => {
  return new Promise((resolve, reject) => {
    let url = api.ADD_CHILD,
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

export const updateParentProfile = data => {
  return new Promise((resolve, reject) => {
    let url = api.UPDATE_PARENT_PROFILE,
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

// Student
export const updateChild = data => {
  return new Promise((resolve, reject) => {
    let url = api.UPDATE_CHILD,
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

export const removeParentChild = data => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiDeleteMethod(`${api.REMOVE_CHILD}?id=${data}`, headers)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const renewStudentAdmission = data => {
  return new Promise((resolve, reject) => {
    let url = api.RENEW_ADMISSION,
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
