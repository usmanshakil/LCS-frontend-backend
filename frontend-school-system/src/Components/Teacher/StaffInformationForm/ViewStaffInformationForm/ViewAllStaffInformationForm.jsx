import React from 'react'
import { Grid, Header } from 'semantic-ui-react';
import moment from 'moment';
// css
import './ViewAllStaffInformationForm.css';

export function ViewAllStaffInformationForm(props) {
    let { allformData, loginUserInfo } = props;
    return (
        <div >
            <div className={`ui container ${allformData.length ? `theme-${loginUserInfo.role_id}-border` : ''} main-layout-height mt-2rem`} >
                {allformData.length ?
                    <div className="mt-2rem view-student-page-print">
                        <Grid>
                        <Grid.Row>
                            {/* <Grid.Column tablet={1} computer={2} /> */}
                            <Grid.Column mobile={9} tablet={5} computer={5}>
                            <Header as='h2'>Teacher Information</Header>
                            </Grid.Column>
                            <Grid.Column mobile={6} tablet={5} computer={5} >
                                {allformData.length ? allformData[0].staff_handbook_waiver_details.length ?
                                    <button className="ui button" onClick={() => props._redirectToStaffHiringForm('editForm', 'staffBasicInfo', 'staff_hiring_form_detail')}>Edit Profile</button>
                                    : '' : ''}
                            </Grid.Column>
                            {/* <Grid.Column tablet={3} computer={2} /> */}
                        </Grid.Row>
                    </Grid>
                    </div>
                    : <div>
                        <div className="w-100 text-center mt-10rem">
                            <h2>No Entries Found.</h2>
                        </div>
                        <div className="w-100 text-center mt-2rem">
                            {loginUserInfo.role_id === 2 ? '' : <button className="ui icon left labeled button" onClick={() => props._redirectToStaffHiringForm('addForm', 'staffBasicInfo')}>
                                <i aria-hidden="true" className="file icon" />
    Fill Staff Information Form
  </button>}

                        </div>
                    </div>}
                {allformData.length ? <StaffBasicInformation {...props} /> : ''}
                {allformData.length ? <AdministrativeAndTeachingStaff {...props} /> : ''}
                {allformData.length ? <Education {...props} /> : ''}
                {allformData.length ? allformData[0].staff_personal_reference_details.length ? loginUserInfo.role_id === 4 ? '' : <PersonalReference {...props} /> : <PersonalReference {...props} /> : ''}
                {allformData.length ? allformData[0].staff_professional_reference_details.length ? loginUserInfo.role_id === 4 ? '' : <ProfessionalReference {...props} /> : <ProfessionalReference {...props} /> : ''}
                {allformData.length ? allformData[0].staff_references_details.length ? loginUserInfo.role_id === 4 ? '' : <Reference {...props} /> : <Reference {...props} /> : ''}
                {allformData.length ? <ComplainceWithCori {...props} /> : ''}
                {allformData.length ? <StaffEmergencyForm {...props} /> : ''}
                {allformData.length ? <StaffHandbookWaiver {...props} /> : ''}
            </div>
        </div>
    )
}

// function findProfessionalRating(status) {
//     switch (status) {
//         case 'good':
//             return 'Good'
//         case 'challengingAtTimes':
//             return 'Challenging at times'
//         case 'great':
//             return 'Great'
//         case 'notWell':
//             return 'Not Well'
//         default:
//             return ''
//     }
// }

