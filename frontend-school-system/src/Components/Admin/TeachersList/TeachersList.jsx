import React, { Component } from 'react';
import { connect } from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';
import { Icon, Grid, Popup, Header, Pagination, Dropdown, Table } from 'semantic-ui-react';
//api
import { viewAdminTeachersList, addTeacher, deleteTeacher, adminTeacherSearch, toggleApproveUser } from '../../../ApiAction/Admin';
//Redux Actions
import { saveLoginUserInfo } from '../../../Redux/Actions/Login';
//Constants 
import { constants } from '../../';
//loader
import { Loaders } from '../../Shared';
//pop up modal
import { PopUpModal } from '../../';
//css
import './TeachersList.css';
import {apiBaseUrl} from '../../../ApiAction/DbConfig/ApiBaseUrl';

class TeachersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teachersList: [],
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
            currentTeacherInfo: '',
            hasDataLoad: true,
            addTeacherModal: {
                first_name: '',
                last_name: '',
                email: '',
            },
            apiStatusCode: '',
            isModalLoading: false,
            activeTeacherId: '',
            modalOpen: false,
            modalType: '',
            modalHeader: ' ',
            modalDescription: '',
            searchTeacher: '',
            clearSearchTeacher: false,
            status: 'All',
            userDropdown: constants.TEACHER_STATUS,
            column: '',
            direction: '',

        }
        this.addTeacherFormValidator = new SimpleReactValidator()

    }

    componentWillMount() {
        if (this.props.loginUserInfo.role_id === 2) {
            this.getTeachersList()
        } else {
            this.props.history.push('/home')
        }
    }

    // fetching list of teachers
    getTeachersList = () => {
        let { page_number, page_size, status,column,direction } = this.state;
        viewAdminTeachersList(status, page_number, page_size,column,direction).then(res => {
            this.setState({
                teachersList: res.data.length?res.data:[],
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

    //redirecting to view teacher profile
    viewTeacherProfile = (id) => {
        this.setState({
            currentTeacherInfo: id
        }, () => {
            this.props.history.push({
                pathname: `/view-profile`,
                state: { currentTeacherInfo: this.state.currentTeacherInfo }
            })
        })
    }
    //redirecting to edit teacher profile

    editTeacherProfile = (id) => {

        this.setState({
            activeTeacherId: id
        }, () => {
            this.props.history.push({
                pathname: `/edit-profile`,
                state: { activeTeacherId: this.state.activeTeacherId }
            })
        })
    }

    // redirect to staff Hiring Form
    showStaffHiringForm = (id) => {
        this.setState({
            activeTeacherId: id
        }, () => {
            this.props.history.push({
                pathname: `/view-staff-info`,
                state: { activeTeacherId: this.state.activeTeacherId }
            })
        })
    }
    // remove teacher from teachers list
    deleteTeacherProfile = (id) => {
        deleteTeacher(id).then(res => {
            this.setState({
                modalType: constants.SUCCESS_MODAL,
                modalDescription: res.message,
                modalOpen: true,
                activeTeacherId: ''
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
    // opening add teacher popup modal
    openAddTeacher = () => {
        this.setState({
            modalType: 'Add Teacher',
            modalHeader: 'Add Teacher',
            modalOpen: true,
        })
        // this.props.history.push('/add-teacher');
    }
    // handle all input values of add teacher form 
    _handleInput = (event) => {
        let { name, value } = event.target,
            { addTeacherModal } = this.state;

        addTeacherModal[name] = value

        this.setState({
            addTeacherModal
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
                addTeacherModal: {
                    first_name: '',
                    last_name: '',
                    room: '',
                    email: '',
                    class_name: '',
                }
            }, () => {
                this.getTeachersList()
            })
        }




    }

    // calling add teacher api
    submitModalDetail = () => {
        let { addTeacherModal } = this.state,
            data = {
                first_name: addTeacherModal.first_name,
                last_name: addTeacherModal.last_name,
                email: addTeacherModal.email,
            };

        addTeacher(data).then(res => {
            this.setState({
                modalOpen: false,
                modalType: '',
                modalHeader: '',
                modalDescription: '',
                addTeacherModal: {
                    first_name: '',
                    last_name: '',
                    room: '',
                    email: '',
                    class_name: '',
                },
                isModalLoading: false

            }, () => {
                this.props.customProps._toastMessage('success', res.message)
                this.getTeachersList()
            })
        }).catch(err => {

            this.setState({
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
    // showing loader in add teacher popmodal 
    showLoader = () => {

        if (this.addTeacherFormValidator.allValid()) {
            this.setState({
                isModalLoading: true
            }, () => {
                this.submitModalDetail()
            })
        } else {
            this.addTeacherFormValidator.showMessages();
            this.forceUpdate();
        }



    }
    // showing confirm popup
    showDeleteConfirmation = (id) => {
        this.setState({
            modalOpen: true,
            modalType: constants.DELETE_CONFIRMATION_MODAL,
            modalHeader: 'Delete Teacher ',
            modalDescription: 'Are you sure to remove this teacher',
            activeTeacherId: id
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
            this.deleteTeacherProfile(this.state.activeTeacherId)
        })
    }

    // onchange of page show activve page number in pagination
    handlePaginationChange = (e, { activePage }) => {
        this.setState({
            page_number: activePage,
            hasDataLoad: true
        }, () => {
            this.state.showSearchResult?this.showSearchResult():this.getTeachersList()
        })
    }
    // handle dropdown inputs 
    handleRecordDropdown = (event, value) => {
        this.setState({
            page_size: value,
            page_number: 1,
            hasDataLoad: true
        }, () => {
            this.state.showSearchResult?this.showSearchResult():this.getTeachersList()
        })
    }

    searchTeacherInfo = () => {
        let { searchTeacher } = this.state;
        // let page_number = 0;
        if (searchTeacher) {
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
        let { searchTeacher, page_size, page_number, status,column,direction } = this.state;

        adminTeacherSearch(searchTeacher, status, page_number, page_size,column,direction).then(res => {
            this.setState({
                teachersList: res.data,
                hasDataLoad: false,
                total_records: res.total_records,
                total_pages: Math.ceil(res.total_records / this.state.page_size),
                clearSearchTeacher: true
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
            searchTeacher: value
        })
    }

    clearSearch = () => {
        let { clearSearchTeacher } = this.state;
        this.setState({
            clearSearchTeacher: !clearSearchTeacher,
            searchTeacher: '',
            hasDataLoad: true
        }, () => {
            this.getTeachersList()
        })
    }

    // show data on change of user status dropdown
    handleDropdown = (value, event) => {
        this.setState({
            status: value,
            hasDataLoad: true,
            page_number:1
        }, () => {
            this.state.searchTeacher?this.showSearchResult():this.getTeachersList()
        })

    }

    toggleUser = (event, id, checked, activeUserName, activeRoleId) => {

        if (activeRoleId === 2) {

        } else {
            this.setState({
                popupModalType: constants.DELETE_CONFIRMATION_MODAL,
                showPopUpModal: true,
                modalHeader: `${checked ? 'Approve' : 'Disapprove'} user`,
                modalDescription: `Are you want to ${checked ? 'Approve' : 'Disapprove'}  ${activeUserName}`,
                activeUserId: id,
                activeUserStatus: checked,
                activeUserName
            })
        }
    }
    // toggle approve teacher or unapprove teacher  and calling api
    toggleApprove = (id, checked) => {
        let data = { active: checked };
        toggleApproveUser(id, data).then(res => {
            this.setState({
                popupModalType: '',
                modalHeader: '',
                modalDescription: '',
                showPopUpModal: false,
                hasDataLoad: true
            }, () => {
                this.props.customProps._toastMessage("success", res.message);
                this.getTeachersList()
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
                }
                else {
                    this.props.customProps._toastMessage('error', err.message)
                }
            })
        })
    }

    //showing popup visiblity true
    showConfirmDeletePopUp = (id, activeRoleId, event) => {
        if (activeRoleId === 2) {
        } else {
            this.setState({
                popupModalType: constants.DELETE_CONFIRMATION_MODAL,
                showPopUpModal: true,
                modalHeader: 'Remove user',
                modalDescription: 'Are you sure you want to Remove user',
                deleteUserId: id,
                deleteUserRole: event.target.id
            })
        }
    }
    //showing popup visiblity false

    hideConfirmDeletePopUp = () => {
        this.setState({
            popupModalType: '',
            modalHeader: '',
            modalDescription: '',
            showPopUpModal: false,
            deleteUserId: ''

        })
    }

    // sorting columns in ascending or descending order
    handleSort = (clickedColumn) => () => {
        const { column, direction,searchTeacher } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                // teachersList: teachersList.sort((a, b) =>
                // {
                //     if(a[clickedColumn] && b[clickedColumn]){
                //       var textA = a[clickedColumn].toUpperCase();
                //         var textB = b[clickedColumn].toUpperCase();
                //         return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                //     }
                // }),
                // teachersList: _.sortBy(this.state.teachersList, [clickedColumn]),
                direction: 'ascending',
            },()=>{
                searchTeacher?this.showSearchResult():this.getTeachersList()
            })
        }else{
            this.setState({
                // teachersList: this.state.teachersList.reverse(),
                direction: direction === 'ascending' ? 'descending' : 'ascending',
            },()=>{
                    searchTeacher?this.showSearchResult():this.getTeachersList()
                })
        }

        
    }




    render() {
        let { teachersList, hasDataLoad,
            modalOpen,
            modalType,
            modalHeader, addTeacherModal, isModalLoading, modalDescription,
            siblingRange,
            showFirstAndLastNav, showPreviousAndNextNav, showEllipsis,
            boundaryRange,
            total_pages,
            page_number,
            page_size,
            recordView,
            total_records,
            searchTeacher,
            clearSearchTeacher,
            userDropdown,
            column,
            direction,
            status
        } = this.state;

        return (
            <div >
                <PopUpModal
                    open={modalOpen}
                    type={modalType}
                    modalHeader={modalHeader}
                    isModalLoading={isModalLoading}
                    close={this.close}
                    addTeacherModal={addTeacherModal}
                    showLoader={this.showLoader}
                    modalDescription={modalDescription}
                    _handleInput={this._handleInput}
                    proceedToYes={this.proceedToYes}
                    popUpValidation={this.addTeacherFormValidator}
                />
                {
                    hasDataLoad ?
                        <div className="ui container">
                            <Loaders isLoading={hasDataLoad} />
                        </div>
                        :
                        <div className={`${total_records >= 20?'mb-5':''} ui container main-layout-height mt-2rem`}>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column tablet={3} computer={5} />
                                    <Grid.Column tablet={3} computer={3} mobile={16} >
                                        <div className="w-100 text-center admin-mobile-page-heading m-v">
                                            <h2 className="ui header">Teachers list</h2>
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column mobile={16} tablet={5} computer={5} >
                                        <div className="ui fluid action input">
                                            <input
                                                type="text"
                                                placeholder="Search"
                                                value={searchTeacher}
                                                onChange={this.handleSearchInput}
                                            />
                                            {clearSearchTeacher === false ? (
                                                <button
                                                    className="ui green icon button"
                                                    onClick={this.searchTeacherInfo}
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
                                            {/* <button className="ui blue inverted button right floated " onClick={this.openAddTeacher}>
                                            Add Teacher
                                        </button> */}
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column mobile={16} tablet={5} computer={3}>
                                        <div className="add-child-form-mt-2rem">
                                            <Dropdown
                                                fluid
                                                selection
                                                options={userDropdown}
                                                // defaultValue={userDropdown[0].value}
                                                value={status}
                                                onChange={(event, { value }) => this.handleDropdown(value, event)}
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
                                            <Table.HeaderCell>Active</Table.HeaderCell>
                                            <Table.HeaderCell sorted={column === 'first_name' ? direction : null} onClick={this.handleSort('first_name')}>First Name</Table.HeaderCell>
                                            <Table.HeaderCell sorted={column === 'last_name' ? direction : null} onClick={this.handleSort('last_name')}>Last Name</Table.HeaderCell>
                                            <Table.HeaderCell sorted={column === 'email' ? direction : null} onClick={this.handleSort('email')}>Email</Table.HeaderCell>
                                            <Table.HeaderCell>Classes</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {
                                            teachersList.length ? teachersList.map((value, index) => {
                                                return (
                                                    <Table.Row textAlign="center" key={index} collapsing="true">
                                                        <Table.Cell>
                                                            <span >
                                                                <i
                                                                    aria-hidden="true"
                                                                    className="eye blue small link icon view-icon "
                                                                    onClick={() => this.viewTeacherProfile(value.id)}
                                                                ></i>
                                                            </span>
                                                            <span >
                                                                <i
                                                                    aria-hidden="true"
                                                                    className="pencil green small link icon view-icon "
                                                                    onClick={() => this.editTeacherProfile(value.id)}
                                                                ></i>
                                                            </span>
                                                            <span >
                                                                <Popup content='View staff hiring information' trigger={<i aria-hidden="true" className="file text outline small icon violet link view-icon" onClick={() => this.showStaffHiringForm(value.id)} />} />
                                                            </span>
                                                            <span >
                                                                <Popup trigger={<span disabled={value.teacher_infos.length ? true : false} >
                                                                    <Icon name='file alternate outline' link className="view-icon" color="teal" size='small' /></span>} flowing hoverable >
                                                                    <Grid centered divided columns={value.teacher_infos.length === 0 ? 1 : value.teacher_infos.length} >
                                                                        {value.teacher_infos.length ? value.teacher_infos.map((data, index) => {
                                                                            return (
                                                                                <Grid.Column textAlign='center' key={`${data}-${index}`}>
                                                                                    {
                                                                                        data.resume === '' ? <Header as='h4'>No Resume Available</Header> : <Header as='h4'>Resume</Header>
                                                                                    }
                                                                                    {
                                                                                        data.resume === '' ? '' : <a href={apiBaseUrl+'/download/resume/'+data.id+'/'+data.resume} target="blank" rel="noopener noreferrer" className="cursor-pointer">Download</a>
                                                                                    }
                                                                                </Grid.Column>
                                                                            )
                                                                        }) :
                                                                            <Grid.Column textAlign='center'>
                                                                                <Header as='h4'>No Resume Available</Header>
                                                                            </Grid.Column>
                                                                        }
                                                                    </Grid>
                                                                </Popup>
                                                            </span>
                                                            <span >
                                                                <i
                                                                    aria-hidden="true"
                                                                    className="trash red alternate outline small link icon view-icon "
                                                                    onClick={(event) => this.showDeleteConfirmation(value.id, event)}

                                                                ></i>
                                                            </span>
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <div className={`ui ${value.active ? 'checked' : ''} ${value.role_id === 2 ? 'disabled ' : ''} fitted toggle checkbox`}
                                                                id={value.id}
                                                                onClick={(event) => this.toggleApprove(value.id, !(value.active))}>
                                                                <input type="checkbox" className="hidden" checked={value.active ? "checked" : ''} />
                                                                <label ></label>
                                                            </div>
                                                        </Table.Cell>
                                                        <Table.Cell title={value.first_name}>
                                                            {value.first_name}
                                                        </Table.Cell>
                                                        <Table.Cell title={value.last_name}>
                                                            {value.last_name}
                                                        </Table.Cell>
                                                        <Table.Cell title={value.email}>
                                                            {value.email}
                                                        </Table.Cell>
                                                        <Table.Cell title={value.class_info.length ? '' : 'No class is assigned'}>
                                                            {value.class_info.length ? value.class_info.map((data, id) => {
                                                                return (
                                                                    <span id={id} className="assigned-classes" key={`${data.class_id}-${id}`}>
                                                                        {
                                                                            `${data.class && data.class.class_name ? data.class.class_name : ''} ${data.class && data.class.class_name ? value.class_info.length - 1 === id : '' ? '' : ','}`
                                                                        }
                                                                    </span>
                                                                )
                                                            }) : 'No class is assigned'}
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

export default connect(mapStateToProps, mapDispatchToProps)(TeachersList)
