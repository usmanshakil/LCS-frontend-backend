import {
  AddChild,
  ViewChild,
  ViewParentProfile,
  EditParentProfile,
  Support,
  AdminSupport,
  Home,
  TeacherProfile,
  EditTeacherProfile,
  ViewTeacherProfile,
  ViewClasses,
  ViewClass,
  TeachersList,
  EditClass,
  Announcement,
  UserList,
  AddTeacher,
  ExpiredAndRenewalStudentsList,
  TeacherStudentList,
  EditStaffInformationForm,
  ViewStaffInformationForm,
  ViewChildAllData,
  IncidentsList,
  AddIncident,
  AddLocation,
  LocationList,
  IncidentTypesLists,
  AddIncidentType,
  ChildRecordCheckList
} from "../../Components";


const routes = [
  {
    path: "/",
    pageName: "Home",
    component: Home
  },
  {
    path: "/home",
    pageName: "Home",
    component: Home
  },
  {
    path: "/student/add",
    pageName: "addchild",
    component: AddChild
  },
  {
    path: "/student/edit",
    pageName: "editChild",
    component: AddChild
  },
  {
    path: "/student",
    pageName: "viewChild",
    component: ViewChild
  },
  {
    path: "/student/view",
    pageName: "viewChildAllData",
    component: ViewChildAllData
  },

  {
    path: "/students/childRecordCheckList",
    pageName: "childRecordCheckList",
    component: ChildRecordCheckList
  },
  
  {
    path: "/users",
    pageName: "UserList",
    component: UserList

  },
  {
    path: "/users/action/view",
    pageName: "viewUserList",
    component: ViewParentProfile
  },
  {
    path: "/edit-users-profile",
    pageName: "updateAdminUser",
    component: EditParentProfile
  },
  {
    path: "/edit-parent-profile",
    pageName: "editParentProfile",
    component: EditParentProfile
  },
  {
    path: "/teacher-basic-info",
    pageName: "viewTeacherBasicInfo",
    component: ViewParentProfile
  }
  ,
  {
    path: "/edit-teacher-profile",
    pageName: "editTeacherProfile",
    component: EditParentProfile
  },
  {
    path: "/support",
    pageName: "support",
    component: Support
  },
  {
    path: "/teachers",
    pageName: "teachersList",
    component: TeachersList
  },
  {
    path: "/teacher-profile",
    pageName: "teacherProfile",
    component: TeacherProfile
  },
  {
    path: "/view-profile",
    pageName: "viewTeacherProfile",
    component: ViewTeacherProfile
  },
  {
    path: "/edit-profile",
    pageName: "editTeacherProfile",
    component: EditTeacherProfile
  },
  {
    path: "/classes",
    pageName: "viewClasses",
    component: ViewClasses
  },
  {
    path: "/view-assigned-class",
    pageName: "viewSingleClass",
    component: ViewClass
  },
  {
    path: "/edit-assigned-class",
    pageName: "EditAdminClass",
    component: EditClass
  },
  {
    path: "/classes/add",
    pageName: "EditAdminClass",
    component: EditClass
  },
  // {
  //   path: "/teacher/view/id/:id",
  //   pageName: "viewActiveTeacherProfile",
  //   component: ViewTeacherProfile
  // },
  {
    path: "/announcement",
    pageName: "viewAnnouncement",
    component: Announcement
  },
  {
    path: "/add-teacher",
    pageName: "AddTeacher",
    component: AddTeacher
  },
  {
    path: "/renewal",
    pageName: "RenewalStudentList",
    component: ExpiredAndRenewalStudentsList
  },
  {
    path: "/student/view",
    pageName: "TeacherStudentList",
    component: TeacherStudentList
  },
  {
    path: "/admin-support",
    pageName: "AdminSupport",
    component: AdminSupport
  },
  {
    path: "/staff-info",
    pageName: "EditStaffInformationForm",
    component: EditStaffInformationForm
  },
  {
    path: "/view-staff-info",
    pageName: "ViewStaffInformationForm",
    component: ViewStaffInformationForm
  },
  {
    path: "/incidents",
    pageName: "IncidentsList",
    component: IncidentsList
  },

  {
    path: "/add-incident",
    pageName: "add-incident",
    component: AddIncident
  },

  {
    path: "/edit-incident",
    pageName: "edit-incident",
    component: AddIncident
  },
  {
    path: "/locations",
    pageName: "LocationList",
    component: LocationList
  },
 {
    path: "/add-location",
    pageName: "add-location",
    component: AddLocation
  },    
  {
    path: "/incident-type",
    pageName: "IncidentTypesLists",
    component: IncidentTypesLists
  },
  {
    path: "/add-IncidentType",
    pageName: "add-incidentType",
    component: AddIncidentType
  },

 
];
export default routes;
