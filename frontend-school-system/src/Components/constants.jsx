const constants = {
  // IMAGEURL
  AWS_IMAGE_BASE_URL: 'https://schoolhouseimages.s3.us-east-2.amazonaws.com',
  //POPUP MODAL
  SIGNUP_MODAL: "Signup Modal",
  LOGIN_MODAL: "Login Modal",
  COOKIE_POLICY: "Cookie Policy",
  DELETE_CONFIRMATION_MODAL: "Delete Popup Modal",
  SUCCESS_MODAL: "Success Modal",
  ERROR_MODAL: "Error Modal",
  EDIT_ANNOUNCEMENT: "Edit Announcement",
  DELETE_ANNOUNCEMENT: "Delete Announcement",
  ADD_TEACHER: "Add Teacher",
  RENEWAL_ADMISSION_DATE_MODAL: "Renew Admission",
  ADMIN_REPLY_TO_USER: "Admin Reply",
  // ERROR MESSAGE
  CONFIRM_PASSWORD_ERROR_MESSAGE: `Confirm password didn't match, please confirm your password!`,
  //Toast Message constants
  SESSION_EXPIRED: "Your session has been expired.Please Login to Continue",
  SOMETHING_WENT_WRONG: "Something went wrong",
  ACCOUNT_APPROVAL:
    " Your Account is under approval. We will notify you on your registered email once it is activated /approved.",
  BLANK_SEARCH_MESSAGE: "Please enter input",
  // Admin Module Access:
  STUDENT_STATUS: [
    { key: "Active", text: "Active", value: "Active" },
    { key: "Inactive", text: "Inactive", value: "Inactive" }
  ],
  USER_ROLES: [
    {
      key: "Parent",
      value: "Parent",
      id: 3
    },
    {
      key: "Teacher",
      value: "Teacher",
      id: 4
    },
    {
      key: "Administrator",
      value: "Administrator",
      id: 2
    }
  ],
  // Add Child Page Parent Working time
  ADD_CHILD_PARENT_WORKING_TIME: [
    {
      key: "12:00 AM",
      value: "12:00 AM",
      text: "12:00 AM"
    },
    {
      key: "1:00 AM",
      value: "1:00 AM",
      text: "1:00 AM"
    },
    {
      key: "2:00 AM",
      value: "2:00 AM",
      text: "2:00 AM"
    },
    {
      key: "3:00 AM",
      value: "3:00 AM",
      text: "3:00 AM"
    },
    {
      key: "4:00 AM",
      value: "4:00 AM",
      text: "4:00 AM"
    },
    {
      key: "5:00 AM",
      value: "5:00 AM",
      text: "5:00 AM"
    },
    {
      key: "6:00 AM",
      value: "6:00 AM",
      text: "6:00 AM"
    },
    {
      key: "7:00 AM",
      value: "7:00 AM",
      text: "7:00 AM"
    },
    {
      key: "8:00 AM",
      value: "8:00 AM",
      text: "8:00 AM"
    },
    {
      key: "9:00 AM",
      value: "9:00 AM",
      text: "9:00 AM"
    },
    {
      key: "10:00 AM",
      value: "10:00 AM",
      text: "10:00 AM"
    },
    {
      key: "11:00 AM",
      value: "11:00 AM",
      text: "11:00 AM"
    },
    {
      key: "12:00 PM",
      value: "12:00 PM",
      text: "12:00 PM"
    },
    {
      key: "1:00 PM",
      value: "1:00 PM",
      text: "1:00 PM"
    },
    {
      key: "2:00 PM",
      value: "2:00 PM",
      text: "2:00 PM"
    },
    {
      key: "3:00 PM",
      value: "3:00 PM",
      text: "3:00 PM"
    },
    {
      key: "4:00 PM",
      value: "4:00 PM",
      text: "4:00 PM"
    },
    {
      key: "5:00 PM",
      value: "5:00 PM",
      text: "5:00 PM"
    },
    {
      key: "6:00 PM",
      value: "6:00 PM",
      text: "6:00 PM"
    },
    {
      key: "7:00 PM",
      value: "7:00 PM",
      text: "7:00 PM"
    },
    {
      key: "8:00 PM",
      value: "8:00 PM",
      text: "8:00 PM"
    },
    {
      key: "9:00 PM",
      value: "9:00 PM",
      text: "9:00 PM"
    },
    {
      key: "10:00 PM",
      value: "10:00 PM",
      text: "10:00 PM"
    },
    {
      key: "11:00 PM",
      value: "11:00 PM",
      text: "11:00 PM"
    }
  ],
  // Add Child Race Dropdown Data
  ADD_CHILD_RACE: [
    {
      key: "Mixed Race",
      value: "Mixed Race",
      text: "Mixed Race",
      id: 1
    },
    {
      key: "African American",
      value: "African American",
      text: "African American",
      id: 2
    },
    {
      key: "Arctic (Siberian, Eskimo)",
      value: "Arctic (Siberian, Eskimo)",
      text: "Arctic (Siberian, Eskimo)",
      id: 3
    },
    {
      key: "Caucasian (European)",
      value: "Caucasian (European)",
      text: "Caucasian (European)",
      id: 4
    },
    {
      key: "Caucasian (Indian)",
      value: "Caucasian (Indian)",
      text: "Caucasian (Indian)",
      id: 5
    },
    {
      key: "Caucasian (North African, Other)",
      value: "Caucasian (North African, Other)",
      text: "Caucasian (North African, Other)",
      id: 6
    },
    {
      key: "Indigenous Australian",
      value: "Indigenous Australian",
      text: "Indigenous Australian",
      id: 7
    },
    {
      key: "Native American",
      value: "Native American",
      text: "Native American",
      id: 8
    },
    {
      key: "North East Asian (Mongol, Tibetan, Korean Japanese, etc)",
      value: "North East Asian (Mongol, Tibetan, Korean Japanese, etc)",
      text: "North East Asian (Mongol, Tibetan, Korean Japanese, etc)",
      id: 9
    },
    {
      key: "Pacific (Polynesian, Micronesian, etc)",
      value: "Pacific (Polynesian, Micronesian, etc)",
      text: "Pacific (Polynesian, Micronesian, etc)",
      id: 10
    },
    {
      key: "South East Asian (Chinese, Thai, Malay, Filipino, etc)",
      value: "South East Asian (Chinese, Thai, Malay, Filipino, etc)",
      text: "South East Asian (Chinese, Thai, Malay, Filipino, etc)",
      id: 11
    },
    {
      key: "West African, Bushmen, Ethiopian",
      value: "West African, Bushmen, Ethiopian",
      text: "West African, Bushmen, Ethiopian",
      id: 12
    },
    {
      key: "Other Race",
      value: "Other Race",
      text: "Other Race",
      id: 13
    }
  ],
  //ADD child Page State  Dropdown Data
  STATE_DROPDOWN: [
    { text: "Alabama", value: "Alabama" },
    { text: "Alaska", value: "Alaska" },
    { text: "Arizona", value: "Arizona" },
    { text: "Arkansas", value: "Arkansas" },
    { text: "California", value: "California" },
    { text: "Colorado", value: "Colorado" },
    { text: "Connecticut", value: "Connecticut" },
    { text: "Delaware", value: "Delaware" },
    { text: "Florida", value: "Florida" },
    { text: "Georgia", value: "Georgia" },
    { text: "Hawaii", value: "Hawaii" },
    { text: "Idaho", value: "Idaho" },
    { text: "Illinois", value: "Illinois" },
    { text: "Indiana", value: "Indiana" },
    { text: "Iowa", value: "Iowa" },
    { text: "Kansas", value: "Kansas" },
    { text: "Kentucky", value: "Kentucky" },
    { text: "Louisiana", value: "Louisiana" },
    { text: "Maine", value: "Maine" },
    { text: "Maryland", value: "Maryland" },
    { text: "Massachusetts", value: "Massachusetts" },
    { text: "Michigan", value: "Michigan" },
    { text: "Minnesota", value: "Minnesota" },
    { text: "Mississippi", value: "Mississippi" },
    { text: "Missouri", value: "Missouri" },
    { text: "Montana", value: "Montana" },
    { text: "Nebraska", value: "Nebraska" },
    { text: "Nevada", value: "Nevada" },
    { text: "New Hampshire", value: "New Hampshire" },
    { text: "New Jersey", value: "New Jersey" },
    { text: "New Mexico", value: "New Mexico" },
    { text: "New York", value: "New York" },
    { text: "North Carolina", value: "North Carolina" },
    { text: "North Dakota", value: "North Dakota" },
    { text: "Ohio", value: "Ohio" },
    { text: "Oklahoma", value: "Oklahoma" },
    { text: "Oregon", value: "Oregon" },
    { text: "Pennsylvania", value: "Pennsylvania" },
    { text: "Rhode Island", value: "Rhode Island" },
    { text: "South Carolina", value: "South Carolina" },
    { text: "South Dakota", value: "South Dakota" },
    { text: "Tennessee", value: "Tennessee" },
    { text: "Texas", value: "Texas" },
    { text: "Utah", value: "Utah" },
    { text: "Vermont", value: "Vermont" },
    { text: "Virginia", value: "Virginia" },
    { text: "Washington", value: "Washington" },
    { text: "West Virginia", value: "West Virginia" },
    { text: "Wisconsin", value: "Wisconsin" },
    { text: "Wyoming", value: "Wyoming" }
  ],
  // ADD child Menus
  ADD_CHILD_MENUS: [
    {
      key: "childInfo",
      value: "familyInfo",
      text: "Family info",
      id: 1
    },
    {
      key: "devReport",
      value: "devReport",
      text: "Dev report",
      id: 2
    },
    {
      key: "parentAgreement",
      value: "parentAgreement",
      text: "Parent agreement",
      id: 3
    },
    {
      key: "offsiteActivityPermission",
      value: "offsiteActivityPermission",
      text: "Offsite Activity Permission",
      id: 4
    },
    {
      key: "localFieldTripPermission",
      value: "localFieldTripPermission",
      text: "Local Field Trip Permission",
      id: 5
    },
    {
      key: "sunscreenPermission",
      value: "sunscreenPermission",
      text: "Sunscreen Permission",
      id: 6
    },
    {
      key: "toothbrushingPermission",
      value: "toothbrushingPermission",
      text: "Toothbrushing Permission",
      id: 7
    },
    {
      key: "photoRelease",
      value: "photoRelease",
      text: "Photo Release",
      id: 8
    },
    {
      key: "transportationAuthority",
      value: "transportationAuthority",
      text: "Transportation Authority",
      id: 9
    },
    {
      key: "schoolDirectoryForm",
      value: "schoolDirectoryForm",
      text: "School Directory Form",
      id: 10
    }
  ],
  // Staff Information Form menu
  STAFF_INFORMATION_MENU: [
    {
      key: "staffBasicInfo",
      value: "staffBasicInfo",
      text: "Staff basic information"
    },
    {
      key: "administartionAndStaff",
      value: "administartionAndStaff",
      text: "Administrative and teaching staff"
    },
    {
      key: "education",
      value: "education",
      text: "Education"
    },
    {
      key: "personalReference",
      value: "personalReference",
      text: "Personal reference"
    },
    {
      key: "professionalRefernce",
      value: "professionalRefernce",
      text: "Professional reference"
    },
    {
      key: "reference",
      value: "reference",
      text: "Reference"
    },
    {
      key: "staffEmergencyForm",
      value: "staffEmergencyForm",
      text: "Staff emergency form"
    },
    {
      key: "staffAgreement",
      value: "staffAgreement",
      text: "Staff handbook waiver"
    }
  ],
  TEACHER_POSITIONS: [
    {
      key: " Teacher ",
      value: " Teacher ",
      text: " Teacher "
    },
    {
      key: "Substitue Teacher",
      value: "Substitue Teacher",
      text: "Substitue Teacher"
    },
    {
      key: "Teacher Assistant",
      value: "Teacher Assistant",
      text: "Teacher Assistant"
    }
  ],
  USER_STATUS: [
    { key: "All", text: "All", value: "All" },
    { key: "Active", text: "Active", value: "Active" },
    { key: "Inactive", text: "Inactive", value: "Inactive" },
    { key: "Approved", text: "Approved", value: "Approved" },
    { key: "Unapproved", text: "Unapproved", value: "Unapproved" }
  ],
  TEACHER_STATUS: [
    { key: "All", text: "All", value: "All" },
    { key: "Active", text: "Active", value: "Active" },
    { key: "Inactive", text: "Inactive", value: "Inactive" }
  ],
  SORT_RECORD: [
    {
      key: "20",
      value: 20,
      text: 20
    },
    {
      key: "40",
      value: 40,
      text: 40
    },
    {
      key: "75",
      value: 75,
      text: 75
    }
  ],
  ADD_INCIDENTS_DROPDOWN: [
    { text: "Accidient", value: "Accidient" },
    { text: "Fall on ground", value: "Fall on ground" },
    { text: "Fighting", value: "Fighting" },
  ],
  STATUS_INCIDENTS_DROPDOWN: [
    { text: "Awaiting Teacher", value: "awaiting teacher" },
    { text: "Awaiting Parent", value: "awaiting parent" },
    { text: "Awaiting Director", value: "awaiting director" },
    { text: "In Progress", value: "in progress" },
    { text: "Resolved", value: "resolved" },
  ],
};

export default constants;
