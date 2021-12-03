import React, { Component } from 'react'
import { Form, Button, Icon } from 'semantic-ui-react';
// import SignatureCanvas from 'react-signature-canvas';



export class ToothBrushingConsent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blankSignatureValidationMessage: '',
      isSignatureVisible: props.childForm.toothBrushingInformation.signature ? true : false
    }
  }

  componentWillReceiveProps(nextProps) {
    // checking if signature checkbox is true then we hiding signature message and showing signature image
    if (nextProps.childForm.toothBrushingInformation.has_parent_signature === true) {
      this.setState({
        blankSignatureValidationMessage: '',
        isSignatureVisible: true,
      })
    }
  }

  getSignature = (validationName, modalName, nextParentForm, nextSubForm) => {
    let { childForm } = this.props, { toothBrushingInformation } = childForm,
      { has_parent_signature } = toothBrushingInformation;
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
      { childInfo, toothBrushingInformation } = childForm,
      {
        has_participate_in_toothbrushing,
        has_fluoride,
        has_school_toothbrushing,
        has_parent_signature,
      } = toothBrushingInformation,
      { blankSignatureValidationMessage, isSignatureVisible } = this.state;

    return (
      <div className="add-child-border tablet-view">

        <div className='w-100 text-center add-child-form-mt-2rem'>
          <h4>
            TOOTH BRUSHING CONSENT FORM
                </h4>
        </div>
        <div className='w-100 text-justify mt-2rem'>
          <p>
            In response to the increasing numbers of young children with significant dental problems, The Department of Early Education and Care
            has instituted a tooth brushing policy. We are hoping that you will allow your child to participate. Children will learn how to brush their
            teeth and the importance of doing so. The student will be supervised to ensure that the process is sanitary.
                </p>
        </div>

        <Form id="toothBrushingInformation" name="toothBrushingInformation" className="mt-2rem"
          onSubmit={() => this.getSignature(this.props.toothBrushingInformationValidator, 'toothBrushingInformation', 'photoRelease', 'photoRelease')}
        >
          <Form.Group widths="equal">
            <Form.Field>
              <label>CHILD'S NAME</label>
              <Form.Input type='text' value={`${childInfo.first_name} ${childInfo.last_name}`} readOnly />
            </Form.Field>
            <Form.Field />
            <Form.Field />
          </Form.Group>
          <Form.Group widths="equal">
            <div className="field  ">
              <div className="ui radio checkbox">
                <input type="radio" value="yes" name="has_participate_in_toothbrushing" checked={has_participate_in_toothbrushing === "yes"} onChange={(event) => this.props._handleFormInput('toothBrushingInformation', event)} />
                <label className="mr-10">Yes, I would like my child to participate in the tooth-brushing.</label>
              </div>
              <div className="ui radio checkbox">
                <input type="radio" value="no" name="has_participate_in_toothbrushing" checked={has_participate_in_toothbrushing === "no"} onChange={(event) => this.props._handleFormInput('toothBrushingInformation', event)} />
                <label>No, I do not want my child to participate in the tooth-brushing.</label>
              </div>
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Field>
              <label>Please check off your answer below.</label>

              <div className="field">
                <div className="ui checkbox">
                  <input type="checkbox" name="has_fluoride" value={has_fluoride} checked={has_fluoride} onChange={(event) => this.props._handleCheckBox("toothBrushingInformation", event)} />
                  <label>My child may use fluoride toothpaste.</label>
                </div>
              </div>
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <div className="field  ">
              <div className="ui radio checkbox">
                <input type="radio" name="has_school_toothbrushing"
                  checked={has_school_toothbrushing === "yes"}
                  value="yes"
                  onChange={(event) => this.props._handleFormInput('toothBrushingInformation', event)} />
                <label>In the event that my child does not have any toothpaste my child MAY USE toothpaste provided by the school.</label>
              </div>
            </div>
          </Form.Group>
          <Form.Group>

            <div className="field">
              <div className="ui radio checkbox">
                <input type="radio" name="has_school_toothbrushing"
                  checked={has_school_toothbrushing === "no"}
                  value="no"
                  onChange={(event) => this.props._handleFormInput('toothBrushingInformation', event)} />
                <label>In the event that my child does not have any toothpaste my child MAY NOT USE toothpaste provided by the school.</label>
              </div>
            </div>
          </Form.Group>
          <Form.Group widths="equal" required>
            <div className="field">
              <div className="ui checkbox">
                <input type="checkbox" name="has_parent_signature" value={has_parent_signature} checked={has_parent_signature} onChange={(event) => this.props._handleCheckBox("toothBrushingInformation", event)} />
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
              <Form.Field>
                <div className={`w-100 theme-${loginUserInfo.role_id}-border`}>
                  <img src={`${user.signature}`} alt="parents-signature" className="parents-signature" />
                </div>
              </Form.Field>
            </Form.Group>
            : ''
          }
          <Form.Group>
            <Form.Field>
              <Button positive type="submit" disabled={showButtonLoader}>
                {loginUserInfo.role_id === 2 ? showButtonLoader ? <Icon loading name='spinner' /> : 'Update' : showButtonLoader ? <Icon loading name='spinner' /> : 'Submit'}
              </Button>
            </Form.Field>
          </Form.Group>
        </Form>
      </div>

    )
  }
}

