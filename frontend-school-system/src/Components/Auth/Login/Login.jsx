import React, { Component } from 'react';
import { Input, Grid, Form, Container, Checkbox, Icon, Header, Image } from 'semantic-ui-react';
// import FacebookLogin from 'react-facebook-login';
// import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import SimpleReactValidator from 'simple-react-validator';
//API
import { login, loginWithFacebook, loginWithGoogle } from '../../../ApiAction/Auth';
//Redux Actions
import { saveLoginUserInfo,rememberUser } from '../../../Redux/Actions/Login';
// CSS
import './Login.css';
// Image
import RegisterLogo from '../../Shared/Assests/Images/Login-icon.png';
// PopupModals
import {PopUpModal} from '../../'
// constants
import { constants } from '../../index';
//Loader
import {Loaders} from '../../';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginUserInfo: {
                email: props.rememberUserInfo.email,
                password: props.rememberUserInfo.password
            },
            rememberMe: props.rememberUserInfo.rememberMe,
            token: '',
            loginUserData: {},
            isLoginLoading: false,
            apiStatusCode: '',
            modalOpen: false,
             modalHeader:'',
              modalDescription:'',
              modalType:''
        }
        this.LoginFormValidator = new SimpleReactValidator()
    }



    // handle input from textbox in login
    handleInput = (event) => {
        let { value, name } = event.target,
            { loginUserInfo } = this.state;
        loginUserInfo[name] = value;
        this.setState({
            loginUserInfo
        })
    }

    // function of remember me checkbox
    toggleCheckBox = () => {
        let { rememberMe } = this.state;
        rememberMe = !rememberMe
        this.setState({
            rememberMe
        })
    }

    // onclicking on login button login API is hitted
    loginUser = () => {
        let { loginUserInfo } = this.state;
        const loginObj = {
            email: loginUserInfo.email,
            password: loginUserInfo.password,
        }

        if (this.LoginFormValidator.allValid()) {
            login(loginObj).then(res => {
                Cookies.set('loginUserToken', res.token, { expires: 1 })
                // Cookies.set('role_id', res.data.role_id, { expires: 1 })

                this.setState({
                    token: res.token,
                    loginUserData: res.data,
                    isLoginLoading: false
                    // modalOpen: true
                }, () => {
                   
                    if(this.state.rememberMe){
                        let userInfoObj={};
                        userInfoObj.email=loginObj.email
                        userInfoObj.password=loginObj.password
                        userInfoObj.rememberMe=this.state.rememberMe
                        this.props.rememberUser(userInfoObj)
                        this.props.saveLoginUserInfo(this.state.loginUserData)
                        this.props.history.push("/")
                        this.props.customProps._toastMessage('success', 'Login Successfully')
                    }else{
                        let userInfoObj={};
                        userInfoObj.email=''
                        userInfoObj.password=''
                        userInfoObj.rememberMe=this.state.rememberMe
                        this.props.rememberUser(userInfoObj)
                        this.props.saveLoginUserInfo(this.state.loginUserData)
                        this.props.history.push("/")
                        this.props.customProps._toastMessage('success', 'Login Successfully')
                    }
                })
            }).catch(err => {
                this.setState({ 
                    isLoginLoading: false ,
                    modalOpen:err? err.status === 401 ? false : true:false,
                    modalHeader:err? err.status === 400 && err.data.message === constants.ACCOUNT_APPROVAL ? 'Account Approval':'Error':'',
                    modalDescription:err?err.status === 401 ? err.statusText : err.data.message:'',
                    modalType:constants.ERROR_MODAL
                },()=>{
                    if(err){
                        // this.props.customProps._toastMessage('error', err.status === 401 ? err.statusText : err.data.message)
                    }
                    else{
                        this.props.customProps._toastMessage('error', constants.SOMETHING_WENT_WRONG)
                    }
                })
                
            })
        }
        else {
            this.setState({
                isLoginLoading: false
            }, () => {
                this.LoginFormValidator.showMessages();
                this.forceUpdate();
            })
        }
    }

    // show loader and call login api
    showLoginLoader = () => {
        this.setState({
             isLoginLoading: true 
            }, () => {
                this.loginUser()
            })
    }

    // redirect to forgot password page
    forgotPassword = () => {
        this.props.history.push('/forgot-password');
    }

    // redirect to sign up page on clicking on sign up button
    redirectToSignup = () => {
        this.props.history.push('/signup');
    }
    //response is recieved after login from facebook
    responseFacebook = (response) => {
        loginWithFacebook(response.accessToken).then(res => {
            this.setState({
                token: res.token,
                loginUserData: res.data
            }, () => {
                this.props.saveLoginUserInfo(this.state.loginUserData)
                this.props.history.push("/")
                this.props.customProps._toastMessage('success', 'Login Successfully')

            })
        }).catch(err => {
            this.setState({
                apiStatusCode: err ? err.status : 500,
            }, () => {
                if (this.state.apiStatusCode === 401) {
                    this.props.customProps._toastMessage('error', err.statusText)
                } else if (this.state.apiStatusCode === 500) {
                    this.props.customProps._toastMessage('error', constants.SOMETHING_WENT_WRONG)
                }
                else {
                    this.props.customProps._toastMessage('error', err.message)
                }
            })
        })
    }

    //response is recieved after login from google
    responseGoogle = (response) => {

        loginWithGoogle(response.accessToken).then(res => {
            this.setState({
                token: res.token,
                loginUserData: res.data
            }, () => {
                this.props.saveLoginUserInfo(this.state.loginUserData)
                this.props.history.push("/")
                this.props.customProps._toastMessage('success', 'Login Successfully')
            })
        }).catch(err => {

            this.setState({
                apiStatusCode: err ? err.status : 500,
            }, () => {
                if (this.state.apiStatusCode === 401) {
                    this.props.customProps._toastMessage('error', err.statusText)
                } else if (this.state.apiStatusCode === 500) {
                    this.props.customProps._toastMessage('error', constants.SOMETHING_WENT_WRONG)
                } else {
                    this.props.customProps._toastMessage('error', err.message)
                }
            })
        })
    }

    //close popup modal
    _handleClose = () => {
        this.setState({
            modalOpen: false
        })
    }

    responseGoogle = (response) => {

    }
