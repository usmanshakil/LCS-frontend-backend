import React from 'react';
import { Form, Button ,Icon} from 'semantic-ui-react'

export function ToiletHabits(props) {
    let { childForm,
        loginUserInfo,
        showButtonLoader
    } = props,
        { childToiletHabit } = childForm,
        {
            has_diaper_used,
            has_diaper_rash_occur,
            has_parent_use_oil,
            has_parent_powder,
            has_parent_lotion,
            has_parent_use_other,
            has_bowel_movement_regular,
            how_many_time_bowl_move,
            has_problem_of_diarrhea,
            has_problem_of_constipation,
            has_toilet_training,
            particular_procedure_of_child,
            has_child_use_potty_chair,
            has_child_use_special_seat,
            has_child_use_regular_seat,
            how_child_indicate_bathroom,
            has_childwilling_to_use_bathroom,
            has_child_have_accident
        } = childToiletHabit;


    return (
        <div className="add-child-border tablet-view">

            <Form id="childToiletHabit" name="toiletHabitReport" onSubmit={() => props._saveForm(props.childToiletHabitValidator, 'childToiletHabit','devReport','childSleepingHabit')}>
                <h4>TOILET HABITS</h4>
                <Form.Group widths='equal'>

                    <div className="field ">
                        <label>Are disposable or cloth diapers used?</label>
                        <div className="ui radio checkbox">
                                <input type="radio" value='yes' name="has_diaper_used" checked={has_diaper_used === 'yes'} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                                <label className="mr-10">Yes</label>
                            </div>
                            <div className="ui radio checkbox">
                                <input type="radio" value='no' name="has_diaper_used" checked={has_diaper_used === 'no'} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                                <label>No</label>
                            </div>
                    </div>

                    <div className="field ">
                        <label>Is there a frequent occurrence of diaper rash?</label>
                        <div className="ui radio checkbox">
                                <input type="radio" value='yes' name="has_diaper_rash_occur" checked={has_diaper_rash_occur === 'yes'} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                                <label className="mr-10">Yes</label>
                            </div>
                            <div className="ui radio checkbox">
                                <input type="radio" value='no' name="has_diaper_rash_occur" checked={has_diaper_rash_occur === 'no'} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                                <label>No</label>
                            </div>
                    </div>
                </Form.Group>
                <Form.Group widths='equal'>

                    <div className="field ">
                        <label>Do you use: oil:</label>
                        <div className="ui radio checkbox">
                                <input type="radio" value='yes' name="has_parent_use_oil" checked={has_parent_use_oil === 'yes'} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                                <label className="mr-10">Yes</label>
                            </div>
                            <div className="ui radio checkbox">
                                <input type="radio" value='no' name="has_parent_use_oil" checked={has_parent_use_oil === 'no'} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                                <label>No</label>
                            </div>
                    </div>

                    <div className="field ">
                        <label>powder:</label>
                        <div className="ui radio checkbox">
                                <input type="radio" value='yes' name="has_parent_powder" checked={has_parent_powder === 'yes'} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                                <label className="mr-10">Yes</label>
                            </div>
                            <div className="ui radio checkbox">
                                <input type="radio" value='no' name="has_parent_powder" checked={has_parent_powder === 'no'} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                                <label>No</label>
                            </div>
                    </div>

                    <div className="field ">
                        <label>lotion:</label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="has_parent_lotion" checked={has_parent_lotion === 'yes'} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="has_parent_lotion" checked={has_parent_lotion === 'no'} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                            <label>No</label>
                        </div>
                    </div>

                    {/* <div className="field ">
                        <label>other:</label>
                        <div className="ui fluid input">
                            <input type="text" name="has_parent_use_other" value={has_parent_use_other} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                        </div> */}
                        {/* <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="has_parent_use_other" checked={has_parent_use_other === 'yes'} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="has_parent_use_other" checked={has_parent_use_other === 'no'} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                            <label>No</label>
                        </div> */}
                    {/* </div> */}

                </Form.Group>
                <Form.Group widths='equal' >
                    <Form.Field >
                    <label>other:</label>
                        {/* <div className="ui fluid input">
                            <input type="text" name="has_parent_use_other" value={has_parent_use_other} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                        </div> */}
                        <Form.TextArea name="has_parent_use_other" value={has_parent_use_other} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                        {/* {props.childToiletHabitValidator.message('particular_procedure_of_child', particular_procedure_of_child, 'required')} */}

                    </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>

                    <div className="field ">
                        <label>Are bowel movements regular?</label>
                        <div className="ui radio checkbox">
                                <input type="radio" value='yes' name="has_bowel_movement_regular" checked={has_bowel_movement_regular === 'yes'} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                                <label className="mr-10">Yes</label>
                            </div>
                            <div className="ui radio checkbox">
                                <input type="radio" value='no' name="has_bowel_movement_regular" checked={has_bowel_movement_regular === 'no'} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                                <label>No</label>
                            </div>
                    </div>

                    <Form.Field />

                    <Form.Field >
                        <label>
                            How many per day?
                         </label>
                        <Form.Input type='text' value={how_many_time_bowl_move} name="how_many_time_bowl_move" onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                        {/* {props.childToiletHabitValidator.message('how_many_time_bowl_move', how_many_time_bowl_move, 'required')} */}
                    </Form.Field>


                    {/* IMPORTANT USED IN FUTURE
                 {
                    has_bowel_movement_regular === 'yes' ?
                        <Form.Field >
                            <label>
                                How many per day?
                         </label>
                            <Form.Input type='text' value={how_many_time_bowl_move} name="how_many_time_bowl_move" onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                            {props.childToiletHabitValidator.message('how_many_time_bowl_move', how_many_time_bowl_move, 'required')}
                        </Form.Field>
                        : <Form.Field />
                } */}




                </Form.Group>

                <Form.Group widths='equal'>

                    <div className="field ">
                        <label>Is there a problem with diarrhea?</label>
                        <div className="ui radio checkbox">
                                <input type="radio" value='yes' name="has_problem_of_diarrhea" checked={has_problem_of_diarrhea === 'yes'} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                                <label className="mr-10">Yes</label>
                            </div>
                            <div className="ui radio checkbox">
                                <input type="radio" value='no' name="has_problem_of_diarrhea" checked={has_problem_of_diarrhea === 'no'} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                                <label>No</label>
                            </div>
                    </div>

                    <div className="field ">
                        <label>Constipation</label>
                        <div className="ui radio checkbox">
                                <input type="radio" value='yes' name="has_problem_of_constipation" checked={has_problem_of_constipation === 'yes'} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                                <label className="mr-10">Yes</label>
                            </div>
                            <div className="ui radio checkbox">
                                <input type="radio" value='no' name="has_problem_of_constipation" checked={has_problem_of_constipation === 'no'} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                                <label>No</label>
                            </div>
                    </div>
                    <div className="field ">
                        <label>Has toilet training been attempted?</label>
                        <div className="ui radio checkbox">
                                <input type="radio" value='yes' name="has_toilet_training" checked={has_toilet_training === 'yes'} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                                <label className="mr-10">Yes</label>
                            </div>
                            <div className="ui radio checkbox">
                                <input type="radio" value='no' name="has_toilet_training" checked={has_toilet_training === 'no'} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                                <label>No</label>
                            </div>
                    </div>

                </Form.Group>


                <Form.Group widths='equal' >
                    <Form.Field >
                        <label>
                            Please describe any particular procedure to be used for your child at the center:
                        </label>
                        <Form.TextArea name="particular_procedure_of_child" value={particular_procedure_of_child} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                        {/* {props.childToiletHabitValidator.message('particular_procedure_of_child', particular_procedure_of_child, 'required')} */}

                    </Form.Field>
                </Form.Group>

                <Form.Group widths='equal'>

                    <div className="field ">
                        <label>What is used at home? Pottychair?</label>
                        <div className="ui radio checkbox">
                                <input type="radio" value='yes' name="has_child_use_potty_chair" checked={has_child_use_potty_chair === 'yes'} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                                <label className="mr-10">Yes</label>
                            </div>
                            <div className="ui radio checkbox">
                                <input type="radio" value='no' name="has_child_use_potty_chair" checked={has_child_use_potty_chair === 'no'} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                                <label>No</label>
                            </div>
                    </div>

                    <div className="field ">
                        <label>Special child seat?</label>
                        <div className="ui radio checkbox">
                                <input type="radio" value='yes' name="has_child_use_special_seat" checked={has_child_use_special_seat === 'yes'} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                                <label className="mr-10">Yes</label>
                            </div>
                            <div className="ui radio checkbox">
                                <input type="radio" value='no' name="has_child_use_special_seat" checked={has_child_use_special_seat === 'no'} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                                <label>No</label>
                            </div>
                    </div>
                    <div className="field ">
                        <label>Regular seat?</label>
                        <div className="ui radio checkbox">
                                <input type="radio" value='yes' name="has_child_use_regular_seat" checked={has_child_use_regular_seat === 'yes'} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                                <label className="mr-10">Yes</label>
                            </div>
                            <div className="ui radio checkbox">
                                <input type="radio" value='no' name="has_child_use_regular_seat" checked={has_child_use_regular_seat === 'no'} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                                <label>No</label>
                            </div>
                    </div>

                </Form.Group>

                <Form.Group widths='equal'>
                    <Form.Field >
                        <label>How does your child indicate bathroom needs (include special words):</label>
                        <Form.TextArea name="how_child_indicate_bathroom" value={how_child_indicate_bathroom} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                        {/* {props.childToiletHabitValidator.message('how_child_indicate_bathroom', how_child_indicate_bathroom, 'required')} */}

                    </Form.Field>
                </Form.Group>

                <Form.Group widths='equal'>
                    <div className="field ">
                        <label>Is your child ever reluctant to use the bathroom?</label>
                        <div className="ui radio checkbox">
                                <input type="radio" value='yes' name="has_childwilling_to_use_bathroom" checked={has_childwilling_to_use_bathroom === 'yes'} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                                <label className="mr-10">Yes</label>
                            </div>
                            <div className="ui radio checkbox">
                                <input type="radio" value='no' name="has_childwilling_to_use_bathroom" checked={has_childwilling_to_use_bathroom === 'no'} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                                <label>No</label>
                            </div>
                    </div>
                    <div className="field ">
                        <label>Does your child have accidents?</label>
                        <div className="ui radio checkbox">
                                <input type="radio" value='yes' name="has_child_have_accident" checked={has_child_have_accident === 'yes'} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
                                <label className="mr-10">Yes</label>
                            </div>
                            <div className="ui radio checkbox">
                                <input type="radio" value='no' name="has_child_have_accident" checked={has_child_have_accident === 'no'} onChange={(event) => props._handleFormInput('childToiletHabit', event)} />
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

