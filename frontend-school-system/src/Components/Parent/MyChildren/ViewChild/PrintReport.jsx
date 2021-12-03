import React from 'react';
import { Grid } from 'semantic-ui-react';
import moment from 'moment';
// css
import './ViewChild.css';
import './print.css';

function hasTrue(value) {
    return value === true || value === 1 ? "Yes" : "No"
}


export function PrintReport(props) {
    let { first_name,
        last_name,
        birth_date,
        birth_place,
        admission_date,
        address,
        city,
        state,
        zip_code,
        user,
        parentInfo,
        medicalInfo,
        emergencyInfo,
        devReport,
        healthReport,
        eatingHabitReport,
        toiletHabitReport,
        sleepingHabitReport,
        socialRelationshipReport,
        dailyScheduleReport,
        photoRelease,
        localTripPermission,
        parentAgreement,
        authorizationAndConsent,
        sunscreenPermission,
        toothBrushingInformation,
        transportAuthority,
        schoolDirectory
    } = props.childAllInfo[0],
        { role_id } = props.loginUserInfo;

    return (
        <div className={`ui container main-layout-height mt-5rem view-student-page-print  p-r  hide-print`} ref={props.letRef} id="childReport">
            <div className={`view-student-page-print  p-r`} >

                <div className="width-100 text-center ">
                    <h1>LITTLE CHILDREN SCHOOLHOUSE</h1>
                </div>


                <div className="ui grid">
                    <div className="row">
                        <div className="five wide computer sixteen wide mobile five wide tablet column">
                            <h2>Details</h2>
                        </div>
                        <div className="five wide computer sixteen wide mobile five wide tablet column" />

                        <div className="five wide computer sixteen wide mobile five wide tablet column">

                        </div>
                    </div>
                    <div className="row">
                        <div className="five wide computer sixteen wide mobile five wide tablet column">
                            <strong> Child First Name:</strong> <span className="ml-5">{first_name}</span>
                        </div>
                        <div className="five wide computer sixteen wide mobile five wide tablet column">
                            <strong>Child Last Name:</strong><span className="ml-5">{last_name}</span>
                        </div>
                        <div className="five wide computer sixteen wide mobile five wide tablet column">
                            <strong>Birth Date:</strong><span className="ml-5">{birth_date}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="five wide computer sixteen wide mobile five wide tablet column">
                            <strong>Birth Place:</strong> <span className="ml-5">{birth_place}</span>
                        </div>
                        <div className="five wide computer sixteen wide mobile five wide tablet column">
                            <strong>Admission Date:</strong><span className="ml-5">{admission_date}</span>
                        </div>
                        <div className="five wide computer sixteen wide mobile five wide tablet column">
                            <strong>Address:</strong><span className="ml-5">{address}</span>

                        </div>
                    </div>
                    <div className="row">
                        <div className="five wide computer sixteen wide mobile five wide tablet column">
                            <strong>City:</strong><span className="ml-5">{city}</span>
                        </div>
                        <div className="five wide computer sixteen wide mobile five wide tablet column">
                            <strong>State:</strong><span className="ml-5">{state}</span>
                        </div>
                        <div className="five wide computer sixteen wide mobile five wide tablet column">
                            <strong>Zip code:</strong><span className="ml-5">{zip_code}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* <PrintBasicInfo {...props} /> */}

            {parentInfo.length ? <Parent1Info parentInfo={parentInfo} role_id={role_id} /> : ''}
            {parentInfo.length === 2 ? <Parent2Info parentInfo={parentInfo} role_id={role_id} /> : ''}
            {emergencyInfo.length ? <EmergencyInfoOne emergencyInfo={emergencyInfo} role_id={role_id} /> : ''}
            {emergencyInfo.length === 2 ? <EmergencyInfoTwo emergencyInfo={emergencyInfo} role_id={role_id} /> : ''}
            {medicalInfo.length ? <MedicalInfo medicalInfo={medicalInfo} role_id={role_id} /> : ''}
            {devReport.length ? <DevReport devReport={devReport} role_id={role_id} /> : ''}
            {healthReport.length ? <HealthReport healthReport={healthReport} role_id={role_id} /> : ''}
            {eatingHabitReport.length ? <EatingHabitReport eatingHabitReport={eatingHabitReport} role_id={role_id} /> : ''}
            {toiletHabitReport.length ? <ToiletHabitReport toiletHabitReport={toiletHabitReport} role_id={role_id} /> : ''}
            {sleepingHabitReport.length ? <SleepingHabitReport sleepingHabitReport={sleepingHabitReport} role_id={role_id} /> : ''}
            {socialRelationshipReport.length ? <SocialRelationshipReport socialRelationshipReport={socialRelationshipReport} role_id={role_id} /> : ''}
            {dailyScheduleReport.length ? <DailyScheduleReport dailyScheduleReport={dailyScheduleReport} role_id={role_id} /> : ''}
            {parentAgreement.length ? <ParentAgreement parentAgreement={parentAgreement} user={user} role_id={role_id} /> : ''}
            {authorizationAndConsent.length ? <AuthorizationAndConsent authorizationAndConsent={authorizationAndConsent} user={user} role_id={role_id} /> : ''}
            {localTripPermission.length ? <LocalTripPermission localTripPermission={localTripPermission} user={user} role_id={role_id} /> : ''}
            {sunscreenPermission.length ? <SunscreenPermission sunscreenPermission={sunscreenPermission} user={user} role_id={role_id} /> : ''}
            {toothBrushingInformation.length ? <ToothBrushingInformation toothBrushingInformation={toothBrushingInformation} user={user} role_id={role_id} /> : ''}
            {photoRelease.length ? <PhotoRelease photoRelease={photoRelease} user={user} role_id={role_id} /> : ''}
            {transportAuthority.length ? <TransportAuthority transportAuthority={transportAuthority} user={user} role_id={role_id} /> : ''}
            {schoolDirectory.length ? <SchoolDirectory childAllInfo={props.childAllInfo[0]} role_id={role_id} /> : ''}



            {/* <h4>SCHOOL DIRECTORY<br />
                <i>The school directory will be distributed only to the participants.<br />
                    The school directory must not be used to solicit business but rather for the purpose it was intended, planning play dates, birthday invites and other celebration, or contacting a class parent.</i>
            </h4> */}

        </div>
    )

}


