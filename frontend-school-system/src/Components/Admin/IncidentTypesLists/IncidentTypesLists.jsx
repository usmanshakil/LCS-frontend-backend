import React, { Component } from 'react';
import { connect } from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';
import { Grid, Pagination, Dropdown, Table, Button, Segment } from 'semantic-ui-react';
//api
import { deleteIncidentTypes, viewIncidentTypeList } from '../../../ApiAction/Admin';
//Redux Actions
import { saveLoginUserInfo } from '../../../Redux/Actions/Login';
//Constants 
import { constants } from '../..';
//loader
import { Loaders } from '../../Shared';
//pop up modal
import { PopUpModal } from '../..';
//css
import './IncidentTypesLists.css';
import _ from 'lodash';

class IncidentTypesLists extends Component {
    constructor(props) {
        super(props);
        this.state = {

            incident_type_list: [
                {
                    id: "1",
                    incident_type: "fighting-2",
                    status: "active"
                }
            ],

            incidentsList: [],
            siblingRange: 1,
            page_number: 1,
            page_size: 20,
            total_records: 0,
            boundaryRange: 0,
            showFirstAndLastNav: true,
            showPreviousAndNextNav: true,
            showEllipsis: true,
            recordView: constants.SORT_RECORD,
            total_pages: '',
            isPageLoading: false,
            currentIncident: '',
            hasDataLoad: true,
            apiStatusCode: '',
            isModalLoading: false,
            activeIncidentTypeId: '',
            modalOpen: false,
            modalType: '',
            modalHeader: ' ',
            modalDescription: '',
            searchIncident: '',
            clearSearchIncident: false,
            status: 'All',
            userDropdown: constants.TEACHER_STATUS,
            column: '',
            direction: '',
            allClassesInfo: [{ key: '', text: 'All', value: '' }],
            class_id: '',
            allStudentsList: [{ key: '', text: 'All', value: '' }],
            user_id: '',
        }
        this.addTeacherFormValidator = new SimpleReactValidator()

    }
    componentWillMount() {
        if (this.props.loginUserInfo.role_id === 2) {
            this.getTypesList()
        } else {
            this.props.history.push('/home')
        }
    }
    componentDidMount() {
        if (this.props.loginUserInfo.role_id === 2) {

        } else {
            this.props.history.push('/home')
        }
    }
    // fetching list of incidenets
    getTypesList = () => {
        let { page_number, page_size, column, direction } = this.state;
        viewIncidentTypeList(page_number, page_size, column, direction).then(res => {
            this.setState({
                incident_type_list: res.data,
                isPageLoading: false,
                total_records: res.total_records,
                total_pages: Math.ceil(res.total_records / this.state.page_size),
                hasDataLoad: false
            })
        }).catch(err => {
            this.setState({
                isPageLoading: false,
                isLoading: false,
                hasDataLoad: false,
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

    //redirecting to view incident profile
    viewIncident = (id) => {
        this.setState({
            currentIncident: id
        }, () => {
            this.props.history.push({
                pathname: `/view-incident`,
                state: { currentIncident: this.state.currentIncident }
            })
        })
    }
    //redirecting to edit incident profile
    // editTypes = (id) => {
    //     // console.log("EDIT id",id)
    //     this.setState({
    //         activeIncidentTypeId: id
    //     }, () => {
    //         this.props.history.push({
    //             pathname: `/add-IncidentType`,
    //             state: { activeIncidentTypeId: this.state.activeIncidentTypeId }
    // }) 
    // })
    // }
    editTypes = (id) => {

        this.setState({
            activeIncidentTypeId: id
        }, () => {
            this.props.history.push({
                pathname: `/add-IncidentType`,
                state: { activeIncidentTypeId: this.state.activeIncidentTypeId }
            })
            console.log("edit id", this.state.activeIncidentTypeId)
        })
    }
    // remove incident from teachers list
    deleteIncidentTypesObject = (id) => {
        deleteIncidentTypes(id).then(res => {
            this.setState({
                modalType: constants.SUCCESS_MODAL,
                modalDescription: res.message,
                modalOpen: true,
                activeIncidentTypeId: ''
            })
        }).catch(err => {
            this.setState({
                modalType: constants.ERROR_MODAL,
                modalHeader: 'Error',
                modalDescription: err.statusText,
                modalOpen: true,
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

    // close popup modal
    close = () => {

        if (this.state.modalType === "Error Modal") {
            this.setState({
                modalOpen: false,
                modalType: '',
                modalHeader: '',
                modalDescription: '',
            }, () => {
                this.props._removeToken()
            })

        } else {
            this.setState({
                modalOpen: false,
                modalType: '',
                modalHeader: '',
                modalDescription: '',
            }, () => {
                this.getTypesList()
            })
        }
    }
    // showing confirm popup
    showDeleteConfirmation = (id) => {
        this.setState({
            modalOpen: true,
            modalType: constants.DELETE_CONFIRMATION_MODAL,
            modalHeader: 'Delete Incident Type',
            modalDescription: 'Are you sure to remove this Incident Type',
            activeIncidentTypeId: id
        })
    }

    // when user click on proceed to yes button then delete api is called
    proceedToYes = () => {
        this.setState({
            modalOpen: false,
            popupModalType: '',
            modalHeader: '',
            modalDescription: '',
            showPopUpModal: false
        }, () => {
            this.deleteIncidentTypesObject(this.state.activeIncidentTypeId)
        })
    }

    // open add incident page
    openAddIncidentsTypesPage = () => {
        this.props.history.push('/add-IncidentType')
    }

    render() {
        let {
            incident_type_list,
            incidentsList,
            hasDataLoad,
            modalOpen,
            modalType,
            modalHeader, isModalLoading, modalDescription,
            siblingRange,

            total_records,
        } = this.state;

        return (
            <div >
                <PopUpModal
                    open={modalOpen}
                    type={modalType}
                    modalHeader={modalHeader}
                    isModalLoading={isModalLoading}
                    close={this.close}
                    showLoader={this.showLoader}
                    modalDescription={modalDescription}
                    _handleInput={this._handleInput}
                    proceedToYes={this.proceedToYes}
                />
                {
                    hasDataLoad ?
                        <div className="ui container">
                            <Loaders isLoading={hasDataLoad} />
                        </div>
                        :
                        <div className={`${total_records >= 20 ? 'mb-5' : ''} ui container main-layout-height mt-2rem`}>
                            <Button className="mb-2rem" onClick={() => this.props.history.push("/incidents")} color="green"
                                style={{ margin: '25px 0px' }}>
                                Back
                            </Button>
                            <Grid columns='equal' >

                                <Grid.Column width={12}>
                                    <h2 className="ui header ">Incidents Type list</h2>
                                </Grid.Column>

                                <Grid.Column>

                                    <div className="add-child-form-mt-2rem">
                                        <Button
                                            color="blue"
                                            fluid
                                            inverted
                                            onClick={this.openAddIncidentsTypesPage}
                                            content="Add Incident Type"
                                            className="add-class-btn"
                                        />
                                    </div>
                                </Grid.Column>
                            </Grid>
                            <div className="row view-child mt-2rem">
                                <Table celled unstackable singleLine fixed compact sortable>
                                    <Table.Header>
                                        <Table.Row textAlign='center'>
                                            <Table.HeaderCell>Action</Table.HeaderCell>
                                            <Table.HeaderCell  >Incident Type</Table.HeaderCell>
                                            <Table.HeaderCell  >Status</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {
                                            incident_type_list.length ? incident_type_list.map((value, index) => {
                                                return (
                                                    <Table.Row textAlign="center" key={index} index={index} collapsing="true">
                                                        <Table.Cell>
                                                            <span >
                                                                <i
                                                                    aria-hidden="true"
                                                                    className="pencil green small link icon view-icon "
                                                                    onClick={() => this.editTypes(value.id)}
                                                                ></i>
                                                            </span>
                                                            <span >
                                                                <i
                                                                    aria-hidden="true"
                                                                    className="trash red alternate outline small link icon view-icon "
                                                                    onClick={(event) => this.showDeleteConfirmation(value.id, event)}

                                                                ></i>
                                                            </span>
                                                        </Table.Cell>
                                                        <Table.Cell title={value.incident_type}>
                                                            {value.incident_type}
                                                        </Table.Cell>
                                                        <Table.Cell title={value.status}>
                                                            {value.status}
                                                        </Table.Cell>
                                                    </Table.Row>
                                                )
                                            })
                                                : <tr className="top aligned center aligned"><td className="allclasses-empty-msg" colSpan="6">No Data Found</td></tr>
                                        }
                                    </Table.Body>
                                </Table>
                            </div>

                        </div>
                }
            </div >
        )
    }
}

const mapStateToProps = (state) => ({
    loginUserInfo: state.loginReducer.loginUserInfo,

})

const mapDispatchToProps = (dispatch) => {
    return {
        saveLoginUserInfo: (data) => dispatch(saveLoginUserInfo(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IncidentTypesLists)
