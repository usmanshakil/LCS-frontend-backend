import React, { Component } from 'react';
import { Grid, Container } from 'semantic-ui-react';
import SimpleReactValidator from 'simple-react-validator';
import { connect } from 'react-redux'
//components
import { FamilyInfo } from './FamilyInfo';
import { DevReports } from './DevReports';
import { ParentAgreement } from './ParentAgreement';
import { AuthorizationAndConsent } from './AuthorizationAndConsent';
import { LocalTripPermission } from './LocalTripPermission';
import { SunScreenVerification } from './SunScreenVerification';
import { ToothBrushingConsent } from './ToothBrushingConsent';
import { PhotoRelease } from './PhotoRelease';
import { TransportationAuthority } from './TransportationAuthority';
import { SchoolDirectory } from './SchoolDirectory';
import { AddChildMenuTabs } from './AddChildMenuTabs';

import { getSelectedStudent } from '../../../../ApiAction/Admin';
//API
import { addChild, updateChild } from '../../../../ApiAction/Parent';
import { fileUpload } from '../../../../ApiAction/Common';
import { updateStudent, viewAdminClassList } from '../../../../ApiAction/Admin';
//Constants 
import { constants } from '../../../';
// Loaders
import { Loaders } from '../../../';
// CSS
import './AddChild.css';