function Parent1Info(props) {
    let { parentInfo } = props;

    return (
        <div className={`mt-2rem view-student-page-print p-r page-break`} >
            <div className="ui grid" >
                <div className="row">
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <h4>Parent 1 Information</h4>
                    </div>
                    <div className="five wide computer five wide tablet column" />
                    <div className="five wide computer sixteen wide mobile five wide tablet column" />


                </div>
                <div className="row">
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong> P1 First Name:</strong><span className="ml-5">{parentInfo[0].first_name}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>P2 Last Name:</strong><span className="ml-5">{parentInfo[0].last_name}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Phone 1:</strong><span className="ml-5">{parentInfo[0].phone1}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Phone 2:</strong><span className="ml-5">{parentInfo[0].phone2}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Email 1:</strong><span className="ml-5">{parentInfo[0].email1}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Address:</strong><span className="ml-5">{parentInfo[0].address}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>City:</strong><span className="ml-5">{parentInfo[0].city}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>State:</strong><span className="ml-5">{parentInfo[0].state}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Zip Code:</strong><span className="ml-5">{parentInfo[0].zip_code}</span>
                    </div>
                </div>
                <div className="row">

                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Business Name:</strong><span className="ml-5">{parentInfo[0].business_name}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Business Address:</strong><span className="ml-5">{parentInfo[0].business_phone}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Work start time:</strong><span className="ml-5">{parentInfo[0].work_start_time}</span>
                    </div>
                </div>

                <div className="row">
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Work end time:</strong><span className="ml-5">{parentInfo[0].work_end_time}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Bussiness Phone:</strong><span className="ml-5">{parentInfo[0].zip_code}</span>
                    </div>
                    <div className="five wide computer five wide tablet column" />
                </div>
            </div>
        </div>

    )
}

function Parent2Info(props) {
    let { parentInfo } = props;
    return (
        <div className={`mt-2rem view-student-page-print page-break p-r`} >
            <div className="ui grid " >
                <div className="row">
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <h4>Parent 2 Information</h4>
                    </div>
                    <div className="five wide computer five wide tablet column" />
                    <div className="five wide computer sixteen wide mobile five wide tablet column" />
                </div>
                <div className="row">
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong> P1 First Name:</strong><span className="ml-5">{parentInfo[1].first_name}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>P2 Last Name:</strong><span className="ml-5">{parentInfo[1].last_name}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Phone 1:</strong><span className="ml-5">{parentInfo[1].phone1}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Phone 2:</strong><span className="ml-5">{parentInfo[1].phone2}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Email 1:</strong><span className="ml-5">{parentInfo[1].email1}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Address:</strong><span className="ml-5">{parentInfo[1].address}</span>
                    </div>

                </div>
                <div className="row">

                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>City:</strong><span className="ml-5">{parentInfo[1].city}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>State:</strong><span className="ml-5">{parentInfo[1].state}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Zip Code:</strong><span className="ml-5">{parentInfo[1].zip_code}</span>
                    </div>

                </div>
                <div className="row">
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Business Name:</strong><span className="ml-5">{parentInfo[1].business_name}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Business Address:</strong><span className="ml-5">{parentInfo[1].business_phone}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Work start time:</strong><span className="ml-5">{parentInfo[1].work_start_time}</span>
                    </div>
                </div>

                <div className="row">

                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Work end time:</strong><span className="ml-5">{parentInfo[1].work_end_time}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Bussiness Phone:</strong><span className="ml-5">{parentInfo[1].zip_code}</span>
                    </div>
                    <div className="five wide computer five wide tablet column" />
                </div>
            </div>
        </div>

    )
}

function EmergencyInfoOne(props) {
    let { emergencyInfo } = props;

    return (
        <div className={`mt-2rem view-student-page-print page-break p-r`} >

            <div className="ui grid">
                <div className="row">
                    <div className="eight wide computer sixteen wide mobile eight wide tablet column">
                        <div className="admin-mobile-page-heading "><h4 className="ui header">IF PARENTS CANNOT BE CONTACTED, NOTIFY,<br />
                    Emergency Contact 1 Information (should be different from Parent)</h4></div>
                    </div>
                    <div className="two wide computer sixteen wide mobile eight wide tablet column" />
                    <div className="five wide computer sixteen wide mobile eight wide tablet column" />
                </div>
                <div className="row">
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong> First Name:</strong><span className="ml-5">{emergencyInfo[0].first_name}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Last Name:</strong><span className="ml-5">{emergencyInfo[0].last_name}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Phone 1:</strong><span className="ml-5">{emergencyInfo[0].phone1}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Phone 2:</strong><span className="ml-5">{emergencyInfo[0].phone2}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Email 1:</strong><span className="ml-5">{emergencyInfo[0].email1}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Address:</strong><span className="ml-5">{emergencyInfo[0].address}</span>
                    </div>

                </div>
                <div className="row">

                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>City:</strong><span className="ml-5">{emergencyInfo[0].city}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>State:</strong><span className="ml-5">{emergencyInfo[0].state}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Zip Code:</strong><span className="ml-5">{emergencyInfo[0].zip_code}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Relationship:</strong><span className="ml-5">{emergencyInfo[0].relationship}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Emergency release:</strong><span className="ml-5">{emergencyInfo[0].city}</span>
                    </div>
                    <div className="five wide computer five wide tablet column" />


                </div>
            </div>
        </div>

    )

}

