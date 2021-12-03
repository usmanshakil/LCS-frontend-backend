import React, { Component } from "react";
import { connect } from "react-redux";
// API
import { viewTeacherProfile } from "../../../../ApiAction/View";
import {adminActiveTeacherProfile} from '../../../../ApiAction/Admin';
// Loader
import {Loaders} from '../../../'
// Component
import ViewTeacher from "./ViewTeacher";
//Constants 
import { constants } from '../../../';

class ViewTeacherProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUserInfo: props.loginUserInfo,
      // teacherProfile: "",
      currentTeacherInfo: {
        approved:'', first_name:'', last_name:'', email:'',active:''
      },
      apiStatusCode: '',
      isPageLoading:true,
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
        training_detail_id: '',
        child_abuse_neglect: '',
        child_abuse_neglect_date: '',
        emergency_response_planning: '',
        emergency_response_planning_date: '',
        first_aid_cpr_overview: '',
        first_aid_cpr_overview_date: '',
        food_related_risk_response: '',
        food_related_risk_response_date: '',
        hazardous_materials: '',
        hazardous_materials_date: '',
        infant_safe_sleeping_practices: '',
        infant_safe_sleeping_practices_date: '',
        infectious_diseases_immunizations: '',
        infectious_diseases_immunizations_date: '',
        introduction_child_development: '',
        introduction_child_development_date: '',
        medication_administration: '',
        medication_administration_date: '',
        physical_premises_safety: '',
        physical_premises_safety_date: '',
        shaken_baby_syndrome: '',
        shaken_baby_syndrome_date: '',
        transporting_children: '',
        transporting_children_date: '',
        total_hours: '',
        total_hours_date: '',
        eec_yearly_renewal: '',
        eec_yearly_renewal_date: '',
        eec_child_abuse_neglect: '',
        eec_child_abuse_neglect_date: '',
        eec_emergency_response_planning: '',
        eec_emergency_response_planning_date: '',
        eec_food_related_risk_response: '',
        eec_food_related_risk_response_date: '',
        eec_infectious_diseases_immunizations: '',
        eec_infectious_diseases_immunizations_date: '',
        eec_medication_administration: '',
        eec_medication_administration_date: '',
        eec_transporting_children: '',
        eec_transporting_children_date: '',
        eec_infant_safe_sleeping_practices: '',
        eec_infant_safe_sleeping_practices_date: '',
        eec_shaken_baby_syndrome: '',
        eec_shaken_baby_syndrome_date: ''
      },
      activeTeacherId:''

    };
  }

  componentWillMount() {
    if (this.props.loginUserInfo.role_id === 2) {
      if(this.props.history.location.state ===undefined){
        this.props.history.push('/teachers')
        // this.props.customProps._toastMessage('error', 'Data got expired')
      }else{
        let {currentTeacherInfo}=this.props.history.location.state;
      this.getAdminActiveTeacherProfile(currentTeacherInfo)
      }
    }else if(this.props.loginUserInfo.role_id === 4){
      this.getTeacherProfile();
    } else {
      this.props.history.push('/home')
    }
  }

  //fetching teacher list api for teacher module
  getTeacherProfile = () => {
    viewTeacherProfile().then(res => {
      let { teacher_info, training_info } = this.state, teacherInfo = {}, trainingInfo = {}
      if (res.data) {
        teacherInfo = this.fillTeacherInfoValue(res.data);
        trainingInfo = this.fillTrainingValue(res.data)
        // training_info.training_detail_id = res.data.id
      } else {
        teacherInfo = teacher_info
        trainingInfo = training_info
      }
        this.setState({
          teacher_info:teacherInfo,
          training_info:trainingInfo,
      isPageLoading:false
          });
      })
      .catch(err => {
        this.setState({
          apiStatusCode: err ? err.status : 500,
      isPageLoading:false

        }, () => {
          if (this.state.apiStatusCode === 401) {
            this.props.customProps._toastMessage('error', constants.SESSION_EXPIRED)
            this.props._removeToken()
          } else if (this.state.apiStatusCode === 500) {
            this.props.customProps._toastMessage('error', constants.SOMETHING_WENT_WRONG)
          } else {
            this.props.customProps._toastMessage('error', err.message)
          }
        });
      });
  };

  getAdminActiveTeacherProfile=(id)=>{
    
    adminActiveTeacherProfile(id).then(res=>{
      let { teacher_info, training_info,currentTeacherInfo } = this.state, teacherInfo = {}, trainingInfo = {};
      if (res.data.length) {
        teacherInfo = this.fillTeacherInfoValue(res.data[0]);
        trainingInfo = this.fillTrainingValue(res.data[0]);
        currentTeacherInfo.approved=res.data[0].approved;
        currentTeacherInfo.first_name=res.data[0].first_name;
        currentTeacherInfo.last_name=res.data[0].last_name;
        currentTeacherInfo.email=res.data[0].email;
        currentTeacherInfo.active=res.data[0].active
      } else {
        teacherInfo = teacher_info
        trainingInfo = training_info
      }
        this.setState({
          teacher_info:teacherInfo,
          training_info:trainingInfo,
          currentTeacherInfo,
      isPageLoading:false,
      activeTeacherId:id
          });
    }).catch(err=>{
      this.setState({
        apiStatusCode: err ? err.status : 500,
    isPageLoading:false

      }, () => {
        if (this.state.apiStatusCode === 401) {
          this.props.customProps._toastMessage('error', constants.SESSION_EXPIRED)
          this.props._removeToken()
        } else if (this.state.apiStatusCode === 500) {
          this.props.customProps._toastMessage('error', constants.SOMETHING_WENT_WRONG)
        } else {
          this.props.customProps._toastMessage('error', err.message)
        }
      });
    })
  }


   // filling value of teacher info object
   fillTeacherInfoValue = (currentTeacherInfo) => {
    let { teacher_info } = this.state,
      allData = currentTeacherInfo,
      { teacher_infos } = allData;
    teacher_info.id = teacher_infos.length ? teacher_infos[0].id : '';
    teacher_info.resume = teacher_infos.length ? teacher_infos[0].resume : '';
    teacher_info.interview_date = teacher_infos.length ? teacher_infos[0].interview_date : '';
    teacher_info.date_of_birth = teacher_infos.length ? teacher_infos[0].date_of_birth : '';
    teacher_info.date_of_hire = teacher_infos.length ? teacher_infos[0].date_of_hire : '';
    teacher_info.reference1 = teacher_infos.length ? teacher_infos[0].reference1 : '';
    teacher_info.ref_1_email = teacher_infos.length ? teacher_infos[0].ref_1_email : '';
    teacher_info.ref_1_phone = teacher_infos.length ? teacher_infos[0].ref_1_phone : '';
    teacher_info.reference2 = teacher_infos.length ? teacher_infos[0].reference2 : '';
    teacher_info.ref_2_email = teacher_infos.length ? teacher_infos[0].ref_2_email : '';
    teacher_info.ref_2_phone = teacher_infos.length ? teacher_infos[0].ref_2_phone : '';
    teacher_info.eec_cert_number = teacher_infos.length ? teacher_infos[0].eec_cert_number : '';
    teacher_info.eec_pq_reg = teacher_infos.length ? teacher_infos[0].eec_pq_reg : '';
    teacher_info.eec_pq_reg_date = teacher_infos.length ? teacher_infos[0].eec_pq_reg_date : '';
    teacher_info.cori = teacher_infos.length ? teacher_infos[0].cori === "1" ? "True" : "False" : '';
    teacher_info.cori_date = teacher_infos.length ? teacher_infos[0].cori_date : '';
    teacher_info.dcf = teacher_infos.length ? teacher_infos[0].dcf === "1" ? "True" : "False" : '';
    teacher_info.dcf_date = teacher_infos.length ? teacher_infos[0].dcf_date : '';
    teacher_info.physical = teacher_infos.length ? teacher_infos[0].physical === "1" ? "True" : "False" : '';
    teacher_info.physical_date = teacher_infos.length ? teacher_infos[0].physical_date : '';
    teacher_info.mmr1 = teacher_infos.length ? teacher_infos[0].mmr1 : '';
    teacher_info.mmr2 = teacher_infos.length ? teacher_infos[0].mmr2 : '';
    teacher_info.first_add = teacher_infos.length ? teacher_infos[0].first_add === "1" ? "True" : "False" : '';
    teacher_info.first_add_date = teacher_infos.length ? teacher_infos[0].first_add_date : '';
    teacher_info.eecorient = teacher_infos.length ? teacher_infos[0].eecorient === "1" ? "True" : "False" : '';
    teacher_info.medical_training = teacher_infos.length ? teacher_infos[0].medical_training === "1" ? "True" : "False" : '';
    teacher_info.sids = teacher_infos.length ? teacher_infos[0].sids === "1" ? "True" : "False" : '';
    teacher_info.usda = teacher_infos.length ? teacher_infos[0].usda === "1" ? "True" : "False" : '';
    teacher_info.look_before_lock = teacher_infos.length ? teacher_infos[0].look_before_lock === "1" ? "True" : "False" : '';
    teacher_info.prog_orientation = teacher_infos.length ? teacher_infos[0].prog_orientation === "1" ? "True" : "False" : '';
    teacher_info.prog_orientation_date = teacher_infos.length ? teacher_infos[0].prog_orientation_date : '';
    teacher_info.staff_observe = teacher_infos.length ? teacher_infos[0].staff_observe === "1" ? "True" : "False" : '';
    teacher_info.staff_evaluation = teacher_infos.length ? teacher_infos[0].staff_evaluation === "1" ? "True" : "False" : '';
    teacher_info.staff_evaluation_date = teacher_infos.length ? teacher_infos[0].staff_evaluation_date : '';
    teacher_info.dbus_lic = teacher_infos.length ? teacher_infos[0].dbus_lic : '';
    teacher_info.dbus_lic_date = teacher_infos.length ? teacher_infos[0].dbus_lic_date : '';
    teacher_info.program_name = teacher_infos.length ? teacher_infos[0].program_name : '';
    teacher_info.completed_by = teacher_infos.length ? teacher_infos[0].completed_by : '';
    teacher_info.completed_date = teacher_infos.length ? teacher_infos[0].completed_date : '';
    return teacher_info;
  }


  // filling teacher training info value
  fillTrainingValue = (currentTeacherInfo) => {
    let { training_info } = this.state,
      allData = currentTeacherInfo,
      { teacher_training_details   } = allData;
      training_info.training_detail_id=teacher_training_details.length ? teacher_training_details[0].training_detail_id : ''
    training_info.child_abuse_neglect = teacher_training_details.length ? teacher_training_details[0].child_abuse_neglect : '';
    training_info.child_abuse_neglect_date = teacher_training_details.length ? teacher_training_details[0].child_abuse_neglect_date : ''
    training_info.emergency_response_planning = teacher_training_details.length ? teacher_training_details[0].emergency_response_planning : '';
    training_info.emergency_response_planning_date = teacher_training_details.length ? teacher_training_details[0].emergency_response_planning_date: '';
    training_info.first_aid_cpr_overview = teacher_training_details.length ? teacher_training_details[0].first_aid_cpr_overview: '';
    training_info.first_aid_cpr_overview_date = teacher_training_details.length ? teacher_training_details[0].first_aid_cpr_overview_date: '';
    training_info.food_related_risk_response = teacher_training_details.length ? teacher_training_details[0].food_related_risk_response: '';
    training_info.food_related_risk_response_date = teacher_training_details.length ? teacher_training_details[0].food_related_risk_response_date: '';
    training_info.hazardous_materials = teacher_training_details.length ? teacher_training_details[0].hazardous_materials: '';
    training_info.hazardous_materials_date = teacher_training_details.length ? teacher_training_details[0].hazardous_materials_date: '';
    training_info.infant_safe_sleeping_practices = teacher_training_details.length ? teacher_training_details[0].infant_safe_sleeping_practices: '';
    training_info.infant_safe_sleeping_practices_date = teacher_training_details.length ? teacher_training_details[0].infant_safe_sleeping_practices_date: '';
    training_info.infectious_diseases_immunizations = teacher_training_details.length ? teacher_training_details[0].infectious_diseases_immunizations: '';
    training_info.infectious_diseases_immunizations_date = teacher_training_details.length ? teacher_training_details[0].infectious_diseases_immunizations_date: '';
    training_info.introduction_child_development = teacher_training_details.length ? teacher_training_details[0].introduction_child_development: '';
    training_info.introduction_child_development_date = teacher_training_details.length ? teacher_training_details[0].introduction_child_development_date : '';
    training_info.medication_administration = teacher_training_details.length ? teacher_training_details[0].medication_administration: '';
    training_info.medication_administration_date = teacher_training_details.length ? teacher_training_details[0].medication_administration_date: '';
    training_info.physical_premises_safety = teacher_training_details.length ? teacher_training_details[0].physical_premises_safety: '';
    training_info.physical_premises_safety_date = teacher_training_details.length ? teacher_training_details[0].physical_premises_safety_date : '';
    training_info.shaken_baby_syndrome = teacher_training_details.length ? teacher_training_details[0].shaken_baby_syndrome : '';
    training_info.shaken_baby_syndrome_date = teacher_training_details.length ? teacher_training_details[0].shaken_baby_syndrome_date : '';
    training_info.transporting_children = teacher_training_details.length ? teacher_training_details[0].transporting_children : '';
    training_info.transporting_children_date = teacher_training_details.length ? teacher_training_details[0].transporting_children_date : '';
    training_info.total_hours = teacher_training_details.length ? teacher_training_details[0].total_hours : '';
    training_info.total_hours_date = teacher_training_details.length ? teacher_training_details[0].total_hours_date : '';
    training_info.eec_yearly_renewal = teacher_training_details.length ? teacher_training_details[0].eec_yearly_renewal : '';
    training_info.eec_yearly_renewal_date = teacher_training_details.length ? teacher_training_details[0].eec_yearly_renewal_date: '';
    training_info.eec_child_abuse_neglect = teacher_training_details.length ? teacher_training_details[0].eec_child_abuse_neglect : '';
    training_info.eec_child_abuse_neglect_date = teacher_training_details.length ? teacher_training_details[0].eec_child_abuse_neglect_date : '';
    training_info.eec_emergency_response_planning = teacher_training_details.length ? teacher_training_details[0].eec_emergency_response_planning: '';
    training_info.eec_emergency_response_planning_date = teacher_training_details.length ? teacher_training_details[0].eec_emergency_response_planning_date : '';
    training_info.eec_food_related_risk_response = teacher_training_details.length ? teacher_training_details[0].eec_food_related_risk_response : '';
    training_info.eec_food_related_risk_response_date = teacher_training_details.length ? teacher_training_details[0].eec_food_related_risk_response_date: '';
    training_info.eec_infectious_diseases_immunizations = teacher_training_details.length ? teacher_training_details[0].eec_infectious_diseases_immunizations : '';
    training_info.eec_infectious_diseases_immunizations_date = teacher_training_details.length ? teacher_training_details[0].eec_infectious_diseases_immunizations_date: '';
    training_info.eec_medication_administration = teacher_training_details.length ? teacher_training_details[0].eec_medication_administration : '';
    training_info.eec_medication_administration_date = teacher_training_details.length ? teacher_training_details[0].eec_medication_administration_date: '';
    training_info.eec_transporting_children = teacher_training_details.length ? teacher_training_details[0].eec_transporting_children : '';
    training_info.eec_transporting_children_date = teacher_training_details.length ? teacher_training_details[0].eec_transporting_children_date : '';
    training_info.eec_infant_safe_sleeping_practices = teacher_training_details.length ?teacher_training_details[0].eec_infant_safe_sleeping_practices : '';
    training_info.eec_infant_safe_sleeping_practices_date = teacher_training_details.length ? teacher_training_details[0].eec_infant_safe_sleeping_practices_date : '';
    training_info.eec_shaken_baby_syndrome = teacher_training_details.length ?teacher_training_details[0].eec_shaken_baby_syndrome: '';
    training_info.eec_shaken_baby_syndrome_date = teacher_training_details.length ? teacher_training_details[0].eec_shaken_baby_syndrome_date : '';
    return training_info
  }

  // redirecting to edit teacher profile page
  openEditProfilePage = () => {
    this.props.history.push({
      pathname: `/edit-profile`,
      state: { activeTeacherId: this.state.activeTeacherId }
    });
  };
 
// showing yes no value in capital
  showYesNo=(value)=>{
    switch(value){
      case 'yes':
        return 'Yes';
        case 'no' :
          return 'No';
          case '':
            return '';
            default:
              return '';
    }

  }

  render() {
    let { teacher_info, loginUserInfo, currentTeacherInfo,isPageLoading,training_info } = this.state;

    return (
      <div>
        {
          isPageLoading? <div className="ui container"><Loaders isLoading={isPageLoading} /> </div> :<ViewTeacher
          teacher_info={teacher_info}
          loginUserInfo={loginUserInfo}
          openEditProfilePage={this.openEditProfilePage}
          currentTeacherInfo={currentTeacherInfo}
          training_info={training_info}
          showYesNo={this.showYesNo}
        />
        }
        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginUserInfo: state.loginReducer.loginUserInfo
});

const mapDispatchToProp = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(ViewTeacherProfile);