class AddChild extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      editType: '',
      room: '',
      location: '',
      isloadTabCalled: false,
      isPropsExpired: false,
      allClassesInfo: [],
      page_number: 1,
      page_size: 20,
      total_records: 0,
      loginUserInfo: props.loginUserInfo,
      activeTab: 'familyInfo',
      activeTabIndex: 0,
      total_pages: 0,
      childForm: {
        childInfo: {
          first_name: '',
          last_name: '',
          birth_date: '',
          birth_place: '',
          admission_date: '',
          expiry_date: '',
          address: '',
          city: '',
          state: '',
          zip_code: '',
          class_id: 1,
        },
        parent1: {
          parent_type: "parent1",
          first_name: '',
          last_name: '',
          phone1: '',
          phone2: '',
          email1: '',
          address: '',
          city: '',
          state: '',
          zip_code: '',
          business_name: '',
          business_address: '',
          work_start_time: '',
          work_end_time: '',
          business_phone: '',
        },
        parent2: {
          parent_type: "parent2",
          first_name: '',
          last_name: '',
          phone1: '',
          phone2: '',
          email1: '',
          address: '',
          city: '',
          state: '',
          zip_code: '',
          business_name: '',
          business_address: '',
          work_start_time: '',
          work_end_time: '',
          business_phone: '',
        },
        emergencyContact1: {
          type: "emergency1",
          first_name: '',
          last_name: '',
          phone1: '',
          phone2: '',
          email1: '',
          address: '',
          city: '',
          state: '',
          zip_code: '',
          relationship: '',
          has_emergency_release: false
        },
        emergencyContact2: {
          type: "emergency1",
          first_name: '',
          last_name: '',
          phone1: '',
          phone2: '',
          email1: '',
          address: '',
          city: '',
          state: '',
          zip_code: '',
          relationship: '',
          has_emergency_release: false
        },
        medicalInformation: {
          doctor_name: '',
          doctor_phone: '',
          doctor_email: '',
          doctor_primary_language: '',
          doctor_insurance_carrier: '',
          last_physical_date: '',
          lead_screen_date: '',
          immunizations: '',
          allergies: '',


          has_allergy: 'no',
          date_of_doctor_letter: '',
          medicine_expiration_date: '',


          eye_color: '',
          hair_color: '',
          gender: '',
          height: '',
          weight: '',
          race: '',
          identity_marks: '',
          add_child_to_directory: false,
          add_parent_to_directory: false,
          add_parent2_to_directory: false,
          has_signature_checked: false,
          physical_reports: '',
          medical_reports: []
        },
        devReport: {
          age_began_sitting: '',
          crawling: '',
          walking: '',
          talking: '',
          has_child_pull_up: '',
          has_child_crawling: '',
          has_child_walk_with_support: '',
          has_speech_difficulties: '',
          special_words_to_describe: '',
          language_spoken_at_home: '',
          has_history_of_colics: '',
          has_child_use_pacifier_or_sucks_thumbs: '',
          when_child_use_pacifier_or_sucks_thumbs: '',
          has_child_have_fussy_time: '',
          when_child_have_fussy_time: '',
          how_parent_handle_time: '',
        },
        childHealth: {
          has_complication_at_birth: '',
          serious_illness_hospitalization: '',
          special_physical_condition: '',
          allergies: '',
          regular_medications: '',
        },
        childEatingHabit: {
          special_charecters_or_diffculties: '',
          special_formula_prepration_details: '',
          favouraite_food: '',
          food_refused: '',
          child_fedon_lap: '',
          high_chair: '',
          has_child_use_spoon: '',
          has_child_use_fork: '',
          has_child_use_hand: '',
        },
        childToiletHabit: {
          has_diaper_used: '',
          has_diaper_rash_occur: '',
          has_parent_use_oil: '',
          has_parent_powder: '',
          has_parent_lotion: '',
          has_parent_use_other: '',
          has_bowel_movement_regular: '',
          how_many_time_bowl_move: '',
          has_problem_of_diarrhea: '',
          has_problem_of_constipation: '',
          has_toilet_training: '',
          particular_procedure_of_child: '',
          has_child_use_potty_chair: '',
          has_child_use_special_seat: '',
          has_child_use_regular_seat: '',
          how_child_indicate_bathroom: '',
          has_childwilling_to_use_bathroom: '',
          has_child_have_accident: ''
        },
        childSleepingHabit: {
          has_child_sleep_on_crib: '',
          has_child_sleep_on_bed: '',
          how_does_child_becometired: '',
          has_child_sleep_at_night: '',
          has_child_get_up_in_morning: '',
          special_charecterstic_or_need: ''
        },
        socialRelationship: {
          child_description_by_parent: '',
          previous_experience: '',
          reaction_to_starnger: '',
          has_allow_play_alone: '',
          favouraite_toy: '',
          child_fear: '',
          how_parent_comfort_child: '',
          behaviour_management: '',
          how_child_gain_experience: ''
        },
        dailySchedule: {
          more_about_child: ''
        },
        authorizationAndConsent: {
          has_authorize_mychild: false,
          has_authorize_and_consent_agreement: false,
          has_parent_signature: false

        },
        sunscreenPermission: {
          has_sunscreen_provided_by_school: false,
          has_child_bring_sunscreen: false,
          has_parent_signature: false

        },
        toothBrushingInformation: {
          has_participate_in_toothbrushing: '',
          has_fluoride: false,
          has_school_toothbrushing: '',
          has_parent_signature: false

        },
        transportAuthority: {
          has_parent_drop_off: false,
          has_parent_pick_up: false,
          has_supervised_walk: false,
          has_public_private_van: false,
          has_program_bus_van: false,
          has_contract_van: false,
          has_private_transport_arranged_by_parent: false,
          has_other: false,
          has_parent_signature: false

        },
        schoolDirectory: {
          has_parent_information_publish: false,
          has_parent_wish_to_add_school_directory: false,
          has_parent_signature: false

        },
        localTripPermission: {
          has_parent_agreed_for_trip: false,
          has_parent_signature: false

        },
        parentAgreement: {
          has_parent_agreed_with_policies: false,
          has_parent_signature: false

        },
        photoRelease: {
          has_photo_permission_granted: '',
          has_parent_signature: false
        }
      },
      user: {
        signature: props.loginUserInfo.role_id === 2 ? '' : props.loginUserInfo.signature
      },
      parent1AddressSameAsChild: false,
      parent2AddressSameAsChild: false,
      showButtonLoader: true,
      gender: [{
        key: 'Male',
        value: 'male',
        text: 'Male',
      },
      {
        key: 'Female',
        value: 'female',
        text: 'Female',
      }],
      stateDropdown: constants.STATE_DROPDOWN,
      childRace: constants.ADD_CHILD_RACE,
      parentWorkTiming: constants.ADD_CHILD_PARENT_WORKING_TIME,
      addChildMenu: constants.ADD_CHILD_MENUS,
      editChildData: [],
      apiStatusCode: '',
      medicalReports: [],
      totalUploadedFiles: 0,
      allMedicalReport: [],
      activeChildId: '',
      lastForm: 'studentList',
      previousSubmittedStatusObj: {
        // showing tick icon when form is submitted
        'childInfo': false,
        'parent1': false,
        'parent2': false,
        'emergencyContact1': false,
        'emergencyContact2': false,
        'medicalInformation': false,
        'devReport': false,
        'childHealth': false,
        'childEatingHabit': false,
        'childToiletHabit': false,
        'childSleepingHabit': false,
        'socialRelationship': false,
        'dailySchedule': false,
        'parentAgreement': false,
        'offsiteActivityPermission': false,
        'localFieldTripPermission': false,
        'sunscreenPermission': false,
        'toothbrushingPermission': false,
        'photoRelease': false,
        'transportationAuthority': false,
        'schoolDirectoryForm': false
      },
      parentForm: 'familyInfo',
      subForm: 'childInfo'
    }
    // Add child Form All Vaild
    this.addChildFormValidator = new SimpleReactValidator()
    this.parent1FormValidator = new SimpleReactValidator()
    this.parent2FormValidator = new SimpleReactValidator()
    this.emeregency1FormValidator = new SimpleReactValidator()
    this.emeregency2FormValidator = new SimpleReactValidator()
    this.medicalInformationFormValidator = new SimpleReactValidator()
    this.childDevolpmentValidator = new SimpleReactValidator()
    this.childHealthValidator = new SimpleReactValidator()
    this.childEatingHabitValidator = new SimpleReactValidator()
    this.childToiletHabitValidator = new SimpleReactValidator()
    this.childSleepingHabitValidator = new SimpleReactValidator()
    this.childSocialRelationshipValidator = new SimpleReactValidator()
    this.parentAgreementValidator = new SimpleReactValidator()
    this.authorizationAndConsentValidator = new SimpleReactValidator()
    this.dailyScheduleValidator = new SimpleReactValidator()
    this.localTripPermissionValidator = new SimpleReactValidator()
    this.sunscreenPermissionValidator = new SimpleReactValidator()
    this.toothBrushingInformationValidator = new SimpleReactValidator()
    this.photoReleaseValidator = new SimpleReactValidator()
    this.transportAuthorityValidator = new SimpleReactValidator()
    this.schoolDirectoryValidator = new SimpleReactValidator()

    // refs of add child
    this.addChildMenuRef = React.createRef();
    this.addChildMenuSectionRef = React.createRef();
  }






  componentDidMount() {
    // this.setupBeforeUnloadListener();

    if (this.props.loginUserInfo.role_id === 2) {
      // fetching classes list which is used to assign to child
      this.getClassesList();
      // creating refs for mobile view
      this.createAddChildRefs();
    } else if (this.props.loginUserInfo.role_id === 3) {
      // creating refs for mobile view
      console.log('Atleast we were able to reach here');
      this.createAddChildRefs()
      let { editType, id } = this.props.history.location.state === undefined ? this.state : this.props.history.location.state;
      let isPropsExpired = this.props.history.location.state === undefined ? true : false;
      if (editType === 'parent') {
        //.......................................................
        getSelectedStudent(id).then(res => {
          console.log('Now I am a Parent and I have the following data for my child:', res.data)
          this.setState({
            editChildData: res.data,
            isPropsExpired: isPropsExpired,
            editType

          }, () => {
            if (this.state.isPropsExpired) {
              // if props is expired then default modal is opened
              this.setState({
                showButtonLoader: false
              })
            } else {
              this.fillAllValue()
            }
          })

          // this.setState({
          //   childForm: res.data,
          //   editType: editType
          // }, () => {
          //   this.props.history.push({
          //     pathname: '/student/edit',
          //     state: { childForm: this.state.childForm, editType: this.state.editType }
          //   })
          // })

        })
        //............................ console.log('Ohh Great! We reached here as well. Our childForm is:', childForm)
        // this.setState({
        //   editChildData: childForm,
        //   editType,
        //   showButtonLoader: false
        // }, () => {
        //   // filling all value in all modals which is to be edited and updated
        //   this.fillAllValue()
        // })
      } else {
        this.setState({
          showButtonLoader: false,
          editType
        })
      }
    } else {
      // 
      this.props.history.push('/home')
    }
  }

  // Setup the `beforeunload` event listener show alert modal  when browser window is closed
  setupBeforeUnloadListener = () => {
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      return ev.returnValue = 'Are you sure you want to close?';
    });
  };

  // finding all child list
  getEditStudentList = () => {
    console.log('getEditStudentList has props of history.location.state:', this.props.history.location.state);
    let { id, editType } = this.props.history.location.state === undefined ? this.state : this.props.history.location.state,
      isPropsExpired = this.props.history.location.state === undefined ? true : false;
    getSelectedStudent(id).then(res => {
      console.log('getSelectedStudent Fn in editChild function is called and its response is:', res.data)
      this.setState({
        editChildData: res.data,
        isPropsExpired: isPropsExpired,
        editType

      }, () => {
        if (this.state.isPropsExpired) {
          // if props is expired then default modal is opened
          this.setState({
            showButtonLoader: false
          })
        } else {
          this.fillAllValue()
        }
      })

      // this.setState({
      //   childForm: res.data,
      //   editType: editType
      // }, () => {
      //   this.props.history.push({
      //     pathname: '/student/edit',
      //     state: { childForm: this.state.childForm, editType: this.state.editType }
      //   })
      // })

    })

  }

  // finding all classes list
  getClassesList = () => {
    let { page_number, page_size } = this.state;
    viewAdminClassList(page_number, page_size).then(res => {
      console.log('getClassesList function has response', res);
      this.setState({
        allClassesInfo: res.data.length ? res.data : [],
        total_records: res.total_records,
        total_pages: Math.ceil(res.total_records / this.state.page_size),
      }, () => {
        this.getEditStudentList();
      });
    }).catch(err => {
      this.setState({
        apiStatusCode: err ? err.status : 500,
      }, () => {
        if (this.state.apiStatusCode === 401) {
          this.props.customProps._toastMessage('error', constants.SESSION_EXPIRED)
          this.props._removeToken()
        } else if (this.state.apiStatusCode === 500) {
          this.props.customProps._toastMessage('error', constants.SOMETHING_WENT_WRONG)
        } else {
          this.props.customProps._toastMessage('error', err.message)
        }
      })
    })

  }

  // find all value for addchild modal which is reused for edit child modal
  fillAllValue = () => {
    let { editChildData, loginUserInfo } = this.state;
    let {
      first_name,
      last_name,
      birth_date,
      birth_place,
      admission_date,
      expiry_date,
      address,
      city,
      state,
      zip_code,
      user,
      parentInfo,
      medicalInfo,
      emergencyInfo,
      healthReport,
      eatingHabitReport,
      toiletHabitReport,
      sleepingHabitReport,
      socialRelationshipReport,
      dailyScheduleReport,
      class_id,
      id,
      user_id
    } = editChildData,
      { childForm } = this.state,
      { childInfo } = childForm,
      parent1,
      parent2,
      emergencyContact1,
      emergencyContact2,
      medicalInformation,
      devReport,
      childHealth,
      childEatingHabit,
      childToiletHabit,
      childSleepingHabit,
      socialRelationship,
      dailySchedule,
      authorizationAndConsent,
      sunscreenPermission,
      toothBrushingInformation,
      transportAuthority,
      schoolDirectory,
      // parentPermission,
      activeValues,
      photoRelease, parentAgreement, localTripPermission;


    childInfo.id = id
    childInfo.first_name = first_name
    childInfo.last_name = last_name
    childInfo.birth_date = birth_date
    childInfo.birth_place = birth_place
    childInfo.admission_date = admission_date
    childInfo.expiry_date = expiry_date
    childInfo.address = address
    childInfo.city = city
    childInfo.state = state
    childInfo.zip_code = zip_code
    childInfo.class_id = class_id
    childInfo.child_id = id

    // childInfo.signature = user.signature



    parent1 = this.findParent1Info(parentInfo)
    parent2 = this.findParent2Info(parentInfo)
    emergencyContact1 = this.findEmergencyContact1Info(emergencyInfo)
    emergencyContact2 = this.findEmergencyContact2Info(emergencyInfo)
    medicalInformation = this.findMedicalInformation(medicalInfo)
    devReport = this.findDevReportInformation(editChildData.devReport)
    childHealth = this.findChildHealthInformation(healthReport)
    childEatingHabit = this.findChildEatingHabitInfo(eatingHabitReport)
    childToiletHabit = this.findChildToiletHabitInfo(toiletHabitReport)
    childSleepingHabit = this.findChildSleepingHabitInfo(sleepingHabitReport)
    socialRelationship = this.findSocialRelationshipInfo(socialRelationshipReport)
    dailySchedule = this.findDailyScheduleInfo(dailyScheduleReport)
    authorizationAndConsent = this.findAuthorizationAndConsentInfo(editChildData.authorizationAndConsent)
    sunscreenPermission = this.findSunscreenPermissionInfo(editChildData.sunscreenPermission)
    toothBrushingInformation = this.findToothBrushingInformation(editChildData.toothBrushingInformation)
    transportAuthority = this.findTransportAuthorityInfo(editChildData.transportAuthority)
    schoolDirectory = this.findSchoolDirectoryInfo(editChildData.schoolDirectory)
    photoRelease = this.findPhotoReleaseInfo(editChildData.photoRelease)
    parentAgreement = this.findParentAgreementInfo(editChildData.parentAgreement)
    localTripPermission = this.findLocalTripPermissionInfo(editChildData.localTripPermission)
    // parentPermission = this.findParentPermissionInfo(editChildData.parentPermission)

    parent1.child_id = id
    parent2.child_id = id
    emergencyContact1.child_id = id
    emergencyContact2.child_id = id
    medicalInformation.child_id = id
    devReport.child_id = id
    childHealth.child_id = id
    childEatingHabit.child_id = id
    childToiletHabit.child_id = id
    childSleepingHabit.child_id = id
    socialRelationship.child_id = id
    dailySchedule.child_id = id
    authorizationAndConsent.child_id = id
    sunscreenPermission.child_id = id
    toothBrushingInformation.child_id = id
    transportAuthority.child_id = id
    schoolDirectory.child_id = id
    photoRelease.child_id = id
    parentAgreement.child_id = id
    localTripPermission.child_id = id

    parent1.user_id = user_id
    parent2.user_id = user_id
    emergencyContact1.user_id = user_id
    emergencyContact2.user_id = user_id
    medicalInformation.user_id = user_id
    devReport.user_id = user_id
    childHealth.user_id = user_id
    childEatingHabit.user_id = user_id
    childToiletHabit.user_id = user_id
    childSleepingHabit.user_id = user_id
    socialRelationship.user_id = user_id
    dailySchedule.user_id = user_id
    authorizationAndConsent.user_id = user_id
    sunscreenPermission.user_id = user_id
    toothBrushingInformation.user_id = user_id
    transportAuthority.user_id = user_id
    schoolDirectory.user_id = user_id
    photoRelease.user_id = user_id
    parentAgreement.user_id = user_id
    localTripPermission.user_id = user_id



    if (loginUserInfo.role_id === 2) {
      activeValues = this.roomLocationField(class_id)
    }

    this.setState({
      user,
      childForm: {
        childInfo,
        parent1,
        parent2,
        emergencyContact1,
        emergencyContact2,
        medicalInformation,
        devReport,
        childHealth,
        childEatingHabit,
        childToiletHabit,
        childSleepingHabit,
        socialRelationship,
        dailySchedule,
        authorizationAndConsent,
        sunscreenPermission,
        toothBrushingInformation,
        transportAuthority,
        schoolDirectory,
        photoRelease,
        parentAgreement,
        localTripPermission
      },
      room: activeValues ? activeValues.room : '',
      location: activeValues ? activeValues.location : '',
      showButtonLoader: false
    })
  }
  // finding parent 1 info
  findParent1Info = (parentInfo) => {
    let { childForm } = this.state,
      {
        parent_type,
        first_name,
        last_name,
        phone1,
        phone2,
        email1,
        address,
        city,
        state,
        zip_code,
        business_name,
        business_address,
        work_start_time,
        work_end_time,
        business_phone,
        id

      } = parentInfo.length ? parentInfo[0] : childForm.parent1, parent1 = {};

    parent1.id = id
    parent1.parent_type = parent_type
    parent1.first_name = first_name
    parent1.last_name = last_name
    parent1.phone1 = phone1
    parent1.phone2 = phone2
    parent1.email1 = email1
    parent1.address = address
    parent1.city = city
    parent1.state = state
    parent1.zip_code = zip_code
    parent1.business_name = business_name
    parent1.business_address = business_address
    parent1.work_start_time = work_start_time
    parent1.work_end_time = work_end_time
    parent1.business_phone = business_phone

    return parent1
  }

  // finding parent 2 info
  findParent2Info = (parentInfo) => {
    let { childForm } = this.state,
      {
        parent_type,
        first_name,
        last_name,
        phone1,
        phone2,
        email1,
        address,
        city,
        state,
        zip_code,
        business_name,
        business_address,
        work_start_time,
        work_end_time,
        business_phone,
        id
      } = parentInfo.length === 2 ? parentInfo[1] : childForm.parent2, parent2 = {};

    parent2.id = id
    parent2.parent_type = parent_type
    parent2.first_name = first_name
    parent2.last_name = last_name
    parent2.phone1 = phone1
    parent2.phone2 = phone2
    parent2.email1 = email1
    parent2.address = address
    parent2.city = city
    parent2.state = state
    parent2.zip_code = zip_code
    parent2.business_name = business_name
    parent2.business_address = business_address
    parent2.work_start_time = work_start_time
    parent2.work_end_time = work_end_time
    parent2.business_phone = business_phone
    return parent2
  }
  // finding emergenecy contact 1 info

  findEmergencyContact1Info = (emergencyInfo) => {

    let { childForm } = this.state,
      {
        type,
        first_name,
        last_name,
        phone1,
        phone2,
        email1,
        address,
        city,
        state,
        zip_code,
        relationship,
        has_emergency_release, id
      } = emergencyInfo.length ? emergencyInfo[0] : childForm.emergencyContact1, emergencyContact1 = {};

    emergencyContact1.id = id
    emergencyContact1.type = type
    emergencyContact1.first_name = first_name
    emergencyContact1.last_name = last_name
    emergencyContact1.phone1 = phone1
    emergencyContact1.phone2 = phone2
    emergencyContact1.email1 = email1
    emergencyContact1.address = address
    emergencyContact1.city = city
    emergencyContact1.state = state
    emergencyContact1.zip_code = zip_code
    emergencyContact1.relationship = relationship
    emergencyContact1.has_emergency_release = has_emergency_release

    return emergencyContact1

  }
  // finding emergenecy contact 2 info

  findEmergencyContact2Info = (emergencyInfo) => {
    let { childForm } = this.state,
      {
        type,
        first_name,
        last_name,
        phone1,
        phone2,
        email1,
        address,
        city,
        state,
        zip_code,
        relationship,
        has_emergency_release, id
      } = emergencyInfo.length === 2 ? emergencyInfo[1] : childForm.emergencyContact2, emergencyContact2 = {};

    emergencyContact2.id = id
    emergencyContact2.type = type
    emergencyContact2.first_name = first_name
    emergencyContact2.last_name = last_name
    emergencyContact2.phone1 = phone1
    emergencyContact2.phone2 = phone2
    emergencyContact2.email1 = email1
    emergencyContact2.address = address
    emergencyContact2.city = city
    emergencyContact2.state = state
    emergencyContact2.zip_code = zip_code
    emergencyContact2.relationship = relationship
    emergencyContact2.has_emergency_release = has_emergency_release

    return emergencyContact2

  }
  // finding medical info

  findMedicalInformation = (medicalInfo) => {
    let { childForm } = this.state,
      {
        doctor_name,
        doctor_phone,
        doctor_email,
        doctor_primary_language,
        doctor_insurance_carrier,
        doctor_insurance_number,
        last_physical_date,
        lead_screen_date,
        immunizations,
        allergies,
        has_allergy,
        date_of_doctor_letter,
        medicine_expiration_date,
        eye_color,
        hair_color,
        gender,
        height,
        weight,
        race,
        identity_marks,
        add_child_to_directory,
        add_parent_to_directory,
        add_parent2_to_directory,
        has_signature_checked,
        room,
        location,
        id

      } = medicalInfo.length ? medicalInfo[0] : childForm.medicalInformation, medicalInformation = {};

    medicalInformation.id = id

    medicalInformation.doctor_name = doctor_name
    medicalInformation.doctor_phone = doctor_phone
    medicalInformation.doctor_email = doctor_email
    medicalInformation.doctor_primary_language = doctor_primary_language
    medicalInformation.doctor_insurance_carrier = doctor_insurance_carrier
    medicalInformation.doctor_insurance_number = doctor_insurance_number
    medicalInformation.last_physical_date = last_physical_date
    medicalInformation.lead_screen_date = lead_screen_date
    medicalInformation.immunizations = immunizations
    medicalInformation.allergies = allergies
    medicalInformation.has_allergy = has_allergy
    medicalInformation.date_of_doctor_letter = date_of_doctor_letter
    medicalInformation.medicine_expiration_date = medicine_expiration_date
    medicalInformation.eye_color = eye_color
    medicalInformation.hair_color = hair_color
    medicalInformation.gender = gender
    medicalInformation.height = height
    medicalInformation.weight = weight
    medicalInformation.race = race
    medicalInformation.identity_marks = identity_marks
    medicalInformation.add_child_to_directory = add_child_to_directory
    medicalInformation.add_parent_to_directory = add_parent_to_directory
    medicalInformation.add_parent2_to_directory = add_parent2_to_directory
    medicalInformation.has_signature_checked = has_signature_checked
    // medicalInformation.class_id = class_id
    medicalInformation.room = room
    medicalInformation.location = location
    medicalInformation.medical_reports = medicalInfo.length ? medicalInfo[0].medical_reports : [];
    // medicalInformation.physical_reports = medicalInfo.length ? medicalInfo[0].physical_reports === '' ? '' : medicalInfo[0].physical_reports : ''
    return medicalInformation
  }
  // finding child devolpmental reprot

  findDevReportInformation = (devReport) => {
    let { childForm } = this.state, {
      age_began_sitting,
      crawling,
      walking,
      talking,
      has_child_pull_up,
      has_child_crawling,
      has_child_walk_with_support,
      has_speech_difficulties,
      special_words_to_describe,
      language_spoken_at_home,
      has_history_of_colics,
      has_child_use_pacifier_or_sucks_thumbs,
      when_child_use_pacifier_or_sucks_thumbs,
      has_child_have_fussy_time,
      when_child_have_fussy_time,
      how_parent_handle_time,
      id
    } = devReport.length ? devReport[0] : childForm.devReport, devReports = {};

    devReports.id = id

    devReports.age_began_sitting = age_began_sitting
    devReports.crawling = crawling
    devReports.walking = walking
    devReports.talking = talking
    devReports.has_child_pull_up = has_child_pull_up
    devReports.has_child_crawling = has_child_crawling
    devReports.has_child_walk_with_support = has_child_walk_with_support
    devReports.has_speech_difficulties = has_speech_difficulties
    devReports.special_words_to_describe = special_words_to_describe
    devReports.language_spoken_at_home = language_spoken_at_home
    devReports.has_history_of_colics = has_history_of_colics
    devReports.has_child_use_pacifier_or_sucks_thumbs = has_child_use_pacifier_or_sucks_thumbs
    devReports.when_child_use_pacifier_or_sucks_thumbs = when_child_use_pacifier_or_sucks_thumbs
    devReports.has_child_have_fussy_time = has_child_have_fussy_time
    devReports.when_child_have_fussy_time = when_child_have_fussy_time
    devReports.how_parent_handle_time = how_parent_handle_time

    return devReports
  }

  // finding child health information

  findChildHealthInformation = (healthReport) => {
    let { childForm } = this.state,
      {
        has_complication_at_birth,
        serious_illness_hospitalization,
        special_physical_condition,
        allergies,
        regular_medications,
        id
      } = healthReport.length ? healthReport[0] : childForm.childHealth, childHealth = {};
    childHealth.id = id

    childHealth.has_complication_at_birth = has_complication_at_birth
    childHealth.serious_illness_hospitalization = serious_illness_hospitalization
    childHealth.special_physical_condition = special_physical_condition
    childHealth.allergies = allergies
    childHealth.regular_medications = regular_medications
    return childHealth
  }

  // finding child eating habit information

  findChildEatingHabitInfo = (eatingHabitReport) => {
    let { childForm } = this.state, {
      special_charecters_or_diffculties,
      special_formula_prepration_details,
      favouraite_food,
      food_refused,
      child_fedon_lap,
      high_chair,
      has_child_use_spoon,
      has_child_use_fork,
      has_child_use_hand,
      id
    } = eatingHabitReport.length ? eatingHabitReport[0] : childForm.childEatingHabit, childEatingHabit = {};

    childEatingHabit.id = id

    childEatingHabit.special_charecters_or_diffculties = special_charecters_or_diffculties
    childEatingHabit.special_formula_prepration_details = special_formula_prepration_details
    childEatingHabit.favouraite_food = favouraite_food
    childEatingHabit.food_refused = food_refused
    childEatingHabit.child_fedon_lap = child_fedon_lap
    childEatingHabit.high_chair = high_chair
    childEatingHabit.has_child_use_spoon = has_child_use_spoon
    childEatingHabit.has_child_use_fork = has_child_use_fork
    childEatingHabit.has_child_use_hand = has_child_use_hand

    return childEatingHabit

  }
  // finding child toilet habit information

  findChildToiletHabitInfo = (toiletHabitReport) => {
    let { childForm } = this.state,
      {
        has_diaper_used,
        has_diaper_rash_occur,
        has_parent_use_oil,
        has_parent_powder,
        has_parent_lotion,
        has_parent_use_other,
        has_bowel_movement_regular,
        how_many_time_bowl_move,
        has_problem_of_diarrhea,
        has_problem_of_constipation,
        has_toilet_training,
        particular_procedure_of_child,
        has_child_use_potty_chair,
        has_child_use_special_seat,
        has_child_use_regular_seat,
        how_child_indicate_bathroom,
        has_childwilling_to_use_bathroom,
        has_child_have_accident,
        id
      } = toiletHabitReport.length ? toiletHabitReport[0] : childForm.childToiletHabit, childToiletHabit = {};
    childToiletHabit.id = id

    childToiletHabit.has_diaper_used = has_diaper_used
    childToiletHabit.has_diaper_rash_occur = has_diaper_rash_occur
    childToiletHabit.has_parent_use_oil = has_parent_use_oil
    childToiletHabit.has_parent_powder = has_parent_powder
    childToiletHabit.has_parent_lotion = has_parent_lotion
    childToiletHabit.has_parent_use_other = has_parent_use_other
    childToiletHabit.has_bowel_movement_regular = has_bowel_movement_regular
    childToiletHabit.how_many_time_bowl_move = how_many_time_bowl_move
    childToiletHabit.has_problem_of_diarrhea = has_problem_of_diarrhea
    childToiletHabit.has_problem_of_constipation = has_problem_of_constipation
    childToiletHabit.has_toilet_training = has_toilet_training
    childToiletHabit.particular_procedure_of_child = particular_procedure_of_child
    childToiletHabit.has_child_use_potty_chair = has_child_use_potty_chair
    childToiletHabit.has_child_use_special_seat = has_child_use_special_seat
    childToiletHabit.has_child_use_regular_seat = has_child_use_regular_seat
    childToiletHabit.how_child_indicate_bathroom = how_child_indicate_bathroom
    childToiletHabit.has_childwilling_to_use_bathroom = has_childwilling_to_use_bathroom
    childToiletHabit.has_child_have_accident = has_child_have_accident

    return childToiletHabit

  }

  // finding child sleeping habit information

  findChildSleepingHabitInfo = (sleepingHabitReport) => {

    let { childForm } = this.state,
      {
        has_child_sleep_on_crib,
        has_child_sleep_on_bed,
        how_does_child_becometired,
        has_child_sleep_at_night,
        has_child_get_up_in_morning,
        special_charecterstic_or_need, id
      } = sleepingHabitReport.length ? sleepingHabitReport[0] : childForm.childSleepingHabit, childSleepingHabit = {};

    childSleepingHabit.id = id

    childSleepingHabit.has_child_sleep_on_crib = has_child_sleep_on_crib
    childSleepingHabit.has_child_sleep_on_bed = has_child_sleep_on_bed
    childSleepingHabit.how_does_child_becometired = how_does_child_becometired
    childSleepingHabit.has_child_sleep_at_night = has_child_sleep_at_night
    childSleepingHabit.has_child_get_up_in_morning = has_child_get_up_in_morning
    childSleepingHabit.special_charecterstic_or_need = special_charecterstic_or_need

    return childSleepingHabit
  }

  // finding child social relationship information
  findSocialRelationshipInfo = (socialRelationshipReport) => {
    let { childForm } = this.state,
      {
        child_description_by_parent,
        previous_experience,
        reaction_to_starnger,
        has_allow_play_alone,
        favouraite_toy,
        child_fear,
        how_parent_comfort_child,
        behaviour_management,
        how_child_gain_experience,
        id
      } = socialRelationshipReport.length ? socialRelationshipReport[0] : childForm.socialRelationship, socialRelationship = {};
    socialRelationship.id = id

    socialRelationship.child_description_by_parent = child_description_by_parent
    socialRelationship.previous_experience = previous_experience
    socialRelationship.reaction_to_starnger = reaction_to_starnger
    socialRelationship.has_allow_play_alone = has_allow_play_alone
    socialRelationship.favouraite_toy = favouraite_toy
    socialRelationship.child_fear = child_fear
    socialRelationship.how_parent_comfort_child = how_parent_comfort_child
    socialRelationship.behaviour_management = behaviour_management
    socialRelationship.how_child_gain_experience = how_child_gain_experience

    return socialRelationship
  }
  // finding daily schedule information

  findDailyScheduleInfo = (dailyScheduleReport) => {
    let { childForm } = this.state,
      { more_about_child, id } = dailyScheduleReport.length ? dailyScheduleReport[0] : childForm.dailySchedule, dailySchedule = {};
    dailySchedule.id = id

    dailySchedule.more_about_child = more_about_child;

    return dailySchedule
  }
  _hasTrue = (value) => {
    return (value === 'true' || value === true) ? true : false
  }
  // finding authorization and consent information
  findAuthorizationAndConsentInfo = (authorizationAndConsent) => {

    let { childForm } = this.state,
      { has_authorize_mychild,
        has_parent_signature,
        has_authorize_and_consent_agreement, id
      } = authorizationAndConsent.length ? authorizationAndConsent[0] : childForm.authorizationAndConsent, authorizationAndConsents = {};

    authorizationAndConsents.id = id
    authorizationAndConsents.has_authorize_mychild = has_authorize_mychild
    authorizationAndConsents.has_authorize_and_consent_agreement = has_authorize_and_consent_agreement
    authorizationAndConsents.has_parent_signature = this._hasTrue(has_parent_signature)
    return authorizationAndConsents
  }

  // finding sunscreen information
  findSunscreenPermissionInfo = (sunscreenPermission) => {
    let { childForm } = this.state,
      {
        has_sunscreen_provided_by_school,
        has_parent_signature,
        has_child_bring_sunscreen, id
      } = sunscreenPermission.length ? sunscreenPermission[0] : childForm.sunscreenPermission, sunscreenPermissions = {};

    sunscreenPermissions.id = id
    sunscreenPermissions.has_sunscreen_provided_by_school = has_sunscreen_provided_by_school
    sunscreenPermissions.has_child_bring_sunscreen = has_child_bring_sunscreen
    sunscreenPermissions.has_parent_signature = this._hasTrue(has_parent_signature)


    return sunscreenPermissions
  }

  // finding tooth brushing information
  findToothBrushingInformation = (toothBrushingInformation) => {

    let { childForm } = this.state,
      {
        has_participate_in_toothbrushing,
        has_fluoride,
        has_parent_signature,
        has_school_toothbrushing,
        id
      } = toothBrushingInformation.length ? toothBrushingInformation[0] : childForm.toothBrushingInformation, toothBrushingInformations = {};

    toothBrushingInformations.id = id

    toothBrushingInformations.has_participate_in_toothbrushing = has_participate_in_toothbrushing
    toothBrushingInformations.has_fluoride = has_fluoride
    toothBrushingInformations.has_school_toothbrushing = has_school_toothbrushing
    toothBrushingInformations.has_parent_signature = this._hasTrue(has_parent_signature)


    return toothBrushingInformations

  }

  // finding Transport Authority information
  findTransportAuthorityInfo = (transportAuthority) => {
    let { childForm } = this.state,
      {
        has_parent_drop_off,
        has_parent_pick_up,
        has_supervised_walk,
        has_public_private_van,
        has_program_bus_van,
        has_contract_van,
        has_private_transport_arranged_by_parent,
        has_other,
        has_parent_signature,
        id,

      } = transportAuthority.length ? transportAuthority[0] : childForm.transportAuthority, transportsAuthority = {};

    transportsAuthority.id = id

    transportsAuthority.has_parent_drop_off = has_parent_drop_off
    transportsAuthority.has_parent_pick_up = has_parent_pick_up
    transportsAuthority.has_supervised_walk = has_supervised_walk
    transportsAuthority.has_public_private_van = has_public_private_van
    transportsAuthority.has_program_bus_van = has_program_bus_van
    transportsAuthority.has_contract_van = has_contract_van
    transportsAuthority.has_private_transport_arranged_by_parent = has_private_transport_arranged_by_parent
    transportsAuthority.has_other = has_other
    transportsAuthority.has_parent_signature = this._hasTrue(has_parent_signature)

    return transportsAuthority
  }
  // finding School Directory information
  findSchoolDirectoryInfo = (schoolDirectory) => {
    let { childForm } = this.state,
      {
        has_parent_information_publish,
        has_parent_wish_to_add_school_directory, id,
        has_parent_signature
      } = schoolDirectory.length ? schoolDirectory[0] : childForm.sunscreenPermission, schoolsDirectory = {};
    schoolsDirectory.id = id

    schoolsDirectory.has_parent_information_publish = has_parent_information_publish
    schoolsDirectory.has_parent_wish_to_add_school_directory = has_parent_wish_to_add_school_directory
    schoolsDirectory.has_parent_signature = this._hasTrue(has_parent_signature)

    return schoolsDirectory
  }
  // finding Photo Release information
  findPhotoReleaseInfo = (photoReleaseInfo) => {

    let { childForm } = this.state,
      {
        has_photo_permission_granted,
        has_parent_signature,
        id
      } = photoReleaseInfo.length ? photoReleaseInfo[0] : childForm.photoRelease, photoRelease = {};

    photoRelease.id = id
    photoRelease.has_photo_permission_granted = has_photo_permission_granted
    photoRelease.has_parent_signature = this._hasTrue(has_parent_signature)

    return photoRelease
  }

  findLocalTripPermissionInfo = (localTripPermissionInfo) => {
    let { childForm } = this.state,
      {
        has_parent_agreed_for_trip,
        has_parent_signature,
        id
      } = localTripPermissionInfo.length ? localTripPermissionInfo[0] : childForm.localTripPermission, localTripPermission = {};

    localTripPermission.id = id
    localTripPermission.has_parent_signature = this._hasTrue(has_parent_signature)
    localTripPermission.has_parent_agreed_for_trip = has_parent_agreed_for_trip

    return localTripPermission
  }
  // finding Parent Permission information
  findParentAgreementInfo = (parentAgreementInfo) => {
    let { childForm } = this.state,
      {
        has_parent_agreed_with_policies,
        has_parent_signature,

        id
      } = parentAgreementInfo.length ? parentAgreementInfo[0] : childForm.parentAgreement, parentAgreement = {};

    parentAgreement.id = id

    parentAgreement.has_parent_agreed_with_policies = has_parent_agreed_with_policies
    parentAgreement.has_parent_signature = this._hasTrue(has_parent_signature)

    return parentAgreement
  }
  //creating refs for addchild menu in mobile view
  createAddChildRefs = () => {
    let { addChildMenu } = this.state;
    this.addChildMenuRef = [];
    for (let i = 0; i < addChildMenu.length; i++) {
      this.addChildMenuRef.push(React.createRef())
    }
  }

  // onchange of textbox save value in state
  _handleFormInput = (modalType, event, dropDownValue, dropDownName) => {
    let { name, value } = event.target, { childForm } = this.state;
    childForm[modalType][name] = value;
    this.setState({ childForm })
  }
  _handleAdminAutoRenewal = () => {

  }

  // onchange in dropdown save value in state 
  //_handleFormDropDown handle all dropdown in whole add child form
  _handleFormDropDown = (modalType, event, dropDownValue, dropDownName) => {
    let { childForm } = this.state;
    childForm[modalType][dropDownName] = dropDownValue;
    this.setState({ childForm })
  }

  // on changing dropdown of class fill value of Room and Location field
  _fillRoomLocationField = (modalType, event) => {
    let { name, value } = event.target, { childForm, allClassesInfo, room, location } = this.state, activeValue;
    if (value) {
      activeValue = allClassesInfo.filter(x => {
        if (x.id === parseInt(value)) {
          return x
        }
      })[0]
      childForm[modalType][name] = value;
      room = activeValue.room
      location = activeValue.location
      this.setState({ childForm, room, location })
    }

  }
  // finding room location and other detail of active class
  roomLocationField = (id) => {
    let { allClassesInfo } = this.state, activeValue;
    activeValue = allClassesInfo.filter(x => {
      if (x.id === parseInt(id)) {
        return x
      }
      return false
    })[0]

    return activeValue
  }










  
  onChangeHandler = event => {

    console.log(event.target.files[0])

  }
  onClickHandler = (event) => {
    const data = new FormData()
    data.append('file', this.state.selectedFile)
  }


















  _handleFileUploadAllergy = (modalType, event, callback) => {
var indexOfAllergyFile 
    let { id, files } = event.target,
      { medicalReports, allMedicalReport, childForm } = this.state,
      { medicalInformation } = childForm,
      { medical_reports } = medicalInformation,
      // physicalReports = physical_reports === '' ? '' : physical_reports.split(','),
      // physicalReportLength = physicalReports === '' ? 0 : Array.isArray(physicalReports) ? physicalReports.length : '',
      upcomingFileLength = files.length + medicalReports.length + medical_reports.length;
    if (files.length <= 5) {
      if (upcomingFileLength <= 5) {
        indexOfAllergyFile=upcomingFileLength
        for (let x of files) {
          medicalReports.push(x)
        }
        this.setState({ medicalReports })
      }
      else {
        this.props.customProps._toastMessage('error', 'Maximum 5 files can be uploaded')
        return false
      }
    }
    else {
      this.props.customProps._toastMessage('error', 'Maximum 5 files can be uploaded')
      return false
    }
    var x = document.getElementById(`${id}`);
    var txt = "";
    if ('files' in x) {
      if (x.files.length === 0) {
        txt = "Select one or more files.";
      } else {
        for (var i = 0; i < x.files.length; i++) {
          var file = x.files[i];
          if ('name' in file) {
            txt += "Filename: " + file.name;
            allMedicalReport.push(file.name)
          
          }
        }
      }
    }
    else {
      if (x.value === "") {
        txt += "Select one or more files.";
      } else {
        txt += "The files property is not supported by your browser!";
        txt += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
        allMedicalReport.push(txt)
      }
    }
    console.log("All Medical Reports", allMedicalReport)
    if (files.length <= 5) {
      if (allMedicalReport.length <= 5) {
        callback(indexOfAllergyFile)
        this.setState({
          // medicalReports: files,
          allMedicalReport
        })
      } else {
        this.props.customProps._toastMessage('error', 'Maximum 5 files can be uploaded')
      }
    } else {
      this.setState({
        allMedicalReport: []
      }, () => {
        this.props.customProps._toastMessage('error', 'Maximum 5 files can be uploaded')
      })
    }
    console.log("this is my files  allMedicalReport "+ JSON.stringify(allMedicalReport.length))
    console.log("this is my files  medicalReports "+ JSON.stringify(medicalReports.length))
  }






  // handle file input of add child form
  _handleFileUpload = (modalType, event) => { 
    let { id, files } = event.target,
      { medicalReports, allMedicalReport, childForm } = this.state,
      { medicalInformation } = childForm,
      { medical_reports } = medicalInformation,
      // physicalReports = physical_reports === '' ? '' : physical_reports.split(','),
      // physicalReportLength = physicalReports === '' ? 0 : Array.isArray(physicalReports) ? physicalReports.length : '',
      upcomingFileLength = files.length + medicalReports.length + medical_reports.length;
    if (files.length <= 5) {
      if (upcomingFileLength <= 5) {
       
        for (let x of files) {
          medicalReports.push(x)
        }
        this.setState({ medicalReports })
      }
      else {
        this.props.customProps._toastMessage('error', 'Maximum 5 files can be uploaded')
        return false
      }
    }
    else {
      this.props.customProps._toastMessage('error', 'Maximum 5 files can be uploaded')
      return false
    }
    var x = document.getElementById(`${id}`);
    var txt = "";
    if ('files' in x) {
      if (x.files.length === 0) {
        txt = "Select one or more files.";
      } else {
        for (var i = 0; i < x.files.length; i++) {
          var file = x.files[i];
          if ('name' in file) {
            txt += "Filename: " + file.name;
            allMedicalReport.push(file.name)
          }
        }
      }
    }
    else {
      if (x.value === "") {
        txt += "Select one or more files.";
      } else {
        txt += "The files property is not supported by your browser!";
        txt += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
        allMedicalReport.push(txt)
      }
    }
    console.log("All Medical Reports", allMedicalReport)
    if (files.length <= 5) {
      if (allMedicalReport.length <= 5) {
        this.setState({
          // medicalReports: files,
          allMedicalReport
        })
      } else {
        this.props.customProps._toastMessage('error', 'Maximum 5 files can be uploaded')
      }
    } else {
      this.setState({
        allMedicalReport: []
      }, () => {
        this.props.customProps._toastMessage('error', 'Maximum 5 files can be uploaded')
      })
    }
    console.log("this is my files  allMedicalReport "+ JSON.stringify(allMedicalReport.length))
    console.log("this is my files  medicalReports "+ JSON.stringify(medicalReports.length))

  }
  _viewReport = (url) => {
    window.open(url, "_blank")
    return false;
  }
  _removeMedicalReport = (index, event) => {
   
    let { allMedicalReport, medicalReports } = this.state,
      data = medicalReports
  var  tempMedicalReports = [];

    for (let i in data) {
      if (parseInt(i)  !== index) { 
        tempMedicalReports.push(data[parseInt(i)])
      }
    } 
    allMedicalReport.splice(index, 1)
    // this.setState({
    //   allMedicalReport:  allMedicalReport, medicalReports:medicalReports
    // })

  //   this.setState((prevState) => {
  //     return {
  //        medicalReports:tempMedicalReports  
  //     };
  // })
  this.setState({ medicalReports: tempMedicalReports ,allMedicalReport:  allMedicalReport}, () => {
    console.log("aa",allMedicalReport.length, this.state.allMedicalReport.length)
    console.log("MM",tempMedicalReports.length,this.state.medicalReports.length) 
  });
 
 

    
    // medicalReports
    // allMedicalReport.splice(index, 1)
  }

  // handle toggle button and assign values child address,zipcode,state to parent1 and parent2
  _handleSameAddressTogglebutton = (modalType, event) => {

    let { childForm, parent1AddressSameAsChild, parent2AddressSameAsChild } = this.state,
      { checked, id } = event.target,
      { childInfo } = childForm;

    //add child address,city,state,zipcode in parent1 or parent2 modal
    if (checked) {
      childForm[modalType]["address"] = childInfo.address;
      childForm[modalType]["city"] = childInfo.city;
      childForm[modalType]["state"] = childInfo.state;
      childForm[modalType]["zip_code"] = childInfo.zip_code;

    }
    else {
      //remove child address,city,state,zipcode in parent1 or parent2 modal
      childForm[modalType]["address"] = '';
      childForm[modalType]["city"] = '';
      childForm[modalType]["state"] = '';
      childForm[modalType]["zip_code"] = '';
    }

    //handle togglebutton value and updated child modal
    if ("parent1AddressSameAsChild" === id) {
      parent1AddressSameAsChild = checked
      this.setState({
        childForm,
        parent1AddressSameAsChild,

      })
    }
    else {
      parent2AddressSameAsChild = checked
      this.setState({
        childForm,
        parent2AddressSameAsChild,

      })
    }

  }

  // handle checkbox of all forms
  _handleCheckBox = (modalType, event) => {

    let { childForm } = this.state, { name, checked } = event.target;
    // These checks are implemented so that single checkbox is selected from multiple check boxes
    if (modalType === "sunscreenPermission") {
      if (name === "has_sunscreen_provided_by_school") {
        childForm[modalType]['has_child_bring_sunscreen'] = !checked
      }
      else if (name === "has_child_bring_sunscreen") {
        childForm[modalType]['has_sunscreen_provided_by_school'] = !checked
      }
      else {

      }
    }
    else if (modalType === "schoolDirectory") {
      if (name === "has_parent_information_publish") {
        childForm[modalType]['has_parent_wish_to_add_school_directory'] = !checked

      } else if (name === "has_parent_wish_to_add_school_directory") {
        childForm[modalType]['has_parent_information_publish'] = !checked
      }
    }

    childForm[modalType][name] = checked;

    this.setState({
      childForm
    })
  }

  //scroll active add child menu to left in mobile view
  scrollAddChildMenu = (parentForm) => {
    let addChildMenuSectionRef = this.addChildMenuSectionRef && this.addChildMenuSectionRef.current ? true : false;
    if (addChildMenuSectionRef) {
      if (parentForm === "") {
      } else {
        this.addChildMenuSectionRef.current.scrollTo({ left: this.addChildMenuRef[parentForm].current.offsetLeft, behavior: 'smooth' })
      }
    }
  }

  //form is saved step by step, counter is incremented and next form is loaded
  _saveForm = (validationName, currentModalName, nextParentForm, nextSubForm) => {
    if (validationName.allValid()) {
      this.setState({
        showButtonLoader: true,
        isloadTabCalled: false
      }, () => {
        this.findCurrentModal(currentModalName, nextParentForm, nextSubForm)
      })
    } else {
      validationName.showMessages();
      this.forceUpdate();
    }
  }
  // showing next form when previous forms have all field valid
  showNextForm = (nextParentForm, nextSubForm) => {
    let { isloadTabCalled
    } = this.state;
    if (!isloadTabCalled) {
      this.setState({
        showButtonLoader: false,
        subForm: nextSubForm,
        parentForm: nextParentForm

      }, () => {
        // this.scrollAddChildMenu(nextSubForm)
      })
    }

  }

  updateChild = (updatedChildModal, nextParentForm, nextSubForm) => {
    this.uploadMedicalReport(updatedChildModal, nextParentForm, nextSubForm)
  }
  // check if medical report is uploaded
  uploadMedicalReport = (updatedChildModal, nextParentForm, nextSubForm) => {
    let { medicalReports, loginUserInfo, editType, childForm } = this.state,
      { medicalInformation } = childForm,
      { medical_reports } = medicalInformation,
      { role_id } = loginUserInfo,
      data = new FormData();
    //console.log("childForm has child info id as: ",childForm.childInfo.id);
    data.append('id', updatedChildModal.medicalInformation.child_id)
    data.append('type', 'medical_docs')
    if (medicalReports.length) {
      for (let i = 0; i < medicalReports.length; i++) {
        data.append("files", medicalReports[i])
      }
      console.log("I have reached here for the data before uploading the files  : ", data)

      // calling file upload api
      fileUpload(data).then(res => {
        console.log("I have reached here for response of uploading files : ", res)
        // var report =res.files;
        for (let k = 0; k < res.files.length; k++) {
          let obj = {
            physical_report: res.files[k]
          }
          medical_reports.push(obj);
        }
        // physical_reports=physical_reports === ''?'':physical_reports  + ',' + report
        updatedChildModal.medicalInformation["medical_reports"] = medical_reports;
        if (editType === "parent") {
          this.updateChildInfo(updatedChildModal, nextParentForm, nextSubForm)
        } else if (role_id === 2) {
          this.saveChildInfo(updatedChildModal, nextParentForm, nextSubForm)
        } else {
          this._submitChildForm(updatedChildModal, nextParentForm, nextSubForm)
        }
      }).catch(err => {
        this.setState({
          apiStatusCode: err ? err.status : 500,
          showButtonLoader: false
        }, () => {
          if (this.state.apiStatusCode === 401) {
            this.props.customProps._toastMessage('error', constants.SESSION_EXPIRED)
            this.props._removeToken()
          } else if (this.state.apiStatusCode === 500) {
            this.props.customProps._toastMessage('error', constants.SOMETHING_WENT_WRONG)
          }
          else {
            this.props.customProps._toastMessage('error', err.message)
          }
        })
      })
    }
    else {

      if (editType === "parent") {
        this.updateChildInfo(updatedChildModal, nextParentForm, nextSubForm)
      } else if (role_id === 2) {
        this.saveChildInfo(updatedChildModal, nextParentForm, nextSubForm)
      } else {
        this._submitChildForm(updatedChildModal, nextParentForm, nextSubForm)
      }
    }
  }
  // calling update student api
  saveChildInfo = (data, nextParentForm, nextSubForm) => {
    console.log('For admin, the data to be sent to update student is : ', data);

    updateStudent(data).then(res => {
      this.setState({
        showButtonLoader: false,
        // activeTab: tabName,
      }, () => {
        if (this.state.lastForm === nextParentForm) {
          this.props.customProps._toastMessage('success', res.message)
          this.props.history.push("/student")
        } else {
          this.props.customProps._toastMessage('success', res.message)
          this.showNextForm(nextParentForm, nextSubForm)
        }
        // this.showNextForm()
        // this.props.customProps._toastMessage('success', res.message)
      })

    }).catch(err => {
      this.setState({
        apiStatusCode: err ? err.status : 500,
        showButtonLoader: false
      }, () => {
        if (this.state.apiStatusCode === 401) {
          this.props.customProps._toastMessage('error', constants.SESSION_EXPIRED)
          this.props._removeToken()
        } else if (this.state.apiStatusCode === 500) {
          this.props.customProps._toastMessage('error', constants.SOMETHING_WENT_WRONG)
        }
        else {
          this.props.customProps._toastMessage('error', err.message)
        }
      })

    })
  }
  _handleNext = (validationName, currentModalName, nextParentForm, nextSubForm) => {
    if (validationName.allValid()) {
      this.setState({
        showButtonLoader: false,
      }, () => {
        this.showNextForm(nextParentForm, nextSubForm)

        // this.showNextForm()
        // this.props.customProps._toastMessage('success', res.message)
      })
    } else {
      validationName.showMessages();
      this.forceUpdate();
    }

  }
  // submit child form 
  _submitChildForm = (updatedChildModal, nextParentForm, nextSubForm) => {
    let data = updatedChildModal, { previousSubmittedStatusObj, subForm } = this.state;
    console.log("I have the previousSubmittedStatusObj as:", previousSubmittedStatusObj[`${subForm}`]);
    previousSubmittedStatusObj[`${subForm}`] = true
    console.log("I have the previousSubmittedStatusObj as:", previousSubmittedStatusObj);


    // if(isloadTabCalled){
    //   previousSubmittedStatusObj[`${activeTab}`]=true
    // }else{
    //   previousSubmittedStatusObj[`${subForm}`]=true
    // }
    addChild(data).then(res => {
      let child_id = res.child_id ? res.child_id : this.state.activeChildId;
      this.setState({
        showButtonLoader: false,
        activeChildId: child_id,
        previousSubmittedStatusObj: previousSubmittedStatusObj
      }, () => {
        if (this.state.lastForm === nextParentForm) {
          this.props.customProps._toastMessage('success', res.message)
          this.props.history.push("/student")
        } else {
          this.props.customProps._toastMessage('success', res.message)
          this.showNextForm(nextParentForm, nextSubForm)
        }
      })
    }).catch(err => {
      this.setState({
        apiStatusCode: err ? err.status : 500,
        showButtonLoader: false
      }, () => {
        if (this.state.apiStatusCode === 401) {
          this.props.customProps._toastMessage('error', constants.SESSION_EXPIRED)
          this.props._removeToken()
        } else if (this.state.apiStatusCode === 500) {
          this.props.customProps._toastMessage('error', constants.SOMETHING_WENT_WRONG)
        }
        else {
          this.props.customProps._toastMessage('error', err.message)
        }
      })
    })
  }
  // update child in parent module
  updateChildInfo = (data, nextParentForm, nextSubForm) => {
    // let { childForm, editType, loginUserInfo, activeChildId } = this.state,
    //   updatedValues = childForm[modalName],
    //   updatedChildModal = {},
    //   currentModalName = modalName;

    updateChild(data).then(res => {
      this.setState({
        showButtonLoader: false,
      }, () => {
        if (this.state.lastForm === nextParentForm) {
          this.props.customProps._toastMessage('success', res.message)
          this.props.history.push("/student")
        } else {
          this.props.customProps._toastMessage('success', res.message)
          this.showNextForm(nextParentForm, nextSubForm)
        }
        // this.showNextForm()
        // this.props.customProps._toastMessage('success', res.message)
      })
    }).catch(err => {
      this.setState({
        apiStatusCode: err ? err.status : 500,
        showButtonLoader: false
      }, () => {
        if (this.state.apiStatusCode === 401) {
          this.props.customProps._toastMessage('error', constants.SESSION_EXPIRED)
          this.props._removeToken()
        } else if (this.state.apiStatusCode === 500) {
          this.props.customProps._toastMessage('error', constants.SOMETHING_WENT_WRONG)
        }
        else {
          this.props.customProps._toastMessage('error', err.message)
        }
      })
    })
  }
  _submitChildForm2 = (updatedChildModal, nextParentForm, nextSubForm) => {
    let { childForm, editType, activeChildId } = this.state,
      updatedValues1 = childForm["childInfo"],
      updatedChildModal1 = {},
      currentModalName1 = "childInfo",

      updatedValues2 = childForm["parent1"],
      updatedChildModal2 = {},
      currentModalName2 = "parent1",

      updatedValues3 = childForm["parent2"],
      updatedChildModal3 = {},
      currentModalName3 = "parent2",

      updatedValues4 = childForm["emergencyContact1"],
      updatedChildModal4 = {},
      currentModalName4 = "emergencyContact1",

      updatedValues5 = childForm["emergencyContact2"],
      updatedChildModal5 = {},
      currentModalName5 = "emergencyContact2";

    updatedChildModal1.type = currentModalName1
    updatedChildModal1[currentModalName1] = updatedValues1


    let data = updatedChildModal1, { previousSubmittedStatusObj, subForm } = this.state;
    // console.log("I have the previousSubmittedStatusObj as:",previousSubmittedStatusObj[`${subForm}`]);
    // previousSubmittedStatusObj[`${subForm}`] = true
    // console.log("I have the previousSubmittedStatusObj as:",previousSubmittedStatusObj);


    // if(isloadTabCalled){
    //   previousSubmittedStatusObj[`${activeTab}`]=true
    // }else{
    //   previousSubmittedStatusObj[`${subForm}`]=true
    // }


    addChild(data).then(res => {
      let child_id = res.child_id ? res.child_id : this.state.activeChildId;
      this.setState({
        activeChildId: child_id
      })

      updatedValues2.child_id = child_id
      updatedChildModal2.type = "parent1"
      updatedChildModal2["parent1"] = updatedValues2

      addChild(updatedChildModal2).then(res => {
        updatedValues3.child_id = child_id
        updatedChildModal3.type = "parent2"
        updatedChildModal3["parent2"] = updatedValues3

        addChild(updatedChildModal3).then(res => {
          updatedValues4.child_id = child_id
          updatedChildModal4.type = "emergencyContact1"
          updatedChildModal4["emergencyContact1"] = updatedValues4

          addChild(updatedChildModal4).then(res => {
            updatedValues5.child_id = child_id
            updatedChildModal5.type = "emergencyContact2"
            updatedChildModal5["emergencyContact2"] = updatedValues5

            addChild(updatedChildModal5).then(res => {
              this.setState({
                showButtonLoader: false,
                activeChildId: child_id
                //previousSubmittedStatusObj: previousSubmittedStatusObj
              }, () => {
                if (this.state.lastForm === nextParentForm) {
                  this.props.customProps._toastMessage('success', res.message)
                  this.props.history.push("/student")
                } else {
                  this.props.customProps._toastMessage('success', res.message)
                  this.showNextForm(nextParentForm, nextSubForm)
                }
              })

            })
          })
        })
      })
    }).catch(err => {
      this.setState({
        apiStatusCode: err ? err.status : 500,
        showButtonLoader: false
      }, () => {
        if (this.state.apiStatusCode === 401) {
          this.props.customProps._toastMessage('error', constants.SESSION_EXPIRED)
          this.props._removeToken()
        } else if (this.state.apiStatusCode === 500) {
          this.props.customProps._toastMessage('error', constants.SOMETHING_WENT_WRONG)
        }
        else {
          this.props.customProps._toastMessage('error', err.message)
        }
      })
    })





    // addChild(data).then(res => {
    //   let child_id = res.child_id ? res.child_id : this.state.activeChildId;
    //   this.setState({
    //     showButtonLoader: false,
    //     activeChildId: child_id
    //     //previousSubmittedStatusObj: previousSubmittedStatusObj
    //   }, () => {
    //     if (this.state.lastForm === nextParentForm) {
    //       // this.props.customProps._toastMessage('success', res.message)
    //       this.props.history.push("/student")
    //     } else {
    //       // this.props.customProps._toastMessage('success', res.message)
    //       this.showNextForm(nextParentForm, nextSubForm)
    //     }
    //   })
    // }).catch(err => {
    //   this.setState({
    //     apiStatusCode: err ? err.status : 500,
    //     showButtonLoader: false
    //   }, () => {
    //     if (this.state.apiStatusCode === 401) {
    //       this.props.customProps._toastMessage('error', constants.SESSION_EXPIRED)
    //       this.props._removeToken()
    //     } else if (this.state.apiStatusCode === 500) {
    //       this.props.customProps._toastMessage('error', constants.SOMETHING_WENT_WRONG)
    //     }        
    //     else {
    //       this.props.customProps._toastMessage('error', err.message)
    //     }
    //   })
    // })
  }
  updateChildInfo2 = (data, nextParentForm, nextSubForm) => {
    let { childForm, editType, activeChildId } = this.state,
      updatedValues1 = childForm["childInfo"],
      updatedChildModal1 = {},
      currentModalName1 = "childInfo",

      updatedValues2 = childForm["parent1"],
      updatedChildModal2 = {},
      currentModalName2 = "parent1",

      updatedValues3 = childForm["parent2"],
      updatedChildModal3 = {},
      currentModalName3 = "parent2",

      updatedValues4 = childForm["emergencyContact1"],
      updatedChildModal4 = {},
      currentModalName4 = "emergencyContact1";

    // updatedValues5 = childForm["emergencyContact2"],
    // updatedChildModal5 = {},
    // currentModalName5 = "emergencyContact2";



    if (editType === "") {
      // check if activeChild id blank then modal is update without id



      if (activeChildId === '') {
        updatedChildModal1.type = "childInfo";
        updatedChildModal1["childInfo"] = updatedValues1
      } else {

        //  modal is update with active child id 
        updatedValues1.child_id = activeChildId
        updatedChildModal1.type = "childInfo"
        updatedChildModal1["childInfo"] = updatedValues1
      }
    }
    else {
      // For editing a child, the id is already set.
      updatedChildModal1.type = "childInfo"
      updatedChildModal1["childInfo"] = updatedValues1
    }




    if (editType === "") {
      // check if activeChild id blank then modal is update without id



      if (activeChildId === '') {
        updatedChildModal2.type = "parent1";
        updatedChildModal2["parent1"] = updatedValues2
      } else {

        //  modal is update with active child id 
        updatedValues2.child_id = activeChildId
        updatedChildModal2.type = "parent1"
        updatedChildModal2["parent1"] = updatedValues2
      }
    }
    else {
      // For editing a child, the id is already set.
      updatedChildModal2.type = "parent1"
      updatedChildModal2["parent1"] = updatedValues2
    }





    if (editType === "") {
      // check if activeChild id blank then modal is update without id



      if (activeChildId === '') {
        updatedChildModal3.type = "parent2";
        updatedChildModal3["parent2"] = updatedValues3
      } else {

        //  modal is update with active child id 
        updatedValues3.child_id = activeChildId
        updatedChildModal3.type = "parent2"
        updatedChildModal3["parent2"] = updatedValues3
      }
    }
    else {

      // For editing a child, the id is already set.
      updatedChildModal3.type = "parent2"
      updatedChildModal3["parent2"] = updatedValues3
    }






    if (editType === "") {
      // check if activeChild id blank then modal is update without id



      if (activeChildId === '') {
        updatedChildModal4.type = "emergencyContact1";
        updatedChildModal4["emergencyContact1"] = updatedValues4
      } else {

        //  modal is update with active child id 
        updatedValues4.child_id = activeChildId
        updatedChildModal4.type = "emergencyContact1"
        updatedChildModal4["emergencyContact1"] = updatedValues4
      }
    }
    else {

      // For editing a child, the id is already set.
      updatedChildModal4.type = "emergencyContact1"
      updatedChildModal4["emergencyContact1"] = updatedValues4
    }



    // if (editType === "") {
    //   // check if activeChild id blank then modal is update without id



    //   if (activeChildId === '') {
    //     updatedChildModal5.type = "emergencyContact2";
    //     updatedChildModal5["emergencyContact2"] = updatedValues5
    //   } else {

    //     //  modal is update with active child id 
    //     updatedValues5.child_id = activeChildId
    //     updatedChildModal5.type = "emergencyContact2"
    //     updatedChildModal5["emergencyContact2"] = updatedValues5
    //   }
    // }
    // else {

    //   // For editing a child, the id is already set.
    //   updatedChildModal5.type = "emergencyContact2"
    //   updatedChildModal5["emergencyContact2"] = updatedValues5
    // }









    updateChild(updatedChildModal1).then(res1 => {
      updateChild(updatedChildModal2).then(res2 => {
        updateChild(updatedChildModal3).then(res3 => {
          updateChild(updatedChildModal4).then(res4 => {
            //updateChild(updatedChildModal5).then(res5 => {

            updateChild(data).then(res5 => {
              this.setState({
                showButtonLoader: false,
              }, () => {
                if (this.state.lastForm === nextParentForm) {
                  this.props.customProps._toastMessage('success', res5.message)
                  this.props.history.push("/student")
                } else {
                  this.props.customProps._toastMessage('success', res5.message)
                  this.showNextForm(nextParentForm, nextSubForm)
                }
                // this.showNextForm()
                // this.props.customProps._toastMessage('success', res.message)
              })
            })

            //})
          })

        })
      })

    }).catch(err => {
      this.setState({
        apiStatusCode: err ? err.status : 500,
        showButtonLoader: false
      }, () => {
        if (this.state.apiStatusCode === 401) {
          this.props.customProps._toastMessage('error', constants.SESSION_EXPIRED)
          this.props._removeToken()
        } else if (this.state.apiStatusCode === 500) {
          this.props.customProps._toastMessage('error', constants.SOMETHING_WENT_WRONG)
        }
        else {
          this.props.customProps._toastMessage('error', err.message)
        }
      })
    })



    // updateChild(data).then(res => {
    //   this.setState({
    //     showButtonLoader: false,
    //   }, () => {
    //     if (this.state.lastForm === nextParentForm) {
    //       this.props.customProps._toastMessage('success', res.message)
    //       this.props.history.push("/student")
    //     } else {
    //       this.props.customProps._toastMessage('success', res.message)
    //       this.showNextForm(nextParentForm, nextSubForm)
    //     }
    //     // this.showNextForm()
    //     // this.props.customProps._toastMessage('success', res.message)
    //   })
    // }).catch(err => {
    //   this.setState({
    //     apiStatusCode: err ? err.status : 500,
    //     showButtonLoader: false
    //   }, () => {
    //     if (this.state.apiStatusCode === 401) {
    //       this.props.customProps._toastMessage('error', constants.SESSION_EXPIRED)
    //       this.props._removeToken()
    //     } else if (this.state.apiStatusCode === 500) {
    //       this.props.customProps._toastMessage('error', constants.SOMETHING_WENT_WRONG)
    //     }
    //     else {
    //       this.props.customProps._toastMessage('error', err.message)
    //     }
    //   })
    // })

  }

  //when admin update child current modal name is passed on the basis of current modal updated values are retrieved
  findCurrentModal = (modalName, nextParentForm, nextSubForm) => {
    let { childForm, editType, loginUserInfo, activeChildId } = this.state,
      updatedValues = childForm[modalName],
      updatedChildModal = {},
      currentModalName = modalName;
    // check if user role is parent 
    if (loginUserInfo.role_id === 3) {

      if (editType === "") {
        // check if activeChild id blank then modal is update without id


        if (activeChildId === '') {
          updatedChildModal.type = currentModalName
          updatedChildModal[currentModalName] = updatedValues
          console.log("I am parent and I have the following updatedChildModal[currentModalName] for adding child: ", updatedChildModal[currentModalName]);
        } else {

          //  modal is update with active child id 
          updatedValues.child_id = activeChildId
          updatedChildModal.type = currentModalName
          updatedChildModal[currentModalName] = updatedValues
          console.log("I am parent and I have the following updatedChildModal[currentModalName] for edit child: ", updatedChildModal[currentModalName]);
        }
      }
      else {

        // For editing a child, the id is already set.
        updatedChildModal.type = currentModalName
        updatedChildModal[currentModalName] = updatedValues
        console.log("I am parent and for real editing I have the following updatedChildModal[currentModalName] for edit child: ", updatedChildModal[currentModalName]);
      }

    } else {
      // in case of role admin child id is already set and modal is created
      updatedChildModal.type = currentModalName
      updatedChildModal[currentModalName] = updatedValues
    }

    if (loginUserInfo.role_id === 2) {
      if (modalName === 'medicalInformation') {
        this.updateChild(updatedChildModal, nextParentForm, nextSubForm)
      } else {
        this.saveChildInfo(updatedChildModal, nextParentForm, nextSubForm)
      }
    } else {
      if (editType === "parent") {
        if (modalName === 'medicalInformation') {
          this.updateChild(updatedChildModal, nextParentForm, nextSubForm)
        } else {
          if (currentModalName === "emergencyContact2") {
            this.updateChildInfo2(updatedChildModal, nextParentForm, nextSubForm)
          }
          else {
            this.updateChildInfo(updatedChildModal, nextParentForm, nextSubForm)
          }
        }
      } else {
        if (modalName === 'medicalInformation') {
          this.updateChild(updatedChildModal, nextParentForm, nextSubForm)
        } else {
          console.log("I am in child being added now");
          if (currentModalName === "emergencyContact2") {
            this._submitChildForm2(updatedChildModal, nextParentForm, nextSubForm)
          }
          else {
            this._submitChildForm(updatedChildModal, nextParentForm, nextSubForm)
          }
        }
      }
    }
  }
  // in add child show component by active tab
  showComponentByTabName = (parentForm, stateVariable, allFunctions, allValidation) => {

    switch (parentForm) {
      case 'familyInfo':
        return <FamilyInfo  {...stateVariable}   {...allFunctions} {...allValidation} />;
      case 'devReport':
        return <DevReports  {...stateVariable}   {...allFunctions} {...allValidation} />;
      case 'parentAgreement':
        return <ParentAgreement  {...stateVariable}   {...allFunctions} {...allValidation} />;
      case 'offsiteActivityPermission':
        return <AuthorizationAndConsent  {...stateVariable}   {...allFunctions} {...allValidation} />;
      case 'localFieldTripPermission':
        return <LocalTripPermission  {...stateVariable}   {...allFunctions} {...allValidation} />;
      case 'sunscreenPermission':
        return <SunScreenVerification  {...stateVariable}   {...allFunctions} {...allValidation} />;
      case 'toothbrushingPermission':
        return <ToothBrushingConsent  {...stateVariable}   {...allFunctions} {...allValidation} />;
      case 'photoRelease':
        return <PhotoRelease  {...stateVariable}   {...allFunctions} {...allValidation} />;
      case 'transportationAuthority':
        return <TransportationAuthority  {...stateVariable}   {...allFunctions} {...allValidation} />;
      case 'schoolDirectoryForm':
        return <SchoolDirectory  {...stateVariable}   {...allFunctions} {...allValidation} />
      default:
        return <FamilyInfo  {...stateVariable}   {...allFunctions} {...allValidation} />;
    }
  }
  // in edit child we are showing previously uploaded files,this. function remove previously uploaded file uploaded
  _removeMedicalFileInEditChild = (modalName, keyName, id, event) => {
    let { childForm } = this.state,
      { medicalInformation } = childForm,
      { medical_reports } = medicalInformation;

    // physical_reports = medical_reports;

    // for (let i = 0; i < physical_reports.length; i++) {
    //   if (i != parseInt(id)) {
    //     medicalReports.push(physical_reports[i])
    //   }
    // }
    medical_reports.splice(parseInt(id), 1);
    // if (physical_reports.length) {
    //   for (let x = 0; x < physical_reports.length; x++) {
    //     if (x === physical_reports.length - 1) {
    //       reports = reports + physical_reports[x]
    //       break
    //       // return reports
    //     } else {
    //       reports = reports + physical_reports[x] + ','

    //     }
    //   }
    // } else {
    //   reports = ''
    // }
    childForm[modalName][keyName] = medical_reports
    this.setState({
      childForm
    })
  }

  render() {
    let { activeTab,
      showButtonLoader,
      parentForm
    } = this.state,
      parentComponentFunction = {
        _viewReport: this._viewReport,
        _saveForm: this._saveForm,
        _handleCheckBox: this._handleCheckBox,
        _handleFormDropDown: this._handleFormDropDown,
        _handleFormInput: this._handleFormInput,
        _handleAdminAutoRenewal: this._handleAdminAutoRenewal,
        _handleSameAddressTogglebutton: this._handleSameAddressTogglebutton,
        onChangeHandler: this.onChangeHandler,
        onClickHandler: this.onClickHandler,
        _handleFileUploadAllergy: this._handleFileUploadAllergy,
        _handleFileUpload: this._handleFileUpload,
        _fillRoomLocationField: this._fillRoomLocationField,
        _removeMedicalReport: this._removeMedicalReport,
        _removeMedicalFileInEditChild: this._removeMedicalFileInEditChild,
        showNextForm: this.showNextForm,
        _handleNext: this._handleNext

      },
      childFormValidation = {
        addChildFormValidator: this.addChildFormValidator,
        parent1FormValidator: this.parent1FormValidator,
        parent2FormValidator: this.parent2FormValidator,
        emeregency1FormValidator: this.emeregency1FormValidator,
        emeregency2FormValidator: this.emeregency2FormValidator,
        medicalInformationFormValidator: this.medicalInformationFormValidator,
        childDevolpmentValidator: this.childDevolpmentValidator,
        childHealthValidatorValidator: this.childHealthValidator,
        childEatingHabitValidator: this.childEatingHabitValidator,
        childToiletHabitValidator: this.childToiletHabitValidator,
        childSleepingHabitValidator: this.childSleepingHabitValidator,
        childSocialRelationshipValidator: this.childSocialRelationshipValidator,
        authorizationAndConsentValidator: this.authorizationAndConsentValidator,
        dailyScheduleValidator: this.dailyScheduleValidator,
        parentAgreementValidator: this.parentAgreementValidator,
        localTripPermissionValidator: this.localTripPermissionValidator,
        sunscreenPermissionValidator: this.sunscreenPermissionValidator,
        toothBrushingInformationValidator: this.toothBrushingInformationValidator,
        photoReleaseValidator: this.photoReleaseValidator,
        transportAuthorityValidator: this.transportAuthorityValidator,
        schoolDirectoryValidator: this.schoolDirectoryValidator,
      },
      addChildMenuRef = {
        addChildMenuRef: this.addChildMenuRef,
        addChildMenuSectionRef: this.addChildMenuSectionRef,
      };
    return (
      <div>
        {
          showButtonLoader ?
            <Loaders isLoading={showButtonLoader} />
            :
            <div className="main-layout-height mt-2rem">
              <Container fluid>
                {
                  showButtonLoader ?
                    <Loaders isLoading={showButtonLoader} /> : <Grid>
                      <Grid.Row>
                        <Grid.Column computer={1} />
                        <Grid.Column computer={3} tablet={4} mobile={16}>
                          <AddChildMenuTabs activeTab={activeTab} {...this.state}  {...parentComponentFunction} {...addChildMenuRef} {...childFormValidation} />
                        </Grid.Column>
                        <Grid.Column computer={1} />
                        <Grid.Column computer={10} mobile={16} tablet={9}  >
                          {this.showComponentByTabName(parentForm, { ...this.state }, { ...parentComponentFunction }, { ...childFormValidation })}
                        </Grid.Column>
                        <Grid.Column computer={1} tablet={1} />
                      </Grid.Row>
                    </Grid>
                }
              </Container>
            </div>
        }
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  loginUserInfo: state.loginReducer.loginUserInfo
})

