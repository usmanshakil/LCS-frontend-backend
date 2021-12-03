import React from 'react'

import { Icon, Header, Button, Modal } from 'semantic-ui-react';


export const SignUpSucess = (props) => {
    return (

        <Modal open={props.open} centered={true}>
            <Modal.Content >
                <Modal.Description>
                    <Header Icon="check circle outline" content='SignUp Successfully' />
                </Modal.Description>
                <Modal.Actions>
                    <Button color='green' onClick={props.close} >
                        <Icon name='checkmark' /> Yes
      </Button>
                </Modal.Actions>
            </Modal.Content>
        </Modal>

    )
}