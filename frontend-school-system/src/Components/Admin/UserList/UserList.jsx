import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Table, Pagination, Dropdown } from 'semantic-ui-react';
//api
import { viewAdminUserList, searchAdminUserList, deleteUsers,  toggleApproveUser } from '../../../ApiAction/Admin';
//redux
import {displayAdminProfile } from '../../../Redux/Actions/Admin';
//Constants 
import { constants } from '../../';
//loader
import { Loaders } from '../../Shared';
//popupmodal
import { PopUpModal } from '../../Shared/PopupModal/PopupModal';
// css
import './UserList.css';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginUserInfo: props.loginUserInfo,
            usersList: [],
            isPageLoading: false,
            clearSearchClass: false,
            searchClass: '',
            column: '',
            direction: '',
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
            isLoading: true,
            popupModalType: '',
            showPopUpModal: false,
            modalHeader: '',
            modalDescription: '',
            deleteUserId: '',
            deleteUserRole: '',
            apiStatusCode: '',
            activeUserId: '',
            activeUserStatus: '',
            activeUserName: '',
            status: 'All',
            userDropdown: constants.USER_STATUS

        }
    }

    componentWillMount() {
        if(this.props.loginUserInfo.role_id === 2){
        this.fetchUserList()
        }else{
            this.props.history.push('/home')
        }
    }

    //getting active user list of admin
    fetchUserList = () => {
        let { page_number, page_size, status,column,direction } = this.state;
        viewAdminUserList(status, page_number, page_size,column,direction).then(res => {
            console.log('My viewAdmin userlist has response', res);
            this.setState({
                usersList: res.data,
            //     usersList: res.data.length?res.data.sort((a, b) =>{
            //         if(a[column] && b[column]){
            //             var textA = a[column].toUpperCase();
            //             var textB = b[column].toUpperCase();
            //             return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            //         }
                        
            //     }
            //   ):[],
                // usersList: res.data,
                isPageLoading: false,
                total_records: res.total_records,
                isLoading: false,
                total_pages: Math.ceil(res.total_records / this.state.page_size)
            })
        }).catch(err => {

            this.setState({
                isPageLoading: false,
                isLoading: false,
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

    //on click on eye icon fetching current user list and redirect to view user list
    viewUserProfile = (id, event) => {
        this.setState({
            activeUserId: id
        }, () => {
            this.props.displayAdminProfile(false)
            this.props.history.push({
                pathname: `/users/action/view`,
                state: { activeUserId: this.state.activeUserId }
            });
        })
    }

    //on click on eye icon fetching current user list and redirect to edit user list
    editUserProfile = (id, event) => {
        this.setState({
            activeUserId: id
        }, () => {
            this.props.displayAdminProfile(false)
            this.props.history.push({
                pathname: `/edit-users-profile`,
                state: { activeUserId: this.state.activeUserId }
            });
        })
    }

    // handle input of search bar
    handleSearchInput = (event) => {
        let { value } = event.target;
        this.setState({
            searchClass: value
        })
    }

    //clearing search input box and fetching user list
    clearSearch = () => {
        this.setState({
            searchClass: '',
            clearSearchClass: false,
            isLoading:true

        }, () => {
            this.fetchUserList()
        })
    }

    //showing clear search icon and calling search user api
    searchUser = () => {
        let { searchClass } = this.state;

        if (searchClass) {
            this.setState({
                clearSearchClass: true,
                isLoading:true
            }, () => {
                this.searchUserList()
            })
        }else{
            this.props.customProps._toastMessage('error', constants.BLANK_SEARCH_MESSAGE)
        }
    }


    // calling search user api
    searchUserList = () => {
        let { searchClass,status,column,direction } = this.state;

        searchAdminUserList(searchClass,status,column,direction).then(res => {
            this.setState({
                usersList: res.data.length?res.data:[],
                total_records: res.total_records,
                isLoading: false,
                total_pages: Math.ceil(res.total_records / this.state.page_size),
            })
        }).catch(err => {
            this.setState({
                apiStatusCode: err ? err.status : 500,
                isLoading:false
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


    // sorting columns in ascending or descending order
    handleSort = (clickedColumn) => () => {
        const { column, direction,searchClass } = this.state
        if (column !== clickedColumn) {

            this.setState({
                column: clickedColumn,
                isLoading:true,
                // usersList: usersList.sort((a, b) =>
                // {
                //     if(a[clickedColumn] && b[clickedColumn]){
                //         var textA = a[clickedColumn].toUpperCase();
                //         var textB = b[clickedColumn].toUpperCase();
                //         return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                //     }
                // }),
                // usersList: _.sortBy(this.state.usersList, [clickedColumn]),
                direction: direction === 'ascending' ? 'descending' : 'ascending'
            },()=>{
                searchClass ? this.searchUserList() : this.fetchUserList();
                
            })

            //return true;
        }else{
            this.setState({
                column: clickedColumn,
                isLoading:true,
                direction: direction === 'ascending' ? 'descending' : 'ascending'
            },()=>{
                searchClass? this.searchUserList() : this.fetchUserList();
            })
        }

        // this.setState({
        //     usersList: this.state.usersList.reverse(),
        //     direction: direction === 'ascending' ? 'descending' : 'ascending',
        // })
    }

    //handle dropdown page
    handleRecordDropdown = (e, value) => {
        this.setState({
            page_size: value,
            page_number:1,
            isLoading: true
        }, () => {
            this.state.searchClass? this.searchUserList() : this.fetchUserList();
        })

    }

    // onchange of page show activve page number in pagination
    handlePaginationChange = (e, { activePage }) => {
        this.setState({
            page_number: activePage,
            isLoading: true
        }, () => {
            this.fetchUserList()
        })
    }
    // handle dropdown inputs 
    // handleRecordDropdown = (event, value) => {
    //     this.setState({
    //         page_size: value,
    //         isLoading: true
    //     }, () => {
    //         this.fetchUserList()
    //     })
    // }

    // remove user from userlist 
    removeUserProfile = (id) => {
        let { deleteUserRole } = this.state;
        // if user role is 2 i.e admin cannot delete himself
        if (deleteUserRole === "2") {
            this.setState({
                showPopUpModal: false,
            }, () => {
                this.props.customProps._toastMessage("warn", 'Admin cannot be deleted');
            })

        } else {

            deleteUsers(id).then(res => {
                this.setState({
                    showPopUpModal: false,

                }, () => {
                    this.props.customProps._toastMessage("success", res.message);
                    this.fetchUserList()
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
    }

    toggleUser = (event, id, checked, activeUserName, activeRoleId) => {

        if (activeRoleId === 2) {

        } else {
            this.setState({
                popupModalType: constants.DELETE_CONFIRMATION_MODAL,
                showPopUpModal: true,
                modalHeader: `${checked ? 'Active' : 'Inactive'} user`,
                modalDescription: `Are you want to ${checked ? 'Active' : 'Inactive'}  ${activeUserName}`,
                activeUserId: id,
                activeUserStatus: checked,
                activeUserName
            })
        }
    }

    toggleApprove = (id, checked) => {
        let data = { active: checked };
        toggleApproveUser(id, data).then(res => {
            this.setState({
                popupModalType: '',
                modalHeader: '',
                modalDescription: '',
                showPopUpModal: false,
            }, () => {
                this.props.customProps._toastMessage("success", res.message);
                this.fetchUserList()
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
    // show data on change of user status dropdown
    handleDropdown = (value, event) => {
        this.setState({
            isLoading: true,
            status: value,
            page_number:1
        }, () => {
            this.state.searchClass? this.searchUserList() : this.fetchUserList();
        })

    }


    proceedToYes = () => {
        let { modalHeader, deleteUserId, activeUserId, activeUserStatus } = this.state;
        if (modalHeader === "Remove user") {
            this.removeUserProfile(deleteUserId)
        } else {
            this.toggleApprove(activeUserId, activeUserStatus)
        }
    }

    render() {
        let { usersList,
            clearSearchClass,
            searchClass,
            column,
            direction,
            siblingRange,
            showFirstAndLastNav, showPreviousAndNextNav, showEllipsis,
            boundaryRange,
            total_pages,
            page_number,
            page_size,
            recordView,
            total_records,
            isLoading,
            showPopUpModal,
            popupModalType,
            modalDescription,
            modalHeader,
            userDropdown,
            loginUserInfo,
            status
        } = this.state;
        return (
            <div >
                {
                    isLoading === true ?
                        <div className="ui container">
                            <Loaders isLoading={isLoading} />
                        </div>
                        :
                        showPopUpModal === true ?
                            <PopUpModal type={popupModalType}
                                open={showPopUpModal}
                                proceedToYes={this.proceedToYes}
                                close={this.hideConfirmDeletePopUp}
                                modalHeader={modalHeader}
                                modalDescription={modalDescription}

                            />

                            :
                            <div className={`${total_records >= 20?'mb-5':''} ui container main-layout-height mt-2rem`} >
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column computer={5}  tablet={2} mobile={16} >
                                            <div className="w-100 text-center admin-mobile-page-heading m-v"> 
                                            <h2 className="ui header">User list</h2>
                                            </div>
                                        </Grid.Column>
                                        <Grid.Column computer={4}  tablet={2} />
                                        <Grid.Column computer={5} mobile={16} tablet={6}>
                                            <div className="ui fluid action input">
                                                <input 
                                                    type="text"
                                                    placeholder="Search"
                                                    value={searchClass}
                                                    onChange={this.handleSearchInput}
                                                />
                                                {clearSearchClass === false ? (
                                                    <button
                                                        className="ui green icon button"
                                                        onClick={this.searchUser}
                                                    >
                                                        <i aria-hidden="true" className="search icon"></i>
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
                                        <Grid.Column mobile={16} computer={2} tablet={6}>
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
                                <div className="view-child mt-2rem">
                                    <Table celled sortable compact unstackable singleLine>
                                        <Table.Header>
                                            <Table.Row textAlign='center'>
                                                <Table.HeaderCell>Action</Table.HeaderCell>
                                                <Table.HeaderCell>Active</Table.HeaderCell>
                                                <Table.HeaderCell sorted={column === 'first_name' ? direction : null} onClick={this.handleSort('first_name')}>
                                                    First Name
                                                </Table.HeaderCell>
                                                <Table.HeaderCell sorted={column === 'last_name' ? direction : null} onClick={this.handleSort('last_name')}>
                                                    Last Name
                                                </Table.HeaderCell>
                                                <Table.HeaderCell
                                                    sorted={column === 'role' ? direction : null}
                                                    onClick={this.handleSort('role')}
                                                >
                                                    Access
                                                </Table.HeaderCell>
                                                <Table.HeaderCell
                                                    sorted={column === 'phone' ? direction : null}
                                                    onClick={this.handleSort('phone')}
                                                >Phone</Table.HeaderCell>
                                                <Table.HeaderCell
                                                    sorted={column === 'email' ? direction : null}
                                                    onClick={this.handleSort('email')}
                                                >Email</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body >
                                            {
                                                usersList.length ? usersList.map((value, index) => {
                                                    let fullName = value.first_name + ' ' + value.last_name
                                                    return (
                                                        <Table.Row className="top aligned center aligned" key={index} index={index} positive={loginUserInfo.id === value.id}>
                                                            <Table.Cell className="" >
                                                                <span className="table-icons-spacing">
                                                                    <i
                                                                        aria-hidden="true"
                                                                        className="eye blue small link icon view-icon"
                                                                        onClick={(event) => this.viewUserProfile(value.id, event)}

                                                                    ></i>
                                                                </span>
                                                                <span className="table-icons-spacing">
                                                                    <i
                                                                        aria-hidden="true"
                                                                        className="pencil green small link icon view-icon"
                                                                        onClick={(event) => this.editUserProfile(value.id, event)}
                                                                    ></i>

                                                                </span>
                                                                <span className="table-icons-spacing">
                                                                    <i
                                                                        aria-hidden="true"
                                                                        className={`trash alternate red outline small link icon view-icon ${value.role_id === 2 ? 'disabled' : ''} `}
                                                                        id={value.role_id}
                                                                        onClick={(event) => this.showConfirmDeletePopUp(value.id, value.role_id, event)}
                                                                    ></i>
                                                                </span>

                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                <div className={`ui ${value.active ? 'checked' : ''} ${value.role_id === 2 ? 'disabled ' : ''} fitted toggle checkbox`}
                                                                    id={value.id} name={fullName}
                                                                    onClick={(event) => this.toggleUser(event, value.id, !(value.active), fullName, value.role_id)}>
                                                                    <input type="checkbox" className="hidden"  checked={value.active ? "checked" : ''}/>
                                                                    <label ></label>
                                                                </div>
                                                            </Table.Cell>
                                                            <Table.Cell index={index} title={value.first_name} className="cursor-pointer">{value.first_name}</Table.Cell>
                                                            <Table.Cell index={index} title={value.last_name} className="cursor-pointer">{value.last_name}</Table.Cell>
                                                            <Table.Cell index={index} title={value.role} className="cursor-pointer">{value.role}</Table.Cell>
                                                            <Table.Cell index={index} title={value.phone} className="cursor-pointer">{value.phone}</Table.Cell>
                                                            <Table.Cell index={index} title={value.email} className="cursor-pointer">{value.email}</Table.Cell>
                                                        </Table.Row>

                                                    )
                                                }) :
                                                    <tr className="top aligned center aligned">
                                                        <td className="allclasses-empty-msg" colSpan="6"> No user found</td>
                                                    </tr>
                                            }
                                        </Table.Body>
                                    </Table>

                                </div>
                                {
                                    total_records >= 20 ?
                                        <div className="mt-2rem">
                                            <Grid>
                                                <Grid.Row>
                                                    <Grid.Column mobile={16} tablet={7} computer={6}  >
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
                                                    <Grid.Column tablet={2} computer={4}  />
                                                    <Grid.Column mobile={16} tablet={7} computer={6} className="align-right">
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

const mapStateToProps = state => ({
    loginUserInfo: state.loginReducer.loginUserInfo,

})

const mapDispatchToProps = dispatch => {
    return {
        displayAdminProfile: data => dispatch(displayAdminProfile(data))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
