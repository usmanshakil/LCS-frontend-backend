import React from 'react';
import { Form, Button, Icon } from 'semantic-ui-react'

export function SocialRelationships(props) {
    let { childForm,
        loginUserInfo,
        showButtonLoader
    } = props,
        { socialRelationship } = childForm, {
            child_description_by_parent,
            previous_experience,
            reaction_to_starnger,
            favouraite_toy,
            child_fear,
            how_parent_comfort_child,
            behaviour_management,
            how_child_gain_experience,
            has_allow_play_alone
        } = socialRelationship;


    return (
        <div className="add-child-border tablet-view">

            <Form id="socialRelationship" onSubmit={() => props._saveForm(props.childSocialRelationshipValidator, 'socialRelationship','devReport','dailySchedule')}>
                <h4>SOCIAL RELATIONSHIPS</h4>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <label>How would you describe your child?</label>
                        <Form.TextArea name="child_description_by_parent" value={child_description_by_parent} onChange={(event) => props._handleFormInput('socialRelationship', event)} />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Field >
                        <label>
                            Previous experience with other children/day care:
                        </label>
                        <div className="ui fluid input"><input type="text" name="previous_experience" value={previous_experience} onChange={(event) => props._handleFormInput('socialRelationship', event)} /></div>
                    </Form.Field>
                    <div className="field">
                        <label>Reaction to strangers:</label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="reaction_to_starnger" checked={reaction_to_starnger === 'yes'} onChange={(event) => props._handleFormInput('socialRelationship', event)} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="reaction_to_starnger" checked={reaction_to_starnger === 'no'} onChange={(event) => props._handleFormInput('socialRelationship', event)} />
                            <label>No</label>
                        </div>
                    </div>
                    {/* this field is mandatory  */}
                    <div className="field">
                        <label>Able to play alone?</label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="has_allow_play_alone" checked={has_allow_play_alone === 'yes'} onChange={(event) => props._handleFormInput('socialRelationship', event)} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="has_allow_play_alone" checked={has_allow_play_alone === 'no'} onChange={(event) => props._handleFormInput('socialRelationship', event)} />
                            <label>No</label>
                        </div>
                    </div>

                </Form.Group>

                <Form.Group widths='equal'>
                    <div className="field">
                        <label>Favorite toys and activities:</label>
                        <div className="ui fluid input"><input type="text" value={favouraite_toy} name="favouraite_toy" onChange={(event) => props._handleFormInput('socialRelationship', event)} /></div>
                    </div>
                    {/* {props.childSocialRelationshipValidator.message('favouraite_toy', favouraite_toy, 'required')} */}

                    <div className="field">
                        <label>Fears (the dark, animals, etc.):</label>
                        <div className="ui fluid input"><input type="text" value={child_fear} name="child_fear" onChange={(event) => props._handleFormInput('socialRelationship', event)} /></div>
                    </div>
                    {/* {props.childSocialRelationshipValidator.message('child_fear', child_fear, 'required')} */}


                    <div className="field">
                        <label>How do you comfort your child?</label>
                        <div className="ui fluid input"><input type="text" value={how_parent_comfort_child} name="how_parent_comfort_child" onChange={(event) => props._handleFormInput('socialRelationship', event)} /></div>
                    </div>
                    {/* {props.childSocialRelationshipValidator.message('how_parent_comfort_child', how_parent_comfort_child, 'required')} */}


                </Form.Group>

                <Form.Group widths='equal'>
                    <Form.Field>
                        <label>What is the method of behavior management/discipline at home?</label>
                        <div className="ui fluid input"><input type="text" value={behaviour_management} name="behaviour_management" onChange={(event) => props._handleFormInput('socialRelationship', event)}/></div>

                        {/* {props.childSocialRelationshipValidator.message('behaviour_management', behaviour_management, 'required')} */}


                    </Form.Field>
                    <Form.Field>
                        <label>What would you like your child to gain from this childcare experience?</label>
                        <div className="ui fluid input"><input type="text" value={how_child_gain_experience} name="how_child_gain_experience" onChange={(event) => props._handleFormInput('socialRelationship', event)}/></div>

                        {/* {props.childSocialRelationshipValidator.message('how_child_gain_experience', how_child_gain_experience, 'required')} */}
                    </Form.Field>
                    <Form.Field />
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