function EmergencyInfoTwo(props) {
    let { emergencyInfo } = props;

    return (
        <div className={`mt-2rem view-student-page-print page-break p-r`} >

            <div className="ui grid" >
                <div className="row">
                    <div className="eight wide computer sixteen wide mobile eight wide tablet column">
                        <div className="admin-mobile-page-heading "><h4 className="ui header">Emergency Contact 2 Information (should be different from Parent)</h4></div>
                    </div>
                    <div className="two wide computer sixteen wide mobile eight wide tablet column" />
                    <div className="five wide computer sixteen wide mobile eight wide tablet column" />
                </div>
                <div className="row">
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong> First Name:</strong><span className="ml-5">{emergencyInfo[1].first_name}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Last Name:</strong><span className="ml-5">{emergencyInfo[1].last_name}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Phone 1:</strong><span className="ml-5">{emergencyInfo[1].phone1}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Phone 2:</strong><span className="ml-5">{emergencyInfo[1].phone2}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Email 1:</strong><span className="ml-5">{emergencyInfo[1].email1}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Address:</strong><span className="ml-5">{emergencyInfo[1].address}</span>
                    </div>

                </div>
                <div className="row">

                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>City:</strong><span className="ml-5">{emergencyInfo[1].city}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>State:</strong><span className="ml-5">{emergencyInfo[1].state}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Zip Code:</strong><span className="ml-5">{emergencyInfo[1].zip_code}</span>
                    </div>
                </div>
                <div className="row">

                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Relationship:</strong><span className="ml-5">{emergencyInfo[1].relationship}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Emergency release:</strong><span className="ml-5">{emergencyInfo[1].city}</span>
                    </div>
                    <div className="five wide computer five wide tablet column" />
                </div>
            </div>
        </div>

    )
}

function MedicalInfo(props) {
    let { medicalInfo } = props;
    return (
        <div className={`mt-2rem view-student-page-print page-break p-r`} >

            <div className="ui grid" >
                <div className="row">
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <h4>MEDICAL INFORMATION</h4>
                    </div>
                    <div className="five wide computer five wide tablet column" />
                    <div className="five wide computer sixteen wide mobile five wide tablet column" />

                </div>
                <div className="row">
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong> Doctor Name:</strong><span className="ml-5">{medicalInfo[0].doctor_name}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Doctor Phone:</strong><span className="ml-5">{medicalInfo[0].doctor_phone}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Doctor Email:</strong><span className="ml-5">{medicalInfo[0].doctor_email}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Primary Language:</strong><span className="ml-5">{medicalInfo[0].doctor_primary_language}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Insurance Carrier:</strong><span className="ml-5">{medicalInfo[0].doctor_insurance_carrier}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Insurance Number:</strong><span className="ml-5">{medicalInfo[0].doctor_insurance_number}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Last Physical Date:</strong><span className="ml-5">{medicalInfo[0].last_physical_date}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Lead Screen Date:</strong><span className="ml-5">{medicalInfo[0].lead_screen_date}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Immunizations:</strong><span className="ml-5">{medicalInfo[0].immunizations}</span>
                    </div>
                </div>
                {medicalInfo[0].has_allergy === "yes" ?
                    <div className="row">
                        <div className="five wide computer sixteen wide mobile five wide tablet column">
                            <strong>Allergies:</strong><span className="ml-5">{medicalInfo[0].allergies}</span>
                        </div>
                        <div className="five wide computer sixteen wide mobile five wide tablet column">
                            <strong>Date of Doctor Letter:</strong><span className="ml-5">{medicalInfo[0].date_of_doctor_letter}</span>
                        </div>
                        <div className="five wide computer sixteen wide mobile five wide tablet column">
                            <strong>Medicine Expiration Date  :</strong><span className="ml-5">{medicalInfo[0].medicine_expiration_date}</span>
                        </div>
                    </div>
                    :
                    ""
                }


                <div className="row">

                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Gender:</strong><span className="ml-5">{medicalInfo[0].gender}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Height (inches):</strong><span className="ml-5">{medicalInfo[0].height}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Weight (pounds):</strong><span className="ml-5">{medicalInfo[0].weight}</span>
                    </div>
                </div>
                {medicalInfo[0].has_allergy === "yes" ?
                    <React.Fragment>
                        <div className="row">
                            <div className="five wide computer sixteen wide mobile five wide tablet column">
                                <strong>Eye Color:</strong><span className="ml-5">{medicalInfo[0].eye_color}</span>
                            </div>
                            <div className="five wide computer sixteen wide mobile five wide tablet column">
                                <strong>Hair Color:</strong><span className="ml-5">{medicalInfo[0].hair_color}</span>
                            </div>
                            <div className="five wide computer sixteen wide mobile five wide tablet column">
                                <strong>Race:</strong><span className="ml-5">{medicalInfo[0].race}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="five wide computer sixteen wide mobile five wide tablet column">
                                <strong>Identity Marks:</strong><span className="ml-5">{medicalInfo[0].identity_marks}</span>
                            </div>
                            <div className="five wide computer" />
                        </div>

                    </React.Fragment>
                    :
                    <React.Fragment>
                        <div className="row">
                            <div className="five wide computer sixteen wide mobile five wide tablet column">
                                <strong>Allergies:</strong><span className="ml-5">Child has no Allergies</span>
                            </div>
                            <div className="five wide computer sixteen wide mobile five wide tablet column">
                                <strong>Eye Color:</strong><span className="ml-5">{medicalInfo[0].eye_color}</span>
                            </div>
                            <div className="five wide computer sixteen wide mobile five wide tablet column">
                                <strong>Hair Color:</strong><span className="ml-5">{medicalInfo[0].hair_color}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="five wide computer sixteen wide mobile five wide tablet column">
                                <strong>Race:</strong><span className="ml-5">{medicalInfo[0].race}</span>
                            </div>
                            <div className="five wide computer sixteen wide mobile five wide tablet column">
                                <strong>Identity Marks:</strong><span className="ml-5">{medicalInfo[0].identity_marks}</span>
                            </div>

                            <div className="five wide computer" />
                        </div>

                    </React.Fragment>
                }




                <div className="row">
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Add Child to Directory:</strong><span className="ml-5">{hasTrue(medicalInfo[0].add_child_to_directory)}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Add Parent1 to Directory:</strong><span className="ml-5">{hasTrue(medicalInfo[0].add_parent_to_directory)}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Add Parent2 to Directory:</strong><span className="ml-5">{hasTrue(medicalInfo[0].add_parent2_to_directory)}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="sixteen wide computer sixteen wide mobile sixteen wide tablet column">
                        <strong>This is a signature checkbox verifying the information entered above is correct and complete. On the printed forms your signature will be included:</strong>{hasTrue(medicalInfo[0].has_signature_checked)}
                    </div>
                </div>

                <div className="row">
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Signature Date:</strong><span className="ml-5">{moment(medicalInfo[0].createdAt).format("MM/DD/YYYY")}</span>
                    </div>
                </div>
            </div>
        </div>


    )

}

