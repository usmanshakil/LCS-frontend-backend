import React from 'react'
import { Form } from 'semantic-ui-react';


export function PersonalReference(props) {
    let { staff_hiring_form,editType } = props,
        { staff_personal_reference_detail } = staff_hiring_form,
        { reference_name,
            title_relationship,
            individual_relation_age,
            comments_on_character,
            weakness,
            strength,
            reliable,
            patient,
            compassionate } = staff_personal_reference_detail,
        nextformName='professionalRefernce';


    return (
        <Form onSubmit={(event)=>props._showLoader('staff_personal_reference_detail',nextformName,staff_personal_reference_detail)}> 

            <Form.Group widths="equal">
                <Form.Field>
                    <h4>Personal Reference:  -    [ To be completed by Employer ]</h4>
                </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Field>
                    <label>Reference Name? </label>
                    <input type="text" name="reference_name" value={reference_name} onChange={(event) => props._handleFormInput('staff_personal_reference_detail', event)} disabled={editType==='editForm'?true:false}/>

                </Form.Field>
                <Form.Field>
                    <label>Title/Relationship to potential employee? </label>
                    <input type="text" name="title_relationship" value={title_relationship} onChange={(event) => props._handleFormInput('staff_personal_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                </Form.Field>
                
            </Form.Group>
            <Form.Group widths="equal">
            <Form.Field>
                    <label>How long do you know this individual? </label>
                    <input type="text" name="individual_relation_age" value={individual_relation_age} onChange={(event) => props._handleFormInput('staff_personal_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                </Form.Field>
                <Form.Field>
                    <label>Comments on their character? </label>
                    <input type="text" name="comments_on_character" value={comments_on_character} onChange={(event) => props._handleFormInput('staff_personal_reference_detail', event)} disabled={editType==='editForm'?true:false}/>

                </Form.Field>
              
            </Form.Group>
            <Form.Group widths="equal">
            <Form.Field>
                    <label>What is their weakness?</label>
                    <input type="text" name="weakness" value={weakness} onChange={(event) => props._handleFormInput('staff_personal_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                </Form.Field>
                <Form.Field>
                    <label>What is their strength? </label>
                    <input type="text" name="strength" value={strength} onChange={(event) => props._handleFormInput('staff_personal_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Field>
                    <label>In your experience with this individual, have you found him/her to be:</label>
                </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Field>
                    <label>Reliable? </label>
                    <div className="ui radio checkbox">
                        <input type="radio" value='yes' name="reliable" checked={reliable === 'yes'?true:false} onChange={(event) => props._handleFormInput('staff_personal_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                        <label className="mr-10">Yes</label>
                    </div><div className="ui radio checkbox">
                        <input type="radio" value='no' name="reliable" checked={reliable === 'no'?true:false} onChange={(event) => props._handleFormInput('staff_personal_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                        <label >No</label>
                    </div>
                </Form.Field>
                <Form.Field>
                    <label>Patient?</label>
                    <div className="ui radio checkbox">
                        <input type="radio" value='yes' name="patient" checked={patient === 'yes'?true:false} onChange={(event) => props._handleFormInput('staff_personal_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                        <label className="mr-10">Yes</label>
                    </div><div className="ui radio checkbox">
                        <input type="radio" value='no' name="patient" checked={patient === 'no'?true:false} onChange={(event) => props._handleFormInput('staff_personal_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                        <label >No</label>
                    </div>
                </Form.Field> <Form.Field>
                    <label>Compassionate? </label>
                    <div className="ui radio checkbox">
                        <input type="radio" value='yes' name="compassionate" checked={compassionate === 'yes'?true:false} onChange={(event) => props._handleFormInput('staff_personal_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                        <label className="mr-10">Yes</label>
                    </div><div className="ui radio checkbox">
                        <input type="radio" value='no' name="compassionate" checked={compassionate === 'no'?true:false} onChange={(event) => props._handleFormInput('staff_personal_reference_detail', event)} disabled={editType==='editForm'?true:false}/>
                        <label >No</label>
                    </div>
                </Form.Field>
            </Form.Group>
            <div className="equal width fields"><div className="field"><button type="submit" className="ui positive button" disabled={editType==='editForm'?true:false}>Submit</button></div></div>

        </Form>
    )
}
