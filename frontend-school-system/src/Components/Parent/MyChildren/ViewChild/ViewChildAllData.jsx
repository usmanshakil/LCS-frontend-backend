import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import moment from 'moment';
import ReactToPrint from "react-to-print";
// css
import './ViewChild.css';
import './print.css';

function hasTrue(value) {
    return value === true || value === 1 ? "Yes" : "No"
}

//routing to edit detail page
function openHomePage(event, props) {
    props.history.push({ pathname: '/home' })
}

export function ViewChildAllData(props) {
    if (props.location.state === undefined) {
        return (<Container className="main-layout-height mt-5rem">
            <div className="description text-center">
                <i className="huge icons"><i aria-hidden="true" className="red circle outline big icon"></i>
                    <i aria-hidden="true" className="red exclamation icon"></i></i>
                <p className="modal-descripion">Something went wrong</p></div>
            <div className="w-100 text-center mt-5rem">
                <button className="ui green button" onClick={(event) => openHomePage(event, props)}>Go Back</button>
            </div>
        </Container>)
    } else { 
        let { childAllInfo, loginUserInfo } = props.location.state, { first_name,
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
        } = childAllInfo,
            { role_id } = loginUserInfo,
            childFulName = first_name + ' ' + last_name,
            fullPackageRef = React.createRef(),
            emergencyCardRef = React.createRef(),
            offsiteActivityRef = React.createRef();
        window.scrollTo(0, 0);
        return (
            <div className={`ui container main-layout-height mt-5rem view-student-page-print theme-${role_id}-border p-r ppr`} id="childReport">
                <div className={`view-student-page-print  p-r`} >
                    <div className="ui grid">
                        <div className="row">
                            <div className="five wide computer sixteen wide mobile five wide tablet column">
                                <h2>Details</h2>
                            </div>
                            <div className="two wide computer two wide tablet column" />
                            <div className="eight wide computer sixteen wide mobile eight wide tablet column view-child">
                                {/* {schoolDirectory.length ? */}
                                <div className="ui buttons button-group">
                                    <ReactToPrint
                                        copyStyles={true}
                                        trigger={() =>
                                            <button className="ui button">Emergency Card</button>
                                        }
                                        content={() => emergencyCardRef.current}
                                        pageStyle="@page { size: 0.9in 0.9in,
                                                                     page-break-before:auto,
                                                                                 page-break-after:auto,
                                                             box-decoration-break:slice
                                                                             }"
                                    />
                                    <ReactToPrint
                                        copyStyles={true}
                                        trigger={() =>
                                            <button className="ui button">Offsite Activity Permission</button>
                                        }
                                        content={() => offsiteActivityRef.current}
                                        pageStyle="@page { size: 0.9in 0.9in,
                                                                     page-break-before:auto,
                                                                          page-break-after:auto,
                                                                  box-decoration-break:slice
                                                     }"
                                    />
                                    <ReactToPrint
                                        copyStyles={true}
                                        trigger={() =>
                                            <button className="ui button">Full Package</button>
                                        }
                                        content={() => fullPackageRef.current}
                                        documentTitle="Full Package"
                                        pageStyle="@page { size: 0.9in 0.9in,
                                        page-break-before:auto,
                                         page-break-after:auto,
                                         box-decoration-break:slice
                                        }"
                                    />
                                </div>
                                {/* : ''} */}
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
                                <strong>Birth Date:</strong><span className="ml-5">{moment(birth_date).format('MM/DD/YYYY')}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="five wide computer sixteen wide mobile five wide tablet column">
                                <strong>Birth Place:</strong> <span className="ml-5">{birth_place}</span>
                            </div>
                            <div className="five wide computer sixteen wide mobile five wide tablet column">
                                <strong>Admission Date:</strong><span className="ml-5">{moment(admission_date).format('MM/DD/YYYY')}</span>
                            </div>
                            <div className="five wide computer sixteen wide mobile five wide tablet column">
                                <strong>Address:</strong><span className="ml-5 address-box">{address}</span>
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
                {parentInfo.length ? <Parent1Info parentInfo={parentInfo} role_id={role_id} /> : ''}
                {parentInfo.length === 2 ? <Parent2Info parentInfo={parentInfo} role_id={role_id} /> : ''}
                {emergencyInfo.length ? <EmergencyInfoOne emergencyInfo={emergencyInfo} role_id={role_id} /> : ''}
                {emergencyInfo.length === 2 ? <EmergencyInfoTwo emergencyInfo={emergencyInfo} role_id={role_id} /> : ''}
                {medicalInfo.length ? <MedicalInfo medicalInfo={medicalInfo} user={user} role_id={role_id} /> : ''}
                {devReport.length ? <DevReport devReport={devReport} role_id={role_id} /> : ''}
                {healthReport.length ? <HealthReport healthReport={healthReport} role_id={role_id} /> : ''}
                {eatingHabitReport.length ? <EatingHabitReport eatingHabitReport={eatingHabitReport} role_id={role_id} /> : ''}
                {toiletHabitReport.length ? <ToiletHabitReport toiletHabitReport={toiletHabitReport} role_id={role_id} /> : ''}
                {sleepingHabitReport.length ? <SleepingHabitReport sleepingHabitReport={sleepingHabitReport} role_id={role_id} /> : ''}
                {socialRelationshipReport.length ? <SocialRelationshipReport socialRelationshipReport={socialRelationshipReport} role_id={role_id} /> : ''}
                {dailyScheduleReport.length ? <DailyScheduleReport dailyScheduleReport={dailyScheduleReport} user={user} role_id={role_id} /> : ''}
                {parentAgreement.length ? <ParentAgreement parentAgreement={parentAgreement} childFulName={childFulName} user={user} role_id={role_id} /> : ''}
                {authorizationAndConsent.length ? <AuthorizationAndConsent authorizationAndConsent={authorizationAndConsent} user={user} role_id={role_id} /> : ''}
                {localTripPermission.length ? <LocalTripPermission localTripPermission={localTripPermission} user={user} role_id={role_id} /> : ''}
                {sunscreenPermission.length ? <SunscreenPermission sunscreenPermission={sunscreenPermission} user={user} role_id={role_id} /> : ''}
                {toothBrushingInformation.length ? <ToothBrushingInformation toothBrushingInformation={toothBrushingInformation} user={user} role_id={role_id} /> : ''}
                {photoRelease.length ? <PhotoRelease photoRelease={photoRelease} user={user} role_id={role_id} /> : ''}
                {transportAuthority.length ? <TransportAuthority transportAuthority={transportAuthority} user={user} role_id={role_id} /> : ''}
                {schoolDirectory.length ? <SchoolDirectory childAllInfo={childAllInfo} role_id={role_id} /> : ''}

                {/* CHILD PRINT REPORTS */}
                <div className="w-100 hide-print" >
                    <div ref={fullPackageRef}>
                        <PrintChildBasicInformation {...props} />
                        <PrintDevReport {...props} />
                        {parentAgreement.length ? <PrintParentAgreement parentAgreement={parentAgreement} childFulName={childFulName} user={user} role_id={role_id} /> : ''}
                        {authorizationAndConsent.length ? <PrintAuthorizationAndConsent childAllInfo={childAllInfo} /> : ''}
                        {localTripPermission.length ? <PrintLocalTripPermission childAllInfo={childAllInfo} /> : ''}
                        {sunscreenPermission.length ? <PrintSunscreenPermission childAllInfo={childAllInfo} /> : ''}
                        {toothBrushingInformation.length ? <PrintToothBrushingInformation {...props} /> : ''}
                        {photoRelease.length ? <PrintPhotoRelease photoRelease={photoRelease} user={user} role_id={role_id} childFulName={childFulName} parentInfo={parentInfo} /> : ''}
                        {transportAuthority.length ? <PrintTransportAuthority transportAuthority={transportAuthority} user={user} role_id={role_id} childFulName={childFulName} /> : ''}
                        {schoolDirectory.length ? <PrintSchoolDirectory childAllInfo={childAllInfo} /> : ''}
                        <PrintSupplyList />
                        <PrintSnowStorming />
                    </div>
                </div>
                <div className="w-100 hide-print" >
                    {emergencyInfo.length ?
                        <div ref={emergencyCardRef}>
                            <PrinEmergencyCard {...props} />
                        </div>
                        : ''}
                    <div ref={offsiteActivityRef}>
                        <PrintOffsitePermission {...props} />
                    </div>
                </div>
            </div>

        )
    }
}

function hasStringTrue(value) {
    return (value === "true" || value === true) ? true : false
}

function Parent1Info(props) {
    let { parentInfo } = props;
    return (
        <div className={`mt-2rem view-student-page-print p-r page-break`} >
            <div className="ui grid" >
                <Grid.Row className="text-center">
                    <Grid.Column computer={16} mobile={16} tablet={16}>
                        <h4>Parent 1 Information </h4>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong> P1 First Name:</strong><span className="ml-5">{parentInfo[0].first_name}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>P2 Last Name:</strong><span className="ml-5">{parentInfo[0].last_name}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Phone 1:</strong><span className="ml-5">{parentInfo[0].phone1}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Phone 2:</strong><span className="ml-5">{parentInfo[0].phone2}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Email 1:</strong><span className="ml-5">{parentInfo[0].email1}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Address:</strong><span className="ml-5 address-box">{parentInfo[0].address}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>City:</strong><span className="ml-5">{parentInfo[0].city}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>State:</strong><span className="ml-5">{parentInfo[0].state}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Zip Code:</strong><span className="ml-5">{parentInfo[0].zip_code}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Business Name:</strong><span className="ml-5">{parentInfo[0].business_name}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Business Address:</strong><span className="ml-5 address-box">{parentInfo[0].business_address}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Work start time:</strong><span className="ml-5">{parentInfo[0].work_start_time}</span>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Work end time:</strong><span className="ml-5">{parentInfo[0].work_end_time}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Bussiness Phone:</strong><span className="ml-5">{parentInfo[0].business_phone}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                    </Grid.Column>
                </Grid.Row>
            </div>
        </div>

    )
}

function Parent2Info(props) {
    let { parentInfo } = props;
    return (
        <div className={`mt-5rem view-student-page-print page-break p-r`} >
            <div className="ui grid " >
                <Grid.Row className="text-center">
                    <Grid.Column computer={16} mobile={16} tablet={16}>
                        <h4>Parent 2 Information</h4>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong> P1 First Name:</strong><span className="ml-5">{parentInfo[1].first_name}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>P2 Last Name:</strong><span className="ml-5">{parentInfo[1].last_name}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Phone 1:</strong><span className="ml-5">{parentInfo[1].phone1}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Phone 2:</strong><span className="ml-5">{parentInfo[1].phone2}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Email 1:</strong><span className="ml-5">{parentInfo[1].email1}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Address:</strong><span className="ml-5 address-box">{parentInfo[1].address}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>City:</strong><span className="ml-5">{parentInfo[1].city}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>State:</strong><span className="ml-5">{parentInfo[1].state}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Zip Code:</strong><span className="ml-5">{parentInfo[1].zip_code}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Business Name:</strong><span className="ml-5">{parentInfo[1].business_name}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Business Address:</strong><span className="ml-5 address-box">{parentInfo[1].business_address}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Work start time:</strong><span className="ml-5">{parentInfo[1].work_start_time}</span>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Work end time:</strong><span className="ml-5">{parentInfo[1].work_end_time}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Bussiness Phone:</strong><span className="ml-5">{parentInfo[1].business_phone}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                    </Grid.Column>
                </Grid.Row>
            </div>
        </div>

    )
}

function EmergencyInfoOne(props) {
    let { emergencyInfo } = props;

    return (
        <div className={`mt-5rem view-student-page-print page-break p-r`} >

            <div className="ui grid">
                <Grid.Row className="text-center">
                    <Grid.Column computer={16} mobile={16} tablet={16}>
                        <div className="admin-mobile-page-heading ">
                            <h4 className="ui header">IF PARENTS CANNOT BE CONTACTED, NOTIFY,<br />
                    Emergency Contact 1 Information (should be different from Parent)</h4>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong> First Name:</strong><span className="ml-5">{emergencyInfo[0].first_name}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Last Name:</strong><span className="ml-5">{emergencyInfo[0].last_name}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Phone 1:</strong><span className="ml-5">{emergencyInfo[0].phone1}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Phone 2:</strong><span className="ml-5">{emergencyInfo[0].phone2}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Email 1:</strong><span className="ml-5">{emergencyInfo[0].email1}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Address:</strong><span className="ml-5 address-box">{emergencyInfo[0].address}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>City:</strong><span className="ml-5">{emergencyInfo[0].city}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>State:</strong><span className="ml-5">{emergencyInfo[0].state}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Zip Code:</strong><span className="ml-5">{emergencyInfo[0].zip_code}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Relationship:</strong><span className="ml-5">{emergencyInfo[0].relationship}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Emergency release:</strong><span className="ml-5">{emergencyInfo[0].city}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                    </Grid.Column>
                </Grid.Row>
            </div>
        </div>
    )
}

function EmergencyInfoTwo(props) {
    let { emergencyInfo } = props;

    return (
        <div className={`mt-5rem view-student-page-print page-break p-r`} >
            <div className="ui grid" >
                <Grid.Row className="text-center">
                    <Grid.Column computer={16} mobile={16} tablet={16}>
                        <div className="admin-mobile-page-heading ">
                            <h4 className="ui header">Emergency Contact 2 Information (should be different from Parent)</h4>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong> First Name:</strong><span className="ml-5">{emergencyInfo[1].first_name}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Last Name:</strong><span className="ml-5">{emergencyInfo[1].last_name}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Phone 1:</strong><span className="ml-5">{emergencyInfo[1].phone1}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Phone 2:</strong><span className="ml-5">{emergencyInfo[1].phone2}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Email 1:</strong><span className="ml-5">{emergencyInfo[1].email1}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Address:</strong><span className="ml-5 address-box">{emergencyInfo[1].address}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>City:</strong><span className="ml-5">{emergencyInfo[1].city}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>State:</strong><span className="ml-5">{emergencyInfo[1].state}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Zip Code:</strong><span className="ml-5">{emergencyInfo[1].zip_code}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Relationship:</strong><span className="ml-5">{emergencyInfo[1].relationship}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Emergency release:</strong><span className="ml-5">{emergencyInfo[1].city}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Emergency release:</strong><span className="ml-5">{emergencyInfo[1].city}</span>
                    </Grid.Column>
                </Grid.Row>
            </div>
        </div>

    )
}

