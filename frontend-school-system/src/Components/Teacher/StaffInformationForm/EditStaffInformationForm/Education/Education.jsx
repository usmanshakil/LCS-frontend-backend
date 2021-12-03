import React from 'react'
import { Form } from 'semantic-ui-react';

export function Education(props) {
    let { staff_hiring_form, sameAddress } = props,
        { educationModalSameAddress } = sameAddress,
        { staff_education_detail } = staff_hiring_form,
        {
            position_applied_for,
            name,
            address,
            email_address,
            city,
            zip_code,
            // ssn,
            high_school,
            college_attended_degree,
            other_courses_workshops_attended
        } = staff_education_detail,
        nextformName = 'personalReference';
    return (
        <Form onSubmit={(event) => props._showLoader('staff_education_detail', nextformName, staff_education_detail)}>
            <Form.Group widths="equal">
                <Form.Field>
                    <h4>EDUCATION</h4>
                </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Field>
                    <label>Position Applied for :</label>
                    <input type="text" name="position_applied_for" value={position_applied_for} onChange={(event) => props._handleFormInput('staff_education_detail', event)} readOnly={educationModalSameAddress} />
                </Form.Field>
                <Form.Field>
                    <label>Name: </label>
                    <input type="text" name="name" value={name} onChange={(event) => props._handleFormInput('staff_education_detail', event)} readOnly={educationModalSameAddress} />
                </Form.Field>
                <Form.Field>
                    <label>Address:</label>
                    <input type="text" name="address" value={address} onChange={(event) => props._handleFormInput('staff_education_detail', event)} readOnly={educationModalSameAddress} />
                </Form.Field>
            </Form.Group>
           <Form.Group widths="equal">
                {/* <Form.Field>
                    <label>SSN: </label>
                    <input type="text" name="ssn" value={ssn} minLength="9" maxLength="9" onChange={(event) => props._handleFormInput('staff_education_detail', event)} readOnly={educationModalSameAddress} required />
                </Form.Field> 
                className="field same-address-field"
                */}
                <div className="field">
                    <div className="ui compact same-address-toggle segment ">
                        <div className="ui toggle checkbox">
                            <input type="checkbox" value={educationModalSameAddress} name="educationModalSameAddress" checked={educationModalSameAddress} onClick={(event) => props._toggleSameAddress('staff_education_detail', event)} />
                            <label>Same as Previous Form</label>
                        </div>
                    </div>
                </div>
                <Form.Field />
                <Form.Field />
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Field>
                    <label>Email Address: </label>
                    <input type="email" name="email_address" value={email_address} onChange={(event) => props._handleFormInput('staff_education_detail', event)} />
                </Form.Field>
                <Form.Field>
                    <label>City: </label>
                    <input type="text" name="city" value={city} onChange={(event) => props._handleFormInput('staff_education_detail', event)} />
                </Form.Field>
                <Form.Field>
                    <label>Zip:</label>
                    <input type="number" name="zip_code" value={zip_code} onChange={(event) => props._handleFormInput('staff_education_detail', event)} />
                </Form.Field>
            </Form.Group>

            <Form.Group widths="equal">
                <Form.Field>
                    <label>High school (s) attended:</label>
                    <input type="text" name="high_school" value={high_school} onChange={(event) => props._handleFormInput('staff_education_detail', event)} />
                </Form.Field>
                <Form.Field>
                    <label>College(s) attended / degree: </label>
                    <input type="text" name="college_attended_degree" value={college_attended_degree} onChange={(event) => props._handleFormInput('staff_education_detail', event)} />
                </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Field>
                    <label>
                        Other related courses / workshops attended
                   </label>
                    <Form.TextArea name="other_courses_workshops_attended" value={other_courses_workshops_attended} onChange={(event) => props._handleFormInput('staff_education_detail', event)} />
                </Form.Field>
            </Form.Group>
            <div className="equal width fields"><div className="field"><button type="submit" className="ui positive button" >Submit</button></div></div>

        </Form>
    )
}
