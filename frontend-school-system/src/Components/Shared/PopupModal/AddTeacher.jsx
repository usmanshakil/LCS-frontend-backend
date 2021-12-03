import React from 'react'
import { Form, Modal, Button, Icon } from 'semantic-ui-react';

export function AddTeacher(props) {

    let { open,  addTeacherModal, isModalLoading  } = props,
        { first_name, last_name, email } = addTeacherModal;

    return (
        <Modal open={open} size="tiny" onClose={props.close} closeOnDimmerClick={false} closeIcon>
            <Modal.Content scrolling>
                <Form>
                    <Form.Field>
                        <label>First Name</label>
                        <input type="text" value={first_name} name="first_name" onChange={props._handleInput} disabled={isModalLoading}/>
                        {props.popUpValidation.message('first_name', first_name, 'required')}
                    </Form.Field>
                    <Form.Field>
                        <label>Last Name</label>
                        <input type="text" value={last_name} name="last_name" onChange={props._handleInput} disabled={isModalLoading}/>
                        {props.popUpValidation.message('last_name', last_name, 'required')}
                    </Form.Field>
                    <Form.Field>
                        <label>Email</label>
                        <input type="email" value={email} name="email" onChange={props._handleInput} disabled={isModalLoading}/>
                        {props.popUpValidation.message('email', email, 'required')}

                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button primary onClick={props.showLoader} disabled={isModalLoading}>
                    {
                        isModalLoading === true ? <Icon loading name='spinner' /> : 'Submit'
                    }
                </Button>
            </Modal.Actions>
        </Modal>
    )

}
