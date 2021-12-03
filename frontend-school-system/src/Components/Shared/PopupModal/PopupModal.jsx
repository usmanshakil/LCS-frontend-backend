import React, { Component } from "react";
import {
  CookiePolicy,
  DeleteConfirmation,
  SuccessModal,
  ErrorModal,
  EditAnnouncement,
  DeleteAnnouncement,
  AddTeacher,
  EmailReplyModal,
  RenewAdmission
} from ".";
//CONST FILE
import { constants } from "../../index";
// css
import "./PopupModal.css";

// PROPS :-
// open :display PopUpModal,
// close:close PopUpModal,
// type :  which model will open
//modalHeader : show heading of modal,
// modalDescription: show modal text
//editAnnouncement = contain value of editAnnouncement data modal
// popUpValidation = validation is passed to popup modal
// message  = message
// modalData = {}
// _submitModalDetail= submit modal detail to active component and call api
// _handleInput= save value of input field in popup in component state

export class PopUpModal extends Component {
  getModelContent(props) {
    switch (props.type) {
      case constants.COOKIE_POLICY: {
        return <CookiePolicy {...props} />;
      }
      case constants.DELETE_CONFIRMATION_MODAL: {
        return <DeleteConfirmation {...props} />;
      }
      case constants.EDIT_ANNOUNCEMENT: {
        return <EditAnnouncement {...props} />;
      }
      case constants.ADD_TEACHER: {
        return <AddTeacher {...props} />;
      }
      case constants.DELETE_ANNOUNCEMENT: {
        return <DeleteAnnouncement {...props} />;
      }
      case constants.SUCCESS_MODAL: {
        return <SuccessModal {...props} />;
      }
      case constants.ERROR_MODAL: {
        return <ErrorModal {...props} />;
      }
      case constants.ADMIN_REPLY_TO_USER: {
        return <EmailReplyModal {...props} />;
      }
      case constants.RENEWAL_ADMISSION_DATE_MODAL: {
        return <RenewAdmission {...props} />;
      }
      default: {
        return false;
      }
    }
  }
  render() {
    let ModalData = this.getModelContent(this.props);
    return ModalData;
  }
}

export default PopUpModal;
