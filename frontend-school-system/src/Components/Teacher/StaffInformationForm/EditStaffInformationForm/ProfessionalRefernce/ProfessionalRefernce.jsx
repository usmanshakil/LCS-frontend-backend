import React from 'react';
import {  Form } from 'semantic-ui-react';


export  function ProfessionalRefernce(props) {
    let { staff_hiring_form ,editType} = props,
    { staff_professional_reference_detail } = staff_hiring_form,
    {   reference_name,
    title_relationship,
    employee_experiece_organization,
    punctuality,
    attendance,
    coworkers,
    supervisors,
    parents,
    children,
    will_employee_hired_again
}=staff_professional_reference_detail,
nextformName='reference';

    return (
        <Form onSubmit={(event)=>props._showLoader('staff_professional_reference_detail',nextformName,staff_professional_reference_detail)}>
            <Form.Group widths="equal">
                            <Form.Field>
                                <h4>Professional Reference:  -    [ To be completed by Employer ]</h4>
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <label>Reference Name? </label>
                                <input type="text" name="reference_name" value={reference_name} onChange={(event) => props._handleFormInput('staff_professional_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                            </Form.Field>
                            <Form.Field />

                        </Form.Group>
                     
                     <Form.Group widths="equal">
                     <Form.Field>
                                <label>Title/Relationship to potential employee? </label>
                                <input type="text" name="title_relationship" value={title_relationship} onChange={(event) => props._handleFormInput('staff_professional_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                            </Form.Field>
                            <Form.Field>
                                <label>How long did this employee work for your organization? </label>
                                <input type="text" name="employee_experiece_organization" value={employee_experiece_organization} onChange={(event) => props._handleFormInput('staff_professional_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                            </Form.Field>
                     </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <label>Punctuality? (circle one)</label>
                                <div className="ui radio checkbox">
                                    <input type="radio" value='great' name="punctuality" checked={punctuality === 'great'?true:false} onChange={(event) => props._handleFormInput('staff_professional_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                                    <label className="mr-10">Great</label>
                                </div>
                                <div className="ui radio checkbox">
                                    <input type="radio" value='good' name="punctuality" checked={punctuality === 'good'?true:false} onChange={(event) => props._handleFormInput('staff_professional_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                                    <label className="mr-10">Good</label>
                                </div>
                                <div className="ui radio checkbox">
                                    <input type="radio" value='challengingAtTimes' name="punctuality" checked={punctuality === 'challengingAtTimes'?true:false} onChange={(event) => props._handleFormInput('staff_professional_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                                    <label className="mr-10">Challenging at times</label>
                                </div><div className="ui radio checkbox">
                                    <input type="radio" value='notWell' name="punctuality" checked={punctuality === 'notWell'?true:false} onChange={(event) => props._handleFormInput('staff_professional_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                                    <label className="mr-10">Not Well</label>
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <label>Attendance? (circle one)  </label>
                                <div className="ui radio checkbox">
                                    <input type="radio" value='great' name="attendance" checked={attendance === 'great'?true:false} onChange={(event) => props._handleFormInput('staff_professional_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                                    <label className="mr-10">Great</label>
                                </div>
                                <div className="ui radio checkbox">
                                    <input type="radio" value='good' name="attendance" checked={attendance === 'good'?true:false} onChange={(event) => props._handleFormInput('staff_professional_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                                    <label className="mr-10">Good</label>
                                </div>
                                <div className="ui radio checkbox">
                                    <input type="radio" value='challengingAtTimes' name="attendance" checked={attendance === 'challengingAtTimes'?true:false} onChange={(event) => props._handleFormInput('staff_professional_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                                    <label className="mr-10">Challenging at times</label>
                                </div><div className="ui radio checkbox">
                                    <input type="radio" value='notWell' name="attendance" checked={attendance === 'notWell'?true:false} onChange={(event) => props._handleFormInput('staff_professional_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                                    <label className="mr-10">Not Well</label>
                                </div>
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <label>How did the employee get along with:</label>
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <label>Coworkers? (circle one)</label>
                                <div className="ui radio checkbox">
                                    <input type="radio" value='great' name="coworkers" checked={coworkers === 'great'?true:false} onChange={(event) => props._handleFormInput('staff_professional_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                                    <label className="mr-10">Great</label>
                                </div>
                                <div className="ui radio checkbox">
                                    <input type="radio" value='good' name="coworkers" checked={coworkers === 'good'?true:false} onChange={(event) => props._handleFormInput('staff_professional_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                                    <label className="mr-10">Good</label>
                                </div>
                                <div className="ui radio checkbox">
                                    <input type="radio" value='challengingAtTimes' name="coworkers" checked={coworkers === 'challengingAtTimes'?true:false} onChange={(event) => props._handleFormInput('staff_professional_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                                    <label className="mr-10">Challenging at times</label>
                                </div><div className="ui radio checkbox">
                                    <input type="radio" value='notWell' name="coworkers" checked={coworkers === 'notWell'?true:false} onChange={(event) => props._handleFormInput('staff_professional_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                                    <label className="mr-10">Not Well</label>
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <label>Supervisors? (circle one)</label>
                                <div className="ui radio checkbox">
                                    <input type="radio" value='great' name="supervisors" checked={supervisors === 'great'?true:false} onChange={(event) => props._handleFormInput('staff_professional_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                                    <label className="mr-10">Great</label>
                                </div>
                                <div className="ui radio checkbox">
                                    <input type="radio" value='good' name="supervisors" checked={supervisors === 'good'?true:false} onChange={(event) => props._handleFormInput('staff_professional_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                                    <label className="mr-10">Good</label>
                                </div>
                                <div className="ui radio checkbox">
                                    <input type="radio" value='challengingAtTimes' name="supervisors" checked={supervisors === 'challengingAtTimes'?true:false} onChange={(event) => props._handleFormInput('staff_professional_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                                    <label className="mr-10">Challenging at times</label>
                                </div><div className="ui radio checkbox">
                                    <input type="radio" value='notWell' name="supervisors" checked={supervisors === 'notWell'?true:false} onChange={(event) => props._handleFormInput('staff_professional_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                                    <label className="mr-10">Not Well</label>
                                </div>
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <label>Parents? (circle one)</label>
                                <div className="ui radio checkbox">
                                    <input type="radio" value='great' name="parents" checked={parents === 'great'?true:false} onChange={(event) => props._handleFormInput('staff_professional_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                                    <label className="mr-10">Great</label>
                                </div>
                                <div className="ui radio checkbox">
                                    <input type="radio" value='good' name="parents" checked={parents === 'good'?true:false} onChange={(event) => props._handleFormInput('staff_professional_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                                    <label className="mr-10">Good</label>
                                </div>
                                <div className="ui radio checkbox">
                                    <input type="radio" value='challengingAtTimes' name="parents" checked={parents === 'challengingAtTimes'?true:false} onChange={(event) => props._handleFormInput('staff_professional_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                                    <label className="mr-10">Challenging at times</label>
                                </div><div className="ui radio checkbox">
                                    <input type="radio" value='notWell' name="parents" checked={parents === 'notWell'?true:false} onChange={(event) => props._handleFormInput('staff_professional_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                                    <label className="mr-10">Not Well</label>
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <label>Children? (circle one)</label>
                                <div className="ui radio checkbox">
                                    <input type="radio" value='great' name="children" checked={children === 'great'?true:false} onChange={(event) => props._handleFormInput('staff_professional_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                                    <label className="mr-10">Great</label>
                                </div>
                                <div className="ui radio checkbox">
                                    <input type="radio" value='good' name="children" checked={children === 'good'?true:false} onChange={(event) => props._handleFormInput('staff_professional_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                                    <label className="mr-10">Good</label>
                                </div>
                                <div className="ui radio checkbox">
                                    <input type="radio" value='challengingAtTimes' name="children"  checked={children === 'challengingAtTimes'?true:false} onChange={(event) => props._handleFormInput('staff_professional_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                                    <label className="mr-10">Challenging at times</label>
                                </div><div className="ui radio checkbox">
                                    <input type="radio" value='notWell' name="children" checked={children === 'notWell'?true:false} onChange={(event) => props._handleFormInput('staff_professional_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                                    <label className="mr-10">Not Well</label>
                                </div>
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <label>Would you hire this employee again? </label>
                                <input type="text" name="will_employee_hired_again" value={will_employee_hired_again}  onChange={(event) => props._handleFormInput('staff_professional_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                            </Form.Field>
                            <Form.Field />
                        </Form.Group>
        <div className="equal width fields"><div className="field"><button type="submit" className="ui positive button" disabled={editType==='editForm'?true:false}>Submit</button></div></div>

        </Form>
    )
}
