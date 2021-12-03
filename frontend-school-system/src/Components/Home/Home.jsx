import React, { Component } from "react";
import { Container, Button, Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import Cookies from "js-cookie";
//redux
import { displayAdminProfile } from "../../Redux/Actions/Admin";
//api
import { getActiveAnnouncements } from "../../ApiAction/Admin";
//Constants
import { constants } from "../";
// Loader
import { Loaders } from "../";
// Pdf Forms
import HealthCarePlans from "../Shared/Assests/Pdf-form/Individual-Health-Care-Plan-Form-EEC.pdf";
import HealthRecordForm from "../Shared/Assests/Pdf-form/Health-Record-Form.pdf";
import MedicationConsentForm from "../Shared/Assests/Pdf-form/MedicationConsentForm.pdf";
import ParentHandbook from "../Shared/Assests/Pdf-form/LCSH-ParentHandbook.pdf";
// css
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUserInfo: props.loginUserInfo,
      page_number: 1,
      page_size: 20,
      announcement: "",
      apiStatusCode: "",
      isPageLoading: true
    };
  }

  componentWillMount() {
    this.isUserLogin();
  }

  //check if user is login
  isUserLogin = () => {
    let token = Cookies.get("loginUserToken");

    if (token && token) {
      this.showAnnouncement();
    } else {
      this.props.history.push("/login");
    }
  };

  // calling announcement api
  showAnnouncement = () => {
    getActiveAnnouncements()
      .then(res => {
        // check if response data is not null
        if (res.data) {
          this.setState({
            announcement: res.data.description,
            isPageLoading: false
          });
        } else {
          this.setState({
            isPageLoading: false
          });
        }
      })
      .catch(err => {
        this.setState(
          {
            apiStatusCode: err ? err.status : 500,
            isPageLoading: false
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

  //onclicking on button redirect to page
  showPage = pageName => {
    if (
      this.state.loginUserInfo.role_id === 2 &&
      pageName === "users/action/view"
    ) {
      this.props.displayAdminProfile(true);
      this.props.history.push({
        pathname: `/${pageName}`,
        state: { activeUser: this.state.loginUserInfo }
      });
    } else {
      this.props.history.push({
        pathname: `/${pageName}`,
        state: { activeUser: this.state.loginUserInfo }
      });
    }
  };

  //displaying buttons by user role
  showDesignByUserRole = userRole => {
    switch (userRole) {
      case 1:
        return (
          <div className="sixteen wide computer sixteen wide mobile column"></div>
        );
      case 2:
        return (
          <div className="sixteen wide computer sixteen wide mobile column">
            <div className="w-100 homepage-btns admin-btns">
              <Button
                color="green"
                compact
                onClick={event => this.showPage("users/action/view")}
              >
                My Account
              </Button>
              <Button
                color="teal"
                compact
                onClick={event => this.showPage("student")}
              >
                Manage Students
              </Button>
              <Button
                color="violet"
                compact
                onClick={event => this.showPage("teachers")}
              >
                Manage Teachers
              </Button>
              <Button
                color="purple"
                compact
                onClick={event => this.showPage("users")}
              >
                Manage Users
              </Button>
              <Button
                color="black"
                compact
                onClick={event => this.showPage("classes")}
              >
                Manage Classes
              </Button>
              <Button
                color="yellow"
                compact
                onClick={event => this.showPage("incidents")}
              >
                Manage Incidents
              </Button>
              <Button
                color="blue"
                compact
                onClick={event => this.showPage("renewal")}
              >
                View Renewal
              </Button>
              {/* <Button
              color="brown"
              onClick={event => this.showPage("staff-info")}
            >
              Staff Information Form
                </Button> */}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="sixteen wide computer sixteen wide mobile column">
            <div className="w-100 homepage-btns">
              <div className="mr-10">
                <Button
                  color="yellow"
                  onClick={event => this.showPage("student")}
                >
                  MyChildren
                </Button>
              </div>
              <Button
                color="green"
                onClick={event => this.showPage("users/action/view")}
              >
                My Account
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="sixteen wide computer sixteen wide mobile column">
            <div className="w-100 homepage-btns">
              {/* <Button
              color="yellow"
              onClick={event => this.showPage("student/view")}
            >
              My Student
                </Button> */}
              <Button
                color="green"
                onClick={event => this.showPage("teacher-basic-info")}
              >
                My Account
              </Button>
              <Button
                color="brown"
                onClick={event => this.showPage("view-staff-info")}
              >
                Teacher Information
              </Button>
            </div>
          </div>
        );

      default:
        return (
          <div className="sixteen wide computer sixteen wide mobile column">
            <div className="w-100 homepage-btns">
              <div className="mr-10">
                <Button
                  color="yellow"
                  onClick={event => this.showPage("student")}
                >
                  MyChildren
                </Button>
              </div>
              <Button
                color="green"
                onClick={event => this.showPage("users/action/view")}
              >
                My Account
              </Button>
            </div>
          </div>
        );
    }
  };

  render() {
    let { loginUserInfo, announcement, isPageLoading } = this.state;
    return (
      <div>
        {isPageLoading ? (
          <div className="ui container">
            <Loaders isLoading={isPageLoading} />{" "}
          </div>
        ) : (
          <Container className="mt-2rem">
            <Grid>
              <Grid.Row>
                {/* <Grid.Column computer={4} /> */}
                {this.showDesignByUserRole(loginUserInfo.role_id)}
              </Grid.Row>
              <Grid.Row>
                <Grid.Column
                  mobile={16}
                  computer={16}
                  className="homepage-announcement-box"
                >
                  <div
                    className={`announcement-section  theme-${loginUserInfo.role_id}-border`}
                  >
                    <p>
                      <strong>Announcements</strong>
                    </p>
                    <p className="mt-2rem announcement-text color-red">
                      {announcement}
                    </p>
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column computer={3} tablet={1} />
                <Grid.Column mobile={16} computer={4} tablet={5}>
                  <p>
                    <strong>FORMS:</strong>
                  </p>
                  <p>
                    <a
                      href={HealthCarePlans}
                      target="blank"
                      rel="noopener noreferrer"
                    >
                      HealthCare Plan
                    </a>
                    <br />
                    (for children with health plan)
                  </p>
                  <p>
                    <a
                      href={HealthRecordForm}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Health Record Form
                    </a>{" "}
                    <br />
                    (to be completed by doctor)
                  </p>

                  <p>
                    <a
                      href={MedicationConsentForm}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Medication Consent Form
                    </a>{" "}
                    <br />
                    (to be completed by parent)
                    <br />
                  </p>
                </Grid.Column>
                <Grid.Column mobile={16} computer={4} tablet={5}>
                  <p>
                    <strong>DOCUMENTS:</strong>
                  </p>
                  <p>
                    <a
                      href={ParentHandbook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LCS Parent HandBook
                    </a>
                  </p>
                </Grid.Column>
                <Grid.Column mobile={16} computer={4} tablet={5}>
                  <p>
                    <strong>LABELS:</strong>
                  </p>
                  <p>
                    <a
                      href="https://mabelslabels.com/us/index.php/?___store=us_english_storeview"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Mabels's Labels
                    </a>
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginUserInfo: state.loginReducer.loginUserInfo
});

const mapDispatchToProps = dispatch => {
  return {
    displayAdminProfile: data => dispatch(displayAdminProfile(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
