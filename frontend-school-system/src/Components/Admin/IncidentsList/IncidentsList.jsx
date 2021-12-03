import React, { Component } from 'react';
import { connect } from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';
import { Grid, Pagination, Dropdown, Table, Button } from 'semantic-ui-react';
//api
import { viewAllStudentsList, deleteIncident, adminIncidentSearch, viewAdminIncidentsList, viewIncidentsClassList } from '../../../ApiAction/Admin';
//Redux Actions
import { saveLoginUserInfo } from '../../../Redux/Actions/Login';
//Constants 
import { constants } from '../../';
//loader
import { Loaders } from '../../Shared';
//pop up modal
import { PopUpModal } from '../../';
//css
import './IncidenetsList.css';
import _ from 'lodash';

class IncidenetsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            activeIncidentId: '',
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
            this.getIncidentsList()
        } else {
            this.props.history.push('/home')
        }
    }

    componentDidMount() {
        if (this.props.loginUserInfo.role_id === 2) {
            this.getClassesList();
        } else {
            this.props.history.push('/home')
        }
    }

    // getting all students data from API for select option
    getAllStudentsList = (classId) => {
        this.setState({ user_id: '', allStudentsList: [{ key: '', text: 'All', value: '' }] }, () => {
            if (classId) {
                viewAllStudentsList(classId)
                    .then((res) => {
                        // check if component is used in addclass
                        if (res.data.length) this.setState({
                            allStudentsList: [...this.state.allStudentsList, ...res.data.map(d => ({ key: d.id, text: `${d.first_name} ${d.last_name}`, value: d.id }))],
                            hasDataLoad: false,
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
        })

    };

    // fetching classes
    getClassesList = () => {
        let { allClassesInfo } = this.state;
        viewIncidentsClassList().then(res => {
            if (res.data.length) this.setState({ allClassesInfo: [...allClassesInfo, ...res.data.map(d => ({ key: d.id, text: d.class_name, value: d.id }))] })
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

    // fetching list of incidenets
    getIncidentsList = () => {
        let { page_number, page_size, column, direction } = this.state;
        viewAdminIncidentsList(page_number, page_size, column, direction).then(res => {
            this.setState({
                incidentsList: res.data,
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
    editIncident = (id) => {

        this.setState({
            activeIncidentId: id
        }, () => {
            this.props.history.push({
                pathname: `/edit-incident`,
                state: { activeIncidentId: this.state.activeIncidentId }
            })
        })
    }
    // remove incident from teachers list
    deleteIncidentObject = (id) => {
        deleteIncident(id).then(res => {
            this.setState({
                modalType: constants.SUCCESS_MODAL,
                modalDescription: res.message,
                modalOpen: true,
                activeIncidentId: ''
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
                this.getIncidentsList()
            })
        }




    }
    // showing confirm popup
    showDeleteConfirmation = (id) => {
        this.setState({
            modalOpen: true,
            modalType: constants.DELETE_CONFIRMATION_MODAL,
            modalHeader: 'Delete Incident ',
            modalDescription: 'Are you sure to remove this incident',
            activeIncidentId: id
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
            this.deleteIncidentObject(this.state.activeIncidentId)
        })
    }

    // onchange of page show activve page number in pagination
    handlePaginationChange = (e, { activePage }) => {
        this.setState({
            page_number: activePage,
            hasDataLoad: true
        }, () => {
            this.state.showSearchResult ? this.showSearchResult() : this.getIncidentsList()
        })
    }
    // handle dropdown inputs 
    handleRecordDropdown = (event, value) => {
        this.setState({
            page_size: value,
            page_number: 1,
            hasDataLoad: true
        }, () => {
            this.state.showSearchResult ? this.showSearchResult() : this.getIncidentsList()
        })
    }

    searchIncidentInfo = () => {
        let { searchIncident } = this.state;
        // let page_number = 0;
        if (searchIncident) {
            this.setState({
                hasDataLoad: true,
            }, () => {
                this.showSearchResult()
            })
        } else {
            this.props.customProps._toastMessage('error', 'please enter input')
        }

    }
    // calling search teacher API
    showSearchResult = () => {
        let { searchIncident, page_size, page_number, column, direction, class_id, user_id } = this.state;

        adminIncidentSearch(searchIncident, page_number, page_size, column, direction, class_id, user_id).then(res => {
            this.setState({
                incidentsList: res.data,
                hasDataLoad: false,
                total_records: res.total_records,
                total_pages: Math.ceil(res.total_records / this.state.page_size),
                clearSearchIncident: searchIncident ? true : false
            })
        }).catch(err => {
            this.setState({
                isPageLoading: false,
                isLoading: false,
                hasDataLoad: false,
                apiStatusCode: err ? err.status : 500,
                isModalLoading: false

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

    handleSearchInput = (event) => {
        let { value } = event.target;
        this.setState({
            searchIncident: value
        })
    }

    clearSearch = () => {
        let { clearSearchIncident } = this.state;
        this.setState({
            clearSearchIncident: !clearSearchIncident,
            searchIncident: '',
            class_id: '',
            user_id: '',
            allStudentsList: [{ key: '', text: 'All', value: '' }],
            hasDataLoad: true
        }, () => {
            this.getIncidentsList()
        })
    }

    // sorting columns in ascending or descending order
    handleSort = (clickedColumn) => () => {
        const { column, direction, searchIncident } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                // incidentsList: this.state.incidentsList.sort((a, b) =>
                // {
                //     if(a[clickedColumn] && b[clickedColumn]){
                //       var textA = a[clickedColumn].toUpperCase();
                //         var textB = b[clickedColumn].toUpperCase();
                //         return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                //     }
                // }),
                // incidentsList: _.sortBy(this.state.incidentsList, [clickedColumn]),
                direction: 'ascending',
            }, () => {
                searchIncident ? this.showSearchResult() : this.getIncidentsList()
            })
        } else {
            this.setState({
                incidentsList: this.state.incidentsList.reverse(),
                direction: direction === 'ascending' ? 'descending' : 'ascending',
            }, () => {
                searchIncident ? this.showSearchResult() : this.getIncidentsList()
            })
        }


    }

    // open add incident page
    openAddIncidentPage = () => {
        this.props.history.push('/add-incident')
    }
    // open add location page
    openAddLocationPage = () => {
        this.props.history.push('/locations')
    }

    // open add incident types page
    openAddIncidentTypesPage = () => {
        this.props.history.push('/incident-type')
    }

    handleDropdown = (value, event) => {
        this.setState({
            class_id: value,
            hasDataLoad: true,
            page_number: 1
        }, () => {
            this.state.searchIncident || value ? this.showSearchResult() : this.getIncidentsList()
            this.getAllStudentsList(value)
        })

    }

    handleDropdown2 = (value, event) => {
        this.setState({
            user_id: value,
            hasDataLoad: true,
            page_number: 1
        }, () => {
            this.state.searchIncident || value ? this.showSearchResult() : this.getIncidentsList()
        })

    }


    render() {
        let { incidentsList, hasDataLoad,
            modalOpen,
            modalType,
            modalHeader, isModalLoading, modalDescription,
            siblingRange,
            showFirstAndLastNav, showPreviousAndNextNav, showEllipsis,
            boundaryRange,
            total_pages,
            page_number,
            page_size,
            recordView,
            total_records,
            searchIncident,
            clearSearchIncident,
            column,
            direction,
            allClassesInfo,
            class_id,
            allStudentsList,
            user_id
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
                            <Grid>
                                <Grid.Row>

                                    
                                    <Grid.Column tablet={3}  computer={3} mobile={16} >
                                        <div className="w-100 text-center admin-mobile-page-heading m-v">
                                            <h2 className="ui header">Inidents list</h2>
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column mobile={16} tablet={3} computer={3} >
                                        <div className="ui fluid action input">
                                            <Dropdown
                                                placeholder='Select Class'
                                                fluid
                                                search
                                                selection
                                                options={allClassesInfo}
                                                value={class_id}
                                                onChange={(event, { value }) => this.handleDropdown(value, event)}
                                            />
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column mobile={16} tablet={3} computer={3} >
                                        <div className="ui fluid action input">
                                            <Dropdown
                                                placeholder="Select Student"
                                                fluid
                                                search
                                                selection
                                                options={allStudentsList}
                                                value={user_id}
                                                onChange={(event, { value }) => this.handleDropdown2(value, event)}
                                            />
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column mobile={16} tablet={4} computer={4} >
                                        <div className="ui fluid action input">
                                            <input
                                                type="text"
                                                placeholder="Search"
                                                value={searchIncident}
                                                onChange={this.handleSearchInput}
                                            />
                                            {clearSearchIncident === false ? (
                                                <button
                                                    className="ui green icon button"
                                                    onClick={this.searchIncidentInfo}
                                                >
                                                    <i aria-hidden="true" className="search  icon"></i>
                                                </button>
                                            ) : (
                                                    <button
                                                        className="ui green icon button"
                                                        onClick={this.clearSearch}
                                                    >
                                                        <i aria-hidden="true" className="close icon"></i>
                                                    </button>
                                                )}
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column mobile={16} tablet={5} computer={3}>
                                        <div className="add-child-form-mt-2rem">
                                            <Button
                                                color="blue"
                                                fluid
                                                inverted
                                                onClick={this.openAddIncidentPage}
                                                content="Add Incident"
                                                className="add-class-btn"
                                            />
                                        </div>
                                        <div style={{marginTop:"2px"}} className="add-child-form-mt-2rem  ">
                                            <Button
                                                color="blue"
                                                fluid
                                                inverted
                                                onClick={this.openAddLocationPage}
                                                content="Add Location "
                                                className="add-class-btn"
                                            />
                                        </div>
                                         <div style={{marginTop:"2px"}}  className="add-child-form-mt-2rem  ">
                                            <Button
                                                color="blue"
                                                fluid
                                                inverted
                                                onClick={this.openAddIncidentTypesPage}
                                                content="Add Incident Types "
                                                className="add-class-btn"
                                            />
                                        </div>
                                        
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <div className="row view-child mt-2rem">
                                <Table celled unstackable singleLine fixed compact sortable>
                                    <Table.Header>
                                        <Table.Row textAlign='center'>
                                            <Table.HeaderCell>Action</Table.HeaderCell>
                                            <Table.HeaderCell sorted={column === 'date' ? direction : null} onClick={this.handleSort('date')}>Date</Table.HeaderCell>
                                            <Table.HeaderCell sorted={column === 'name' ? direction : null} onClick={this.handleSort('name')}>Name</Table.HeaderCell>
                                            <Table.HeaderCell>Class</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {
                                            incidentsList.length ? incidentsList.map((value, index) => {
                                                return (
                                                    <Table.Row textAlign="center" key={index} collapsing="true">
                                                        <Table.Cell>
                                                            {/* <span >
                                                                <i
                                                                    aria-hidden="true"
                                                                    className="eye blue small link icon view-icon "
                                                                    onClick={() => this.viewTeacherProfile(value.id)}
                                                                ></i>
                                                            </span> */}
                                                            <span >
                                                                <i
                                                                    aria-hidden="true"
                                                                    className="pencil green small link icon view-icon "
                                                                    onClick={() => this.editIncident(value.id)}
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
                                                        <Table.Cell title={value.date}>
                                                            {value.date}
                                                        </Table.Cell>
                                                        <Table.Cell title={value.name}>
                                                            {value.name}
                                                        </Table.Cell>
                                                        <Table.Cell title={value.class.class_name}>
                                                            {value.class.class_name}
                                                        </Table.Cell>
                                                    </Table.Row>
                                                )
                                            })
                                                : <tr className="top aligned center aligned"><td className="allclasses-empty-msg" colSpan="6">No Data Found</td></tr>
                                        }
                                    </Table.Body>
                                </Table>
                            </div>
                            {
                                total_records >= 20 ?
                                    <div className="mt-2rem">
                                        <Grid>
                                            <Grid.Row>
                                                <Grid.Column computer={6} mobile={16} tablet={6}>
                                                    <label className="mr-5">Show Record:</label>
                                                    <Dropdown
                                                        // defaultValue={recordView[0].value}
                                                        compact
                                                        selection
                                                        options={recordView}
                                                        value={page_size}
                                                        onChange={(event, { value }) => this.handleRecordDropdown(event, value)}
                                                    >
                                                    </Dropdown>
                                                    <label className="ml-5">
                                                        Record per page
                                                    </label>
                                                </Grid.Column>
                                                <Grid.Column computer={4} mobile={16} tablet={4} />
                                                <Grid.Column computer={6} mobile={16} tablet={6}>
                                                    <Pagination
                                                        // defaultActivePage={page_number}
                                                        activePage={page_number}
                                                        siblingRange={siblingRange}
                                                        firstItem={showFirstAndLastNav ? undefined : null}
                                                        lastItem={showFirstAndLastNav ? undefined : null}
                                                        pointing
                                                        secondary
                                                        totalPages={total_pages}
                                                        boundaryRange={boundaryRange}
                                                        ellipsisItem={showEllipsis ? undefined : null}
                                                        prevItem={showPreviousAndNextNav ? undefined : null}
                                                        nextItem={showPreviousAndNextNav ? undefined : null}
                                                        onPageChange={this.handlePaginationChange}
                                                    />
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </div>
                                    : ''}
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

export default connect(mapStateToProps, mapDispatchToProps)(IncidenetsList)