function DevReport(props) {
    let { devReport } = props;
    return (
        <div className={`mt-2rem view-student-page-print page-break p-r`}>

            <div className="ui grid" >
                <div className="row">
                    <div className="five wide computer sixteen wide mobile eight wide tablet column">
                        <h4>DEVELOPMENTAL HISTORY</h4>
                    </div>
                    <div className="five wide computer eight wide tablet column" />
                    <div className="five wide computer sixteen wide mobile eight wide tablet column" />
                </div>
                <div className="row">
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Age began sitting:</strong>
                        <span className="ml-5">{devReport[0].age_began_sitting}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>crawling:</strong>
                        <span className="ml-5">{devReport[0].crawling}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>walking:</strong>
                        <span className="ml-5">{devReport[0].walking}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>talking:</strong>
                        <span className="ml-5">{devReport[0].talking}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Does your child pull up?</strong>
                        <span className="ml-5">{devReport[0].has_child_pull_up}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Crawl?</strong>
                        <span className="ml-5">{devReport[0].has_child_crawling}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Walk with support?</strong>
                        <span className="ml-5">{devReport[0].has_child_walk_with_support}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Any speech difficulties?</strong>
                        <span className="ml-5">{devReport[0].has_speech_difficulties}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Special words to describe needs:</strong>
                        <span className="ml-5">{devReport[0].special_words_to_describe}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Language spoken at home:</strong>
                        <span className="ml-5">{devReport[0].language_spoken_at_home}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Any history of colic?</strong>
                        <span className="ml-5">{devReport[0].has_history_of_colics}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Does your child use pacifier or suck thumb?</strong>
                        <span className="ml-5">{devReport[0].has_child_use_pacifier_or_sucks_thumbs}</span>
                    </div>
                </div>

                <div className="row">
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>When?:</strong>
                        <span className="ml-5">{devReport[0].when_child_use_pacifier_or_sucks_thumbs}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>Does your child have a fussy time?</strong>
                        <span className="ml-5">{devReport[0].has_child_have_fussy_time}</span>
                    </div>
                    <div className="five wide computer sixteen wide mobile five wide tablet column">
                        <strong>When?</strong>
                        <span className="ml-5">{devReport[0].when_child_have_fussy_time}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="five wide computer sixteen wide mobile five wide tablet column" >
                        <strong>Identity Marks:</strong><span className="ml-5">{devReport[0].how_parent_handle_time}</span>
                    </div>
                    <div className="five wide computer" />
                    <div className="five wide computer" />
                </div>
            </div>
        </div>


    )

}

function HealthReport(props) {
    let { healthReport } = props;

    return (
        <div className={`mt-2rem view-student-page-print page-break p-r`}>

            <div className="ui grid" >
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={4}>
                        <h4>HEALTH</h4>
                    </Grid.Column>
                    <Grid.Column computer={5} tablet={4} />
                    <Grid.Column computer={5} mobile={16} tablet={4} />
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Any known complications at birth?</strong><span className="ml-5">{healthReport[0].has_complication_at_birth}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Serious illnesses and/or hospitalizations:</strong><span className="ml-5">{healthReport[0].serious_illness_hospitalization}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Special physical conditions, disabilities:</strong><span className="ml-5">{healthReport[0].special_physical_condition}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Allergies i.e. asthma, hay fever, insect bites, medicine, food reactions:</strong><span className="ml-5">{healthReport[0].allergies}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Regular medications:</strong><span className="ml-5">{healthReport[0].regular_medications}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5} />
                </Grid.Row>
            </div>
        </div>

    )
}

function EatingHabitReport(props) {
    let { eatingHabitReport } = props;
    return (
        <div className={`mt-2rem view-student-page-print page-break p-r`}>
            <div className="ui grid" >
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={4}>
                        <h4>EATING HABITS</h4>                </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={4} />
                    <Grid.Column computer={5} mobile={16} tablet={4} />
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Special characteristics or difficulties:</strong>
                        <span className="ml-5">{eatingHabitReport[0].special_charecters_or_diffculties}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>If infant is on a special formula, describe its preparation:</strong>
                        <span className="ml-5">{eatingHabitReport[0].special_formula_prepration_details}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Favorite foods:</strong>
                        <span className="ml-5">{eatingHabitReport[0].favouraite_food}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Foods refused:</strong>
                        <span className="ml-5">{eatingHabitReport[0].food_refused}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Is your child fed held in lap?</strong>
                        <span className="ml-5">{eatingHabitReport[0].child_fedon_lap}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5} >
                        <strong>High chair?</strong>
                        <span className="ml-5">{eatingHabitReport[0].high_chair}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Does your child eat with spoon?:</strong>
                        <span className="ml-5">{eatingHabitReport[0].has_child_use_spoon}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Fork:</strong>
                        <span className="ml-5">{eatingHabitReport[0].has_child_use_fork}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5} >
                        <strong>Hands?:</strong>
                        <span className="ml-5">{eatingHabitReport[0].has_child_use_hand}</span>
                    </Grid.Column>
                </Grid.Row>
            </div>
        </div>

    )
}

