import React from "react";
import { Form, Input, Button, Dropdown, Icon } from "semantic-ui-react";

export function AddParentInfo(props) {
  let {
      childForm,
      loginUserInfo,
      parent1AddressSameAsChild,
      parent2AddressSameAsChild,
      showButtonLoader,
      subForm,
    } = props,
    { parent1, parent2, childInfo } = childForm,
    value = subForm === "parent1" ? parent1 : parent2,
    validator =
      subForm === "parent1"
        ? props.parent1FormValidator
        : props.parent2FormValidator,
    modalType = subForm === "parent1" ? "parent1" : "parent2",
    nextModal = subForm === "parent1" ? "parent2" : "emergencyContact1",
    sameAddressToggleButton =
      subForm === "parent1"
        ? parent1AddressSameAsChild
        : parent2AddressSameAsChild;
  return (
    <Form
      id={subForm === "parent1" ? "parent1" : "parent2"}
      name="parentInfo"
      onSubmit={() =>
        props._saveForm(validator, modalType, "familyInfo", nextModal)
      }
    >
      <Form.Group widths="equal">
        <Form.Field inline required>
          <label> {subForm === "parent1" ? " P1" : "P2"} First Name</label>
          <Input
            type="text"
            name="first_name"
            value={value.first_name}
            onChange={(event) => props._handleFormInput(modalType, event)}
            fluid
          />
          {validator.message("first_name", value.first_name, "required")}
        </Form.Field>
        <Form.Field inline required>
          <label>{subForm === "parent1" ? " P1" : "P2"} Last Name</label>
          <Input
            type="text"
            name="last_name"
            value={value.last_name}
            onChange={(event) => props._handleFormInput(modalType, event)}
            fluid
          />
          {validator.message("last_name", value.last_name, "required")}
        </Form.Field>
        <Form.Field inline required>
          <label>Phone 1</label>
          <Input
            type="tel"
            name="phone1"
            value={value.phone1}
            onChange={(event) => props._handleFormInput(modalType, event)}
            fluid
          />
          {validator.message("phone1", value.phone1, "required|phone")}
        </Form.Field>
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Field required>
          <label>Phone 2</label>
          <Input
            type="tel"
            name="phone2"
            value={value.phone2}
            onChange={(event) => props._handleFormInput(modalType, event)}
            fluid
          />
          {validator.message("phone2", value.phone2, "required|phone")}
        </Form.Field>
        <Form.Field required>
          <label>Email 1</label>
          <Input
            type="email"
            name="email1"
            value={value.email1}
            onChange={(event) => props._handleFormInput(modalType, event)}
            fluid
          />
          {validator.message("email1", value.email1, "required|email")}
        </Form.Field>

        <Form.Field className="same-address-field">
          {/*   */}
          <div className="ui compact same-address-toggle segment ">
            <div className="ui  toggle checkbox">
              <input
                type="checkbox"
                id={
                  subForm === "parent1"
                    ? `parent1AddressSameAsChild`
                    : `parent2AddressSameAsChild`
                }
                checked={sameAddressToggleButton}
                onChange={(event) =>
                  props._handleSameAddressTogglebutton(modalType, event)
                }
              />
              <label>Address same as child address</label>
            </div>
          </div>
        </Form.Field>
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Field inline required>
          <label>Address 1</label>
          <Input
            type="text"
            name="address"
            value={sameAddressToggleButton ? childInfo.address : value.address}
            onChange={(event) => props._handleFormInput(modalType, event)}
            fluid
          />
          {validator.message("address", value.address, "required")}
        </Form.Field>
        <Form.Field inline required>
          <label>City</label>
          <Input
            type="text"
            name="city"
            value={sameAddressToggleButton ? childInfo.city : value.city}
            onChange={(event) => props._handleFormInput(modalType, event)}
            fluid
          />
          {validator.message("city", value.city, "required")}
        </Form.Field>
        <Form.Field inline required>
          <label>State</label>
          <Dropdown
            placeholder="Select State"
            fluid
            search
            selection
            options={props.stateDropdown}
            name="state"
            value={sameAddressToggleButton ? childInfo.state : value.state}
            onChange={(event, { value, name }) =>
              props._handleFormDropDown(modalType, event, value, name)
            }
          />
          {validator.message("state", value.state, "required")}
        </Form.Field>
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Field inline required>
          <label>Zipcode</label>
          <Input
            type="number"
            className="no-arrow"
            name="zip_code"
            value={
              sameAddressToggleButton ? childInfo.zip_code : value.zip_code
            }
            onChange={(event) => props._handleFormInput(modalType, event)}
            fluid
          />
          {validator.message("zip_code", value.zip_code, "required")}
        </Form.Field>
        <Form.Field inline required>
          <label>Company Name</label>
          <Input
            type="text"
            className="no-arrow"
            name="business_name"
            value={value.business_name}
            onChange={(event) => props._handleFormInput(modalType, event)}
            fluid
          />
          {validator.message("business_name", value.business_name, "required")}
        </Form.Field>
        <Form.Field inline required>
          <label>Business Address</label>
          <Input
            type="text"
            className="no-arrow"
            name="business_address"
            value={value.business_address}
            onChange={(event) => props._handleFormInput(modalType, event)}
            fluid
          />
          {validator.message(
            "business_address",
            value.business_address,
            "required"
          )}
        </Form.Field>
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Field required>
          <label>Bussiness Phone</label>
          <Input
            type="text"
            name="business_phone"
            value={value.business_phone}
            onChange={(event) => props._handleFormInput(modalType, event)}
            fluid
          />
          {validator.message(
            "business_phone",
            value.business_phone,
            "required"
          )}
        </Form.Field>
        <Form.Field inline>
          <label>Work start time</label>
          <Dropdown
            placeholder="Select Start time"
            fluid
            selection
            options={props.parentWorkTiming}
            value={value.work_start_time}
            name="work_start_time"
            onChange={(event, { value, name }) =>
              props._handleFormDropDown(modalType, event, value, name)
            }
          />
          {/* {validator.message('work_start_time', value.work_start_time, 'required')} */}
        </Form.Field>

        <Form.Field inline>
          <label>Work end time</label>
          <Dropdown
            placeholder="Select end time"
            fluid
            selection
            options={props.parentWorkTiming}
            value={value.work_end_time}
            name="work_end_time"
            onChange={(event, { value, name }) =>
              props._handleFormDropDown(modalType, event, value, name)
            }
          />
          {/* {validator.message('work_end_time', value.work_end_time, 'required')} */}
        </Form.Field>
      </Form.Group>
      {/* <Form.Group>
        <Form.Field>
          <Button positive type="submit" disabled={showButtonLoader}>
            {loginUserInfo.role_id === 2 ? (
              showButtonLoader ? (
                <Icon loading name="spinner" />
              ) : (
                "Update"
              )
            ) : showButtonLoader ? (
              <Icon loading name="spinner" />
            ) : (
              "Submit"
            )}
          </Button>
        </Form.Field>
      </Form.Group> */}
      <Form.Group>
        <Form.Field>
          {loginUserInfo.role_id === 2 ? (
            <Button positive type="submit" disabled={showButtonLoader}>
              {showButtonLoader ? <Icon loading name="spinner" /> : "Update"}
            </Button>
          ) : (
            <Button
              positive
              onClick={() =>
                props._handleNext(validator, modalType, "familyInfo", nextModal)
              }
              disabled={showButtonLoader}
            >
              {showButtonLoader ? <Icon loading name="spinner" /> : "Next"}
            </Button>
          )}
        </Form.Field>
      </Form.Group>
    </Form>
  );
}