function StaffBasicInformation(props) {
    let { allformData, showFullSsn } = props,
        { program_name,
            name,
            date_of_birth,
            address,
            telephone_number,
            date_of_hire,
            social_security_number,
            current_position,
            supervisor_name } = allformData[0];


    return (
        <div >
            <div className={`mt-2rem view-student-page-print p-r`} >
                <Grid>
                    <Grid.Row>
                        <Grid.Column computer={5} tablet={5}>
                            <div className="w-100">
                                <h4>Basic information</h4>
                            </div>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={11}>
                            {/* {loginUserInfo.role_id===2?'':<button className="ui icon left labeled button right floated" onClick={() => props._redirectToStaffHiringForm('editForm', 'staffBasicInfo')}>
                                <i aria-hidden="true" className="edit outline icon" /> Edit </button>} */}
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16} />
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong> Program Name:</strong> <span className="ml-5">{program_name}</span>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Name:</strong> <span className="ml-5">{name}</span>
                        </Grid.Column> <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Date of birth:</strong> <span className="ml-5">{moment(date_of_birth).format('MM/DD/YYYY')}</span>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Address:</strong> <span className="ml-5">{address}</span>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Telephone number:</strong> <span className="ml-5">{telephone_number}</span>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Date of Hire:</strong> <span className="ml-5">{moment(date_of_hire).format('MM/DD/YYYY')}</span>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>SSN:</strong> <span className="ml-5">{showFullSsn ? social_security_number : social_security_number.replace(/.(?=.{4})/g, 'x')}</span>
                            {social_security_number ? <span className="ml-5"><i aria-hidden="true" className={`${showFullSsn ? 'eye slash icon' : 'eye icon'}`} onClick={(event) => props._toggleSSNNumber(event, 'showFullSsn')} /></span> : ''}
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Current position:</strong> <span className="ml-5">{current_position}</span>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Supervisor name:</strong> <span className="ml-5">{supervisor_name}</span>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>


        </div>
    )
}

