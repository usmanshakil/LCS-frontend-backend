import React, { Component } from "react";
import { connect } from "react-redux";
import SimpleReactValidator from 'simple-react-validator';
//Api
import { updateParentProfile } from "../../../../ApiAction/Parent";
import { updateTeacherBasicInformation } from "../../../../ApiAction/Teacher";
import { updateAdminUserProfile, getUserProfile, getAdminActiveUser } from '../../../../ApiAction/Admin';
//Redux
import { saveLoginUserInfo } from "../../../../Redux/Actions/Login";
import { displayAdminProfile } from '../../../../Redux/Actions/Admin';
//Constants 
import { constants } from '../../../';
// popmodal
import { PopUpModal } from '../../../';
//css
import "./EditParentProfile.css";
//Components
import EditProfile from "./EditProfile";

class EditParentProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUserFullName: '',
      apiStatusCode: '',
      userInfo: props.loginUserInfo,
      updatedProfileData: {},
      showAdminProfile: props.showAdminProfile,
      parent_info: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone: "",
        cellphone: "",
        signature: "",
        comment: "",
        last_login: "",
        createdAt: "",
        updatedAt: "",
        has_received_text: false
      },
      confirmPassword: "",
      blankSignatureValidationMessage: "",
      isSignatureCanvasVisible: false,
      isPasswordMatch: true,
      validConfirmPasswordMessage: `Confirm password didn't match, please confirm your password!`,
      isFormLoading: true,
      activeUser: {
        first_name: "",
        last_name: "",
        phone: "",
        cellphone: "",
        has_received_text: "",
        password: "",
        email: "",
        createdAt: "",
        last_login: "",
        approved: "",
        active: "",
        email_confirmed: "",
        role_id: "",
        signature: "",
        comment: "",
        access: ''
      },
      adminUserAccess: constants.USER_ROLES,
      adminUserInfo: {
        first_name: "",
        last_name: "",
        phone: "",
        cellphone: "",
        has_received_text: "",
        password: "",
        email: "",
        createdAt: "",
        last_login: "",
        approved: "",
        active: "",
        email_confirmed: "",
        role_id: "",
        signature: "",
        comment: "",
        access: ''
      },
      activeUserId: '',
      isModalOpen: false,
      modalType: '',
      modalHeader: '',
      modalDescription: '',
      activeDropDownName: '',
      activeDropDownValue: ''
    };
    this.signaturePad = React.createRef();
    this.addUpdateUserFormValidator = new SimpleReactValidator()

  }

  componentWillMount() {
    if (this.props.loginUserInfo && this.props.loginUserInfo.role_id === 2) {
      this.getActiveUserProfile();
    } else if (this.props.loginUserInfo.role_id === 3) {
      this.userProfile();
    } else {
      this.userProfile();
    }
  }

  // check if value is 1 then show true other wise show false in form field
  hasTrue = (value) => {

    return value === 1 ? true : false
  }

  // fetching user profile data
  userProfile = () => {
    getUserProfile().then(res => {
      this.setState({
        parent_info: res.data,
        isSignatureCanvasVisible: res.data.signature === '' ? true : false,
        isFormLoading: false
      })
    }).catch(err => {
      this.setState({
        apiStatusCode: err ? err.status : 500
      }, () => {
        if (this.state.apiStatusCode === 401) {
          this.props.customProps._toastMessage('error', constants.SESSION_EXPIRED)
          this.props._removeToken()
        } else {
          this.props.customProps._toastMessage('error', err.message)
        }
      })
    })
  }

  // in admin module we are getting active user profile information 
  getActiveUserProfile = () => {

    let { activeUserId } = this.props.history.location.state === undefined ? this.state : this.props.history.location.state;

    if (activeUserId) {
      this.getActiveUserData(activeUserId)
    } else {
      this.props.history.push('/users');
    }
  }

  // finding data of active user by id
  getActiveUserData = (id) => {
    let { adminUserInfo, activeUserFullName, isSignatureCanvasVisible } = this.state;

    getAdminActiveUser(id).then(res => {
      adminUserInfo = res && res.data ? this.getAdminUserInfo(res) : adminUserInfo
      activeUserFullName = adminUserInfo.first_name + ' ' + adminUserInfo.last_name
      isSignatureCanvasVisible = adminUserInfo.signature === '' ? true : false
      this.setState({
        adminUserInfo,
        isSignatureCanvasVisible: isSignatureCanvasVisible,
        activeUserFullName,
        isFormLoading: false
      }, () => {
        // check if admin is viewing its own id
        if (this.state.adminUserInfo.role_id === 2) {
          this.props.displayAdminProfile(true)
        } else {
          this.props.displayAdminProfile(false)
        }
      })
    }).catch(err => {
      this.setState({
        apiStatusCode: err ? err.status : 500,
        isFormLoading: false
      }, () => {
        if (this.state.apiStatusCode === 401) {
          this.props.customProps._toastMessage('error', constants.SESSION_EXPIRED)
          this.props._removeToken()
        } else if (this.state.apiStatusCode === 500) {
          this.props.customProps._toastMessage('error', constants.SOMETHING_WENT_WRONG)
        }
        else {
          this.props.customProps._toastMessage('error', err.message)
        }
      })
    })
  }
  // finding active user info 
  getAdminUserInfo = (res) => {
    let { adminUserInfo } = this.state;

    adminUserInfo.id = res.data.id;
    adminUserInfo.first_name = res.data.first_name;
    adminUserInfo.last_name = res.data.last_name;
    adminUserInfo.email = res.data.email;
    adminUserInfo.phone = res.data.phone;
    adminUserInfo.cellphone = res.data.cellphone;
    adminUserInfo.signature = res.data.signature;
    adminUserInfo.comment = res.data.comment;
    adminUserInfo.last_login = res.data.last_login;
    adminUserInfo.createdAt = res.data.createdAt;
    adminUserInfo.role_id = res.data.role_id
    adminUserInfo.role = res.data.role
    adminUserInfo.approved = res.data.approved === 1 || 0 ? this.hasTrue(res.data.approved) : res.data.approved
    adminUserInfo.active = res.data.active === 1 || 0 ? this.hasTrue(res.data.active) : res.data.active
    adminUserInfo.email_confirmed = res.data.email_confirmed === 1 || 0 ? this.hasTrue(res.data.email_confirmed) : res.data.email_confirmed
    adminUserInfo.has_received_text = res.data.has_received_text === 1 || 0 ? this.hasTrue(res.data.has_received_text) : res.data.has_received_text

    return adminUserInfo
  }

  //handle input of parent profile form
  handleInput = (event) => {
    let { value, name } = event.target,
      { parent_info, adminUserInfo, userInfo } = this.state;
    // if user role is admin then adminUserInfo modal is updated
    if (userInfo.role_id === 2) {
      adminUserInfo[name] = value;
      this.setState({
        adminUserInfo
      })
    } else {
      parent_info[name] = value;
      this.setState({
        parent_info
      });
    }
  };

  //handle checkbox input of all checkboxes in parent profile form
  handleCheckBox = event => {
    let { checked, name } = event.target,
      { parent_info, adminUserInfo, userInfo } = this.state;

    if (userInfo.role_id === 2) {
      adminUserInfo[name] = checked;
      this.setState({
        adminUserInfo
      });
    } else {
      parent_info[name] = checked;
      this.setState({
        parent_info
      });
    }

  };

  //show signatture canvas
  showSignatureCanvas = () => {
    this.setState({
      isSignatureCanvasVisible: true
    });
  };

  //hide signatture canvas
  hideSignatureCanvas = () => {
    this.setState({
      isSignatureCanvasVisible: false
    });
  };

  //clear signature from signature pad
  clearSignature = () => {
    this.signaturePad.current.clear();
  };

  //value in confirm password field is save in state
  checkPassword = (event) => {
    //step 1
    //Remove error message

    //step 2
    // Which value user is filling i.e name
    //If name=== "confirm password" then match with password

    //step 3
    //if name === "password" and confirm password value already filled then match both values
    let { value, name } = event.target,
      { parent_info, adminUserInfo, userInfo } = this.state;
    if (name === "password") {
      if (userInfo.role_id === 2) {
        adminUserInfo[name] = value;
        this.setState({
          adminUserInfo,
        },()=>{
          this.verifyPassword()
        })
      } else {
        parent_info[name] = value;
        this.setState({
          parent_info
        },()=>{
          this.verifyPassword()
        });
      }
    } else {
      this.setState({
        confirmPassword: value,
      },()=>{
        this.verifyPassword()
      });
    }
  };
  //password is checked if password not match show error message of password not match
  verifyPassword = () => {
    let { parent_info, adminUserInfo, userInfo, confirmPassword } = this.state,
    enteredPassword=userInfo.role_id === 2?adminUserInfo.password :parent_info.password;
    //incase of admin check if admin is logged in then  adminUserInfo modal is updated
    if (confirmPassword === enteredPassword) {
      this.setState({
        isPasswordMatch: true,
        validConfirmPasswordMessage: ``
      });
    }
    else {
      this.setState({
        isPasswordMatch: false,
        validConfirmPasswordMessage: constants.CONFIRM_PASSWORD_ERROR_MESSAGE
      });
    }
  }

  //here parent profile update api is called
  updateProfile = () => {
    let { parent_info, userInfo, isSignatureCanvasVisible } = this.state;
    let data = {
      first_name: parent_info.first_name,
      last_name: parent_info.last_name,
      password: parent_info.password,
      signature: isSignatureCanvasVisible === true ? this.signaturePad.current.toDataURL("image/png") : userInfo.signature,//assign latest signature image if user trigger canvas
      phone: parent_info.phone,
      cellphone: parent_info.cellphone,
      has_received_text: parent_info.has_received_text,
    }
    updateParentProfile(data)
      .then(res => {
        this.setState({
          isFormLoading: false,
          updatedProfileData: res.data
        }, () => {
          this.props.saveLoginUserInfo(res.data);
          this.props.customProps._toastMessage("success", res.message);
          this.props.history.push({
            pathname: '/users/action/view',
            state: { updatedProfileData: this.state.updatedProfileData }
          })
        })
      })
      .catch(err => {
        this.setState({
          apiStatusCode: err ? err.status : 500,
          isFormLoading: false
        }, () => {
          if (this.state.apiStatusCode === 401) {
            this.props.customProps._toastMessage('error', constants.SESSION_EXPIRED)
            this.props._removeToken()
          } else if (this.state.apiStatusCode === 500) {
            this.props.customProps._toastMessage('error', constants.SOMETHING_WENT_WRONG)
          } else {
            this.props.customProps._toastMessage('error', err.message)
          }
        })
      });
  };


  // here admin user update api called
  updateUserProfile = () => {
    let { isSignatureCanvasVisible, adminUserInfo } = this.state;
    // creating modal data
    let data = {
      id: adminUserInfo.id,
      first_name: adminUserInfo.first_name,
      last_name: adminUserInfo.last_name,
      password: adminUserInfo.password,
      signature: isSignatureCanvasVisible === true ? this.signaturePad.current.toDataURL("image/png") : adminUserInfo.signature, //assign latest signature image if user trigger canvas
      phone: adminUserInfo.phone,
      cellphone: adminUserInfo.cellphone,
      has_received_text: adminUserInfo.has_received_text,
      email: adminUserInfo.email,
      comment: adminUserInfo.comment,
      role_id: adminUserInfo.role_id,
      approved: adminUserInfo.approved,
      active: adminUserInfo.active,
      email_confirmed: adminUserInfo.email_confirmed,
    }

    updateAdminUserProfile(data)
      .then(res => {
        this.setState({
          isFormLoading: false,
        }, () => {
          if (this.state.adminUserInfo.role_id === 2) {
            this.props.customProps._toastMessage("success", res.message);
            this.props.history.push('/home')
            this.props.displayAdminProfile(false)
          } else {
            this.props.displayAdminProfile(false)
            this.props.customProps._toastMessage("success", res.message);
            this.props.history.push('/users')
          }

        })
      })
      .catch(err => {

        this.setState({
          apiStatusCode: err ? err.status : 500,
          isFormLoading: false
        }, () => {
          if (this.state.apiStatusCode === 401) {
            this.props.customProps._toastMessage('error', constants.SESSION_EXPIRED)
            this.props._removeToken()
          } else if (this.state.apiStatusCode === 500) {
            this.props.customProps._toastMessage('error', constants.SOMETHING_WENT_WRONG)
          } else {
            this.props.customProps._toastMessage('error', err.message)
          }
        })
      });

  }

  // updating teacher basic profile which contain name , password ,phone number and signature
  updateTeacherBasicProfile = () => {
    let { parent_info, userInfo, isSignatureCanvasVisible } = this.state;
    let data = {
      first_name: parent_info.first_name,
      last_name: parent_info.last_name,
      password: parent_info.password,
      signature: isSignatureCanvasVisible === true ? this.signaturePad.current.toDataURL("image/png") : userInfo.signature,//assign latest signature image if user trigger canvas
      phone: parent_info.phone,
      cellphone: parent_info.cellphone,
      has_received_text: parent_info.has_received_text,
    }
    updateTeacherBasicInformation(data).then(res => {
      this.setState({
        isFormLoading: false,
      }, () => {
        this.props.customProps._toastMessage("success", res.message);
        this.props.history.push('/teacher-basic-info')
      })
    }).catch(err => {
      this.setState({
        apiStatusCode: err ? err.status : 500,
        isFormLoading: false
      }, () => {
        if (this.state.apiStatusCode === 401) {
          this.props.customProps._toastMessage('error', constants.SESSION_EXPIRED)
          this.props._removeToken()
        } else if (this.state.apiStatusCode === 500) {
          this.props.customProps._toastMessage('error', constants.SOMETHING_WENT_WRONG)
        } else {
          this.props.customProps._toastMessage('error', err.message)
        }
      })
    })

  }
  //show form Loader
  showFormLoader = () => {
    let { isPasswordMatch, userInfo, isSignatureCanvasVisible } = this.state;
    // checking for valiadation
    if (this.addUpdateUserFormValidator.allValid()) {
      if (isSignatureCanvasVisible) {
        // check if signature pad is not blank
        // here isEmpty() return true if signaturepad has empty
        if (this.signaturePad.current.isEmpty()) {
          this.setState({
            isSignatureCanvasVisible: true,
            blankSignatureValidationMessage: `Please fill the signature`,
            isFormLoading: false
          })
        }
        else {
          if (isPasswordMatch) {
            this.setState({
              isFormLoading: true
            }, () => {
              if (userInfo.role_id === 2) {
                // now update admin user profile api is called
                this.updateUserProfile();
              } else if (userInfo.role_id === 3) {
                // now update parent profile api is called
                this.updateProfile();
              }
              else {
                this.updateTeacherBasicProfile();
              }
            })
          } else {
            this.setState({
              isPasswordMatch: false,
              validConfirmPasswordMessage: constants.CONFIRM_PASSWORD_ERROR_MESSAGE
            });
          }
          // this.updateUserProfile()
        }
      } else {
        if (isPasswordMatch) {
          this.setState({
            isFormLoading: true
          }, () => {
            if (userInfo.role_id === 2) {
              // now update admin user profile api is called
              this.updateUserProfile()
            } else if (userInfo.role_id === 3) {
              // now update parent profile api is called
              this.updateProfile()
            }
            else {
              this.updateTeacherBasicProfile()
            }
          })
        } else {
          this.setState({
            isPasswordMatch: false,
            validConfirmPasswordMessage: constants.CONFIRM_PASSWORD_ERROR_MESSAGE
          });
        }
      }

    }
    else {
      this.addUpdateUserFormValidator.showMessages();
      this.forceUpdate();
    }


  }
  // onclicking on proceed to yes button in confirmation role popup save value in state
  proceedToYes = () => {
    let { adminUserInfo, activeDropDownName,
      activeDropDownValue } = this.state;
    adminUserInfo[activeDropDownName] = activeDropDownValue;
    this.setState({
      adminUserInfo,
      isModalOpen: false,
      modalType: '',
      modalHeader: '',
      modalDescription: ''
    })
  }



  //handle dropdown of edit user in admin 
  handleFormDropDown = (event) => {
    let { name, value } = event.target;

    this.setState({
      isModalOpen: true,
      modalType: constants.DELETE_CONFIRMATION_MODAL,
      modalHeader: 'Change role',
      modalDescription: `Are you sure, you want to change the role of the ${this.state.activeUserFullName}`,
      activeDropDownName: name,
      activeDropDownValue: value
    })
  }

  // close popup modal
  close = () => {
    this.setState({
      isModalOpen: false,
      modalType: '',
      modalHeader: '',
      modalDescription: ''
    })
  }

  render() {
    let {
      userInfo,
      parent_info,
      isSignatureCanvasVisible,
      confirmPassword,
      isPasswordMatch,
      blankSignatureValidationMessage,
      validConfirmPasswordMessage,
      isFormLoading,
      adminUserAccess,
      adminUserInfo,
      showAdminProfile,
      isModalOpen,
      modalType,
      modalHeader,
      modalDescription
    } = this.state,
      allEditProfileFunction = {
        updateProfile: this.updateProfile,
        handleCheckBox: this.handleCheckBox,
        handleInput: this.handleInput,
        checkPassword: this.checkPassword,
        clearSignature: this.clearSignature,
        hideSignatureCanvas: this.hideSignatureCanvas,
        showSignatureCanvas: this.showSignatureCanvas,
        showFormLoader: this.showFormLoader,
        handleFormDropDown: this.handleFormDropDown
      };

    return (
      <div>
        {
          isModalOpen ?
            <PopUpModal
              open={isModalOpen}
              type={modalType}
              modalHeader={modalHeader}
              modalDescription={modalDescription}
              close={this.close}
              proceedToYes={this.proceedToYes}
            /> :
            <EditProfile
              userInfo={userInfo}
              confirmPassword={confirmPassword}
              parent_info={parent_info}
              isPasswordMatch={isPasswordMatch}
              isFormLoading={isFormLoading}
              adminUserInfo={adminUserInfo}
              adminUserAccess={adminUserAccess}
              blankSignatureValidationMessage={blankSignatureValidationMessage}
              isSignatureCanvasVisible={isSignatureCanvasVisible}
              signaturePad={this.signaturePad}
              validConfirmPasswordMessage={validConfirmPasswordMessage}
              showAdminProfile={showAdminProfile}
              addUpdateUserFormValidator={this.addUpdateUserFormValidator}
              {...allEditProfileFunction}
            />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginUserInfo: state.loginReducer.loginUserInfo,
  showAdminProfile: state.adminReducer.showAdminProfile,
});

const mapDispatchToProps = dispatch => {
  return {
    saveLoginUserInfo: data => dispatch(saveLoginUserInfo(data)),
    displayAdminProfile: data => dispatch(displayAdminProfile(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditParentProfile);
