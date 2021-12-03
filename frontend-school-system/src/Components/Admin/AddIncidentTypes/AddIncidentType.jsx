import React, { Component } from 'react'
import { Container, Grid, Form, Button, TextArea } from 'semantic-ui-react';
import { connect } from "react-redux";
//loader
import { Loaders } from '../../Shared';
//API
import { viewAdminClassList, getSelectedIncidentType, addTypes, updateTypes } from '../../../ApiAction/Admin';
//Constants 
import { constants } from '../..';
// add uuid
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment'


class AddIncidentType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalType: '',
            modalHeader: '',
            modalDescription: '',
            modalOpen: false,
            allClassesInfo: [],
            allStudentsList: [],
            page_number: 1,
            page_size: 20,
            total_records: 0,
            fillRoomLocationField: '',
            loginUserInfo: props.loginUserInfo,
            incident_type_id: '',
            addIncidentModal: {
                name: '',
                location: '',
                class_id: '',
                user_id: '',
                date: '',
                incident_type: '',
                description: '',
                solution: '',
                photos: [],
                parent_notified: false,
                teacher_signoff: false,
                director_signoff: false,
                status: ''
            },
            addTypesModal: {
                incident_type_id: "",
                incident_type: '',
                status: 'inActive',
                has_deleted: false
            },
            statusOptions: [
                { text: 'Awaiting Teacher', value: 'awaiting_teacher' },
                { text: 'Awaiting Parent', value: 'awaiting_parent' },
                { text: 'Awaiting Director', value: 'awaiting_director' },
                { text: 'In Progress', value: 'in_progress' },
                { text: 'Resolved', value: 'resolved' }
            ],
            locationOptions: [
                { text: 'Class Room', value: 'class_Room' },
                { text: 'Play Ground', value: 'play_ground' },
                { text: 'Washroom', value: 'washroom' },
                { text: 'Lawn', value: 'lawn' },
                { text: 'Corridoor', value: 'corridoor' }
            ],
            incidientTypeOptions: [
                { text: 'Fight', value: 'fight' },
                { text: 'Fall on ground', value: 'fall_on_ground' },
                { text: 'Accidient', value: 'accidient' }
            ],
            hasDataLoad: false,
            medias: []
        }
    }
    // handle all input values of add teacher form 
    handleInput = (event) => {
        let { name, value, checked } = event.target;
        const boolValue = ['status']
        let { addTypesModal } = this.state;
        if (boolValue.includes(name)) {
            checked ? (addTypesModal[name] = "active") : (addTypesModal[name] = "inActive")
        } else {
            addTypesModal[name] = value
        }
        this.setState({
            addTypesModal
        })
    }
    // showing loader when user submit form
    showLoader = () => {
        let { incident_type_id } = this.state;
        this.setState({
            hasDataLoad: true
        }, () => {
            if (incident_type_id) {
                this.updateType();
            } else {
                this.createType();
            }
        })
    }


    // calling update incident api
    updateType = () => {
        let { incident_type_id } = this.state
        let {
            id,
            incident_type,
            status,
            has_deleted,
        } = this.state.addTypesModal;

        let data = {
            id: incident_type_id,
            incident_type,
            status,
            has_deleted: true,
        };
        updateTypes(data)
            .then((res) => {

                this.setState(
                    {
                        isFormLoading: false,
                    },
                    () => {
                        this.props.customProps._toastMessage("success", "updated Successfully");
                        this.props.history.push("/incident-type");
                    }
                );
            })
            .catch((err) => {
                this.setState(
                    {
                        apiStatusCode: err ? err.status : 500,
                        hasDataLoad: false,
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

    // calling add incident api
    createType = () => {
        let {
            incident_type,
            status,
            has_deleted
        } = this.state.addTypesModal;

        let data = {
            id: Math.random(),
            incident_type,
            status,
            has_deleted
        };
        addTypes(data)
            .then((res) => {
                this.setState(
                    {
                        isFormLoading: false,
                    },
                    () => {
                        this.props.customProps._toastMessage("success", "Added Successfully");
                        this.props.history.push("/incident-type");
                    }
                );
            })
            .catch((err) => {
                this.setState(
                    {
                        apiStatusCode: err ? err.status : 500,
                        hasDataLoad: false,
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

    toggleLoader = () => {
        let { hasDataLoad } = this.state;
        this.setState({ hasDataLoad: !hasDataLoad })
    }

    componentDidMount() {
        let { pathname, state } = this.props.history.location;
        if (this.props.loginUserInfo.role_id === 2) {
            if (pathname === "/add-IncidentType") {
                if (state !== undefined) {
                    if (state || state.activeIncidentTypeId) {
                        // this.props.history.push('/locations')
                        this.setState({
                            incident_type_id: state.activeIncidentTypeId
                        }, () => {

                            this.getTargetedIncidentTypes()
                        })
                    }
                }
            }
        } else {
            // if the login user is not admin redirect to home
            this.props.history.push('/home')
        }
    }

    // get targeted incident to edit
    getTargetedIncidentTypes = () => {
        let { incident_type_id, addTypesModal } = this.state;
        console.log("location id", incident_type_id)
        getSelectedIncidentType(incident_type_id).then(res => {
            if (res && res.data && Object.keys(res.data).length > 0) {
                const {
                    id,
                    incident_type,
                    status,
                    has_deleted
                } = res.data;
                addTypesModal.incident_type_id = id ? incident_type_id : '';
                addTypesModal.incident_type = incident_type ? incident_type : '';
                addTypesModal.status = status ? status : '';
                addTypesModal.has_deleted = has_deleted ? has_deleted : '';
                this.setState({ addTypesModal }
                    , () => {
                    })
            } else {
                this.props.customProps._toastMessage('error', constants.SOMETHING_WENT_WRONG)
                this.props.history.push('/incident-type')
            }
        }).catch(err => {
            this.setState({
                apiStatusCode: err ? err.status : 500,
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



    render() {
        let { addIncidentModal, hasDataLoad, loginUserInfo, allClassesInfo, allStudentsList, statusOptions, locationOptions, incidientTypeOptions, medias, addTypesModal } = this.state
        let {
            incident_type_id,
            incident_type,
            status
        } = addTypesModal;

        return (
            <div>
                <Container className="main-layout-height mt-5rem">

                    {/* <ChildRecordCheckList /> */}
                    {hasDataLoad === true ?
                        <Loaders isLoading={hasDataLoad} />
                        :
                        <Grid>
                            <Grid.Row>
                                <Grid.Column computer={16} mobile={16} tablet={16}>
                                    <Button onClick={() => this.props.history.push("/incident-type")} color="green">
                                        Back
                                    </Button>
                                    <Form onSubmit={this.showLoader} className="mt-2rem">
                                        <h2>Add Incident Type </h2>
                                        <Form.Group widths="equal">
                                            <Form.Field>
                                                <label>Incident Type</label>
                                                <input type="text" required value={incident_type} name="incident_type" onChange={this.handleInput} required />
                                            </Form.Field>
                                        </Form.Group>

                                        <Form.Group widths="equal">
                                            <Form.Field>
                                                <label> Status</label>
                                                <input type="checkbox" checked={status === "active" ? true : false} name="status" onChange={this.handleInput} />

                                            </Form.Field>

                                        </Form.Group>

                                        <Button type="submit" color="green">
                                            Submit
                                        </Button>
                                    </Form>
                                </Grid.Column>
                                <Grid.Column computer={4} />
                            </Grid.Row>
                        </Grid>
                    }

                </Container>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    loginUserInfo: state.loginReducer.loginUserInfo,
});

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddIncidentType);