function AdministrativeAndTeachingStaff(props) {
    let { allformData, loginUserInfo } = props,
        { staff_administrative_teaching_staff_details, user } = allformData[0],
        { infants,
            infants_toddlers,
            toddlers,
            toddlers_pre_school,
            pre_school,
            pre_school_sa,
            school_age,
            kindergarten_sa,
            multi_age_group,
            child_care_services_certificate,
            list_any_licenses_certifications,
            date_of_eec_professional_registry,
            date_of_eec_educator_orientation,
            createdAt
        } = staff_administrative_teaching_staff_details.length ? staff_administrative_teaching_staff_details[0] : '';
    return (
        <div>
            <div className={`mt-2rem view-student-page-print p-r`} >
                <Grid>
                    <Grid.Row>
                        <Grid.Column computer={5} tablet={5} mobile={staff_administrative_teaching_staff_details.length ? 8 : 16}>
                            <h4>Administrative and teaching staff:</h4>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={staff_administrative_teaching_staff_details.length ? 8 : 16}>
                            {loginUserInfo.role_id === 2 ? '' : staff_administrative_teaching_staff_details.length ?
                                '' : <button className={`ui icon left labeled button right floated ${staff_administrative_teaching_staff_details.length ? '' : 'print-btn-mobile fluid'}`} onClick={() => props._redirectToStaffHiringForm('addForm', 'administartionAndStaff', 'staff_administrative_teaching_staff_detail')}>
                                    <i aria-hidden="true" className="file icon" />
                                    Fill Administrative and teaching form  </button>}
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16} />
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong> Infant (birth - 15 mos.):</strong> <span className="ml-5">{infants}</span>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Infant / Toddler (birth - 2 yrs. 9 mos.):</strong> <span className="ml-5">{infants_toddlers}</span>
                        </Grid.Column> <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Toddler (15 mos. - 33 mos.):</strong> <span className="ml-5">{toddlers}</span>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Toddler / Preschool (15 mos. - K.):</strong> <span className="ml-5">{toddlers_pre_school}</span>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Preschool (2 yrs. 9 mos. - K.):</strong> <span className="ml-5">{pre_school}</span>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Preschool / SA (2 yrs. 9 mos. - 9 yrs.):</strong> <span className="ml-5">{pre_school_sa}</span>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>School Age (5 yrs. - 14 yrs.):</strong> <span className="ml-5">{school_age}</span>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Kindergarten / SA (5 yrs. - 14 yrs.):</strong> <span className="ml-5">{kindergarten_sa}</span>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Multi-Age Group (birth -14 yrs.):</strong> <span className="ml-5">{multi_age_group}</span>
                        </Grid.Column>
                    </Grid.Row>
                    {child_care_services_certificate === '' ? '' : <Grid.Row>
                        <Grid.Column computer={16} tablet={16} mobile={16}>
                            <strong>Do you have a Department of Early Education and Care or Office of Child Care Services Certificate of Qualifications?:</strong> <span className="ml-5">{child_care_services_certificate}</span>
                        </Grid.Column>
                    </Grid.Row>}

                    {list_any_licenses_certifications === '' ? '' : <Grid.Row>
                        <Grid.Column computer={16} tablet={16} mobile={16}>
                            <strong>Please list any licenses, certifications, or registrations you have (i.e. teacher certification, social worker’s license, etc.)
:</strong> <span className="ml-5">{list_any_licenses_certifications}</span>
                        </Grid.Column>
                    </Grid.Row>}

                    <Grid.Row>

                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Date of EEC Professional Registry
:</strong> <span className="ml-5">{date_of_eec_professional_registry ? moment(date_of_eec_professional_registry).format('MM/DD/YYYY') : ''}</span>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Date of EEC Educator Orientation (if applicable)
:</strong> <span className="ml-5">{date_of_eec_educator_orientation ? moment(date_of_eec_educator_orientation).format('MM/DD/YYYY') : ''}</span>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                        </Grid.Column>
                    </Grid.Row>
                    {
                        staff_administrative_teaching_staff_details.length ? staff_administrative_teaching_staff_details[0].signature === '' ? '' : <Grid.Row>
                            <Grid.Column computer={16} tablet={16} mobile={16}>
                                {/* <strong>Current position:</strong> */}
                                <strong>Signature:</strong>
                                <div className={`w-100 theme-${loginUserInfo.role_id}-border mt-10`} >
                                    <img src={`${user.signature}`} alt='user-signature' className="view-signature-image" />
                                </div>
                            </Grid.Column>
                        </Grid.Row> : ''
                    }
                    <Grid.Row>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Date</strong>
                            <span className="ml-5">{createdAt ? moment(createdAt).format('MM/DD/YYYY') : ''} </span>
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
            </div>


        </div>
    )
}

function Education(props) {
    let { allformData,
         loginUserInfo
        //  ,showFullSsnNumber
         } = props,
        { staff_administrative_teaching_staff_details,
            staff_education_details,
        } = allformData[0],
        {
            position_applied_for,
            name,
            address,
            email_address,
            city,
            zip_code,
            // ssn,
            high_school,
            collage_attended_degree,
            other_courses_workshops_attended,
        } = staff_education_details.length ? staff_education_details[0] : '';
    return (
        <div>
            <div className={`mt-2rem view-student-page-print p-r`} >
                <Grid>
                    <Grid.Row>
                        <Grid.Column computer={5} tablet={5} mobile={staff_education_details.length ? 8 : 16}>
                            <h4>Education:</h4>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={staff_education_details.length ? 8 : 16}>
                            {loginUserInfo.role_id === 2 ? '' : staff_education_details.length ? '' : <button className={`ui icon left labeled button right floated ${staff_education_details.length ? '' : 'print-btn-mobile fluid'}`} onClick={() => props._redirectToStaffHiringForm('addForm', 'education', 'staff_education_detail')} disabled={staff_administrative_teaching_staff_details.length ? false : true}>
                                <i aria-hidden="true" className="file icon" />
    Fill Education Form
  </button>}
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16} />
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong> Position Applied for :</strong> <span className="ml-5">{position_applied_for}</span>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Name:</strong> <span className="ml-5">{name}</span>
                        </Grid.Column> <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Address:</strong> <span className="ml-5">{address}</span>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Email Address:</strong> <span className="ml-5">{email_address}</span>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>City:</strong> <span className="ml-5">{city}</span>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Zip:</strong> <span className="ml-5">{zip_code}</span>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        {/* <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>SSN:</strong> <span className="ml-5">{ssn ? showFullSsnNumber ? ssn : ssn.replace(/.(?=.{4})/g, 'x') : ''}</span>
                            {ssn ? <span className="ml-5"><i aria-hidden="true" className={`${showFullSsnNumber ? 'eye slash icon' : 'eye icon'}`} onClick={(event) => props._toggleSSNNumber(event, 'showFullSsnNumber')} /></span> : ''}
                        </Grid.Column> */}
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>High school (s) attended :</strong> <span className="ml-5">{high_school}</span>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>College(s) attended / degree:</strong> <span className="ml-5">{collage_attended_degree}</span>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={16} tablet={16} mobile={16}>
                            <strong>Other related courses / workshops attended :</strong> <span className="ml-5">{other_courses_workshops_attended}</span>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        </div>
    )
}

