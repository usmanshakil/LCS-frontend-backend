import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Button, Grid } from "semantic-ui-react";
//api
import {
  getAdminActiveUser,
  getUserProfile,
} from "../../../../ApiAction/Admin";
// redux
import { saveLoginUserInfo } from "../../../../Redux/Actions/Login";
// loader
import { Loaders } from "../../../";
//Constants
import { constants } from "../../../";
// CSS
import "./ViewParentProfile.css";

class ViewParentProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parentInfo: {},
      activeUser: {},
      activeUserId: "",
      showAdminProfile: props.showAdminProfile,
      apiStatusCode: "",
      isPageLoading: true,
      loginUserInfo: props.loginUserInfo,
    };
  }

  componentWillMount() {
    if (this.props.loginUserInfo.role_id === 2) {
      this.getUpdatedUserData();
    } else if (this.props.loginUserInfo.role_id === 3) {
      this.userProfile();
    } else {
      this.userProfile();
    }
  }

  // fetching user data
  userProfile = () => {
    getUserProfile()
      .then((res) => {
        this.setState(
          {
            parentInfo: res.data,
            isPageLoading: false,
          },
          () => {
            this.props.saveLoginUserInfo(this.state.parentInfo);
          }
        );
      })
      .catch((err) => {
        this.setState(
          {
            apiStatusCode: err ? err.status : 500,
            isPageLoading: false,
          },
          () => {
            if (this.state.apiStatusCode === 401) {
              this.props.customProps._toastMessage(
                "error",
                constants.SESSION_EXPIRED
              );
              this.props._removeToken();
            } else if (this.state.apiStatusCode === 500) {
              this.props.customProps._toastMessage(
                "error",
                constants.SOMETHING_WENT_WRONG
              );
            } else {
              this.props.customProps._toastMessage("error", err.message);
            }
          }
        );
      });
  };
  // in admin module on the basis of active user id we are retrieving updated user data using active user api
  getUpdatedUserData = () => {
    let { showAdminProfile } = this.state,
      { activeUserId, activeUser } = this.props.history.location.state,
      activeId = "";

    activeId = showAdminProfile === true ? activeUser.id : activeUserId;

    if (activeId) {
      getAdminActiveUser(activeId)
        .then((res) => {
          this.setState({
            activeUser: res.data,
            isPageLoading: false,
          });
        })
        .catch((err) => {
          this.setState(
            {
              apiStatusCode: err ? err.status : 500,
              isPageLoading: false,
            },
            () => {
              if (this.state.apiStatusCode === 401) {
                this.props.customProps._toastMessage(
                  "error",
                  constants.SESSION_EXPIRED
                );
                this.props._removeToken();
              } else if (this.state.apiStatusCode === 500) {
                this.props.customProps._toastMessage(
                  "error",
                  constants.SOMETHING_WENT_WRONG
                );
              } else {
                this.props.customProps._toastMessage("error", err.message);
              }
            }
          );
        });
    } else {
      this.props.history.push("/users");
    }
  };

  //redirect to edit profile page
  openEditProfilePage = () => {
    this.props.history.push({
      pathname: `/edit-parent-profile`,
      state: { activeUser: this.state.activeUser },
    });
  };
  //redirect to edit user profile page
  openUserEditProfilePage = (id, event) => {
    this.setState(
      {
        activeUserId: id,
      },
      () => {
        this.props.history.push({
          pathname: `/edit-users-profile`,
          state: { activeUserId: this.state.activeUserId },
        });
      }
    );
  };

  // check if value is true or false
  hasTrue(value) {
    // let { parentInfo } = this.state;
    return value === 1 || value === true ? "Yes" : "No";
    // if (parentInfo.role_id === 2) {
    //   return value === 1 ? "Yes" : "No";
    // } else {
    //   return value === true ? "Yes" : "No";
    // }
  }

  findRole = (roleId) => {
    switch (roleId) {
      case 0:
        return "Super Admin";
      case 1:
        return "Super Admin";
      case 2:
        return "Admin";
      case 3:
        return "Parent";
      case 4:
        return "Teacher";
      default:
        return "";
    }
  };

  render() {
    let {
        parentInfo,
        activeUser,
        showAdminProfile,
        isPageLoading,
        loginUserInfo,
      } = this.state,
      {
        first_name,
        last_name,
        cellphone,
        phone,
        approved,
        email_confirmed,
        signature,
        active,
        has_received_text,
      } = parentInfo;
    return (
      <div>
        {isPageLoading ? (
          <div className="ui container">
            <Loaders isLoading={isPageLoading} />
          </div>
        ) : (
          <div className="main-layout-height">
            <Container className="mt-2rem ">
              <h2>
                {loginUserInfo.role_id === 2
                  ? "Details"
                  : loginUserInfo.role_id === 4
                  ? "My Account"
                  : "Parent details"}
              </h2>
              {loginUserInfo.role_id === 2 ? (
                <Button
                  type="button"
                  onClick={(event) =>
                    this.openUserEditProfilePage(activeUser.id, event)
                  }
                >
                  Edit Profile
                </Button>
              ) : (
                <Button type="button" onClick={this.openEditProfilePage}>
                  Edit Profile
                </Button>
              )}
              {loginUserInfo.role_id === 2 ? (
                <p />
              ) : (
                <h3>
                  {loginUserInfo.role_id === 4 ? "" : `Parent information`}
                </h3>
              )}
              <Grid>
                <Grid.Row>
                  <Grid.Column computer={5} tablet={5} mobile={16}>
                    <strong>First Name:</strong>
                    <span className="ml-5">
                      {loginUserInfo.role_id === 2
                        ? activeUser.first_name
                        : first_name}
                    </span>
                  </Grid.Column>
                  <Grid.Column computer={5} tablet={5} mobile={16}>
                    <strong>Last Name:</strong>
                    <span className="ml-5">
                      {loginUserInfo.role_id === 2
                        ? activeUser.last_name
                        : last_name}
                    </span>
                  </Grid.Column>
                  {loginUserInfo.role_id === 2 ? (
                    <Grid.Column computer={5} tablet={5} mobile={16}>
                      <strong>Status:</strong>
                      <span className="ml-5">
                        {loginUserInfo.role_id === 2 ? activeUser.role : ""}
                      </span>
                    </Grid.Column>
                  ) : (
                    ""
                  )}
                  <Grid.Column computer={5} tablet={5} mobile={16} />
                </Grid.Row>
                {showAdminProfile === true ? (
                  ""
                ) : (
                  <Grid.Row>
                    <Grid.Column computer={5} tablet={5} mobile={16}>
                      <strong>Approved:</strong>
                      <span className="ml-5">
                        {loginUserInfo.role_id === 2
                          ? this.hasTrue(activeUser.approved)
                          : this.hasTrue(approved)}
                      </span>
                    </Grid.Column>
                    <Grid.Column computer={5} tablet={5} mobile={16}>
                      <strong>Active:</strong>
                      <span className="ml-5">
                        {loginUserInfo.role_id === 2
                          ? this.hasTrue(activeUser.active)
                          : this.hasTrue(active)}
                      </span>
                    </Grid.Column>
                    <Grid.Column computer={5} tablet={5} mobile={16}>
                      <strong>Email confirmed:</strong>
                      <span className="ml-5">
                        {loginUserInfo.role_id === 2
                          ? this.hasTrue(activeUser.email_confirmed)
                          : this.hasTrue(email_confirmed)}
                      </span>
                    </Grid.Column>
                  </Grid.Row>
                )}
                <Grid.Row>
                  <Grid.Column computer={5} tablet={5} mobile={16}>
                    <strong>Phone:</strong>
                    <span className="ml-5">
                      {loginUserInfo.role_id === 2 ? activeUser.phone : phone}
                    </span>
                  </Grid.Column>
                  <Grid.Column computer={5} tablet={5} mobile={16}>
                    <strong>Cellphone:</strong>
                    <span className="ml-5">
                      {loginUserInfo.role_id === 2
                        ? activeUser.cellphone
                        : cellphone}
                    </span>
                  </Grid.Column>
                  <Grid.Column computer={5} tablet={5} mobile={16}>
                    <strong>Receive Text:</strong>
                    <span className="ml-5">
                      {loginUserInfo.role_id === 2
                        ? this.hasTrue(activeUser.has_received_text)
                        : this.hasTrue(has_received_text)}
                    </span>
                  </Grid.Column>
                </Grid.Row>
                {loginUserInfo.role_id === 2 ? (
                  <Grid.Row>
                    <Grid.Column computer={5} tablet={5} mobile={16}>
                      <strong>Access requested:</strong>
                      <span className="ml-5">
                        {this.findRole(activeUser.initial_role_id)}
                      </span>
                    </Grid.Column>
                    <Grid.Column computer={5} tablet={5} mobile={16}>
                      <strong>Access granted:</strong>
                      <span className="ml-5">
                        {this.findRole(activeUser.role_id)}
                      </span>
                    </Grid.Column>
                    <Grid.Column computer={5} tablet={5} mobile={16} />
                  </Grid.Row>
                ) : (
                  ""
                )}
                <Grid.Row>
                  <Grid.Column computer={16} tablet={16} mobile={16}>
                    <label>Signature:</label>
                    <div className={`w-100 signature-boundary mt-10 `}>
                      <img
                        src={`${
                          loginUserInfo.role_id === 2
                            ? activeUser.signature
                            : signature
                        }`}
                        alt="parent-signature"
                        className="view-signature-image"
                      />
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loginUserInfo: state.loginReducer.loginUserInfo,
  showAdminProfile: state.adminReducer.showAdminProfile,
});

const mapDispatchToProps = (dispatch) => {
  return {
    saveLoginUserInfo: (data) => dispatch(saveLoginUserInfo(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewParentProfile);