function ToiletHabitReport(props) {
    let { toiletHabitReport } = props;

    return (
        <div className={`mt-2rem view-student-page-print page-break p-r`}>

            <div className="ui grid" >
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={4}>
                        <h4>TOILET HABITS</h4>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={4} />

                    <Grid.Column computer={5} mobile={16} tablet={4} />
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Are disposable or cloth diapers used?:</strong>
                        <span className="ml-5">{toiletHabitReport[0].has_diaper_used}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Is there a frequent occurrence of diaper rash?:</strong>
                        <span className="ml-5">{toiletHabitReport[0].has_diaper_rash_occur}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Do you use: oil:</strong>
                        <span className="ml-5">{toiletHabitReport[0].has_parent_use_oil}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>powder:</strong>
                        <span className="ml-5">{toiletHabitReport[0].has_parent_powder}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>lotion:</strong>
                        <span className="ml-5">{toiletHabitReport[0].has_parent_lotion}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5} >
                        <strong>other:</strong>
                        <span className="ml-5">{toiletHabitReport[0].has_parent_use_other}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Are bowel movements regular?</strong>
                        <span className="ml-5">{toiletHabitReport[0].has_bowel_movement_regular}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>How many per day?</strong>
                        <span className="ml-5">{toiletHabitReport[0].how_many_time_bowl_move}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5} >
                        <strong>Is there a problem with diarrhea?</strong>
                        <span className="ml-5">{toiletHabitReport[0].has_problem_of_diarrhea}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Constipation</strong>
                        <span className="ml-5">{toiletHabitReport[0].has_problem_of_constipation}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Has toilet training been attempted?</strong>
                        <span className="ml-5">{toiletHabitReport[0].has_toilet_training}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5} >
                        <strong>Please describe any particular procedure to be used for your child at the center:</strong>
                        <span className="ml-5">{toiletHabitReport[0].particular_procedure_of_child}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>What is used at home? Pottychair?</strong>
                        <span className="ml-5">{toiletHabitReport[0].has_child_use_potty_chair}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Special child seat?</strong>
                        <span className="ml-5">{toiletHabitReport[0].has_child_use_special_seat}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5} >
                        <strong>Regular seat?</strong>
                        <span className="ml-5">{toiletHabitReport[0].has_child_use_regular_seat}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>How does your child indicate bathroom needs (include special words):</strong>
                        <span className="ml-5">{toiletHabitReport[0].how_child_indicate_bathroom}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Is your child ever reluctant to use the bathroom?</strong>
                        <span className="ml-5">{toiletHabitReport[0].has_childwilling_to_use_bathroom}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5} >
                        <strong>Does your child have accidents?</strong>
                        <span className="ml-5">{toiletHabitReport[0].has_child_have_accident}</span>
                    </Grid.Column>
                </Grid.Row>
            </div>
        </div>


    )
}

function SleepingHabitReport(props) {
    let { sleepingHabitReport } = props;
    return (
        <div className={`mt-2rem view-student-page-print page-break p-r`}>
            <div className="ui grid" >
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={4}>
                        <h4>SLEEPING HABITS</h4>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={4} />
                    <Grid.Column computer={5} mobile={16} tablet={4} />
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Does your child sleep in a crib?</strong>
                        <span className="ml-5">{sleepingHabitReport[0].has_child_sleep_on_crib}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Bed?</strong>
                        <span className="ml-5">{sleepingHabitReport[0].has_child_sleep_on_bed}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5} >
                        <strong>Does your child become tired or nap during the day (include when and how long)?</strong>
                        <span className="ml-5">{sleepingHabitReport[0].how_does_child_becometired}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>When does your child go to bed at night?</strong>
                        <span className="ml-5">{sleepingHabitReport[0].has_child_sleep_at_night}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>and get up in the morning?</strong>
                        <span className="ml-5">{sleepingHabitReport[0].has_child_get_up_in_morning}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5} >
                        <strong>Describe any special characteristics or needs (stuffed animal, story, mood on waking etc)</strong>
                        <span className="ml-5">{sleepingHabitReport[0].special_charecterstic_or_need}</span>
                    </Grid.Column>
                </Grid.Row>
            </div>
        </div>
    )
}

function SocialRelationshipReport(props) {
    let { socialRelationshipReport } = props;

    return (
        <div className={`mt-2rem view-student-page-print page-break p-r`} >
            <div className="ui grid" >
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={4}>
                        <h4>SOCIAL RELATIONSHIPS</h4>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={4} />
                    <Grid.Column computer={5} mobile={16} tablet={4} />
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>How would you describe your child?</strong>
                        <span className="ml-5">{socialRelationshipReport[0].child_description_by_parent}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Previous experience with other children/day care:</strong>
                        <span className="ml-5">{socialRelationshipReport[0].previous_experience}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5} >
                        <strong>Reaction to strangers:</strong>
                        <span className="ml-5">{socialRelationshipReport[0].reaction_to_starnger}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Able to play alone?</strong>
                        <span className="ml-5">{socialRelationshipReport[0].has_allow_play_alone}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Favorite toys and activities:</strong>
                        <span className="ml-5">{socialRelationshipReport[0].favouraite_toy}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5} >
                        <strong>Fears (the dark, animals, etc.):</strong>
                        <span className="ml-5">{socialRelationshipReport[0].child_fear}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>How do you comfort your child?</strong>
                        <span className="ml-5">{socialRelationshipReport[0].how_parent_comfort_child}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>What is the method of behavior management/discipline at home?</strong>
                        <span className="ml-5">{socialRelationshipReport[0].behaviour_management}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5} >
                        <strong>What would you like your child to gain from this childcare experience?</strong>
                        <span className="ml-5">{socialRelationshipReport[0].how_child_gain_experience}</span>
                    </Grid.Column>
                </Grid.Row>
            </div>
        </div>

    )
}