function PersonalReference(props) {
    let { allformData, loginUserInfo } = props,
        { staff_education_details,
            staff_personal_reference_details
        } = allformData[0],
        {
            reference_name,
            // title_relationship,
            // individual_relation_age,
            // comments_on_character,
            // weakness,
            // strength,
            // reliable,
            // patient,
            // compassionate
        } = staff_personal_reference_details.length ? staff_personal_reference_details[0] : '';
    return (
        <div>
            <div className={`mt-2rem view-student-page-print p-r`} >
                <Grid>
                    <Grid.Row>
                        <Grid.Column computer={5} tablet={5} mobile={staff_personal_reference_details.length ? 8 : 16}>
                            <h4>Personal Reference:</h4>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={staff_personal_reference_details.length ? 8 : 16}>
                            {loginUserInfo.role_id === 2 ? '' : staff_personal_reference_details.length ? '' : <button className={`ui icon left labeled button right floated ${staff_personal_reference_details.length ? '' : 'print-btn-mobile fluid'}`} onClick={() => props._redirectToStaffHiringForm('addForm', 'personalReference', 'staff_personal_reference_detail')} disabled={staff_education_details.length ? false : true}>
                                <i aria-hidden="true" className="file icon" />
    Fill Personal reference Form
  </button>}
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16} />

                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong> Reference Name:</strong> <span className="ml-5">{reference_name}</span>
                        </Grid.Column>
                        {/* <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Title/Relationship to potential employee:</strong> <span className="ml-5">{title_relationship}</span>
                        </Grid.Column> <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>How long did this employee work for your organization:</strong> <span className="ml-5">{individual_relation_age}</span>
                        </Grid.Column> */}
                    </Grid.Row>
                    {/* <Grid.Row>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Comments on their character:</strong> <span className="ml-5">{comments_on_character}</span>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>What is their weakness:</strong> <span className="ml-5">{weakness}</span>
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={4} mobile={16}>
                            <strong>What is their strength:</strong> <span className="ml-5">{strength}</span>
                        </Grid.Column>                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={16} tablet={16} mobile={16}>
                            <strong>In your experience with this individual, have you found him/her to be:  </strong>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={4} tablet={4} mobile={16}>
                            <strong>Reliable:</strong> <span className="ml-5">{reliable}</span>
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={4} mobile={16}>
                            <strong>Patient:</strong> <span className="ml-5">{patient}</span>
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={4} mobile={16}>
                            <strong>Compassionate:</strong> <span className="ml-5">{compassionate}</span>
                        </Grid.Column>

                    </Grid.Row> */}

                </Grid>
            </div>


        </div>
    )
}

