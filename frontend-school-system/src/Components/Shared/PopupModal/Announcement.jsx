import React from 'react';
import { Button, Modal, Form, TextArea, Icon } from 'semantic-ui-react';


export function EditAnnouncement(props) {
    let { open, modalHeader, editAnnouncement,showLoaderinPopUp } = props,
        { title, description } = editAnnouncement;

    return (
        <Modal open={open} size="tiny" onClose={props.close} closeOnDimmerClick={false} closeIcon 
            // style = {{height: '0px !important' }}
            >
            <Modal.Header>{modalHeader}</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Title</label>
                        <input placeholder='Title' name="title" value={title} onChange={props._handleInput} disabled={showLoaderinPopUp}/>
                        {props.popUpValidation.message('title', title, 'required')}

                    </Form.Field>
                    <Form.Field>
                        <label>Description</label>
                        <TextArea placeholder='Description' name="description" value={description} onChange={props._handleInput} disabled={showLoaderinPopUp}/>
                        {props.popUpValidation.message('description', description, 'required')}
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button primary onClick={props.showLoader} disabled={showLoaderinPopUp}>
                    {
                        showLoaderinPopUp? <Icon loading name="spinner"></Icon>:'Submit'
                    }
                </Button>
            </Modal.Actions>
        </Modal>
    )
}


export function DeleteAnnouncement(props) {
    let { open, modalHeader, description } = props;
    return (
        <Modal open={open} size="tiny" onClose={props.close} closeOnDimmerClick={false} closeIcon >
            <Modal.Header>{modalHeader}</Modal.Header>
            <Modal.Content >
                <Modal.Description>
                    {description}
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={props.close}>
                    No
      </Button>
                <Button color='green' onClick={props._deleteAnnouncement} >
                    Yes
  </Button>
            </Modal.Actions>
        </Modal>
    )
}