function DailyScheduleReport(props) {
    let { dailyScheduleReport } = props;
    return (
        <div className={`mt-2rem view-student-page-print page-break p-r`} >
            <div className="ui grid" >
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={4}>
                        <h4>DAILY SCHEDULE</h4>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={4} />
                    <Grid.Column computer={5} mobile={16} tablet={4} />
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column mobile={16} tablet={10} computer={10}>
                        <strong>Is there anything else we should know about your child?</strong>
                        <span className="ml-5">{dailyScheduleReport[0].more_about_child}</span>
                    </Grid.Column>
                    <Grid.Column computer={6} tablet={6} mobile={16}>
                        <strong>Date</strong><span className="ml-5">{moment(dailyScheduleReport[0].updatedAt).format('YYYY/MM/DD')}</span>
                    </Grid.Column>
                </Grid.Row>
            </div>
        </div>
    )
}

function ParentAgreement(props) {
    let { parentAgreement, user } = props;

    return (
        <div className={`mt-2rem view-student-page-print page-break p-r`} >
            <div className="ui grid" >
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={10}>
                        <h4>PARENT AGREEMENT</h4>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={2} />
                    <Grid.Column computer={5} mobile={16} tablet={3} />
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={10} tablet={10} mobile={16}>
                        <strong>I have read the Parent Handbook provide by Little Children Schoolhouse.com (please sign in) and agree to follow and adhere to the policies and procedures provide there in.</strong>
                        <span className="ml-5">{`${parentAgreement[0].has_parent_agreed_with_policies}`}</span>
                    </Grid.Column>
                    <Grid.Column computer={6} tablet={6} mobile={16}>
                        <strong>Date</strong>
                        <span className="ml-5">{moment(parentAgreement[0].updatedAt).format('YYYY/MM/DD')}</span>
                    </Grid.Column>
                </Grid.Row>
                {
                    hasStringTrue(parentAgreement[0].has_parent_signature) ?
                        user.signature ?
                            <Grid.Row>
                                <Grid.Column computer={16} tablet={16} mobile={16}>
                                    <img src={user.signature} alt="parent-signature" />
                                </Grid.Column>
                            </Grid.Row> : '' : ''
                }
            </div>
        </div>

    )
}

function PhotoRelease(props) {
    let { photoRelease, user } = props;

    return (
        <div className={`mt-2rem view-student-page-print page-break p-r`} >
            <div className="ui grid" >
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={10}>
                        <div className="admin-mobile-page-heading ">
                            <h4 className="ui header">PHOTOGRAPH RELEASE PERMISSION</h4></div>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={2} />
                    <Grid.Column computer={5} mobile={16} tablet={3} />
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} tablet={5} mobile={16}>
                        <strong>Permission Granted:</strong>
                        <span className="ml-5">{photoRelease[0].has_photo_permission_granted}</span>
                    </Grid.Column>
                    <Grid.Column computer={6} tablet={5} mobile={16}>
                        <strong>Date</strong>
                        <span className="ml-5">{moment(photoRelease[0].updatedAt).format('YYYY/MM/DD')}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} tablet={5} />
                </Grid.Row>
                {
                    hasStringTrue(photoRelease[0].has_parent_signature) ?
                        user.signature ?
                            <Grid.Row>
                                <Grid.Column computer={16} tablet={16} mobile={16}>
                                    <img src={user.signature} alt="parent-signature" />
                                </Grid.Column>
                            </Grid.Row> : '' : ''
                }
            </div>
        </div>
    )
}

function AuthorizationAndConsent(props) {
    let { authorizationAndConsent, user } = props;
    return (
        <div className={`mt-2rem view-student-page-print page-break p-r`}>
            <div className="ui grid" >
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={10}>
                        <div className="admin-mobile-page-heading ">
                            <h4 className="ui header">AUTHORIZATION AND CONSENT FORM</h4></div>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={2} />
                    <Grid.Column computer={5} mobile={16} tablet={3} />
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={10} tablet={12} mobile={16} >
                        <strong>I hereby authorize LITTLE CHILDREN SCHOOLHOUSE to release my child to the following persons (other than parents):</strong>
                        <span className="ml-5">{`${authorizationAndConsent[0].has_authorize_mychild}`}</span>
                    </Grid.Column>
                    <Grid.Column computer={6} tablet={3} mobile={16}>
                        <strong>Date</strong>
                        <span className="ml-5">{moment(authorizationAndConsent[0].updatedAt).format('YYYY/MM/DD')}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={16} tablet={16} >
                        <strong>I understand that effort will be made to contact me in the event of emergency requiring medical attention for my child However, if I cannot be reached, I hereby authorize LITTLE CHILDRENSCHOOLHOUSE to transport my child the necessary medical treatment. I understand the teachers in the day care center are trained in the basis of First Aid and authorize them to give my child First Aid when appropriate.</strong>
                        <span className="ml-5">{`${authorizationAndConsent[0].has_authorize_and_consent_agreement}`}</span>
                    </Grid.Column>
                </Grid.Row>
                {
                    hasStringTrue(authorizationAndConsent[0].has_parent_signature) ?
                        user.signature ?
                            <Grid.Row>
                                <Grid.Column computer={16} tablet={16} mobile={16}>
                                    <img src={user.signature} alt="parent-signature" />
                                </Grid.Column>
                            </Grid.Row> : '' : ''
                }
            </div>
        </div>
    )
}