function ProfessionalReference(props) {
    let { allformData, loginUserInfo } = props,
        {
            staff_personal_reference_details,
            staff_professional_reference_details
        } = allformData[0],
        {
            reference_name,
            // title_relationship,
            // employee_experiece_organization,
            // punctuality,
            // attendance,
            // coworkers,
            // supervisors,
            // parents,
            // children,
            // will_employee_hired_again,
        } = staff_professional_reference_details.length ? staff_professional_reference_details[0] : '';
    return (
        <div>
            <div className={`mt-2rem view-student-page-print p-r`}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column computer={5} tablet={5} mobile={staff_professional_reference_details.length ? 8 : 16}>
                            <h4>Professional Reference:</h4>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={staff_professional_reference_details.length ? 8 : 16}>
                            {loginUserInfo.role_id === 2 ? '' : staff_professional_reference_details.length ? '' : <button className={`ui icon left labeled button right floated ${staff_professional_reference_details.length ? '' : 'print-btn-mobile fluid'}`} onClick={() => props._redirectToStaffHiringForm('addForm', 'professionalRefernce', 'staff_professional_reference_detail')} disabled={staff_personal_reference_details.length ? false : true}><i aria-hidden="true" className="file icon" />Fill Professional reference Form</button>}
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16} />
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong> Reference Name:</strong> <span className="ml-5">{reference_name}</span>
                        </Grid.Column>
                        {/* <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Title/Relationship to potential employee:</strong> <span className="ml-5">{title_relationship}</span>
                        </Grid.Column> <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>How long did this employee work for your organization:</strong> <span className="ml-5">{employee_experiece_organization}</span>
                        </Grid.Column> */}
                    </Grid.Row>
                    {/* <Grid.Row>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Punctuality:</strong> <span className="ml-5">{findProfessionalRating(punctuality)}</span>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Attendance:</strong> <span className="ml-5">{findProfessionalRating(attendance)}</span>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16} />
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={16} tablet={16} mobile={16}>
                            <strong>How did the employee get along with</strong>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={4} tablet={4} mobile={16}>
                            <strong>Coworkers:</strong> <span className="ml-5">{findProfessionalRating(coworkers)}</span>
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={4} mobile={16}>
                            <strong>Supervisors:</strong> <span className="ml-5">{findProfessionalRating(supervisors)}</span>
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={4} mobile={16}>
                            <strong>Parents:</strong> <span className="ml-5">{findProfessionalRating(parents)}</span>
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={4} mobile={16}>
                            <strong>Children:</strong> <span className="ml-5">{findProfessionalRating(children)}</span>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Would you hire this employee again:</strong> <span className="ml-5">{will_employee_hired_again}</span>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} />
                        <Grid.Column computer={5} tablet={5} mobile={16} />
                    </Grid.Row> */}
                </Grid>
            </div>
        </div>
    )
}

