import {
  api,
  apiGetMethod,
  apiPostMethod,
  apiDeleteMethod,
  apiPatchMethod,
  apiMultiDeleteMethod,
} from "./DbConfig";
import Cookies from "js-cookie";
var axios = require('axios');
// Admin User
export const getUserProfile = () => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiGetMethod(`${api.USERS_PROFILE}`, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const getSelectedStudent = (id) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");  
    apiGetMethod(`${api.ADMIN_GET_STUDENT_BY_ID}?id=${id}`, headers)
      .then((res) => {
        console.log(
          "getSelectedStudent Fn in Admin actions Component is called and its response is:",
          res
        );
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};



// student check list started
export const getStudentCheckList = (classId) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    // alert(classId)
    headers.Authorization = Cookies.get("loginUserToken");  
    apiGetMethod(`${api.ADMIN_GET_STUDENTS_CHECKLIST}?classId=${classId}`, headers)
      .then((res) => {
        // console.log(
        //   "getSelectedStudent Fn in Admin actions Component is called and its response is:",
        //   res
        // );  
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
//  student check list ended 

export const viewAdminUserList = (
  status,
  page_number,
  page_size,
  column,
  direction
) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    direction = direction === "ascending" ? "ASC" : "DESC";
    console.log("col_type : ", column);
    apiGetMethod(
      `${api.ADMIN_USERS_LIST}?status=${status}&page_number=${page_number}&page_size=${page_size}&column=${column}&order=${direction}`,
      headers
    )
      .then((res) => {
        console.log("The api get method is providing me with:", res);
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateAdminUserProfile = (data) => {
  return new Promise((resolve, reject) => {
    let url = api.UPDATE_ADMIN_USERS_LIST,
      header = {};
    header.authorization = Cookies.get("loginUserToken");
    apiPostMethod(url, data, header)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const searchAdminUserList = (data, status, column, direction) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    direction = direction === "ascending" ? "ASC" : "DESC";
    apiGetMethod(
      `${api.SEARCH_ADMIN_USERS_SEARCH}?searchQuery=${data}&status=${status}&column=${column}&order=${direction}`,
      headers
    )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const searchAdminStudentList = (
  data,
  status,
  column,
  direction,
  page_number,
  page_size
) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiGetMethod(
      `${api.ADMIN_STUDENT_SEARCH}?searchQuery=${data}&status=${status}&column=${column}&order=${direction}&page_number=${page_number}&page_size=${page_size}`,
      headers
    )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteUsers = (data) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiDeleteMethod(`${api.DELETE_USER_FROM_LIST}?id=${data}`, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getAdminActiveUser = (data) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiGetMethod(`${api.ADMIN_USERS_VIEW}?id=${data}`, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const toggleApproveUser = (id, data) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiPatchMethod(
      `${api.APPROVE_OR_DISAPPROVE_USER_FROM_LIST}/${id}`,
      data,
      headers
    )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const viewAllStudentsList = (classID) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiGetMethod(
      `${api.ADMIN_MULTI_SELECT_STUDENT_LIST}?classId=${classID}`,
      headers
    )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const viewAdminStudentList = (
  page_number,
  page_size,
  status,
  column,
  direction
) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiGetMethod(
      `${api.ADMIN_STUDENT_LIST}?page_number=${page_number}&page_size=${page_size}&status=${status}&column=${column}&order=${direction}`,
      headers
    )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const viewAdminStudentExpiredList = (data, page_number, page_size) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");

    apiGetMethod(
      `${api.ADMIN_STUDENT_RENEWAL_LIST}?expired=${data}&page_number=${page_number}&page_size=${page_size}`,
      headers
    )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// admin class
export const viewAdminClassList = (page_number, page_size) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiGetMethod(
      `${api.ADMIN_CLASS_LIST}?page_number=${page_number}&page_size=${page_size}`,
      headers
    )
      .then((res) => { 
        console.log(JSON.stringify(res))
        resolve(res);
        
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteClass = (data) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiDeleteMethod(`${api.DELETE_CLASS_LIST}?id=${data}`, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateClass = (data) => {
  return new Promise((resolve, reject) => {
    let url = api.UPDATE_ADMIN_CLASS_LIST,
      header = {};
    header.authorization = Cookies.get("loginUserToken");
    apiPostMethod(url, data, header)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const searchClassFromClassList = (data) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiGetMethod(`${api.ADMIN_CLASS_SEARCH}?searchQuery=${data}`, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const adminClassCreate = (data) => {
  return new Promise((resolve, reject) => {
    let url = api.ADMIN_CLASS_CREATE,
      header = {};
    header.authorization = Cookies.get("loginUserToken");
    apiPostMethod(url, data, header)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const viewAllTeachersClassList = () => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiGetMethod(api.ADMIN_CLASS_TEACHER_LIST, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
// Announcements

export const getAnnouncements = (page_number, page_size, column, direction) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiGetMethod(
      `${api.ADMIN_ANNOUNCEMENT}?page_number=${page_number}&page_size=${page_size}&column=${column}&order=${direction}`,
      headers
    )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const addAnnouncements = (data) => {
  return new Promise((resolve, reject) => {
    let url = api.ADD_ANNOUNCEMENT,
      header = {};
    header.authorization = Cookies.get("loginUserToken");
    apiPostMethod(url, data, header)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateAnnouncements = (data) => {
  return new Promise((resolve, reject) => {
    let url = api.UPDATE_ANNOUNCEMENT,
      header = {};
    header.authorization = Cookies.get("loginUserToken");
    apiPostMethod(url, data, header)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteAnnoucement = (data) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiDeleteMethod(`${api.DELETE_ANNOUNCEMENT}?id=${data}`, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const activateAnnouncement = (id, data) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiPatchMethod(`${api.TOGGLE_ANNOUNCEMENT}/${id}`, data, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getActiveAnnouncements = () => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiGetMethod(`${api.ACTIVE_ANNOUNCEMENT}`, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Teacher
export const addTeacher = (data) => {
  return new Promise((resolve, reject) => {
    let url = api.ADD_TEACHER,
      header = {};
    header.authorization = Cookies.get("loginUserToken");
    apiPostMethod(url, data, header)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const viewAdminTeachersList = (
  status,
  page_number,
  page_size,
  column,
  direction
) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiGetMethod(
      `${api.ADMIN_TEACHER_LIST}?status=${status}&page_number=${page_number}&page_size=${page_size}&column=${column}&order=${direction}`,
      headers
    )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateAdminTeacher = (data) => {
  return new Promise((resolve, reject) => {
    let url = api.ADMIN_TEACHER_UPDATE,
      header = {};
    header.authorization = Cookies.get("loginUserToken");
    apiPostMethod(url, data, header)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteTeacher = (data) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiDeleteMethod(`${api.ADMIN_TEACHER_DELETE}?id=${data}`, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const adminTeacherSearch = (
  search,
  status,
  page_number,
  page_size,
  column,
  direction
) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");

    apiGetMethod(
      `${api.ADMIN_TEACHER_SEARCH}?qs=${search}&status=${status}&page_number=${page_number}&page_size=${page_size}&column=${column}&order=${direction}`,
      headers
    )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const adminActiveTeacherProfile = (id) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiGetMethod(`${api.ADMIN_TEACHER_INFO_VIEW}/${id}`, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const viewAdminStaffHiringForm = (id) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiGetMethod(`${api.ADMIN_STAFF_HIRING_FORM}/${id}`, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const adminUpdateStaffHiringForm = (data) => {
  return new Promise((resolve, reject) => {
    let url = api.ADMIN_UPDATE_STAFF_HIRING_FORM,
      header = {};
    header.authorization = Cookies.get("loginUserToken");
    apiPostMethod(url, data, header)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Student
export const updateStudent = (data) => {
  return new Promise((resolve, reject) => {
    let url = api.ADMIN_STUDENT_UPDATE,
      header = {};
    header.authorization = Cookies.get("loginUserToken");
    apiPostMethod(url, data, header)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteChild = (data) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiDeleteMethod(`${api.ADMIN_STUDENT_REMOVE}?id=${data}`, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Support

export const adminSupport = (
  data,
  page_number,
  page_size,
  column,
  direction
) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiGetMethod(
      `${api.ADMIN_SUPPORT_LIST}?status=${data}&page_number=${page_number}&page_size=${page_size}&column=${column}&order=${direction}`,
      headers
    )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const adminReply = (data) => {
  return new Promise((resolve, reject) => {
    let url = api.ADMIN_SUPPORT_REPLY,
      header = {};
    header.authorization = Cookies.get("loginUserToken");
    apiPostMethod(url, data, header)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteEntry = (data) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.authorization = Cookies.get("loginUserToken");
    apiMultiDeleteMethod(`${api.ADMIN_DELETE_ENTRY}`, headers, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const adminRecordSortByDate = (
  startDate,
  endDate,
  status,
  page_number,
  page_size
) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiGetMethod(
      `${api.ADMIN_SORT_RECORD}?start_date=${startDate}&end_date=${endDate}&status=${status}&page_number=${page_number}&page_size=${page_size}`,
      headers
    )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
//location
export const viewIncidentLocationList = (
  page_number,
  page_size,
  column,
  direction
) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiGetMethod(
      `${api.ADMIN_INCIDENT_LOCATION_LIST}`,
      headers
    )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
//incident types
export const viewIncidentTypeList = (
  page_number,
  page_size,
  column,
  direction
) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiGetMethod(
      `${api.ADMIN_INCIDENTTYPES_LIST}`,
      headers
    )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const updateTypes = (data) => {
  return new Promise((resolve, reject) => {
    var config = {
      method: 'post',
      url: `${api.ADMIN_EDIT_INCIDENT_TYPES}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};
// Incidenets 
export const viewAdminIncidentsList = (
  page_number,
  page_size,
  column,
  direction
) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiGetMethod(
      `${api.ADMIN_INCIDENT_LIST}?page_number=${page_number}&page_size=${page_size}&column=${column}&order=${direction}`,
      headers
    )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getSelectedIncidentLocation = (id) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiGetMethod(`${api.ADMIN_INCIDNT_LOCATION_VIEW}?id=${id}`, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const getSelectedIncidentType = (id) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiGetMethod(`${api.ADMIN_INCIDNT_TYPES_VIEW}?id=${id}`, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const getSelectedIncident = (id) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiGetMethod(`${api.ADMIN_INCIDNT_VIEW}?id=${id}`, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const deleteIncident = (data) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiDeleteMethod(`${api.ADMIN_DELETE_INCIDENT}?id=${data}`, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteIncidentLocation = (data) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiDeleteMethod(`${api.ADMIN_DELETE_INCIDENT_LOCATION}?id=${data}`, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const deleteIncidentTypes = (data) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiDeleteMethod(`${api.ADMIN_DELETE_INCIDENT_TYPES}?id=${data}`, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const addIncident = (data) => {
  return new Promise((resolve, reject) => {
    let url = api.ADMIN_ADD_INCIDENT,
      header = {};
    header.authorization = Cookies.get("loginUserToken");
    apiPostMethod(url, data, header)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const addLocation = (data) => {
  return new Promise((resolve, reject) => {
    var config = {
      method: 'post',
      url: `${api.ADMIN_ADD_INCIDNT_LOCATION}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};
export const addTypes = (data) => {
  return new Promise((resolve, reject) => {
    var config = {
      method: 'post',
      url: `${api.ADMIN_ADD_INCIDNT_TYPES}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};
export const updateIncident = (data) => {
  return new Promise((resolve, reject) => {
    let url = api.ADMIN_UPDATE_INCIDENT,
      header = {};
    header.authorization = Cookies.get("loginUserToken");
    apiPostMethod(url, data, header)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const updateLocation = (data) => {
  return new Promise((resolve, reject) => {
    var config = {
      method: 'post',
      url: `${api.ADMIN_EDIT_INCIDENT_LOCATION}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};
export const adminIncidentSearch = (
  search,
  page_number,
  page_size,
  column,
  direction,
  class_id,
  user_id
) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");

    apiGetMethod(
      `${api.ADMIN_SEARCH_INCIDENT}?qs=${search}&page_number=${page_number}&page_size=${page_size}&column=${column}&order=${direction}&class_id=${class_id}&user_id=${user_id}`,
      headers
    )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const uploadImagesToS3 = (data) => {
  return new Promise((resolve, reject) => {
    let url = api.ADMIN_UPLOAD_INCIDNT_IMAGE,
      header = { "Content-Type": "multipart/form-data" };
    header.authorization = Cookies.get("loginUserToken");
    apiPostMethod(url, data, header)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};




export const viewIncidentsClassList = () => {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers.Authorization = Cookies.get("loginUserToken");
    apiGetMethod(
      `${api.ADMIN_INCIDENT_CLASS_LIST}`,
      headers
    )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};