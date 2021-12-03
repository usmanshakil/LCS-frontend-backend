import React, { Component } from 'react'
import { connect } from 'react-redux';
// api
import { viewStaffHiringForm } from '../../../../ApiAction/Teacher';
import { viewAdminStaffHiringForm } from '../../../../ApiAction/Admin';
// constants
import { constants } from '../../../'
// component
import { ViewAllStaffInformationForm } from './ViewAllStaffInformationForm';
// loader
import { Loaders } from '../../../'

class ViewStaffInformationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiStatusCode: '',
            isPageLoading: true,
            allformData: '',
            loginUserInfo: props.loginUserInfo,
            editType: '',
            formName: '',
            modalName: '',
            showFullSsn:false,
            showFullSsnNumber:false

        }
    }

    componentWillMount() {
        if (this.props.loginUserInfo.role_id === 2) {
            if (this.props.history.location.state === undefined) {
                this.props.history.push('/teachers')
                // this.props.customProps._toastMessage('error', 'Data got expired')
            } else {
                let { activeTeacherId } = this.props.history.location.state;
                this.getstaffHiringFormData(activeTeacherId);
            }
        } else if (this.props.loginUserInfo.role_id === 4) {
            this.getStaffHiringData();
        } else {
            this.props.history.push('/home');
        }
    }

    // getting staff hiring form data
    getStaffHiringData = () => {
        viewStaffHiringForm().then(res => {
            this.setState({
                isPageLoading: false,
                allformData: res.data.length ? res.data : []
            })
        }).catch(err => {
            this.setState({
                isPageLoading: false,
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

    // getting staff hiring information for admin
    getstaffHiringFormData = (id) => {
        viewAdminStaffHiringForm(id).then(res => {
            this.setState({
                isPageLoading: false,
                allformData: res.data.length ? res.data : []

            })
        }).catch(err => {
            this.setState({
                isPageLoading: false,
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

    _redirectToStaffHiringForm = (type, formName, modalName) => {
        this.setState({
            editType: type,
            formName: formName,
            modalName: modalName
        }, () => {
            this.props.history.push({
                pathname: '/staff-info',
                state: {
                    editType: this.state.editType,
                    formName: this.state.formName,
                    modalName: this.state.modalName,
                    allformData: this.state.allformData
                }
            })
        })

    }

    // shpwing full ssn number
    _toggleSSNNumber=(event,type)=>{
        let {showFullSsn,showFullSsnNumber}=this.state;
        if(type==="showFullSsn"){
            this.setState({
                showFullSsn:!showFullSsn
            })
        }else{
            this.setState({
                showFullSsnNumber:!showFullSsnNumber
            })
        }
    }


    render() {
        let { isPageLoading } = this.state;
        return (
            <div>{isPageLoading ? <Loaders isLoading={isPageLoading} /> : <ViewAllStaffInformationForm {...this.state} _redirectToStaffHiringForm={this._redirectToStaffHiringForm} _toggleSSNNumber={this._toggleSSNNumber}/>}</div>
        )
    }
}

const mapStateToProps = state => ({
    loginUserInfo: state.loginReducer.loginUserInfo,
});

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewStaffInformationForm)
