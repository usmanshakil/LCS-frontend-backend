import React, { Component } from "react";
import { Form, Button, Icon, Grid } from "semantic-ui-react";

export class ParentAgreement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blankSignatureValidationMessage: "",
      isSignatureVisible: true,
    };
    this.parentAgreementSignaturePad = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    // checking if signature checkbox is true then we hiding signature message and showing signature image
    if (nextProps.childForm.parentAgreement.has_parent_signature === true) {
      this.setState({
        blankSignatureValidationMessage: "",
        isSignatureVisible: true,
      });
    }
  }

  getSignature = (validationName, modalName, nextParentForm, nextSubForm) => {
    let { childForm } = this.props,
      { parentAgreement } = childForm,
      { has_parent_signature } = parentAgreement;
    if (has_parent_signature === false) {
      this.setState({
        blankSignatureValidationMessage: "Please check the signature checkbox",
        isSignatureVisible: false,
      });
    } else {
      this.setState({
        blankSignatureValidationMessage: "",
        isSignatureVisible: true,
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
    let { childForm, loginUserInfo, showButtonLoader, user } = this.props,
      { parentAgreement } = childForm,
      { childInfo } = childForm,
      childFullName = `${childInfo.first_name} ${childInfo.last_name}`,
      {
        has_parent_agreed_with_policies,
        has_parent_signature,
      } = parentAgreement,
      { blankSignatureValidationMessage, isSignatureVisible } = this.state;
    return (
      <div className="add-child-border">
        <div className="w-100 text-center add-child-form-mt-2rem">
          <h4>PARENT AGREEMENT</h4>
        </div>
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column computer={6} mobile={16} tablet={8}>
              <label>Child's Name</label>
              <div className="ui fluid input">
                <input type="text" value={childFullName} readOnly />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Form
          id="parentAgreement"
          name="parentAgreement"
          className="mt-2rem"
          onSubmit={() =>
            this.getSignature(
              this.props.parentAgreementValidator,
              "parentAgreement",
              "offsiteActivityPermission",
              "offsiteActivityPermission"
            )
          }
        >
          <Form.Group widths="equal">
            <div className="field">
              <div className="ui checkbox">
                <input
                  type="checkbox"
                  name="has_parent_agreed_with_policies"
                  value={has_parent_agreed_with_policies}
                  checked={has_parent_agreed_with_policies}
                  onChange={(event) =>
                    this.props._handleCheckBox("parentAgreement", event)
                  }
                  required
                />
                <label>
                  I have read the Parent Handbook provided by Little Children
                  Schoolhouse (please sign in) and agree to follow and adhere to
                  the policies.
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
                  value={has_parent_signature}
                  checked={has_parent_signature}
                  onChange={(event) =>
                    this.props._handleCheckBox("parentAgreement", event)
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

          {has_parent_signature ? (
            <Form.Group widths="equal">
              <Form.Field>
                <div className={`w-100 theme-${loginUserInfo.role_id}-border`}>
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

          <Form.Group>
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
          </Form.Group>
        </Form>
      </div>
    );
  }
}