const mapDispatchToProps = (dispatch) => {

}

export default connect(mapStateToProps, mapDispatchToProps)(AddChild);

//updated modal
// let data = {
//   childInfo: {
//     "first_name": "ashu  ",
//     "last_name":
//       "babbar",
//     "birth_date": "2020-12-31"
//     , "birth_place": "Ambala"
//     , "admission_date": "2020-12-31"
//     , "address": "ambala cant"
//     , "city": "Ambala"
//     , "state": "haryana"
//     , "zip_code": "133001",
// "class_id": 1,
//   }, parent1: {
//     "parent_type": "parent1",
//     "first_name": "Pankaj",
//     "last_name": "kalra",
//     "phone1": "7485961234",
//     "phone2": "7485961235",
//     "email1": "p@b.com",
//     "address": "ambala cant",
//     "city": "Ambala",
//     "state": "haryana",
//     "zip_code": "133001",
//     "business_name": "microsoft "
//     , "business_address": "banglaore"
//     , "work_start_time": "1:00 AM",
//     "work_end_time": "3:00 AM"
//     , "business_phone": "78451221515"
//   }, parent2: {
//     "parent_type": "parent2",
//     "first_name": "Prashant",
//     "last_name": "Kalra",
//     "phone1": "7485961232",
//     "phone2": "7485961235",
//     "email1": "p@b.com",
//     "address": "ambala cant",
//     "city": "Ambala",
//     "state": "haryana",
//     "zip_code": "133001",
//     "business_name": "Microsoft",
//     "business_address": "Banglore",
//     "work_start_time": "2:00 AM",
//     "work_end_time": "1:00 AM",
//     "business_phone": "7485962321"
//   }, emergencyContact1: {
//     "type": "emergency1",
//     "first_name": "Karan",
//     "last_name": "Lamba",
//     "phone1": "7485963215",
//     "phone2": "8748454545",
//     "email1": "p@b.com",
//     "address": "Ambala",
//     "city": "ambala",
//     "state": "haryana",
//     "zip_code": "14526698",
//     "relationship": "uncle",
//     "has_emergency_release": true
//   }, emergencyContact2: {
//     "type": "emergency1",
//     "first_name": "Tanya",
//     "last_name": "Mittal",
//     "phone1": "1236547899",
//     "phone2": "4569871235",
//     "email1": "t@b.com",
//     "address": "74, ambala",
//     "city": "ambala",
//     "state": "haryan",
//     "zip_code": "1452369",
//     "relationship": "aunty",
//     "has_emergency_release": true
//   }, medicalInformation: {
//     "doctor_name": "Pradeep",
//     "doctor_phone": "748596321",
//     "doctor_email": "p@b.com",
//     "doctor_primary_language": "chinise",
//     "doctor_insurance_carrier": "lic",
//     "last_physical_date": "2020-12-31",
//     "lead_screen_date": "2020-12-31",
//     "immunizations": "2020-12-31",
//     "allergies": "dog,ox",
//     "eye_color": "black",
//     "hair_color": "black",
//     "gender": "Male",
//     "height": "156",
//     "weight": "1000",
//     "race": "African American",
//     "identity_marks": "dot on chest",
//     "add_child_to_directory": true,
//     "add_parent_to_directory": true,
//     "add_parent2_to_directory": true,
//     "has_signature_checked": true,
//     "doctor_insurance_number": "75454545"
//   }, devReport: {
//     "age_began_sitting": "9",
//     "crawling": "9",
//     "walking": "9", "talking": "9",
//     "has_child_pull_up": "",
//     "has_child_crawling": "",
//     "has_child_walk_with_support": "",
//     "has_speech_difficulties": "",
//     "special_words_to_describe": "",
//     "language_spoken_at_home": "english",
//     "has_history_of_colics": "yes",
//     "has_child_use_pacifier_or_sucks_thumbs": "",
//     "when_child_use_pacifier_or_sucks_thumbs": "",
//     "has_child_have_fussy_time": "",
//     "when_child_have_fussy_time": "",
//     "how_parent_handle_time": "NA"
//   }, childHealth: {
//     "has_complication_at_birth": "",
//     "serious_illness_hospitalization": "NA",
//     "special_physical_condition": "NA",
//     "allergies": "NA",
//     "regular_medications": "NA"
//   }, childEatingHabit: {
//     "special_charecters_or_diffculties": "NA",
//     "special_formula_prepration_details": "NA",
//     "favouraite_food": "NA",
//     "food_refused": "NA",
//     "child_fedon_lap": "NA",
//     "high_chair": "NA",
//     "has_child_use_spoon": "",
//     "has_child_use_fork": "",
//     "has_child_use_hand": ""
//   }, childToiletHabit: {
//     "has_diaper_used": "",
//     "has_diaper_rash_occur": "",
//     "has_parent_use_oil": "",
//     "has_parent_powder": "",
//     "has_parent_lotion": "",
//     "has_parent_use_other": "",
//     "has_bowel_movement_regular": "",
//     "how_many_time_bowl_move": "NA",
//     "has_problem_of_diarrhea": "",
//     "has_problem_of_constipation": "",
//     "has_toilet_training": "",
//     "particular_procedure_of_child": "NA",
//     "has_child_use_potty_chair": "",
//     "has_child_use_special_seat": "",
//     "has_child_use_regular_seat": "",
//     "how_child_indicate_bathroom": "NA",
//     "has_childwilling_to_use_bathroom": "",
//     "has_child_have_accident": ""
//   }, childSleepingHabit: {
//     "has_child_sleep_on_crib": "",
//     "has_child_sleep_on_bed": "",
//     "how_does_child_becometired": "NA",
//     "has_child_sleep_at_night": "",
//     "has_child_get_up_in_morning": "",
//     "special_charecterstic_or_need": "NA"
//   }, socialRelationship: {
//     "child_description_by_parent": "NA",
//     "previous_experience": "NA",
//     "reaction_to_starnger": "",
//     "has_allow_play_alone": "",
//     "favouraite_toy": "NA",
//     "child_fear": "NA",
//     "how_parent_comfort_child": "NA",
//     "behaviour_management": "NA",
//     "how_child_gain_experience": "NA"
//   }, dailySchedule: {
//     "more_about_child": "NA"
//   }, authorizationAndConsent: {
//     "has_authorize_mychild": true,
//     "has_authorize_and_consent_agreement": true
//   }, sunscreenPermission: {
//     "has_sunscreen_provided_by_school": true,
//     "has_child_bring_sunscreen": false
//   },
//   "toothBrushingInformation": {
//     "has_participate_in_toothbrushing": "yes",
//     "has_fluoride": true,
//     "has_school_toothbrushing": ""
//   }, transportAuthority: {
//     "has_parent_drop_off": true,
//     "has_parent_pick_up": true,
//     "has_supervised_walk": false,
//     "has_public_private_van": false,
//     "has_program_bus_van": false,
//     "has_contract_van": false,
//     "has_private_transport_arranged_by_parent": false,
//     "has_other": false
//   },
//   schoolDirectory: {
//     "has_parent_information_publish": true,
//     "has_parent_wish_to_add_school_directory": false
//   }, parentPermission: {
//     "has_photo_permission_granted": "yes",
//     "has_parent_agreed_with_policies": true,
//     "has_parent_agreed_for_trip": true
//   }
// }