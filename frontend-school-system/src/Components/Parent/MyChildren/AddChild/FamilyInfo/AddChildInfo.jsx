import React from "react";
import moment from 'moment';
import { Form, Input, Button, Icon, Dropdown } from "semantic-ui-react";

export function AddChildInfo(props) {
  let {
      loginUserInfo,
      childForm,
      showButtonLoader,
      allClassesInfo,
      location,
      room,
      stateDropdown
    } = props,
    { childInfo } = childForm,
    {
      first_name,
      last_name,
      birth_date,
      birth_place,
      admission_date,
      expiry_date,
      address,
      city,
      state,
      zip_code,
      class_id
    } = childInfo;
    // let currentDate = moment().add(30,'days').format('MM/DD/YYYY');
    // // renewAdmission=(expriryDate)=>{
    // //   let new_expiration_date = moment().add(1,'year').format("MM/DD/YYYY");

    // // }
    let formatted_birth_date = moment(birth_date).format('YYYY-MM-DD')
    let formatted_admission_date = moment(admission_date).format('YYYY-MM-DD')
    let formatted_expiry_date = moment(expiry_date).format('YYYY-MM-DD')
  return (
    <Form
      onSubmit={() =>
        props._saveForm(
          props.addChildFormValidator,
          "childInfo",
          "familyInfo",
          "parent1"
        )
      }
    >
      
      {/* {loginUserInfo.role_id === 2?
          <Form.Group>
            {Date.parse(currentDate) > Date.parse(expiry_date) ?
            <Button
              className="primary"
              link
              size='small'
              color="blue"
              // onClick={(expiry_date)=>renewAdmission(expiry_date)}
              >
                Click Me for auto Renewal
              </Button>
              :''
              }
          </Form.Group>
        :''
        }
      {console.log("Wanna Check either I am true or false? :", Date.parse(currentDate) < Date.parse(expiry_date))} */}
      <Form.Group widths="equal">
        <Form.Field required>
          <label>Child First Name</label>
          <Input
            type="text"
            name="first_name"
            value={first_name}
            onChange={event => props._handleFormInput("childInfo", event)}
            fluid
          />
          {props.addChildFormValidator.message(
            "first name",
            first_name,
            "required"
          )}
        </Form.Field>
        <Form.Field required>
          <label>Child Last Name</label>
          <Input
            type="text"
            name="last_name"
            value={last_name}
            onChange={event => props._handleFormInput("childInfo", event)}
            fluid
          />
          {props.addChildFormValidator.message(
            "last name",
            last_name,
            "required"
          )}
        </Form.Field>
        <Form.Field required>
          <label>Birth Date</label>
          <Input
            type="date"
            name="birth_date"
            value={formatted_birth_date}
            onChange={event => props._handleFormInput("childInfo", event)}
            fluid
          />
          {props.addChildFormValidator.message(
            "birth_date",
            birth_date,
            "required"
          )}
        </Form.Field>
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Field required>
          <label>Birth Place</label>
          <Input
            type="text"
            name="birth_place"
            value={birth_place}
            onChange={event => props._handleFormInput("childInfo", event)}
            fluid
          />
          {props.addChildFormValidator.message(
            "birth_place",
            birth_place,
            "required"
          )}
        </Form.Field>
        <Form.Field required>
          <label>Admission Date</label>
          <Input
            type="date"
            name="admission_date"
            value={formatted_admission_date}
            onChange={event => props._handleFormInput("childInfo", event)}
            fluid
          />
          {props.addChildFormValidator.message(
            "admission_date",
            admission_date,
            "required"
          )}
        </Form.Field>
        {loginUserInfo.role_id === 2 ? (
        <Form.Field required>
          <label>Renewal Date</label>
          <Input
            type="date"
            name="expiry_date"
            value={formatted_expiry_date}
            onChange={event => props._handleFormInput("childInfo", event)}
            fluid
          />
          {props.addChildFormValidator.message(
            "expiry_date",
            expiry_date,
            "required"
          )}
        </Form.Field>)
        : (
          ""
        )}
      </Form.Group>

      <Form.Group widths="equal">
       <Form.Field required>
          <label>Address</label>
          <Input
            type="text"
            name="address"
            value={address}
            onChange={event => props._handleFormInput("childInfo", event)}
            fluid
          />
          {props.addChildFormValidator.message("address", address, "required")}
        </Form.Field>
        <Form.Field required>
          <label>City</label>
          <Input
            type="text"
            name="city"
            value={city}
            onChange={event => props._handleFormInput("childInfo", event)}
            fluid
          />
          {props.addChildFormValidator.message("city", city, "required")}
        </Form.Field>
        <Form.Field required>
          <label>State</label>
          <Dropdown
            placeholder="State"
            fluid
            search
            selection
            options={stateDropdown}
            name="state"
            value={state}
            onChange={(event, { value, name }) =>
              props._handleFormDropDown("childInfo", event, value, name)
            }
          />
          {props.addChildFormValidator.message("state", state, "required")}
        </Form.Field>
        <Form.Field required>
            <label>Zipcode</label>
            <div className="ui fluid input">
              <input
                type="number"
                id="number"
                className="no-arrow"
                name="zip_code"
                value={zip_code}
                onChange={event => props._handleFormInput("childInfo", event)}
              />
            </div>
            {props.addChildFormValidator.message(
              "zip_code",
              zip_code,
              "required"
            )}
          </Form.Field>
        {/* 
        <Form.Field  required>
          <label>State</label>
          <Input type="text" name='state' value={state}  onChange={(event) => props._handleFormInput('childInfo', event)} fluid />
          {props.addChildFormValidator.message('state', state, 'required')}
        </Form.Field> */}
        
      </Form.Group>
      {loginUserInfo.role_id === 2 ? (
          <Form.Group widths="equal">
            
          <Form.Field required>
            <label>Class</label>
            <select
              name="class_id"
              value={class_id}
              onChange={event =>
                props._fillRoomLocationField("childInfo", event)
              }
              fluid
              disabled={loginUserInfo.role_id === 2 ? false : true}
            >
              <option value="1" disabled>
                Select Class{" "}
              </option>
              {allClassesInfo.length ? (
                allClassesInfo.map((data, index) => {
                  return (
                    <option value={data.id} key={index}>
                      {data.class_name}
                    </option>
                  );
                })
              ) : (
                <option value="1">No Class Available</option>
              )}
            </select>
          </Form.Field>
          <Form.Field>
            <label>Room</label>
            <input
              type="text"
              value={room}
              readOnly
              disabled={loginUserInfo.role_id === 3 ? true : false}
            />
          </Form.Field>
          <Form.Field>
            <label>Location</label>
            <input
              type="text"
              value={location}
              readOnly
              disabled={loginUserInfo.role_id === 3 ? true : false}
            />
          </Form.Field>
        </Form.Group>
      ) : (
        ""
      )}
      <Form.Group>
        <Form.Field>
          
          {loginUserInfo.role_id === 2 ? 
            <Button positive type="submit" disabled={showButtonLoader}>
              {showButtonLoader ? (
                <Icon loading name="spinner" />
              ) : (
                "Update"
              )}
              </Button>
              :
              <Button positive onClick={
                ()=>props._handleNext(
                  props.addChildFormValidator,
                  "childInfo",
                  "familyInfo",
                  "parent1"
                )
              } disabled={showButtonLoader}>
               {showButtonLoader ? (
                <Icon loading name="spinner" />
              ) : (
                "Next"
              )}
              </Button>
              }
        </Form.Field>
      </Form.Group>
    </Form>
  );
}
