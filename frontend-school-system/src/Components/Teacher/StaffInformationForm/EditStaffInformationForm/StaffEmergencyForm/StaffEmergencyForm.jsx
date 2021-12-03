import React from 'react';
import {  Form ,Dropdown} from 'semantic-ui-react';


export function StaffEmergencyForm(props) {
    let { staff_hiring_form ,sameAddress,stateDropdownOption,editType} = props,
    {staffEmergencyDetailSameAddress}=sameAddress,
    { staff_emergency_detail } = staff_hiring_form,
    {  name,
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
    third_emergency_relationship_to_you}=staff_emergency_detail,
nextformName='staffAgreement';

    return (
        <Form onSubmit={(event)=>props._showLoader('staff_emergency_detail',nextformName,staff_emergency_detail)}>
        <Form.Group widths="equal">
            <Form.Field>
                <h4>STAFF EMERGENCY FORM</h4>
            </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
             
                <Form.Field>
                    <label>Name: </label>
                    <input type="text" name="name" value={name} onChange={(event) => props._handleFormInput('staff_emergency_detail', event)} disabled={editType==='editForm'?true:false}/>
                </Form.Field>
                <Form.Field>
                    <label>Address:</label>
                    <input type="text" name="address" value={address} onChange={(event) => props._handleFormInput('staff_emergency_detail', event)} disabled={editType==='editForm'?true:false}/>
                </Form.Field>
                <Form.Field>
                    <label>City: </label>
                    <input type="text" name="city" value={city} onChange={(event) => props._handleFormInput('staff_emergency_detail', event)} disabled={editType==='editForm'?true:false}/>
                </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
            <Form.Field>
                    <label>Zip:</label>
                    <input type="number" name="zip_code" value={zip_code} onChange={(event) => props._handleFormInput('staff_emergency_detail', event)} disabled={editType==='editForm'?true:false}/>
                </Form.Field>
            <div className="field same-address-field">
                    <div className="ui compact same-address-toggle segment ">
                        <div className="ui  toggle checkbox">
                            <input type="checkbox" value={staffEmergencyDetailSameAddress} name="staffEmergencyDetailSameAddress" checked={staffEmergencyDetailSameAddress} onClick={(event)=>props._toggleSameAddress('staff_emergency_detail',event)} disabled={editType==='editForm'?true:false}/>
                            <label>Same as Previous Form</label>
                            </div>
                            </div>
                            </div>
            <Form.Field>
                    <label>State: </label>
                    <Dropdown
    placeholder='State'
    fluid
    selection
    name="state" value={state}
    options={stateDropdownOption}
    onChange={(event,{name,value}) => props._handleFormDropDown('staff_emergency_detail',name,value)}
    disabled={editType==='editForm'?true:false}
  />
                </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
            <Form.Field>
                    <label>Home phone #: </label>
                    <input type="number" name="home_phone" value={home_phone} onChange={(event) => props._handleFormInput('staff_emergency_detail', event)} disabled={editType==='editForm'?true:false}/>
                </Form.Field>
                <Form.Field>
                    <label>Other (Cell) :</label>
                    <input type="number" name="other_cell_phone" value={other_cell_phone} onChange={(event) => props._handleFormInput('staff_emergency_detail', event)} disabled={editType==='editForm'?true:false}/>
                </Form.Field>
                <Form.Field>
                    <label>Allergies (i.e. medication, food, etc): </label>
                    <input type="text" name="allergies" value={allergies} onChange={(event) => props._handleFormInput('staff_emergency_detail', event)} disabled={editType==='editForm'?true:false}/>
                </Form.Field>
            </Form.Group>
           
        <Form.Group widths="equal">
            <Form.Field>
                <h5>Persons authorized to call in an emergency:</h5>
            </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
            <Form.Field>
                <label>Name: </label>
                <input type="text" name="first_emergency_name" value={first_emergency_name} onChange={(event) => props._handleFormInput('staff_emergency_detail', event)} disabled={editType==='editForm'?true:false}/>
            </Form.Field>
            <Form.Field>
                <label>Home phone # :</label>
                <input type="number" name="first_emergency_home_phone" value={first_emergency_home_phone} onChange={(event) => props._handleFormInput('staff_emergency_detail', event)} disabled={editType==='editForm'?true:false}/>
            </Form.Field>
            <Form.Field>
                <label>Phone:</label>
                <input type="number" name="first_emergency_phone" value={first_emergency_phone} onChange={(event) => props._handleFormInput('staff_emergency_detail', event)} disabled={editType==='editForm'?true:false}/>
            </Form.Field>
            <Form.Field>
                <label>Relationship to you : </label>
                <input type="text" name="first_emergency_relationship_to_you" value={first_emergency_relationship_to_you} onChange={(event) => props._handleFormInput('staff_emergency_detail', event)} disabled={editType==='editForm'?true:false}/>
            </Form.Field>
        </Form.Group>
        
        <Form.Group widths="equal">
            <Form.Field>
                <label>Name: </label>
                <input type="text" name="second_emergency_name" value={second_emergency_name} onChange={(event) => props._handleFormInput('staff_emergency_detail', event)} disabled={editType==='editForm'?true:false}/>
            </Form.Field>
            <Form.Field>
                <label>Home phone # :</label>
                <input type="number" name="second_emergency_home_phone" value={second_emergency_home_phone} onChange={(event) => props._handleFormInput('staff_emergency_detail', event)} disabled={editType==='editForm'?true:false}/>
            </Form.Field>
            <Form.Field>
                <label>Phone:</label>
                <input type="number" name="second_emergency_phone" value={second_emergency_phone} onChange={(event) => props._handleFormInput('staff_emergency_detail', event)} disabled={editType==='editForm'?true:false}/>
            </Form.Field>
            <Form.Field>
                <label>Relationship to you : </label>
                <input type="text" name="second_emergency_relationship_to_you" value={second_emergency_relationship_to_you} onChange={(event) => props._handleFormInput('staff_emergency_detail', event)} disabled={editType==='editForm'?true:false}/>
            </Form.Field>
        </Form.Group>

        <Form.Group widths="equal">
            <Form.Field>
                <label>Name: </label>
                <input type="text" name="third_emergency_name" value={third_emergency_name} onChange={(event) => props._handleFormInput('staff_emergency_detail', event)} disabled={editType==='editForm'?true:false}/>
            </Form.Field>
            <Form.Field>
                <label>Home phone # :</label>
                <input type="number" name="third_emergency_home_phone" value={third_emergency_home_phone} onChange={(event) => props._handleFormInput('staff_emergency_detail', event)} disabled={editType==='editForm'?true:false}/>
            </Form.Field>
            <Form.Field>
                <label>Phone:</label>
                <input type="number" name="third_emergency_phone" value={third_emergency_phone} onChange={(event) => props._handleFormInput('staff_emergency_detail', event)} disabled={editType==='editForm'?true:false}/>
            </Form.Field>
            <Form.Field>
                <label>Relationship to you : </label>
                <input type="text" name="third_emergency_relationship_to_you" value={third_emergency_relationship_to_you} onChange={(event) => props._handleFormInput('staff_emergency_detail', event)} disabled={editType==='editForm'?true:false}/>
            </Form.Field>
        </Form.Group>
        
        <div className="equal width fields"><div className="field"><button type="submit" className="ui positive button" disabled={editType==='editForm'?true:false}>Submit</button></div></div>
    </Form>
    )
}
