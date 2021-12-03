import React, { Component } from 'react'
import { Container, Grid, Form, Button, TextArea } from 'semantic-ui-react';
import { connect } from "react-redux";

//loader
import { Loaders } from '../../Shared';
//API
import { viewAdminClassList, viewAllStudentsList, addIncident, updateIncident, uploadImagesToS3, getSelectedIncident ,viewIncidentLocationList ,viewIncidentTypeList} from '../../../ApiAction/Admin';
//Constants 
import { constants } from '../../';
// add uuid
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment' 


class AddIncident extends Component {
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
            incident_id: null,
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
            medias: [],


            apiStatusCode:null,
            locationList: [
                {
                    id: "1",
                    location: "washroom",
                    status: "active"
                }
            ],
            incidentList: [
                {
                    id: "1",
                    incident_type: "fighting-2",
                    status: "active"
                }
            ],
        }
    }
    // handle all input values of add teacher form 
    handleInput = (event) => {
        let { name, value, checked, files } = event.target;
        const boolValue = ['parent_notified', 'teacher_signoff', 'director_signoff']
        let { addIncidentModal } = this.state;
        if (name === 'user_id' || name === 'class_id') {
            addIncidentModal[name] = parseInt(value)
        } else if (boolValue.includes(name)) {
            addIncidentModal[name] = checked;
        } else if (name === 'photos' && files && files.length) {
            const fileArray = [];
            for (let x of files) {
                fileArray.push(x)
            }
            addIncidentModal[name] = fileArray;
        } else {
            addIncidentModal[name] = value
        }
        this.setState({
            addIncidentModal
        })
    }
    // showing loader when user submit form
    showLoader = () => {
        let { incident_id } = this.state;
        let { photos } = this.state.addIncidentModal
        this.setState({
            hasDataLoad: true
        }, () => {
            if (photos && photos.length > 0) {
                this.uploadImages()
            } else if (incident_id) {
                this.updateIncident();
            } else {
                this.createIncident();
            }
        })
    }
    // UPLOAD IMAGE
    uploadImages = () => {
        let { medias, incident_id } = this.state;
        let { photos } = this.state.addIncidentModal;
        const uuids = photos.map(p => uuidv4());
        let formData = new FormData();
        formData.append('uuids', JSON.stringify(uuids))
        for (let i = 0; i < photos.length; i++) {
            formData.append("files", photos[i]);
        }
        return uploadImagesToS3(formData)
            .then((res) => {
                this.setState({
                    medias: [...medias, ...res.data]
                }, () => {
                    if (incident_id) {
                        this.updateIncident()
                    } else {
                        this.createIncident();
                    }
                })
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
    }

    // calling update incident api
    updateIncident = () => {
        let { medias, incident_id } = this.state
        let {
            location,
            class_id,
            user_id,
            date,
            incident_type,
            description,
            solution,
            status,
            parent_notified,
            teacher_signoff,
            director_signoff,
            name
        } = this.state.addIncidentModal;

        let data = {
            id: incident_id,
            name,
            class_id,
            user_id,
            date,
            incident_type,
            description,
            solution,
            status,
            parent_notified,
            teacher_signoff,
            director_signoff,
            location,
            medias
        };
        updateIncident(data)
            .then((res) => {
                this.setState(
                    {
                        isFormLoading: false,
                    },
                    () => {
                        this.props.customProps._toastMessage("success", res.message);
                        this.props.history.push("/incidents");
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
    createIncident = () => {
        let { medias } = this.state
        let {
            location,
            class_id,
            user_id,
            date,
            incident_type,
            description,
            solution,
            status,
            parent_notified,
            teacher_signoff,
            director_signoff,
            name
        } = this.state.addIncidentModal;

        let data = {
            name,
            class_id,
            user_id,
            date,
            incident_type,
            description,
            solution,
            status,
            parent_notified,
            teacher_signoff,
            director_signoff,
            location
        };
        if (medias && medias.length > 0) data.medias = medias
        addIncident(data)
            .then((res) => {
                this.setState(
                    {
                        isFormLoading: false,
                    },
                    () => {
                        this.props.customProps._toastMessage("success", res.message);
                        this.props.history.push("/incidents");
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
            // fetching classes list which is used to assign to incident
            this.getClassesList();
            this.getLocationList();
            this.getTypesList();
            if (pathname === "/edit-incident") {
                if (!state || !state.activeIncidentId) this.props.history.push('/incidents')
                this.setState({
                    incident_id: state.activeIncidentId
                }, () => {
                    this.getTargetedIncident()
                })
            }
        } else {
            // if the login user is not admin redirect to home
            this.props.history.push('/home')
        }
    }

    // get targeted incident to edit
    getTargetedIncident = () => {
        let { incident_id, addIncidentModal } = this.state;
        getSelectedIncident(incident_id).then(res => {
            if (res && res.data && Object.keys(res.data).length > 0) {
                const {
                    name, class_id, location, user_id, date,
                    incident_type, status, description, solution,
                    parent_notified, teacher_signoff, director_signoff,
                    medias
                } = res.data;
                const mediaArray = medias.map(med => ({
                    uuid: med.uuid,
                    type: med.type,
                    extension: med.extension
                }))
                addIncidentModal.name = name ? name : '';
                addIncidentModal.class_id = class_id ? class_id : '';
                addIncidentModal.location = location ? location : '';
                addIncidentModal.user_id = user_id ? user_id : '';
                addIncidentModal.date = date ? moment(date).format('YYYY-MM-DD') : '';
                addIncidentModal.incident_type = incident_type ? incident_type : '';
                addIncidentModal.status = status ? status : '';
                addIncidentModal.description = description ? description : '';
                addIncidentModal.solution = solution ? solution : '';
                addIncidentModal.parent_notified = parent_notified ? parent_notified : false;
                addIncidentModal.teacher_signoff = teacher_signoff ? teacher_signoff : false;
                addIncidentModal.director_signoff = director_signoff ? director_signoff : false;
                this.setState({ addIncidentModal, medias: mediaArray }, () => {
                    this.getAllStudentsList(class_id)
                })
            } else {
                this.props.customProps._toastMessage('error', constants.SOMETHING_WENT_WRONG)
                this.props.history.push('/incidents')
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

    // get classes data to assign to the incident
    getClassesList = () => {
        let { page_number, page_size } = this.state;
        viewAdminClassList(page_number, page_size).then(res => {
            this.setState({
                allClassesInfo: res.data.length ? res.data : [],
                total_records: res.total_records,
                total_pages: Math.ceil(res.total_records / this.state.page_size),
            });
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
    getLocationList = () => {
        let { page_number, page_size, column, direction } = this.state;
        viewIncidentLocationList(page_number, page_size, column, direction).then(res => {
            this.setState({
                locationList: res.data, 
            })
        
        }).catch(err => {
            this.setState({ 
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



      // fetching list of incidenets types lists
      getTypesList = () => {
        let { page_number, page_size, column, direction } = this.state;
        viewIncidentTypeList(page_number, page_size, column, direction).then(res => {
            this.setState({
                incidentList: res.data 
            })
        
        }).catch(err => {
            this.setState({ 
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
    setLocationFieldAndFetchStudents(event) {
        let { name, value } = event.target, { addIncidentModal, allClassesInfo } = this.state
        if (value) {
            const targtedClass = allClassesInfo.find(x => x.id === parseInt(value))
            addIncidentModal[name] = parseInt(value);
            addIncidentModal['location'] = targtedClass ? targtedClass.location : ''
            this.setState({ addIncidentModal, hasDataLoad: true }, () => {
                this.getAllStudentsList(value);
            })
        }

    }

    // getting all students data from API for select option
    getAllStudentsList = (classId) => {
        viewAllStudentsList(classId)
            .then((res) => {
                // check if component is used in addclass
                this.setState({
                    allStudentsList: res.data,
                    hasDataLoad: false,
                });
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

    // remove media from array
    deleteMedia = (index, e) => {
        e.preventDefault();
        const { medias } = this.state;
        medias.splice(index, 1)
        this.setState({ medias }, () => {
            this.props.customProps._toastMessage('success', 'Media Removed')
        })
    }


    render() {
        let { addIncidentModal, hasDataLoad, loginUserInfo, allClassesInfo, allStudentsList, statusOptions, locationList, incidentList, medias } = this.state
        let {
            location,
            class_id,
            user_id,
            date,
            incident_type,
            description,
            solution,
            status,
            photos,
            parent_notified,
            teacher_signoff,
            director_signoff,
            name
        } = addIncidentModal;
        return (
            <div>
                <Container className="main-layout-height mt-5rem">
 
                    {hasDataLoad === true ?
                        <Loaders isLoading={hasDataLoad} />
                        :
                        <Grid>
                            <Grid.Row>
                                <Grid.Column computer={16} mobile={16} tablet={16}>
                                        <Button  onClick={()=> this.props.history.push("/incidents")}  color="green">
                                            Back
                                        </Button>
                                    <Form  className="mt-2rem" onSubmit={this.showLoader}>

                                        <Form.Group widths="equal">
                                            <Form.Field>
                                                <label>Name</label>
                                                <input type="text" value={name} name="name" onChange={this.handleInput} required />
                                            </Form.Field>
                                        </Form.Group>
                                        <Form.Group widths="equal">
                                            <Form.Field required>
                                                <label>Class</label>
                                                <select
                                                    name="class_id"
                                                    value={class_id}
                                                    onChange={event =>
                                                        this.setLocationFieldAndFetchStudents(event)
                                                    }
                                                >
                                                    <option value="0">
                                                        Select Class{" "}
                                                    </option>
                                                    {allClassesInfo.length ?
                                                        (allClassesInfo.map((data, index) => {
                                                            return (
                                                                <option value={data.id} key={index}>
                                                                    {data.class_name}
                                                                </option>
                                                            );
                                                        })) :
                                                        (<option value="1">No Class Available</option>)}
                                                </select>
                                            </Form.Field>
                                            {/* <Form.Field>
                                                <label>Location</label>
                                                <input type="text" value={location} name="location" onChange={this.handleInput} readOnly />
                                            </Form.Field> */}

                                            <Form.Field>
                                                <label>Location </label>
                                                <select
                                                    name="location"
                                                    value={location}
                                                    onChange={this.handleInput}
                                                >
                                                    <option value=''>
                                                        Select Location
                                                    </option>
                                                    {( locationList.map((data, index) => {
                                                        return (
                                                            <option value={data.location} key={index}>
                                                                {data.location}
                                                            </option>
                                                        );
                                                    }))
                                                    }
                                                </select>
                                            </Form.Field>

                                            <Form.Field required>
                                                <label>student</label>
                                                <select
                                                    name="user_id"
                                                    value={user_id}
                                                    onChange={this.handleInput}
                                                    required
                                                    disabled={allStudentsList && allStudentsList.length ? false : true}
                                                >
                                                    <option value="0">
                                                        Select User{" "}
                                                    </option>
                                                    {allStudentsList.length ?
                                                        (allStudentsList.map((data, index) => {
                                                            return (
                                                                <option value={data.id} key={index}>
                                                                    {data.first_name} {data.last_name}
                                                                </option>
                                                            );
                                                        })) :
                                                        (<option value="1">No User Available</option>)}
                                                </select>
                                            </Form.Field>
                                        </Form.Group>
                                        <h2>Additional Information</h2>
                                        <Form.Group widths="equal">
                                            <Form.Field required>
                                                <label>Date of Incident:</label>
                                                <input type="date" value={date} name="date" onChange={this.handleInput} required />
                                            </Form.Field>
                                            {/* <Form.Field>
                                                <label>Incident Type</label>
                                                <input type="text" value={incident_type} name="incident_type" onChange={this.handleInput} />
                                            </Form.Field> */}

                                            <Form.Field>
                                                <label>Incident Type </label>
                                                <select
                                                    name="incident_type"
                                                    value={incident_type}
                                                    onChange={this.handleInput}
                                                >
                                                    <option value=''>
                                                        Select Incient Type
                                                    </option>
                                                    {(incidentList.map((data, index) => {
                                                        return (
                                                            <option value={data.incident_type} key={index}>
                                                                {data.incident_type}
                                                            </option>
                                                        );
                                                    }))
                                                    }
                                                </select>
                                            </Form.Field>

                                            <Form.Field>
                                                <label>Incident Status</label>
                                                <select
                                                    name="status"
                                                    value={status}
                                                    onChange={this.handleInput}
                                                >
                                                    <option value=''>
                                                        Select status
                                                    </option>
                                                    {(statusOptions.map((data, index) => {
                                                        return (
                                                            <option value={data.value} key={index}>
                                                                {data.text}
                                                            </option>
                                                        );
                                                    }))
                                                    }
                                                </select>
                                            </Form.Field>
                                        </Form.Group>
                                        <Form.Group widths="equal">
                                            <Form.Field>
                                                <label>Description</label>
                                                <TextArea rows={3} name='description' value={description} onChange={this.handleInput} />
                                            </Form.Field>
                                            <Form.Field>
                                                <label>Solution</label>
                                                <TextArea rows={3} name='solution' value={solution} onChange={this.handleInput} />
                                            </Form.Field>
                                        </Form.Group>
                                        <Form.Group widths="equal">
                                            <Form.Field>
                                                <label>Parent Notified</label>
                                                <input type="checkbox" checked={parent_notified} name="parent_notified" onChange={this.handleInput} />
                                            </Form.Field>
                                            <Form.Field>
                                                <label>Teacher Signoff</label>
                                                <input type="checkbox" checked={teacher_signoff} name="teacher_signoff" onChange={this.handleInput} />
                                            </Form.Field>
                                            <Form.Field>
                                                <label>Director Signoff</label>
                                                <input type="checkbox" checked={director_signoff} name="director_signoff" onChange={this.handleInput} />
                                            </Form.Field>
                                        </Form.Group>
                                        {medias.length > 0 ?
                                            <Grid>
                                                <h4>Already added Photos</h4>
                                                <Grid.Row>
                                                    {medias.map((media, index) => {
                                                        return (
                                                            <Grid.Column computer={4} mobile={16} tablet={8} key={index}>
                                                                <Button size='tiny' icon color="red" onClick={(e) => this.deleteMedia(index, e)}>X</Button>
                                                                <img height='220' width="100%" src={`${constants.AWS_IMAGE_BASE_URL}/${media.uuid}${media.extension}`}></img>
                                                            </Grid.Column>
                                                        )
                                                    })}
                                                </Grid.Row>
                                            </Grid> : ''}
                                        <Form.Group>
                                            <Form.Field>
                                                <label>Photos</label>
                                                <input type="file" accept="image/*" name="photos" onChange={this.handleInput} multiple />
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

export default connect(mapStateToProps, mapDispatchToProps)(AddIncident);

