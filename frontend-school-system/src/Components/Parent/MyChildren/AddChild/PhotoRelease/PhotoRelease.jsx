import React, { Component } from 'react';
import { Form, Button, Icon } from 'semantic-ui-react'
import moment from 'moment';

export class PhotoRelease extends Component {

  constructor(props) {
    super(props);
    this.state = {
      blankSignatureValidationMessage: '',
      isSignatureVisible: true
    }
  }

  componentWillReceiveProps(nextProps) {
    // checking if signature checkbox is true then we hiding signature message and showing signature image
    if (nextProps.childForm.photoRelease.has_parent_signature === true) {
      this.setState({
        blankSignatureValidationMessage: '',
        isSignatureVisible: true,
      })
    }
  }

  getSignature = (validationName, modalName, nextParentForm, nextSubForm) => {
    let { childForm } = this.props, { photoRelease } = childForm,
      { has_parent_signature } = photoRelease;
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
      this.props._saveForm(validationName, modalName, nextParentForm, nextSubForm)
    }
  }

  render() {
    let { childForm, loginUserInfo, showButtonLoader, user } = this.props,
      { childInfo, parent1, photoRelease } = childForm,
      { has_photo_permission_granted, has_parent_signature } = photoRelease,
      childFullName = `${childInfo.first_name} ${childInfo.last_name}`,
      parentFullName = `${parent1.first_name} ${parent1.last_name}`,
      { blankSignatureValidationMessage, isSignatureVisible } = this.state;

    return (
      <div className="add-child-border tablet-view">
        <Form id="photoRelease" name="photoRelease" className="add-child-form-mt-2rem" onSubmit={() => this.getSignature(this.props.photoReleaseValidator, 'photoRelease', 'transportationAuthority', 'transportationAuthority')} >
          <div className='w-100 text-center'>
            <h4>Photograph Release Permission Form</h4>
          </div>

          <Form.Group widths='equal'>
            <Form.Field>
              <label>Child's Name</label>
              <div className="ui fluid input"><input type="text" value={childFullName} readOnly /></div>
            </Form.Field>
            <Form.Field>
              <label>Parent/Guardian’s Name</label>
              <div className="ui fluid input"><input type="text" value={parentFullName} readOnly /></div>

            </Form.Field>
            <Form.Field>
              <label>Date</label>
              <div className="ui fluid input"><input type="text" value={moment().format("MM/DD/YYYY")} readOnly /></div>

            </Form.Field>
          </Form.Group>

          <div className='w-100 text-justify fields'>
            <p>From time to time our school likes to celebrate your child’s work, transition period, developmental achievements, birthdays and
            celebrations, fun activities in the classroom, and fieldtrips. As a result, images of your child or the students in the class will be sent to
            you via email or placed on the classroom bulletin’s board. Photographs taken will be used exclusively for Little Children Schoolhouse
purposes as stated above.</p>
          </div>

          <Form.Group inline>
            <label>Permission Granted:</label>
            <div className="field  ">
              <div className="ui radio checkbox">
                <input type="radio" value="yes" name="has_photo_permission_granted" checked={has_photo_permission_granted === "yes"} onChange={(event) => this.props._handleFormInput('photoRelease', event)} />
                <label>Yes</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input type="radio" value="no" name="has_photo_permission_granted" checked={has_photo_permission_granted === "no"} onChange={(event) => this.props._handleFormInput('photoRelease', event)} />
                <label>No</label>
              </div>
            </div>
          </Form.Group>

          <Form.Group widths="equal" required>
            <div className="field">
              <div className="ui checkbox">
                <input type="checkbox" name="has_parent_signature" value={has_parent_signature} checked={has_parent_signature} onChange={(event) => this.props._handleCheckBox("photoRelease", event)} />
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

          <Form.Group widths="equal">
            <Form.Field>
              <Button positive type="submit" disabled={showButtonLoader} >
                {loginUserInfo.role_id === 2 ? showButtonLoader ? <Icon loading name='spinner' /> : 'Update' : showButtonLoader ? <Icon loading name='spinner' /> : 'Submit'}
              </Button>
            </Form.Field>
          </Form.Group>
        </Form>
      </div>
    )
  }
}
