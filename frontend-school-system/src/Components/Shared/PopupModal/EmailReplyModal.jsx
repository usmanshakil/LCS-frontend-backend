import React from 'react';
import { Form, Modal, Button, Icon } from 'semantic-ui-react'


export  function EmailReplyModal(props) {
    let { open,   isModalLoading,activeUser,reply  } = props;
    return (
        <Modal open={open} size="tiny" onClose={props.close} closeOnDimmerClick={false} closeIcon>
        <Modal.Content scrolling>
            <Form>
                <Form.Field>
                    <label>User Name</label>
                    <input type="text" value={activeUser.name}  readOnly/>
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <input type="text" value={activeUser.email} readOnly/>
                </Form.Field>
                <Form.Field>
                    <label>Reply</label>
                    <textarea  value={reply}  onChange={props._handleInput} disabled={isModalLoading}/>
                    {props.popUpValidation.message('reply', reply, 'required')}
                </Form.Field>
            </Form>
        </Modal.Content>
        <Modal.Actions>
            <Button primary onClick={props.showLoader} disabled={isModalLoading}>
                {
                    isModalLoading === true ? <Icon loading name='spinner' /> : 'Reply'
                }
            </Button>
        </Modal.Actions>
    </Modal>
    )
}
