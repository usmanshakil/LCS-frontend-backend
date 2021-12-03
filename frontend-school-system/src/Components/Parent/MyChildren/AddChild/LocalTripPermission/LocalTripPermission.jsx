import React, { Component } from "react";
import { Form, Button, Icon } from "semantic-ui-react";

export class LocalTripPermission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blankSignatureValidationMessage: '',
      isSignatureVisible: true
    }
  }


  componentWillReceiveProps(nextProps) {
    // checking if signature checkbox is true then we hiding signature message and showing signature image
    if(nextProps.childForm.localTripPermission.has_parent_signature === true){
      this.setState({
        blankSignatureValidationMessage: '',
        isSignatureVisible: true,
      })
    }
  }



  getSignature = (validationName, modalName,nextParentForm,nextSubForm) => {
    let { childForm } = this.props, { localTripPermission } = childForm,
    { has_parent_signature } = localTripPermission;
  if (has_parent_signature === false) {
    this.setState({
      blankSignatureValidationMessage: 'Please check the signature checkbox',
      isSignatureVisible: false,
    })
  } else {
    this.setState({
      blankSignatureValidationMessage: '',
      isSignatureVisible: true,
    })
    this.props._saveForm(validationName, modalName,nextParentForm,nextSubForm)
  }
  }


  render() {
    let { childForm, loginUserInfo, showButtonLoader, user } = this.props,
      { localTripPermission, childInfo } = childForm,
      { first_name, last_name } = childInfo,
      { has_parent_agreed_for_trip, has_parent_signature } = localTripPermission,
      { blankSignatureValidationMessage, isSignatureVisible } = this.state;

    return (
      <div>
        <div className="add-child-border">
          <div className="w-100 text-center add-child-form-mt-2rem">
            <h4>LOCAL FIELD TRIP PERMISSION</h4>
          </div>

          <Form id="localTripPermission" name="localTripPermission" className="mt-2rem" onSubmit={() => this.getSignature(this.props.localTripPermissionValidator, 'localTripPermission','sunscreenPermission','sunscreenPermission')}>
            <span >
              <strong>{`${first_name} ${last_name} `}</strong>has my permission to participate in local fieldtrips.
            </span>
            <Form.Group widths="equal">
              <div className="field">
                <div className="ui checkbox mt-2rem">
                  <input
                    type="checkbox"
                    name="has_parent_agreed_for_trip"
                    value={has_parent_agreed_for_trip}
                    checked={has_parent_agreed_for_trip}
                    onChange={event => this.props._handleCheckBox("localTripPermission", event)} required />
                  <label>
                    The local field trips include local parks, playgrounds and walks
                    around the neighborhood. I understand the local field trips may be
                    taken daily.
            </label>
                </div>
              </div>
            </Form.Group>

            <Form.Group widths="equal" >
              <div className="field">
                <div className="ui checkbox">
                  <input type="checkbox" name="has_parent_signature" value={has_parent_signature} checked={has_parent_signature} onChange={(event) => this.props._handleCheckBox("localTripPermission", event)} />
                  <label>Use signature as in parent profile</label>
                </div>
              </div>
            </Form.Group>

            {
            isSignatureVisible === false ?
              <Form.Group widths="equal">
                <Form.Field><span className='password-warning srv-validation-message'>
                  {blankSignatureValidationMessage}
                </span></Form.Field>
              </Form.Group>
              :
              ''
          }



            {has_parent_signature ?
              <Form.Group widths="equal">
                <Form.Field><div className={`w-100 theme-${loginUserInfo.role_id}-border`}>
                  <img src={`${user.signature}`} alt="parents-signature" className="parents-signature" />
                </div></Form.Field>
                
              </Form.Group>
              : ''
            }

            <Button positive type="submit" disabled={showButtonLoader}>
              {loginUserInfo.role_id === 2 ? showButtonLoader ? <Icon loading name='spinner' /> : 'Update' : showButtonLoader ? <Icon loading name='spinner' /> : 'Submit'}
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

