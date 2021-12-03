import React from 'react'
import { Form } from 'semantic-ui-react';

export function Reference(props) {
    let { staff_hiring_form,editType } = props,
    { staff_references_detail } = staff_hiring_form,
nextformName='staffEmergencyForm';

    return (
        <Form onSubmit={(event)=>props._showLoader('staff_references_detail',nextformName,staff_references_detail)}>
        <Form.Group widths="equal">
            <Form.Field>
                <h4>REFERENCES</h4>
                <h5>List 2-3 references (professionals, friends, clergy, etc) </h5>
            </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
            <Form.Field>
                <h5>Reference 1 </h5>
            </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
            <Form.Field>
                <label>Name: </label>
                <input type="text" id={0} name="ref_name" value={staff_references_detail[0].ref_name} onChange={(event) => props._handleFormInput('staff_references_detail', event)} disabled={editType==='editForm'?true:false}/>
            </Form.Field>
            <Form.Field>
                <label>Relationship:</label>
                <input type="text" id={0} name="ref_relationship" value={staff_references_detail[0].ref_relationship} onChange={(event) => props._handleFormInput('staff_references_detail', event)} disabled={editType==='editForm'?true:false}/>
            </Form.Field>
            <Form.Field>
                <label>Address: </label>
                <input type="text" id={0} name="ref_address" value={staff_references_detail[0].ref_address} onChange={(event) => props._handleFormInput('staff_references_detail', event)} disabled={editType==='editForm'?true:false}/>
            </Form.Field>
            <Form.Field>
                <label>Phone:</label>
                <input type="number" id={0} name="ref_phone" value={staff_references_detail[0].ref_phone} onChange={(event) => props._handleFormInput('staff_references_detail', event)} disabled={editType==='editForm'?true:false}/>
            </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
            <Form.Field>
                <h5>Reference 2 </h5>
            </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
            <Form.Field>
                <label>Name: </label>
                <input type="text" id={1} name="ref_name" value={staff_references_detail[1].ref_name} onChange={(event) => props._handleFormInput('staff_references_detail', event)} disabled={editType==='editForm'?true:false}/>
            </Form.Field>
            <Form.Field>
                <label>Relationship:</label>
                <input type="text" id={1} name="ref_relationship" value={staff_references_detail[1].ref_relationship} onChange={(event) => props._handleFormInput('staff_references_detail', event)} disabled={editType==='editForm'?true:false}/>
            </Form.Field>
            <Form.Field>
                <label>Address: </label>
                <input type="text" id={1} name="ref_address" value={staff_references_detail[1].ref_address} onChange={(event) => props._handleFormInput('staff_references_detail', event)} disabled={editType==='editForm'?true:false}/>
            </Form.Field>
            <Form.Field>
                <label>Phone:</label>
                <input type="number" id={1} name="ref_phone" value={staff_references_detail[1].ref_phone} onChange={(event) => props._handleFormInput('staff_references_detail', event)} disabled={editType==='editForm'?true:false}/>
            </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
            <Form.Field>
                <h5>Reference 3</h5>
            </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
            <Form.Field>
                <label>Name: </label>
                <input type="text" id={2} name="ref_name" value={staff_references_detail[2].ref_name} onChange={(event) => props._handleFormInput('staff_references_detail', event)} disabled={editType==='editForm'?true:false}/>
            </Form.Field>
            <Form.Field>
                <label>Relationship:</label>
                <input type="text" id={2} name="ref_relationship" value={staff_references_detail[2].ref_relationship} onChange={(event) => props._handleFormInput('staff_references_detail', event)} disabled={editType==='editForm'?true:false}/>
            </Form.Field>
            <Form.Field>
                <label>Address: </label>
                <input type="text" id={2} name="ref_address" value={staff_references_detail[2].ref_address} onChange={(event) => props._handleFormInput('staff_references_detail', event)} disabled={editType==='editForm'?true:false}/>
            </Form.Field>
            <Form.Field>
                <label>Phone:</label>
                <input type="number" id={2} name="ref_phone" value={staff_references_detail[2].ref_phone} onChange={(event) => props._handleFormInput('staff_references_detail', event)} disabled={editType==='editForm'?true:false}/>
            </Form.Field>
        </Form.Group>
        <div className="equal width fields"><div className="field"><button type="submit" className="ui positive button" disabled={editType==='editForm'?true:false}>Submit</button></div></div>
    </Form>
    )
}
