import React, { Component } from 'react';
import { Form, Table, Button, Icon } from 'semantic-ui-react';

export class SchoolDirectory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blankSignatureValidationMessage: '',
      isSignatureVisible: true
    }
  }

  componentWillReceiveProps(nextProps) {
    // checking if signature checkbox is true then we hiding signature message and showing signature image
    if (nextProps.childForm.schoolDirectory.has_parent_signature === true) {
      this.setState({
        blankSignatureValidationMessage: '',
        isSignatureVisible: true,
      })
    }
  }

  getSignature = (validationName, modalName, nextParentForm, nextSubForm) => {
    let { childForm } = this.props, { schoolDirectory } = childForm,
      { has_parent_signature } = schoolDirectory;
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
    let { childForm, showButtonLoader, loginUserInfo, user } = this.props,
      { childInfo, parent1, parent2, schoolDirectory } = childForm,
      { has_parent_information_publish, has_parent_wish_to_add_school_directory, has_parent_signature } = schoolDirectory,
      { blankSignatureValidationMessage, isSignatureVisible } = this.state,
      childFullName = childInfo.first_name + ' ' + childInfo.last_name,
      parent1FullName = parent1.first_name + ' ' + parent1.last_name,
      parent2FullName = parent2.first_name + ' ' + parent2.last_name;
    return (
      <div className="add-child-border tablet-view">
        <div className="w-100 text-center add-child-form-mt-2rem">
          <h2>SCHOOL DIRECTORY FORM</h2>
        </div>
        <Table singleLine structured textAlign='center' >
          <Table.Body>
            <Table.Row>
              <Table.Cell>NAME OF CHILD</Table.Cell>
              <Table.Cell>{childFullName}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell rowSpan='2'>NAME OF PARENTS</Table.Cell>
              <Table.Cell>{parent1FullName}</Table.Cell>
              {/* <Table.Cell>Project 1</Table.Cell> */}
            </Table.Row>

            <Table.Row>
              <Table.Cell>{parent2FullName}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell rowSpan='2'>EMAIL ADDRESS</Table.Cell>
              <Table.Cell>{parent1.email1}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>{parent2.email1}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell rowSpan='2'>TEL. #</Table.Cell>
              <Table.Cell>{parent1.phone1}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>{parent2.phone1}</Table.Cell>
            </Table.Row>

          </Table.Body>
        </Table>
        <Form id="schoolDirectory" name="schoolDirectory" onSubmit={() => { this.getSignature(this.props.schoolDirectoryValidator, 'schoolDirectory', 'studentList', 'studentList') }}>
          <Form.Group>
            <div className="field">
              <div className="ui checkbox">
                <input type="checkbox" name="has_parent_information_publish" value={has_parent_information_publish} checked={has_parent_information_publish} onChange={(event) => this.props._handleCheckBox("schoolDirectory", event)} />
                <label>I give permission for my information to be published in the Little Children Schoolhouse Directory and promise to be discreet with the
                                    personal information provided.</label>
              </div>
            </div>
          </Form.Group>
          <Form.Group>
            <div className="field">
              <div className="ui checkbox">
                <input type="checkbox" name="has_parent_wish_to_add_school_directory" value={has_parent_wish_to_add_school_directory} checked={has_parent_wish_to_add_school_directory} onChange={(event) => this.props._handleCheckBox("schoolDirectory", event)} />
                <label>I do not wish to be a part of the LCSH school directory.</label>
              </div>
            </div>
          </Form.Group>

          <Form.Group widths="equal" required>
            <div className="field">
              <div className="ui checkbox">
                <input type="checkbox" name="has_parent_signature" value={has_parent_signature} checked={has_parent_signature} onChange={(event) => this.props._handleCheckBox("schoolDirectory", event)} />
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
