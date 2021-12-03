import React from 'react';
import { Form, Button, Icon } from 'semantic-ui-react'

export function EatingHabits(props) {
    let { childForm,
        loginUserInfo,
        showButtonLoader
    } = props,
        { childEatingHabit } = childForm,
        {
            special_charecters_or_diffculties,
            special_formula_prepration_details,
            favouraite_food,
            food_refused,
            child_fedon_lap,
            high_chair,
            has_child_use_spoon,
            has_child_use_fork,
            has_child_use_hand
        } = childEatingHabit;

    return (
        <div className="add-child-border tablet-view">
            <Form id="childEatingHabit" name="eatingHabitReport" onSubmit={() => props._saveForm(props.childEatingHabitValidator,'childEatingHabit','devReport' ,'childToiletHabit')}>
                <h4>EATING HABITS</h4>
                <Form.Group widths='equal'>
                    <div className="field">
                        <label>Special characteristics or difficulties:</label>
                        <div className="ui fluid input">
                            <input type="text" name="special_charecters_or_diffculties" value={special_charecters_or_diffculties} onChange={(event) => props._handleFormInput('childEatingHabit', event)} /></div>
                    </div>
                    {/* {props.childEatingHabitValidator.message('special_charecters_or_diffculties', special_charecters_or_diffculties, 'required')} */}

                    <div className="field">
                        <label>If infant is on a special formula, describe its preparation:</label>
                        <div className="ui fluid input">
                            <input type="text" name="special_formula_prepration_details" value={special_formula_prepration_details} onChange={(event) => props._handleFormInput('childEatingHabit', event)} /></div>
                    </div>
                    {/* {props.childEatingHabitValidator.message('special_formula_prepration_details', special_formula_prepration_details, 'required')} */}

                    <div className="field">
                        <label>Favorite foods:</label>
                        <div className="ui fluid input">
                            <input type="text" name="favouraite_food" value={favouraite_food} onChange={(event) => props._handleFormInput('childEatingHabit', event)} /></div>
                    </div>
                    {/* {props.childEatingHabitValidator.message('favouraite_food', favouraite_food, 'required')} */}




                </Form.Group>

                <Form.Group widths='equal'>

                    <div className="field">
                        <label>Foods refused:</label>
                        <div className="ui fluid input">
                            <input type="text" name="food_refused" value={food_refused} onChange={(event) => props._handleFormInput('childEatingHabit', event)} /></div>
                    </div>
                    {/* {props.childEatingHabitValidator.message('food_refused', food_refused, 'required')} */}

                    <div className="field">
                        <label>Is your child fed held in lap?</label>
                        <div className="ui fluid input">
                            <input type="text" name="child_fedon_lap" value={child_fedon_lap} onChange={(event) => props._handleFormInput('childEatingHabit', event)} /></div>
                    </div>
                    {/* {props.childEatingHabitValidator.message('child_fedon_lap', child_fedon_lap, 'required')} */}

                    <div className="field">
                        <label>High chair?</label>
                        <div className="ui fluid input">
                            <input type="text" name="high_chair" value={high_chair} onChange={(event) => props._handleFormInput('childEatingHabit', event)} /></div>
                    </div>
                    {/* {props.childEatingHabitValidator.message('high_chair', high_chair, 'required')} */}

                </Form.Group>

                <Form.Group widths='equal'>

                    <div className="field ">
                        <label>Does your child eat with spoon?</label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="has_child_use_spoon" checked={has_child_use_spoon === 'yes'} onChange={(event) => props._handleFormInput('childEatingHabit', event)} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="has_child_use_spoon" checked={has_child_use_spoon === 'no'} onChange={(event) => props._handleFormInput('childEatingHabit', event)} />
                            <label>No</label>
                        </div>
                    </div>

                    <div className="field ">
                        <label>Fork?</label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="has_child_use_fork" checked={has_child_use_fork === 'yes'} onChange={(event) => props._handleFormInput('childEatingHabit', event)} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="has_child_use_fork" checked={has_child_use_fork === 'no'} onChange={(event) => props._handleFormInput('childEatingHabit', event)} />
                            <label>No</label>
                        </div>
                    </div>


                    <div className="field ">
                        <label>Hands?</label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="has_child_use_hand" checked={has_child_use_hand === 'yes'} onChange={(event) => props._handleFormInput('childEatingHabit', event)} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="has_child_use_hand" checked={has_child_use_hand === 'no'} onChange={(event) => props._handleFormInput('childEatingHabit', event)} />
                            <label>No</label>
                        </div>
                    </div>

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


