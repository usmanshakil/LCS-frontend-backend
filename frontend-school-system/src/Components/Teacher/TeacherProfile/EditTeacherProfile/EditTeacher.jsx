import React from 'react';
import { Button, Form } from 'semantic-ui-react';

export function EditTeacher(props) {

    let { teacher_info, user_info, loginUserInfo, teacherProfile, allowUpload, training_info } = props,
        { first_name, last_name, email } = user_info,
        {
            position,
            resume,
            interview_date,
            date_of_birth,
            date_of_hire,
            reference1,
            ref_1_email,
            ref_1_phone,
            reference2,
            ref_2_email,
            ref_2_phone,
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
            eec_shaken_baby_syndrome_date,
            training_detail_id
        } = training_info;
    resume = resume ? resume.replace(/^.*[\\\\/]/, '') : ''
    return (
        <div className={`theme-${loginUserInfo.role_id}-border admin-teacher-edit`}>
            <Form>
            <h3>User information</h3>
            {/* {loginUserInfo.role_id === 2 ?  : ''                } */}
                {/* {loginUserInfo.role_id === 2 ?  : ''} */}
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>
                            First Name:
                            </label>
                        <input type="text" value={loginUserInfo.role_id === 2 ? teacherProfile.first_name : first_name} name="first_name" onChange={(event) => props.handleFormInput('user_info', event)}  disabled={loginUserInfo.role_id === 2 ? true : training_detail_id === '' ? false : true}/>
                        {props.EditTeacherFormValidator.message('first_name', first_name, 'required')}
                    </Form.Field>
                    <Form.Field>
                        <label>
                            Last Name:
                            </label>
                            {/* disabled={loginUserInfo.role_id === 2 ? true : false} */}
                        <input type="text" value={loginUserInfo.role_id === 2 ? teacherProfile.last_name : last_name} name="last_name" onChange={(event) => props.handleFormInput('user_info', event)} disabled={loginUserInfo.role_id === 2 ? true : training_detail_id === '' ? false : true} />
                        {props.EditTeacherFormValidator.message('last_name', last_name, 'required')}
                    </Form.Field>
                    <Form.Field>
                        <label>
                            Email:
                            </label>
                        <input type="email" value={loginUserInfo.role_id === 2 ? teacherProfile.email : email} name="email" className="cursor-pointer" readOnly disabled={loginUserInfo.role_id === 2 ? true : training_detail_id === '' ? false : true} />
                        {/* {props.EditTeacherFormValidator.message('email', email, 'required')} */}
                    </Form.Field>
                </Form.Group>
                <h3>Teacher information</h3>
                <Form.Group widths="equal" >
                    <Form.Field >
                        <label>
                            Position:
                            </label>
                        <input type="text" value={position} readOnly disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                    </Form.Field>
                    <Form.Field>
                        <label>
                            <b><font color="#3FACC6">Resume</font></b>:
                            </label>
                        {
                            allowUpload ?
                                <input type="file" name="resume" id="resumeFile"
                                    accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                    onChange={(event) => props.handleFileUpload('teacher_info', event)}

                                /> :
                                resume ?
                                    <div className="resume-panel">
                                        <div className="resume">{resume}</div>
                                        {loginUserInfo.role_id === 2 ? <div className="closeBtn"><i aria-hidden="true" className="red close link icon view-icon cursor-pointer" onClick={props.allowFileUpload}></i></div> : training_detail_id === '' ? 
                                        <div className="closeBtn"><i aria-hidden="true" className="red close link icon view-icon cursor-pointer" onClick={props.allowFileUpload}></i></div>
                                        : '' }
                                    </div>
                                    : <input type="file" name="resume" id="resumeFile"
                                        accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                        onChange={(event) => props.handleFileUpload('teacher_info', event)}
                                    />
                        }
                    </Form.Field>
                    <Form.Field>
                        <label>
                            Interview Date:
                            </label>
                        <input type="date" value={interview_date} name="interview_date" onChange={(event) => props.handleFormInput('teacher_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                        {props.EditTeacherFormValidator.message('interview_date', interview_date, 'required')}

                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>
                            Date of Birth:
                            </label>
                        <input type="date" value={date_of_birth} name="date_of_birth" onChange={(event) => props.handleFormInput('teacher_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                        {props.EditTeacherFormValidator.message('date_of_birth', date_of_birth, 'required')}
                    </Form.Field>
                    <Form.Field>
                        <label>
                            Date of Hire:
                            </label>
                        <input type="date" value={date_of_hire} name="date_of_hire" onChange={(event) => props.handleFormInput('teacher_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                        {props.EditTeacherFormValidator.message('date_of_hire', date_of_hire, 'required')}
                    </Form.Field>
                    <Form.Field />
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>
                            Reference 1
                            </label>
                        <input type="text" value={reference1} name="reference1" onChange={(event) => props.handleFormInput('teacher_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                        {props.EditTeacherFormValidator.message('reference1', reference1, 'required')}
                    </Form.Field>
                    <Form.Field>
                        <label>
                            Reference 1 Email:
                            </label>
                        <input type="email" value={ref_1_email} name="ref_1_email" onChange={(event) => props.handleFormInput('teacher_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                        {props.EditTeacherFormValidator.message('ref_1_email', ref_1_email, 'required')}
                    </Form.Field>
                    <Form.Field>
                        <label>
                            Reference 1 Phone:
                            </label>
                        <input type="tel" value={ref_1_phone} name="ref_1_phone" onChange={(event) => props.handleFormInput('teacher_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                        {props.EditTeacherFormValidator.message('ref_1_phone', ref_1_phone, 'required')}
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Reference 2</label>
                        <input type="text" value={reference2} name="reference2" onChange={(event) => props.handleFormInput('teacher_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                        {props.EditTeacherFormValidator.message('reference2', reference2, 'required')}
                    </Form.Field>
                    <Form.Field>
                        <label>Reference 2 Email:</label>
                        <input type="email" value={ref_2_email} name="ref_2_email" onChange={(event) => props.handleFormInput('teacher_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                        {props.EditTeacherFormValidator.message('ref_2_email', ref_2_email, 'required')}
                    </Form.Field>
                    <Form.Field>
                        <label>Reference 2 Phone:</label>
                        <input type="tel" value={ref_2_phone} name="ref_2_phone" onChange={(event) => props.handleFormInput('teacher_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                        {props.EditTeacherFormValidator.message('ref_2_phone', ref_2_phone, 'required')}
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>EEC cert number:</label>
                        <input type="number" value={eec_cert_number} name="eec_cert_number" onChange={(event) => props.handleFormInput('teacher_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                        {props.EditTeacherFormValidator.message('eec_cert_number', eec_cert_number, 'required')}
                    </Form.Field>
                    <Form.Field>
                        <label>EEC pq reg:</label>
                        <input type="text" value={eec_pq_reg} name="eec_pq_reg" onChange={(event) => props.handleFormInput('teacher_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                        {props.EditTeacherFormValidator.message('eec_pq_reg', eec_pq_reg, 'required')}
                    </Form.Field>
                    <Form.Field>
                        <label>EEC pq reg date:</label>
                        <input type="date" value={eec_pq_reg_date} name="eec_pq_reg_date" onChange={(event) => props.handleFormInput('teacher_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                        {props.EditTeacherFormValidator.message('eec_pq_reg_date', eec_pq_reg_date, 'required')}
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field >
                        <div className="ui checkbox">
                            <input type="checkbox" value={cori} name="cori" checked={cori} onClick={props.handleFormCheckbox} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                            <label>CORI</label>
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="ui checkbox">
                            <input type="checkbox" value={dcf} name="dcf" checked={dcf} onClick={props.handleFormCheckbox} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                            <label>DCF</label>
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="ui checkbox">
                            <input type="checkbox" value={physical} name="physical" checked={physical} onClick={props.handleFormCheckbox} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                            <label>
                                Physical
                            </label>
                        </div>

                    </Form.Field>

                </Form.Group>

                <Form.Group widths="equal">
                    <Form.Field >
                        <label>
                            CORI date:
                            </label>
                        <input type="date" value={cori_date} name="cori_date" onChange={(event) => props.handleFormInput('teacher_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                        {props.EditTeacherFormValidator.message('cori_date', cori_date, 'required')}

                    </Form.Field>


                    <Form.Field>
                        <label>
                            DCF date:
                            </label>
                        <input type="date" value={dcf_date} name="dcf_date" onChange={(event) => props.handleFormInput('teacher_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                        {props.EditTeacherFormValidator.message('dcf_date', dcf_date, 'required')}

                    </Form.Field>
                    <Form.Field>
                        <label>
                            Physical date:
                        </label>
                        <input type="date" value={physical_date} name="physical_date" onChange={(event) => props.handleFormInput('teacher_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                        {props.EditTeacherFormValidator.message('physical_date', physical_date, 'required')}

                    </Form.Field>
                </Form.Group>

                <Form.Group widths="equal">
                    <Form.Field>
                        <label>
                            MMR1:
                            </label>
                        <input type="text" value={mmr1} name="mmr1" onChange={(event) => props.handleFormInput('teacher_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                        {props.EditTeacherFormValidator.message('mmr1', mmr1, 'required')}

                    </Form.Field>
                    <Form.Field>
                        <label>
                            MMR2:
                            </label>
                        <input type="text" value={mmr2} name="mmr2" onChange={(event) => props.handleFormInput('teacher_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                        {props.EditTeacherFormValidator.message('mmr2', mmr2, 'required')}

                    </Form.Field>
                    <Form.Field />
                </Form.Group>



                <Form.Group widths="equal">
                    <div className="field">
                        <div className="ui checkbox">
                            <input type="checkbox" name="eecorient" value={eecorient} checked={eecorient} onClick={props.handleFormCheckbox} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                            <label> EECorient </label>
                        </div>
                    </div>
                    <Form.Field>
                        <div className="ui checkbox">
                            <input type="checkbox" name="medical_training" value={medical_training} checked={medical_training} onClick={props.handleFormCheckbox} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                            <label>
                                Medical training
                            </label>
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="ui checkbox">
                            <input type="checkbox" value={usda} name="usda" checked={usda} onClick={props.handleFormCheckbox} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                            <label>
                                USDA
                            </label>
                        </div>
                    </Form.Field>
                </Form.Group>

                <Form.Group widths="equal">
                    <Form.Field>
                        <div className="ui checkbox">
                            <input type="checkbox" value={look_before_lock} name="look_before_lock" checked={look_before_lock} onClick={props.handleFormCheckbox} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                            <label>
                                Look before lock
                            </label>
                        </div>

                    </Form.Field>
                    <Form.Field>
                        <div className="ui checkbox">
                            <input type="checkbox" value={sids} name="sids" checked={sids} onClick={props.handleFormCheckbox} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                            <label>
                                SIDS
                            </label>
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="ui checkbox">
                            <input type="checkbox" value={staff_observe} name="staff_observe" checked={staff_observe} onClick={props.handleFormCheckbox} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                            <label>
                                Staff observe
                            </label>
                        </div>

                    </Form.Field>

                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <div className="ui checkbox">
                            <input type="checkbox" value={first_add} name="first_add" checked={first_add} onClick={props.handleFormCheckbox} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                            <label>
                                First aid
                            </label>
                        </div>
                    </Form.Field>

                    <Form.Field>
                        <div className="ui checkbox">
                            <input type="checkbox" value={prog_orientation} name="prog_orientation" checked={prog_orientation} onClick={props.handleFormCheckbox} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                            <label>
                                Prog orientation
                            </label>
                        </div>

                    </Form.Field>
                    <Form.Field>
                        <div className="ui checkbox">

                            <input type="checkbox" value={staff_evaluation} name="staff_evaluation" checked={staff_evaluation} onClick={props.handleFormCheckbox} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                            <label>
                                Staff evaluation
                            </label>
                        </div>

                    </Form.Field>

                </Form.Group>

                <Form.Group widths="equal">

                    <Form.Field>
                        <label>
                            First aid date:
                            </label>
                        <input type="date" value={first_add_date} name="first_add_date" onChange={(event) => props.handleFormInput('teacher_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                        {props.EditTeacherFormValidator.message('first_add_date', first_add_date, 'required')}

                    </Form.Field>

                    <Form.Field>
                        <label>
                            Prog orientation date:
                            </label>
                        <input type="date" value={prog_orientation_date} name="prog_orientation_date" onChange={(event) => props.handleFormInput('teacher_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                        {props.EditTeacherFormValidator.message('prog_orientation_date', prog_orientation_date, 'required')}

                    </Form.Field>

                    <Form.Field >

                        <label>
                            Staff evaluation date:</label>
                        <input type="date" value={staff_evaluation_date} name="staff_evaluation_date" onChange={(event) => props.handleFormInput('teacher_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                        {props.EditTeacherFormValidator.message('staff_evaluation_date', staff_evaluation_date, 'required')}

                    </Form.Field>
                </Form.Group>

                <Form.Group widths="equal">
                    <Form.Field>
                        <label>
                            7-Dbus Lic:
                            </label>
                        <input type="text" value={dbus_lic} name="dbus_lic" onChange={(event) => props.handleFormInput('teacher_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                        {props.EditTeacherFormValidator.message('dbus_lic', dbus_lic, 'required')}

                    </Form.Field>
                    <Form.Field>
                        <label>
                            7-Dbus Lic date:
                            </label>
                        <input type="date" value={dbus_lic_date} name="dbus_lic_date" onChange={(event) => props.handleFormInput('teacher_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                        {props.EditTeacherFormValidator.message('dbus_lic_date', dbus_lic_date, 'required')}

                    </Form.Field>
                    <Form.Field />
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>
                            Program name:
                            </label>
                        <input type="text" value={program_name} name="program_name" onChange={(event) => props.handleFormInput('teacher_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                        {props.EditTeacherFormValidator.message('program_name', program_name, 'required')}

                    </Form.Field>
                    <Form.Field>
                        <label>
                            Completed by:
                            </label>
                        <input type="text" value={completed_by} name="completed_by" onChange={(event) => props.handleFormInput('teacher_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                        {props.EditTeacherFormValidator.message('completed_by', completed_by, 'required')}

                    </Form.Field>
                    <Form.Field>
                        <label>
                            Completed date:
                            </label>
                        <input type="date" value={completed_date} name="completed_date" onChange={(event) => props.handleFormInput('teacher_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true}/>
                        {props.EditTeacherFormValidator.message('completed_date', completed_date, 'required')}

                    </Form.Field>
                </Form.Group>



                <Form.Group widths="equal">
                    <Form.Field className="training-radio-btn-alignment">
                        <h3>
                            EEC Essentials Training
</h3>
                    </Form.Field>
                    <Form.Field />
                    <Form.Field /><Form.Field />
                </Form.Group>

                <Form.Group widths="equal">
                    <Form.Field className="training-radio-btn-alignment">
                        <label>
                            Child abuse and Neglect
                            </label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="child_abuse_neglect" checked={child_abuse_neglect === 'yes' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="child_abuse_neglect" checked={child_abuse_neglect === 'no' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label>No</label>
                        </div>
                    </Form.Field>
                    <Form.Field >
                        <label>
                            Date:
                            </label>
                        <input type="date" name="child_abuse_neglect_date" value={child_abuse_neglect_date} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                    </Form.Field>
                    <Form.Field className="training-radio-btn-alignment">
                        <label>
                            Emergency Response Planning
                            </label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="emergency_response_planning" checked={emergency_response_planning === 'yes' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="emergency_response_planning" checked={emergency_response_planning === 'no' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label>No</label>
                        </div>
                    </Form.Field>
                    <Form.Field >
                        <label>
                            Date:
                            </label>
                        <input type="date" name="emergency_response_planning_date" value={emergency_response_planning_date} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                    </Form.Field>
                </Form.Group>



                <Form.Group widths="equal">
                    <Form.Field className="training-radio-btn-alignment">
                        <label>
                            First Aid & CPR Overview
                    </label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="first_aid_cpr_overview" checked={first_aid_cpr_overview === 'yes' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="first_aid_cpr_overview" checked={first_aid_cpr_overview === 'no' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label>No</label>
                        </div>
                    </Form.Field>
                    <Form.Field >
                        <label>
                            Date:
                            </label>
                        <input type="date" name="first_aid_cpr_overview_date" value={first_aid_cpr_overview_date} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                    </Form.Field>
                    <Form.Field className="training-radio-btn-alignment">
                        <label>
                            Food Related Risk and Response                    </label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="food_related_risk_response" checked={food_related_risk_response === 'yes' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="food_related_risk_response" checked={food_related_risk_response === 'no' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label>No</label>
                        </div>
                    </Form.Field>
                    <Form.Field >
                        <label>
                            Date:
                            </label>
                        <input type="date" name="food_related_risk_response_date" value={food_related_risk_response_date} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                    </Form.Field>
                </Form.Group>

                <Form.Group widths="equal" >
                    <Form.Field className="training-radio-btn-alignment">
                        <label>
                            Hazardous Materials
                   </label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="hazardous_materials" checked={hazardous_materials === 'yes' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="hazardous_materials" checked={hazardous_materials === 'no' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label>No</label>
                        </div>
                    </Form.Field>
                    <Form.Field >
                        <label>
                            Date:
                            </label>
                        <input type="date" name="hazardous_materials_date" value={hazardous_materials_date} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                    </Form.Field>
                    <Form.Field className="training-radio-btn-alignment">
                        <label>
                            Infant Safe Sleeping Practices
                   </label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="infant_safe_sleeping_practices" checked={infant_safe_sleeping_practices === 'yes' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="infant_safe_sleeping_practices" checked={infant_safe_sleeping_practices === 'no' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label>No</label>
                        </div>
                    </Form.Field>
                    <Form.Field >
                        <label>
                            Date:
                            </label>
                        <input type="date" name="infant_safe_sleeping_practices_date" value={infant_safe_sleeping_practices_date} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                    </Form.Field>
                </Form.Group>

                <Form.Group widths="equal">
                    <Form.Field className="training-radio-btn-alignment">
                        <label>
                            Infectious Diseases and Immunizations
                   </label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="infectious_diseases_immunizations" checked={infectious_diseases_immunizations === 'yes' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="infectious_diseases_immunizations" checked={infectious_diseases_immunizations === 'no' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label>No</label>
                        </div>
                    </Form.Field>
                    <Form.Field >
                        <label>
                            Date:
                            </label>
                        <input type="date" name="infectious_diseases_immunizations_date" value={infectious_diseases_immunizations_date} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                    </Form.Field>
                    <Form.Field className="training-radio-btn-alignment">
                        <label>
                            Introduction to Child Development
                   </label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="introduction_child_development" checked={introduction_child_development === 'yes' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="introduction_child_development" checked={introduction_child_development === 'no' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label>No</label>
                        </div>
                    </Form.Field>
                    <Form.Field >
                        <label>
                            Date:
                            </label>
                        <input type="date" name="introduction_child_development_date" value={introduction_child_development_date} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                    </Form.Field>
                </Form.Group>

                <Form.Group widths="equal">
                    <Form.Field className="training-radio-btn-alignment">
                        <label>

                            Medication Administration
                   </label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="medication_administration" checked={medication_administration === 'yes' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="medication_administration" checked={medication_administration === 'no' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label>No</label>
                        </div>
                    </Form.Field>
                    <Form.Field >
                        <label>
                            Date:
                            </label>
                        <input type="date" name="medication_administration_date" value={medication_administration_date} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                    </Form.Field>
                    <Form.Field className="training-radio-btn-alignment">
                        <label>
                            Physical Premises Safety
                   </label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="physical_premises_safety" checked={physical_premises_safety === 'yes' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="physical_premises_safety" checked={physical_premises_safety === 'no' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label>No</label>
                        </div>
                    </Form.Field>
                    <Form.Field >
                        <label>
                            Date:
                            </label>
                        <input type="date" name="physical_premises_safety_date" value={physical_premises_safety_date} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                    </Form.Field>
                </Form.Group>


                <Form.Group widths="equal">
                    <Form.Field className="training-radio-btn-alignment">
                        <label>
                            Shaken Baby Syndrome
                   </label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="shaken_baby_syndrome" checked={shaken_baby_syndrome === 'yes' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="shaken_baby_syndrome" checked={shaken_baby_syndrome === 'no' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label>No</label>
                        </div>
                    </Form.Field>
                    <Form.Field >
                        <label>
                            Date:
                            </label>
                        <input type="date" name="shaken_baby_syndrome_date" value={shaken_baby_syndrome_date} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                    </Form.Field>
                    <Form.Field className="training-radio-btn-alignment">
                        <label>

                            Transporting Children
                   </label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="transporting_children" checked={transporting_children === 'yes' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="transporting_children" checked={transporting_children === 'no' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label>No</label>
                        </div>
                    </Form.Field>
                    <Form.Field >
                        <label>
                            Date:
                            </label>
                        <input type="date" name="transporting_children_date" value={transporting_children_date} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                    </Form.Field>
                </Form.Group>

                <Form.Group widths="equal">
                    <Form.Field className="training-radio-btn-alignment">
                        <label>
                            Total Hours
                   </label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="total_hours" checked={total_hours === 'yes' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="total_hours" checked={total_hours === 'no' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label>No</label>
                        </div>
                    </Form.Field>
                    <Form.Field >
                        <label>
                            Date:
                            </label>
                        <input type="date" name="total_hours_date" value={total_hours_date} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                    </Form.Field>
                    <Form.Field />
                    <Form.Field />
                </Form.Group>



                <Form.Group widths="equal">
                    <Form.Field className="training-radio-btn-alignment">
                        <h3>
                            EEC Yearly Renewal
</h3>
                    </Form.Field>
                    <Form.Field />
                    <Form.Field /><Form.Field />
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field className="training-radio-btn-alignment">
                        <label>

                            EEC Yearly Renewal
                   </label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="eec_yearly_renewal" checked={eec_yearly_renewal === 'yes' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="eec_yearly_renewal" checked={eec_yearly_renewal === 'no' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label>No</label>
                        </div>
                    </Form.Field>
                    <Form.Field >
                        <label>
                            Date:
                            </label>
                        <input type="date" name="eec_yearly_renewal_date" value={eec_yearly_renewal_date} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                    </Form.Field>
                    <Form.Field className="training-radio-btn-alignment">
                        <label>
                            Child Abuse and Neglect
                   </label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="eec_child_abuse_neglect" checked={eec_child_abuse_neglect === 'yes' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="eec_child_abuse_neglect" checked={eec_child_abuse_neglect === 'no' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label>No</label>
                        </div>
                    </Form.Field>
                    <Form.Field >
                        <label>
                            Date:
                            </label>
                        <input type="date" name="eec_child_abuse_neglect_date" value={eec_child_abuse_neglect_date} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                    </Form.Field>
                </Form.Group>

                <Form.Group widths="equal">
                    <Form.Field className="training-radio-btn-alignment">
                        <label>
                            Emergency Response Planning
                   </label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="eec_emergency_response_planning" checked={eec_emergency_response_planning === 'yes' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="eec_emergency_response_planning" checked={eec_emergency_response_planning === 'no' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label>No</label>
                        </div>
                    </Form.Field>
                    <Form.Field >
                        <label>
                            Date:
                            </label>
                        <input type="date" name="eec_emergency_response_planning_date" value={eec_emergency_response_planning_date} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                    </Form.Field>
                    <Form.Field className="training-radio-btn-alignment">
                        <label>

                            Food Related Risk and Response
                   </label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="eec_food_related_risk_response" checked={eec_food_related_risk_response === 'yes' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="eec_food_related_risk_response" checked={eec_food_related_risk_response === 'no' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label>No</label>
                        </div>
                    </Form.Field>
                    <Form.Field >
                        <label>
                            Date:
                            </label>
                        <input type="date" name="eec_food_related_risk_response_date" value={eec_food_related_risk_response_date} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                    </Form.Field>
                </Form.Group>


                <Form.Group widths="equal">
                    <Form.Field className="training-radio-btn-alignment">
                        <label>
                            Infectious Disease and Immunization
                   </label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="eec_infectious_diseases_immunizations" checked={eec_infectious_diseases_immunizations === 'yes' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="eec_infectious_diseases_immunizations" checked={eec_infectious_diseases_immunizations === 'no' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label>No</label>
                        </div>
                    </Form.Field>
                    <Form.Field >
                        <label>
                            Date:
                            </label>
                        <input type="date" name="eec_infectious_diseases_immunizations_date" value={eec_infectious_diseases_immunizations_date} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                    </Form.Field>
                    <Form.Field className="training-radio-btn-alignment">
                        <label>
                            Medication Administration
                   </label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="eec_medication_administration" checked={eec_medication_administration === 'yes' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="eec_medication_administration" checked={eec_medication_administration === 'no' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label>No</label>
                        </div>
                    </Form.Field>
                    <Form.Field >
                        <label>
                            Date:
                            </label>
                        <input type="date" name="eec_medication_administration_date" value={eec_medication_administration_date} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                    </Form.Field>
                </Form.Group>

                <Form.Group widths="equal">
                    <Form.Field className="training-radio-btn-alignment">
                        <label>
                            Transporting Children
                   </label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="eec_transporting_children" checked={eec_transporting_children === 'yes' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="eec_transporting_children" checked={eec_transporting_children === 'no' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label>No</label>
                        </div>
                    </Form.Field>
                    <Form.Field >
                        <label>
                            Date:
                            </label>
                        <input type="date" name="eec_transporting_children_date" value={eec_transporting_children_date} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                    </Form.Field>
                    <Form.Field className="training-radio-btn-alignment">
                        <label>
                            Infant Safe Sleeping Practices
                   </label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="eec_infant_safe_sleeping_practices" checked={eec_infant_safe_sleeping_practices === 'yes' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="eec_infant_safe_sleeping_practices" checked={eec_infant_safe_sleeping_practices === 'no' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label>No</label>
                        </div>
                    </Form.Field>
                    <Form.Field >
                        <label>
                            Date:
                            </label>
                        <input type="date" name="eec_infant_safe_sleeping_practices_date" value={eec_infant_safe_sleeping_practices_date} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                    </Form.Field>

                </Form.Group>


                <Form.Group widths="equal">
                    <Form.Field className="training-radio-btn-alignment">
                        <label>

                            Shaken Baby Syndrome
                   </label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="eec_shaken_baby_syndrome" checked={eec_shaken_baby_syndrome === 'yes' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="eec_shaken_baby_syndrome" checked={eec_shaken_baby_syndrome === 'no' ? true : false} onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                            <label>No</label>
                        </div>
                    </Form.Field>
                    <Form.Field >
                        <label>
                            Date:
                            </label>
                        <input type="date" value={eec_shaken_baby_syndrome_date} name="eec_shaken_baby_syndrome_date" onChange={(event) => props.handleFormInput('training_info', event)} disabled={loginUserInfo.role_id === 2 ? false : training_detail_id === '' ? false : true} />
                    </Form.Field>
                    <Form.Field />
                    <Form.Field />

                </Form.Group>

                

                
                <Form.Group widths="equal">
                    <Form.Field className={loginUserInfo.role_id === 2 ?"training-radio-btn-alignment" :''}>
                    {loginUserInfo.role_id === 2 ? <Button type="submit" color="green" onClick={props.showLoader}>Submit</Button> : training_detail_id === '' ? <Button type="submit" color="green" onClick={props.showLoader}>Submit</Button> : ''}
                    </Form.Field>
                    <Form.Field />
                    <Form.Field />
                    <Form.Field />

                </Form.Group>
            </Form>

        </div>

    )
}