function ComplainceWithCori(props) {
    let { allformData, loginUserInfo } = props,
        {
            staff_administrative_teaching_staff_details,
        } = allformData.length ? allformData[0] : '',
        signature = allformData.length ? allformData[0].user.signature : '',
        createdAt = allformData.length ? staff_administrative_teaching_staff_details.length ? moment(staff_administrative_teaching_staff_details[0].createdAt).format('MM/DD/YYYY') : '' : '';
    return (
        <div className="mt-2rem">
            <div className={`view-student-page-print p-r`} >
                <Grid>
                    <Grid.Row>
                        <Grid.Column computer={5} tablet={5} mobile={loginUserInfo.role_id === 2 ? 16 : 8}>
                            <h4>STATEMENT OF COMPLIANCE WITH CORI</h4>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} />
                        <Grid.Column computer={5} tablet={5} />
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={16} tablet={16} mobile={16}>
                            <strong>TO BE COMPLETED BY APPLICANT/LICENSEE (EMPLOYER) AND PLACED IN EMPLEYEE’S PERSONNEL FILE</strong>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={16} tablet={16} mobile={16}>
                            <strong>NAME OF PROGRAM: </strong>
                            <span className="ml-5">{allformData.length ? allformData[0].program_name : ''}</span>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={16} tablet={16} mobile={16}>
                            <strong>THIS IS TO CERTIGY THAT I HAVE COMPLIED WITH OCCS REGULATION 102 CMR 1.05(2)</strong>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={16} tablet={16} mobile={16}>
                            <strong>Name of Employee: </strong>
                            <span className="ml-5">{allformData.length ? allformData[0].name : ''}</span>
                        </Grid.Column>
                    </Grid.Row>
                    {
                        signature === '' ? '' : <Grid.Row>
                            <Grid.Column computer={16} tablet={16} mobile={16}>
                                <strong>Signature:</strong>
                                <div className={`w-100 theme-${loginUserInfo.role_id}-border mt-10`} >
                                    <img src={`${signature}`} alt='user-signature' className="view-signature-image" />
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    }
                    {createdAt === '' ? '' : <Grid.Row>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Date</strong>
                            <span className="ml-5">{createdAt} </span>
                        </Grid.Column>
                    </Grid.Row>}
                </Grid>
            </div>
        </div>
    )
}

function Reference(props) {
    let { allformData, loginUserInfo } = props,
        {
            staff_professional_reference_details,
            staff_references_details
        } = allformData[0];
    return (
        <div className="mt-2rem">
            <div className={`view-student-page-print p-r`} >
                <Grid>
                    <Grid.Row>
                        <Grid.Column computer={5} tablet={5} mobile={staff_references_details.length ? 8 : 16}>
                            <h4>REFERENCES</h4>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={staff_references_details.length ? 8 : 16}>
                            {loginUserInfo.role_id === 2 ? '' :
                                staff_references_details.length ? '' :
                                    <button className={`ui icon left labeled button right floated ${staff_references_details.length ? '' : 'print-btn-mobile fluid'}`} onClick={() => props._redirectToStaffHiringForm('addForm', 'reference', 'staff_references_detail')} disabled={staff_professional_reference_details.length ? false : true}>
                                        <i aria-hidden="true" className="file icon" />Fill Reference Form</button>
                            }

                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16} />
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={4} tablet={4} mobile={16}>
                            <strong>Name</strong>
                            <span className="ml-5">{staff_references_details.length ? staff_references_details[0].ref_name : ''} </span>
                        </Grid.Column> <Grid.Column computer={4} tablet={4} mobile={16}>
                            <strong>Relationship</strong>
                            <span className="ml-5">{staff_references_details.length ? staff_references_details[0].ref_relationship : ''} </span>
                        </Grid.Column> <Grid.Column computer={4} tablet={4} mobile={16}>
                            <strong>Address</strong>
                            <span className="ml-5">{staff_references_details.length ? staff_references_details[0].ref_address : ''} </span>
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={4} mobile={16}>
                            <strong>Phone</strong>
                            <span className="ml-5">{staff_references_details.length ? staff_references_details[0].ref_phone : ''} </span>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={4} tablet={4} mobile={16}>
                            <strong>Name</strong>
                            <span className="ml-5">{staff_references_details.length ? staff_references_details[1].ref_name : ''} </span>
                        </Grid.Column> <Grid.Column computer={4} tablet={4} mobile={16}>
                            <strong>Relationship</strong>
                            <span className="ml-5">{staff_references_details.length ? staff_references_details[1].ref_relationship : ''} </span>
                        </Grid.Column> <Grid.Column computer={4} tablet={4} mobile={16}>
                            <strong>Address</strong>
                            <span className="ml-5">{staff_references_details.length ? staff_references_details[1].ref_address : ''} </span>
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={4} mobile={16}>
                            <strong>Phone</strong>
                            <span className="ml-5">{staff_references_details.length ? staff_references_details[1].ref_phone : ''} </span>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={4} tablet={4} mobile={16}>
                            <strong>Name</strong>
                            <span className="ml-5">{staff_references_details.length ? staff_references_details[2].ref_name : ''} </span>
                        </Grid.Column> <Grid.Column computer={4} tablet={4} mobile={16}>
                            <strong>Relationship</strong>
                            <span className="ml-5">{staff_references_details.length ? staff_references_details[2].ref_relationship : ''} </span>
                        </Grid.Column> <Grid.Column computer={4} tablet={4} mobile={16}>
                            <strong>Address</strong>
                            <span className="ml-5">{staff_references_details.length ? staff_references_details[2].ref_address : ''} </span>
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={4} mobile={16}>
                            <strong>Phone</strong>
                            <span className="ml-5">{staff_references_details.length ? staff_references_details[2].ref_phone : ''} </span>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        </div>
    )
}

