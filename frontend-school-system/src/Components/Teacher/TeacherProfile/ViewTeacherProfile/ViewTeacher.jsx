import React from "react";
import { Grid, Button, Popup, Icon, Header } from "semantic-ui-react";
import ReactToPrint from "react-to-print";
import moment from 'moment';

// css 
import './ViewTeacherProfile.css';

function ViewTeacher(props) {
  let { teacher_info, loginUserInfo, currentTeacherInfo, training_info } = props,
    {
      resume,
      interview_date,
      reference1,
      ref_1_email,
      ref_1_phone,
      reference2,
      ref_2_email,
      ref_2_phone,
      date_of_birth,
      date_of_hire,
      eec_cert_number,
      eec_pq_reg,
      eec_pq_reg_date,
      cori,
      cori_date,
      dcf,
      dcf_date,
      physical,
      physical_date,
      mmr1,
      mmr2,
      first_add,
      first_add_date,
      eecorient,
      medical_training,
      look_before_lock,
      sids,
      usda,
      prog_orientation,
      prog_orientation_date,
      staff_observe,
      staff_evaluation,
      staff_evaluation_date,
      dbus_lic,
      dbus_lic_date,
      program_name,
      completed_by,
      completed_date,

    } = teacher_info,
    { child_abuse_neglect,
      child_abuse_neglect_date,
      emergency_response_planning,
      emergency_response_planning_date,
      first_aid_cpr_overview,
      first_aid_cpr_overview_date,
      food_related_risk_response,
      food_related_risk_response_date,
      hazardous_materials,
      hazardous_materials_date,
      infant_safe_sleeping_practices,
      infant_safe_sleeping_practices_date,
      infectious_diseases_immunizations,
      infectious_diseases_immunizations_date,
      introduction_child_development,
      introduction_child_development_date,
      medication_administration,
      medication_administration_date,
      physical_premises_safety,
      physical_premises_safety_date,
      shaken_baby_syndrome,
      shaken_baby_syndrome_date,
      transporting_children,
      transporting_children_date,
      total_hours,
      total_hours_date,
      eec_yearly_renewal,
      eec_yearly_renewal_date,
      eec_child_abuse_neglect,
      eec_child_abuse_neglect_date,
      eec_emergency_response_planning,
      eec_emergency_response_planning_date,
      eec_food_related_risk_response,
      eec_food_related_risk_response_date,
      eec_infectious_diseases_immunizations,
      eec_infectious_diseases_immunizations_date,
      eec_medication_administration,
      eec_medication_administration_date,
      eec_transporting_children,
      eec_transporting_children_date,
      eec_infant_safe_sleeping_practices,
      eec_infant_safe_sleeping_practices_date,
      eec_shaken_baby_syndrome,
      eec_shaken_baby_syndrome_date } = training_info,
    { approved, first_name, last_name, email, active } = loginUserInfo.role_id === 2 ? currentTeacherInfo : loginUserInfo,
    letRef = React.createRef();

  return (
    <div className={`theme-${loginUserInfo.role_id}-border ui container view-parent-profile-layout mt-2rem mb-5`}  >
      <div className="ui grid page-break" >
        <div className="row">
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            {/* <h2>Teacher details</h2> */}

            <div className="ui large header">Teaching Profile</div>
          </div>
          <div className="five wide computer five wide tablet">

          </div>
          <div className="five wide computer five wide tablet">
          </div>
        </div>
        <div className="row">
          <div className="five wide computer five wide tablet seven wide mobile column">
            {/* <h2>Teacher details</h2> */}
            <Button type="button" onClick={props.openEditProfilePage} id="printbtn">
              Edit Profile
      </Button>
          </div>
          <div className="five wide computer five wide tablet one wide mobile column">

          </div>
          <div className="five wide computer five wide tablet seven wide mobile column">
            {
              loginUserInfo.role_id === 2 ? <ReactToPrint
                copyStyles={true}
                trigger={() => <button className="ui vertical animated button right floated" id="printbtn">
                  <div className="hidden content">Print</div>
                  <div className="visible content"><i aria-hidden="true" className="print icon"></i></div>
                </button>}
                content={() => letRef.current}
                pageStyle="@page { size: 2.5in 4in, page-break-before	:auto, page-break-after:auto}"
              /> : ''
            }

          </div>
        </div>

        {
          loginUserInfo.role_id === 2 ? <h3>User information </h3> : ''
        }
        {loginUserInfo.role_id === 2 ?
          <Grid.Row>
            <Grid.Column computer={5} tablet={5} mobile={16}>
              <strong>Active:</strong>
              <span className="ml-5">{`${active}`}</span>
            </Grid.Column>
            <Grid.Column computer={5} tablet={5} mobile={16}>
              <strong>First Name:</strong>
              <span className="ml-5">{first_name}</span>
            </Grid.Column>
            <Grid.Column computer={5} tablet={5} mobile={16}>
              <strong>Last Name:</strong>
              <span className="ml-5">{last_name}</span>
            </Grid.Column>
          </Grid.Row>
          : ''

        }
        {loginUserInfo.role_id === 2 ?
          <Grid.Row>
            <Grid.Column computer={5} tablet={5} mobile={16}>
              <strong>Email:</strong>
              <span className="ml-5">{email}</span>
            </Grid.Column>
            <Grid.Column computer={5} tablet={5} mobile={16} />

            <Grid.Column computer={5} tablet={5} mobile={16} />
          </Grid.Row>
          :
          ''
        }


        {/* <Grid.Row>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <h3>Teacher information</h3>
          </Grid.Column>
          <Grid.Column computer={5} tablet={5} >

          </Grid.Column><Grid.Column computer={5} tablet={5} >

          </Grid.Column>
        </Grid.Row> */}
        <Grid.Row>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>Position:</strong>
            <span className="ml-5">Teacher</span>

            {/* <span className="ml-5">{position}</span> */}
          </Grid.Column>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>
              <b>
                <font color="#3FACC6">Resume</font>
              </b>
              :
            </strong>
            {resume ?
              <Popup trigger={<span className="table-icons-spacing">
                <Icon name='file alternate outline' className="view-icon cursor-pointer" color={`${resume === '' ? 'grey' : 'teal'}`}
                  size="large" /></span>}
                flowing
                hoverable >
                <Grid centered divided columns={1}>
                  <Grid.Column textAlign='center'>
                    <Header as='h4'>Resume</Header>
                    <a href={resume} target="blank" rel="noopener noreferrer"  >Download</a>
                  </Grid.Column>
                </Grid>
              </Popup> : ''
            }

          </Grid.Column>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>Interview Date:</strong>
            <span className="ml-5">{interview_date === '' ? '' : moment(interview_date).format('MM/DD/YYYY')}</span>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>Reference 1:</strong>
            <span className="ml-5">{reference1}</span>
          </Grid.Column>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>Reference 1 Email:</strong>
            <span className="ml-5">{ref_1_email}</span>
          </Grid.Column>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>Reference 1 Phone:</strong>
            <span className="ml-5">{ref_1_phone}</span>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>Reference 2:</strong>
            <span className="ml-5">{reference2}</span>
          </Grid.Column>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>Reference 2 Email:</strong>
            <span className="ml-5">{ref_2_email}</span>
          </Grid.Column>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>Reference 2 Phone:</strong>
            <span className="ml-5">{ref_2_phone}</span>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>Date of Birth:</strong>
            <span className="ml-5">{date_of_birth === '' ? '' : moment(date_of_birth).format('MM/DD/YYYY')}</span>
          </Grid.Column>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>Date of Hire:</strong>
            <span className="ml-5">{date_of_hire === '' ? '' : moment(date_of_hire).format('MM/DD/YYYY')}</span>
          </Grid.Column>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>EEC cert number:</strong>
            <span className="ml-5">{eec_cert_number}</span>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>EEC pq reg:</strong>
            <span className="ml-5">{eec_pq_reg}</span>
          </Grid.Column>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>EEC pq reg date:</strong>
            <span className="ml-5">{eec_pq_reg_date === '' ? '' : moment(eec_pq_reg_date).format('MM/DD/YYYY')}</span>
          </Grid.Column>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>CORI:</strong>
            <span className="ml-5">{cori}</span>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>CORI date:</strong>
            <span className="ml-5">{cori_date === '' ? '' : moment(cori_date).format('MM/DD/YYYY')}</span>
          </Grid.Column>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>DCF:</strong>
            <span className="ml-5">{dcf}</span>
          </Grid.Column>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>DCF date:</strong>
            <span className="ml-5">{dcf_date === '' ? '' : moment(dcf_date).format('MM/DD/YYYY')}</span>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>Physical:</strong>
            <span className="ml-5">{physical}</span>
          </Grid.Column>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>Physical date:</strong>
            <span className="ml-5">{physical_date === '' ? '' : moment(physical_date).format('MM/DD/YYYY')}</span>
          </Grid.Column>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>MMR1:</strong>
            <span className="ml-5">{mmr1}</span>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>MMR2:</strong>
            <span className="ml-5">{mmr2}</span>
          </Grid.Column>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>First aid:</strong>
            <span className="ml-5">{first_add}</span>
          </Grid.Column>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>First aid date:</strong>
            <span className="ml-5">{first_add_date === '' ? '' : moment(first_add_date).format('MM/DD/YYYY')}</span>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>EECorient:</strong>
            <span className="ml-5">{eecorient}</span>
          </Grid.Column>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>Medical training:</strong>
            <span className="ml-5">{medical_training}</span>
          </Grid.Column>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>Look before lock:</strong>
            <span className="ml-5">{look_before_lock}</span>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>SIDS:</strong>
            <span className="ml-5">{sids}</span>
          </Grid.Column>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>USDA:</strong>
            <span className="ml-5">{usda}</span>
          </Grid.Column>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>Prog orientation:</strong>
            <span className="ml-5">{prog_orientation}</span>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>Prog orientation date:</strong>
            <span className="ml-5">{prog_orientation_date === '' ? '' : moment(prog_orientation_date).format('MM/DD/YYYY')}</span>
          </Grid.Column>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>Staff observe:</strong>
            <span className="ml-5">{staff_observe}</span>
          </Grid.Column>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>Staff evaluation:</strong>
            <span className="ml-5">{staff_evaluation}</span>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>Staff evaluation date:</strong>
            <span className="ml-5">{staff_evaluation_date === '' ? '' : moment(staff_evaluation_date).format('MM/DD/YYYY')}</span>
          </Grid.Column>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>7-Dbus Lic:</strong>
            <span className="ml-5">{dbus_lic}</span>
          </Grid.Column>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>7-Dbus Lic date:</strong>
            <span className="ml-5">{dbus_lic_date === '' ? '' : moment(dbus_lic_date).format('MM/DD/YYYY')}</span>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>Program name:</strong>
            <span className="ml-5">{program_name}</span>
          </Grid.Column>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>Completed by:</strong>
            <span className="ml-5">{completed_by}</span>
          </Grid.Column>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <strong>Completed date:</strong>
            <span className="ml-5">{completed_date === '' ? '' : moment(completed_date).format('MM/DD/YYYY')}</span>
          </Grid.Column>
        </Grid.Row>
      </div>

      <div className="ui grid page-break">
        <h3>EEC Essentials Training</h3>
        {/* class mobile-view content is visbible in mobile screen
        it is used to align with related row
         */}
        <div className="row teacher-training-row">
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong>Child abuse and Neglect:</strong>
            <span className="ml-5">{props.showYesNo(child_abuse_neglect)}</span>
          </div>
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong className="d-v">Emergency Response Planning:</strong>
            <span className="ml-5 d-v">{props.showYesNo(emergency_response_planning)}</span>
            <strong className="mobile-view">Date:</strong>
            <span className="ml-5 mobile-view">{child_abuse_neglect_date === '' ? '' : moment(child_abuse_neglect_date).format('MM/DD/YYYY')}</span>
          </div>
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong className="mobile-view">Emergency Response Planning:</strong>
            <span className="ml-5 mobile-view">{props.showYesNo(emergency_response_planning)}</span>
            <strong className="d-v">First Aid & CPR Overview:</strong>
            <span className="ml-5 d-v">{props.showYesNo(first_aid_cpr_overview)}</span>
          </div>
          <div className="sixteen wide mobile column">
            <strong className="mobile-view">Date:</strong>
            <span className="ml-5 mobile-view">{emergency_response_planning_date === '' ? '' : moment(emergency_response_planning_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>

        <div className="row teacher-training-date-row">
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong className="d-v">Date:</strong>
            <span className="ml-5 d-v">{child_abuse_neglect_date === '' ? '' : moment(child_abuse_neglect_date).format('MM/DD/YYYY')}</span>
          </div>
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong className="d-v">Date:</strong>
            <span className="ml-5 d-v">{emergency_response_planning_date === '' ? '' : moment(emergency_response_planning_date).format('MM/DD/YYYY')}</span>
            <strong className="mobile-view">First Aid & CPR Overview:</strong>
            <span className="ml-5 mobile-view">{props.showYesNo(first_aid_cpr_overview)}</span>
          </div>
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong>Date:</strong>
            <span className="ml-5">{first_aid_cpr_overview_date === '' ? '' : moment(first_aid_cpr_overview_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>


        <div className="row teacher-training-row">
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong>Food Related Risk and Response:</strong>
            <span className="ml-5">{props.showYesNo(food_related_risk_response)}</span>
          </div>
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong className="d-v">Hazardous Materials:</strong>
            <span className="ml-5 d-v">{props.showYesNo(hazardous_materials)}</span>
            <strong className="mobile-view">Date:</strong>
            <span className="ml-5 mobile-view">{food_related_risk_response_date === '' ? '' : moment(food_related_risk_response_date).format('MM/DD/YYYY')}</span>
          </div>
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong className="mobile-view">Hazardous Materials:</strong>
            <span className="ml-5 mobile-view">{props.showYesNo(hazardous_materials)}</span>
            <strong className="d-v">Infant Safe Sleeping Practices:</strong>
            <span className="ml-5 d-v">{props.showYesNo(infant_safe_sleeping_practices)}</span>
          </div>
          <div className="sixteen wide mobile column">
            <strong className="mobile-view">Date:</strong>
            <span className="ml-5 mobile-view">{hazardous_materials_date === '' ? '' : moment(hazardous_materials_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>

        <div className="row teacher-training-date-row">
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong className="d-v">Date:</strong>
            <span className="ml-5 d-v">{food_related_risk_response_date === '' ? '' : moment(food_related_risk_response_date).format('MM/DD/YYYY')}</span>
          </div>
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong className="d-v">Date:</strong>
            <span className="ml-5 d-v">{hazardous_materials_date === '' ? '' : moment(hazardous_materials_date).format('MM/DD/YYYY')}</span>
            <strong className="mobile-view">Infant Safe Sleeping Practices:</strong>
            <span className="ml-5 mobile-view">{props.showYesNo(infant_safe_sleeping_practices)}</span>
          </div>
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong>Date:</strong>
            <span className="ml-5">{infant_safe_sleeping_practices_date === '' ? '' : moment(infant_safe_sleeping_practices_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>

        <div className="row teacher-training-row">
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong>Infectious Diseases and Immunizations:</strong>
            <span className="ml-5">{props.showYesNo(infectious_diseases_immunizations)}</span>
          </div>
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong className="d-v">Medication Administration:</strong>
            <span className="ml-5 d-v">{props.showYesNo(medication_administration)}</span>
            <strong className="mobile-view">Date:</strong>
            <span className="ml-5 mobile-view">{infectious_diseases_immunizations_date === '' ? '' : moment(infectious_diseases_immunizations_date).format('MM/DD/YYYY')}</span>
          </div>
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong className="d-v">Introduction to Child Development:</strong>
            <span className="ml-5 d-v">{props.showYesNo(introduction_child_development)}</span>
            <strong className="mobile-view">Medication Administration:</strong>
            <span className="ml-5 mobile-view">{props.showYesNo(medication_administration)}</span>
          </div>
          <div className="sixteen wide mobile column">
            <strong className="mobile-view">Date:</strong>
            <span className="ml-5 mobile-view">{medication_administration_date === '' ? '' : moment(medication_administration_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
        <div className="row teacher-training-date-row">
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong className="d-v">Date:</strong>
            <span className="ml-5 d-v">{infectious_diseases_immunizations_date === '' ? '' : moment(infectious_diseases_immunizations_date).format('MM/DD/YYYY')}</span>
          </div>
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong className="d-v">Date:</strong>
            <span className="ml-5 d-v">{medication_administration_date === '' ? '' : moment(medication_administration_date).format('MM/DD/YYYY')}</span>
            <strong className="mobile-view">Introduction to Child Development:</strong>
            <span className="ml-5 mobile-view">{props.showYesNo(introduction_child_development)}</span>
          </div>
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong>Date:</strong>
            <span className="ml-5">{introduction_child_development_date === '' ? '' : moment(introduction_child_development_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>

        <div className="row teacher-training-row">
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong>Physical Premises Safety:</strong>
            <span className="ml-5">{props.showYesNo(physical_premises_safety)}</span>
          </div>
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong className="d-v">Shaken Baby Syndrome:</strong>
            <span className="ml-5 d-v">{props.showYesNo(shaken_baby_syndrome)}</span>
            <strong className="mobile-view">Date:</strong>
            <span className="ml-5 mobile-view">{physical_premises_safety_date === '' ? '' : moment(physical_premises_safety_date).format('MM/DD/YYYY')}</span>
          </div>
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong className="d-v">Transporting Children:</strong>
            <span className="ml-5 d-v">{props.showYesNo(transporting_children)}</span>
            <strong className="mobile-view">Shaken Baby Syndrome:</strong>
            <span className="ml-5 mobile-view">{props.showYesNo(shaken_baby_syndrome)}</span>
          </div>
          <div className="sixteen wide mobile column">
            <strong className="mobile-view">Date:</strong>
            <span className="ml-5 mobile-view">{shaken_baby_syndrome_date === '' ? '' : moment(shaken_baby_syndrome_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
        <div className="row teacher-training-date-row">
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong className="d-v">Date:</strong>
            <span className="ml-5 d-v">{physical_premises_safety_date === '' ? '' : moment(physical_premises_safety_date).format('MM/DD/YYYY')}</span>

          </div>
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong className="d-v">Date:</strong>
            <span className="ml-5 d-v">{shaken_baby_syndrome_date === '' ? '' : moment(shaken_baby_syndrome_date).format('MM/DD/YYYY')}</span>
            <strong className="mobile-view">Transporting Children:</strong>
            <span className="ml-5 mobile-view">{props.showYesNo(transporting_children)}</span>
          </div>
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong>Date:</strong>
            <span className="ml-5">{transporting_children_date === '' ? '' : moment(transporting_children_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>

        <div className="row teacher-training-row">

          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong>Total Hours:</strong>
            <span className="ml-5">{props.showYesNo(total_hours)}</span>
          </div>
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong className="mobile-view">Date:</strong>
            <span className="ml-5 mobile-view">{total_hours_date === '' ? '' : moment(total_hours_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
        <div className="row teacher-training-date-row">
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong className="d-v">Date:</strong>
            <span className="ml-5 d-v">{total_hours_date === '' ? '' : moment(total_hours_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
      </div>
      <div className="ui grid page-break">
        <h3>
          EEC Yearly Renewal
        </h3>
        <div className="row teacher-training-row">
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong>EEC Yearly Renewal:</strong>
            <span className="ml-5">{props.showYesNo(eec_yearly_renewal)}</span>
          </div>
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong className="d-v">Child Abuse and Neglect:</strong>
            <span className="ml-5 d-v">{props.showYesNo(eec_child_abuse_neglect)}</span>
            <strong className="mobile-view">Date:</strong>
            <span className="ml-5 mobile-view">{eec_yearly_renewal_date === '' ? '' : moment(eec_yearly_renewal_date).format('MM/DD/YYYY')}</span>
          </div>
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong className="d-v">Emergency Response Planning:</strong>
            <span className="ml-5 d-v">{props.showYesNo(eec_emergency_response_planning)}</span>
            <strong className="mobile-view">Child Abuse and Neglect:</strong>
            <span className="ml-5 mobile-view">{props.showYesNo(eec_child_abuse_neglect)}</span>
          </div>
          <div className="sixteen wide mobile column">
            <strong className="mobile-view">Date:</strong>
            <span className="ml-5 mobile-view">{eec_child_abuse_neglect_date === '' ? '' : moment(eec_child_abuse_neglect_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
        <div className="row teacher-training-date-row">
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong className="d-v">Date:</strong>
            <span className="ml-5 d-v">{eec_yearly_renewal_date === '' ? '' : moment(eec_yearly_renewal_date).format('MM/DD/YYYY')}</span>
          </div>
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong className="d-v">Date:</strong>
            <span className="ml-5 d-v">{eec_child_abuse_neglect_date === '' ? '' : moment(eec_child_abuse_neglect_date).format('MM/DD/YYYY')}</span>
            <strong className="mobile-view">Emergency Response Planning:</strong>
            <span className="ml-5 mobile-view">{props.showYesNo(eec_emergency_response_planning)}</span>
          </div>
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong>Date:</strong>
            <span className="ml-5">{eec_emergency_response_planning_date === '' ? '' : moment(eec_emergency_response_planning_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
        <div className="row teacher-training-row">

          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong>Food Related Risk and Response:</strong>
            <span className="ml-5">{props.showYesNo(eec_food_related_risk_response)}</span>
          </div>
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong className="d-v">Infectious Diseases and Immunizations:</strong>
            <span className="ml-5 d-v">{props.showYesNo(eec_infectious_diseases_immunizations)}</span>
            <strong className="mobile-view">Date:</strong>
            <span className="ml-5 mobile-view">{eec_food_related_risk_response_date === '' ? '' : moment(eec_food_related_risk_response_date).format('MM/DD/YYYY')}</span>
          </div>
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong className="d-v">Medication Administration:</strong>
            <span className="ml-5 d-v">{props.showYesNo(eec_medication_administration)}</span>
            <strong className="mobile-view">Infectious Diseases and Immunizations:</strong>
            <span className="ml-5 mobile-view">{props.showYesNo(eec_infectious_diseases_immunizations)}</span>
          </div>
          <div className="sixteen wide mobile column">
            <strong className="mobile-view">Date:</strong>
            <span className="ml-5 mobile-view">{eec_infectious_diseases_immunizations_date === '' ? '' : moment(eec_infectious_diseases_immunizations_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
        <div className="row teacher-training-date-row">
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong className="d-v">Date:</strong>
            <span className="ml-5 d-v">{eec_food_related_risk_response_date === '' ? '' : moment(eec_food_related_risk_response_date).format('MM/DD/YYYY')}</span>

          </div>
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong className="d-v">Date:</strong>
            <span className="ml-5 d-v">{eec_infectious_diseases_immunizations_date === '' ? '' : moment(eec_infectious_diseases_immunizations_date).format('MM/DD/YYYY')}</span>
            <strong className="mobile-view">Medication Administration:</strong>
            <span className="ml-5 mobile-view">{props.showYesNo(eec_medication_administration)}</span>
          </div>
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong>Date:</strong>
            <span className="ml-5">{eec_medication_administration_date === '' ? '' : moment(eec_medication_administration_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>


        <div className="row teacher-training-row">
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong>Transporting Children:</strong>
            <span className="ml-5">{props.showYesNo(eec_transporting_children)}</span>
          </div>
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong className="d-v">Infant Safe Sleeping Practices:</strong>
            <span className="ml-5 d-v">{props.showYesNo(eec_infant_safe_sleeping_practices)}</span>
            <strong className="mobile-view">Date:</strong>
            <span className="ml-5 mobile-view">{eec_transporting_children_date === '' ? '' : moment(eec_transporting_children_date).format('MM/DD/YYYY')}</span>
          </div>
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong className="d-v">Shaken Baby Syndrome:</strong>
            <span className="ml-5 d-v">{props.showYesNo(eec_shaken_baby_syndrome)}</span>
            <strong className="mobile-view">Infant Safe Sleeping Practices:</strong>
            <span className="ml-5 mobile-view">{props.showYesNo(eec_infant_safe_sleeping_practices)}</span>
          </div>
          <div className="sixteen wide mobile column">
            <strong className="mobile-view">Date:</strong>
            <span className="ml-5 mobile-view">{eec_infant_safe_sleeping_practices_date === '' ? '' : moment(eec_infant_safe_sleeping_practices_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>

        <div className="row teacher-training-date-row">
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong className="d-v">Date:</strong>
            <span className="ml-5 d-v">{eec_transporting_children_date === '' ? '' : moment(eec_transporting_children_date).format('MM/DD/YYYY')}</span>
          </div>
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong className="d-v">Date:</strong>
            <span className="ml-5 d-v">{eec_infant_safe_sleeping_practices_date === '' ? '' : moment(eec_infant_safe_sleeping_practices_date).format('MM/DD/YYYY')}</span>
            <strong className="mobile-view">Shaken Baby Syndrome:</strong>
            <span className="ml-5 mobile-view">{props.showYesNo(eec_shaken_baby_syndrome)}</span>
          </div>
          <div className="five wide computer five wide tablet sixteen wide mobile column">
            <strong>Date:</strong>
            <span className="ml-5">{eec_shaken_baby_syndrome_date === '' ? '' : moment(eec_shaken_baby_syndrome_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
      </div>
      {loginUserInfo.role_id === 2 ? '' : <Grid className="page-break">
        <h3>Teacher information</h3>
        {loginUserInfo.role_id === 2 ?
          <Grid.Row>
            <Grid.Column computer={5} tablet={5} mobile={16}>
              <strong>Approved:</strong>
              <span className="ml-5">{`${approved}`}</span>
            </Grid.Column>
            <Grid.Column computer={5} tablet={5} mobile={16}>
              <strong>First Name:</strong>
              <span className="ml-5">{first_name}</span>
            </Grid.Column>
            <Grid.Column computer={5} tablet={5} mobile={16}>
              <strong>Last Name:</strong>
              <span className="ml-5">{last_name}</span>
            </Grid.Column>
          </Grid.Row>
          :
          <Grid.Row>
            <Grid.Column computer={5} tablet={5} mobile={16}>
              <strong>Active:</strong>
              <span className="ml-5">{`${active}`}</span>
            </Grid.Column>
            <Grid.Column computer={5} tablet={5} mobile={16}>
              <strong>First Name:</strong>
              <span className="ml-5">{first_name}</span>
            </Grid.Column>
            <Grid.Column computer={5} tablet={5} mobile={16}>
              <strong>Last Name:</strong>
              <span className="ml-5">{last_name}</span>
            </Grid.Column>
          </Grid.Row>

        }
        {loginUserInfo.role_id === 2 ?
          <Grid.Row>
            <Grid.Column computer={5} tablet={5} mobile={16}>
              <strong>Email:</strong>
              <span className="ml-5">{email}</span>
            </Grid.Column>
            <Grid.Column computer={5} tablet={5} mobile={16} />

            <Grid.Column computer={5} tablet={5} mobile={16} />
          </Grid.Row>
          :
          <Grid.Row>
            <Grid.Column computer={5} tablet={5} mobile={16}>
              <strong>Email:</strong>
              <span className="ml-5">{email}</span>
            </Grid.Column>
            <Grid.Column computer={5} tablet={5} mobile={16} />
            <Grid.Column computer={5} tablet={5} mobile={16} />
          </Grid.Row>
        }
      </Grid>}

      <div className="w-100 hide-print" ref={letRef}>
        <h2 className="text-center">
          LITTLE CHILDREN SCHOOLHOUSE
                </h2>
        <h3 className="text-center mt-2rem" >Teacher information</h3>
        <TeacherInformation {...props} />
        <EECTrainingInformation {...props} />
        <EECYearlyRenewal {...props} />
      </div>
    </div>
  );
}

export default ViewTeacher;



export function TeacherInformation(props) {
  let { teacher_info } = props,
    {
      
      interview_date,
      reference1,
      ref_1_email,
      ref_1_phone,
      reference2,
      ref_2_email,
      ref_2_phone,
      date_of_birth,
      date_of_hire,
      eec_cert_number,
      eec_pq_reg,
      eec_pq_reg_date,
      cori,
      cori_date,
      dcf,
      dcf_date,
      physical,
      physical_date,
      mmr1,
      mmr2,
      first_add,
      first_add_date,
      eecorient,
      medical_training,
      look_before_lock,
      sids,
      usda,
      prog_orientation,
      prog_orientation_date,
      staff_observe,
      staff_evaluation,
      staff_evaluation_date,
      dbus_lic,
      dbus_lic_date,
      program_name,
      completed_by,
      completed_date,

    } = teacher_info;
  return (
    <div className="centered-text print-border mt-2rem">

      <div className="w-100 flex-content col-gap">
        <div className="w-33 ">
          <div className="w-100 col-gap">
            <strong>Position:</strong>
          </div>
          <div className="w-100 text-layout">
            <p className="paragraph-layout">
              Teacher
          </p>
          </div>
        </div>
        <div className="w-33 ">
          <div className="w-100 col-gap">
            <strong>Interview Date:</strong>
          </div>
          <div className="w-100 ">
            <span >{interview_date}</span>
          </div>
        </div>
        <div className="w-33 " />

      </div>

      <div className="w-100 flex-content col-gap">
        <div className="w-33 ">
          <div className="w-100 col-gap">
            <strong>Reference 1:</strong>
          </div>
          <div className="w-100 text-layout">
            <p className="paragraph-layout">
              {reference1}
            </p>
          </div>
        </div>
        <div className="w-33 ">
          <div className="w-100 col-gap">
            <strong>Reference 1 Email:</strong>
          </div>
          <div className="w-100 ">
            <span >{ref_1_email}</span>
          </div>
        </div>
        <div className="w-33 ">
          <div className="w-100 col-gap">
            <strong>Reference 1 Phone:</strong>
          </div>
          <div className="w-100 ">
            <span >{ref_1_phone}</span>
          </div>
        </div>
      </div>

      <div className="w-100 flex-content col-gap">
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>Reference 2:</strong>
          </div>
          <div className="w-100 text-layout">
            <p className="paragraph-layout">
              {reference2}
            </p>
          </div>
        </div>
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>Reference 2 Email:</strong>
          </div>
          <div className="w-100">
            <span >{ref_2_email}</span>
          </div>
        </div>
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>Reference 2 Phone:</strong>
          </div>
          <div className="w-100">
            <span className="ml-5">{ref_2_phone}</span>
          </div>
        </div>
      </div>

      <div className="w-100 flex-content col-gap">
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>Date of Birth:</strong>
          </div>
          <div className="w-100">
            <span >{date_of_birth === '' ? '' : moment(date_of_birth).format('MM/DD/YYYY')}</span>
          </div>
        </div>
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>Date of Hire:</strong>
          </div>
          <div className="w-100">
            <span >{date_of_hire === '' ? '' : moment(date_of_hire).format('MM/DD/YYYY')}</span>
          </div>
        </div>
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>EEC cert number:</strong>
          </div>
          <div className="w-100">
            <span >{eec_cert_number}</span>
          </div>
        </div>
      </div>

      <div className="w-100 flex-content col-gap">
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>EEC pq reg:</strong>
          </div>
          <div className="w-100">
            <span >{eec_pq_reg}</span>
          </div>
        </div>
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>EEC pq reg date:</strong>
          </div>
          <div className="w-100">
            <span >{eec_pq_reg_date === '' ? '' : moment(eec_pq_reg_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>CORI:</strong>
          </div>
          <div className="w-100">
            <span >{cori}</span>
          </div>
        </div>
      </div>

      <div className="w-100 flex-content col-gap">
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>CORI date:</strong>
          </div>
          <div className="w-100">
            <span >{cori_date === '' ? '' : moment(cori_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>DCF:</strong>
          </div>
          <div className="w-100">
            <span >{dcf}</span>
          </div>
        </div>
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>DCF date:</strong>
          </div>
          <div className="w-100">
            <span >{dcf_date === '' ? '' : moment(dcf_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
      </div>

      <div className="w-100 flex-content col-gap">
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>Physical:</strong>
          </div>
          <div className="w-100">
            <span >{physical}</span>
          </div>
        </div>
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>Physical date:</strong>
          </div>
          <div className="w-100">
            <span >{physical_date === '' ? '' : moment(physical_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>MMR1:</strong>
          </div>
          <div className="w-100 text-layout">
            <p className="paragraph-layout">
              {mmr1}
            </p>
          </div>
        </div>
      </div>

      <div className="w-100 flex-content col-gap">
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>MMR2:</strong>
          </div>
          <div className="w-100 text-layout">
            <p className="paragraph-layout">
              {mmr2}
            </p>
          </div>
          
        </div>
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>First aid:</strong>
          </div>
          <div className="w-100">
            <span >{first_add}</span>
          </div>
        </div>
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>First aid date:</strong>
          </div>
          <div className="w-100">
            <span>{first_add_date === '' ? '' : moment(first_add_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
      </div>

      <div className="w-100 flex-content col-gap">
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>EECorient:</strong>
          </div>
          <div className="w-100">
            <span >{eecorient}</span>
          </div>
        </div>
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>Medical training:</strong>
          </div>
          <div className="w-100">
            <span >{medical_training}</span>
          </div>
        </div>
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>Look before lock:</strong>
          </div>
          <div className="w-100">
            <span>{look_before_lock}</span>
          </div>
        </div>
      </div>

      <div className="w-100 flex-content col-gap">
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>SIDS:</strong>
          </div>
          <div className="w-100">
            <span >{sids}</span>
          </div>
        </div>
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>USDA:</strong>
          </div>
          <div className="w-100">
            <span >{usda}</span>
          </div>
        </div>
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>Prog orientation:</strong>
          </div>
          <div className="w-100">
            <span>{prog_orientation}</span>
          </div>
        </div>
      </div>

      <div className="w-100 flex-content col-gap">
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>Prog orientation date:</strong>
          </div>
          <div className="w-100">
            <span >{prog_orientation_date === '' ? '' : moment(prog_orientation_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>Staff observe:</strong>
          </div>
          <div className="w-100">
            <span >{staff_observe}</span>
          </div>
        </div>
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>Staff evaluation:</strong>
          </div>
          <div className="w-100">
            <span>{staff_evaluation}</span>
          </div>
        </div>
      </div>

      <div className="w-100 flex-content col-gap">
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>Staff evaluation date:</strong>
          </div>
          <div className="w-100">
            <span >{staff_evaluation_date === '' ? '' : moment(staff_evaluation_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>7-Dbus Lic:</strong>
          </div>
          <div className="w-100">
            <span >{dbus_lic}</span>
          </div>
        </div>
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>7-Dbus Lic date:</strong>
          </div>
          <div className="w-100">
            <span>{dbus_lic_date === '' ? '' : moment(dbus_lic_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
      </div>

      <div className="w-100 flex-content col-gap">
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>Program name:</strong>
          </div>
          <div className="w-100">
            <span >{program_name}</span>
          </div>
        </div>
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>Completed by:</strong>
          </div>
          <div className="w-100">
            <span >{completed_by}</span>
          </div>
        </div>
        <div className="w-33">
          <div className="w-100 col-gap">
            <strong>Completed date:</strong>
          </div>
          <div className="w-100">
            <span>{completed_date === '' ? '' : moment(completed_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
      </div>

    </div>
  )
}


function EECTrainingInformation(props) {
  let {  training_info } = props,

  { child_abuse_neglect,
    child_abuse_neglect_date,
    emergency_response_planning,
    emergency_response_planning_date,
    first_aid_cpr_overview,
    first_aid_cpr_overview_date,
    food_related_risk_response,
    food_related_risk_response_date,
    hazardous_materials,
    hazardous_materials_date,
    infant_safe_sleeping_practices,
    infant_safe_sleeping_practices_date,
    infectious_diseases_immunizations,
    infectious_diseases_immunizations_date,
    introduction_child_development,
    introduction_child_development_date,
    medication_administration,
    medication_administration_date,
    physical_premises_safety,
    physical_premises_safety_date,
    shaken_baby_syndrome,
    shaken_baby_syndrome_date,
    transporting_children,
    transporting_children_date,
    total_hours,
    total_hours_date,
  } = training_info;
  return (
      <div className={` view-student-page-print page-break p-r`} >


          <div className="w-100 text-center">
              <h2>LITTLE CHILDREN SCHOOLHOUSE</h2>
          </div>
          <div className="w-100 text-center mt-2rem ">
              <h3>EEC Essentials Training</h3>
          </div>

          <div className="print-border centered-text mt-2rem">
          <div className="w-100 flex-content col-gap ">
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong>Child abuse and Neglect:</strong>
          </div>
          <div className="w-100 text-layout">
            <p className="paragraph-layout">
              {props.showYesNo(child_abuse_neglect)}
            </p>
          </div>
        </div>
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Emergency Response Planning:</strong>
          </div>
          <div className="w-100 ">
            <span >{props.showYesNo(emergency_response_planning)}</span>
          </div>
        </div>
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >First Aid & CPR Overview:</strong>
          </div>
          <div className="w-100 text-layout">
            <p className="paragraph-layout">
              {props.showYesNo(first_aid_cpr_overview)}
            </p>
          </div>
        </div>
      </div>

      <div className="w-100 flex-content col-gap">
      <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Date:</strong>
          </div>
          <div className="w-100 ">
            <span >{child_abuse_neglect_date === '' ? '' : moment(child_abuse_neglect_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Date:</strong>
          </div>
          <div className="w-100 ">
            <span >{emergency_response_planning_date === '' ? '' : moment(emergency_response_planning_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Date:</strong>
          </div>
          <div className="w-100 ">
            <span >{first_aid_cpr_overview_date === '' ? '' : moment(first_aid_cpr_overview_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
      </div>

        <div className="w-100 flex-content col-gap">
      <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong>Food Related Risk and Response:</strong>
          </div>
          <div className="w-100 ">
            <span >{props.showYesNo(food_related_risk_response)}</span>
          </div>
        </div>
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Hazardous Materials:</strong>
          </div>
          <div className="w-100 ">
            <span >{props.showYesNo(hazardous_materials)}</span>
          </div>
        </div>
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Infant Safe Sleeping Practices:</strong>
          </div>
          <div className="w-100 ">
            <span >{props.showYesNo(infant_safe_sleeping_practices)}</span>
          </div>
        </div>
      </div>

      <div className="w-100 flex-content col-gap">
      <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Date:</strong>
          </div>
          <div className="w-100 ">
            <span >{food_related_risk_response_date === '' ? '' : moment(food_related_risk_response_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Date:</strong>
          </div>
          <div className="w-100 ">
            <span >{hazardous_materials_date === '' ? '' : moment(hazardous_materials_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Date:</strong>
          </div>
          <div className="w-100 ">
            <span >{infant_safe_sleeping_practices_date === '' ? '' : moment(infant_safe_sleeping_practices_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
      </div>

      <div className="w-100 flex-content col-gap mt-2rem">
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong>Infectious Diseases and Immunizations:</strong>
          </div>
          <div className="w-100 text-layout">
            <p className="paragraph-layout">
              {props.showYesNo(infectious_diseases_immunizations)}
            </p>
          </div>
        </div>
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Medication Administration:</strong>
          </div>
          <div className="w-100 ">
            <span >{props.showYesNo(medication_administration)}</span>
          </div>
        </div>
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Introduction to Child Development:</strong>
          </div>
          <div className="w-100 text-layout">
            <p className="paragraph-layout">
           { props.showYesNo(introduction_child_development)}
            </p>
          </div>
        </div>
      </div>

      <div className="w-100 flex-content col-gap">
      <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Date:</strong>
          </div>
          <div className="w-100 ">
            <span >{infectious_diseases_immunizations_date === '' ? '' : moment(infectious_diseases_immunizations_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Date:</strong>
          </div>
          <div className="w-100 ">
            <span >{medication_administration_date === '' ? '' : moment(medication_administration_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Date:</strong>
          </div>
          <div className="w-100 ">
            <span >{introduction_child_development_date === '' ? '' : moment(introduction_child_development_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
      </div>

      <div className="w-100 flex-content col-gap mt-2rem">
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong>Physical Premises Safety:</strong>
          </div>
          <div className="w-100 text-layout">
            <p className="paragraph-layout">
              {props.showYesNo(physical_premises_safety)}
            </p>
          </div>
        </div>
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Shaken Baby Syndrome:</strong>
          </div>
          <div className="w-100 ">
            <span >{props.showYesNo(shaken_baby_syndrome)}</span>
          </div>
        </div>
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Transporting Children:</strong>
          </div>
          <div className="w-100 text-layout">
            <p className="paragraph-layout">
           {props.showYesNo(transporting_children)}
            </p>
          </div>
        </div>
      </div>

      <div className="w-100 flex-content col-gap">
      <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Date:</strong>
          </div>
          <div className="w-100 ">
            <span >{physical_premises_safety_date === '' ? '' : moment(physical_premises_safety_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Date:</strong>
          </div>
          <div className="w-100 ">
            <span >{shaken_baby_syndrome_date === '' ? '' : moment(shaken_baby_syndrome_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Date:</strong>
          </div>
          <div className="w-100 ">
            <span >{transporting_children_date === '' ? '' : moment(transporting_children_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
      </div>

      <div className="w-100 flex-content col-gap">
      <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong>Total Hours:</strong>
          </div>
          <div className="w-100 "> 
          <span className="ml-5">{props.showYesNo(total_hours)}</span>
          </div>
        </div>
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Date:</strong>
          </div>
          <div className="w-100 ">
            <span >{total_hours_date === '' ? '' : moment(total_hours_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
        <div className="w-33 " />
         
      </div>
          </div>

 

      </div>

  )
}


function EECYearlyRenewal (props){
  let {  training_info } = props,

  { 
    eec_yearly_renewal,
    eec_yearly_renewal_date,
    eec_child_abuse_neglect,
    eec_child_abuse_neglect_date,
    eec_emergency_response_planning,
    eec_emergency_response_planning_date,
    eec_food_related_risk_response,
    eec_food_related_risk_response_date,
    eec_infectious_diseases_immunizations,
    eec_infectious_diseases_immunizations_date,
    eec_medication_administration,
    eec_medication_administration_date,
    eec_transporting_children,
    eec_transporting_children_date,
    eec_infant_safe_sleeping_practices,
    eec_infant_safe_sleeping_practices_date,
    eec_shaken_baby_syndrome,
    eec_shaken_baby_syndrome_date 
  } = training_info;


  return(
    <div className={` view-student-page-print page-break p-r`}>
<div className="w-100 text-center">
              <h2>LITTLE CHILDREN SCHOOLHOUSE</h2>
          </div>
          <div className="w-100 text-center mt-2rem ">
              <h3>EEC Yearly Renewal</h3>
          </div>

          <div className="print-border centered-text mt-2rem">

          <div className="w-100 flex-content col-gap ">
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong>EEC Yearly Renewal:</strong>
          </div>
          <div className="w-100 text-layout">
            <p className="paragraph-layout">
              {props.showYesNo(eec_yearly_renewal)}
            </p>
          </div>
        </div>
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Child Abuse and Neglect:</strong>
          </div>
          <div className="w-100 ">
            <span >{props.showYesNo(eec_child_abuse_neglect)}</span>
          </div>
        </div>
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Emergency Response Planning:</strong>
          </div>
          <div className="w-100 text-layout">
            <p className="paragraph-layout">
           {props.showYesNo(eec_emergency_response_planning)}
            </p>
          </div>
        </div>
      </div>

      <div className="w-100 flex-content col-gap">
      <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Date:</strong>
          </div>
          <div className="w-100 ">
            <span >{eec_yearly_renewal_date === '' ? '' : moment(eec_yearly_renewal_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Date:</strong>
          </div>
          <div className="w-100 ">
            <span >{eec_child_abuse_neglect_date === '' ? '' : moment(eec_child_abuse_neglect_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Date:</strong>
          </div>
          <div className="w-100 ">
            <span >{eec_emergency_response_planning_date === '' ? '' : moment(eec_emergency_response_planning_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
      </div>


      <div className="w-100 flex-content col-gap ">
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong>Food Related Risk and Response:</strong>
          </div>
          <div className="w-100 text-layout">
            <p className="paragraph-layout">
              {props.showYesNo(eec_food_related_risk_response)}
            </p>
          </div>
        </div>
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Infectious Diseases and Immunizations:</strong>
          </div>
          <div className="w-100 ">
            <span >{props.showYesNo(eec_infectious_diseases_immunizations)}</span>
          </div>
        </div>
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Medication Administration:</strong>
          </div>
          <div className="w-100 text-layout">
            <p className="paragraph-layout">
           {props.showYesNo(eec_medication_administration)}
            </p>
          </div>
        </div>
      </div>

      <div className="w-100 flex-content col-gap">
      <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Date:</strong>
          </div>
          <div className="w-100 ">
            <span >{eec_food_related_risk_response_date === '' ? '' : moment(eec_food_related_risk_response_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Date:</strong>
          </div>
          <div className="w-100 ">
            <span >{eec_infectious_diseases_immunizations_date === '' ? '' : moment(eec_infectious_diseases_immunizations_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Date:</strong>
          </div>
          <div className="w-100 ">
            <span >{eec_medication_administration_date === '' ? '' : moment(eec_medication_administration_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
      </div>

      <div className="w-100 flex-content col-gap ">
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong>Transporting Children:</strong>
          </div>
          <div className="w-100 text-layout">
            <p className="paragraph-layout">
              {props.showYesNo(eec_transporting_children)}
            </p>
          </div>
        </div>
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Infant Safe Sleeping Practices:</strong>
          </div>
          <div className="w-100 ">
            <span >{props.showYesNo(eec_infant_safe_sleeping_practices)}</span>
          </div>
        </div>
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Shaken Baby Syndrome:</strong>
          </div>
          <div className="w-100 text-layout">
            <p className="paragraph-layout">
           {props.showYesNo(eec_shaken_baby_syndrome)}
            </p>
          </div>
        </div>
      </div>

      <div className="w-100 flex-content col-gap">
      <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Date:</strong>
          </div>
          <div className="w-100 ">
            <span >{eec_transporting_children_date === '' ? '' : moment(eec_transporting_children_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Date:</strong>
          </div>
          <div className="w-100 ">
            <span >{eec_infant_safe_sleeping_practices_date === '' ? '' : moment(eec_infant_safe_sleeping_practices_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
        <div className="w-33 ">
          <div className="w-100 col-gap">
          <strong >Date:</strong>
          </div>
          <div className="w-100 ">
            <span >{eec_shaken_baby_syndrome_date === '' ? '' : moment(eec_shaken_baby_syndrome_date).format('MM/DD/YYYY')}</span>
          </div>
        </div>
      </div>

          </div>
          
         
    </div>
  )

}
