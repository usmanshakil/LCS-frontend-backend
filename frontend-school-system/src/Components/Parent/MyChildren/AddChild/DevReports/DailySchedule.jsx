import React from 'react';
import { Form, Button,Icon } from 'semantic-ui-react'



export function DailySchedule(props) {
    let { childForm,
        loginUserInfo,
        showButtonLoader
    } = props,
        { dailySchedule } = childForm,
        { more_about_child } = dailySchedule;
    return (
        <div className="add-child-border">

            <Form id="dailySchedule" name="dailyScheduleReport" onSubmit={() => props._saveForm(props.dailyScheduleValidator, 'dailySchedule','parentAgreement','parentAgreement')}>
                <h4>DAILY SCHEDULE</h4>
                <p>
                    Please describe your child’s schedule on a typical day. For infants, please include awakening, eating, time out of crib/bed,
    napping, toilet habits, fussy time, night bedtime, etc.
                </p>
                <Form.Group widths='equal' >
                    <Form.Field>
                        <label>Is there anything else we should know about your child?</label>
                        <Form.TextArea name="more_about_child" value={more_about_child} onChange={(event) => props._handleFormInput('dailySchedule', event)} />
                        {/* {props.dailyScheduleValidator.message('more_about_child', more_about_child, 'required')} */}
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