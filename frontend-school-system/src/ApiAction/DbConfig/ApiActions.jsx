import { apiBaseUrl } from "./ApiBaseUrl";

const api = {
  // Common API
  LOG_IN: `${apiBaseUrl}/users/signin`,
  SIGN_UP: `${apiBaseUrl}/users/signup`,
  LOG_IN_WITH_FACEBOOK: `${apiBaseUrl}/users/oauth/facebook`,
  LOG_IN_WITH_GOOGLE: `${apiBaseUrl}/users/oauth/google`,
  SUPPORT: `${apiBaseUrl}/users/support`,
  FORGOT_PASSWORD: `${apiBaseUrl}/users/forgot-password`,
  RESET_PASSWORD: `${apiBaseUrl}/users/reset-password`,
  USERS_PROFILE: `${apiBaseUrl}/users/profile`,
  // common to all file upload
  S3_FILE_UPLOAD: `${apiBaseUrl}/users/upload`,
  // Parent API BASE URL
  ADD_CHILD: `${apiBaseUrl}/parent/child/add`,
  UPDATE_CHILD: `${apiBaseUrl}/parent/child/update`,
  REMOVE_CHILD: `${apiBaseUrl}/parent/child/delete`,
  GET_CHILD_LIST: `${apiBaseUrl}/parent/child/list`,
  UPDATE_PARENT_PROFILE: `${apiBaseUrl}/parent/update`,
  RENEW_ADMISSION: `${apiBaseUrl}/parent/child/renew_admission`,
  // Teacher API BASE URL
  TEACHER_PROFILE_PASSWORD: `${apiBaseUrl}/teacher/info`,
  VIEW_TEACHER_PROFILE: `${apiBaseUrl}/teacher/info`,
  UPDATE_TEACHER_BASIC_PROFILE: `${apiBaseUrl}/teacher/update-profile`,
  UPDATE_TEACHER_PROFILE: `${apiBaseUrl}/teacher/update`,
  CLASS_LIST: `${apiBaseUrl}/teacher/class/list`,
  STUDENT_LIST: `${apiBaseUrl}/teacher/student/list`,
  TEACHER_STAFF_HIRING_FORM: `${apiBaseUrl}/teacher/add_staff_hire_form`,
  UPDATE_TEACHER_STAFF_HIRING_FORM: `${apiBaseUrl}/teacher/update_staff_hire_form`,
  VIEW_TEACHER_STAFF_HIRING_FORM: `${apiBaseUrl}/teacher/view_staff_hire_form`,
  // Admin User Module APIs
  ADMIN_USERS_LIST: `${apiBaseUrl}/admin/users/list`,
  ADMIN_USERS_VIEW: `${apiBaseUrl}/admin/users/view`,
  UPDATE_ADMIN_USERS_LIST: `${apiBaseUrl}/admin/users/update`,
  SEARCH_ADMIN_USERS_SEARCH: `${apiBaseUrl}/admin/users/search`,
  DELETE_USER_FROM_LIST: `${apiBaseUrl}/admin/users/delete`,
  APPROVE_OR_DISAPPROVE_USER_FROM_LIST: `${apiBaseUrl}/admin/users/update_status`,
  // Admin Student module APis
  ADMIN_STUDENT_SEARCH: `${apiBaseUrl}/admin/student/search`,
  ADMIN_STUDENT_LIST: `${apiBaseUrl}/admin/student/list`,
  ADMIN_MULTI_SELECT_STUDENT_LIST: `${apiBaseUrl}/admin/student/multiSelectList`,
  ADMIN_STUDENT_UPDATE: `${apiBaseUrl}/admin/student/update`,
  ADMIN_STUDENT_REMOVE: `${apiBaseUrl}/admin/student/delete`,
  ADMIN_STUDENT_RENEWAL_LIST: `${apiBaseUrl}/admin/student/renewal`,
  ADMIN_GET_STUDENT_BY_ID: `${apiBaseUrl}/admin/student/get_one`,
  ADMIN_GET_STUDENTS_CHECKLIST: `${apiBaseUrl}/admin/student/getStudenthecklist`,
  // Admin class Module APIs
  ADMIN_CLASS_CREATE: `${apiBaseUrl}/admin/class/create`,
  ADMIN_CLASS_LIST: `${apiBaseUrl}/admin/class/list`,
  ADMIN_CLASS_SEARCH: `${apiBaseUrl}/admin/class/search`,
  ADMIN_CLASS_TEACHER_LIST: `${apiBaseUrl}/admin/teacher/all`,
  DELETE_CLASS_LIST: `${apiBaseUrl}/admin/class/delete`,
  UPDATE_ADMIN_CLASS_LIST: `${apiBaseUrl}/admin/class/update`,
  // Admin teachers module APis
  ADD_TEACHER: `${apiBaseUrl}/admin/teacher/add`,
  ADMIN_TEACHER_LIST: `${apiBaseUrl}/admin/teacher/list`,
  ADMIN_TEACHER_UPDATE: `${apiBaseUrl}/admin/teacher/update`,
  ADMIN_TEACHER_DELETE: `${apiBaseUrl}/admin/teacher/delete`,
  ADMIN_TEACHER_SEARCH: `${apiBaseUrl}/admin/teacher/search`,
  ADMIN_TEACHER_INFO_VIEW: `${apiBaseUrl}/admin/teacher/view_teacher`,
  ADMIN_STAFF_HIRING_FORM: `${apiBaseUrl}/admin/teacher/view_staff_hiring_form`,
  ADMIN_UPDATE_STAFF_HIRING_FORM: `${apiBaseUrl}/admin/teacher/update_staff_hire_form`,

  // Admin Announcement List
  ADMIN_ANNOUNCEMENT: `${apiBaseUrl}/admin/annoucement/list`,
  ADD_ANNOUNCEMENT: `${apiBaseUrl}/admin/annoucement/add`,
  UPDATE_ANNOUNCEMENT: `${apiBaseUrl}/admin/annoucement/update`,
  DELETE_ANNOUNCEMENT: `${apiBaseUrl}/admin/annoucement/delete`,
  TOGGLE_ANNOUNCEMENT: `${apiBaseUrl}/admin/annoucement/update_status`,
  ACTIVE_ANNOUNCEMENT: `${apiBaseUrl}/admin/annoucement/active`,
  // Admin Support
  ADMIN_SUPPORT_LIST: `${apiBaseUrl}/admin/support/list`,
  ADMIN_SUPPORT_REPLY: `${apiBaseUrl}/admin/support/reply`,
  ADMIN_DELETE_ENTRY: `${apiBaseUrl}/admin/support/delete`,
  ADMIN_SORT_RECORD: `${apiBaseUrl}/admin/support/sort_by_date_range`,
  // Admin Incidents
  ADMIN_INCIDENT_LIST: `${apiBaseUrl}/admin/incident/list`,
  ADMIN_INCIDNT_VIEW: `${apiBaseUrl}/admin/incident/view`,
  ADMIN_ADD_INCIDENT: `${apiBaseUrl}/admin/incident/add`,
  ADMIN_SEARCH_INCIDENT: `${apiBaseUrl}/admin/incident/search`,
  ADMIN_UPDATE_INCIDENT: `${apiBaseUrl}/admin/incident/edit`,
  ADMIN_DELETE_INCIDENT: `${apiBaseUrl}/admin/incident/delete`,
  ADMIN_UPLOAD_INCIDNT_IMAGE: `${apiBaseUrl}/admin/incident/uploadImages`,
  ADMIN_INCIDENT_CLASS_LIST: `${apiBaseUrl}/admin/incident/classlist`,
  ADMIN_ADD_INCIDNT_LOCATION: `${apiBaseUrl}/admin/locations/add`,
  ADMIN_EDIT_INCIDENT_LOCATION: `${apiBaseUrl}/admin/locations/edit`,
  ADMIN_DELETE_INCIDENT_LOCATION: `${apiBaseUrl}/admin/locations/delete`,
  ADMIN_INCIDENT_LOCATION_LIST: `${apiBaseUrl}/admin/locations/list`,
  ADMIN_INCIDNT_LOCATION_VIEW: `${apiBaseUrl}/admin/locations/view`,
  //admin incident types 
  ADMIN_ADD_INCIDNT_TYPES: `${apiBaseUrl}/admin/incident-type/add`,
  ADMIN_EDIT_INCIDENT_TYPES: `${apiBaseUrl}/admin/incident-type/edit`,
  ADMIN_DELETE_INCIDENT_TYPES : `${apiBaseUrl}/admin/incident-type/delete`,
  ADMIN_INCIDENTTYPES_LIST: `${apiBaseUrl}/admin/incident-type/list`,
  ADMIN_INCIDNT_TYPES_VIEW: `${apiBaseUrl}/admin/incident-type/view`,
  



};

export const header = {};

export default api;