function MedicalInfo(props) {
    let { medicalInfo, user } = props;
    return (
        <div className={`mt-5rem view-student-page-print page-break p-r`} >
            <div className="ui grid" >
                <Grid.Row className="text-center">
                    <Grid.Column computer={16} mobile={16} tablet={16}>
                        <div className="admin-mobile-page-heading ">
                            <h4>MEDICAL INFORMATION</h4>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong> Doctor Name:</strong><span className="ml-5">{medicalInfo[0].doctor_name}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Doctor Phone:</strong><span className="ml-5">{medicalInfo[0].doctor_phone}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Doctor Email:</strong><span className="ml-5">{medicalInfo[0].doctor_email}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Primary Language:</strong><span className="ml-5">{medicalInfo[0].doctor_primary_language}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Insurance Carrier:</strong><span className="ml-5">{medicalInfo[0].doctor_insurance_carrier}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Insurance Number:</strong><span className="ml-5">{medicalInfo[0].doctor_insurance_number}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Last Physical Date:</strong><span className="ml-5">{moment(medicalInfo[0].last_physical_date).format('MM/DD/YYYY')}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Lead Screen Date:</strong><span className="ml-5">{moment(medicalInfo[0].lead_screen_date).format('MM/DD/YYYY')}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Immunizations:</strong><span className="ml-5">{moment(medicalInfo[0].immunizations).format('MM/DD/YYYY')}</span>
                    </Grid.Column>
                </Grid.Row>
                {medicalInfo[0].has_allergy === "yes" ?
                    <Grid.Row>
                        <Grid.Column computer={5} mobile={16} tablet={5}>
                            <strong>Allergies:</strong><span className="ml-5 address-box">{medicalInfo[0].allergies}</span>
                        </Grid.Column>
                        <Grid.Column computer={5} mobile={16} tablet={5}>
                            <strong>Date of Doctor Letter  :</strong><span className="ml-5">{medicalInfo[0].date_of_doctor_letter}</span>
                        </Grid.Column>
                        <Grid.Column computer={5} mobile={16} tablet={5}>
                            <strong>Medicine Expiration Date  :</strong><span className="ml-5">{medicalInfo[0].medicine_expiration_date}</span>
                        </Grid.Column>
                    </Grid.Row>
                    : ""
                }

                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Gender:</strong><span className="ml-5">{medicalInfo[0].gender}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Height (inches):</strong><span className="ml-5">{medicalInfo[0].height}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Weight (pounds):</strong><span className="ml-5">{medicalInfo[0].weight}</span>
                    </Grid.Column>
                </Grid.Row>
                {medicalInfo[0].has_allergy === "yes" ?
                    <React.Fragment>
                        <Grid.Row>
                            <Grid.Column computer={5} mobile={16} tablet={5}>
                                <strong>Eye Color:</strong><span className="ml-5">{medicalInfo[0].eye_color}</span>
                            </Grid.Column>
                            <Grid.Column computer={5} mobile={16} tablet={5}>
                                <strong>Hair Color:</strong><span className="ml-5">{medicalInfo[0].hair_color}</span>
                            </Grid.Column>
                            <Grid.Column computer={5} mobile={16} tablet={5}>
                                <strong>Race:</strong><span className="ml-5">{medicalInfo[0].race}</span>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column computer={5} mobile={16} tablet={5}>
                                <strong>Identity Marks:</strong><span className="ml-5 address-box">{medicalInfo[0].identity_marks}</span>
                            </Grid.Column>
                            <Grid.Column computer={5} mobile={16} tablet={5}>
                            </Grid.Column>
                        </Grid.Row>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Grid.Row>

                            <Grid.Row><Grid.Column computer={5} mobile={16} tablet={5}>
                                <strong>Allergies:</strong><span className="ml-5 address-box">Child has no Allergies</span>
                            </Grid.Column>
                            </Grid.Row>
                            <Grid.Column computer={5} mobile={16} tablet={5}>
                                <strong>Eye Color:</strong><span className="ml-5">{medicalInfo[0].eye_color}</span>
                            </Grid.Column>
                            <Grid.Column computer={5} mobile={16} tablet={5}>
                                <strong>Hair Color:</strong><span className="ml-5">{medicalInfo[0].hair_color}</span>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column computer={5} mobile={16} tablet={5}>
                                <strong>Race:</strong><span className="ml-5">{medicalInfo[0].race}</span>
                            </Grid.Column>
                            <Grid.Column computer={5} mobile={16} tablet={5}>
                                <strong>Identity Marks:</strong><span className="ml-5 address-box">{medicalInfo[0].identity_marks}</span>
                            </Grid.Column>
                            <Grid.Column computer={5} mobile={16} tablet={5}>
                            </Grid.Column>
                        </Grid.Row>
                    </React.Fragment>
                }

                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Add Child to Directory:</strong><span className="ml-5">{hasTrue(medicalInfo[0].add_child_to_directory)}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Add Parent1 to Directory:</strong><span className="ml-5">{hasTrue(medicalInfo[0].add_parent_to_directory)}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Add Parent2 to Directory:</strong><span className="ml-5">{hasTrue(medicalInfo[0].add_parent2_to_directory)}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={16} mobile={16} tablet={16}>
                        <CheckBoxField checked={hasTrue(medicalInfo[0].has_signature_checked)} text="This is a signature checkbox verifying the information entered above is correct and complete. On the printed forms your signature will be included" />
                    </Grid.Column>
                </Grid.Row>
                <div className="w-100 flex-content mt-2rem">
                    <div className="w-50 flex-content ">
                        <strong >Signature</strong>
                        {
                            hasStringTrue(medicalInfo[0].has_signature_checked) ?
                                user.signature ?
                                    <div className="w-50 ">
                                        {user.signature === '' ? '' :
                                            <img src={user.signature} alt="signature" className="w-100" />}
                                    </div>
                                    : '' : ''
                        }
                    </div>
                    <div className="w-50 flex-content">
                        <div className="w-50 ">
                            <strong>Date:</strong> <span className="border-bottom">{medicalInfo.length ? moment(user.updated_at).format('MM/DD/YYYY') : ''}</span>
                        </div>
                    </div>
                </div>
                {/* <Grid.Row>
                    <Grid.Column computer={16} mobile={16} tablet={16}>
                        <strong>Date:</strong><span className="ml-5">{moment(medicalInfo[0].createdAt).format("MM/DD/YYYY")}</span>
                    </Grid.Column>
                </Grid.Row> */}
            </div>
        </div>
    )
}

function DevReport(props) {
    let { devReport } = props;
    return (
        <div className={`mt-5rem view-student-page-print page-break p-r`}>

            <div className="ui grid" >
                <Grid.Row className="text-center">
                    <Grid.Column computer={16} mobile={16} tablet={16}>
                        <div className="admin-mobile-page-heading ">
                            <h4>DEVELOPMENTAL HISTORY </h4>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Age began sitting:</strong>
                        <span className="ml-5">{devReport[0].age_began_sitting}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>crawling:</strong>
                        <span className="ml-5">{devReport[0].crawling}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>walking:</strong>
                        <span className="ml-5">{devReport[0].walking}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>talking:</strong>
                        <span className="ml-5">{devReport[0].talking}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Does your child pull up?</strong>
                        <span className="ml-5">{devReport[0].has_child_pull_up}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Crawl?</strong>
                        <span className="ml-5">{devReport[0].has_child_crawling}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Walk with support?</strong>
                        <span className="ml-5">{devReport[0].has_child_walk_with_support}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Any speech difficulties?</strong>
                        <span className="ml-5">{devReport[0].has_speech_difficulties}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Special words to describe needs:</strong>
                        <span className="ml-5">{devReport[0].special_words_to_describe}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Language spoken at home:</strong>
                        <span className="ml-5">{devReport[0].language_spoken_at_home}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Any history of colic?</strong>
                        <span className="ml-5">{devReport[0].has_history_of_colics}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Does your child use pacifier or suck thumb?</strong>
                        <span className="ml-5">{devReport[0].has_child_use_pacifier_or_sucks_thumbs}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>When?</strong>
                        <span className="ml-5">{devReport[0].when_child_use_pacifier_or_sucks_thumbs}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Does your child have a fussy time?</strong>
                        <span className="ml-5">{devReport[0].has_child_have_fussy_time}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>When?</strong>
                        <span className="ml-5">{devReport[0].when_child_have_fussy_time}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={16} mobile={16} tablet={16}>
                        <strong>Identity Marks:</strong><span className="ml-5">{devReport[0].how_parent_handle_time}</span>
                    </Grid.Column>
                </Grid.Row>
            </div>
        </div>
    )
}

