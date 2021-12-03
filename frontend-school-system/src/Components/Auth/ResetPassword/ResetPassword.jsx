import React, { Component } from 'react';
import { Container, Grid, Form, Input } from 'semantic-ui-react';
import SimpleReactValidator from 'simple-react-validator';
import { resetPassword } from '../../../ApiAction/Auth';
// loader
import {Loaders} from '../../';
//Constants
import { constants } from '../../'
// CSS
import './ResetPassword.css'

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLinkExpired: false,
            resetPassword: {
                newPassword: '',
                confirmPassword: ''
            },
            isResetPasswordLoading: false,
            signature: '',
            passwordMatch: false,
            validConfirmPasswordMessage: '',
            type: '',
            apiStatusCode: ''
        }
        this.resetPasswordValidation = new SimpleReactValidator()
    }


    componentWillMount() {
        let token = this.props.location.search, isUrlHaveToken = token ? true : false;
        // check if url have token and type
        if (token) {
            let tokenArr = token.split("&");
            let type = tokenArr[0].replace("?type=", "");
            let code = tokenArr[1].replace("code=", "");

            if (isUrlHaveToken) {
                let hasLinkExpired = this.parseJwt(code)
                this.setState({
                    hasLinkExpired,
                    signature: code,
                    type: type
                }, () => {
                    this.checkLinkExpired()
                })
            }
            else {
                this.props.history.push('/forgot-password')
            }
        }
        else {
            this.props.history.push('/forgot-password')
        }


    }

    // finding expiry date from token
    parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        let hasExpire = this.hasDateExpired(JSON.parse(jsonPayload).expiry_date)
        return hasExpire;
    }

    //check if token is expired
    hasDateExpired = (expiry_date) => {
        let cur_date_in_mili = new Date().getTime();
        let TWO_HOURS = 60 * 60 * 1000 * 2;
        return (cur_date_in_mili - expiry_date) > TWO_HOURS
    }

    // checking if link is expired
    checkLinkExpired = () => {
        let { hasLinkExpired } = this.state;
        if (hasLinkExpired === true) {
            this.props.customProps._toastMessage('error', 'Your token has been expired')
            this.props.history.push('/forgot-password')
        }
        else {
            return false
        }


    }
    // calliing reset password api
    submitResetPasswordForm = () => {

        let { confirmPassword, newPassword } = this.state.resetPassword, { signature } = this.state;
        // checking if new password and connfirm password match
        if (newPassword === confirmPassword) {
            // checking if all field are filled
            if (this.resetPasswordValidation.allValid()) {
                let data = {
                    new_password: newPassword,
                    signature: signature
                }
                resetPassword(data).then(res => {
                    this.setState({
                        validConfirmPasswordMessage: '',
                        isResetPasswordLoading: false,
                    }, () => {
                        this.props.customProps._toastMessage('success', res.message)
                        this.props.history.push('/login')
                    })
                }).catch(err => {
                    this.setState({
                        isResetPasswordLoading: false,
                        apiStatusCode: err ? err.status : 500,
                    }, () => {
                        if (this.state.apiStatusCode === 500) {
                            this.props.customProps._toastMessage('error', constants.SOMETHING_WENT_WRONG)
                        }
                        else {
                            this.props.customProps._toastMessage('error', err.message)
                        }
                    })
                })

            } else {
                this.setState({
                    isResetPasswordLoading: false
                }, () => {
                    this.forceUpdate()
                    this.resetPasswordValidation.showMessages()
                })
            }
        } else {
            this.setState({
                validConfirmPasswordMessage: `Confirm password didn't match, please confirm your password!`,
                isResetPasswordLoading: false
            })
        }
    }

    //handle input of new password textbox and current password textbox
    handleInput = (event) => {
        let { value, name } = event.target, { resetPassword } = this.state;
        resetPassword[name] = value;
        this.setState({
            resetPassword
        })
    }
// display loader and submit reset password form
    showLoader = () => {
        this.setState({
            isResetPasswordLoading: true
        }, () => {
            this.submitResetPasswordForm()
        })
    }

    render() {
        let { isResetPasswordLoading, passwordMatch, validConfirmPasswordMessage, type } = this.state,
            { newPassword, confirmPassword } = this.state.resetPassword;
        return (
            <div className="reset-password-page">
                <div className="reset-password-section">
                    <Container>
                    {isResetPasswordLoading === true ?
                        <Loaders isLoading={isResetPasswordLoading}/>
                            :
                        <Grid>
                            <Grid.Row >
                                <Grid.Column computer={4} />
                                <Grid.Column tablet={16} computer={8} >
                                    <div className="reset-password-form-outline">
                                        <div className="w-100 mb-20px text-center">
                                            <h1 className="reset-password-heading ">{type === "forgot-password" ? "Reset" : "Create"} Your Password</h1>
                                        </div>
                                        <Form onSubmit={this.showLoader}>
                                            <Form.Group >
                                                <Form.Field width="two" />
                                                <Form.Field width="twelve" >
                                                    <Input type="password" placeholder="Enter your new password" name="newPassword" value={newPassword} onChange={this.handleInput} />
                                                    {this.resetPasswordValidation.message('new password is', newPassword, 'required')}
                                                </Form.Field>
                                                <Form.Field width="two" />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Field width="two" />
                                                <Form.Field width="twelve">
                                                    <Input type="password" placeholder="Confirm  your password" name="confirmPassword" value={confirmPassword} onChange={this.handleInput} />
                                                    {this.resetPasswordValidation.message('confirm password', confirmPassword, 'required')}
                                                    {
                                                        !passwordMatch && validConfirmPasswordMessage ?
                                                            <span className='password-warning srv-validation-message'>
                                                                {validConfirmPasswordMessage}</span>
                                                            :
                                                            ''
                                                    }
                                                </Form.Field>
                                                <Form.Field width="two" />
                                            </Form.Group>
                                            <div className="reset-password-btn-section">
                                                <div className="reset-password-btn">
                                                    <button type="submit" className="btn-reset-password" disabled={isResetPasswordLoading} >
                                                    Reset Password
                                                    </button>
                                                </div>
                                            </div>
                                        </Form>
                                    </div>
                                </Grid.Column>
                                <Grid.Column computer={4} >
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>}
                    </Container>
                </div>
            </div>
        )
    }
}
export default ResetPassword