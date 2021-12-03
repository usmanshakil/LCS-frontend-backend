import { api, apiGetMethod, apiPostMethod} from './DbConfig';
import Cookies from 'js-cookie';


export const viewStudentList = () => {
    return new Promise((resolve, reject) => {
        let headers = {};
        headers.Authorization = Cookies.get('loginUserToken');
        apiGetMethod(api.STUDENT_LIST, headers).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const updateTeacherProfile = data => {
    return new Promise((resolve, reject) => {
      let url = api.UPDATE_TEACHER_PROFILE,
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
  

  export const saveStaffHiringForm = data => {
    return new Promise((resolve, reject) => {
      let url = api.TEACHER_STAFF_HIRING_FORM,
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

  export const updateStaffHiringForm = data => {
    return new Promise((resolve, reject) => {
      let url = api.UPDATE_TEACHER_STAFF_HIRING_FORM,
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


  export const viewStaffHiringForm = () => {
    return new Promise((resolve, reject) => {
        let headers = {};
        headers.Authorization = Cookies.get('loginUserToken');
        apiGetMethod(api.VIEW_TEACHER_STAFF_HIRING_FORM, headers).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}


export const updateTeacherBasicInformation = (data) => {
  return new Promise((resolve, reject) => {
    let url = api.UPDATE_TEACHER_BASIC_PROFILE,
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


