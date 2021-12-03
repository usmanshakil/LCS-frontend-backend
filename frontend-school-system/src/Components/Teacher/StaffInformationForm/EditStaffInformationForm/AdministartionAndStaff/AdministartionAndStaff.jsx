import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
// import SignatureCanvas from "react-signature-canvas";

class AdministartionAndStaff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blankSignatureValidationMessage: '',
            isSignatureVisible: true
        }
    }

    // save Signature in state
    getSignature = (modalName, nextModalName, modalData) => {
        let { staff_hiring_form } = this.props,
            { staff_administrative_teaching_staff_detail } = staff_hiring_form,
            { has_teacher_signature } = staff_administrative_teaching_staff_detail;
        if (has_teacher_signature === 'true') {
            this.setState({
                blankSignatureValidationMessage: '',
                isSignatureVisible: true

            }, () => {
                this.props._showLoader(modalName, nextModalName, staff_administrative_teaching_staff_detail)
                // this.props._saveFormDetail(modalName,nextModalName,staff_administrative_teaching_staff_detail)
            })

        } else {
            this.setState({
                blankSignatureValidationMessage: 'Please check the signature checkbox',
                isSignatureVisible: false

            })
        }
    }

    render() {

        let { blankSignatureValidationMessage, isSignatureVisible } = this.state,
            { staff_hiring_form, loginUserInfo, teacherSignature,editType } = this.props,
            { staff_administrative_teaching_staff_detail } = staff_hiring_form,
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
                has_teacher_signature } = staff_administrative_teaching_staff_detail,
            nextformName = 'education';
        return (
            <Form onSubmit={(event) => this.getSignature('staff_administrative_teaching_staff_detail', nextformName, staff_administrative_teaching_staff_detail)}>
                <Form.Group widths="equal">
                    <Form.Field>
                        <h4>ADMINISTRATIVE AND TEACHING STAFF:</h4>
                        <h5>Circle age group(s) you are caring for:</h5>
                    </Form.Field>
                    <Form.Field />
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <div className="ui checkbox">
                            <input type="checkbox" name="infants"
                                value={infants}
                                checked={infants === "false" ? false : true}
                                onClick={(event) => this.props._handleCheckBox("staff_administrative_teaching_staff_detail", event)} 
                                disabled={editType==='editForm'?true:false}
                                />
                            <label>Infant (birth - 15 mos.)</label>
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="ui checkbox">
                            <input type="checkbox" name="infants_toddlers"
                                value={infants_toddlers}
                                checked={infants_toddlers === "false" ? false : true}
                                onClick={(event) => this.props._handleCheckBox("staff_administrative_teaching_staff_detail", event)} 
                                disabled={editType==='editForm'?true:false}
                                
                                />
                            <label>Infant / Toddler (birth - 2 yrs. 9 mos.)</label>
                        </div>
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <div className="ui checkbox">
                            <input type="checkbox" name="toddlers"
                                value={toddlers}
                                checked={toddlers === "false" ? false : true}
                                onClick={(event) => this.props._handleCheckBox("staff_administrative_teaching_staff_detail", event)}
                                disabled={editType==='editForm'?true:false}
                                
                                />
                            <label>Toddler (15 mos. - 33 mos.)</label>
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="ui checkbox">
                            <input type="checkbox" name="toddlers_pre_school"
                                value={toddlers_pre_school}
                                checked={toddlers_pre_school === "false" ? false : true}
                                onClick={(event) => this.props._handleCheckBox("staff_administrative_teaching_staff_detail", event)}
                                disabled={editType==='editForm'?true:false}
                                
                                />
                            <label>Toddler / Preschool (15 mos. -  K.)</label>
                        </div>
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <div className="ui checkbox">
                            <input type="checkbox" name="pre_school"
                                value={pre_school}
                                checked={pre_school === "false" ? false : true}
                                onClick={(event) => this.props._handleCheckBox("staff_administrative_teaching_staff_detail", event)}
                                disabled={editType==='editForm'?true:false}
                                
                                />
                            <label>Preschool (2 yrs. 9 mos. - K.)</label>
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="ui checkbox">
                            <input type="checkbox" name="pre_school_sa"
                                value={pre_school_sa}
                                checked={pre_school_sa === "false" ? false : true}
                                onClick={(event) => this.props._handleCheckBox("staff_administrative_teaching_staff_detail", event)}
                                disabled={editType==='editForm'?true:false}
                                
                                />
                            <label>Preschool / SA (2 yrs. 9 mos. - 9 yrs.)</label>
                        </div>
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <div className="ui checkbox">
                            <input type="checkbox" name="school_age"
                                value={school_age}
                                checked={school_age === "false" ? false : true}
                                onClick={(event) => this.props._handleCheckBox("staff_administrative_teaching_staff_detail", event)}
                                disabled={editType==='editForm'?true:false}
                                
                                />
                            <label>School Age (5 yrs. - 14 yrs.)</label>
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="ui checkbox">
                            <input type="checkbox" name="kindergarten_sa"
                                value={kindergarten_sa}
                                checked={kindergarten_sa === "false" ? false : true}
                                onClick={(event) => this.props._handleCheckBox("staff_administrative_teaching_staff_detail", event)}
                                disabled={editType==='editForm'?true:false}
                                
                                />
                            <label>Kindergarten / SA (5 yrs. - 14 yrs.)</label>
                        </div>
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <div className="ui checkbox">
                            <input type="checkbox" name="multi_age_group"
                                value={multi_age_group}
                                checked={multi_age_group === "false" ? false : true}
                                onClick={(event) => this.props._handleCheckBox("staff_administrative_teaching_staff_detail", event)}
                                disabled={editType==='editForm'?true:false}
                                
                                />
                            <label>Multi-Age Group (birth -14 yrs.)</label>
                        </div>
                    </Form.Field>
                    <Form.Field />
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field >
                        <label>
                            Do you have a Department of Early Education and Care or Office of Child Care Services Certificate of Qualifications?
        </label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes'
                             name="child_care_services_certificate" 
                             checked={child_care_services_certificate === 'yes' ? true : false} 
                             onChange={(event) => this.props._handleFormInput('staff_administrative_teaching_staff_detail', event)}  />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="child_care_services_certificate" checked={child_care_services_certificate === 'no' ? true : false} onChange={(event) => this.props._handleFormInput('staff_administrative_teaching_staff_detail', event)} />
                            <label className="mr-10">No</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='applied' name="child_care_services_certificate" checked={child_care_services_certificate === 'applied' ? true : false} onChange={(event) => this.props._handleFormInput('staff_administrative_teaching_staff_detail', event)} />
                            <label>Applied</label>
                        </div>
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Please list any licenses, certifications, or registrations you have (i.e. teacher certification, social worker’s license, etc.)</label>
                        <Form.TextArea name="list_any_licenses_certifications" value={list_any_licenses_certifications} onChange={(event) => this.props._handleFormInput('staff_administrative_teaching_staff_detail', event)} />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field >
                        <label>Date of EEC Professional Registry</label>
                        <input type="date" value={date_of_eec_professional_registry} name="date_of_eec_professional_registry" onChange={(event) => this.props._handleFormInput('staff_administrative_teaching_staff_detail', event)} />
                    </Form.Field>
                    <Form.Field >
                        <label>Date of EEC Educator Orientation (if applicable)</label>
                        <input type="date" value={date_of_eec_educator_orientation} name="date_of_eec_educator_orientation" onChange={(event) => this.props._handleFormInput('staff_administrative_teaching_staff_detail', event)} />
                    </Form.Field>
                </Form.Group>

                <Form.Group widths="equal">
                    <div className="field ">
                        <div className="ui checkbox">
                            <input type="checkbox" name="has_teacher_signature" value={has_teacher_signature} checked={has_teacher_signature === 'true' ? true : false} onChange={(event) => this.props._handleCheckBox("staff_administrative_teaching_staff_detail", event)} disabled={editType==='editForm'?true:false}/>
                            <label>Use signature as in teacher profile</label>
                        </div>
                    </div>
                </Form.Group>
                {
                    has_teacher_signature === "true" ? <Form.Group width="equal">
                        <Form.Field width="16" >
                            <label>Signature</label>
                            <div className={`w-100 `} >
                                <img
                                    src={`${loginUserInfo.role_id === 2 ? teacherSignature : teacherSignature}`}
                                    alt="teacher-signature"
                                    className={`view-signature-image  signature-boundary`}
                                />
                                <div
                                >
                                </div>
                            </div>
                        </Form.Field>
                    </Form.Group> : ''
                }

                {isSignatureVisible === false ?
                    has_teacher_signature === "true" ? '' :
                        <Form.Group>
                            <Form.Field>
                                <span className="password-warning srv-validation-message">
                                {blankSignatureValidationMessage}
                            </span>
                            </Form.Field>
                            
                        </Form.Group> : ''}

                <div className="equal width fields"><div className="field"><button type="submit" className="ui positive button" >Submit</button></div></div>

            </Form>

        )
    }
}

// const mapStateToProps = state => ({
//     loginUserInfo: state.loginReducer.loginUserInfo,
// });

// const mapDispatchToProps = dispatch => {
//     return {

//     };
// };

export default AdministartionAndStaff;
