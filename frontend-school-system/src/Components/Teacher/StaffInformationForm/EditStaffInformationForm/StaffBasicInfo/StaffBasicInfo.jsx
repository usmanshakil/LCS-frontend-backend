import React from 'react';
import { Form } from 'semantic-ui-react';


export  function StaffBasicInfo(props) {

    let {staff_hiring_form}=props,
    {staff_hiring_form_detail}=staff_hiring_form,
    {program_name,
    name,
    date_of_birth,
    address,
    telephone_number,
    date_of_hire,
    social_security_number,
    current_position,
    supervisor_name}=staff_hiring_form_detail,
    nextformName='administartionAndStaff';
    return (
        <Form onSubmit={(event)=>props._showLoader('staff_hiring_form_detail',nextformName,staff_hiring_form_detail)}>
        <Form.Group widths="equal">
            <Form.Field>
                <label>PROGRAM NAME:</label>
                <input type="text" value={program_name} name="program_name" onChange={(event)=>props._handleFormInput('staff_hiring_form_detail',event)}/>
            </Form.Field>
            <Form.Field />
        </Form.Group>
        <Form.Group widths="equal">
            <Form.Field>
                <label>Name:</label>
                <input type="text" value={name} name="name" onChange={(event)=>props._handleFormInput('staff_hiring_form_detail',event)}/>
            </Form.Field>
            <Form.Field>
                <label>Date of Birth:</label>
                <input type="date" value={date_of_birth} name="date_of_birth" onChange={(event)=>props._handleFormInput('staff_hiring_form_detail',event)}/>
            </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
            <Form.Field>
                <label>Address:</label>
                <input type="text" value={address} name="address" onChange={(event)=>props._handleFormInput('staff_hiring_form_detail',event)}/>
            </Form.Field>
            <Form.Field>
                <label>Telephone Number:</label>
                <input type="number" value={telephone_number} name="telephone_number" onChange={(event)=>props._handleFormInput('staff_hiring_form_detail',event)}/>
            </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
            <Form.Field>
                <label>Date of Hire:</label>
                <input type="date" value={date_of_hire} name="date_of_hire" onChange={(event)=>props._handleFormInput('staff_hiring_form_detail',event)}/>
            </Form.Field>
            <Form.Field>
                <label>Social Security #:(optional)	</label>
                <input type="text" value={social_security_number} minLength="9" maxLength="9" name="social_security_number" onChange={(event)=>props._handleFormInput('staff_hiring_form_detail',event)}/>
            </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
            <Form.Field>
                <label>Current Position:</label>
                <input type="text" value={current_position} name="current_position" onChange={(event)=>props._handleFormInput('staff_hiring_form_detail',event)}/>
            </Form.Field>
            <Form.Field>
                <label>Supervisor’s Name:</label>
                <input type="text" value={supervisor_name} name="supervisor_name" onChange={(event)=>props._handleFormInput('staff_hiring_form_detail',event)}/>
            </Form.Field>
        </Form.Group>
        <div className="equal width fields"><div className="field"><button type="submit" className="ui positive button">Submit</button></div></div>
    </Form>
    )
}
