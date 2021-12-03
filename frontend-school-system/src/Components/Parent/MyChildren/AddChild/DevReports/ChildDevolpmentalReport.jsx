import React from 'react';
import { Form, TextArea, Button, Icon } from 'semantic-ui-react'

export function ChildDevolpmentalReport(props) {
    let { childForm,
        loginUserInfo,
        showButtonLoader
    } = props,
        { childInfo, devReport } = childForm;
    return (
        <div className="add-child-border tablet-view">
            <h3>
                Massachusetts Department of Early Education and Care regulations for licensed child care facilities require this information to be on file
                to address the needs of children while in care.
           </h3>

            <Form id="devReport" name="devReport" onSubmit={() => props._saveForm(props.childDevolpmentValidator,'devReport','devReport','childHealth' )} >
                <Form.Group widths='equal'   >
                    <Form.Field inline>
                        <label>CHILD'S NAME:</label>
                        <span className="capitalize">{childInfo.first_name} {childInfo.last_name}</span>
                    </Form.Field>
                    <Form.Field inline>
                        <label>
                            DATE OF BIRTH:
                    </label>
                        <span>{childInfo.birth_date}</span>
                    </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                    <h4>Please provide information for Infants and Toddlers (marked *) as appropriate to the age of your child.If your child is in preschool or
pre-k please ignore the items with an asterisk.</h4>
                </Form.Group>
                <Form.Group>
                    <h4>DEVELOPMENTAL HISTORY</h4>
                </Form.Group>
                <Form.Group widths='equal' >
                    <Form.Field inline >
                        <label>Age began sitting:</label>
                        <Form.Input type='text' value={devReport.age_began_sitting} name="age_began_sitting" onChange={(event) => props._handleFormInput('devReport', event)} fluid />
                        {/* {props.childDevolpmentValidator.message('age_began_sitting', devReport.age_began_sitting, 'required')} */}
                    </Form.Field>
                    <Form.Field inline >
                        <label>crawling:</label>
                        <Form.Input type='text' value={devReport.crawling} name="crawling" onChange={(event) => props._handleFormInput('devReport', event)} fluid />
                        {/* {props.childDevolpmentValidator.message('crawling', devReport.crawling, 'required')} */}

                    </Form.Field>
                    <Form.Field inline >
                        <label>walking:</label>
                        <Form.Input type='text' value={devReport.walking} name="walking" onChange={(event) => props._handleFormInput('devReport', event)} fluid />
                        {/* {props.childDevolpmentValidator.message('walking', devReport.walking, 'required')} */}

                    </Form.Field>
                    <Form.Field inline >
                        <label>talking:</label>
                        <Form.Input type='text' value={devReport.talking} name="talking" onChange={(event) => props._handleFormInput('devReport', event)} fluid />
                        {/* {props.childDevolpmentValidator.message('talking', devReport.talking, 'required')} */}

                    </Form.Field>
                </Form.Group>

                <Form.Group widths='equal'>
                    <div className="field">
                        <label>Does your child pull up?</label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="has_child_pull_up" checked={devReport.has_child_pull_up === 'yes'} onChange={(event) => props._handleFormInput('devReport', event)} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="has_child_pull_up" checked={devReport.has_child_pull_up === 'no'} onChange={(event) => props._handleFormInput('devReport', event)} />
                            <label>No</label>
                        </div>
                    </div>
                    <div className="field">
                        <label>Crawl?</label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="has_child_crawling" checked={devReport.has_child_crawling === 'yes'} onChange={(event) => props._handleFormInput('devReport', event)} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="has_child_crawling" checked={devReport.has_child_crawling === 'no'} onChange={(event) => props._handleFormInput('devReport', event)} />
                            <label>No</label>
                        </div>
                    </div>
                    <div className="field">
                        <label>Walk with support?</label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="has_child_walk_with_support" checked={devReport.has_child_walk_with_support === 'yes'} onChange={(event) => props._handleFormInput('devReport', event)} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="has_child_walk_with_support" checked={devReport.has_child_walk_with_support === 'no'} onChange={(event) => props._handleFormInput('devReport', event)} />
                            <label>No</label>
                        </div>
                    </div>
                    <div className="field">
                        <label>Any speech difficulties?</label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="has_speech_difficulties" checked={devReport.has_speech_difficulties === 'yes'} onChange={(event) => props._handleFormInput('devReport', event)} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="has_speech_difficulties" checked={devReport.has_speech_difficulties === 'no'} onChange={(event) => props._handleFormInput('devReport', event)} />
                            <label>No</label>
                        </div>
                    </div>
                </Form.Group>

                <Form.Group widths="equal"  >
                    <Form.Field inline >
                        <label>Special words to describe needs</label>
                        <TextArea rows={2} value={devReport.special_words_to_describe} name="special_words_to_describe" onChange={(event) => props._handleFormInput('devReport', event)} fluid />
                        {/* {props.childDevolpmentValidator.message('special_words_to_describe', devReport.special_words_to_describe, 'required')} */}

                    </Form.Field>
                </Form.Group>

                <Form.Group widths="equal">
                    <div className="field">
                        <label>Language spoken at home</label>
                        <div className="ui fluid input"><input type="text" value={devReport.language_spoken_at_home} name="language_spoken_at_home" onChange={(event) => props._handleFormInput('devReport', event)} /></div>
                    </div>
                    {/* {props.childDevolpmentValidator.message('language_spoken_at_home', devReport.language_spoken_at_home, 'required')} */}





                    <div className="field">
                        <label>Any history of colic?</label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="has_history_of_colics" checked={devReport.has_history_of_colics === 'yes'} onChange={(event) => props._handleFormInput('devReport', event)} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="has_history_of_colics" checked={devReport.has_history_of_colics === 'no'} onChange={(event) => props._handleFormInput('devReport', event)} />
                            <label>No</label>
                        </div>
                    </div>


                    <div className="field">
                        <label>Does your child use pacifier or suck thumb?</label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="has_child_use_pacifier_or_sucks_thumbs" checked={devReport.has_child_use_pacifier_or_sucks_thumbs === 'yes'} onChange={(event) => props._handleFormInput('devReport', event)} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="has_child_use_pacifier_or_sucks_thumbs" checked={devReport.has_child_use_pacifier_or_sucks_thumbs === 'no'} onChange={(event) => props._handleFormInput('devReport', event)} />
                            <label>No</label>
                        </div>
                    </div>



                    <Form.Field required={devReport.has_child_use_pacifier_or_sucks_thumbs === 'yes' ? true : false} >
                        <label>When?</label>
                        <div className="ui fluid input"><input type="text" value={devReport.when_child_use_pacifier_or_sucks_thumbs} name="when_child_use_pacifier_or_sucks_thumbs"
                            onChange={(event) => props._handleFormInput('devReport', event)} /></div>

                        {/* {props.childDevolpmentValidator.message('when_child_use_pacifier_or_sucks_thumbs', devReport.when_child_use_pacifier_or_sucks_thumbs, 'required')} */}

                    </Form.Field>

                </Form.Group>


                <Form.Group widths="equal">
                    <div className="field">
                        <label>Does your child have a fussy time?</label>
                        <div className="ui radio checkbox">
                            <input type="radio" value='yes' name="has_child_have_fussy_time" checked={devReport.has_child_have_fussy_time === 'yes'} onChange={(event) => props._handleFormInput('devReport', event)} />
                            <label className="mr-10">Yes</label>
                        </div>
                        <div className="ui radio checkbox">
                            <input type="radio" value='no' name="has_child_have_fussy_time" checked={devReport.has_child_have_fussy_time === 'no'} onChange={(event) => props._handleFormInput('devReport', event)} />
                            <label>No</label>
                        </div>
                    </div>
                    <Form.Field />
                    {/* required={devReport.has_child_have_fussy_time === 'yes' ? true : false} */}
                    <Form.Field  >
                        <label>When?</label>
                        <Form.Input type='text' value={devReport.when_child_have_fussy_time} name="when_child_have_fussy_time" onChange={(event) => props._handleFormInput('devReport', event)} />
                        {/* {props.childDevolpmentValidator.message('when_child_have_fussy_time', devReport.when_child_have_fussy_time, 'required')} */}

                    </Form.Field>
                </Form.Group>

                <Form.Group widths='equal'>
                    <div className="field">
                        <label>How do you handle this time?</label>
                        <textarea value={devReport.how_parent_handle_time} name="how_parent_handle_time" onChange={(event) => props._handleFormInput('devReport', event)} rows="4"></textarea>
                    </div>


                    {/* <Form.Field  >
                        <label>How do you handle this time?</label>
                        <TextArea rows={2} value={devReport.how_parent_handle_time} name="how_parent_handle_time" onChange={(event) => props._handleFormInput('devReport', event)} fluid />
                    </Form.Field> */}
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