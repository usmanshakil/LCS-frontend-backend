import React, { Component } from 'react'
import { Container, Grid, Form, Button, TextArea } from 'semantic-ui-react';
import { connect } from "react-redux";

//loader
import { Loaders } from '../../Shared';
//API
import { viewAdminClassList, viewAllStudentsList, updateIncident, uploadImagesToS3, getSelectedIncident, getSelectedIncidentLocation, addLocation, updateLocation } from '../../../ApiAction/Admin';
//Constants 
import { constants } from '../..';
// add uuid
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment'


class AddLocation extends Component {
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
            location_id: '',
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
            addLocationModal: {
                location_id: "",
                location: '',
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
        let { addLocationModal } = this.state;
        if (boolValue.includes(name)) {
            checked ? (addLocationModal[name] = "active") : (addLocationModal[name] = "inActive")
        } else {
            addLocationModal[name] = value
        }
        this.setState({
            addLocationModal
        })
    }
    // showing loader when user submit form
    showLoader = () => {
        let { location_id } = this.state;

        this.setState({
            hasDataLoad: true
        }, () => {
            if (location_id) {
                this.updateLocations();
            } else {
                this.createLocations();
            }
        })
    }


    // calling update incident api
    updateLocations = () => {
        let { location_id } = this.state
        let {
            id,
            location,
            status,
            has_deleted,
        } = this.state.addLocationModal;

        let data = {
            id: location_id,
            location,
            status,
            has_deleted: true,
        };
        updateLocation(data)
            .then((res) => {
                this.setState(
                    {
                        isFormLoading: false,
                    },
                    () => {
                        this.props.customProps._toastMessage("success", "updated Successfully");
                        this.props.history.push("/locations");
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
    createLocations = () => {
        let {
            location,
            status,
            has_deleted
        } = this.state.addLocationModal;

        let data = {
            id: Math.random(),
            location,
            status,
            has_deleted
        };
        addLocation(data)
            .then((res) => {
                this.setState(
                    {
                        isFormLoading: false,
                    },
                    () => {
                        this.props.customProps._toastMessage("success", "Added Successfully");
                        this.props.history.push("/locations");
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
            if (pathname === "/add-location") {
                if (state !== undefined) { 
                    if (state || state.activeIncidentLocationId) {
                        // this.props.history.push('/locations')
                        this.setState({
                            location_id: state.activeIncidentLocationId
                        }, () => {

                            this.getTargetedIncidentLocation()
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
    getTargetedIncidentLocation = () => {
        let { location_id, addLocationModal } = this.state;
        getSelectedIncidentLocation(location_id).then(res => {
            if (res && res.data && Object.keys(res.data).length > 0) {
                const {
                    id,
                    location,
                    status,
                    has_deleted
                } = res.data;
                addLocationModal.location_id = id ? location_id : '';
                addLocationModal.location = location ? location : '';
                addLocationModal.status = status ? status : '';
                addLocationModal.has_deleted = has_deleted ? has_deleted : '';
                this.setState({ addLocationModal }
                    , () => {
                    })
            } else {
                this.props.customProps._toastMessage('error', constants.SOMETHING_WENT_WRONG)
                this.props.history.push('/locations')
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
        let { addIncidentModal, hasDataLoad, loginUserInfo, allClassesInfo, allStudentsList, statusOptions, locationOptions, incidientTypeOptions, medias, addLocationModal } = this.state
        let {
            location_id,
            location,
            status
        } = addLocationModal;

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
                                    <Button  onClick={()=> this.props.history.push("/locations")}  color="green">
                                            Back
                                        </Button>
                                    <Form onSubmit={this.showLoader} className="mt-2rem">
                                        <h2>Add Location </h2>
                                        <Form.Group widths="equal">
                                            <Form.Field>
                                                <label>Location</label>
                                                <input type="text" required value={location} name="location" onChange={this.handleInput} required />
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

export default connect(mapStateToProps, mapDispatchToProps)(AddLocation);

