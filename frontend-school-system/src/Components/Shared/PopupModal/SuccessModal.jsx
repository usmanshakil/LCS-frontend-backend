import React from 'react';
import { Icon,  Button, Modal } from 'semantic-ui-react';

export function SuccessModal(props) {
    let { open, modalDescription } = props;

    return (
        <Modal open={open} size="mini" centered={true} >
            <Modal.Content >
                <Modal.Description className="text-center">
                    <Icon.Group size='huge'>
                        <Icon size='big' color='green' name='circle outline' />
                        <Icon name='check' color='green' />
                    </Icon.Group>

                    <p className="modal-descripion">
        {modalDescription}
        </p>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='green' onClick={props.close} >
                     OK
  </Button>
            </Modal.Actions>
        </Modal>
    )
}