function StaffEmergencyForm(props) {

    let { allformData, loginUserInfo } = props,
        {
            staff_references_details,
            staff_emergency_details } = allformData[0],
        { name,
            address,
            state,
            city,
            zip_code,
            home_phone,
            allergies,
            other_cell_phone,
            first_emergency_name,
            first_emergency_home_phone,
            first_emergency_phone,
            first_emergency_relationship_to_you,
            second_emergency_name,
            second_emergency_home_phone,
            second_emergency_phone,
            second_emergency_relationship_to_you,
            third_emergency_name,
            third_emergency_home_phone,
            third_emergency_phone,
            third_emergency_relationship_to_you } = staff_emergency_details.length ? staff_emergency_details[0] : '';
    return (
        <div className="mt-2rem">
            <div className={`view-student-page-print p-r`}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column computer={5} tablet={5} mobile={staff_emergency_details.length ? 8 : 16}>
                            <h4>STAFF EMERGENCY FORM</h4>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={staff_emergency_details.length ? 8 : 16}>
                            {loginUserInfo.role_id === 2 ? '' : staff_emergency_details.length ? '' :
                                <button className={`ui icon left labeled button right floated ${staff_emergency_details.length ? '' : 'print-btn-mobile fluid'}`} onClick={() => props._redirectToStaffHiringForm('addForm', 'staffEmergencyForm', 'staff_emergency_detail')} disabled={staff_references_details.length ? false : true}>
                                    <i aria-hidden="true" className="file icon" />
                        Fill Staff emergency form
                      </button>
                            }
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16} />
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Name</strong>
                            <span className="ml-5">{name} </span>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Address</strong>
                            <span className="ml-5">{address} </span>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>State</strong>
                            <span className="ml-5">{state} </span>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>City</strong>
                            <span className="ml-5">{city} </span>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Zip Code</strong>
                            <span className="ml-5">{zip_code} </span>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Home phone </strong>
                            <span className="ml-5">{home_phone} </span>
                        </Grid.Column>
                    </Grid.Row> <Grid.Row>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Other (Cell)</strong>
                            <span className="ml-5">{other_cell_phone} </span>
                        </Grid.Column>
                        <Grid.Column computer={11} tablet={11} mobile={16}>
                            <strong>Allergies (i.e. medication, food, etc) </strong>
                            <span className="ml-5">{allergies} </span>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={16} tablet={16} mobile={16}>
                            <strong>Persons authorized to call in an emergency:</strong>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={4} tablet={4} mobile={16}>
                            <strong>Name</strong>
                            <span className="ml-5">{first_emergency_name} </span>
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={4} mobile={16}>
                            <strong>Home phone # </strong>
                            <span className="ml-5">{first_emergency_home_phone} </span>
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={4} mobile={16}>
                            <strong>Work phone # </strong>
                            <span className="ml-5">{first_emergency_phone} </span>
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={4} mobile={16}>
                            <strong>Relationship to you </strong>
                            <span className="ml-5">{first_emergency_relationship_to_you} </span>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={4} tablet={4} mobile={16}>
                            <strong>Name</strong>
                            <span className="ml-5">{second_emergency_name} </span>
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={4} mobile={16}>
                            <strong>Home phone # </strong>
                            <span className="ml-5">{second_emergency_home_phone} </span>
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={4} mobile={16}>
                            <strong>Work phone # </strong>
                            <span className="ml-5">{second_emergency_phone} </span>
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={4} mobile={16}>
                            <strong>Relationship to you </strong>
                            <span className="ml-5">{second_emergency_relationship_to_you} </span>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={4} tablet={4} mobile={16}>
                            <strong>Name</strong>
                            <span className="ml-5">{third_emergency_name} </span>
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={4} mobile={16}>
                            <strong>Home phone # </strong>
                            <span className="ml-5">{third_emergency_home_phone} </span>
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={4} mobile={16}>
                            <strong>Work phone # </strong>
                            <span className="ml-5">{third_emergency_phone} </span>
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={4} mobile={16}>
                            <strong>Relationship to you </strong>
                            <span className="ml-5">{third_emergency_relationship_to_you} </span>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        </div>
    )
}

