import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Table, Pagination, Dropdown, Button, Icon, Grid } from 'semantic-ui-react';
import SimpleReactValidator from 'simple-react-validator';
import moment from 'moment';
//api
import { adminSupport, adminReply, deleteEntry, adminRecordSortByDate } from '../../../ApiAction/Admin';
//constants
import { constants } from '../../';
//loader
import { Loaders } from '../../'
//popup
import { PopUpModal } from '../../';
//components
import { HomePageDatePicker } from './DatePicker';
//css
import "./AdminSupport.css";
class AdminSupport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            apiStatusCode: '',
            activeMenu: 'pending',
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
            adminSupportQueries: [],
            modalType: '',
            isModalLoading: false,
            modalOpen: false,
            modalHeader: '',
            modalDescription: '',
            activeUser: '',
            reply: '',
            removeId: [],
            validDateRangeMessage: '',
            validDateRangeStatus: false,
            validDateElementId: '',
            focusedInput: null,
            startDate: moment(new Date()).format('MM/DD/YYYY'),
            endDate: moment(new Date().setFullYear(new Date().getFullYear() + 1)).format('MM/DD/YYYY'),
            column: '',
            direction: '',

        }
        this.replyToUserFormValidator = new SimpleReactValidator()
    }

    componentWillMount() {
        if(this.props.loginUserInfo.role_id === 2){
            this.getAdminSupportQueryList()
        }else{
            this.props.history.push('/home')
        }
    }

    // finding query list table data
    getAdminSupportQueryList = () => {
        let { activeMenu, page_number, page_size,column,direction } = this.state;
        adminSupport(activeMenu, page_number, page_size,column,direction).then(res => {
            
            this.setState({
                adminSupportQueries: res.data.length ? res.data : [],
                isPageLoading: false,
                total_records: res.total_records,
                isLoading: false,
                total_pages: Math.ceil(res.total_records / this.state.page_size)
            })
        }).catch(err => {
            this.setState({
                apiStatusCode: err ? err.status : 500,
                isLoading: false,
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

    // show list by tab name
    handleItemClick = (event) => {
        let { name } = event.target;
        this.setState({
            isLoading: true,
            activeMenu: name
        }, () => {
            this.getAdminSupportQueryList()
        })
    }
// displaying reply query popup
    showReplyPopup = (data) => {
        let activeUser = data;
        this.setState({
            activeUser: activeUser,
            modalType: constants.ADMIN_REPLY_TO_USER,
            modalOpen: true,
            modalHeader: '',
            modalDescription: '',
        })
    }
// saving input of reply textbox 
    handleInput = (event) => {
        let { value} = event.target;
        this.setState({
            reply: value
        })
    }

    // calling query reply modal
    submitReply = () => {

        let { activeUser, reply } = this.state,
            data = {
                id: activeUser.id,
                reply: reply,
                user_name: activeUser.name,
                user_email: activeUser.email
            };

        adminReply(data).then(res => {
            this.setState({
                modalOpen: false,
                modalType: '',
                reply: '',
                isModalLoading: false
            }, () => {
                this.props.customProps._toastMessage('success', res.message)
                this.getAdminSupportQueryList()
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
    // closing popup modal
    close = () => {
        this.setState({
            modalType: '',
            modalOpen: false,
            reply: '',
            removeId: []

        })
    }

    // showing loader in add teacher popmodal 
    showLoader = () => {
        if (this.replyToUserFormValidator.allValid()) {
            this.setState({
                isModalLoading: true
            }, () => {
                this.submitReply()
            })
        } else {
            this.replyToUserFormValidator.showMessages();
            this.forceUpdate();
        }
    }
    // saving values of active row and save them in array
    toggleCheckbox = (data) => {
        let activeUser = data,
            { removeId } = this.state;

        var index = removeId.indexOf(activeUser.id);
        if (index === -1) {
            removeId.push(activeUser.id);
        } else {
            removeId.splice(index, 1);
        }
        this.setState({
            removeId
        })
    }
// selecting all checkboxes
    toggleAllCheckbox = (event) => {
        let { name } = event.target,
            { removeId } = this.state,
            // getting all checkboxes details
            allCheckBoxes = document.getElementsByName(name);

        allCheckBoxes.forEach((data) => {
            // changing status to checked
            data.checked = event.target.checked
            if (data.id) {
                var index = removeId.indexOf(data.id);
                if (index === -1) {
                    removeId.push(data.id);
                } else {
                    removeId.splice(index, 1);
                }
            }
        })
        this.setState({
            removeId
        })

    }
    // calling confirmation poup for single entries
    showConfirmationPopup = (id, event) => {
        let { removeId } = this.state;
        removeId.push(id)
        this.setState({
            modalType: constants.DELETE_CONFIRMATION_MODAL,
            modalOpen: true,
            modalHeader: `Delete`,
            modalDescription: `Are you sure to remove`,
            removeId
        })
    }

    // calling confirmation popup for removing multiple entries
    showPopUp = () => {
        this.setState({
            modalType: constants.DELETE_CONFIRMATION_MODAL,
            modalOpen: true,
            modalHeader: `Delete`,
            modalDescription: `Are you sure to remove ${this.state.removeId.length} entries`
        })
    }



    // remove specific row or multiple rows
    removeEntry = (event) => {
        let { removeId } = this.state;
        if (removeId.length) {
            let data = { ids: removeId }
            // calling remove ebtries api
            deleteEntry(data).then(res => {
                this.setState({
                    modalOpen: false,
                    modalType: '',
                    reply: '',
                    isModalLoading: false,
                    removeId: [],
                    activeMenu: 'resolved'
                }, () => {
                    this.props.customProps._toastMessage('success', res.message)
                    this.getAdminSupportQueryList()
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

        } else {

        }
    }

    // search record in table on the basis of date
    searchRecord = () => {
        let { startDate, endDate, page_size, page_number, activeMenu } = this.state;
        adminRecordSortByDate(startDate, endDate, activeMenu, page_number, page_size).then(res => {
            this.setState({
                adminSupportQueries: res.data.length ? res.data : [],
                isPageLoading: false,
                total_records: res.total_records,
                isLoading: false,
                total_pages: Math.ceil(res.total_records / this.state.page_size)
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
    // save start value and end value trigger from date picker component
    getStartEndValue = (startValue, endValue) => {
        if (startValue) {
            startValue = moment(startValue._d).format('YYYY-MM-DD')
            this.setState({
                startDate: startValue
            })
        }
        if (endValue) {
            endValue = moment(endValue._d).format('YYYY-MM-DD')
            this.setState({
                endDate: endValue
            })
        }
    }
    // on pageload and on search by date show loader in table
    showTableLoader = () => {
        this.setState({
            isLoading: true
        }, () => {
            this.searchRecord()
        })
    }

    // onchange of page show activve page number in pagination
    handlePaginationChange = (e, { activePage }) => {
        this.setState({
            page_number: activePage,
            isLoading: true
        }, () => {
            this.getAdminSupportQueryList()
        })
    }
    // handle dropdown inputs 
    handleRecordDropdown = (event, value) => {
        this.setState({
            page_size: value,
            page_number:1,
            isLoading: true
        }, () => {
            this.getAdminSupportQueryList()
        })
    }

       // sorting columns in ascending or descending order
       handleSort = (clickedColumn) => () => {
        const { column, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                // adminSupportQueries: adminSupportQueries.sort((a, b) =>
                // {
                //     if(a[clickedColumn] && b[clickedColumn]){
                //         var textA = a[clickedColumn].toUpperCase();
                //         var textB = b[clickedColumn].toUpperCase();
                //         return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                //     }
                // }),
                // adminSupportQueries: _.sortBy(this.state.adminSupportQueries, [clickedColumn]),
                direction: 'ascending',
            },()=>{
                this.getAdminSupportQueryList();
            })
        }

        this.setState({
            // adminSupportQueries: this.state.adminSupportQueries.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        },()=>{
            this.getAdminSupportQueryList();
        })
    }


    render() {
        let { activeMenu,
            adminSupportQueries,
            modalOpen,
            modalType,
            modalHeader,
            modalDescription,
            activeUser,
            reply,
            isModalLoading,
            removeId, siblingRange,
             showPreviousAndNextNav, showEllipsis,
            boundaryRange,
            total_pages,
            page_number,
            page_size,
            recordView,
            total_records,
            isLoading,
            column,
            direction } = this.state;
        return (
            <div>
                    {
                        isLoading ?
                        <div className="ui container">
                            <Loaders isLoading={isLoading} />
                            </div>
                             :
                            <div className={`${total_records >= 20?'mb-5':''} ui container main-layout-height mt-2rem`}>
                                <Grid className="m-v">
                                    <Grid.Row>
                                        <Grid.Column mobile={16}>
                                            <HomePageDatePicker
                                                getStartEndValue={this.getStartEndValue} />
                                            <div className="text-center mt-10">
                                                <Button icon fluid color='blue' onClick={this.showTableLoader}><Icon name='search' /></Button>
                                            </div>
                                        </Grid.Column>
                                        {activeMenu === "resolved" ? <Grid.Column computer={4} mobile={16}>
                                            <div className="text-center mt-10">
                                                <button className="ui red compact fluid button" name="multi-entry" disabled={removeId.length ? false : true}><i aria-hidden="true" className="trash alternate icon"></i> Remove </button>
                                            </div>
                                        </Grid.Column> : ''}

                                    </Grid.Row>
                                </Grid>
                                <div className="ui top attached tabular menu ">
                                    <a className={`${activeMenu === "pending" ? 'active' : ''} item `} name="pending" href="#" onClick={this.handleItemClick}>Pending</a>
                                    <a className={`${activeMenu === "resolved" ? 'active' : ''} item `} name="resolved" href="#" onClick={this.handleItemClick}>Completed</a>
                                    <div className="right menu d-v right-menu-content">
                                        <HomePageDatePicker
                                            getStartEndValue={this.getStartEndValue}
                                        />
                                        <div className="item">
                                            <Button icon color='blue' className="date-search-btn" onClick={this.showTableLoader}><Icon name='search' /></Button>
                                        </div>
                                        {activeMenu === "resolved" ? <div className="item">
                                            <button className="ui red compact button" name="multi-entry" onClick={this.showPopUp} disabled={removeId.length ? false : true}><i aria-hidden="true" className="trash alternate icon"></i> Remove </button>
                                        </div> : ''}

                                    </div>
                                </div>
                                {
                                    modalOpen ?
                                        <PopUpModal
                                            open={modalOpen}
                                            type={modalType}
                                            _handleInput={this.handleInput}
                                            activeUser={activeUser}
                                            reply={reply}
                                            showLoader={this.showLoader}
                                            close={this.close}
                                            isModalLoading={isModalLoading}
                                            popUpValidation={this.replyToUserFormValidator}
                                            proceedToYes={this.removeEntry}
                                            modalHeader={modalHeader}
                                            modalDescription={modalDescription}
                                        /> :
                                        <Segment attached='bottom'>
                                            <div className="view-child">
                                                <Table celled compact unstackable fixed singleLine sortable>
                                                    <Table.Header>
                                                        <Table.Row textAlign='center'>
                                                            {
                                                                activeMenu === "resolved" ?
                                                                    adminSupportQueries.length ?
                                                                        <Table.HeaderCell className="cursor-pointer">
                                                                            <div className="ui fitted checkbox">
                                                                                <input type="checkbox" name="remove" onClick={this.toggleAllCheckbox} />
                                                                                <label></label>
                                                                            </div>
                                                                        </Table.HeaderCell> : '' : ''
                                                            }
                                                            <Table.HeaderCell title="Action" className="cursor-pointer">Action</Table.HeaderCell>
                                                            <Table.HeaderCell title="User Name" className="cursor-pointer" sorted={column === 'name' ? direction : null} onClick={this.handleSort('name')}>User Name</Table.HeaderCell>
                                                            <Table.HeaderCell title="Email" className="cursor-pointer" sorted={column === 'email' ? direction : null} onClick={this.handleSort('email')}>Email</Table.HeaderCell>
                                                            <Table.HeaderCell title="Query" className="cursor-pointer" sorted={column === 'subject' ? direction : null} onClick={this.handleSort('subject')}>Query</Table.HeaderCell>
                                                            {activeMenu === "resolved" ? <Table.HeaderCell title="Feedback" className="cursor-pointer" sorted={column === 'reply' ? direction : null} onClick={this.handleSort('reply')}>Feedback</Table.HeaderCell> : ''}
                                                            <Table.HeaderCell title="Created at" className="cursor-pointer" sorted={column === 'createdAt' ? direction : null} onClick={this.handleSort('createdAt')}>Created at</Table.HeaderCell>
                                                        </Table.Row>
                                                    </Table.Header>
                                                    <Table.Body>
                                                        {
                                                            adminSupportQueries.length ? adminSupportQueries.map((data, index) => {
                                                                return (
                                                                    <Table.Row textAlign='center' key={`${activeMenu}-${index}`}>
                                                                        {activeMenu === "pending" ? '' : <Table.Cell>
                                                                            <div className="ui fitted checkbox">
                                                                                <input type="checkbox" name="remove" id={data.id} onClick={() => this.toggleCheckbox(data)} />
                                                                                <label></label>
                                                                            </div>
                                                                        </Table.Cell>}
                                                                        {activeMenu === "pending" ? <Table.Cell>
                                                                            <span className="table-icons-spacing" title="Reply"><i aria-hidden="true" className="reply blue small link icon view-icon" onClick={(e) => this.showReplyPopup(data)}></i></span>
                                                                            {/* <span className="table-icons-spacing"><i aria-hidden="true" className="pencil green small link icon view-icon"></i></span> */}
                                                                        </Table.Cell> : <Table.Cell>
                                                                                <span className="table-icons-spacing" >
                                                                                    <i aria-hidden="true" className=" trash red small alternate link icon view-icon" name="single-entry" id={data.id} onClick={(event) => this.showConfirmationPopup(data.id, event)}></i></span>
                                                                            </Table.Cell>}
                                                                        <Table.Cell title={data.name} className="cursor-pointer">{data.name}</Table.Cell>
                                                                        <Table.Cell title={data.email} className="cursor-pointer">{data.email}</Table.Cell>
                                                                        <Table.Cell title={data.message} className="cursor-pointer">{data.message}</Table.Cell>
                                                                        {activeMenu === "resolved" ? <Table.Cell title={data.reply} className="cursor-pointer">{data.reply}</Table.Cell> : ''}
                                                                        <Table.Cell title={moment(data.createdAt).format('MM/DD/YYYY')} className="cursor-pointer">{moment(data.createdAt).format('MM/DD/YYYY')}</Table.Cell>

                                                                    </Table.Row>
                                                                )
                                                            }) : <Table.Row textAlign='center'>
                                                                    <td className="allclasses-empty-msg" colSpan= {activeMenu === "pending" ?"5" :"6"}>No Data Found</td>
                                                                </Table.Row>
                                                        }
                                                    </Table.Body>
                                                </Table>
                                            </div>
                                        </Segment>
                                }
                                {
                                    total_records >= 20 ?
                                        <Grid>
                                            <Grid.Row>
                                                <Grid.Column mobile={16} computer={6} tablet={7}>
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
                                                <Grid.Column mobile={16} computer={4} tablet={2}/>
                                                <Grid.Column mobile={16} computer={6} tablet={7}>
                                                    <Pagination
                                                        // defaultActivePage={page_number}
                                                        activePage={page_number}
                                                        siblingRange={siblingRange}
                                                        firstItem={null}
                                                        lastItem={null}
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
                                        </Grid> : ''}
                            </div>
                    }
                </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loginUserInfo: state.loginReducer.loginUserInfo
})
const mapDispatchToProps = (dispatch) => {
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminSupport)