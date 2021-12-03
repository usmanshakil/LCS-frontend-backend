import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Grid } from 'semantic-ui-react';
// component
import { StaffAgreement } from './StaffAgreement';
import { AdministartionAndStaff } from './AdministartionAndStaff';
import { StaffEmergencyForm } from './StaffEmergencyForm';
import { StaffBasicInfo } from './StaffBasicInfo';
import { Reference } from './Reference';
import { ProfessionalRefernce } from './ProfessionalRefernce';
import { PersonalReference } from './PersonalReference';
import { Education } from './Education';
import { SideFormMenuBar } from './SideFormMenuBar';
// api
import { saveStaffHiringForm, updateStaffHiringForm } from '../../../../ApiAction/Teacher';
import {adminUpdateStaffHiringForm} from '../../../../ApiAction/Admin';
// constants
import { constants } from '../../..';
// loader
import { Loaders } from '../../..';

class EditStaffInformationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPageLoading: true,
            sameAddress: {
                educationModalSameAddress: false,
                staffEmergencyDetailSameAddress: false
            },
            apiStatusCode: '',
            staff_detail_id: '',
            loginUserInfo: props.loginUserInfo,
            activeTabName: 'staffBasicInfo',
            staff_hiring_form: {
                staff_hiring_form_detail: {
                    program_name: '',
                    name: '',
                    date_of_birth: '',
                    address: '',
                    telephone_number: '',
                    date_of_hire: '',
                    social_security_number: '',
                    current_position: '',
                    supervisor_name: ''
                },
                staff_administrative_teaching_staff_detail: {
                    infants: 'false',
                    infants_toddlers: 'false',
                    toddlers: 'false',
                    toddlers_pre_school: 'false',
                    pre_school: 'false',
                    pre_school_sa: 'false',
                    school_age: 'false',
                    kindergarten_sa: 'false',
                    multi_age_group: 'false',
                    child_care_services_certificate: '',
                    list_any_licenses_certifications: '',
                    date_of_eec_professional_registry: '',
                    date_of_eec_educator_orientation: '',
                    has_teacher_signature: ''
                },
                staff_education_detail: {
                    position_applied_for: '',
                    name: '',
                    address: '',
                    email_address: '',
                    city: '',
                    zip_code: '',
                    ssn: '',
                    high_school: '',
                    college_attended_degree: '',
                    other_courses_workshops_attended: ''
                },
                staff_personal_reference_detail: {
                    reference_name: '',
                    title_relationship: '',
                    individual_relation_age: '',
                    comments_on_character: '',
                    weakness: '',
                    strength: '',
                    reliable: '',
                    patient: '',
                    compassionate: ''
                },
                staff_professional_reference_detail: {
                    reference_name: '',
                    title_relationship: '',
                    employee_experiece_organization: '',
                    punctuality: '',
                    attendance: '',
                    coworkers: '',
                    supervisors: '',
                    parents: '',
                    children: '',
                    will_employee_hired_again: ''
                },
                staff_references_detail: [
                    {
                        ref_name: "",
                        ref_relationship: "",
                        ref_address: "",
                        ref_phone: ""
                    }, {
                        ref_name: "",
                        ref_relationship: "",
                        ref_address: "",
                        ref_phone: ""
                    }, {
                        ref_name: "",
                        ref_relationship: "",
                        ref_address: "",
                        ref_phone: ""
                    }
                ],
                staff_emergency_detail: {
                    name: '',
                    address: '',
                    state: '',
                    city: '',
                    zip_code: '',
                    home_phone: '',
                    other_cell_phone: '',
                    allergies: '',
                    first_emergency_name: '',
                    first_emergency_home_phone: '',
                    first_emergency_phone: '',
                    first_emergency_relationship_to_you: '',
                    second_emergency_name: '',
                    second_emergency_home_phone: '',
                    second_emergency_phone: '',
                    second_emergency_relationship_to_you: '',
                    third_emergency_name: '',
                    third_emergency_home_phone: '',
                    third_emergency_phone: '',
                    third_emergency_relationship_to_you: '',
                },
                staff_statement_of_compliance_with_cori_detail: {
                    name_of_program: '',
                    name_of_employee: '',
                    has_teacher_signature: '',
                    signature_of_licensee: ''
                },
                staff_handbook_waiver_detail: {
                    has_employee_agreed: 'false',
                    has_teacher_signature: ''
                }
            }, previousSubmittedStatusObj: {
                staff_hiring_form_detail: false,
                staff_administrative_teaching_staff_detail: false,
                staff_education_detail: false,
                staff_personal_reference_detail: false,
                staff_professional_reference_detail: false,
                staff_references_detail: false,
                staff_emergency_detail: false,
                staff_statement_of_compliance_with_cori_detail: false,
                staff_handbook_waiver_detail: false,
            },
            stateDropdownOption: constants.STATE_DROPDOWN,
            editchildHorizontalMenu: constants.STAFF_INFORMATION_MENU,
            editType: 'addForm',
            formName: 'staffBasicInfo',
            allformData: '',
            activePageModal: '',
            teacherSignature: props.loginUserInfo.signature,
        }

    }

    componentWillMount() {
        if (this.props.loginUserInfo.role_id === 2 || this.props.loginUserInfo.role_id === 4) {
        //     this.props.history.push('/home')

        // } else if (this.props.loginUserInfo.role_id === 4) {
            if (this.props.location.state === undefined) {
                this.props.history.push('/home')
            } else {
                let { editType, formName, allformData, modalName } = this.props.location.state;
                if (editType === 'addForm') {
                    // check if allform data have blank value
                    if (allformData.length) {
                        this.fillAllValue(allformData)
                        this.showTickInPreviousForm(modalName)
                    } else {
                    }
                } else {
                    // check if allform data have blank value
                    if (allformData.length) {
                        // this.setState({
                        //     editType
                        // })
                        this.fillAllValue(allformData)
                    } else {

                    }
                }
                this.setState({
                    activeTabName: formName,
                    editType, formName,
                })
            }

        } else {
            this.props.history.push('/home')

        }

    }

    componentDidMount() {
        this.setState({
            isPageLoading: false
        })
    }
    // 

    // filling all values
    fillAllValue = (allValues) => {
        if (allValues.length) {
            let data = allValues,
                {
                    staff_detail_id,
                    teacher_id
                } = data[0],
                staff_hiring_form = {},
                { teacherSignature } = this.state,
                staff_hiring_form_detail = this.fillBasicInfo(data[0]),
                staff_administrative_teaching_staff_details = this.fillStaffTeachingInfo(data[0]),
                staff_education_detail = this.fillEducationInfo(data[0]),
                staff_emergency_detail = this.fillEmergencyDetail(data[0]),
                staff_handbook_waiver_detail = this.fillHandbookWaiverInfo(data[0]),
                staff_personal_reference_detail = this.fillPersonalInfo(data[0]),
                staff_professional_reference_detail = this.fillProfessionalInfo(data[0]),
                staff_references_detail = this.fillReferenceInfo(data[0]);
            staff_hiring_form.staff_hiring_form_detail = staff_hiring_form_detail;
            staff_hiring_form.staff_administrative_teaching_staff_detail = staff_administrative_teaching_staff_details;
            staff_hiring_form.staff_education_detail = staff_education_detail;
            staff_hiring_form.staff_emergency_detail = staff_emergency_detail;
            staff_hiring_form.staff_handbook_waiver_detail = staff_handbook_waiver_detail;
            staff_hiring_form.staff_personal_reference_detail = staff_personal_reference_detail;
            staff_hiring_form.staff_professional_reference_detail = staff_professional_reference_detail;
            staff_hiring_form.staff_references_detail = staff_references_detail;

            teacherSignature = data.length ? data[0].user.signature : this.props.loginUserInfo.signature
            this.setState({
                staff_hiring_form,
                staff_detail_id,
                teacherSignature,
                teacher_id
            })
        } else {

        }

    }

    // filling basic info which is to be displayed in form Staff basic information
    fillBasicInfo = (data) => {
        let {
            program_name,
            name,
            date_of_birth,
            address,
            telephone_number,
            date_of_hire,
            social_security_number,
            current_position,
            supervisor_name,
        } = data, { staff_hiring_form_detail } = this.state.staff_hiring_form;

        staff_hiring_form_detail.address = address
        staff_hiring_form_detail.telephone_number = telephone_number
        staff_hiring_form_detail.date_of_birth = date_of_birth
        staff_hiring_form_detail.date_of_hire = date_of_hire
        staff_hiring_form_detail.program_name = program_name
        staff_hiring_form_detail.name = name
        staff_hiring_form_detail.social_security_number = social_security_number
        staff_hiring_form_detail.current_position = current_position
        staff_hiring_form_detail.supervisor_name = supervisor_name
        return staff_hiring_form_detail

    }
    // filling basic info which is to be displayed in form Administrative and teaching staff

    fillStaffTeachingInfo = (allValues) => {
        let data = allValues, { staff_administrative_teaching_staff_detail } = this.state.staff_hiring_form;

        if (data.staff_administrative_teaching_staff_details.length) {
            let {
                infants,
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
                has_teacher_signature
            } = data.staff_administrative_teaching_staff_details[0];


            staff_administrative_teaching_staff_detail.infants = infants
            staff_administrative_teaching_staff_detail.infants_toddlers = infants_toddlers
            staff_administrative_teaching_staff_detail.toddlers = toddlers
            staff_administrative_teaching_staff_detail.toddlers_pre_school = toddlers_pre_school
            staff_administrative_teaching_staff_detail.pre_school = pre_school
            staff_administrative_teaching_staff_detail.pre_school_sa = pre_school_sa
            staff_administrative_teaching_staff_detail.school_age = school_age
            staff_administrative_teaching_staff_detail.kindergarten_sa = kindergarten_sa
            staff_administrative_teaching_staff_detail.multi_age_group = multi_age_group
            staff_administrative_teaching_staff_detail.child_care_services_certificate = child_care_services_certificate
            staff_administrative_teaching_staff_detail.list_any_licenses_certifications = list_any_licenses_certifications
            staff_administrative_teaching_staff_detail.date_of_eec_professional_registry = date_of_eec_professional_registry
            staff_administrative_teaching_staff_detail.date_of_eec_educator_orientation = date_of_eec_educator_orientation
            staff_administrative_teaching_staff_detail.has_teacher_signature = has_teacher_signature

            return staff_administrative_teaching_staff_detail

        } else {
            return staff_administrative_teaching_staff_detail
        }
    }
    // filling  info which is to be displayed in form education

    fillEducationInfo = (allValues) => {
        let data = allValues,
            { staff_education_detail } = this.state.staff_hiring_form;

        if (data.staff_education_details.length) {
            let {
                position_applied_for,
                name,
                address,
                email_address,
                city,
                zip_code,
                ssn,
                high_school,
                college_attended_degree,
                other_courses_workshops_attended
            } = data.staff_education_details[0];


            staff_education_detail.position_applied_for = position_applied_for
            staff_education_detail.name = name
            staff_education_detail.address = address
            staff_education_detail.email_address = email_address
            staff_education_detail.city = city
            staff_education_detail.zip_code = zip_code
            staff_education_detail.ssn = ssn
            staff_education_detail.high_school = high_school
            staff_education_detail.college_attended_degree = college_attended_degree
            staff_education_detail.other_courses_workshops_attended = other_courses_workshops_attended

            return staff_education_detail
        } else {

            return staff_education_detail

        }
    }
    // filling  info which is to be displayed in form Staff emergency form

    fillEmergencyDetail = (allValues) => {
        let data = allValues, { staff_emergency_detail } = this.state.staff_hiring_form;

        if (data.staff_emergency_details.length) {
            let {
                name,
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
                third_emergency_relationship_to_you
            } = data.staff_emergency_details[0];


            staff_emergency_detail.state = state
            staff_emergency_detail.name = name
            staff_emergency_detail.address = address
            staff_emergency_detail.home_phone = home_phone
            staff_emergency_detail.city = city
            staff_emergency_detail.other_cell_phone = other_cell_phone
            staff_emergency_detail.allergies = allergies
            staff_emergency_detail.zip_code = zip_code
            staff_emergency_detail.first_emergency_name = first_emergency_name
            staff_emergency_detail.first_emergency_home_phone = first_emergency_home_phone
            staff_emergency_detail.first_emergency_phone = first_emergency_phone
            staff_emergency_detail.first_emergency_relationship_to_you = first_emergency_relationship_to_you
            staff_emergency_detail.second_emergency_name = second_emergency_name
            staff_emergency_detail.second_emergency_home_phone = second_emergency_home_phone
            staff_emergency_detail.second_emergency_phone = second_emergency_phone
            staff_emergency_detail.second_emergency_relationship_to_you = second_emergency_relationship_to_you
            staff_emergency_detail.third_emergency_name = third_emergency_name
            staff_emergency_detail.third_emergency_home_phone = third_emergency_home_phone
            staff_emergency_detail.third_emergency_phone = third_emergency_phone
            staff_emergency_detail.third_emergency_relationship_to_you = third_emergency_relationship_to_you

            return staff_emergency_detail
        }
        else {
            return staff_emergency_detail
        }
    }
    // filling  info which is to be displayed in form Staff agreement form

    fillHandbookWaiverInfo = (allValues) => {
        let data = allValues, { staff_handbook_waiver_detail } = this.state.staff_hiring_form;

        if (data.staff_handbook_waiver_details.length) {
            let {
                has_employee_agreed, has_teacher_signature
            } = data.staff_handbook_waiver_details[0];

            staff_handbook_waiver_detail.has_employee_agreed = has_employee_agreed
            staff_handbook_waiver_detail.has_teacher_signature = has_teacher_signature
            return staff_handbook_waiver_detail
        }
        else {
            return staff_handbook_waiver_detail
        }
    }
    // filling  info which is to be displayed in form Staff Professional information form

    fillProfessionalInfo = (allValues) => {
        let data = allValues, { staff_professional_reference_detail } = this.state.staff_hiring_form;

        if (data.staff_professional_reference_details.length) {
            let {
                reference_name,
                title_relationship,
                employee_experiece_organization,
                punctuality,
                attendance,
                coworkers,
                supervisors,
                parents,
                children,
                will_employee_hired_again

            } = data.staff_professional_reference_details[0];

            staff_professional_reference_detail.reference_name = reference_name
            staff_professional_reference_detail.title_relationship = title_relationship
            staff_professional_reference_detail.employee_experiece_organization = employee_experiece_organization
            staff_professional_reference_detail.punctuality = punctuality
            staff_professional_reference_detail.attendance = attendance
            staff_professional_reference_detail.coworkers = coworkers
            staff_professional_reference_detail.supervisors = supervisors
            staff_professional_reference_detail.parents = parents
            staff_professional_reference_detail.children = children
            staff_professional_reference_detail.will_employee_hired_again = will_employee_hired_again

            return staff_professional_reference_detail
        }
        else {
            return staff_professional_reference_detail
        }
    }
    // filling  info which is to be displayed in form Staff Personal information form

    fillPersonalInfo = (allValues) => {
        let data = allValues, { staff_personal_reference_detail } = this.state.staff_hiring_form;

        if (data.staff_personal_reference_details.length) {
            let {
                reference_name,
                title_relationship,
                individual_relation_age,
                comments_on_character,
                weakness,
                strength,
                reliable,
                patient,
                compassionate
            } = data.staff_personal_reference_details[0];

            staff_personal_reference_detail.reference_name = reference_name
            staff_personal_reference_detail.title_relationship = title_relationship
            staff_personal_reference_detail.individual_relation_age = individual_relation_age
            staff_personal_reference_detail.comments_on_character = comments_on_character
            staff_personal_reference_detail.weakness = weakness
            staff_personal_reference_detail.strength = strength
            staff_personal_reference_detail.reliable = reliable
            staff_personal_reference_detail.patient = patient
            staff_personal_reference_detail.compassionate = compassionate
            return staff_personal_reference_detail
        }
        else {
            return staff_personal_reference_detail
        }
    }
    // filling  info which is to be displayed in form Staff Reference information form

    fillReferenceInfo = (allValues) => {
        let data = allValues,
            {
                staff_references_details
            } = data, { staff_references_detail } = this.state.staff_hiring_form;
        if (data.staff_references_details.length) {
            staff_references_detail[0].ref_name = staff_references_details[0].ref_name
            staff_references_detail[0].ref_relationship = staff_references_details[0].ref_relationship
            staff_references_detail[0].ref_address = staff_references_details[0].ref_address
            staff_references_detail[0].ref_phone = staff_references_details[0].ref_phone
            staff_references_detail[1].ref_name = staff_references_details[1].ref_name
            staff_references_detail[1].ref_relationship = staff_references_details[1].ref_relationship
            staff_references_detail[1].ref_address = staff_references_details[1].ref_address
            staff_references_detail[1].ref_phone = staff_references_details[1].ref_phone
            staff_references_detail[2].ref_name = staff_references_details[2].ref_name
            staff_references_detail[2].ref_relationship = staff_references_details[2].ref_relationship
            staff_references_detail[2].ref_address = staff_references_details[2].ref_address
            staff_references_detail[2].ref_phone = staff_references_details[2].ref_phone
            return staff_references_detail
        }
        else {
            return staff_references_detail
        }
    }

    // onchange of textbox save value in state
    _handleFormInput = (modalType, event) => {
        let { name, value, id } = event.target,
            { staff_hiring_form } = this.state,
            numberValidation = /^[0-9\b]+$/;
        if (name === "social_security_number" || name === "ssn") {
            staff_hiring_form[modalType][name] = numberValidation.test(value) ? value : '';
            this.setState({ staff_hiring_form });
        } else {
            if (modalType === 'staff_references_detail') {
                staff_hiring_form[modalType][id][name] = value;
                this.setState({ staff_hiring_form });
            } else {
                staff_hiring_form[modalType][name] = value;
                this.setState({ staff_hiring_form });
            }
        }
    }
    // save Signature when single form is submitted
    _saveSignature = (modalType, modalName, modalValue) => {
        let { staff_hiring_form } = this.state;
        staff_hiring_form[modalType][modalName] = modalValue;
        this.setState({ staff_hiring_form })
    }

    // handle checkbox of all forms
    _handleCheckBox = (modalType, event) => {
        let { staff_hiring_form } = this.state, { name, checked } = event.target;
        staff_hiring_form[modalType][name] = `${checked}`;
        this.setState({
            staff_hiring_form
        })
    }

    // calling save form api
    _saveFormDetail = (currentModalName, nextModalName, modalData) => {
        let data = {}, { staff_detail_id, previousSubmittedStatusObj } = this.state;
        if (currentModalName === 'staff_hiring_form_detail') {
            data.type = currentModalName
            data[currentModalName] = modalData
        } else {
            // modalData.staff_detail_id = staff_detail_id
            data.type = currentModalName
            data.staff_detail_id = staff_detail_id
            data[currentModalName] = modalData
        }
        // saving record of previous submitted form to show tick icon in side menu bar
        previousSubmittedStatusObj[currentModalName] = true
        saveStaffHiringForm(data).then(res => {
            let id = res.staff_detail_id ? res.staff_detail_id : this.state.staff_detail_id;
            this.setState({
                isPageLoading: false,
                staff_detail_id: id,
                previousSubmittedStatusObj

            }, () => {
                this.props.customProps._toastMessage('success', res.message)
                this._loadTab(nextModalName)
            })
        }).catch(err => {
            this.setState({
                isPageLoading: false,
                apiStatusCode: err ? err.status : 500
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

    // update form of staff information
    updateForm = (currentModalName, nextModalName, modalData) => {
        let data = {}, { staff_detail_id } = this.state;
        data.type = currentModalName
        data.staff_detail_id = staff_detail_id
        data[currentModalName] = modalData
        updateStaffHiringForm(data).then(res => {
            this.setState({
                isPageLoading: false,
            })
            this.props.customProps._toastMessage('success', res.message)
            this._loadTab(nextModalName)
        }).catch(err => {
            this.setState({
                isPageLoading: false,
                apiStatusCode: err ? err.status : 500
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

// admin update staff hiring form
    updateAdminUpdateStaffHiringForm=(currentModalName, nextModalName, modalData)=>{
        let data = {}, { staff_detail_id,teacher_id } = this.state;
        data.type = currentModalName;
        data.staff_detail_id = staff_detail_id;
        data.teacher_id=teacher_id;
        data[currentModalName] = modalData;
        
        adminUpdateStaffHiringForm(data).then(res=>{
            this.setState({
                isPageLoading: false,
            })
            this.props.customProps._toastMessage('success', res.message)
            this._loadTab(nextModalName)
        }).catch(err=>{
            this.setState({
                isPageLoading: false,
                apiStatusCode: err ? err.status : 500
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

    _showLoader = (currentModalName, nextModalName, modalData) => {
        let {loginUserInfo}=this.state;
        this.setState({
            isPageLoading: true
        }, () => {
            if(loginUserInfo.role_id === 2){
                this.updateAdminUpdateStaffHiringForm(currentModalName, nextModalName, modalData);
            }else{
                if (this.state.editType === 'addForm') {
                    this._saveFormDetail(currentModalName, nextModalName, modalData);
                } else {
                    this.updateForm(currentModalName, nextModalName, modalData);
                }
            }
        })
    }
    // in add form show tick  in side menu bar
    showTickInPreviousForm = (formName) => {

        let { previousSubmittedStatusObj } = this.state;
        for (var key in previousSubmittedStatusObj) {
            if (key === formName) {
                break
            } else {
                previousSubmittedStatusObj[key] = true
            }
        }
        this.setState({
            previousSubmittedStatusObj
        })
    }

    // load tab by calling tabname
    _loadTab = (tabname) => {
        if (tabname === 'home') {
            this.props.history.push('/home')
        } else if (tabname === 'view-staff-info') {
            this.props.history.push('/view-staff-info')
        } else {
            this.setState({
                activeTabName: tabname
            })
        }
    }

    // toggle same address as previous form
    _toggleSameAddress = (modalName, event) => {
        let { name, checked } = event.target,
            { sameAddress, staff_hiring_form } = this.state,
            { staff_hiring_form_detail, staff_education_detail } = staff_hiring_form;
        if (modalName === 'staff_hiring_form') {

        } else if (modalName === 'staff_emergency_detail') {
            if (checked) {
                staff_hiring_form[modalName].name = staff_hiring_form_detail.name
                staff_hiring_form[modalName].address = staff_hiring_form_detail.address
                staff_hiring_form[modalName].city = staff_education_detail.city
                staff_hiring_form[modalName].zip_code = staff_education_detail.zip_code
            } else {
                staff_hiring_form[modalName].name = ''
                staff_hiring_form[modalName].address = ''
                staff_hiring_form[modalName].zip_code = ''
                staff_hiring_form[modalName].city = ''
            }
        } else if (modalName === 'staff_education_detail') {
            if (checked) {
                staff_hiring_form[modalName].position_applied_for = staff_hiring_form_detail.program_name
                staff_hiring_form[modalName].name = staff_hiring_form_detail.name
                staff_hiring_form[modalName].address = staff_hiring_form_detail.address
                staff_hiring_form[modalName].ssn = staff_hiring_form_detail.social_security_number
            } else {
                staff_hiring_form[modalName].position_applied_for = ''
                staff_hiring_form[modalName].name = ''
                staff_hiring_form[modalName].address = ''
                staff_hiring_form[modalName].ssn = ''
            }
        } else {
        }

        sameAddress[name] = checked
        this.setState({
            sameAddress, staff_hiring_form
        })
    }

    //_handleFormDropDown handle all dropdown in whole form
    _handleFormDropDown = (modalType, dropDownName, dropDownValue) => {
        let { staff_hiring_form } = this.state;
        staff_hiring_form[modalType][dropDownName] = dropDownValue;
        this.setState({ staff_hiring_form })
    }

    // show component by active tab
    showComponentByTabName = (activeTabName, stateVariable, allFunctions) => {
        switch (activeTabName) {
            case 'staffBasicInfo':
                return <StaffBasicInfo {...stateVariable}   {...allFunctions} />;
            case 'administartionAndStaff':
                return <AdministartionAndStaff {...stateVariable} {...allFunctions} />;
            case 'education':
                return <Education {...stateVariable} {...allFunctions} />;
            case 'personalReference':
                return <PersonalReference {...stateVariable} {...allFunctions} />;
            case 'professionalRefernce':
                return <ProfessionalRefernce {...stateVariable} {...allFunctions} />;
            case 'reference':
                return <Reference {...stateVariable} {...allFunctions} />;
            case 'staffEmergencyForm':
                return <StaffEmergencyForm {...stateVariable} {...allFunctions} />;
            case 'staffAgreement':
                return <StaffAgreement {...stateVariable} {...allFunctions} />;
            default:
                return <StaffBasicInfo {...stateVariable} {...allFunctions} />;
        }
    }



    render() {
        let { loginUserInfo, activeTabName, isPageLoading } = this.state,
            customFunctionProps = {
                _loadTab: this._loadTab,
                _handleFormInput: this._handleFormInput,
                _saveSignature: this._saveSignature,
                _handleCheckBox: this._handleCheckBox,
                _toggleSameAddress: this._toggleSameAddress,
                _saveFormDetail: this._saveFormDetail,
                _showLoader: this._showLoader,
                _handleFormDropDown: this._handleFormDropDown
            };
        return (
            <div>
                {
                    isPageLoading ? <Loaders isLoading={isPageLoading} /> : <div className="mt-2rem main-layout-height">
                        <Container fluid>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column computer={1} tablet={1} />
                                    <Grid.Column computer={3} tablet={4} mobile={16}>
                                        <SideFormMenuBar {...customFunctionProps} {...this.state} />
                                    </Grid.Column>
                                    <Grid.Column computer={1} tablet={1} />
                                    <Grid.Column computer={10} tablet={8} mobile={16}>
                                        <Container className={`theme-${loginUserInfo.role_id}-border admin-teacher-edit `}>
                                            {
                                                this.showComponentByTabName(activeTabName, { ...this.state }, { ...customFunctionProps })
                                            }
                                        </Container>
                                    </Grid.Column>
                                    <Grid.Column computer={1} tablet={1} />
                                </Grid.Row>
                            </Grid>
                        </Container>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loginUserInfo: state.loginReducer.loginUserInfo,
});

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditStaffInformationForm)
