import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Table,
    Dropdown,
    Pagination,
    Grid,
    GridColumn
} from 'semantic-ui-react';
import SimpleReactValidator from 'simple-react-validator';
import moment from 'moment';
//api 
import {
    getAnnouncements,
    updateAnnouncements,
    deleteAnnoucement,
    addAnnouncements,
    activateAnnouncement
} from '../../../ApiAction/Admin';
//Constants 
import { constants } from '../../';
//Loader
import { Loaders } from '../../Shared'
//popup modal
import { PopUpModal } from '../../';

class Announcement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalType: '',
            modalHeader: '',
            modalDescription: '',
            modalOpen: false,
            editAnnouncement: {
                id: '',
                title: '',
                description: ''
            },
            siblingRange: 1,
            page_number: 1,
            page_size: 20,
            total_records: 0,
            boundaryRange: 0,
            showFirstAndLastNav: true,
            showPreviousAndNextNav: true,
            showEllipsis: true,
            recordView:constants.SORT_RECORD,
            total_pages: '',
            announcementList: [],
            activeAnnouncementId: '',
            hasDataLoad: true,
            apiStatusCode: '',
            showLoaderinPopUp: false,
            column:'',
            direction:''
        }
        this.AnnouncementValidator = new SimpleReactValidator()
    }

    componentWillMount() {
        if(this.props.loginUserInfo.role_id === 2){
            this.getAnnouncementList()
        }else{
                this.props.history.push('/home')
            }
    }

    //get announcement list
    getAnnouncementList = () => {

        let { page_number, page_size,column,direction } = this.state;

        getAnnouncements(page_number, page_size,column,direction).then(res => {
            this.setState({
                announcementList: res.data.length?res.data:[],
            //     announcementList: res.data.length?res.data.sort((a, b) =>{
            //         if(a[column] && b[column]){
            //             var textA = a[column].toUpperCase();
            //             var textB = b[column].toUpperCase();
            //             return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            //         }
            //     }
                
            //   ):[],
                total_records: res.total_records,
                hasDataLoad: false,
                total_pages: Math.ceil(res.total_records / this.state.page_size)
            })

        }).catch(err => {
            this.setState({
                hasDataLoad: false,
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

    // open edit Announcemnt popup modal
    editAnnouncement = (id) => {

        let { announcementList, editAnnouncement } = this.state;

        announcementList = announcementList.filter(x => {
            if (x.id === id) {
                return x
            }
            else {
                return false
            }
        })

        editAnnouncement.id = announcementList[0].id
        editAnnouncement.title = announcementList[0].title
        editAnnouncement.description = announcementList[0].description
        editAnnouncement.created_at = announcementList[0].created_at

        this.setState({
            modalType: 'Edit Announcement',
            modalHeader: 'Edit Announcement',
            modalOpen: true,
            editAnnouncement
        })
    }
    // opneing delete Announcement modal
    openDeleteAnnouncementModal = (id) => {
        this.setState({
            modalType: 'Delete Announcement',
            modalHeader: 'Delete Announcement',
            modalDescription: 'Are you sure to remove this announcement',
            modalOpen: true,
            activeAnnouncementId: id

        })
    }


    // open delete announcement pop up modal
    _deleteAnnouncement = () => {
        let { activeAnnouncementId } = this.state;


        deleteAnnoucement(activeAnnouncementId).then(res => {
            this.setState({
                modalOpen: false,
                modalType: '',
                modalHeader: '',
                modalDescription: '',
                activeAnnouncementId: ''
            }, () => {
                this.getAnnouncementList()
                this.props.customProps._toastMessage("success", res.message);
            })

        }).catch(err => {

            this.setState({
                modalOpen: false,
                modalType: '',
                modalHeader: '',
                modalDescription: '',
                activeAnnouncementId: '',
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

    // close popup modal
    close = () => {
        this.setState({
            modalOpen: false,
            modalType: '',
            modalHeader: '',
            modalDescription: '',
            editAnnouncement: {
                id: '',
                title: '',
                description: ''
            }
        })
    }

    // handle all input values of edit announcement popup
    _handleInput = (event) => {
        let { editAnnouncement } = this.state,
            { value, name } = event.target;

        editAnnouncement[name] = value

        this.setState({
            editAnnouncement
        })
    }
    // on the basis of modalheader calling add announcement api incase add announcement or edit announcement api incase edit announcement
    _submitModalDetail = () => {

        let { editAnnouncement, modalHeader } = this.state, data = {};

        if (this.AnnouncementValidator.allValid()) {
            if (modalHeader === "Add Announcement") {
                data = {
                    title: editAnnouncement.title,
                    description: editAnnouncement.description
                };
                // calling add announcement api
                addAnnouncements(data).then(res => {
                    this.setState({
                        showLoaderinPopUp: false,
                        modalOpen: false,
                        modalType: '',
                        modalHeader: '',
                        modalDescription: '',
                        editAnnouncement: {
                            id: '',
                            title: '',
                            description: ''
                        }
                    }, () => {
                        this.getAnnouncementList()
                        this.props.customProps._toastMessage("success", res.message);
                    })
                }).catch(err => {
                    this.setState({
                        showLoaderinPopUp: false,
                        modalOpen: false,
                        modalType: '',
                        modalHeader: '',
                        modalDescription: '',
                        editAnnouncement: {
                            id: '',
                            title: '',
                            description: ''
                        },
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

            } else {
                data = {
                    id: editAnnouncement.id,
                    title: editAnnouncement.title,
                    description: editAnnouncement.description
                };
                // calling update announcement api
                updateAnnouncements(data).then(res => {
                    this.setState({
                        showLoaderinPopUp: false,
                        modalOpen: false,
                        modalType: '',
                        modalHeader: '',
                        modalDescription: '',
                        editAnnouncement: {
                            id: '',
                            title: '',
                            description: ''
                        }

                    }, () => {
                        this.getAnnouncementList()
                        this.props.customProps._toastMessage("success", res.message);
                    })
                }).catch(err => {
                    this.setState({
                        showLoaderinPopUp: false,
                        modalOpen: false,
                        modalType: '',
                        modalHeader: '',
                        modalDescription: '',
                        editAnnouncement: {
                            id: '',
                            title: '',
                            description: ''
                        },
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
        } else {
            this.setState({
                showLoaderinPopUp: false

            }, () => {
                this.AnnouncementValidator.showMessages();
                this.forceUpdate();
            })

        }


    }
    // opening add announcement modal
    openAddAnnouncemntModal = () => {
        this.setState({
            modalType: 'Edit Announcement',
            modalHeader: 'Add Announcement',
            modalOpen: true,
        })
    }
    // make announcement active and visible on homepage
    toggleAnnouncement = (event, id, checked) => {
        this.activeAnnouncment(id, checked)
    }

    // calling activate announcment api and showing activated announcment in toggle button
    activeAnnouncment = (id, checked) => {
        let data = { status: checked };
        activateAnnouncement(id, data).then(res => {
            this.setState({
                hasDataLoad: true
            })
            this.props.customProps._toastMessage("success", res.message);
            this.getAnnouncementList();
        }).catch(err => {
            this.setState({
                hasDataLoad: false,
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

    // onchange of page show activve page number in pagination
    handlePaginationChange = (e, { activePage }) => {
        this.setState({
            page_number: activePage,
            hasDataLoad: true
        }, () => {
            this.getAnnouncementList()
        })
    }
    // handle dropdown inputs 
    handleRecordDropdown = (event, value) => {
        this.setState({
            page_size: value,
            page_number: 1,
            hasDataLoad: true
        }, () => {
            this.getAnnouncementList()
        })
    }

    // show loader in popup modal
    showLoader = () => {
        this.setState({
            showLoaderinPopUp: true
        }, () => {
            this._submitModalDetail()
        })
    }
// sorting columns in ascending or descending order
handleSort = (clickedColumn) => () => {
    const { column, direction } = this.state

    if (column !== clickedColumn) {
        this.setState({
            column: clickedColumn,
            // announcementList: announcementList.sort((a, b) =>{
            //     if(clickedColumn === 'status'){
            //        return (+a.status) - (+b.status)
            //     }
            //     if(a[clickedColumn] && b[clickedColumn]){
            //         var textA = a[clickedColumn].toUpperCase();
            //         var textB = b[clickedColumn].toUpperCase();
            //         return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            //     }
            // }),
            // teachersList: _.sortBy(this.state.teachersList, [clickedColumn]),
            direction: 'ascending',
        },()=>{
            this.getAnnouncementList()
        })
    }else{
        this.setState({
            // teachersList: this.state.announcementList.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        },()=>{
                this.getAnnouncementList()
            })
    }
}

    render() {
        let { announcementList,
            modalOpen,
            modalType,
            modalDescription,
            modalHeader,
            editAnnouncement,
            hasDataLoad,
            siblingRange,
            showFirstAndLastNav, showPreviousAndNextNav, showEllipsis,
            boundaryRange,
            total_pages,
            page_number,
            page_size,
            recordView,
            total_records,
            showLoaderinPopUp,
            column,direction
        } = this.state;
        return (
            <div>
                <PopUpModal
                    open={modalOpen}
                    type={modalType}
                    modalHeader={modalHeader}
                    description={modalDescription}
                    popUpValidation={this.AnnouncementValidator}
                    showLoaderinPopUp={showLoaderinPopUp}
                    close={this.close}
                    editAnnouncement={editAnnouncement}
                    showLoader={this.showLoader}
                    _handleInput={this._handleInput}
                    _deleteAnnouncement={this._deleteAnnouncement}
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
                                    <Grid.Column computer={10} tablet={5} />
                                    <Grid.Column computer={3} mobile={16} tablet={5} >
                                    <div className="w-100 text-center admin-mobile-page-heading m-v"> 
                                            <h2 className="ui header">Announcement list</h2>
                                            </div>
                                    </Grid.Column>
                                    <GridColumn computer={3} mobile={16} tablet={6}>
                                        <button className="ui blue inverted button right floated compact fluid" onClick={this.openAddAnnouncemntModal}>
                                            Add Announcement</button>
                                    </GridColumn>
                                </Grid.Row>
                            </Grid>
                            <div className="view-child mt-2rem">
                                <Table celled sortable fixed compact unstackable singleLine>
                                    <Table.Header>
                                        <Table.Row textAlign='center'>
                                            <Table.HeaderCell>Action</Table.HeaderCell>
                                            <Table.HeaderCell sorted={column === 'created_at' ? direction : null} onClick={this.handleSort('created_at')}>Date</Table.HeaderCell>
                                            <Table.HeaderCell sorted={column === 'title' ? direction : null} onClick={this.handleSort('title')}>Title</Table.HeaderCell>
                                            <Table.HeaderCell sorted={column === 'description' ? direction : null} onClick={this.handleSort('description')}>Announcement</Table.HeaderCell>
                                            <Table.HeaderCell sorted={column === 'status' ? direction : null} onClick={this.handleSort('status')}>Status</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {
                                            announcementList.length ?
                                                announcementList.map((value, index) => {
                                                    return (
                                                        <Table.Row textAlign='center' key={index}>
                                                            <Table.Cell>
                                                                <span className="table-icons-spacing">
                                                                    <i
                                                                        aria-hidden="true"
                                                                        className="pencil green small link icon view-icon"
                                                                        onClick={(event) => this.editAnnouncement(value.id, event)}

                                                                    ></i>
                                                                </span>
                                                                <span className="table-icons-spacing">
                                                                    <i
                                                                        aria-hidden="true"
                                                                        className="trash red alternate outline small link icon view-icon"
                                                                        onClick={(event) => this.openDeleteAnnouncementModal(value.id, event)}
                                                                    ></i>
                                                                </span>
                                                            </Table.Cell>
                                                            <Table.Cell title={moment(value.created_at).format("MM/DD/YYYY")} className="cursor-pointer">{moment(value.created_at).format("MM/DD/YYYY")}</Table.Cell>
                                                            <Table.Cell title={value.title} className="cursor-pointer">{value.title}</Table.Cell>
                                                            <Table.Cell title={value.description} className="cursor-pointer">
                                                                {
                                                                    value.description
                                                                }
                                                            </Table.Cell>
                                                            <Table.Cell collapsing>
                                                                <div className={`ui ${value.status ? 'checked' : ''} fitted toggle checkbox`} id={value.id} onClick={(e) => this.toggleAnnouncement(e, value.id, !(value.status))}>
                                                                    <input type="checkbox" className="hidden" checked={value.status ? "checked" : ''} />
                                                                    <label ></label>
                                                                </div>
                                                            </Table.Cell>
                                                        </Table.Row>
                                                    )
                                                })

                                                : <Table.Row className="top aligned center aligned">
                                                    <Table.Cell colSpan="4" className="center-table-text capitalize">No Announcement Found</Table.Cell>
                                                </Table.Row>
                                        }
                                    </Table.Body>
                                </Table>
                            </div>
                            <div className="mt-2rem">
                                {
                                    total_records >= 20 ?
                                        <Grid>
                                            <Grid.Row>
                                                <Grid.Column computer={6} mobile={16} >
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
                                                <Grid.Column computer={4} mobile={16} />
                                                <Grid.Column computer={6} mobile={16}>
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
                                        </Grid> : ''}
                            </div>
                        </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loginUserInfo: state.loginReducer.loginUserInfo,
})

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Announcement)