import React from "react";
import { Form, Modal, Button, Icon,Input } from "semantic-ui-react";
import moment from 'moment';
import SignatureCanvas from "react-signature-canvas";
export function RenewAdmission(props) {
  let {
      open,
      renewal_data,
      isModalLoading,
      signature_pad,
      blankSignatureValidationMessage,
      logged_User
    } = props,
    {
      new_admission_date,
      new_expiration_date,
      confirm_by_parent,
      parent_signature_name,
      child_name
    } = renewal_data;
    let formatted_new_expiration_date=moment(new_expiration_date).format('YYYY-MM-DD')
    let formatted_new_admission_date=moment(new_admission_date).format('YYYY-MM-DD')
  return (
    <Modal
      open={open}
      size="tiny"
      onClose={props.close}
      closeOnDimmerClick={false}
      closeIcon
    >
      <Modal.Content scrolling>
        <Form onSubmit={props.submit_renewal}>
          <Form.Field>
            <h5>
              Auto Renew child "{child_name}" for {formatted_new_admission_date} -{" "}
              {formatted_new_expiration_date}
            </h5>
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Field>
              <div className="ui checkbox">
                <input
                  type="checkbox"
                  name="confirm_by_parent"
                  onClick={props._handle_input}
                  checked={confirm_by_parent}
                  required
                />
                
                <label>Are you sure you want to confirm renewal Admission?</label>
              </div>
            </Form.Field>
          </Form.Group>
          {props.pop_up_validation.message(
            "confirm_by_parent",
            confirm_by_parent,
            "required"
          )}
          {logged_User.role_id === 3 ?
            ( <div>
              <Form.Field>
                <label>Parent/Guardian Signature</label>
                <div className="scanvas">
                  <SignatureCanvas
                    penColor="gray"
                    ref={signature_pad}
                    canvasProps={{
                      className: "sigCanvas"
                    }}
                  />
                </div>
                {signature_pad &&
                signature_pad.current &&
                signature_pad.current.isEmpty() ? (
                  <Form.Group>
                    <span className="password-warning srv-validation-message">
                      {blankSignatureValidationMessage}
                    </span>
                  </Form.Group>
                ) : (
                  ""
                )}
              </Form.Field>
            
          
              <Form.Field>
                <button
                  type="button"
                  className="clear-signature"
                  onClick={props.clear_signature}
                  disabled={isModalLoading}
                >
                  Clear and Re-draw signature
                </button>
              </Form.Field>
            
            
                <Form.Field>
                  <label>Parent/Guardian Name</label>
                  <input
                    type="text"
                    value={parent_signature_name}
                    name="parent_signature_name"
                    onChange={props._handle_input}
                    disabled={isModalLoading}
                    required
                    placeholder="Enter Guardian/Parent name"
                  />
                  {props.pop_up_validation.message(
                    "parent_signature_name",
                    parent_signature_name,
                    "required"
                  )}
               </Form.Field>
              </div>
            
            ): ''
        }
          
          {logged_User.role_id === 2 ?
            <Form.Group widths="equal">
              <Form.Field required>
                <label>Change the Admission Renewal Date to:</label>
                <Input
                  type="date"
                  name="new_expiration_date"
                  value={ formatted_new_expiration_date}
                  onChange={props._handle_input}
                  fluid
                />
              </Form.Field>
            </Form.Group>:''}

          <Modal.Actions>
            <Form.Field className="align-right">
              <Button type="submit" primary disabled={isModalLoading}>
                {isModalLoading === true ? (
                  <Icon loading name="spinner" />
                ) : (
                  "Submit"
                )}
              </Button>
            </Form.Field>
          </Modal.Actions>
        </Form>
      </Modal.Content>
    </Modal>
  );
}
