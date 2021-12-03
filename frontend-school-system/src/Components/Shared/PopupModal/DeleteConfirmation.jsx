import React from 'react';
import { Button, Modal } from 'semantic-ui-react';


export function DeleteConfirmation(props) {
    let { open, modalHeader, modalDescription } = props;
    
    return (
        <Modal size="mini" open={open} onClose={props.close} closeOnDimmerClick={false} closeIcon>
            <Modal.Header>{modalHeader}</Modal.Header>
            <Modal.Content>
                <p>{modalDescription}</p>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    negative
                    onClick={props.close}
                >No</Button>
                <Button
                    positive
                    onClick={props.proceedToYes}
                >Yes</Button>
            </Modal.Actions>
        </Modal>
    )
}
