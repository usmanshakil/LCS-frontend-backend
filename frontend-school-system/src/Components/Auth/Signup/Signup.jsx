import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Container, Step, Header, Image } from 'semantic-ui-react';
import SimpleReactValidator from 'simple-react-validator';
import _ from "lodash";
//api 
import { signUp } from '../../../ApiAction/Auth';
// Redux
import { saveLoginUserInfo } from '../../../Redux/Actions/Login';
// Component
import { FirstStep } from './FirstStep';
import SecondStep from './SecondStep';
//Loader
import {Loaders} from '../../';
//constant
import { constants } from '../../'
// popmodal
import {PopUpModal} from '../../'
// CSS
import './signup.css';
// Image
import SignUpLogo from '../../Shared/Assests/Images/come-in.png';

var operator = {
    "+": function (a, b) { return a + b; },
    "*": function (a, b) { return a * b; }
}

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                first_name: '',
                last_name: '',
                telephone: '',
                mobileNumber: '',
                email: '',
                password: '',
                verifyPassword: '',
                comments: '',
                userSignature: '',
                role_id: 3,
                modalOpen: false,

            },
            passwordMatch: false,
            validConfirmPasswordMessage: '',
            blankSignatureValidationMessage: '',
            step: 1,
            isSignUpLoading: false,
            firstCaptchaNumber: '',
            secondCaptchaNumber: '',
            signupOptions: [{
                key: 'Parent',
                text: 'Parent',
                value: 3,
            },
            {
                key: 'Teacher',
                text: 'Teacher',
                value: 4,
            }],
            ArithemeticSymbol: [{
                type: 'addition',
                symbol: '+'
            }, {
                type: 'multiplication',
                symbol: '*'
            }

            ],
            result: '',
            captchaAnswer: '',
            apiStatusCode: '',
            getArithematicSymbol: '',
            isCaptchaAnswerMatch: '',
            modalOpen: false,
            modalHeader:'',
             modalDescription:'',
             modalType:''

        }
        this.signaturePad = React.createRef()
        this.firstStepFormValidator = new SimpleReactValidator()
    }


    componentWillMount() {
        // generating captcha code when page load
        this.generateNewCaptcha()
    }

    // handle input from signup page
    _handleInput = (event) => {
        let { userInfo } = this.state,
            { value, name } = event.target;

        if (name === "captchaAnswer") {
            this.setState({
                captchaAnswer: value
            })
        } else {
            userInfo[name] = value;
            this.setState({
                userInfo,
            })
        }
    }
    // handle all dropdown inputs for signup page
    _handleDropdown = (event, value) => {

        let { userInfo } = this.state;
        userInfo.role_id = value

        this.setState({
            userInfo
        })



    }

    // functin for recieve email check box
    toggleCheckBox = () => {
        let { userInfo } = this.state;
        userInfo.recieveText = !userInfo.recieveText
        this.setState({
            userInfo
        })
    }

    //clear signature from signature pad
    _clearSignature = () => {

        this.signaturePad.current.clear()
    }
    //user signat form detail is submitted and signup api is called
    _submitForm = (signupObj) => {
        signUp(signupObj).then(res => {
            this.setState({
                modalOpen: true,
                modalHeader:'',
                modalDescription:res.message,
                modalType:constants.SUCCESS_MODAL,
                isSignUpLoading: false
            })
        }).catch(err => {
            this.setState({
                isSignUpLoading: false,
                step: this.state.step,
                apiStatusCode: err ? err.status : 500,
            }, () => {
                if (this.state.apiStatusCode === 500) {
                    this.props.customProps._toastMessage('error', constants.SOMETHING_WENT_WRONG)
                }
                else {
                    this.props.customProps._toastMessage('error', err.data.message)
                }
            })

        })

    }
    //redirect to login
    redirectToLogin = () => {
        this.props.history.push('/login')
    }
    // show next step of sign up
    _showNextStep = (validationName, event) => {
        let { step, userInfo } = this.state;
        if (validationName.allValid()) {
            // matching password in password field and verify password 
            if (userInfo.verifyPassword === userInfo.password) {

                this.setState({
                    validConfirmPasswordMessage: '',
                    step: step + 1
                })

            } else {
                this.setState({
                    validConfirmPasswordMessage: `Confirm password didn't match, please confirm your password!`
                })
            }
        }
        else {
            validationName.showMessages();
            this.forceUpdate();
        }


    }

    //close  popup modal
    _handleClose = () => {
        this.setState({
            modalOpen: false
        }, () => {
            this.props.history.push("/")
        })
    }
    //display loader in sign up button and signupform API is called
    _showLoader = () => {
        let { result, captchaAnswer ,userInfo} = this.state;
        if (this.signaturePad.current.isEmpty()) {
            this.setState({
                blankSignatureValidationMessage: `Please fill the signature`
            })

        } else if (result === parseInt(captchaAnswer)) {
        userInfo.userSignature = this.signaturePad.current.toDataURL('image/png')
        const signupObj = {
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            email: userInfo.email,
            password: userInfo.password,
            phone: userInfo.telephone,
            cellphone: userInfo.mobileNumber,
            role_id: userInfo.role_id,
            signature: userInfo.userSignature,
            comment: userInfo.comments
        }
            this.setState({
                isSignUpLoading: true,
                isCaptchaAnswerMatch: true
            }, () => {
                this._submitForm(signupObj)
            })

        }
        else {
            this.setState({
                isSignUpLoading: false,
                isCaptchaAnswerMatch: false
            })
        }
    }
    generateRandomNumber = () => {
        return Math.floor(Math.random() * 10) + 1
    }
    // generating new capcha if user answer wrong captcha answer
    generateNewCaptcha = () => {
        let { firstCaptchaNumber,
            secondCaptchaNumber,
            ArithemeticSymbol,
            getArithematicSymbol } = this.state;

        firstCaptchaNumber = this.generateRandomNumber();
        secondCaptchaNumber = this.generateRandomNumber();

        getArithematicSymbol = _.sample(ArithemeticSymbol)
        let op = getArithematicSymbol.symbol;
        this.setState({
            result: operator[op](firstCaptchaNumber, secondCaptchaNumber),
            getArithematicSymbol: op,
            firstCaptchaNumber,
            secondCaptchaNumber,
            captchaAnswer: '',
            isCaptchaAnswerMatch: ''
        })
    }

    showForm = (step) => {
        this.setState({
            step: step
        })
    }

    //close popup modal
    _handleClose = () => {
        this.setState({
            modalOpen: false
        },()=>{
            this.props.history.push('/login')
        })
    }

    render() {
        let { passwordMatch,
            step,
            isSignUpLoading,
            validConfirmPasswordMessage,
            blankSignatureValidationMessage,
            firstCaptchaNumber,
            secondCaptchaNumber,
            getArithematicSymbol,
            captchaAnswer,
            result,
            isCaptchaAnswerMatch,
            signupOptions,
            modalOpen,
            modalType,modalHeader,modalDescription
        } = this.state;

        return (
            <div>
                {
                    modalOpen? <PopUpModal 
                    open={modalOpen}
                    modalHeader={modalHeader}
                    modalDescription={modalDescription}
                    close={this._handleClose}
                    type={modalType}
                    />:
                    <div className="login-page">
                    <div className="login-signup">
                        <Container fluid>
                            {
                                isSignUpLoading? <Loaders isLoading={isSignUpLoading} />: <Grid columns={2}>
                                <Grid.Column tablet={8} computer={5} mobile={16} >
                                    <div className="signup-login-section display-middle">
                                        <div>
                                            <Image src={SignUpLogo} className="register-logo" centered />
                                        </div>
                                        <Header as='h1' textAlign='center' className="register-heading">
                                            Welcome
                                        </Header>
                                        <div className="w-100">
                                            <p className="signup-welcome-text">
                                                Already have an account?<br /> Click the login button.
                                        </p>
                                        </div>
                                        <div className="w-100 register-btn-section">
                                            <button type="button" onClick={this.redirectToLogin} className="register-btn" >
                                                Login</button>
                                        </div>
                                    </div>
                                </Grid.Column >

                                <Grid.Column tablet={8} computer={11} mobile={16}>
                                    <div className="signup-form-outline">
                                        <div className="w-100 flex register-page-top">
                                            <div className="w-50  ">
                                                <h1 className="signup-page-heading" >Register</h1>
                                            </div>
                                            <div className="w-50 ">
                                                <div className="step-registration-box">
                                                    <Step.Group unstackable size="tiny">
                                                        <Step active={step === 1 ? true : false} onClick={() => this.showForm(1)} link disabled={step === 1 ? false : true}>
                                                            <Step.Content>
                                                                <Step.Title>Step 1</Step.Title>
                                                            </Step.Content>
                                                        </Step>
                                                        <Step active={step === 2 ? true : false} onClick={() => this.showForm(2)} link disabled={step === 2 ? false : true}>
                                                            <Step.Content>
                                                                <Step.Title>Step 2</Step.Title>
                                                            </Step.Content>
                                                        </Step>
                                                    </Step.Group>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={step === 2 ? "hide-form" : "w-100 "}>
                                            <p className="signup-page-title">Thank you for choosing to register at MYLCSH.com
                                            Please note that you account needs to be approve by a member of our administrative staff before it becomes
                                            functional We take the protection of your information very seriously. Please take a back at our privacy policy located
                                        in the footer of this web page Please contact us with any issues</p>
                                            <p className="blue-text signup-page-title"> Check Junk Mail and/or add <a href="mailto:admin@mylcsh.com" target="_top">admin@mylcsh.com</a> to
                                            your safe-sender/white-list</p>
                                        </div>
                                        <Container textAlign='center'>
                                            <FirstStep
                                                userInfo={this.state.userInfo}
                                                _handleInput={this._handleInput}
                                                _handleDropdown={this._handleDropdown}
                                                _showNextStep={this._showNextStep}
                                                passwordMatch={passwordMatch}
                                                step={step}
                                                signupOptions={signupOptions}
                                                firstStepFormValidator={this.firstStepFormValidator}
                                                validConfirmPasswordMessage={validConfirmPasswordMessage} />
                                            <SecondStep
                                                userInfo={this.state.userInfo}
                                                handleInput={this._handleInput}
                                                step={step}
                                                signaturePad={this.signaturePad}
                                                showLoader={this._showLoader}
                                                clearSignature={this._clearSignature}
                                                isSignUpLoading={isSignUpLoading}
                                                blankSignatureValidationMessage={blankSignatureValidationMessage}
                                                firstCaptchaNumber={firstCaptchaNumber}
                                                getArithematicSymbol={getArithematicSymbol}
                                                captchaAnswer={captchaAnswer}
                                                result={result}
                                                isCaptchaAnswerMatch={isCaptchaAnswerMatch}
                                                generateNewCaptcha={this.generateNewCaptcha}
                                                secondCaptchaNumber={secondCaptchaNumber} />
                                        </Container>
                                    </div>
                                </Grid.Column >
                            </Grid>
                            }
                            
                        </Container>
                    </div>
                </div>
                }
            </div>
        )
    }
}



const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => {
    return {
        saveLoginUserInfo: (data) => dispatch(saveLoginUserInfo(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);