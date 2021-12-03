import React from 'react';
import { Form, Button,Icon } from 'semantic-ui-react'

export function Health(props) {
    let { childForm,
        loginUserInfo,
        showButtonLoader
    } = props,
        { childHealth } = childForm,
        {
            has_complication_at_birth,
            serious_illness_hospitalization,
            special_physical_condition,
            allergies,
            regular_medications
        } = childHealth;
    return (
        <div className="add-child-border tablet-view">
            <Form id="childHealth" name="healthReport" onSubmit={() => props._saveForm(props.childHealthValidatorValidator,'childHealth','devReport','childEatingHabit')}>
                <h4>HEALTH</h4>

                <Form.Group widths="equal" >
                    <div className="field ">
                        <label>Any known complications at birth?</label>
                        <div className="ui radio checkbox">
                                <input type="radio" value='yes' name="has_complication_at_birth" checked={has_complication_at_birth === 'yes'} onChange={(event) => props._handleFormInput('childHealth', event)} />
                                <label className="mr-10">Yes</label>
                            </div>
                            <div className="ui radio checkbox">
                                <input type="radio" value='no' name="has_complication_at_birth" checked={has_complication_at_birth === 'no'} onChange={(event) => props._handleFormInput('childHealth', event)} />
                                <label>No</label>
                            </div>
                    </div>
                    <Form.Field >
                        <label>Serious illnesses and/or hospitalizations:</label>
                        <Form.Input type="text" name='serious_illness_hospitalization' value={serious_illness_hospitalization} onChange={(event) => props._handleFormInput('childHealth', event)} fluid />
                        {/* {props.childHealthValidatorValidator.message('serious_illness_hospitalization', serious_illness_hospitalization, 'required')} */}

                    </Form.Field>
                    <Form.Field >
                        <label>Special physical conditions, disabilities:</label>
                        <Form.Input type="text" name='special_physical_condition' value={special_physical_condition} onChange={(event) => props._handleFormInput('childHealth', event)} fluid />
                        {/* {props.childHealthValidatorValidator.message('special_physical_condition', special_physical_condition, 'required')} */}
                    </Form.Field>
                </Form.Group>

                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Allergies i.e. asthma, hay fever, insect bites, medicine, food reactions:</label>
                        <Form.Input type="text" name='allergies' value={allergies} onChange={(event) => props._handleFormInput('childHealth', event)} fluid />
                        {/* {props.childHealthValidatorValidator.message('allergies', allergies, 'required')} */}

                    </Form.Field>
                    <Form.Field >
                        <label>Regular medications:</label>
                        <Form.Input type='text' name='regular_medications' value={regular_medications} onChange={(event) => props._handleFormInput('childHealth', event)} />
                        {/* {props.childHealthValidatorValidator.message('regular_medications', regular_medications, 'required')} */}

                    </Form.Field>
                    {/* <Form.Field /> */}

                </Form.Group>
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