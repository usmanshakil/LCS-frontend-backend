import React, { Component } from 'react';
import { Container, Form, Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
// API
import { supportInquiry } from '../../../ApiAction/Support';
//Constants 
import { constants } from '../../';
// loader
import {Loaders} from '../'
// CSS 
import "./Support.css"

class Support extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                subject: '',
                message: '',
            },
            loginUserInfo: props.loginUserInfo,
            // teacherProfile: props.teacherProfile,
            isLoading: false,
            apiStatusCode: ''

        }
    }



    // handle input of all field in support form page
    handleInput = (event) => {
        let { value, name } = event.target, { userInfo } = this.state;
        userInfo[name] = value;

        this.setState({
            userInfo
        })
    }

    //calling support api
    submitForm = () => {
        let { userInfo } = this.state
        let data = {
            subject: userInfo.subject,
            message: userInfo.message
        }
        supportInquiry(data).then(res => {
            userInfo.subject = ''
            userInfo.message = ''
            this.setState({
                userInfo,
                isLoading: false
            }, () => {
                this.props.customProps._toastMessage('success', res.message)
                this.props.history.push('/')
            })
        }).catch(err => {
            this.setState({
                isLoading: false,
                apiStatusCode: err ? err.status : 500
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


    // on submitting form loader is displayed and support API is called
    showLoader = () => {
        this.setState({
            isLoading: true
        }, () => {
            this.submitForm()
        })
    }

    render() {
        let { subject, message } = this.state.userInfo,
            { loginUserInfo, isLoading } = this.state;

        return (
            <div>
                {
                    isLoading?<div className="ui container"> <Loaders isLoading={isLoading} /> </div> :  <Container className={` main-layout-height  mt-5rem `}>
                    <div className={`support-page-border theme-${loginUserInfo.role_id}-border`}> 
                    <h4 className="text-center">
                        SUPPORT
                 </h4>
                    <Form onSubmit={this.showLoader}>
    
                        <Form.Group widths='equal'>
                            <Form.Field inline >
                                <span className="capitalize user-details-text">
                                    name:
                            </span>
                                <span className="ml-1">{loginUserInfo.first_name}</span>
                            </Form.Field>
                            <Form.Field inline >
                                <span className="capitalize user-details-text">
                                    email:
                            </span>
                                <span className="ml-1">{loginUserInfo.email}</span>
                            </Form.Field>
                            <Form.Field inline >
                                <span className="capitalize user-details-text">
                                    phone:
                            </span>
                                <span className="ml-1">{loginUserInfo.phone}</span>
                            </Form.Field>
                        </Form.Group>
    
                        <Form.Group widths='equal' >
                            <Form.Input fluid label='Subject' value={subject} onChange={this.handleInput} name="subject" required />
                        </Form.Group>
    
                        <Form.Group widths="equal">
                            <Form.TextArea label='Message' value={message} onChange={this.handleInput} name="message" required />
                        </Form.Group>
    
    
                        <Container textAlign="right" >
                            <Button positive type="submit" >
                                {
                                    isLoading ? <Icon loading name='spinner' /> : 'Submit'
                                }
                            </Button>
                        </Container>
                    </Form>
                    </div>
                  
                </Container>
                }
            </div>
          
        )
    }

}

const mapStateToProps = (state) => ({
    loginUserInfo: state.loginReducer.loginUserInfo
})

const mapDispatchToProps = (dispatch) => {
    return {

    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Support)
