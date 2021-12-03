import React from "react";
import { Container, Form, TextArea, Button, Icon } from "semantic-ui-react";
import SignatureCanvas from "react-signature-canvas";
import moment from "moment";

export default function EditProfile(props) {
  let {
      isSignatureCanvasVisible,
      confirmPassword,
      isPasswordMatch,
      blankSignatureValidationMessage,
      validConfirmPasswordMessage,
      parent_info,
      adminUserInfo,
      adminUserAccess,
      isFormLoading,
      signaturePad,
      userInfo,
      showAdminProfile
    } = props,
    {
      has_received_text,
      first_name,
      last_name,
      email,
      password,
      phone,
      cellphone,
      signature,
      comment,
      createdAt,
      last_login
    } = parent_info;

  return (
    <Container className="mt-5rem mb-5">
      <h2>Update users</h2>
      <Form onSubmit={props.showFormLoader}>
        <Form.Group widths="equal">
          <Form.Field required>
            <label>First Name</label>
            <input
              type="text"
              value={
                userInfo.role_id === 2 ? adminUserInfo.first_name : first_name
              }
              name="first_name"
              onChange={props.handleInput}
              disabled={userInfo.role_id === 4 ? true : isFormLoading}
            />
            {props.addUpdateUserFormValidator.message(
              "first_name",
              userInfo.role_id === 2 ? adminUserInfo.first_name : first_name,
              "required"
            )}
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input
              type="text"
              value={
                userInfo.role_id === 2 ? adminUserInfo.last_name : last_name
              }
              name="last_name"
              onChange={props.handleInput}
              disabled={userInfo.role_id === 4 ? true : isFormLoading}
            />
            {/* {props.addUpdateUserFormValidator.message('last_name', userInfo.role_id === 2 ? adminUserInfo.last_name : last_name, 'required')} */}
          </Form.Field>
          <Form.Field />
        </Form.Group>
        <Form.Group widths="equal">
          <div className="field no-arrow">
            <label>Phone</label>
            <input
              type="number"
              value={userInfo.role_id === 2 ? adminUserInfo.phone : phone}
              name="phone"
              onChange={props.handleInput}
              disabled={isFormLoading}
              className="no-arrow"
            />
          </div>
          <div className="field no-arrow">
            <label>Cellphone</label>
            <input
              type="number"
              value={
                userInfo.role_id === 2 ? adminUserInfo.cellphone : cellphone
              }
              name="cellphone"
              onChange={props.handleInput}
              disabled={isFormLoading}
              className="no-arrow"
            />
          </div>
          <Form.Field>
            <div className="ui checkbox checkbox-mt-35">
              <input
                type="checkbox"
                value={
                  userInfo.role_id === 2
                    ? adminUserInfo.has_received_text
                    : has_received_text
                }
                name="has_received_text"
                onChange={props.handleCheckBox}
                checked={
                  userInfo.role_id === 2
                    ? adminUserInfo.has_received_text
                    : has_received_text
                }
                disabled={userInfo.role_id === 4 ? true : isFormLoading}
              />
              <label>Receive Text:</label>
            </div>
          </Form.Field>
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Field>
            <label>Password</label>
            <input
              type="password"
              value={userInfo.role_id === 2 ? adminUserInfo.password : password}
              name="password"
              onChange={props.checkPassword}
              disabled={isFormLoading}
            />
          </Form.Field>
          <Form.Field>
            <label>Verify Password</label>
            <input
              type="password"
              value={confirmPassword}
              name="confirmPassword"
              onChange={props.checkPassword}
              disabled={isFormLoading}
            />
            {!isPasswordMatch && validConfirmPasswordMessage ? (
              <div className="w-100">
                <span className="password-warning srv-validation-message">
                  {validConfirmPasswordMessage}
                </span>
              </div>
            ) : (
              ""
            )}
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              type="text"
              value={userInfo.role_id === 2 ? adminUserInfo.email : email}
              name="email"
              readOnly={true}
              disabled={true}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label>User Since</label>
            <input
              type="text"
              value={moment(
                userInfo.role_id === 2 ? adminUserInfo.createdAt : createdAt
              ).format("MM/DD/YYYY")}
              name="createdAt"
              readOnly={true}
              disabled={true}
            />
          </Form.Field>
          <Form.Field>
            <label>Last Login</label>
            <input
              type="text"
              value={moment(
                userInfo.role_id === 2 ? adminUserInfo.last_login : last_login
              ).format("MM/DD/YYYY")}
              name="last_login"
              readOnly={true}
              disabled={true}
            />
          </Form.Field>
          <Form.Field />
        </Form.Group>
        {userInfo.role_id === 2 ? (
          showAdminProfile === true ? (
            " "
          ) : (
            <Form.Group widths="equal">
              <Form.Field>
                <div className="ui checkbox">
                  <input
                    type="checkbox"
                    value={adminUserInfo.approved}
                    name="approved"
                    onChange={props.handleCheckBox}
                    checked={adminUserInfo.approved}
                    disabled={isFormLoading}
                  />
                  <label>Approved</label>
                </div>
              </Form.Field>

              <Form.Field>
                <div className="ui checkbox">
                  <input
                    type="checkbox"
                    value={adminUserInfo.active}
                    name="active"
                    onChange={props.handleCheckBox}
                    checked={adminUserInfo.active}
                    disabled={isFormLoading}
                  />
                  <label>Active</label>
                </div>
              </Form.Field>
              <Form.Field>
                <div className="ui checkbox">
                  <input
                    type="checkbox"
                    value={adminUserInfo.email_confirmed}
                    name="email_confirmed"
                    onChange={props.handleCheckBox}
                    checked={adminUserInfo.email_confirmed}
                    disabled={isFormLoading}
                  />
                  <label>Email confirmed</label>
                </div>
              </Form.Field>
            </Form.Group>
          )
        ) : (
          ""
        )}

        {userInfo.role_id === 2 ? (
          <Form.Group widths="equal">
            <Form.Field>
              <label>Access</label>
              <select
                name="role_id"
                onChange={event => props.handleFormDropDown(event)}
                value={
                  showAdminProfile === true
                    ? adminUserAccess[2].id
                    : adminUserInfo.role_id
                }
                disabled={showAdminProfile ? true : isFormLoading}
              >
                {/* <select name="role_id" onChange={(event) => props.handleFormDropDown(event)} value={adminUserInfo.role_id}> */}
                {adminUserAccess.map((value, index) => {
                  return (
                    <option value={value.id} index={index} key={value.key}>
                      {value.value}
                    </option>
                  );
                })}
              </select>
            </Form.Field>

            <Form.Field />
            <Form.Field />
          </Form.Group>
        ) : (
          ""
        )}

        <Form.Group>
          <Form.Field width="16">
            <label>Signature</label>
            {isSignatureCanvasVisible === true ? (
              <div className="scanvas-parent">
                <SignatureCanvas
                  penColor="gray"
                  dotSize="1"
                  ref={signaturePad}
                  canvasProps={{
                    className: "sigCanvas"
                  }}
                />
              </div>
            ) : (
              <div className={`w-100 `}>
                <img
                  src={`${
                    userInfo.role_id === 2 ? adminUserInfo.signature : signature
                  }`}
                  alt="signature"
                  className={`view-signature-image  signature-boundary`}
                />
                <div>
                  <button
                    type="button"
                    className="clear-signature"
                    onClick={props.showSignatureCanvas}
                    disabled={isFormLoading}
                  >
                    Clear and Re-draw signature
                  </button>
                </div>
              </div>
            )}
          </Form.Field>
        </Form.Group>

        {props.signaturePad &&
        props.signaturePad.current &&
        props.signaturePad.current.isEmpty() ? (
          <Form.Group>
            <span className="password-warning srv-validation-message">
              {blankSignatureValidationMessage}
            </span>
          </Form.Group>
        ) : (
          ""
        )}

        {isSignatureCanvasVisible === true ? (
          <Form.Group widths="equal">
            <Form.Field>
              <button
                type="button"
                className="clear-signature"
                onClick={props.clearSignature}
                disabled={isFormLoading}
              >
                Clear and Re-draw signature
              </button>
            </Form.Field>
            <Form.Field />
            <Form.Field />
          </Form.Group>
        ) : (
          ""
        )}

        <Form.Group>
          <Form.Field width="16">
            <label>Comments</label>
            <TextArea
              value={userInfo.role_id === 2 ? adminUserInfo.comment : comment}
              name="comment"
              onChange={props.handleInput}
              disabled={userInfo.role_id === 4 ? true : isFormLoading}
            />
          </Form.Field>
        </Form.Group>
        <Button type="submit" color="green" disabled={isFormLoading}>
          {isFormLoading ? <Icon loading name="spinner" /> : "Submit"}
        </Button>
      </Form>
    </Container>
  );
}
