import React from 'react';
import { Form, Button, Icon } from 'semantic-ui-react'

export function SleepingHabits(props) {
    let { loginUserInfo, showButtonLoader } = props,
        { childSleepingHabit } = props.childForm,

        {
            has_child_sleep_on_crib,
            has_child_sleep_on_bed,
            how_does_child_becometired,
            has_child_sleep_at_night,
            has_child_get_up_in_morning,
            special_charecterstic_or_need,
        } = childSleepingHabit;

    return (
        <div className="add-child-border tablet-view">

            <Form id="childSleepingHabit" name="sleepingHabitReport" onSubmit={() => props._saveForm(props.childSleepingHabitValidator, 'childSleepingHabit','devReport','socialRelationship')}>
                <h4>SLEEPING HABITS</h4>


                <Form.Group widths='equal'>

                    <div className="field ">
                        <label>Does your child sleep in a crib?</label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="has_child_sleep_on_crib" checked={has_child_sleep_on_crib === 'yes'} onChange={(event) => props._handleFormInput('childSleepingHabit', event)} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="has_child_sleep_on_crib" checked={has_child_sleep_on_crib === 'no'} onChange={(event) => props._handleFormInput('childSleepingHabit', event)} />
                            <label>No</label>
                        </div>
                    </div>
                    <div className="field ">
                        <label>Bed?</label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="has_child_sleep_on_bed" checked={has_child_sleep_on_bed === 'yes'} onChange={(event) => props._handleFormInput('childSleepingHabit', event)} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="has_child_sleep_on_bed" checked={has_child_sleep_on_bed === 'no'} onChange={(event) => props._handleFormInput('childSleepingHabit', event)} />
                            <label>No</label>
                        </div>
                    </div>

                </Form.Group>

                <Form.Group widths='equal'>
                    <Form.Field >
                        <label>Does your child become tired or nap during the day (include when and how long)?</label>
                        <Form.TextArea name="how_does_child_becometired" value={how_does_child_becometired} onChange={(event) => props._handleFormInput('childSleepingHabit', event)} />
                        {/* {props.childSleepingHabitValidator.message('how_does_child_becometired', how_does_child_becometired, 'required')} */}

                        <label><i>Please note: The American Academy of Pediatrics has determined that placing a baby on his/her back to sleep reduces the risk of Sudden Infant Death Syndrome (SIDS). SIDS is<br />
                            the sudden and unexplained death of a baby under one year of age. If your child does not usually sleep on his/her back, please contact your pediatrician immediately to discuss<br />
                            the best sleeping position for your baby. Please also take the time to discuss your child’s sleeping position with your caregiver.</i></label>
                    </Form.Field>
                </Form.Group>

                <Form.Group widths='equal'>
                    <div className="field ">
                        <label>When does your child go to bed at night?</label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="has_child_sleep_at_night" checked={has_child_sleep_at_night === 'yes'} onChange={(event) => props._handleFormInput('childSleepingHabit', event)} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="has_child_sleep_at_night" checked={has_child_sleep_at_night === 'no'} onChange={(event) => props._handleFormInput('childSleepingHabit', event)} />
                            <label>No</label>
                        </div>
                    </div>
                    <div className="field ">
                        <label>and get up in the morning?</label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="has_child_get_up_in_morning" checked={has_child_get_up_in_morning === 'yes'} onChange={(event) => props._handleFormInput('childSleepingHabit', event)} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="has_child_get_up_in_morning" checked={has_child_get_up_in_morning === 'no'} onChange={(event) => props._handleFormInput('childSleepingHabit', event)} />
                            <label>No</label>
                        </div>
                    </div>
                </Form.Group>

                <Form.Group widths='equal'>
                    <Form.Field >
                        <label>
                            Describe any special characteristics or needs (stuffed animal, story, mood on waking etc)
        </label>
                        <Form.TextArea name="special_charecterstic_or_need" value={special_charecterstic_or_need} onChange={(event) => props._handleFormInput('childSleepingHabit', event)} />
                        {/* {props.childSleepingHabitValidator.message('special_charecterstic_or_need', special_charecterstic_or_need, 'required')} */}

                    </Form.Field>
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



