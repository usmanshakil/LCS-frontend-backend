import React, { Component } from 'react'
import { Form, Button, Icon } from 'semantic-ui-react'
import moment from 'moment';

export class SunScreenVerification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blankSignatureValidationMessage: '',
            signature: '',
            isSignatureVisible: true
        }
    }

    componentWillReceiveProps(nextProps) {
        // checking if signature checkbox is true then we hiding signature message and showing signature image
        if (nextProps.childForm.sunscreenPermission.has_parent_signature === true) {
            this.setState({
                blankSignatureValidationMessage: '',
                isSignatureVisible: true,
            })
        }
    }

    getSignature = (validationName, modalName, nextParentForm, nextSubForm) => {
        let { childForm } = this.props, { sunscreenPermission } = childForm,
            { has_parent_signature } = sunscreenPermission;
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
            { childInfo, sunscreenPermission } = childForm,{has_parent_signature} = sunscreenPermission,
            { blankSignatureValidationMessage, isSignatureVisible } = this.state;

        return (
            <div className="add-child-border tablet-view">
                <div className='w-100 text-center add-child-form-mt-2rem'>
                    <h4 >
                        SUNSCREEN PERMISSION FORM
            </h4>
                    <label>
                        (Does not apply for infants under 6 months)
            </label>
                </div>
                <Form id="sunscreenPermission" name="sunscreenPermission" className="mt-2rem" onSubmit={() => this.getSignature(this.props.sunscreenPermissionValidator, 'sunscreenPermission', 'toothbrushingPermission', 'toothbrushingPermission')}>
                    {/* <label className="capitalize bold">{childInfo.first_name} {childInfo.last_name} </label>  has my permission to participate in local fieldtrips. */}
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Name of child:</label>
                            <div className="ui fluid input"><input type="text" value={`${childInfo.first_name} ${childInfo.last_name}`} readOnly /></div>
                        </Form.Field>
                        <Form.Field>
                            <label>Date:</label>
                            <div className="ui fluid input"><input type="text" value={moment().format("MM/DD/YYYY")} readOnly /></div>
                            {/* <Form.Input type='text'  /> */}
                        </Form.Field>
                        <Form.Field>
                            <label>Name of sunscreen and the SPF Number:</label>
                            <div className="ui fluid input"><input type="text" value="Not applicable" readOnly /></div>
                            {/* <Form.Input type='text'  /> */}
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field>
                            I / we understand that:
             <ul>
                                <li>It is the parent’s responsibility to provide a non-expired waterproof sunscreen with a minimum SPF of 30, labeled with the child’s name.</li>
                                <li>My child’s care provider will assist by applying sunscreen to bare surfaces including the face, tops of ears and bare shoulder, arms, legs and feet
                                before outdoor activities.
                                    </li>
                                <li>
                                    Sunscreen will not be applied to any broken skin or if skin reaction has been observed. Any skin reaction observed by staff will be report to the
                                    parent/guardian.
                            </li>
                            </ul>
                        </Form.Field>
                    </Form.Group>

                    <Form.Group>
                        <Form.Field>
                            <label>Special instructions:</label>
                            <div className="field">
                                <div className="ui checkbox">
                                    <input type="checkbox" name="has_sunscreen_provided_by_school" value={sunscreenPermission.has_sunscreen_provided_by_school} checked={sunscreenPermission.has_sunscreen_provided_by_school} onChange={(event) => this.props._handleCheckBox("sunscreenPermission", event)} />
                                    <label>In the event that my child’s sunscreen is not readily available, my child may use The sunscreen provided by the school usually Coppertone water
                                        babies SPF, or Banana Kids/Children SPF 50.</label>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui checkbox">
                                    <input type="checkbox" name="has_child_bring_sunscreen" value={sunscreenPermission.has_child_bring_sunscreen} checked={sunscreenPermission.has_child_bring_sunscreen} onChange={(event) => this.props._handleCheckBox("sunscreenPermission", event)} />
                                    <label>I do not want my child to use any other sunscreen other than the one he or she brings to school.</label>
                                </div>
                            </div>
                        </Form.Field>
                    </Form.Group>

                    <Form.Group widths="equal" required>
                        <div className="field">
                            <div className="ui checkbox">
                                <input type="checkbox" name="has_parent_signature" value={has_parent_signature} checked={has_parent_signature} onChange={(event) => this.props._handleCheckBox("sunscreenPermission", event)} />
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
                            <Form.Field> <div className={`w-100 theme-${loginUserInfo.role_id}-border`}>
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
