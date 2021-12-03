import React, { Component } from "react";
import { Container, Grid, Form, Input, Icon } from "semantic-ui-react";
import SimpleReactValidator from "simple-react-validator";
// API
import { forgotPassword } from "../../../ApiAction/Auth";
import { constants } from "../../";
// loaders
import { Loaders } from "../../";
// CSS
import "./ForgotPassword.css";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isForgotPasswordLoading: false,
      apiStatusCode: ""
    };
    this.forgotPasswordValidation = new SimpleReactValidator();
  }

  //handle input of email field
  handleInput = event => {
    let { value } = event.target;
    this.setState({
      email: value
    });
  };

  // submit forgot password form and forgot password api is hitted
  submitForgotPasswordForm = () => {
    if (this.forgotPasswordValidation.allValid()) {
      let data = {
        email: this.state.email
      };
      forgotPassword(data)
        .then(res => {
          this.setState(
            {
              isForgotPasswordLoading: false
            },
            () => {
              this.props.customProps._toastMessage("success", res.message);
              this.props.history.push("/login");
            }
          );
        })
        .catch(err => {
          this.setState(
            {
              apiStatusCode: err ? err.status : 500,
              isForgotPasswordLoading: false
            },
            () => {
              if (this.state.apiStatusCode === 401) {
                this.props.customProps._toastMessage("error", err.statusText);
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
      this.setState(
        {
          isForgotPasswordLoading: false
        },
        () => {
          this.forceUpdate();
          this.forgotPasswordValidation.showMessages();
        }
      );
    }
  };

  // show loader on page and submit forgot password form
  showLoader = () => {
    this.setState(
      {
        isForgotPasswordLoading: true
      },
      () => {
        this.submitForgotPasswordForm();
      }
    );
  };

  render() {
    let { email, isForgotPasswordLoading } = this.state;
    return (
      <div className="forgot-password-page">
        <div className="forgot-password-section">
          <Container>
            {isForgotPasswordLoading === true ? (
              <Loaders isLoading={isForgotPasswordLoading} />
            ) : (
              <Grid>
                <Grid.Row>
                  <Grid.Column computer={4} />
                  <Grid.Column tablet={16} computer={8}>
                    <div className="forgot-password-form-outline">
                      <div className="w-100 mb-20px text-center">
                        <h1 className="forgot-password-heading ">
                          Forgot Your Password
                        </h1>
                        <p>
                          To reset your password, please enter your Mylcsh.com
                          email.
                        </p>
                        <p>
                          You will get password reset instructions in your email
                          address for this account.
                        </p>
                      </div>
                      <Form onSubmit={this.showLoader}>
                        <Form.Field>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={this.handleInput}
                          />
                          {this.forgotPasswordValidation.message(
                            "email is",
                            email,
                            "required|email"
                          )}
                        </Form.Field>
                        <div className="forgot-password-btn-section">
                          <div className="forgot-password-btn">
                            <button
                              type="submit"
                              className="btn-forgot-password"
                              disabled={isForgotPasswordLoading}
                            >
                              {isForgotPasswordLoading ? (
                                <Icon loading name="spinner" />
                              ) : (
                                "Forgot Password"
                              )}
                            </button>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </Grid.Column>
                  <Grid.Column computer={4} />
                </Grid.Row>
              </Grid>
            )}
          </Container>
        </div>
      </div>
    );
  }
}
export default ForgotPassword;