function LocalTripPermission(props) {
    let { localTripPermission, user } = props;

    return (
        <div className={`mt-2rem view-student-page-print page-break p-r`}>
            <div className="ui grid">
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={10}>
                        <div className="admin-mobile-page-heading ">
                            <h4 className="ui header">LOCAL FIELD TRIP PERMISSION</h4></div>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={2} />
                    <Grid.Column computer={5} mobile={16} tablet={3} />
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={10} tablet={12} mobile={16}>
                        <strong>The local field trips include local parks, playgrounds and walks around the neighborhood. I understand the local field trips may be taken daily.</strong>
                        <span className="ml-5">{`${localTripPermission[0].has_parent_agreed_for_trip}`}</span>
                    </Grid.Column>
                    <Grid.Column computer={6} tablet={3} mobile={16}>
                        <strong>Date</strong>
                        <span className="ml-5">{moment(localTripPermission[0].updatedAt).format('YYYY/MM/DD')}</span>
                    </Grid.Column>
                </Grid.Row>
                {
                    hasStringTrue(localTripPermission[0].has_parent_signature) ?
                        user.signature ?
                            <Grid.Row>
                                <Grid.Column computer={16} tablet={16} mobile={16}>
                                    <img src={user.signature} alt="parent-signature" />
                                </Grid.Column>
                            </Grid.Row> : '' : ''
                }
            </div>
        </div>
    )
}

