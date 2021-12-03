import React from 'react'

import { Icon, Header, Button, Modal } from 'semantic-ui-react';


export const LoginSuccess = (props) => {
    return (

        <Modal open={props.open} size="mini" centered={true} >
            <Modal.Content >
                <Modal.Description>
                    <Header Icon="check circle outline" content='Login Successfully' />
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='green' onClick={props.close} >
                    <Icon name='checkmark' /> Yes
      </Button>
            </Modal.Actions>
        </Modal>

    )
}