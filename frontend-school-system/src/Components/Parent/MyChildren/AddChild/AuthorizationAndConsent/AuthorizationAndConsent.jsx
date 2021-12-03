import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";

export class AuthorizationAndConsent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blankSignatureValidationMessage: "",
      isSignatureVisible: true
    };
  }

  componentWillReceiveProps(nextProps) {
    // checking if signature checkbox is true then we hiding signature message and showing signature image
    if (
      nextProps.childForm.authorizationAndConsent.has_parent_signature === true
    ) {
      this.setState({
        blankSignatureValidationMessage: "",
        isSignatureVisible: true
      });
    }
  }
  getSignature = (validationName, modalName, nextParentForm, nextSubForm) => {
    let { childForm } = this.props,
      { authorizationAndConsent } = childForm,
      { has_parent_signature } = authorizationAndConsent;
    if (has_parent_signature === false) {
      this.setState({
        blankSignatureValidationMessage: "Please check the signature checkbox",
        isSignatureVisible: false
      });
    } else {
      this.setState({
        blankSignatureValidationMessage: "",
        isSignatureVisible: true
      });
      this.props._saveForm(
        validationName,
        modalName,
        nextParentForm,
        nextSubForm
      );
    }
  };

  render() {
    let { childForm, loginUserInfo, user } = this.props,
      { blankSignatureValidationMessage, isSignatureVisible } = this.state,
      {
        emergencyContact1,
        emergencyContact2,
        authorizationAndConsent
      } = childForm;
    return (
      <div>
        <div className="add-child-border">
          <div className="w-100 text-center add-child-form-mt-2rem">
            <h4>AUTHORIZATION AND CONSENT FORM</h4>
          </div>
          <Form
            id="authorizationAndConsent"
            className="mt-2rem"
            onSubmit={() =>
              this.getSignature(
                this.props.authorizationAndConsentValidator,
                "authorizationAndConsent",
                "localFieldTripPermission",
                "localFieldTripPermission"
              )
            }
          >
            <Form.Group>
              <div className="field">
                <div className="ui checkbox">
                  {/* checked={} value={} onChange={} */}
                  <input
                    type="checkbox"
                    name="has_authorize_mychild"
                    value={authorizationAndConsent.has_authorize_mychild}
                    checked={authorizationAndConsent.has_authorize_mychild}
                    onChange={event =>
                      this.props._handleCheckBox(
                        "authorizationAndConsent",
                        event
                      )
                    }
                    required
                  />
                  <label>
                    I hereby authorize LITTLE CHILDREN SCHOOLHOUSE to release my
                    child to the following persons (other than parents):
                  </label>
                </div>
              </div>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Name:</label>
                <Form.Input
                  type="text"
                  value={emergencyContact1.first_name}
                  readOnly
                />
              </Form.Field>
              <Form.Field>
                <label>Relationship:</label>
                <Form.Input
                  type="text"
                  value={emergencyContact1.relationship}
                  readOnly
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Address:</label>
                <Form.Input
                  type="text"
                  value={emergencyContact1.address}
                  readOnly
                />
              </Form.Field>
              <Form.Field>
                <label>Telephone:</label>
                <Form.Input
                  type="text"
                  value={emergencyContact1.phone1}
                  readOnly
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Name:</label>
                <Form.Input
                  type="text"
                  value={emergencyContact2.first_name}
                  readOnly
                />
              </Form.Field>
              <Form.Field>
                <label>Relationship:</label>
                <Form.Input
                  type="text"
                  value={emergencyContact2.relationship}
                  readOnly
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Address:</label>
                <Form.Input
                  type="text"
                  value={emergencyContact2.address}
                  readOnly
                />
              </Form.Field>
              <Form.Field>
                <label>Telephone:</label>
                <Form.Input
                  type="text"
                  value={emergencyContact2.phone1}
                  readOnly
                />
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <div className="field">
                <div className="ui checkbox">
                  <input
                    type="checkbox"
                    name="has_authorize_and_consent_agreement"
                    value={
                      authorizationAndConsent.has_authorize_and_consent_agreement
                    }
                    checked={
                      authorizationAndConsent.has_authorize_and_consent_agreement
                    }
                    onChange={event =>
                      this.props._handleCheckBox(
                        "authorizationAndConsent",
                        event
                      )
                    }
                    required
                  />
                  <label>
                    I understand that an effort will be made to contact me in
                    the event of an emergency requiring medical attention for my
                    child. However, if I cannot be reached, I hereby authorize
                    Little Children Schoolhouse to transport my child to receive
                    the necessary medical treatment. I understand the teachers
                    in the day care center are trained in the basis of First Aid
                    and authorize them to give my child First Aid when
                    appropriate.
                  </label>
                </div>
              </div>
            </Form.Group>
            <Form.Group widths="equal" required>
              <div className="field">
                <div className="ui checkbox">
                  <input
                    type="checkbox"
                    name="has_parent_signature"
                    value={authorizationAndConsent.has_parent_signature}
                    checked={authorizationAndConsent.has_parent_signature}
                    onChange={event =>
                      this.props._handleCheckBox(
                        "authorizationAndConsent",
                        event
                      )
                    }
                  />
                  <label>Use signature as in parent profile</label>
                </div>
              </div>
            </Form.Group>
            {isSignatureVisible === false ? (
              <Form.Group widths="equal">
                <Form.Field>
                  <span className="password-warning srv-validation-message">
                    {blankSignatureValidationMessage}
                  </span>
                </Form.Field>
              </Form.Group>
            ) : (
              ""
            )}

            {authorizationAndConsent.has_parent_signature ? (
              <Form.Group widths="equal">
                <Form.Field>
                  <div
                    className={`w-100 theme-${loginUserInfo.role_id}-border`}
                  >
                    <img
                      src={`${user.signature}`}
                      alt="parents-signature"
                      className="parents-signature"
                    />
                  </div>
                </Form.Field>
              </Form.Group>
            ) : (
              ""
            )}
            <Button positive type="submit">
              {loginUserInfo.role_id === 2 ? "Update" : "Next"}
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
