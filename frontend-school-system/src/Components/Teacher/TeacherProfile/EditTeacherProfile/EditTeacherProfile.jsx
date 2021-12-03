import React, { Component } from "react";
import { Container, Dimmer, Loader, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
// API action
import { updateTeacherProfile } from "../../../../ApiAction/Teacher";
import {
  updateAdminTeacher,
  adminActiveTeacherProfile
} from "../../../../ApiAction/Admin";
import { fileUpload } from "../../../../ApiAction/Common";
import { viewTeacherProfile } from "../../../../ApiAction/View";
//Constants
import { constants } from "../../../";
// Component
import { EditTeacher } from "./EditTeacher";
// css
import "./EditTeacherProfile.css";

class EditTeacherProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allowUpload: false,
      teacherResume: "",
      apiStatusCode: "",
      teacher_info: {
        id: "",
        position: "Teacher",
        resume: "",
        interview_date: "",
        date_of_birth: "",
        date_of_hire: "",
        reference1: "",
        ref_1_email: "",
        ref_1_phone: "",
        reference2: "",
        ref_2_email: "",
        ref_2_phone: "",
        eec_cert_number: "",
        eec_pq_reg: "",
        eec_pq_reg_date: "",
        cori: false,
        cori_date: "",
        dcf: false,
        dcf_date: "",
        physical: false,
        physical_date: "",
        mmr1: "",
        mmr2: "",
        first_add: false,
        first_add_date: "",
        eecorient: false,
        medical_training: false,
        look_before_lock: false,
        sids: false,
        usda: false,
        prog_orientation: false,
        prog_orientation_date: "",
        staff_observe: false,
        staff_evaluation: false,
        staff_evaluation_date: "",
        dbus_lic: "",
        dbus_lic_date: "",
        program_name: "",
        completed_by: "",
        completed_date: ""
      },
      training_info: {
        training_detail_id: "",
        child_abuse_neglect: "",
        child_abuse_neglect_date: "",
        emergency_response_planning: "",
        emergency_response_planning_date: "",
        first_aid_cpr_overview: "",
        first_aid_cpr_overview_date: "",
        food_related_risk_response: "",
        food_related_risk_response_date: "",
        hazardous_materials: "",
        hazardous_materials_date: "",
        infant_safe_sleeping_practices: "",
        infant_safe_sleeping_practices_date: "",
        infectious_diseases_immunizations: "",
        infectious_diseases_immunizations_date: "",
        introduction_child_development: "",
        introduction_child_development_date: "",
        medication_administration: "",
        medication_administration_date: "",
        physical_premises_safety: "",
        physical_premises_safety_date: "",
        shaken_baby_syndrome: "",
        shaken_baby_syndrome_date: "",
        transporting_children: "",
        transporting_children_date: "",
        total_hours: "",
        total_hours_date: "",
        eec_yearly_renewal: "",
        eec_yearly_renewal_date: "",
        eec_child_abuse_neglect: "",
        eec_child_abuse_neglect_date: "",
        eec_emergency_response_planning: "",
        eec_emergency_response_planning_date: "",
        eec_food_related_risk_response: "",
        eec_food_related_risk_response_date: "",
        eec_infectious_diseases_immunizations: "",
        eec_infectious_diseases_immunizations_date: "",
        eec_medication_administration: "",
        eec_medication_administration_date: "",
        eec_transporting_children: "",
        eec_transporting_children_date: "",
        eec_infant_safe_sleeping_practices: "",
        eec_infant_safe_sleeping_practices_date: "",
        eec_shaken_baby_syndrome: "",
        eec_shaken_baby_syndrome_date: ""
      },
      loginUserInfo: props.loginUserInfo,
      teacherProfile: {
        approved: "",
        first_name: "",
        last_name: "",
        email: "",
        id: ""
      },
      user_info: {
        first_name: props.loginUserInfo.first_name,
        last_name: props.loginUserInfo.last_name,
        email: props.loginUserInfo.email
      },
      teacherPositionOptions: constants.TEACHER_POSITIONS,
      isLoading: true
    };
    this.EditTeacherFormValidator = new SimpleReactValidator();
  }

  componentWillMount() {
    // if admin is editing teacher profile
    if (this.props.loginUserInfo.role_id === 2) {
      if (this.props.history.location.state === undefined) {
        this.props.history.push("/teachers");
      } else {
        let { activeTeacherId } = this.props.history.location.state;
        this.getAdminActiveTeacherProfile(activeTeacherId);
      }
    } else if (this.props.loginUserInfo.role_id === 4) {
      // if teacher is editing his/her profile
      this.getTeacherProfile();
    } else {
      this.props.history.push("/home");
    }
  }

  getAdminActiveTeacherProfile = id => {
    adminActiveTeacherProfile(id)
      .then(res => {
        let { teacher_info, training_info, teacherProfile } = this.state,
          teacherInfo = {},
          trainingInfo = {};
        if (res.data.length) {
          teacherInfo = this.fillValue(res.data[0]);
          trainingInfo = this.fillTrainingValue(res.data[0]);
          teacherProfile.approved = res.data[0].approved;
          teacherProfile.first_name = res.data[0].first_name;
          teacherProfile.last_name = res.data[0].last_name;
          teacherProfile.email = res.data[0].email;
          teacherProfile.id = res.data[0].id;
        } else {
          teacherInfo = teacher_info;
          trainingInfo = training_info;
        }
        this.setState({
          teacher_info: teacherInfo,
          training_info: trainingInfo,
          teacherProfile,
          isLoading: false,
          activeTeacherId: id
        });
      })
      .catch(err => {
        this.setState(
          {
            apiStatusCode: err ? err.status : 500,
            isLoading: false
          },
          () => {
            if (this.state.apiStatusCode === 401) {
              this.props.customProps._toastMessage(
                "error",
                constants.SESSION_EXPIRED
              );
              this.props._removeToken();
            } else if (this.state.apiStatusCode === 500) {
              this.props.customProps._toastMessage(
                "error",
                constants.SOMETHING_WENT_WRONG
              );
            } else {
              this.props.customProps._toastMessage("error", err.message);
            }
          }
        );
      });
  };

  // getting active teacher data if teacher is editing teacher profile

  getTeacherProfile() {
    let { teacher_info, training_info } = this.state,
      teacherInfo = {},
      trainingInfo = {};
    viewTeacherProfile()
      .then(res => {
        if (res.data) {
          teacherInfo = this.fillValue(res.data);
          trainingInfo = this.fillTrainingValue(res.data);
          // training_info.training_detail_id = res.data.id
        } else {
          teacherInfo = teacher_info;
          trainingInfo = training_info;
        }

        this.setState({
          teacher_info: teacherInfo,
          training_info: trainingInfo,
          isLoading: false
        });
      })
      .catch(err => {
        this.setState(
          {
            apiStatusCode: err ? err.status : 500,
            isLoading: false
          },
          () => {
            if (this.state.apiStatusCode === 401) {
              this.props.customProps._toastMessage(
                "error",
                constants.SESSION_EXPIRED
              );
              this.props._removeToken();
            } else if (this.state.apiStatusCode === 500) {
              this.props.customProps._toastMessage(
                "error",
                constants.SOMETHING_WENT_WRONG
              );
            } else {
              this.props.customProps._toastMessage("error", err.message);
            }
          }
        );
      });

    // this.setState({
    //   teacher_info,
    //   isLoading:false
    // });
  }
  // filling value of teacher info object
  fillValue = currentTeacherInfo => {
    let { teacher_info } = this.state,
      allData = currentTeacherInfo,
      { teacher_infos } = allData;
    teacher_info.id = teacher_infos.length ? teacher_infos[0].id : "";
    teacher_info.resume = teacher_infos.length ? teacher_infos[0].resume : "";
    teacher_info.interview_date = teacher_infos.length
      ? teacher_infos[0].interview_date
      : "";
    teacher_info.date_of_birth = teacher_infos.length
      ? teacher_infos[0].date_of_birth
      : "";
    teacher_info.date_of_hire = teacher_infos.length
      ? teacher_infos[0].date_of_hire
      : "";
    teacher_info.reference1 = teacher_infos.length
      ? teacher_infos[0].reference1
      : "";
    teacher_info.ref_1_email = teacher_infos.length
      ? teacher_infos[0].ref_1_email
      : "";
    teacher_info.ref_1_phone = teacher_infos.length
      ? teacher_infos[0].ref_1_phone
      : "";
    teacher_info.reference2 = teacher_infos.length
      ? teacher_infos[0].reference2
      : "";
    teacher_info.ref_2_email = teacher_infos.length
      ? teacher_infos[0].ref_2_email
      : "";
    teacher_info.ref_2_phone = teacher_infos.length
      ? teacher_infos[0].ref_2_phone
      : "";
    teacher_info.eec_cert_number = teacher_infos.length
      ? teacher_infos[0].eec_cert_number
      : "";
    teacher_info.eec_pq_reg = teacher_infos.length
      ? teacher_infos[0].eec_pq_reg
      : "";
    teacher_info.eec_pq_reg_date = teacher_infos.length
      ? teacher_infos[0].eec_pq_reg_date
      : "";
    teacher_info.cori = teacher_infos.length
      ? teacher_infos[0].cori === "1"
        ? true
        : false
      : false;
    teacher_info.cori_date = teacher_infos.length
      ? teacher_infos[0].cori_date
      : "";
    teacher_info.dcf = teacher_infos.length
      ? teacher_infos[0].dcf === "1"
        ? true
        : false
      : "";
    teacher_info.dcf_date = teacher_infos.length
      ? teacher_infos[0].dcf_date
      : "";
    teacher_info.physical = teacher_infos.length
      ? teacher_infos[0].physical === "1"
        ? true
        : false
      : false;
    teacher_info.physical_date = teacher_infos.length
      ? teacher_infos[0].physical_date
      : "";
    teacher_info.mmr1 = teacher_infos.length ? teacher_infos[0].mmr1 : "";
    teacher_info.mmr2 = teacher_infos.length ? teacher_infos[0].mmr2 : "";
    teacher_info.first_add = teacher_infos.length
      ? teacher_infos[0].first_add === "1"
        ? true
        : false
      : false;
    teacher_info.first_add_date = teacher_infos.length
      ? teacher_infos[0].first_add_date
      : "";
    teacher_info.eecorient = teacher_infos.length
      ? teacher_infos[0].eecorient === "1"
        ? true
        : false
      : false;
    teacher_info.medical_training = teacher_infos.length
      ? teacher_infos[0].medical_training === "1"
        ? true
        : false
      : false;
    teacher_info.sids = teacher_infos.length
      ? teacher_infos[0].sids === "1"
        ? true
        : false
      : false;
    teacher_info.usda = teacher_infos.length
      ? teacher_infos[0].usda === "1"
        ? true
        : false
      : false;
    teacher_info.look_before_lock = teacher_infos.length
      ? teacher_infos[0].look_before_lock === "1"
        ? true
        : false
      : false;
    teacher_info.prog_orientation = teacher_infos.length
      ? teacher_infos[0].prog_orientation === "1"
        ? true
        : false
      : false;
    teacher_info.prog_orientation_date = teacher_infos.length
      ? teacher_infos[0].prog_orientation_date
      : "";
    teacher_info.staff_observe = teacher_infos.length
      ? teacher_infos[0].staff_observe === "1"
        ? true
        : false
      : false;
    teacher_info.staff_evaluation = teacher_infos.length
      ? teacher_infos[0].staff_evaluation === "1"
        ? true
        : false
      : false;
    teacher_info.staff_evaluation_date = teacher_infos.length
      ? teacher_infos[0].staff_evaluation_date
      : "";
    teacher_info.dbus_lic = teacher_infos.length
      ? teacher_infos[0].dbus_lic
      : "";
    teacher_info.dbus_lic_date = teacher_infos.length
      ? teacher_infos[0].dbus_lic_date
      : "";
    teacher_info.program_name = teacher_infos.length
      ? teacher_infos[0].program_name
      : "";
    teacher_info.completed_by = teacher_infos.length
      ? teacher_infos[0].completed_by
      : "";
    teacher_info.completed_date = teacher_infos.length
      ? teacher_infos[0].completed_date
      : "";
    return teacher_info;
  };

  // filling teacher training info value
  fillTrainingValue = currentTeacherInfo => {
    let { training_info } = this.state,
      allData = currentTeacherInfo,
      { teacher_training_details } = allData;

    training_info.training_detail_id = teacher_training_details.length
      ? teacher_training_details[0].training_detail_id
      : "";
    training_info.child_abuse_neglect = teacher_training_details.length
      ? teacher_training_details[0].child_abuse_neglect
      : "";
    training_info.child_abuse_neglect_date = teacher_training_details.length
      ? teacher_training_details[0].child_abuse_neglect_date
      : "";
    training_info.emergency_response_planning = teacher_training_details.length
      ? teacher_training_details[0].emergency_response_planning
      : "";
    training_info.emergency_response_planning_date = teacher_training_details.length
      ? teacher_training_details[0].emergency_response_planning_date
      : "";
    training_info.first_aid_cpr_overview = teacher_training_details.length
      ? teacher_training_details[0].first_aid_cpr_overview
      : "";
    training_info.first_aid_cpr_overview_date = teacher_training_details.length
      ? teacher_training_details[0].first_aid_cpr_overview_date
      : "";
    training_info.food_related_risk_response = teacher_training_details.length
      ? teacher_training_details[0].food_related_risk_response
      : "";
    training_info.food_related_risk_response_date = teacher_training_details.length
      ? teacher_training_details[0].food_related_risk_response_date
      : "";
    training_info.hazardous_materials = teacher_training_details.length
      ? teacher_training_details[0].hazardous_materials
      : "";
    training_info.hazardous_materials_date = teacher_training_details.length
      ? teacher_training_details[0].hazardous_materials_date
      : "";
    training_info.infant_safe_sleeping_practices = teacher_training_details.length
      ? teacher_training_details[0].infant_safe_sleeping_practices
      : "";
    training_info.infant_safe_sleeping_practices_date = teacher_training_details.length
      ? teacher_training_details[0].infant_safe_sleeping_practices_date
      : "";
    training_info.infectious_diseases_immunizations = teacher_training_details.length
      ? teacher_training_details[0].infectious_diseases_immunizations
      : "";
    training_info.infectious_diseases_immunizations_date = teacher_training_details.length
      ? teacher_training_details[0].infectious_diseases_immunizations_date
      : "";
    training_info.introduction_child_development = teacher_training_details.length
      ? teacher_training_details[0].introduction_child_development
      : "";
    training_info.introduction_child_development_date = teacher_training_details.length
      ? teacher_training_details[0].introduction_child_development_date
      : "";
    training_info.medication_administration = teacher_training_details.length
      ? teacher_training_details[0].medication_administration
      : "";
    training_info.medication_administration_date = teacher_training_details.length
      ? teacher_training_details[0].medication_administration_date
      : "";
    training_info.physical_premises_safety = teacher_training_details.length
      ? teacher_training_details[0].physical_premises_safety
      : "";
    training_info.physical_premises_safety_date = teacher_training_details.length
      ? teacher_training_details[0].physical_premises_safety_date
      : "";
    training_info.shaken_baby_syndrome = teacher_training_details.length
      ? teacher_training_details[0].shaken_baby_syndrome
      : "";
    training_info.shaken_baby_syndrome_date = teacher_training_details.length
      ? teacher_training_details[0].shaken_baby_syndrome_date
      : "";
    training_info.transporting_children = teacher_training_details.length
      ? teacher_training_details[0].transporting_children
      : "";
    training_info.transporting_children_date = teacher_training_details.length
      ? teacher_training_details[0].transporting_children_date
      : "";
    training_info.total_hours = teacher_training_details.length
      ? teacher_training_details[0].total_hours
      : "";
    training_info.total_hours_date = teacher_training_details.length
      ? teacher_training_details[0].total_hours_date
      : "";
    training_info.eec_yearly_renewal = teacher_training_details.length
      ? teacher_training_details[0].eec_yearly_renewal
      : "";
    training_info.eec_yearly_renewal_date = teacher_training_details.length
      ? teacher_training_details[0].eec_yearly_renewal_date
      : "";
    training_info.eec_child_abuse_neglect = teacher_training_details.length
      ? teacher_training_details[0].eec_child_abuse_neglect
      : "";
    training_info.eec_child_abuse_neglect_date = teacher_training_details.length
      ? teacher_training_details[0].eec_child_abuse_neglect_date
      : "";
    training_info.eec_emergency_response_planning = teacher_training_details.length
      ? teacher_training_details[0].eec_emergency_response_planning
      : "";
    training_info.eec_emergency_response_planning_date = teacher_training_details.length
      ? teacher_training_details[0].eec_emergency_response_planning_date
      : "";
    training_info.eec_food_related_risk_response = teacher_training_details.length
      ? teacher_training_details[0].eec_food_related_risk_response
      : "";
    training_info.eec_food_related_risk_response_date = teacher_training_details.length
      ? teacher_training_details[0].eec_food_related_risk_response_date
      : "";
    training_info.eec_infectious_diseases_immunizations = teacher_training_details.length
      ? teacher_training_details[0].eec_infectious_diseases_immunizations
      : "";
    training_info.eec_infectious_diseases_immunizations_date = teacher_training_details.length
      ? teacher_training_details[0].eec_infectious_diseases_immunizations_date
      : "";
    training_info.eec_medication_administration = teacher_training_details.length
      ? teacher_training_details[0].eec_medication_administration
      : "";
    training_info.eec_medication_administration_date = teacher_training_details.length
      ? teacher_training_details[0].eec_medication_administration_date
      : "";
    training_info.eec_transporting_children = teacher_training_details.length
      ? teacher_training_details[0].eec_transporting_children
      : "";
    training_info.eec_transporting_children_date = teacher_training_details.length
      ? teacher_training_details[0].eec_transporting_children_date
      : "";
    training_info.eec_infant_safe_sleeping_practices = teacher_training_details.length
      ? teacher_training_details[0].eec_infant_safe_sleeping_practices
      : "";
    training_info.eec_infant_safe_sleeping_practices_date = teacher_training_details.length
      ? teacher_training_details[0].eec_infant_safe_sleeping_practices_date
      : "";
    training_info.eec_shaken_baby_syndrome = teacher_training_details.length
      ? teacher_training_details[0].eec_shaken_baby_syndrome
      : "";
    training_info.eec_shaken_baby_syndrome_date = teacher_training_details.length
      ? teacher_training_details[0].eec_shaken_baby_syndrome_date
      : "";
    return training_info;
  };

  //return true or false value
  hasTrue(value) {
    return value === 1 || value === true ? "True" : "False";
  }

  // handle form input on calling of onchange function
  handleFormInput = (modalName, event) => {
    let { name, value } = event.target,
      {
        teacher_info,
        user_info,
        loginUserInfo,
        teacherProfile,
        training_info
      } = this.state;
    if (modalName === "teacher_info") {
      teacher_info[name] = value;

      this.setState({
        teacher_info
      });
    } else if (modalName === "training_info") {
      training_info[name] = value;
      this.setState({
        training_info
      });
    } else {
      // if admin is updating teacher profile then in user info section handling inputs of all field
      if (loginUserInfo.role_id === 2) {
        teacherProfile[name] = value;
        this.setState({
          teacherProfile
        });
      } else {
        // if Teacher is updating teacher profile then in user info section handling inputs of all field
        user_info[name] = value;
        this.setState({
          user_info
        });
      }
    }
  };

  // on choosing value from dropdown hold value in state
  handleFormDropDown = (event, dropdownValue, dropdownName) => {
    let { teacher_info } = this.state;

    teacher_info[dropdownName] = dropdownValue;

    this.setState({
      teacher_info
    });
  };
  // when teacher upload resume uploaded file is saved in state
  handleFileUpload = (modalName, event) => {
    let { id } = event.target,
      { teacherResume } = this.state;

    var x = document.getElementById(`${id}`);
    teacherResume = x.files;
    this.setState({
      teacherResume
    });
  };

  uploadResume = () => {
    let { loginUserInfo, teacherResume, teacher_info } = this.state,
      data = new FormData();
    data.append("type", "resume");
    data.append("id", teacher_info.id);
    if (teacherResume.length) {
      for (let i = 0; i < teacherResume.length; i++) {
        data.append("files", teacherResume[i]);
      }

      // calling file upload api
      fileUpload(data)
        .then(res => {
          var report = "";
          for (let k = 0; k < res.files.length; k++) {
            if (k === res.files.length - 1) {
              report += res.files[k];
            } else {
              report += res.files[k] + ",";
            }
          }

          if (loginUserInfo.role_id === 2) {
            teacher_info.resume = report;
            this.setState(
              {
                teacher_info
              },
              () => {
                this.updateAdminActiveTeacherProfile();
              }
            );

            // this.saveChildInfo(updatedChildModal)
          } else {
            teacher_info.resume = report;
            this.setState(
              {
                teacher_info
              },
              () => {
                this.updateTeacherProfile();
              }
            );

            // this._submitChildForm(updatedChildModal)
          }
        })
        .catch(err => {
          this.setState(
            {
              apiStatusCode: err ? err.status : 500,
              showButtonLoader: false
            },
            () => {
              if (this.state.apiStatusCode === 401) {
                this.props.customProps._toastMessage(
                  "error",
                  constants.SESSION_EXPIRED
                );
                this.props._removeToken();
              } else if (this.state.apiStatusCode === 500) {
                this.props.customProps._toastMessage(
                  "error",
                  constants.SOMETHING_WENT_WRONG
                );
              } else {
                this.props.customProps._toastMessage("error", err.message);
              }
            }
          );
        });
    } else {
      if (loginUserInfo.role_id === 2) {
        this.updateAdminActiveTeacherProfile();
      } else {
        this.updateTeacherProfile();
      }
    }
  };

  // on checking checkbox hold value in state
  handleFormCheckbox = event => {
    let { checked, name } = event.target,
      { teacher_info } = this.state;

    teacher_info[name] = checked;

    this.setState({
      teacher_info
    });
  };

  // when form is submit loader is displayed and update teacher profile API is called
  showLoader = () => {
    this.setState(
      {
        isLoading: true
      },
      () => {
        this.uploadResume();
      }
    );
  };

  // calling update teacher profile in module
  updateAdminActiveTeacherProfile = () => {
    let { teacher_info, teacherProfile, training_info } = this.state,
      data = {
        teacher_info,
        training_info,
        user_info: {
          first_name: teacherProfile.first_name,
          last_name: teacherProfile.last_name,
          email: teacherProfile.email,
          id: teacherProfile.id
        }
      };

    updateAdminTeacher(data)
      .then(res => {
        this.setState(
          {
            isLoading: false
          },
          () => {
            this.props.customProps._toastMessage("success", res.message);
            this.props.history.push("/teachers");
          }
        );
      })
      .catch(err => {
        this.setState(
          {
            isLoading: false,
            apiStatusCode: err ? err.status : 500
          },
          () => {
            if (this.state.apiStatusCode === 401) {
              this.props.customProps._toastMessage(
                "error",
                constants.SESSION_EXPIRED
              );
              this.props._removeToken();
            } else if (this.state.apiStatusCode === 500) {
              this.props.customProps._toastMessage(
                "error",
                constants.SOMETHING_WENT_WRONG
              );
            } else {
              this.props.customProps._toastMessage("error", err.message);
            }
          }
        );
      });
  };

  //calling update teacher profile
  updateTeacherProfile = () => {
    let { teacher_info, training_info, user_info } = this.state,
      data = {
        teacher_info,
        training_info,
        user_info
      };

    updateTeacherProfile(data)
      .then(res => {
        this.props.customProps._toastMessage("success", res.message);
        this.setState(
          {
            isLoading: false
          },
          () => {
            this.props.history.push("/view-profile");
          }
        );
      })
      .catch(err => {
        this.setState(
          {
            isLoading: false,
            apiStatusCode: err ? err.status : 500
          },
          () => {
            if (this.state.apiStatusCode === 401) {
              this.props.customProps._toastMessage(
                "error",
                constants.SESSION_EXPIRED
              );
              this.props._removeToken();
            } else if (this.state.apiStatusCode === 500) {
              this.props.customProps._toastMessage(
                "error",
                constants.SOMETHING_WENT_WRONG
              );
            } else {
              this.props.customProps._toastMessage("error", err.message);
            }
          }
        );
      });

    // check if all field all valid
    // if (this.EditTeacherFormValidator.allValid()) {
    //     updateTeacherProfile(data).then(res => {
    //         this.setState({
    //             isLoading: false
    //         }, () => {
    //             this.props.history.push('/view-profile')
    //         })
    //     }).catch(err => {
    //         this.setState({
    //             isLoading: false
    //         })
    //     })
    // } else {
    //     this.setState({
    //         isLoading: false
    //     }, () => {
    //         this.EditTeacherFormValidator.showMessages()
    //         this.forceUpdate()
    //     })
    // }
  };
  // hide and show upload document
  allowUpload = event => {
    let { allowUpload } = this.state;
    this.setState({
      allowUpload: !allowUpload
    });
  };

  render() {
    let {
        teacherPositionOptions,
        teacher_info,
        isLoading,
        user_info,
        loginUserInfo,
        teacherProfile,
        allowUpload,
        training_info
      } = this.state,
      customFunction = {
        handleFormInput: this.handleFormInput,
        handleFormDropDown: this.handleFormDropDown,
        handleFormCheckbox: this.handleFormCheckbox,
        handleFileUpload: this.handleFileUpload,
        showLoader: this.showLoader,
        hasTrue: this.hasTrue,
        allowFileUpload: this.allowUpload
        // removeFile:this.removeFile
      },
      allValidation = {
        EditTeacherFormValidator: this.EditTeacherFormValidator
      };

    return (
      <div>
        <Container className="mt-5rem">
          <h2>Update teacher</h2>
          {isLoading ? (
            <Segment>
              <Dimmer active={isLoading} inverted>
                <Loader inverted content="Loading" />
              </Dimmer>
            </Segment>
          ) : (
            <EditTeacher
              teacher_info={teacher_info}
              training_info={training_info}
              allowUpload={allowUpload}
              user_info={user_info}
              teacherPositionOptions={teacherPositionOptions}
              loginUserInfo={loginUserInfo}
              teacherProfile={teacherProfile}
              {...customFunction}
              {...allValidation}
            />
          )}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginUserInfo: state.loginReducer.loginUserInfo
});

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTeacherProfile);