// show privacy page
    showPrivacy = () => {
        this.props.history.push("/privacy-policy")
            }



    render() {
        let { email, password } = this.state.loginUserInfo,
            { rememberMe, isLoginLoading,modalOpen,
                modalHeader,
                 modalDescription,modalType } = this.state;

        return (
            <div className="login-page">
                {
                    modalOpen ? <PopUpModal
                    open={modalOpen}
                    modalHeader={modalHeader}
                    modalDescription={modalDescription}
                    close={this._handleClose}
                    type={modalType}
                    /> :''
                }

                <div className="login-signup-page">
                    <Container fluid>
                        {
                            isLoginLoading === true ?
                                <Loaders isLoading={isLoginLoading} />
                            :
                            <Grid.Row stretched>
                            <Grid columns={2}>
                                <Grid.Column tablet={2} computer={1} >
                                </Grid.Column >
                                <Grid.Column tablet={7} computer={6} mobile={16} >
                                    <div className="login-form-outline">
                                        <div className="w-100 ">
                                            <h1 className="page-heading" >Login</h1>
                                        </div>
                                        <div className="w-100 page-title-section">
                                            <p className="page-title">This is a <span className="color-red"> RESTRICTED</span> AREA, for mylcsh.com  user.
                              Your machine may not function the same after trying to enter restricted area </p>
                                        </div>
                                        <Form onSubmit={this.showLoginLoader} className="login-form" >
                                            <Form.Field  >
                                                <Input type="email" size='small' className="email-box"
                                                    value={email} name="email" onChange={this.handleInput} placeholder="Email" />
                                                {this.LoginFormValidator.message('email', email, 'required|email')}
                                            </Form.Field>
                                            <Form.Field >
                                                <Input type="password" size='small' className="password"
                                                    value={password} name="password" onChange={this.handleInput} placeholder="Password" />
                                                {this.LoginFormValidator.message('password', password, 'required')}

                                            </Form.Field>

                                            <Form.Field inline >
                                                <Checkbox label='Remember me' checked={rememberMe} name="rememberMe" onClick={this.toggleCheckBox} />
                                            </Form.Field>
                                            <div className="login-section">
                                                <div className="login-btn">
                                                    <button type="submit" className="btn-login" disabled={isLoginLoading}>
                                                    Login
                                                    </button>

                                                    {/* <button type="submit"  className="btn-login" >Login</button> */}
                                                </div>
                                                <div className="forgot-btn">
                                                    <a href="/forgot-password"  className="forgot-password">Forgot your password ?</a>
                                                </div >
                                            </div>
                                        </Form>

                                        {/* <Divider horizontal>Or</Divider>
                                        <Container className="btn-center justify-content-center">
                                            <div className="w-100 social-media-login">
                                                <div className="mr-40px">
                                                    <FacebookLogin
                                                        appId="2458439211103710"
                                                        autoLoad={false}
                                                        fields="name,email,picture"
                                                        scope="public_profile"
                                                        cssClass="btn-outline-primary "
                                                        callback={this.responseFacebook}
                                                        textButton="Facebook"
                                                    />

                                                </div>
                                                <div className="mr-40px">
                                                    <GoogleLogin
                                                        clientId="251742545959-c4c5dfibiejj4turmqniirhnrnmd24hn.apps.googleusercontent.com"
                                                        buttonText="Login"
                                                        onSuccess={this.responseGoogle}
                                                        className="google-login"
                                                        // responseType={}
                                                        // onFailure={responseGoogle}
                                                        cookiePolicy={'single_host_origin'}
                                                    />
                                                </div>
                                            </div>
                                        </Container> */}
                                        <div className="text-center mt-2rem">
                                        <p>
                                <Icon name="copyright outline" size="small" />
                                Little Children School <a href="/privacy-policy" target="_blank" rel="noreferrer" className="company-name cursor-pointer justify-content-center">private policy</a> </p>
                                        </div>
                                    </div>

                                </Grid.Column >
                                <Grid.Column tablet={7} computer={9} mobile={16} >
                                    <div className="login-register-tab">
                                        <div>
                                            <Image src={RegisterLogo} className="register-logo" centered />
                                        </div>
                                        <Header as='h1' textAlign='center' className="register-heading">
                                            Register
                                        </Header>
                                        <div className="w-100">
                                            <p className="register-description"> Sign up to your account<br />
                                                Just two more steps and you are done!
</p>
                                        </div>
                                        <div className="w-100 register-btn-section">
                                            <button type="button" onClick={this.redirectToSignup} className="register-btn" >
                                                Register</button>

                                        </div>
                                    </div>
                                </Grid.Column >
                            </Grid>
                        </Grid.Row>
                        }
                        
                    </Container>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    rememberUserInfo:state.loginReducer.rememberUserInfo
})

const mapDispatchToProps = (dispatch) => {
    return {
        saveLoginUserInfo: (data) => dispatch(saveLoginUserInfo(data)),
        rememberUser:(data)=>dispatch(rememberUser(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);