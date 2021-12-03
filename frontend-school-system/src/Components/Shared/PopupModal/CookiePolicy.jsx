import React from 'react';
import { Icon, Header, Button, Modal } from 'semantic-ui-react';

export const CookiePolicy = (props) => {
  return (
   <Modal open={props.open} size="mini" centered={true} basic> 
      <Header icon='browser' content='Cookies policy' />
      <Modal.Content>
        <h3>This website uses cookies to ensure the best user experience.</h3>
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' onClick={props.close} inverted>
          <Icon name='checkmark' /> Got it
      </Button>
      </Modal.Actions>
    </Modal>
  )

}