function SunscreenPermission(props) {
    let { sunscreenPermission, user } = props;

    return (
        <div className={`mt-2rem view-student-page-print page-break p-r`} >
            <div className="ui grid">
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={10}>
                        <div className="admin-mobile-page-heading ">
                            <h4 className="ui header">SUNSCREEN PERMISSION FORM</h4></div>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={2} />
                    <Grid.Column computer={5} mobile={16} tablet={3} />
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={16} tablet={16} mobile={16}>
                        <strong>In the event that my child’s sunscreen is not readily available, my child may use The sunscreen provided by the school usually Coppertone water babies SPF, or Banana Kids/Children SPF 50.:</strong>
                        <span className="ml-5">{`${sunscreenPermission[0].has_sunscreen_provided_by_school}`}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={10} tablet={12} mobile={16}>
                        <strong>I do not want my child to use any other sunscreen other than the one he or she brings to school.:</strong>
                        <span className="ml-5">{`${sunscreenPermission[0].has_child_bring_sunscreen}`}</span>
                    </Grid.Column>

                    <Grid.Column computer={6} tablet={3} mobile={16}>
                        <strong>Date</strong>
                        <span className="ml-5">{moment(sunscreenPermission[0].updatedAt).format('YYYY/MM/DD')}</span>
                    </Grid.Column>

                </Grid.Row>
                {
                    hasStringTrue(sunscreenPermission[0].has_parent_signature) ?
                        user.signature ?
                            <Grid.Row>
                                <Grid.Column computer={16} tablet={16} mobile={16}>
                                    <img src={user.signature} alt="parent-signature" />
                                </Grid.Column>
                            </Grid.Row> : '' : ''
                }
            </div>
        </div>

    )
}
function ToothBrushingInformation(props) {
    let { toothBrushingInformation, user } = props;
    return (
        <div className={`mt-2rem view-student-page-print page-break p-r`} >
            <div className="ui grid" >
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={10}>
                        <div className="admin-mobile-page-heading ">
                            <h4 className="ui header">TOOTH BRUSHING CONSENT FORM</h4></div>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={2} />
                    <Grid.Column computer={5} mobile={16} tablet={3} />
                </Grid.Row>
                <Grid.Row>
                    {
                        toothBrushingInformation[0].has_participate_in_toothbrushing === 'no' ? <Grid.Column computer={8} tablet={16} mobile={16}>
                            <strong>No, I do not want my child to participate in the tooth-brushing.</strong>
                            <span className="ml-5">{`${toothBrushingInformation[0].has_participate_in_toothbrushing}`}</span>
                        </Grid.Column> : <Grid.Column computer={8} tablet={8} mobile={16}>
                                <strong>Yes, I would like my child to participate in the tooth-brushing.</strong>
                                <span className="ml-5">{`${toothBrushingInformation[0].has_participate_in_toothbrushing}`}</span>
                            </Grid.Column>
                    }
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={10} tablet={12} mobile={16}>
                        <strong>My child may use fluoride toothpaste sent from home:</strong>
                        <span className="ml-5">{`${toothBrushingInformation[0].has_fluoride}`}</span>
                    </Grid.Column>
                    <Grid.Column computer={6} tablet={3} mobile={16}>
                        <strong>Date</strong>
                        <span className="ml-5">{moment(toothBrushingInformation[0].updatedAt).format('YYYY/MM/DD')}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    {
                        toothBrushingInformation[0].has_school_toothbrushing === 'no' ? <Grid.Column computer={16} tablet={16} mobile={16}>
                            <strong>In the event that my child does not have any toothpaste my child MAY NOT USE toothpaste provided by the school.</strong>
                            <span className="ml-5">{`${toothBrushingInformation[0].has_school_toothbrushing}`}</span>
                        </Grid.Column> :
                            <Grid.Column computer={16} tablet={16} mobile={16}>
                                <strong>In the event that my child does not have any toothpaste my child MAY USE toothpaste provided by the school.</strong>
                                <span className="ml-5">{`${toothBrushingInformation[0].has_school_toothbrushing}`}</span>
                            </Grid.Column>
                    }
                </Grid.Row>
                {
                    hasStringTrue(toothBrushingInformation[0].has_parent_signature) ?
                        user.signature ?
                            <Grid.Row>
                                <Grid.Column computer={16} tablet={16} mobile={16}>
                                    <img src={user.signature} alt="parent-signature" />
                                </Grid.Column>
                            </Grid.Row> : '' : ''
                }
            </div>
        </div>
    )
}
function TransportAuthority(props) {
    let { transportAuthority, user } = props;
    return (
        <div className={`mt-2rem view-student-page-print page-break p-r`}>
            <div className="ui grid" >
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={10}>
                        <div className="admin-mobile-page-heading ">
                            <h4 className="ui header">TRANSPORTATION AUTHORIZATION</h4></div>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={2} />
                    <Grid.Column computer={5} mobile={16} tablet={3} />
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} tablet={5} mobile={16}>
                        <strong>PARENT DROP OFF</strong>
                        <span className="ml-5">{`${transportAuthority[0].has_parent_drop_off}`}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} tablet={5} mobile={16}>
                        <strong>PARENT PICK UP</strong>
                        <span className="ml-5">{`${transportAuthority[0].has_parent_pick_up}`}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} tablet={5} mobile={16}>
                        <strong>SUPERVISED WALK</strong>
                        <span className="ml-5">{`${transportAuthority[0].has_supervised_walk}`}</span>
                    </Grid.Column>

                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} tablet={5} mobile={16}>
                        <strong>PUBLIC/PRIVATE/VAN</strong>
                        <span className="ml-5">{`${transportAuthority[0].has_public_private_van}`}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} tablet={5} mobile={16}>
                        <strong>PROGRAM BUS/VAN</strong>
                        <span className="ml-5">{`${transportAuthority[0].has_program_bus_van}`}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} tablet={5} mobile={16}>
                        <strong>CONTRACT/VAN</strong>
                        <span className="ml-5">{`${transportAuthority[0].has_contract_van}`}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} tablet={5} mobile={16}>
                        <strong>PRIVATE TRANS. ARRANGED BY PARENT</strong>
                        <span className="ml-5">{`${transportAuthority[0].has_private_transport_arranged_by_parent}`}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} tablet={5} mobile={16}>
                        <strong>OTHER</strong>
                        <span className="ml-5">{`${transportAuthority[0].has_other}`}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} tablet={5} mobile={16} >
                        <strong>Date</strong>
                        <span className="ml-5">{moment(transportAuthority[0].updatedAt).format('YYYY/MM/DD')}</span>
                    </Grid.Column>
                </Grid.Row>
                {
                    hasStringTrue(transportAuthority[0].has_parent_signature) ?
                        user.signature ?
                            <Grid.Row>
                                <Grid.Column computer={16} tablet={16} mobile={16}>
                                    <img src={user.signature} alt="parent-signature" />
                                </Grid.Column>
                            </Grid.Row> : '' : ''
                }
            </div>
        </div>


    )
}
function hasStringTrue(value) {
    return (value === "true" || value === true) ? true : false
}
function SchoolDirectory(props) {
    let { childAllInfo } = props,
        { parentInfo, schoolDirectory, user } = childAllInfo,
        childFullName = childAllInfo.first_name + ' ' + childAllInfo.last_name,
        parent1FullName = parentInfo[0].first_name + ' ' + parentInfo[0].last_name,
        parent1Email = parentInfo[0].email1,
        parent1Phone = parentInfo[0].phone1,
        parent2FullName = parentInfo[1].first_name + ' ' + parentInfo[1].last_name,
        parent2Email = parentInfo[1].email1,
        parent2Phone = parentInfo[1].phone1;

    return (
        <div className={`mt-2rem view-student-page-print page-break p-r`} >

            <div className="ui grid" >
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={10}>
                        <div className="admin-mobile-page-heading ">
                            <h4 className="ui header">SCHOOL DIRECTORY</h4></div>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={2} />
                    <Grid.Column computer={5} mobile={16} tablet={3} />
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={16} mobile={16} tablet={16}>
                        <table className="ui single line structured center aligned table">
                            <tbody >
                                <tr >
                                    <td >NAME OF CHILD</td>
                                    <td >{childFullName}</td>
                                </tr>
                                <tr >
                                    <td rowSpan="2" >NAME OF PARENTS</td>
                                    <td >{parent1FullName}</td>
                                </tr>
                                <tr >
                                    <td >{parent2FullName}</td>
                                </tr>
                                <tr >
                                    <td rowSpan="2" >EMAIL ADDRESS</td>
                                    <td >{parent1Email}</td>
                                </tr>
                                <tr >
                                    <td >{parent2Email}</td>
                                </tr>
                                <tr >
                                    <td rowSpan="2" >TEL. #</td>
                                    <td >{parent1Phone}</td>
                                </tr>
                                <tr >
                                    <td >{parent2Phone}</td>
                                </tr>
                            </tbody></table>

                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={16} mobile={16} tablet={16}>
                        <h4><i>The school directory will be distributed only to the participants.<br />
                        The school directory must not be used to solicit business but rather for the purpose it was intended, planning play dates, birthday invites and other celebration, or contacting a class parent.</i>
                        </h4>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={16} mobile={16} tablet={16}>
                        <strong>I give permission for my information to be published in the Little Children Schoolhouse Directory and promise to be discreet with the personal information provided.
</strong> <span className="ml-5">{`${schoolDirectory[0].has_parent_information_publish}`}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={16} mobile={16} tablet={16}>
                        <strong>I do not wish to be a part of the LCSH school directory.</strong>
                        <span className="ml-5">{`${schoolDirectory[0].has_parent_wish_to_add_school_directory}`}</span>
                    </Grid.Column>
                </Grid.Row>
                {
                    hasStringTrue(schoolDirectory[0].has_parent_signature) ?
                        user.signature ?
                            <Grid.Row>
                                <Grid.Column computer={16} tablet={16} mobile={16}>
                                    <img src={user.signature} alt="parent-signature" />
                                </Grid.Column>
                            </Grid.Row> : '' : ''
                }
                {/* <Grid.Row>
                    <Grid.Column computer={16} tablet={16} mobile={16}>
                        <strong>Comments:</strong>
                        <span className="ml-5">{schoolDirectory[0].comment}</span>
                    </Grid.Column>
                </Grid.Row> */}
                <Grid.Row>
                    <Grid.Column computer={5} tablet={5} mobile={16} >
                        <strong>Date</strong>
                        <span className="ml-5">{moment(schoolDirectory[0].updatedAt).format('YYYY/MM/DD')}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} />
                    <Grid.Column computer={5} />
                </Grid.Row>
            </div>
        </div>
    )
}

