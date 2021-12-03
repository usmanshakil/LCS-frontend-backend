import React, { Component } from 'react';
import { Form, Button, Icon } from "semantic-ui-react";
// import SignatureCanvas from 'react-signature-canvas';


export class TransportationAuthority extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blankSignatureValidationMessage: '',
      isSignatureVisible: true 
    }
  }


  componentWillReceiveProps(nextProps) {
    // checking if signature checkbox is true then we hiding signature message and showing signature image
    if(nextProps.childForm.transportAuthority.has_parent_signature === true){
      this.setState({
        blankSignatureValidationMessage: '',
        isSignatureVisible: true,
      })
    }
  }


  getSignature = (validationName, modalName,nextParentForm,nextSubForm) => {
    let { childForm } = this.props, { transportAuthority } = childForm,
    { has_parent_signature } = transportAuthority;
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
    let { childForm, loginUserInfo, showButtonLoader,user } = this.props,
      { transportAuthority } = childForm,
      {
        has_parent_drop_off,
        has_parent_pick_up,
        has_supervised_walk,
        has_public_private_van,
        has_program_bus_van,
        has_contract_van,
        has_private_transport_arranged_by_parent,
        has_other,
        has_parent_signature
      } = transportAuthority, { blankSignatureValidationMessage, isSignatureVisible } = this.state;
    return (
      <div className="add-child-border tablet-view">

        <div className="w-100 text-center add-child-form-mt-2rem">
          <h2>Transportation Authorization</h2>
          <h3>THE COMMONWEALTH OF MASSACHUSETTS</h3>
          <h4>Department of Early Education and Care</h4>
          <h2>
            Small Group and Large Group Transportation Plan and Authorization
        </h2>
        <br/>
        </div>

        <Form id="transportAuthority" name="transportAuthority" className="add-child-form-mt-2rem"
          onSubmit={() => this.getSignature(this.props.transportAuthorityValidator,'transportAuthority', 'schoolDirectoryForm', 'schoolDirectoryForm')}>
          <h4>MY CHILD WILL ARRIVE AT THE PROGRAM:</h4>

          <Form.Group widths="equal">
            <div className="field">
              <div className="ui checkbox">
                <input
                  type="checkbox"
                  name="has_parent_drop_off"
                  value={has_parent_drop_off}
                  checked={has_parent_drop_off}
                  onChange={event =>
                    this.props._handleCheckBox("transportAuthority", event)
                  }
                />
                <label>PARENT DROP OFF</label>
              </div>
            </div>

            <div className="field">
              <div className="ui checkbox">
                <input
                  type="checkbox"
                  name="has_parent_pick_up"
                  value={has_parent_pick_up}
                  checked={has_parent_pick_up}
                  onChange={event =>
                    this.props._handleCheckBox("transportAuthority", event)
                  }
                />
                <label>PARENT PICK UP</label>
              </div>
            </div>

            <div className="field">
              <div className="ui checkbox">
                <input
                  type="checkbox"
                  name="has_supervised_walk"
                  value={has_supervised_walk}
                  checked={has_supervised_walk}
                  onChange={event =>
                    this.props._handleCheckBox("transportAuthority", event)
                  }
                />
                <label>SUPERVISED WALK</label>
              </div>
            </div>
          </Form.Group>

          <Form.Group widths="equal">
            <div className="field">
              <div className="ui checkbox">
                <input
                  type="checkbox"
                  name="has_public_private_van"
                  value={has_public_private_van}
                  checked={has_public_private_van}
                  onChange={event =>
                    this.props._handleCheckBox("transportAuthority", event)
                  }
                />
                <label>PUBLIC/PRIVATE/VAN</label>
              </div>
            </div>
            <div className="field" />
          </Form.Group>

          <h4>Child will depart from the program in parent pick up:</h4>

          <Form.Group widths="equal">
            <div className="field">
              <div className="ui checkbox">
                <input
                  type="checkbox"
                  name="has_program_bus_van"
                  value={has_program_bus_van}
                  checked={has_program_bus_van}
                  onChange={event =>
                    this.props._handleCheckBox("transportAuthority", event)
                  }
                />
                <label>PROGRAM BUS/VAN</label>
              </div>
            </div>
            <div className="field">
              <div className="ui checkbox">
                <input
                  type="checkbox"
                  name="has_contract_van"
                  value={has_contract_van}
                  checked={has_contract_van}
                  onChange={event =>
                    this.props._handleCheckBox("transportAuthority", event)
                  }
                />
                <label>CONTRACT/VAN</label>
              </div>
            </div>

            <div className="field">
              <div className="ui checkbox">
                <input
                  type="checkbox"
                  name="has_private_transport_arranged_by_parent"
                  value={has_private_transport_arranged_by_parent}
                  checked={has_private_transport_arranged_by_parent}
                  onChange={event =>
                    this.props._handleCheckBox("transportAuthority", event)
                  }
                />
                <label>PRIVATE TRANS. ARRANGED BY PARENT</label>
              </div>
            </div>

            
          </Form.Group>
          <Form.Group widths="equal">
          <div className="field">
              <div className="ui checkbox">
                <input
                  type="checkbox"
                  name="has_other"
                  value={has_other}
                  checked={has_other}
                  onChange={event =>
                    this.props._handleCheckBox("transportAuthority", event)
                  }
                />
                <label>OTHER</label>
              </div>
            </div>
          </Form.Group>

          <Form.Group widths="equal" required>
            <div className="field">
              <div className="ui checkbox">
                <input type="checkbox" name="has_parent_signature" value={has_parent_signature} checked={has_parent_signature}  onChange={(event) => this.props._handleCheckBox("transportAuthority", event)}/>
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
          {has_parent_signature?
             <Form.Group widths="equal">
               <Form.Field><div className={`w-100 theme-${loginUserInfo.role_id}-border`}>
               <img src={`${user.signature}`} alt="parents-signature" className="parents-signature" />
             </div></Form.Field>
               
             </Form.Group>
             :''
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
    );
  }
}