function HealthReport(props) {
    let { healthReport } = props;

    return (
        <div className={`mt-5rem view-student-page-print page-break p-r`}>
            <div className="ui grid" >
                <Grid.Row className="text-center">
                    <Grid.Column computer={16} mobile={16} tablet={16}>
                        <h4>HEALTH</h4>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Any known complications at birth?</strong><span className="ml-5 address-box">{healthReport[0].has_complication_at_birth}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Serious illnesses and/or hospitalizations:</strong><span className="ml-5 address-box">{healthReport[0].serious_illness_hospitalization}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Special physical conditions, disabilities:</strong><span className="ml-5 address-box">{healthReport[0].special_physical_condition}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Allergies i.e. asthma, hay fever, insect bites, medicine, food reactions:</strong><span className="ml-5 address-box">{healthReport[0].allergies}</span>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={5}>
                        <strong>Regular medications:</strong><span className="ml-5 address-box">{healthReport[0].regular_medications}</span>
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
        <div className={`mt-5rem view-student-page-print page-break p-r`}>
            <div className="ui grid" >
                <Grid.Row className="text-center">
                    <Grid.Column computer={16} mobile={16} tablet={16}>
                        <h4>EATING HABITS</h4>
                    </Grid.Column>
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
        <div className={`mt-5rem view-student-page-print page-break p-r`}>
            <div className="ui grid" >
                <Grid.Row className="text-center">
                    <Grid.Column computer={16} mobile={16} tablet={16}>
                        <h4>TOILET HABITS</h4>
                    </Grid.Column>
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
                        <span className="ml-5 break-line">{toiletHabitReport[0].has_parent_use_other}</span>
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
        <div className={`mt-5rem view-student-page-print page-break p-r`}>
            <div className="ui grid" >
                <Grid.Row className="text-center">
                    <Grid.Column computer={16} mobile={16} tablet={16}>
                        <h4>SLEEPING HABITS</h4>
                    </Grid.Column>
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
        <div className={`mt-5rem view-student-page-print page-break p-r`} >
            <div className="ui grid" >
                <Grid.Row className="text-center">
                    <Grid.Column computer={16} mobile={16} tablet={16}>
                        <h4>SOCIAL RELATIONSHIPS</h4>
                    </Grid.Column>
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
    let { dailyScheduleReport, user } = props;
    return (
        <div className={`mt-5rem view-student-page-print page-break p-r`} >
            <div className="ui grid" >
                <Grid.Row className="text-center">
                    <Grid.Column computer={16} mobile={16} tablet={16}>
                        <h4>DAILY SCHEDULE</h4>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column mobile={16} tablet={10} computer={10}>
                        <strong>Is there anything else we should know about your child?</strong>
                        <span className="ml-5">{dailyScheduleReport[0].more_about_child}</span>
                    </Grid.Column>
                    <Grid.Column computer={6} tablet={6} mobile={16}>
                        <strong>Date</strong><span className="ml-5">{moment(user.updated_at).format('MM/DD/YYYY')}</span>
                    </Grid.Column>
                </Grid.Row>
            </div>
        </div>
    )
}

function ParentAgreement(props) {
    let { parentAgreement, user, childFulName } = props;
    return (
        <div className={`mt-5rem view-student-page-print page-break p-r`} >
            <div className="ui grid" >
                <Grid.Row className="text-center">
                    <Grid.Column computer={16} mobile={16} tablet={16}>
                        <h4>PARENT AGREEMENT</h4>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={16} tablet={16} mobile={16}>
                        <CheckBoxField checked={parentAgreement[0].has_parent_agreed_with_policies} text="I have read the Parent Handbook provide by Little Children Schoolhouse.com (please sign in) and agree to follow and adhere to the policies and procedures provide there in." />
                    </Grid.Column>
                </Grid.Row>
                <div className="w-100 flex-content mt-2rem">
                    <div className="w-50 flex-content ">
                        <strong >Student Name : </strong>
                        <span className="border-bottom ml-2">{childFulName}</span>
                    </div>
                </div>
                <div className="w-100 flex-content mt-2rem">

                    <div className="w-50 flex-content ">
                        <strong >Parent’s Signature</strong>
                        {
                            hasStringTrue(parentAgreement[0].has_parent_signature) ?
                                user.signature ?
                                    <div className="w-50 ml-2">
                                        {user.signature === '' ? '' :
                                            <img src={user.signature} alt="signature" className="w-100" />}
                                    </div>
                                    : '' : ''
                        }
                    </div>
                    <div className="w-40 flex-content">
                        <div className="w-50 ">
                            <strong>Date:</strong> <span className="border-bottom">{parentAgreement.length ? moment(user.updated_at).format('MM/DD/YYYY') : ''}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function PhotoRelease(props) {
    let { photoRelease, user } = props;

    return (
        <div className={`mt-5rem view-student-page-print page-break p-r`} >
            <div className="ui grid" >
                <Grid.Row className="text-center">
                    <Grid.Column computer={16} mobile={16} tablet={16}>
                        <div className="admin-mobile-page-heading ">
                            <h4 className="ui header">PHOTOGRAPH RELEASE PERMISSION</h4></div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={16} tablet={16} mobile={16}>
                        <strong>Permission Granted:</strong>
                        <span className="ml-5">{photoRelease[0].has_photo_permission_granted}</span>
                    </Grid.Column>
                </Grid.Row>
                <div className="w-100 flex-content mt-2rem">
                    <div className="w-50 flex-content ">
                        <strong >Parent’s Signature</strong>
                        {
                            hasStringTrue(photoRelease[0].has_parent_signature) ?
                                user.signature ?
                                    <div className="w-50 ">
                                        {user.signature === '' ? '' :
                                            <img src={user.signature} alt="signature" className="w-100" />}
                                    </div>
                                    : '' : ''
                        }
                    </div>
                    <div className="w-50 flex-content">
                        <div className="w-50 ">
                            <strong>Date:</strong> <span className="border-bottom">{photoRelease.length ? moment(user.updated_at).format('MM/DD/YYYY') : ''}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function AuthorizationAndConsent(props) {
    let { authorizationAndConsent, user } = props;
    return (
        <div className={`mt-5rem view-student-page-print page-break p-r`}>
            <div className="ui grid" >
                <Grid.Row className="text-center">
                    <Grid.Column computer={16} mobile={16} tablet={16}>
                        <div className="admin-mobile-page-heading ">
                            <h4 className="ui header">AUTHORIZATION AND CONSENT FORM</h4></div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={16} tablet={16} mobile={16} >
                        <CheckBoxField checked={authorizationAndConsent[0].has_authorize_mychild}
                            text="I hereby authorize LITTLE CHILDREN SCHOOLHOUSE to release my child to the following persons (other than parents)" />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={16} tablet={16} >
                        <CheckBoxField checked={authorizationAndConsent[0].has_authorize_and_consent_agreement}
                            text="I understand that effort will be made to contact me in the event of emergency requiring medical attention for my child However, if I cannot be reached, I hereby authorize LITTLE CHILDRENSCHOOLHOUSE to transport my child the necessary medical treatment. I understand the teachers in the day care center are trained in the basis of First Aid and authorize them to give my child First Aid when appropriate." />
                    </Grid.Column>
                </Grid.Row>

                <div className="w-100 flex-content mt-2rem">
                    <div className="w-50 flex-content ">
                        <strong >Parent’s Signature</strong>
                        {
                            hasStringTrue(authorizationAndConsent[0].has_parent_signature) ?
                                user.signature ?
                                    <div className="w-50 ">
                                        {user.signature === '' ? '' :
                                            <img src={user.signature} alt="signature" className="w-100" />}
                                    </div>
                                    : '' : ''
                        }
                    </div>
                    <div className="w-50 flex-content">
                        <div className="w-50 ">
                            <strong>Date:</strong> <span className="border-bottom">{authorizationAndConsent.length ? moment(user.updated_at).format('MM/DD/YYYY') : ''}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function LocalTripPermission(props) {
    let { localTripPermission, user } = props;

    return (
        <div className={`mt-5rem view-student-page-print page-break p-r`}>
            <div className="ui grid">
                <Grid.Row className="text-center">
                    <Grid.Column computer={16} mobile={16} tablet={16}>
                        <div className="admin-mobile-page-heading ">
                            <h4 className="ui header">LOCAL FIELD TRIP PERMISSION</h4>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={16} tablet={16} mobile={16}>
                        <CheckBoxField checked={localTripPermission[0].has_parent_agreed_for_trip} text="The local field trips include local parks, playgrounds and walks around the neighborhood. I understand the local field trips may be taken daily." />
                    </Grid.Column>
                </Grid.Row>
                <div className="w-100 flex-content mt-2rem">
                    <div className="w-50 flex-content ">
                        <strong >Parent’s Signature</strong>
                        {
                            hasStringTrue(localTripPermission[0].has_parent_signature) ?
                                user.signature ?
                                    <div className="w-50 ">
                                        {user.signature === '' ? '' :
                                            <img src={user.signature} alt="signature" className="w-100" />}
                                    </div>
                                    : '' : ''
                        }
                    </div>
                    <div className="w-50 flex-content">
                        <div className="w-50 ">
                            <strong>Date:</strong> <span className="border-bottom">{localTripPermission.length ? moment(user.updated_at).format('MM/DD/YYYY') : ''}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SunscreenPermission(props) {
    let { sunscreenPermission, user } = props;

    return (
        <div className={`mt-5rem view-student-page-print page-break p-r`} >
            <div className="ui grid">
                <Grid.Row className="text-center">
                    <Grid.Column computer={16} mobile={16} tablet={16}>
                        <div className="admin-mobile-page-heading ">
                            <h4 className="ui header">SUNSCREEN PERMISSION FORM</h4></div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={16} tablet={16} mobile={16}>
                        <CheckBoxField checked={sunscreenPermission[0].has_sunscreen_provided_by_school} text="In the event that my child’s sunscreen is not readily available, my child may use The sunscreen provided by the school usually Coppertone water babies SPF, or Banana Kids/Children SPF 50." />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={16} tablet={16} mobile={16}>
                        <CheckBoxField checked={sunscreenPermission[0].has_child_bring_sunscreen} text="I do not want my child to use any other sunscreen other than the one he or she brings to school." />
                    </Grid.Column>
                </Grid.Row>
                {console.log("I have the following users updated at 1 :", user.updatedAt)}
                {console.log("I have the following users updated at 2 :", user.updated_at)}
                <div className="w-100 flex-content mt-2rem">
                    <div className="w-50 flex-content ">
                        <strong >Parent’s Signature</strong>
                        {
                            hasStringTrue(sunscreenPermission[0].has_parent_signature) ?
                                user.signature ?
                                    <div className="w-50 ">
                                        {user.signature === '' ? '' :
                                            <img src={user.signature} alt="signature" className="w-100" />}
                                    </div>
                                    : '' : ''
                        }
                    </div>
                    <div className="w-50 flex-content">
                        <div className="w-50 ">
                            <strong>Date:</strong> <span className="border-bottom">{sunscreenPermission.length ? moment(user.updated_at).format('MM/DD/YYYY') : ''}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

function ToothBrushingInformation(props) {
    let { toothBrushingInformation, user } = props;
    return (
        <div className={`mt-5rem view-student-page-print page-break p-r`} >
            <div className="ui grid" >
                <Grid.Row className="text-center">
                    <Grid.Column computer={16} mobile={16} tablet={16}>
                        <div className="admin-mobile-page-heading">
                            <h4 className="ui header">TOOTH BRUSHING CONSENT FORM</h4>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    {
                        toothBrushingInformation[0].has_participate_in_toothbrushing === 'no' ?
                            <Grid.Column computer={16} tablet={16} mobile={16}>
                                <strong>No, I do not want my child to participate in the tooth-brushing </strong>
                            </Grid.Column>
                            :
                            <Grid.Column computer={16} tablet={16} mobile={16}>
                                <strong>Yes, I would like my child to participate in the tooth-brushing. </strong>
                            </Grid.Column>
                    }
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={16} tablet={16} mobile={16}>
                        <CheckBoxField checked={toothBrushingInformation[0].has_fluoride} text="My child may use fluoride toothpaste sent from home" />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    {
                        toothBrushingInformation[0].has_school_toothbrushing === 'no' ? <Grid.Column computer={16} tablet={16} mobile={16}>
                            <RadioBoxField value={false} label="In the event that my child does not have any toothpaste my child MAY NOT USE toothpaste provided by the school." />
                        </Grid.Column> :
                            <Grid.Column computer={16} tablet={16} mobile={16}>
                                <RadioBoxField value={true} label="In the event that my child does not have any toothpaste my child MAY USE toothpaste provided by the school." />
                            </Grid.Column>
                    }
                </Grid.Row>
                <div className="w-100 flex-content mt-2rem">
                    <div className="w-50 flex-content ">
                        <strong >Parent’s Signature</strong>
                        {
                            hasStringTrue(toothBrushingInformation[0].has_parent_signature) ?
                                user.signature ?
                                    <div className="w-50 ">
                                        {user.signature === '' ? '' :
                                            <img src={user.signature} alt="signature" className="w-100" />}
                                    </div>
                                    : '' : ''
                        }
                    </div>
                    <div className="w-50 flex-content">
                        <div className="w-50 ">
                            <strong>Date:</strong> <span className="border-bottom">{toothBrushingInformation.length ? moment(user.updated_at).format('MM/DD/YYYY') : ''}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
function CheckBoxField(props) {
    let { checked, text } = props;
    return (
        <div className="ui checkbox">
            <input type="checkbox" checked={checked} disabled={true} />
            <label className="text-bold">{text}</label>
        </div>
    )
}
function RadioBoxField(props) {
    let { value, label } = props;
    return (
        <div className="ui radio checkbox">
            <input type="radio" checked={value} disabled={true} />
            <label className="text-bold">{label}</label>
        </div>
    )
}
function TransportAuthority(props) {
    let { transportAuthority, user } = props;
    return (
        <div className={`mt-5rem view-student-page-print page-break p-r`}>
            <div className="ui grid" >
                <Grid.Row className="text-center">
                    <Grid.Column computer={16} mobile={16} tablet={16}>
                        <div className="admin-mobile-page-heading ">
                            <h4 className="ui header">TRANSPORTATION AUTHORIZATION</h4></div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} tablet={5} mobile={16}>
                        <CheckBoxField checked={transportAuthority[0].has_parent_drop_off} text="PARENT DROP OFF" />
                    </Grid.Column>
                    <Grid.Column computer={5} tablet={5} mobile={16}>
                        <CheckBoxField checked={transportAuthority[0].has_parent_pick_up} text="PARENT PICK UP" />
                    </Grid.Column>
                    <Grid.Column computer={5} tablet={5} mobile={16}>
                        <CheckBoxField checked={transportAuthority[0].has_supervised_walk} text="SUPERVISED WALK" />
                    </Grid.Column>

                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} tablet={5} mobile={16}>
                        <CheckBoxField checked={transportAuthority[0].has_public_private_van} text="PUBLIC/PRIVATE/VAN" />
                    </Grid.Column>
                    <Grid.Column computer={5} tablet={5} mobile={16}>
                        <CheckBoxField checked={transportAuthority[0].has_program_bus_van} text="PROGRAM BUS/VAN" />
                    </Grid.Column>
                    <Grid.Column computer={5} tablet={5} mobile={16}>
                        <CheckBoxField checked={transportAuthority[0].has_contract_van} text="CONTRACT/VAN" />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5} tablet={5} mobile={16}>
                        <CheckBoxField checked={transportAuthority[0].has_private_transport_arranged_by_parent} text="PRIVATE TRANS. ARRANGED BY PARENT" />
                    </Grid.Column>
                    <Grid.Column computer={5} tablet={5} mobile={16}>
                        <CheckBoxField checked={transportAuthority[0].has_other} text="OTHER" />
                    </Grid.Column>

                </Grid.Row>
                <div className="w-100 flex-content mt-2rem">
                    <div className="w-50 flex-content ">
                        <strong >Parent’s Signature</strong>
                        {
                            hasStringTrue(transportAuthority[0].has_parent_signature) ?
                                user.signature ?
                                    <div className="w-50 ">
                                        {user.signature === '' ? '' :
                                            <img src={user.signature} alt="signature" className="w-100" />}
                                    </div>
                                    : '' : ''
                        }
                    </div>
                    <div className="w-50 flex-content">
                        <div className="w-50 ">
                            <strong>Date:</strong> <span className="border-bottom">{transportAuthority.length ? moment(user.updated_at).format('MM/DD/YYYY') : ''}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
function SchoolDirectory(props) {
    let { childAllInfo } = props,
        { parentInfo, schoolDirectory, user } = childAllInfo,
        childFullName = childAllInfo.first_name + ' ' + childAllInfo.last_name,
        parent1FullName = '', parent1Email = '', parent1Phone = '',
        parent2FullName = '', parent2Email = '', parent2Phone = '';
    if (parentInfo.length) {
        parent1FullName = `${parentInfo[0].first_name} ${parentInfo[0].last_name}`;
        parent1Email = parentInfo[0].email1;
        parent1Phone = parentInfo[0].phone1;
        parent2FullName = parentInfo.length > 1 ? `${parentInfo[1].first_name} ${parentInfo[1].last_name}` : '';
        parent2Email = parentInfo.length > 1 ? parentInfo[1].email1 : '';
        parent2Phone = parentInfo.length > 1 ? parentInfo[1].phone1 : '';
    }
    return (
        <div className={`mt-5rem view-student-page-print page-break p-r`} >

            <div className="ui grid" >
                <Grid.Row className="text-center">
                    <Grid.Column computer={16} mobile={16} tablet={16}>
                        <div className="admin-mobile-page-heading"> <h4 className="ui header">SCHOOL DIRECTORY</h4></div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={16} mobile={16} tablet={16}>
                        <table className="ui single line structured center aligned table">
                            <tbody>
                                <tr>
                                    <td>NAME OF CHILD</td>
                                    <td>{childFullName}</td>
                                </tr>
                                <tr>
                                    <td rowSpan="2" >NAME OF PARENTS</td>
                                    <td>{parent1FullName}</td>
                                </tr>
                                <tr>
                                    <td>{parent2FullName}</td>
                                </tr>
                                <tr>
                                    <td rowSpan="2" >EMAIL ADDRESS</td>
                                    <td>{parent1Email}</td>
                                </tr>
                                <tr>
                                    <td>{parent2Email}</td>
                                </tr>
                                <tr>
                                    <td rowSpan="2" >TEL. #</td>
                                    <td>{parent1Phone}</td>
                                </tr>
                                <tr>
                                    <td>{parent2Phone}</td>
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
                        <CheckBoxField checked={schoolDirectory[0].has_parent_information_publish}
                            text="I give permission for my information to be published in the Little Children Schoolhouse Directory and promise to be discreet with the personal information provided." />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={16} mobile={16} tablet={16}>
                        <CheckBoxField checked={schoolDirectory[0].has_parent_wish_to_add_school_directory} text="I do not wish to be a part of the LCSH school directory." />
                    </Grid.Column>
                </Grid.Row>
                <div className="w-100 flex-content mt-2rem">
                    <div className="w-50 flex-content ">
                        <strong >Parent’s Signature</strong>
                        {
                            hasStringTrue(schoolDirectory[0].has_parent_signature) ?
                                user.signature ?
                                    <div className="w-50 ">
                                        {user.signature === '' ? '' :
                                            <img src={user.signature} alt="signature" className="w-100" />}
                                    </div>
                                    : '' : ''
                        }
                    </div>
                    <div className="w-50 flex-content">
                        <div className="w-50 ">
                            <strong>Date:</strong> <span className="border-bottom">{schoolDirectory.length ? moment(user.updated_at).format('MM/DD/YYYY') : ''}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function PrintChildBasicInformation(props) {
    let { childAllInfo, } = props.location.state, { first_name,
        last_name,
        birth_date,
        birth_place,
        admission_date,
        user,
        parentInfo,
        medicalInfo,
        emergencyInfo,
    } = childAllInfo,
        date1 = new Date(admission_date),
        date2 = new Date(birth_date),
        Difference_In_Time = date1.getTime() - date2.getTime(),
        Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24),
        ageAtAdmission = Math.abs(Math.round(Difference_In_Days / 365.25));
    console.log("medicalInfo : " + JSON.stringify(medicalInfo))
    return (
        <div>
            <h2 className="text-center">
                LITTLE CHILDREN SCHOOLHOUSE
                    </h2>
            <div className="w-100  text-right">
                <p>For center use:</p>
            </div>
            <div className="w-100 flex-content">
                <div className="w-50 flex-content">
                    <div className="w-50">
                        <strong>Date of Admission:</strong>
                    </div>
                    <div className="w-50">
                        <span>{moment(admission_date).format('MM/DD/YYYY')}</span>
                    </div>
                </div>
                <div className="w-50 flex-content">
                    <div className="w-50">
                        <strong>Age at Admission:</strong>
                    </div>
                    <div className="w-50">
                        <span>{ageAtAdmission} Years</span>
                    </div>
                </div>
            </div>
            <div className="w-100 flex-content mt-2rem col-gap">
                <div className="w-50 flex-content">
                    <div className="w-50">
                        <strong>Child’s Name:</strong>
                    </div>
                    <div className="w-50">
                        <span>{first_name + ' ' + last_name}</span>
                    </div>
                </div>
                <div className="w-50 flex-content">
                    <div className="w-50">
                        <strong>Primary Language:</strong>
                    </div>
                    <div className="w-50">
                        <span>{medicalInfo.length ? medicalInfo[0].doctor_primary_language : ''} </span>
                    </div>
                </div>
            </div>
            <div className="w-100 flex-content col-gap">
                <div className="w-50 flex-content">
                    <div className="w-50">
                        <strong>Date of Birth:</strong>
                    </div>
                    <div className="w-50">
                        <span>{moment(birth_date).format('MM/DD/YYYY')}</span>
                    </div>
                </div>
                <div className="w-50 flex-content">
                    <div className="w-50">
                        <strong>Place of Birth:</strong>
                    </div>
                    <div className="w-50">
                        <span>{birth_place}</span>
                    </div>
                </div>
            </div>
            <div className="w-100 flex-content mt-2rem col-gap">
                <div className="w-50 flex-content">
                    <div className="w-50">
                        <strong>Child’s Physician / Clinic:</strong>
                    </div>
                    <div className="w-50">
                        <span>{medicalInfo.length ? medicalInfo[0].doctor_name : ''}</span>
                    </div>
                </div>
                <div className="w-50 flex-content">
                    <div className="w-50">
                        <strong>Telephone #:</strong>
                    </div>
                    <div className="w-50">
                        <span>{medicalInfo.length ? medicalInfo[0].doctor_phone : ''} </span>
                    </div>
                </div>
            </div>
            <div className="w-100  mt-2rem col-gap">
                <strong>Other in Family (relationship):</strong>
            </div>
            <div className="w-100 flex-content">
                <div className="w-50 ">
                    <p>{
                        emergencyInfo.length ? emergencyInfo[0].first_name + ' ' + emergencyInfo[0].last_name : ''
                    }</p>
                    <p>{
                        emergencyInfo.length === 2 ? emergencyInfo[1].first_name + ' ' + emergencyInfo[1].last_name : ''
                    }</p>
                </div>
                <div className="w-50 ">
                    <p>{
                        emergencyInfo.length ? emergencyInfo[0].relationship : ''
                    }</p>
                    <p>{
                        emergencyInfo.length === 2 ? emergencyInfo[1].relationship : ''
                    }</p>
                </div>
            </div>
            <div className="w-100  mt-2rem">
                <strong>Parent’s Information:</strong>
            </div>

            <div className="w-100 flex-content print-border">
                <div className="w-50 padding-box border-right">
                    <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Parent1</strong>
                        </div>
                        <div className="w-60">
                            <p>
                                {parentInfo.length ? parentInfo[0].first_name + ' ' + parentInfo[0].last_name : ''}
                            </p>
                        </div>
                    </div>
                    <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Home Address</strong>
                        </div>
                        <div className="w-60 address-box">
                            <p>
                                {
                                    parentInfo.length ? parentInfo[0].address : ''
                                }
                            </p>

                        </div>
                    </div> <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Home Tel. No.</strong>
                        </div>
                        <div className="w-60">
                            <p>
                                {
                                    parentInfo.length ? parentInfo[0].phone1 : ''
                                }
                            </p>

                        </div>
                    </div> <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Name of Workplace</strong>
                        </div>
                        <div className="w-60">
                            <p>
                                {
                                    parentInfo.length ? parentInfo[0].business_name : ''
                                }
                            </p>

                        </div>
                    </div> <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Workplace Address</strong>
                        </div>
                        <div className="w-60 address-box">
                            <p>
                                {
                                    parentInfo.length ? parentInfo[0].business_address : ''
                                }
                            </p>

                        </div>
                    </div> <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Hrs. at Work</strong>
                        </div>
                        <div className="w-60">
                            <p>
                                {
                                    parentInfo.length ? parentInfo[0].work_end_time : ''
                                }
                            </p>

                        </div>
                    </div>
                    <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Tel. No.</strong>
                        </div>
                        <div className="w-60">
                            <p>
                                {
                                    parentInfo.length ? parentInfo[0].business_phone : ''
                                }
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-50 padding-box">
                    <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Parent1</strong>
                        </div>
                        <div className="w-60">
                            <p>
                                {parentInfo.length === 2 ? parentInfo[1].first_name + ' ' + parentInfo[1].last_name : ''}
                            </p>
                        </div>
                    </div>
                    <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Home Address</strong>
                        </div>
                        <div className="w-60 address-box">
                            <p>
                                {
                                    parentInfo.length === 2 ? parentInfo[1].address : ''
                                }
                            </p>

                        </div>
                    </div> <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Home Tel. No.</strong>
                        </div>
                        <div className="w-60">
                            <p>
                                {
                                    parentInfo.length === 2 ? parentInfo[1].phone1 : ''
                                }
                            </p>

                        </div>
                    </div> <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Name of Workplace</strong>
                        </div>
                        <div className="w-60">
                            <p>
                                {
                                    parentInfo.length === 2 ? parentInfo[1].business_name : ''
                                }
                            </p>

                        </div>
                    </div> <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Workplace Address</strong>
                        </div>
                        <div className="w-60 address-box">
                            <p>
                                {
                                    parentInfo.length === 2 ? parentInfo[1].business_address : ''
                                }
                            </p>

                        </div>
                    </div> <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Hrs. at Work</strong>
                        </div>
                        <div className="w-60">
                            <p>
                                {
                                    parentInfo.length === 2 ? parentInfo[1].work_end_time : ''
                                }
                            </p>

                        </div>
                    </div>
                    <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Tel. No.</strong>
                        </div>
                        <div className="w-60">
                            <p>
                                {
                                    parentInfo.length === 2 ? parentInfo[1].business_phone : ''
                                }
                            </p>

                        </div>
                    </div>
                </div>
            </div>
            <div className="w-100  mt-2rem">
                <strong>IF PARENTS CANNOT BE CONTACTED, NOTIFY:</strong>
            </div>
            <div className="w-100 flex-content print-border ">
                <div className="w-50 padding-box border-right">
                    <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Name</strong>
                        </div>
                        <div className="w-60">
                            <p>
                                {emergencyInfo.length ? emergencyInfo[0].first_name + ' ' + emergencyInfo[0].last_name : ''}
                            </p>
                        </div>
                    </div>
                    <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Address</strong>
                        </div>
                        <div className="w-60 address-box">
                            <p>
                                {
                                    emergencyInfo.length ? emergencyInfo[0].address : ''
                                }
                            </p>

                        </div>
                    </div> <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Relationship</strong>
                        </div>
                        <div className="w-60">
                            <p>
                                {
                                    emergencyInfo.length ? emergencyInfo[0].relationship : ''
                                }
                            </p>

                        </div>
                    </div> <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Work tel. No.</strong>
                        </div>
                        <div className="w-60">
                            <p>
                                {
                                    emergencyInfo.length ? emergencyInfo[0].phone1 : ''
                                }
                            </p>

                        </div>
                    </div> <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Home Tel. No.</strong>
                        </div>
                        <div className="w-60">
                            <p>
                                {
                                    emergencyInfo.length ? emergencyInfo[0].phone2 : ''
                                }
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-50 padding-box border-right">
                    <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Name</strong>
                        </div>
                        <div className="w-60">
                            <p>
                                {emergencyInfo.length === 2 ? emergencyInfo[1].first_name + ' ' + emergencyInfo[1].last_name : ''}
                            </p>
                        </div>
                    </div>
                    <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Address</strong>
                        </div>
                        <div className="w-60 address-box">
                            <p>
                                {
                                    emergencyInfo.length === 2 ? emergencyInfo[1].address : ''
                                }
                            </p>

                        </div>
                    </div> <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Relationship</strong>
                        </div>
                        <div className="w-60">
                            <p>
                                {
                                    emergencyInfo.length === 2 ? emergencyInfo[1].relationship : ''
                                }
                            </p>

                        </div>
                    </div> <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Work tel. No.</strong>
                        </div>
                        <div className="w-60">
                            <p>
                                {
                                    emergencyInfo.length === 2 ? emergencyInfo[1].phone1 : ''
                                }
                            </p>

                        </div>
                    </div> <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Home Tel. No.</strong>
                        </div>
                        <div className="w-60">
                            <p>
                                {
                                    emergencyInfo.length === 2 ? emergencyInfo[1].phone2 : ''
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-2rem w-100" >
                <h4>IDENTIFIYING INFORMATION (required by the Office for Children Regulation)</h4>
            </div>
            <div className="w-100 flex-content ">
                <div className="W-33 col-gap">
                    <div className="w-100 flex-content">
                        <div className="w-20">
                            <strong>Eye color:</strong>
                        </div>
                        <div className="w-60">
                            <span >{medicalInfo.length ? medicalInfo[0].eye_color : ''}</span>
                        </div>
                    </div>
                </div>
                <div className="W-33 col-gap">
                    <div className="w-100 flex-content">
                        <div className="w-20"><strong>Hair color:</strong></div>
                        <div className="w-60">
                            <span>{medicalInfo.length ? medicalInfo[0].hair_color : ''}</span>
                        </div>
                    </div>
                </div>
                <div className="W-33 col-gap" >
                    <div className="w-100 flex-content">
                        <div className="w-20"><strong>Sex:</strong></div>
                        <div className="w-60">
                            <span>{medicalInfo.length ? medicalInfo[0].gender : ''}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-100 flex-content col-gap">
                <div className="W-33 col-gap">
                    <div className="w-100 flex-content">
                        <div className="w-20"><strong>Height:</strong></div>
                        <div className="w-60">
                            <span>{medicalInfo.length ? medicalInfo[0].height : ''}</span>
                        </div>
                    </div>
                </div>
                <div className="W-33 col-gap">
                    <div className="w-100 flex-content">
                        <div className="w-20"><strong>Weight:</strong></div>
                        <div className="w-60">
                            <span>{medicalInfo.length ? medicalInfo[0].weight : ''}</span>
                        </div>
                    </div>
                </div>
                <div className="W-33 col-gap">
                    <div className="w-100 flex-content">
                        <div className="w-40"><strong>Race:</strong></div>
                        <div className="w-60">
                            <span>{medicalInfo.length ? medicalInfo[0].race : ''}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-100 flex-content">
                <div className="w-20"><strong>Identifying Mark</strong></div>
                <div className="w-80"><span >{medicalInfo.length ? medicalInfo[0].identity_marks : ''}</span></div>
            </div>
            <div className="w-100 flex-content mt-2rem">
                <div className="w-50 flex-content ">
                    <strong >Signature</strong>
                    {
                        medicalInfo.length ? hasStringTrue(medicalInfo[0].has_signature_checked) ?
                            user.signature ?
                                <div className="w-50 ">
                                    {user.signature === '' ? '' :
                                        <img src={user.signature} alt="signature" className="w-100" />}
                                </div>
                                : '' : '' : ''
                    }
                </div>
                <div className="w-50 flex-content">
                    <div className="w-50 ">
                        <strong>Date:</strong> <span className="border-bottom">{medicalInfo.length ? moment(user.updated_at).format('MM/DD/YYYY') : ''}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function PrintDevReport(props) {
    let { childAllInfo } = props.location.state,
        { first_name, last_name, birth_date, devReport, healthReport, eatingHabitReport, toiletHabitReport,
            sleepingHabitReport, socialRelationshipReport, dailyScheduleReport, user } = childAllInfo;
    return (
        <div>
            <div className="w-100 centered-text page-break	">
                <h2>LITTLE CHILDREN SCHOOLHOUSE</h2>
                <h3> DEVELOPMENTAL HISTORY AND BACKGROUND INFORMATION</h3>
            </div>
            <p className="mt-2rem centered-text">Massachusetts Department of Early Education and Care regulations for licensed child care facilities require this information to be on
file to address the needs of children while in care.</p>
            <div className="w-100 flex-content mt-2rem">
                <div className="w-60">
                    <strong>CHILD'S NAME:</strong>
                </div>
                <div className="w-40">
                    <strong>DATE OF BIRTH:</strong>
                </div>
            </div>
            <div className="w-100 flex-content ">
                <div className="w-50  border-bottom">
                    <span>{first_name + ' ' + last_name}</span>
                </div>
                <div className="w-10" />
                <div className="w-40  border-bottom">
                    <span>{moment(birth_date).format('MM/DD/YYYY')}</span>
                </div>
            </div>
            <p className="mt-1rem centered-text">
                Please provide information for Infants and Toddlers (marked *) as appropriate to the age of your child. If your child is in preschool
                or pre-k please ignore the items with an asterisk.
            </p>
            <div className="w-100 mt-2rem " >
                <h5>DEVELOPMENTAL HISTORY</h5>
            </div>
            <div className="w-100 flex-content">
                <div className="w-25">
                    <strong>Age began sitting:</strong>
                </div><div className="w-25">
                    <strong>crawling:</strong>
                </div><div className="w-25">
                    <strong>walking:</strong>
                </div><div className="w-25">
                    <strong>talking:</strong>
                </div>
            </div>
            <div className="w-100 flex-content">
                <div className="w-25">
                    <span className="border-bottom w-20">{devReport.length ? devReport[0].age_began_sitting : ''} </span>
                </div><div className="w-25">
                    <span className="border-bottom w-20">{devReport.length ? devReport[0].crawling : ''}</span>
                </div><div className="w-25">
                    <span className="border-bottom w-20">{devReport.length ? devReport[0].walking : ''}</span>
                </div><div className="w-25">
                    <span className="border-bottom w-20">{devReport.length ? devReport[0].talking : ''}</span>
                </div>
            </div>
            <div className="w-100 flex-content col-gap">
                <div className="w-25">
                    <strong>Does your child pull up?</strong>
                </div><div className="w-25">
                    <strong>Crawl?:</strong>
                </div><div className="w-25">
                    <strong>Walk with support?</strong>
                </div><div className="w-25">
                    <strong>Any speech difficulties?</strong>
                </div>
            </div>
            <div className="w-100 flex-content">
                <div className="w-25">
                    <span className="border-bottom w-20">{devReport.length ? devReport[0].has_child_pull_up : ''} </span>
                </div><div className="w-25">
                    <span className="border-bottom w-20">{devReport.length ? devReport[0].has_child_crawling : ''}</span>
                </div><div className="w-25">
                    <span className="border-bottom w-20">{devReport.length ? devReport[0].has_child_walk_with_support : ''}</span>
                </div><div className="w-25">
                    <span className="border-bottom w-20">{devReport.length ? devReport[0].has_speech_difficulties : ''}</span>
                </div>
            </div>
            <div className="w-100 col-gap">
                <strong>Special words to describe needs</strong>
            </div>
            <div className="w-100 border-bottom col-gap">
                <p className="col-gap">{devReport.length ? devReport[0].special_words_to_describe : ''}</p>
            </div>

            <div className="w-100 flex-content col-gap">
                <div className="w-50">
                    <strong>Language spoken at home</strong>
                </div><div className="w-50">
                    <strong>Any history of colic?</strong>
                </div>
            </div>
            <div className="w-100 flex-content">
                <div className="w-50">
                    <span className="border-bottom w-20">{devReport.length ? devReport[0].language_spoken_at_home : ''} </span>
                </div>
                <div className="w-50">
                    <span className="border-bottom w-20">{devReport.length ? devReport[0].has_history_of_colics : ''}</span>
                </div>
            </div>

            <div className="w-100 flex-content col-gap">
                <div className="w-50">
                    <strong>Does your child use pacifier or suck thumb?</strong>
                </div><div className="w-50">
                    <strong>*When?</strong>
                </div>
            </div>
            <div className="w-100 flex-content">
                <div className="w-50">
                    <span className="border-bottom w-20">{devReport.length ? devReport[0].has_child_use_pacifier_or_sucks_thumbs : ''}</span>
                </div><div className="w-50">
                    <span className="border-bottom w-20">{devReport.length ? devReport[0].when_child_use_pacifier_or_sucks_thumbs : ''}</span>
                </div>
            </div>

            <div className="w-100 col-gap">
                <strong> How do you handle this time?</strong>
            </div>
            <div className="w-100 border-bottom col-gap">
                <p className="col-gap">{devReport.length ? devReport[0].how_parent_handle_time : ''}</p>
            </div>
            <PrintHealthReport healthReport={healthReport} />
            <PrintChildEatingHabit eatingHabitReport={eatingHabitReport} />

            <div className="w-100 mt-2rem">
                <h4>TOILET HABITS</h4>
            </div>
            <div className="w-100">
                <strong>Are disposable or cloth diapers used?</strong>
            </div>
            <div className="w-100 border-bottom ">
                <span >{toiletHabitReport.length ? toiletHabitReport[0].has_diaper_used : ''}</span>
            </div>
            <div className="w-100 col-gap">
                <strong>Is there a frequent occurrence of diaper rash?</strong>
            </div>
            <div className="w-100 border-bottom ">
                <span >{toiletHabitReport.length ? toiletHabitReport[0].has_diaper_rash_occur : ''}</span>
            </div>
            <div className="w-100 flex-content col-gap">
                <div className="w-25">
                    <strong>Do you use: oil:</strong>
                </div><div className="w-25">
                    <strong>powder:</strong>
                </div><div className="w-25">
                    <strong>lotion:</strong>
                </div><div className="w-25">
                    <strong>other:</strong>
                </div>
            </div>
            <div className="w-100 flex-content">
                <div className="w-25">
                    <span className="border-bottom w-20">{toiletHabitReport.length ? toiletHabitReport[0].has_parent_use_oil : ''} </span>
                </div><div className="w-25">
                    <span className="border-bottom w-20">{toiletHabitReport.length ? toiletHabitReport[0].has_parent_powder : ''}</span>
                </div><div className="w-25">
                    <span className="border-bottom w-20">{toiletHabitReport.length ? toiletHabitReport[0].has_parent_lotion : ''}</span>
                </div><div className="w-25">
                    <span className="border-bottom w-20 break-line">{toiletHabitReport.length ? toiletHabitReport[0].has_parent_use_other : ''}</span>
                </div>
            </div>
            <div className="w-100 flex-content col-gap">
                <div className="w-50">
                    <strong>Are bowel movements regular?</strong>
                </div>
                <div className="w-50">
                    <strong>How many per day?</strong>
                </div>
            </div>
            <div className="w-100 flex-content">
                <div className="w-50">
                    <span className="border-bottom w-20">{toiletHabitReport.length ? toiletHabitReport[0].has_bowel_movement_regular : ''} </span>
                </div>
                <div className="w-50">
                    <span className="border-bottom w-20">{toiletHabitReport.length ? toiletHabitReport[0].how_many_time_bowl_move : ''}</span>
                </div>
            </div>
            <div className="w-100 flex-content col-gap">
                <div className="w-50">
                    <strong>Is there a problem with diarrhea?</strong>
                </div>
                <div className="w-50">
                    <strong>Constipation</strong>
                </div>
            </div>
            <div className="w-100 flex-content">
                <div className="w-50">
                    <span className="border-bottom w-20">{toiletHabitReport.length ? toiletHabitReport[0].has_problem_of_diarrhea : ''} </span>
                </div>
                <div className="w-50">
                    <span className="border-bottom w-20">{toiletHabitReport.length ? toiletHabitReport[0].has_problem_of_constipation : ''}</span>
                </div>
            </div>

            <div className="w-100 col-gap">
                <strong>Has toilet training been attempted?</strong>
            </div>
            <div className="w-100 border-bottom ">
                <span >{toiletHabitReport.length ? toiletHabitReport[0].has_toilet_training : ''}</span>
            </div>
            <div className="w-100 col-gap">
                <strong>Please describe any particular procedure to be used for your child at the center:</strong>
            </div>
            <div className="w-100 border-bottom ">
                <span >{toiletHabitReport.length ? toiletHabitReport[0].particular_procedure_of_child : ''}</span>
            </div>

            <div className="w-100 flex-content col-gap">
                <div className="w-33">
                    <strong>What is used at home? Pottychair?</strong>
                </div>
                <div className="w-33">
                    <strong>Special child seat?</strong>
                </div>
                <div className="w-33">
                    <strong>Regular seat?</strong>
                </div>
            </div>
            <div className="w-100 flex-content ">
                <div className="w-33">
                    <span className="border-bottom w-20">{toiletHabitReport.length ? toiletHabitReport[0].has_child_use_potty_chair : ''} </span>
                </div>
                <div className="w-33">
                    <span className="border-bottom w-20">{toiletHabitReport.length ? toiletHabitReport[0].has_child_use_special_seat : ''}</span>
                </div>
                <div className="w-33">
                    <span className="border-bottom w-20">{toiletHabitReport.length ? toiletHabitReport[0].has_child_use_regular_seat : ''}</span>
                </div>
            </div>
            <div className="w-100 col-gap">
                <strong>How does your child indicate bathroom needs (include special words):</strong>
            </div>
            <div className="w-100 border-bottom ">
                <span >{toiletHabitReport.length ? toiletHabitReport[0].how_child_indicate_bathroom : ''}</span>
            </div><div className="w-100 col-gap">
                <strong>Is your child ever reluctant to use the bathroom?</strong>
            </div>
            <div className="w-100 border-bottom ">
                <span >{toiletHabitReport.length ? toiletHabitReport[0].has_childwilling_to_use_bathroom : ''}</span>
            </div>
            <div className="w-100 col-gap">
                <strong>Does your child have accidents?</strong>
            </div>
            <div className="w-100 border-bottom ">
                <span >{toiletHabitReport.length ? toiletHabitReport[0].has_child_have_accident : ''}</span>
            </div>
            <div className="w-100 mt-2rem page-break">
                <h4>SLEEPING HABITS</h4>
            </div>

            <div className="w-100 flex-content col-gap">
                <div className="w-50">
                    <strong>Does your child sleep in a crib?</strong>
                </div>
                <div className="w-50">
                    <strong>Bed?</strong>
                </div>
            </div>
            <div className="w-100 flex-content">
                <div className="w-50">
                    <span className="border-bottom w-20">{sleepingHabitReport.length ? sleepingHabitReport[0].has_child_sleep_on_crib : ''} </span>
                </div>
                <div className="w-50">
                    <span className="border-bottom w-20">{sleepingHabitReport.length ? sleepingHabitReport[0].has_child_sleep_on_bed : ''}</span>
                </div>
            </div>
            <div className="w-100 col-gap">
                <strong>Does your child become tired or nap during the day (include when and how long)?</strong>
            </div>
            <div className="w-100 border-bottom ">
                <span >{sleepingHabitReport.length ? sleepingHabitReport[0].how_does_child_becometired : ''}</span>
            </div>
            <i className="note">
                Please note: The American Academy of Pediatrics has determined that placing a baby on his/her back to sleep reduces the risk of Sudden Infant Death Syndrome (SIDS). SIDS is
                the sudden and unexplained death of a baby under one year of age. If your child does not usually sleep on his/her back, please contact your pediatrician immediately to discuss
                the best sleeping position for your baby. Please also take the time to discuss your child’s sleeping position with your caregiver.
                </i>
            <div className="w-100 flex-content col-gap">
                <div className="w-50">
                    <strong>When does your child go to bed at night?</strong>
                </div>
                <div className="w-50">
                    <strong>and get up in the morning?</strong>
                </div>
            </div>
            <div className="w-100 flex-content">
                <div className="w-50">
                    <span className="border-bottom w-20">{sleepingHabitReport.length ? sleepingHabitReport[0].has_child_sleep_at_night : ''} </span>
                </div>
                <div className="w-50">
                    <span className="border-bottom w-20">{sleepingHabitReport.length ? sleepingHabitReport[0].has_child_get_up_in_morning : ''}</span>
                </div>
            </div>
            <div className="w-100 col-gap">
                <strong>Describe any special characteristics or needs (stuffed animal, story, mood on waking etc)</strong>
            </div>
            <div className="w-100 border-bottom ">
                <span >{sleepingHabitReport.length ? sleepingHabitReport[0].special_charecterstic_or_need : ''}</span>
            </div>
            <div className="w-100 mt-2rem">
                <h4>SOCIAL RELATIONSHIPS</h4>
            </div>
            <div className="w-100 col-gap">
                <strong>How would you describe your child?</strong>
            </div>
            <div className="w-100 border-bottom ">
                <span >{socialRelationshipReport.length ? socialRelationshipReport[0].child_description_by_parent : ''}</span>
            </div>
            <div className="w-100 flex-content col-gap">
                <div className="w-50">
                    <strong>Previous experience with other children/day care:</strong>
                </div>
                <div className="w-50">
                    <strong>Reaction to strangers:</strong>
                </div>
            </div>
            <div className="w-100 flex-content">
                <div className="w-50">
                    <span className="border-bottom w-20">{socialRelationshipReport.length ? socialRelationshipReport[0].child_description_by_parent : ''} </span>
                </div>
                <div className="w-50">
                    <span className="border-bottom w-20">{socialRelationshipReport.length ? socialRelationshipReport[0].reaction_to_starnger : ''}</span>
                </div>
            </div>
            <div className="w-100">
                <strong>Able to play alone?</strong>
            </div>
            <div className="w-100 border-bottom ">
                <span >{socialRelationshipReport.length ? socialRelationshipReport[0].has_allow_play_alone : ''}</span>
            </div>
            <div className="w-100">
                <strong>Favorite toys and activities:</strong>
            </div>
            <div className="w-100 border-bottom ">
                <span >{socialRelationshipReport.length ? socialRelationshipReport[0].favouraite_toy : ''}</span>
            </div><div className="w-100">
                <strong>Fears (the dark, animals, etc.):</strong>
            </div>
            <div className="w-100 border-bottom ">
                <span >{socialRelationshipReport.length ? socialRelationshipReport[0].child_fear : ''}</span>
            </div><div className="w-100">
                <strong>How do you comfort your child?</strong>
            </div>
            <div className="w-100 border-bottom ">
                <span >{socialRelationshipReport.length ? socialRelationshipReport[0].how_parent_comfort_child : ''}</span>
            </div><div className="w-100">
                <strong>What is the method of behavior management/discipline at home?</strong>
            </div>
            <div className="w-100 border-bottom ">
                <span >{socialRelationshipReport.length ? socialRelationshipReport[0].behaviour_management : ''}</span>
            </div><div className="w-100">
                <strong>What would you like your child to gain from this childcare experience?</strong>
            </div>
            <div className="w-100 border-bottom ">
                <span >{socialRelationshipReport.length ? socialRelationshipReport[0].how_child_gain_experience : ''}</span>
            </div>
            <div className="w-100 mt-2rem">
                <h4>DAILY SCHEDULE</h4>
            </div>
            <div className="w-100">
                <strong>Please describe your child’s schedule on a typical day. For infants, please include awakening, eating, time out of
crib/bed, napping, toilet habits, fussy time, night bedtime, etc.</strong>
            </div>
            <div className="w-100 mt-2rem">
                <strong>Is there anything else we should know about your child?</strong>
            </div>
            <div className="w-100 border-bottom ">
                <span >{dailyScheduleReport.length ? dailyScheduleReport[0].more_about_child : ''}</span>
            </div>
            <div className="w-100 flex-content col-gap">
                <div className="w-50 flex-content ">
                    <strong >Parent’s Signature</strong>
                    <div className="w-50 ">
                        {user.signature === '' ? '' :
                            <img src={user.signature} alt="signature" className="w-100" />}
                    </div>
                </div>
                <div className="w-50 flex-content">
                    <div className="w-50 ">
                        <strong>Date:</strong> <span className="border-bottom">{dailyScheduleReport.length ? moment(user.updated_at).format('MM/DD/YYYY') : ''}</span>
                    </div>

                </div>
            </div>

        </div>
    )
}

function PrintOffsitePermission(props) {
    let { childAllInfo, } = props.location.state, { first_name,
        last_name,
        birth_date,
        parentInfo,
        medicalInfo,
        emergencyInfo,
        healthReport,
        user
    } = childAllInfo,
        fullName = first_name + ' ' + last_name;
    return (
        <div>
            <div className="w-100 text-center col-gap">
                <h3>THE COMMONWEALTH OF MASSACHUSETTS</h3>
            </div>
            <div className="w-100 text-center col-gap">
                <h4>Department of Early Education and Care</h4>
            </div>
            <div className="w-100 text-center">
                <h3>OFF SITE ACTIVITIES PERMISSION FORM</h3>
            </div>
            <div className="w-100 mt-2rem" style={{ marginBottom: ".5rem" }}>
                <strong>Section 1 - Program completes prior to parental consent</strong>
            </div>
            <div className="print-border offsite-box">
                <div className="w-100 flex-content col-gap">
                    <div className="w-40">
                        <strong>Program:</strong>
                    </div>
                    <div className="w-10" />
                    <div className="w-40">
                        <strong>Telephone:</strong>
                    </div>
                </div>
                <div className="w-100 flex-content col-gap">
                    <div className="w-40 border-bottom">
                        <strong>Little Children School House</strong>
                    </div>
                    <div className="w-10" />
                    <div className="w-40 border-bottom">
                        <strong>Primary Language:</strong>
                    </div>
                </div>
                <div className="w-100  col-gap">
                    <strong>Educators responsible for child:</strong>
                </div>
                <div className="w-100 border-bottom col-gap">
                    <strong>Classroom Teachers</strong>
                </div>
                <div className="w-100  col-gap">
                    <strong>Name of off-site location and address:</strong>
                </div>
                <div className="w-100 border-bottom col-gap">
                    <strong>Neighborhood Parks / Library / Places of interest in the community</strong>
                </div>
                <div className="w-100  col-gap">
                    <strong>Date of off-site activity:</strong>
                </div>
                <div className="w-100 border-bottom col-gap">
                    <strong>Daily Morning / Afternoon Walks</strong>
                </div>
                <div className="w-100 flex-content col-gap">
                    <div className="w-40">
                        <strong>Method of Transportation:</strong>
                    </div>
                    <div className="w-10" />
                    <div className="w-40">
                        <strong>Fee associated with activity (if any):</strong>
                    </div>
                </div>
                <div className="w-100 flex-content col-gap">
                    <div className="w-40 border-bottom">
                        <strong>Walking / Strollers</strong>
                    </div>
                    <div className="w-10" />
                    <div className="w-40 border-bottom">
                        <strong>None</strong>
                    </div>
                </div>
                <strong className="mt-2rem"><i className="note">
                    **NOTE** Each child must carry on his/her person the name, address, and telephone number of staff or child care program whenever she/he is off the premises in care
                    of the program.
                </i></strong>
            </div>
            <div className="w-100 mt-2rem" style={{ marginBottom: ".5rem" }}>
                <strong>Section 2 - Parent/Guardian completes prior to off-site activity</strong>
            </div>
            <div className="print-border offsite-box">
                <div className="w-100 flex-content col-gap">
                    <div className="w-40">
                        <strong>Child's Name:</strong>
                    </div>
                    <div className="w-10" />
                    <div className="w-40">
                        <strong>Child's Date of Birth:</strong>
                    </div>
                </div>
                <div className="w-100 flex-content col-gap">
                    <div className="w-40 border-bottom">
                        <span>{fullName}</span>
                    </div>
                    <div className="w-10" />
                    <div className="w-40 border-bottom">
                        <span>{moment(birth_date).format('MM/DD/YYYY')}</span>
                    </div>
                </div>
                <div className="w-100 flex-content col-gap">
                    <div className="w-40">
                        <strong>Parent's/Guardian's Name:</strong>
                    </div>
                    <div className="w-10" />
                    <div className="w-40">
                        <strong>Phone Number:</strong>
                    </div>
                </div>
                <div className="w-100 flex-content col-gap">
                    <div className="w-40 border-bottom">
                        <span>{parentInfo.length ? parentInfo[0].first_name + ' ' + parentInfo[0].last_name : ''}</span>
                    </div>
                    <div className="w-10" />
                    <div className="w-40 border-bottom">
                        <span>{parentInfo.length ? parentInfo[0].phone1 : ''}</span>
                    </div>
                </div>
                <div className="w-100  col-gap">
                    <strong>Name of child's Physician, Address, phone number:</strong>
                </div>
                <div className="w-100 border-bottom col-gap">
                    <span className="paragraph-box">{medicalInfo.length ? medicalInfo[0].doctor_name : ''},{medicalInfo.length ? medicalInfo[0].doctor_phone : ''}</span>
                </div>
                <div className="w-100  col-gap">
                    <strong>Child's allergies, health conditions, or Individual Health Plan:</strong>
                </div>
                <div className="w-100 border-bottom col-gap">
                    <span className="paragraph-box">{healthReport.length ? healthReport[0].allergies : ''}</span>
                </div>
                <div className="w-100  col-gap">
                    <strong>Health Insurance Plan and Policy#:</strong>
                </div>
                <div className="w-100 border-bottom col-gap">
                    <span className="paragraph-box">{medicalInfo.length ? medicalInfo[0].doctor_insurance_carrier : ''},{medicalInfo.length ? medicalInfo[0].doctor_insurance_number : ''}</span>
                </div>
                <div className="w-100 flex-content col-gap">
                    <div className="w-40">
                        <strong>Emergency Contact Name:</strong>
                    </div>
                    <div className="w-10" />
                    <div className="w-40">
                        <strong>Contact#:</strong>
                    </div>
                </div>
                <div className="w-100 flex-content col-gap">
                    <div className="w-40 border-bottom">
                        <span>{emergencyInfo.length ? emergencyInfo[0].first_name + ' ' + emergencyInfo[0].last_name : ''}</span>
                    </div>
                    <div className="w-10" />
                    <div className="w-40 border-bottom">
                        <span>{emergencyInfo.length ? emergencyInfo[0].phone1 : ''}</span>
                    </div>
                </div>
                <div className="w-100 flex-content col-gap mt-2rem">
                    <div className="w-60" />
                    <div className="w-10" />
                    <div className="w-30">
                        <strong>(Date)</strong>
                    </div>
                </div>
                <div className="w-100 flex-content col-gap mt-2rem">
                    <div className="w-60 flex-content">
                        <div className="w-20">
                            <strong>
                                Signature
                                </strong>
                        </div>
                        <div className="w-80 border-bottom">
                            {user.signature === '' ? '' :
                                <img src={user.signature} alt="signature" className="w-90 " />
                            }
                        </div>
                    </div>
                    <div className="w-10" />
                    <div className="w-30 border-bottom">
                        <span>{emergencyInfo.length ? moment(user.created_at).format('MM/DD/YYYY') : ''}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}


function PrinEmergencyCard(props) {
    let { childAllInfo, } = props.location.state, { first_name,
        last_name,
        birth_date,
        birth_place,
        parentInfo,
        medicalInfo,
        emergencyInfo,
        healthReport
    } = childAllInfo;
    return (
        <div>
            <h2 className="text-center">
                LITTLE CHILDREN SCHOOLHOUSE
                    </h2>
            <div className="w-100  text-right">
                <p>Emergency Card:</p>
            </div>
            <div className="w-100 flex-content mt-5rem col-gap">
                <div className="w-50 flex-content">
                    <div className="w-50">
                        <strong>Child’s Name:</strong>
                    </div>
                    <div className="w-50">
                        <span>{first_name + ' ' + last_name}</span>
                    </div>
                </div>
                <div className="w-50 flex-content">
                    <div className="w-50">
                        <strong>Primary Language:</strong>
                    </div>
                    <div className="w-50">
                        <span>{medicalInfo.length ? medicalInfo[0].doctor_primary_language : ''} </span>
                    </div>
                </div>
            </div>
            <div className="w-100 flex-content col-gap">
                <div className="w-50 flex-content">
                    <div className="w-50">
                        <strong>Date of Birth:</strong>
                    </div>
                    <div className="w-50">
                        <span>{moment(birth_date).format('MM/DD/YYYY')}</span>
                    </div>
                </div>
                <div className="w-50 flex-content">
                    <div className="w-50">
                        <strong>Place of Birth:</strong>
                    </div>
                    <div className="w-50">
                        <span>{birth_place}</span>
                    </div>
                </div>
            </div>
            <div className="w-100 flex-content mt-2rem col-gap">
                <div className="w-50 flex-content">
                    <div className="w-50">
                        <strong>Child’s Physician / Clinic:</strong>
                    </div>
                    <div className="w-50">
                        <span>{medicalInfo.length ? medicalInfo[0].doctor_name : ''}</span>
                    </div>
                </div>
                <div className="w-50 flex-content">
                    <div className="w-50">
                        <strong>Telephone #:</strong>
                    </div>
                    <div className="w-50">
                        <span>{medicalInfo.length ? medicalInfo[0].doctor_phone : ''} </span>
                    </div>
                </div>
            </div>
            <div className="w-100  mt-2rem">
                <strong>Parent’s Information:</strong>
            </div>
            <div className="w-100 flex-content print-border">
                <div className="w-50 padding-box border-right">
                    <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Parent1</strong>
                        </div>
                        <div className="w-60">
                            <p>{parentInfo.length ? parentInfo[0].first_name + ' ' + parentInfo[0].last_name : ''}</p>
                        </div>
                    </div>
                    <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Home Address</strong>
                        </div>
                        <div className="w-60">
                            <p className="paragraph-box">{parentInfo.length ? parentInfo[0].address : ''}</p>
                        </div>
                    </div> <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Home Tel. No.</strong>
                        </div>
                        <div className="w-60">
                            <p>{parentInfo.length ? parentInfo[0].phone1 : ''}</p>
                        </div>
                    </div> <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Name of Workplace</strong>
                        </div>
                        <div className="w-60">
                            <p>{parentInfo.length ? parentInfo[0].business_name : ''}</p>
                        </div>
                    </div> <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Workplace Address</strong>
                        </div>
                        <div className="w-60 paragraph-box">
                            <p>{parentInfo.length ? parentInfo[0].business_address : ''}</p>
                        </div>
                    </div> <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Hrs. at Work</strong>
                        </div>
                        <div className="w-60">
                            <p>{parentInfo.length ? parentInfo[0].work_end_time : ''}</p>
                        </div>
                    </div>
                    <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Tel. No.</strong>
                        </div>
                        <div className="w-60">
                            <p>{parentInfo.length ? parentInfo[0].business_phone : ''}</p>
                        </div>
                    </div>
                </div>
                <div className="w-50 padding-box">
                    <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Parent1</strong>
                        </div>
                        <div className="w-60">
                            <p>{parentInfo.length === 2 ? parentInfo[1].first_name + ' ' + parentInfo[1].last_name : ''}</p>
                        </div>
                    </div>
                    <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Home Address</strong>
                        </div>
                        <div className="w-60 address-box"><p>{parentInfo.length === 2 ? parentInfo[1].address : ''}</p></div>
                    </div> <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Home Tel. No.</strong>
                        </div>
                        <div className="w-60">
                            <p>{parentInfo.length === 2 ? parentInfo[1].phone1 : ''}</p>
                        </div>
                    </div> <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Name of Workplace</strong>
                        </div>
                        <div className="w-60"><p>{parentInfo.length === 2 ? parentInfo[1].business_name : ''}</p>
                        </div>
                    </div> <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Workplace Address</strong>
                        </div>
                        <div className="w-60 paragraph-box"><p>{parentInfo.length === 2 ? parentInfo[1].business_address : ''}</p></div>
                    </div> <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Hrs. at Work</strong>
                        </div>
                        <div className="w-60"><p>{parentInfo.length === 2 ? parentInfo[1].work_end_time : ''}</p></div>
                    </div>
                    <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Tel. No.</strong>
                        </div>
                        <div className="w-60">
                            <p>{parentInfo.length === 2 ? parentInfo[1].business_phone : ''}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-100  mt-2rem">
                <strong>IF PARENTS CANNOT BE CONTACTED, NOTIFY:</strong>
            </div>
            <div className="w-100 flex-content print-border ">
                <div className="w-50 padding-box border-right">
                    <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Name</strong>
                        </div>
                        <div className="w-60">
                            <p>{emergencyInfo.length ? emergencyInfo[0].first_name + ' ' + emergencyInfo[0].last_name : ''}</p>
                        </div>
                    </div>
                    <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Address</strong>
                        </div>
                        <div className="w-60 paragraph-box">
                            <p>{emergencyInfo.length ? emergencyInfo[0].address : ''}</p>

                        </div>
                    </div> <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Relationship</strong>
                        </div>
                        <div className="w-60">
                            <p>{emergencyInfo.length ? emergencyInfo[0].relationship : ''}</p>
                        </div>
                    </div> <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Work tel. No.</strong>
                        </div>
                        <div className="w-60">
                            <p>{emergencyInfo.length ? emergencyInfo[0].phone1 : ''}</p>
                        </div>
                    </div> <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Home Tel. No.</strong>
                        </div>
                        <div className="w-60">
                            <p>{emergencyInfo.length ? emergencyInfo[0].phone2 : ''}</p>
                        </div>
                    </div>
                </div>

                <div className="w-50 padding-box border-right">
                    <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Name</strong>
                        </div>
                        <div className="w-60">
                            <p>{emergencyInfo.length === 2 ? emergencyInfo[1].first_name + ' ' + emergencyInfo[1].last_name : ''}</p>
                        </div>
                    </div>
                    <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Address</strong>
                        </div>
                        <div className="w-60 paragraph-box">
                            <p>{emergencyInfo.length === 2 ? emergencyInfo[1].address : ''}</p>
                        </div>
                    </div> <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Relationship</strong>
                        </div>
                        <div className="w-60">
                            <p>{emergencyInfo.length === 2 ? emergencyInfo[1].relationship : ''}</p>
                        </div>
                    </div> <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Work tel. No.</strong>
                        </div>
                        <div className="w-60">
                            <p>{emergencyInfo.length === 2 ? emergencyInfo[1].phone1 : ''}</p>
                        </div>
                    </div> <div className="w-100 flex-content">
                        <div className="w-40">
                            <strong>Home Tel. No.</strong>
                        </div>
                        <div className="w-60">
                            <p>{emergencyInfo.length === 2 ? emergencyInfo[1].phone2 : ''}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-2rem w-100" >
                <h4>
                    IDENTIFIYING INFORMATION (required by the Office for Children Regulation)
                    </h4>
            </div>
            <div className="w-100 flex-content ">
                <div className="W-33 col-gap">
                    <div className="w-100 flex-content">
                        <div className="w-100">
                            <strong>Eye color:</strong>
                            <span className="ml-5">
                                {medicalInfo.length ? medicalInfo[0].eye_color : ''}
                            </span>
                        </div>
                    </div>

                </div>
                <div className="W-33 col-gap">
                    <div className="w-100 flex-content">
                        <div className="w-100">
                            <strong>Hair color:</strong>
                            <span className="ml-5">
                                {medicalInfo.length ? medicalInfo[0].hair_color : ''}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="W-33 col-gap" >
                    <div className="w-100 flex-content">
                        <div className="w-100">
                            <strong>Sex:</strong><span className="ml-5">{medicalInfo.length ? medicalInfo[0].gender : ''}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-100 flex-content col-gap">
                <div className="W-33 col-gap">
                    <div className="w-100 flex-content">
                        <div className="w-100">
                            <strong>Height:</strong>
                            <span className="ml-5">
                                {medicalInfo.length ? medicalInfo[0].height : ''}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="W-33 col-gap">
                    <div className="w-100 flex-content">
                        <div className="w-100">
                            <strong>Weight:</strong>
                            <span className="ml-5">
                                {medicalInfo.length ? medicalInfo[0].weight : ''}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="W-33 col-gap">
                    <div className="w-100 flex-content">
                        <div className="w-100">
                            <strong>Race:</strong>
                            <span className="ml-5">
                                {medicalInfo.length ? medicalInfo[0].race : ''}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-100 flex-content">
                <div className="w-20">
                    <strong>Identifying Mark</strong>
                </div>
                <div className="w-80">
                    <span className="paragraph-box">{medicalInfo.length ? medicalInfo[0].identity_marks : ''}</span>
                </div>
            </div>
            <div className="w-100 mt-2rem">
                <h4>HEALTH</h4>
            </div>
            <div className="w-100 flex-content mt-1rem">
                <div className="w-40">
                    <strong>Any known complications at birth?</strong>
                </div>
                <div className="w-60"><p>{healthReport.length ? healthReport[0].has_complication_at_birth : ''}</p></div>
            </div>
            <div className="w-100 flex-content">
                <div className="w-40">
                    <strong>Serious illnesses and/or hospitalizations:</strong>
                </div>
                <div className="w-60"><p>{healthReport.length ? healthReport[0].serious_illness_hospitalization : ''}</p></div>
            </div>
            <div className="w-100 flex-content">
                <div className="w-40">
                    <strong>Special physical conditions, disabilities:</strong>
                </div>
                <div className="w-60"><p>{healthReport.length ? healthReport[0].special_physical_condition : ''}</p></div>
            </div>
            <div className="w-100 flex-content">
                <strong>Allergies i.e. asthma, hay fever, insect bites, medicine, food reactions:</strong> <p>{healthReport.length ? healthReport[0].allergies : ''}</p>
            </div>
            <div className="w-100 flex-content">
                <div className="w-20">
                    <strong>Regular medications:</strong>
                </div>
                <div className="w-80"><p>{healthReport.length ? healthReport[0].regular_medications : ''}</p></div>
            </div>
        </div>
    )

}


function PrintHealthReport(props) {
    let { healthReport } = props;

    return (
        <React.Fragment>
            <div className="w-100 mt-2rem">
                <h4>HEALTH</h4>
            </div>
            <div className="w-100 col-gap">
                <strong>Any known complications at birth?</strong>
            </div>
            <div className="w-100 border-bottom col-gap">
                <span >{healthReport.length ? healthReport[0].has_complication_at_birth : ''}</span>
            </div>
            <div className="w-100">
                <strong>Serious illnesses and/or hospitalizations:</strong>
            </div>
            <div className="w-100 border-bottom col-gap">
                <span >{healthReport.length ? healthReport[0].serious_illness_hospitalization : ''}</span>
            </div>
            <div className="w-100">
                <strong>Special physical conditions, disabilities:</strong>
            </div>
            <div className="w-100 border-bottom col-gap">
                <span >{healthReport.length ? healthReport[0].special_physical_condition : ''}</span>
            </div>
            <div className="w-100 col-gap">
                <strong>Allergies i.e. asthma, hay fever, insect bites, medicine, food reactions:</strong>
            </div>
            <div className="w-100 border-bottom ">
                <span >{healthReport.length ? healthReport[0].allergies : ''}</span>
            </div>
            <div className="w-100 col-gap">
                <strong>Regular medications:</strong>
            </div>
            <div className="w-100 border-bottom ">
                <span >{healthReport.length ? healthReport[0].regular_medications : ''}</span>
            </div>
        </React.Fragment>
    )
}

function PrintChildEatingHabit(props) {
    let { eatingHabitReport } = props;
    return (
        <React.Fragment>
            <div className="w-100 mt-2rem page-break">
                <h4>EATING HABITS</h4>
            </div>
            <div className="w-100">
                <strong>Special characteristics or difficulties:</strong>
            </div>
            <div className="w-100 border-bottom ">
                <span >{eatingHabitReport.length ? eatingHabitReport[0].special_charecters_or_diffculties : ''}</span>
            </div>
            <div className="w-100">
                <strong>If infant is on a special formula, describe its preparation:</strong>
            </div>
            <div className="w-100 border-bottom ">
                <span >{eatingHabitReport.length ? eatingHabitReport[0].special_formula_prepration_details : ''}</span>
            </div>
            <div className="w-100">
                <strong>Favorite foods:</strong>
            </div>
            <div className="w-100 border-bottom ">
                <span >{eatingHabitReport.length ? eatingHabitReport[0].favouraite_food : ''}</span>
            </div>
            <div className="w-100">
                <strong>Foods refused:</strong>
            </div>
            <div className="w-100 border-bottom ">
                <span >{eatingHabitReport.length ? eatingHabitReport[0].food_refused : ''}</span>
            </div>

            <div className="w-100 flex-content col-gap">
                <div className="w-50">
                    <strong>Is your child fed held in lap?</strong>
                </div>
                <div className="w-50">
                    <strong>High chair?</strong>
                </div>
            </div>
            <div className="w-100 flex-content">
                <div className="w-50">
                    <span className="border-bottom w-20">{eatingHabitReport.length ? eatingHabitReport[0].child_fedon_lap : ''} </span>
                </div>
                <div className="w-50">
                    <span className="border-bottom w-20">{eatingHabitReport.length ? eatingHabitReport[0].high_chair : ''}</span>
                </div>
            </div>
            <div className="w-100 flex-content">
                <div className="w-33">
                    <strong>Does your child eat with spoon?:</strong>
                </div>
                <div className="w-33">
                    <strong>Fork:</strong>
                </div>
                <div className="w-33">
                    <strong>Hands?:</strong>
                </div>
            </div>
            <div className="w-100 flex-content">
                <div className="w-33">
                    <span className="border-bottom w-20">{eatingHabitReport.length ? eatingHabitReport[0].has_child_use_spoon : ''} </span>
                </div>
                <div className="w-33">
                    <span className="border-bottom w-20">{eatingHabitReport.length ? eatingHabitReport[0].has_child_use_fork : ''}</span>
                </div>
                <div className="w-33">
                    <span className="border-bottom w-20">{eatingHabitReport.length ? eatingHabitReport[0].has_child_use_hand : ''}</span>
                </div>
            </div>
        </React.Fragment>
    )
}

function PrintParentAgreement(props) {
    let { parentAgreement, user, childFulName } = props;
    //let childFulName=childAllInfo.first_name + ' ' + childAllInfo.last_name;


    return (
        <div className={`mt-2rem view-student-page-print page-break p-r`} >
            <div className="w-100 text-center">
                <h2>LITTLE CHILDREN SCHOOLHOUSE</h2>
            </div>
            <div className="w-100 text-center mt-5rem underline-text">
                <h2>PARENT AGREEMENT</h2>
            </div>
            <div className="w-100 text-center mt-2rem">
                <CheckBoxField checked={parentAgreement[0].has_parent_agreed_with_policies} text="I have read the Parent Handbook provide by Little Children Schoolhouse.com (please sign in) and agree to follow and adhere to the policies and procedures provide there in." />
            </div>
            {console.log('My Parent agreement[0] has the following data:', parentAgreement[0])}
            {console.log('My Parent agreement has the following data:', parentAgreement)}
            {console.log('My User has the following data:', user)}
            {console.log('My User has the following updated at :', user.updated_at)}
            {console.log('My User has the following default format :', moment().format('YYYY-MM-DDTHH:mm:ss') + '.000Z')}

            <div className="w-100 flex-content mt-2rem">
                <div className="w-40 flex-content ml-2">
                    <strong >Student Name : </strong>
                    <span className="border-bottom">{childFulName}</span>
                </div>
            </div>
            <div className="w-100 flex-content mt-2rem">

                <div className="w-50 flex-content ">
                    <strong >PARENT/GUARDIAN SIGNATURE</strong>
                    {
                        hasStringTrue(parentAgreement[0].has_parent_signature) ?
                            user.signature ?
                                <div className="w-50 ml-2">
                                    {user.signature === '' ? '' :
                                        <img src={user.signature} alt="signature" className="w-100" />}
                                </div>
                                : '' : ''
                    }
                </div>
                <div className="w-50 flex-content">
                    <div className="w-50 ml-2">
                        <strong>Date:</strong> <span className="border-bottom">{parentAgreement.length ? moment(user.updated_at).format('MM/DD/YYYY') : ''}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function PrintAuthorizationAndConsent(props) {
    let { childAllInfo } = props,
        { first_name, last_name, authorizationAndConsent, user, emergencyInfo } = childAllInfo;

    return (
        <div className={`mt-2rem view-student-page-print page-break p-r`}>
            <div className="w-100 text-center">
                <h2>LITTLE CHILDREN SCHOOLHOUSE</h2>
            </div>
            <div className="w-100 text-center mt-5rem underline-text">
                <h2>AUTHORIZATION AND CONSENT FORM</h2>
            </div>

            <div className="w-100 flex-content mt-2rem print-border ">
                <div className="w-20 border-right padding-box">Name of the child:</div>
                <div className="w-80 padding-box">{first_name + ' ' + last_name}</div>
            </div>
            <div className="mt-1rem">
                <CheckBoxField checked={authorizationAndConsent[0].has_authorize_and_consent_agreement} text={`I understand that effort will be made to contact me in the event of emergency requiring medical attention for my child ${first_name} ${last_name}. However, if I cannot be reached, I hereby authorize LITTLE CHILDRENSCHOOLHOUSE to transport my child the necessary medical treatment. I understand the teachers in the day care center are trained in the basis of First Aid and authorize them to give my child First Aid when appropriate.`} />
            </div>
            <div className="w-100 flex-content mt-1rem">
                <div className="w-50 flex-content">
                    <span>Signature</span>
                    {
                        hasStringTrue(authorizationAndConsent[0].has_parent_signature) ?
                            user.signature === '' ? '' :
                                <span><img src={user.signature} alt="signature" className="w-100" /></span> : ''
                    }
                </div>
                <div className="w-50 ml-10">
                    <span>Date:</span>
                    <span className="ml-1">{moment(user.updated_at).format('MM/DD/YYYY')}</span>
                </div>
            </div>
            <div className="mt-2rem w-100">
                <CheckBoxField checked={authorizationAndConsent[0].has_authorize_mychild} text="I hereby authorize LITTLE CHILDREN SCHOOLHOUSE to release my child to the following persons (other than parents)" />
            </div>

            <div className="mt-2rem w-100 flex-content">
                <div className="w-50">
                    <strong>Name</strong>
                </div>
                <div className="w-50">
                    <strong>Relationship</strong>
                </div>
            </div>
            <div className="w-100 border-bottom flex-content">
                <div className="w-50">
                    {emergencyInfo.length ? `${emergencyInfo[0].first_name} ${emergencyInfo[0].last_name}` : ''}
                </div>
                <div className="w-50">
                    {emergencyInfo.length ? emergencyInfo[0].relationship : ''}
                </div>
            </div>
            <div className="w-100 flex-content">
                <div className="w-50"><strong>Address</strong></div>
                <div className="w-50"><strong>Telephone #</strong></div>
            </div>
            <div className="w-100 border-bottom flex-content">
                <div className="w-50 pr-3 ">
                    <p className="address-box">{emergencyInfo.length ? emergencyInfo[0].address : ''}</p>
                </div>
                <div className="w-50">{emergencyInfo.length ? emergencyInfo[0].phone1 : ''}</div>
            </div>
            <div className="mt-2rem w-100 flex-content">
                <div className="w-50"><strong>Name</strong></div>
                <div className="w-50"><strong>Relationship</strong></div>
            </div>
            <div className="w-100 border-bottom flex-content">
                <div className="w-50">
                    {emergencyInfo.length ? `${emergencyInfo[1].first_name} ${emergencyInfo[1].last_name}` : ''}
                </div>
                <div className="w-50">
                    {emergencyInfo.length ? emergencyInfo[1].relationship : ''}
                </div>
            </div>
            <div className="w-100 flex-content">
                <div className="w-50"><strong>Address</strong></div>
                <div className="w-50"><strong>Telephone #</strong></div>
            </div>
            <div className="w-100  flex-content">
                <div className="w-50 border-bottom paragraph-layout">
                    <p className="address-box">{emergencyInfo.length ? emergencyInfo[1].address : ''}</p>
                </div>
                <div className="w-50 border-bottom">
                    {emergencyInfo.length ? emergencyInfo[1].phone1 : ''}
                </div>
            </div>
            <div className="w-100 mt-2rem flex-content">
                <div className="w-50"><strong>Date</strong></div>
            </div>
            <div className="w-100  flex-content">
                <div className="w-50 border-bottom">
                    <strong>{moment().format('MM/DD/YYYY')}</strong>
                </div>
            </div>

        </div>
    )
}

function PrintPhotoRelease(props) {
    let { photoRelease, childFulName, parentInfo, user } = props,
        parent1FullName = parentInfo.length ? `${parentInfo[0].first_name} ${parentInfo[0].last_name}` : '';
    return (
        <div className={`mt-2rem view-student-page-print page-break p-r`} >
            <div className="w-100 text-center">
                <h2>LITTLE CHILDREN SCHOOLHOUSE</h2>
            </div>
            <div className="w-100 text-center mt-5rem">
                <h3>Photograph Release Permission Form</h3>
            </div>
            <div className="w-100 text-center mt-5rem">
                <p>
                    From time to time our school likes to celebrate your child’s work, transition period, developmental achievements, birthdays and
                    celebrations, fun activities in the classroom, and fieldtrips. As a result, images of your child or the students in the class will be sent to
                    you via email or placed on the classroom bulletin’s board. Photographs taken will be used exclusively for Little Children Schoolhouse
                    purposes as stated above.
                </p>
            </div>

            <div className="w-100 flex-content mt-2rem">
                <div className="w-20">
                    <strong>Permission Granted:</strong>
                </div>
                <div className="w-10">
                    {
                        photoRelease[0].has_photo_permission_granted === 'yes' ?
                            <div className="checked check-box" /> : <div className="check-box" />
                    }
                </div>
                <span>Yes</span>
                <div className="w-10">
                    {
                        photoRelease[0].has_photo_permission_granted === 'no' ?
                            <div className="checked"></div> : <div className="check-box" />
                    }
                </div>
                <span>No</span>
            </div>
            <div className="w-100 mt-2rem">
                <strong>Child's Name</strong>
            </div>
            <div className="w-50 border-bottom ">
                <span >{childFulName}</span>
            </div>
            <div className="w-100 col-gap">
                <strong>Parent/Guardian’s Name:</strong>
            </div>
            <div className="w-50 border-bottom ">
                {parent1FullName}
            </div>

            <div className="w-100 flex-content mt-2rem">
                <div className="w-50 flex-content ">
                    <strong >Parent’s Signature</strong>
                    {
                        hasStringTrue(photoRelease[0].has_parent_signature) ?
                            user.signature ?
                                <div className="w-50 ">
                                    {user.signature === '' ? '' :
                                        <img src={user.signature} alt="signature" className="w-100" />}
                                </div>
                                : '' : ''
                    }
                </div>
                <div className="w-50 flex-content">
                    <div className="w-50 ">
                        <strong>Date:</strong> <span className="border-bottom">{photoRelease.length ? moment(user.updated_at).format('MM/DD/YYYY') : ''}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function PrintLocalTripPermission(props) {
    let { childAllInfo } = props,
        { first_name, last_name, localTripPermission, user } = childAllInfo;

    return (
        <div className={`mt-2rem view-student-page-print page-break p-r`}>
            <div className="w-100 text-center">
                <h2>LITTLE CHILDREN SCHOOLHOUSE</h2>
            </div>
            <div className="w-100 text-center mt-2rem underline-text">
                <h3>LOCAL FIELD TRIP PERMISSIONS SLIP</h3>
            </div>
            <div className="w-100  mt-2rem">
                <strong>{`${first_name} ${last_name}`}</strong> has my permission to participate in local fieldtrips.
            </div>
            <div className="w-100  mt-2rem">
                <strong>The local field trips include local parks, playgrounds and walks around the neighborhood. I understand the local field trips may be taken daily.</strong>
            </div>
            <div className="w-100 flex-content mt-2rem">
                <div className="w-50 flex-content ">
                    <strong >Parent’s Signature</strong>
                    {
                        hasStringTrue(localTripPermission[0].has_parent_signature) ?
                            user.signature ?
                                <div className="w-50 ">
                                    {user.signature === '' ? '' :
                                        <img src={user.signature} alt="signature" className="w-100" />}
                                </div>
                                : '' : ''
                    }
                </div>
                <div className="w-50 flex-content">
                    <div className="w-50 ">
                        <strong>Date:</strong> <span className="border-bottom">{localTripPermission.length ? moment(user.updated_at).format('MM/DD/YYYY') : ''}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function PrintTransportAuthority(props) {
    let { transportAuthority, user, childFulName } = props;
    return (
        <div className={`mt-2rem view-student-page-print page-break p-r`}>
            <div className="w-100 text-center">
                <h2>LITTLE CHILDREN SCHOOLHOUSE</h2>
            </div>
            <div className="w-100 text-center mt-2rem">
                <h3>Transportation Authorization</h3>
            </div>
            <div className="w-100 text-center col-gap">
                <h3>THE COMMONWEALTH OF MASSACHUSETTS</h3>
            </div>
            <div className="w-100 text-center col-gap">
                <h3>Department of Early Education and Care</h3>
            </div>

            <div className="w-100 text-center mt-3rem">
                <h3>Small Group and Large Group Transportation Plan and Authorization</h3>
            </div>

            <div className="mt-2rem w-100 flex-content">
                <strong>Child's Name:</strong> <span className="ml-5"> {childFulName}</span>
            </div>

            <div className="mt-2rem w-100 flex-content">
                <strong>MY CHILD WILL ARRIVE AT THE PROGRAM: MY CHILD WILL DEPART FROM THE PROGRAM:</strong>
            </div>

            <div className="mt-2rem w-100">
                <div className="w-100 flex-content">
                    <div className="w-10 border-bottom">
                        {
                            transportAuthority[0].has_parent_drop_off === true ? <div className="checked"></div> : ''
                        }
                    </div>
                    <div className="w-90">
                        <strong>PARENT DROP OFF</strong>
                    </div>
                </div>
                <div className="w-100 flex-content">
                    <div className="w-10 border-bottom">
                        {
                            transportAuthority[0].has_parent_pick_up === true ? <div className="checked"></div> : ''
                        }
                    </div>
                    <div className="w-90 ml-5">
                        <strong>PARENT PICK UP</strong>
                    </div>

                </div><div className="w-100 flex-content">
                    <div className="w-10 border-bottom">
                        {
                            transportAuthority[0].has_supervised_walk === true ? <div className="checked"></div> : ''
                        }
                    </div>
                    <div className="w-90 ml-5">
                        <strong>SUPERVISED WALK</strong>
                    </div>
                </div><div className="w-100 flex-content">
                    <div className="w-10 border-bottom">
                        {
                            transportAuthority[0].has_public_private_van === true ? <div className="checked"></div> : ''
                        }
                    </div>
                    <div className="w-90 ml-5">
                        <strong>PUBLIC/PRIVATE/VAN</strong>
                    </div>

                </div><div className="w-100 flex-content">
                    <div className="w-10 border-bottom">
                        {
                            transportAuthority[0].has_program_bus_van === true ? <div className="checked"></div> : ''
                        }
                    </div>
                    <div className="w-90 ml-5">
                        <strong>PROGRAM BUS/VAN</strong>
                    </div>
                </div>
                <div className="w-100 flex-content">
                    <div className="w-10 border-bottom">
                        {
                            transportAuthority[0].has_contract_van === true ? <div className="checked"></div> : ''
                        }
                    </div>
                    <div className="w-90 ml-5">
                        <strong>CONTRACT/VAN</strong>
                    </div>

                </div><div className="w-100 flex-content">
                    <div className="w-10 border-bottom">
                        {
                            transportAuthority[0].has_private_transport_arranged_by_parent === true ? <div className="checked"></div> : ''
                        }
                    </div>
                    <div className="w-90 ml-5">
                        <strong>PRIVATE TRANS. ARRANGED BY PARENT</strong>
                    </div>

                </div>
                <div className="w-100 flex-content">
                    <div className="w-10 border-bottom">
                        {
                            transportAuthority[0].has_other === true ? <div className="checked"></div> : ''
                        }
                    </div>
                    <div className="w-90 ml-5">
                        <strong>OTHER</strong>
                    </div>
                </div>
            </div>
            <div className="w-100 flex-content mt-2rem">
                <div className="w-50 flex-content ">
                    <strong >Parent’s Signature</strong>
                    {
                        hasStringTrue(transportAuthority[0].has_parent_signature) ?
                            user.signature ?
                                <div className="w-50 ">
                                    {user.signature === '' ? '' :
                                        <img src={user.signature} alt="signature" className="w-100" />}
                                </div>
                                : '' : ''
                    }
                </div>
                <div className="w-50 flex-content">
                    <div className="w-50 ">
                        <strong>Date:</strong> <span className="border-bottom">{transportAuthority.length ? moment(user.updated_at).format('MM/DD/YYYY') : ''}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function PrintSunscreenPermission(props) {
    let { childAllInfo } = props,
        { first_name, last_name, sunscreenPermission, user } = childAllInfo;
    // let { sunscreenPermission, user } = props;

    return (
        <div className={`mt-2rem view-student-page-print page-break p-r`} >

            <div className="w-100 text-center">
                <h2>LITTLE CHILDREN SCHOOLHOUSE</h2>
            </div>
            <div className="w-100 text-center">
                <h3>SUNSCREEN PERMISSION FORM</h3>
            </div>
            <div className="w-100 text-center">
                (Does not apply for infants under 6 months)
            </div>

            <div className="w-100 flex-content mt-2rem">
                <div className="w-80">
                    <strong>Name of child:</strong>
                </div>
                <div className="w-20">
                    <strong>Date:</strong>
                </div>
            </div>
            <div className="w-100 flex-content">
                <div className="w-80 border-bottom">
                    <span>{`${first_name} ${last_name}`} </span>
                </div>
                <div className="w-20 ml-10 border-bottom">
                    <strong>{moment(user.updated_at).format('MM/DD/YYYY')}</strong>
                </div>
            </div>
            <div className="w-80">
                <strong>Name of sunscreen and the SPF Number: Not Applicable</strong>
            </div>
            <div className="w-80 border-bottom">
                <strong>or if not available use</strong>
            </div>
            <p className="mt-2rem">I / we understand that:</p>
            <ul className="col-gap">
                <li>It is the parent’s responsibility to provide a non-expired waterproof sunscreen with a minimum SPF of 30, labeled with the child’s name.</li>
                <li>My child’s care provider will assist by applying sunscreen to bare surfaces including the face, tops of ears and bare shoulder, arms, legs and feet before outdoor activities.</li>
                <li>Sunscreen will not be applied to any broken skin or if skin reaction has been observed. Any skin reaction observed by staff will be report to the parent/guardian.</li>
            </ul>
            <p className="mt-2rem">Special instructions:</p>
            <div className="w-100 flex-content col-gap">
                <CheckBoxField checked={sunscreenPermission[0].has_sunscreen_provided_by_school} text="In the event that my child’s sunscreen is not readily available, my child may use The sunscreen provided by the school usually Coppertone water babies SPF, or Banana Kids/Children SPF 50." />
            </div>
            <div className="w-100 flex-content ">
                <CheckBoxField checked={sunscreenPermission[0].has_child_bring_sunscreen} text="I do not want my child to use any other sunscreen other than the one he or she brings to school." />
            </div>
            {
                hasStringTrue(sunscreenPermission[0].has_parent_signature) ?
                    user.signature ?
                        <div className="w-100 flex-content mt-10rem">
                            <div className="w-20">
                                <strong>Parent’s Signature</strong>
                            </div>
                            <div className="w-80">
                                <img src={user.signature} alt="parent-signature" className="w-100 border-bottom" />
                            </div>
                        </div> : '' : ''
            }
        </div>

    )
}

function PrintToothBrushingInformation(props) {
    let { childAllInfo } = props.location.state, { first_name,
        last_name,
        user,
        toothBrushingInformation,
    } = childAllInfo;

    return (
        <div className={`mt-2rem view-student-page-print page-break p-r`} >
            <div className="w-100 text-center">
                <h2>LITTLE CHILDREN SCHOOLHOUSE</h2>
            </div>
            <div className="w-100 text-center mt-2rem">
                <h3>TOOTH BRUSHING CONSENT FORM</h3>
            </div>
            <div className="w-100 mt-2rem">
                In response to the increasing numbers of young children with significant dental problems, The Department of Early Education and
                Care has instituted a tooth brushing policy. We are hoping that you will allow your child to participate. Children will learn how to brush
                their teeth and the importance of doing so. The student will be supervised to ensure that the process is sanitary.
            </div>
            <div className="w-100 flex-content mt-2rem">
                <div className="w-20"> <strong>CHILD'S NAME</strong></div>
                <div className="w-80 border-bottom"><span>{`${first_name} ${last_name}`}</span></div>
            </div>

            <div className="w-100 flex-content mt-2rem">
                <div className="w-10 border-bottom">{toothBrushingInformation[0].has_participate_in_toothbrushing === 'yes' ? <div className="checked"> </div> : ''}</div>
                <div className="w-90 ml-10">Yes, I would like my child to participate in the tooth-brushing.</div>
            </div>
            <div className="w-100 flex-content">
                <div className="w-10 border-bottom">
                    {
                        toothBrushingInformation[0].has_participate_in_toothbrushing === 'no' ? <div className="checked"> </div> : ''
                    }
                </div>
                <div className="w-90 ml-10">No, I would like my child to participate in the tooth-brushing.</div>
            </div>

            <div className="w-100 mt-2rem ml-10">
                <strong>
                    Please check off your answer below.
                 </strong>
            </div>

            <div className="w-100 flex-content mt-1rem">
                <div className="w-10 border-bottom">
                    {
                        toothBrushingInformation[0].has_fluoride ? <div className="checked"> </div> : ''
                    }
                </div>
                <div className="w-90 ml-10">My child may use fluoride toothpaste sent from home.</div>
            </div>
            <div className="w-100 flex-content">
                <div className="w-10 border-bottom">
                    {
                        toothBrushingInformation[0].has_school_toothbrushing === 'yes' ? <div className="checked"> </div> : ''
                    }
                </div>
                <div className="w-90 ml-10">In the event that my child does not have any toothpaste my child MAY USE toothpaste provided by the school.</div>
            </div>
            <div className="w-100 flex-content">
                <div className="w-10 border-bottom">
                    {
                        toothBrushingInformation[0].has_school_toothbrushing === 'no' ? <div className="checked"> </div> : ''
                    }
                </div>
                <div className="w-90 ml-10">In the event that my child does not have any toothpaste my child MAY NOT USE toothpaste provided by the school.</div>
            </div>
            <div className="w-100 flex-content mt-2rem">
                <div className="w-50 flex-content ">
                    <strong >PARENT/GUARDIAN SIGNATURE</strong>
                    {
                        hasStringTrue(toothBrushingInformation[0].has_parent_signature) ?
                            user.signature ?
                                <div className="w-50 ">
                                    {user.signature === '' ? '' :
                                        <img src={user.signature} alt="signature" className="w-100" />}
                                </div>
                                : '' : ''
                    }
                </div>
                <div className="w-50 flex-content">
                    <div className="w-50 ">
                        <strong>Date:</strong> <span className="border-bottom">{toothBrushingInformation.length ? moment(user.updated_at).format('MM/DD/YYYY') : ''}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function PrintSchoolDirectory(props) {
    let { childAllInfo } = props,
        { parentInfo, schoolDirectory, user } = childAllInfo,
        childFullName = childAllInfo.first_name + ' ' + childAllInfo.last_name,
        parent1FullName = '', parent1Email = '', parent1Phone = '',
        parent2FullName = '', parent2Email = '', parent2Phone = '';
    if (parentInfo.length) {
        parent1FullName = `${parentInfo[0].first_name} ${parentInfo[0].last_name}`;
        parent1Email = parentInfo[0].email1;
        parent1Phone = parentInfo[0].phone1;
        parent2FullName = parentInfo.length > 1 ? `${parentInfo[1].first_name} ${parentInfo[1].last_name}` : '';
        parent2Email = parentInfo.length > 1 ? parentInfo[1].email1 : '';
        parent2Phone = parentInfo.length > 1 ? parentInfo[1].phone1 : '';
    }
    return (
        <div className="view-student-page-print page-break p-r" >
            <div className="w-100 text-center">
                <h2>SCHOOL DIRECTORY FORM</h2>
            </div>
            <table className="ui single line structured center aligned table mt-5rem">
                <tbody>
                    <tr>
                        <td>NAME OF CHILD</td>
                        <td>{childFullName}</td>
                    </tr>
                    <tr>
                        <td rowSpan="2" >NAME OF PARENTS</td>
                        <td>{parent1FullName}</td>
                    </tr>
                    <tr>
                        <td>{parent2FullName}</td>
                    </tr>
                    <tr>
                        <td rowSpan="2" >EMAIL ADDRESS</td>
                        <td>{parent1Email}</td>
                    </tr>
                    <tr>
                        <td>{parent2Email}</td>
                    </tr>
                    <tr>
                        <td rowSpan="2" >TEL. #</td>
                        <td>{parent1Phone}</td>
                    </tr>
                    <tr>
                        <td>{parent2Phone}</td>
                    </tr>
                </tbody></table>

            <ol className="mt-2rem">
                <li>The school directory will be distributed only to the participants.</li>
                <li>The school directory must not be used to solicit business but rather for the purpose it was intended, planning play dates, birthday invites and other celebration, or contacting a class parent.</li>
            </ol>
            <div className="w-100 flex-content mt-2rem">
                <CheckBoxField checked={schoolDirectory[0].has_parent_information_publish} text="I give permission for my information to be published in the Little Children Schoolhouse Directory and promise to be discreet with the personal information provided." />
            </div>
            <div className="w-100 col-gap flex-content">
                <CheckBoxField checked={schoolDirectory[0].has_parent_wish_to_add_school_directory} text="I do not wish to be a part of the LCSH school directory." />
            </div>
            <div className="w-100 flex-content mt-2rem">
                <div className="w-40">
                    <strong>PARENT1 NAME</strong>
                </div>
                <div className="w-10" />
                <div className="w-40">
                    <strong>PARENT2 NAME</strong>
                </div>
            </div>
            <div className="w-100 flex-content col-gap">
                <div className="w-40 border-bottom">
                    <span>{parent1FullName}</span>
                </div>
                <div className="w-10" />
                <div className="w-40 border-bottom">
                    <span>{parent2FullName}</span>
                </div>
            </div>
            <div className="w-100 flex-content col-gap">
                <div className="w-40 ">
                    <strong>DATE</strong>
                </div>
                <div className="w-10" />
                <div className="w-40 ">
                    <strong>Signature</strong>
                </div>
            </div>

            <div className="w-100 flex-content col-gap">
                <div className="w-40">
                    <span>{moment(user.updated_at).format('MM/DD/YYYY')}</span>
                </div>
                <div className="w-10" />
                <div className="w-40">
                    {
                        hasStringTrue(schoolDirectory[0].has_parent_signature) ?
                            user.signature ?
                                <img src={user.signature} alt="parent-signature" className="w-100" /> : '' : ''
                    }
                </div>
            </div>
        </div>
    )
}

function PrintSupplyList() {
    return (
        <div className="view-student-page-print page-break p-r" >
            <div className="w-100 text-center">
                <h2>SCHOOL DIRECTORY FORM</h2>
            </div>
            <h2 className="supply-list-heading">SUPPLY LIST FOR NEW INFANT</h2>
            <ul>
                <li>Diapers</li>
                <li>Wipes</li>
                <li>Ointment (whatever you use at home)</li>
                <li>Two (2) changes of clothes – seasonal</li>
                <li>Two (2) pair of socks – seasonal</li>
                <li>Hat – appropriate for the season</li>
                <li>Sleep Sack (Blankets are no longer allowed in the crib per EEC regulations)</li>
                <li>Laundry bag (You can purchase your own or from us for $5.00)</li>
                <li>Pacifier – if needed</li>
                <li>Sun screen - seasonal - if age appropriate</li>
                <li>Lunch box with ice pack to store food (returned home daily)</li>
            </ul>
            <label>Please label all of your child’s belongings as there may be duplicates and due to the fact that it will be easier for the teachers to know
what belongs to whom.</label>
            <h2 className="supply-list-heading">SUPPLY LIST FOR NEW TODDLER</h2>
            <ul>
                <li>Diapers</li>
                <li>Wipes</li>
                <li>Ointment (whatever you use at home)</li>
                <li>Two (2) changes of clothes – seasonal</li>
                <li>Two (2) pair of socks – seasonal</li>
                <li>Hat – appropriate for the season</li>
                <li>Extra mittens during cold weather. (one pair should be attached to jacket with mitten clips).</li>
                <li>Shoes (extra pair to wear inside the classroom during winter time)</li>
                <li>Sheet and blanket if so desired for the mat. (Must fit into storage space in cubby).</li>
                <li>Lunch box with ice pack to store food, we will microwave anything that needs to be heated. (returned home daily).</li>
                <li>Sunscreen lotion - seasonal</li>
            </ul>
            <label>Please label all of your child’s belongings since there may be duplicates, and it also allows the teacher to identify each child’s
belongings. Sleep bedding must be taken home every week to be laundered, or sooner, if soiled during the week.</label>
            <h2 className="supply-list-heading">
                SUPPLY LIST FOR NEW PRESCHOOLER
</h2>
            <ul>
                <li>Diapers (If applicable)</li>
                <li>Wipes</li>
                <li>One change of clothes – seasonal</li>
                <li>Two (2) pair of socks – seasonal</li>
                <li>Hat – appropriate for the season</li>
                <li>Extra mittens (one pair should be attached to jacket with mitten clips).</li>
                <li>Shoes (extra pair to wear inside the classroom during winter time)</li>
                <li>Sheet and blanket if so desired for the mat. (Must fit into storage space in cubby).</li>
                <li>Lunch box with ice pack to store food, we will microwave anything that needs to be heated. (returned home daily).</li>
                <li>Sunscreen lotion - seasonal</li>
            </ul>
            <label>Please label all of your child’s belongings since there may be duplicates, and it also allows the teacher to identify each child’s belongings. Sleep bedding
will be sent home every week to be laundered, or sooner, if soiled during the week.</label>
            <h2 className="supply-list-heading">SUPPLY LIST FOR NEW PRE-K</h2>
            <ul>
                <li>One change of clothes – seasonal</li>
                <li>Two (2) pair of socks – seasonal</li>
                <li>Hat – appropriate for the season</li>
                <li>Extra mittens (one pair should be attached to jacket with mitten clips).</li>
                <li>Shoes (extra pair to wear inside the classroom during winter time)</li>
                <li>Sheet and blanket if so desired for the mat. (Must fit into storage space in cubby).</li>
                <li>Lunch box with ice pack to store food, we will microwave anything that needs to be heated. (returned home daily).</li>
                <li>Sunscreen lotion - seasonal</li>
                <li>Toileting training is typically established for this age group.</li>
            </ul>
            <label>Please label all of your child’s belongings since there may be duplicates, and it also allows the teacher to identify each child’s belongings. Sleep bedding
will be sent home every week to be laundered, or sooner, if soiled during the week.</label>
            <h2 className="supply-list-heading mt-2rem">LABELS</h2>
            <p>It is very important that you label all your child’s personal items. Many parents shop at the same stores resulting in identical items in a daycare setting.
            Though the staff tries as much as possible to recall personal items or label them with a permanent marker, they often fall short. It is very important that
bottles and containers be properly labeled in order to avoid any food mix ups.</p>
            <p>
                Some parents have their own label maker while others have asked us for suggestions in this department. We have taken the opportunity to sign up with
                mabel labels. This is a fund raising opportunity that we are using to benefit field- trips for the older kids. Please note that IT IS NOT MANDATORY TO
<b> PURCHASE LABELS FROM THIS COMPANY.</b> If however, you are seeking ideas for purchasing labels to make your life easier then feel free to
order labels in bulk.
</p>
            <p>Below is the web link for placing an order.</p>
            <p>www.littlechildren.mabelslabels.com</p>
            <p>Thank You</p>
        </div>
    )
}

// function PrintLabel() {
//     return (
//         <div className="view-student-page-print page-break p-r">
//             <h2 className="supply-list-heading">LABELS</h2>
//             <p>It is very important that you label all your child’s personal items. Many parents shop at the same stores resulting in identical items in a daycare setting.
//             Though the staff tries as much as possible to recall personal items or label them with a permanent marker, they often fall short. It is very important that
// bottles and containers be properly labeled in order to avoid any food mix ups.</p>
//             <p>
//                 Some parents have their own label maker while others have asked us for suggestions in this department. We have taken the opportunity to sign up with
//                 mabel labels. This is a fund raising opportunity that we are using to benefit field- trips for the older kids. Please note that IT IS NOT MANDATORY TO
// <b> PURCHASE LABELS FROM THIS COMPANY.</b> If however, you are seeking ideas for purchasing labels to make your life easier then feel free to
// order labels in bulk.
// </p>
//             <p>Below is the web link for placing an order.</p>
//             <p>www.littlechildren.mabelslabels.com</p>
//             <p>Thank You</p>
//         </div>
//     )
// }

function PrintSnowStorming() {
    return (
        <div className="view-student-page-print page-break p-r">
            <div className="w-100 text-center">
                <h2 className="underline-text">Snow Storm Closing System</h2>
            </div>
            <p className="mt-2rem">
                The number of closing or delays we will display – Channel 7 NEWS- or go to the website <b>– www.whdh.com –</b> to see if Little Children
Schoolhouse is closed or delayed our opening because of a storm.
            </p>
            <p>In addition to checking the website, we do have another very convenient way for parents to learn when Little Children Schoolhouse is
            closed. You can register with 7NEWS online and they will send you a message on your cell phone as soon as we make the decision to
close or delay. They call it “Snow Day Alert”.</p>
            <p>If you are interested in taking advantage of this convenient feature, just go to <b> www.whdh.com </b> and click on “Snow Day Alert”.</p>
            <p>If you have, any questions just contact them at <b>webmaster@whdh.com</b> or call the toll-free number 1-877- 316-5990</p>
            <p>Thanks you for your time and we hope we have a safe and not-too- snowy winter.</p>
            <p className="mt-2rem centered-text">© Little Children Schoolhouse 2019. Privacy Policy (/privacy)</p>
            <p className="centered-text">powered by <b>Tech Wave Group</b> (http://techwavegroup.com)</p>
        </div>
    )
}