function StaffHandbookWaiver(props) {
    let { allformData, loginUserInfo } = props,
        {
            staff_handbook_waiver_details,
            staff_emergency_details,
            user
        } = allformData[0],
        {
            // has_employee_agreed,
            createdAt
        } = staff_handbook_waiver_details.length ? staff_handbook_waiver_details[0] : '';
    return (
        <div className="mt-2rem">
            <div className={`view-student-page-print p-r`} >
                <Grid>
                    <Grid.Row>
                        <Grid.Column computer={5} tablet={5} mobile={staff_handbook_waiver_details.length ? 8 : 16}>
                            <h4>Staff Handbook Waiver:</h4>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={staff_handbook_waiver_details.length ? 8 : 16}>
                            {loginUserInfo.role_id === 2 ? '' : staff_handbook_waiver_details.length ? '' : <button className={`ui icon left labeled button right floated ${staff_handbook_waiver_details.length ? '' : 'print-btn-mobile fluid'}`} onClick={() => props._redirectToStaffHiringForm('addForm', 'staffAgreement', 'staff_handbook_waiver_detail')} disabled={staff_emergency_details.length ? false : true}><i aria-hidden="true" className="file icon" />Fill Staff handbook waiver Form</button>}
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16} />
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={16} tablet={16} mobile={16}>
                            <strong>I have received and read the Little Children Schoolhouse Childcare Handbook.

                            In consideration of the Little Children Schoolhouse Inc. employer, hiring me as an employee, I agree that I will not disclose or use at any time, expect as part of my employment with the employer, any confidential information relating to the business of employ. This includes, but is not limited to, employer’s sales and profit figures, students/family list, relationship with contractors, customers or suppliers and opportunities for new or developing business. I acknowledge the unique and confidential nature of this information and the irreparable harm that will be caused to employer if I violate this agreement. Disclosure of such information may terminate my employment with Little Children Schoolhouse.
</strong>
                            {/* <span className="ml-5">{infants}</span> */}
                        </Grid.Column>
                    </Grid.Row>
                    {
                        staff_handbook_waiver_details.length ? staff_handbook_waiver_details[0].signature === '' ? '' : <Grid.Row>
                            <Grid.Column computer={16} tablet={16} mobile={16}>
                                <strong>Signature:</strong>
                                <div className={`w-100 theme-${loginUserInfo.role_id}-border mt-10`} >
                                    <img src={`${user.signature}`} alt='user-signature' className="view-signature-image" />
                                </div>
                            </Grid.Column>
                        </Grid.Row> : ''
                    }
                    <Grid.Row>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <strong>Date</strong>
                            <span className="ml-5">{moment(createdAt).format('MM/DD/YYYY')} </span>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        </div>
    )
}