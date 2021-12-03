import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Grid,
  Button,
  Dropdown,
  Pagination,
} from "semantic-ui-react";
//API actions
import { viewTeacherClass } from "../../../ApiAction/View";
import {
  viewAdminClassList,
  deleteClass,
  searchClassFromClassList,
} from "../../../ApiAction/Admin";
//popupmodal
import { PopUpModal } from "../../Shared/PopupModal/PopupModal";
//loaders
import { Loaders } from "../../Shared";
//Constants
import { constants } from "../../";
//CSS
import "./ViewClasses.css";

class ViewClasses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUserInfo: props.loginUserInfo,
      searchClass: "",
      allClassesInfo: [],
      classInfo: "",
      showClassInfo: false,
      clearSearchClass: false,
      activeClassId: "",
      page_number: 1,
      page_size: 20,
      total_records: 0,
      recordView: constants.SORT_RECORD,
      total_pages: "",
      popupModalType: "",
      showPopUpModal: false,
      modalHeading: "",
      modalDescription: "",
      deleteClassId: "",
      hasDataLoad: true,
      apiStatusCode: "",
    };
  }

  componentWillMount() {
    // calling api according to user role
    if (this.props.loginUserInfo.role_id === 2) {
      this.adminClassesList();
    } else if (this.props.loginUserInfo.role_id === 4) {
      // this.getTeacherClassList();
      this.props.history.push("/home");
    } else {
      this.props.history.push("/home");
    }
  }

  // fetching class list for admin module
  adminClassesList = () => {
    let { page_number, page_size } = this.state;

    viewAdminClassList(page_number, page_size)
      .then((res) => {
        console.log(
          "I have the following res.data for viewAdminClassList",
          res.data
        );
        this.setState({
          allClassesInfo: res.data,
          total_records: res.total_records,
          total_pages: Math.ceil(res.total_records / this.state.page_size),
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

  //getting class list of teacher
  getTeacherClassList = () => {
    viewTeacherClass()
      .then((res) => {
        this.setState({
          allClassesInfo: res.data,
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

  //handle input when user enter text in search class textbox
  handleSearchInput = (event) => {
    let { value } = event.target;
    this.setState({
      searchClass: value,
    });
  };

  //when user search class in table here search data is fetched in table
  searchClassInTable = () => {
    let { searchClass } = this.state;
    // check if search value is empty
    if (searchClass === "") {
      this.props.customProps._toastMessage("error", "please enter valid input");
    } else {
      this.setState(
        {
          hasDataLoad: true,
        },
        () => {
          this.showClassSearchResult();
        }
      );
    }
  };

  // here search api is called and latest data is updated in table
  showClassSearchResult = () => {
    let { searchClass } = this.state;
    searchClassFromClassList(searchClass)
      .then((res) => {
        this.setState({
          allClassesInfo: res.data,
          clearSearchClass: true,
          total_records: res.total_records,
          total_pages: Math.ceil(res.total_records / this.state.page_size),
          hasDataLoad: false,
        });
      })
      .catch((err) => {
        this.setState(
          {
            apiStatusCode: err ? err.status : 500,
            clearSearchClass: false,
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

  // on clicking on eye icon in table load specific table data
  viewClassDetail = (id, event) => {
    let { allClassesInfo, classInfo } = this.state;

    classInfo = allClassesInfo.filter((x) => {
      if (id === x.id) {
        return x;
      }
    });

    this.setState(
      {
        classInfo: classInfo,
        showClassInfo: true,
        activeClassId: id,
      },
      () => {
        this.props.history.push({
          pathname: "/view-assigned-class",
          state: {
            classInfo: this.state.classInfo,
            loginUserInfo: this.state.loginUserInfo,
          },
        });
      }
    );
  };

  //text in search textbox is cleared and class list is retrievec
  clearSearch = () => {
    this.setState(
      {
        searchClass: "",
        clearSearchClass: false,
        hasDataLoad: true,
      },
      () => {
        if (this.state.loginUserInfo.role_id === 2) {
          this.adminClassesList();
        } else {
          this.getTeacherClassList();
        }
      }
    );
  };

  //when user choose next page pagenumber is updated
  changePage = (event, { value }) => {};

  //getting id of active class fetching current class and redirect to edit class
  editClassDetail = (id, event) => {
    let { allClassesInfo, classInfo } = this.state;

    classInfo = allClassesInfo.filter((x) => {
      if (id === x.id) {
        return x;
      }
    })[0];

    this.setState(
      {
        classInfo: classInfo,
        activeClassId: id,
      },
      () => {
        this.props.history.push({
          pathname: `/edit-assigned-class`,
          state: { classInfo: this.state.classInfo },
        });
      }
    );
  };

  //deleting class from classes table
  deleteClassDetail = (id, event) => {
    deleteClass(id)
      .then((res) => {
        this.setState(
          {
            popupModalType: "",
            modalHeading: "",
            modalDescription: "",
            showPopUpModal: false,
            deleteClassId: "",
          },
          () => {
            this.props.customProps._toastMessage("success", res.message);
            this.adminClassesList();
          }
        );
      })
      .catch((err) => {
        this.setState(
          {
            apiStatusCode: err ? err.status : 500,
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

  //handle dropdown page
  handleRecordDropdown = (e, value) => {
    this.setState(
      {
        page_size: value,
      },
      () => {
        if (this.props.loginUserInfo.role_id === 2) {
          this.adminClassesList();
        } else {
          this.getTeacherClassList();
        }
      }
    );
  };
  //showing popup visiblity true
  showConfirmDeletePopUp = (id, event) => {
    this.setState({
      popupModalType: constants.DELETE_CONFIRMATION_MODAL,
      showPopUpModal: true,
      modalHeading: "Delete class",
      modalDescription: "Are you sure you want to Remove class",
      deleteClassId: id,
    });
  };
  //showing popup visiblity false
  hideConfirmDeletePopUp = () => {
    this.setState({
      popupModalType: "",
      modalHeading: "",
      modalDescription: "",
      showPopUpModal: false,
      deleteClassId: "",
    });
  };

  // opening add class page
  openAddClassPage = () => {
    this.props.history.push("/classes/add");
  };

  render() {
    let {
      searchClass,
      allClassesInfo,
      clearSearchClass,
      loginUserInfo,
      recordView,
      total_pages,
      total_records,
      page_number,
      page_size,
      showPopUpModal,
      popupModalType,
      modalDescription,
      modalHeading,
      deleteClassId,
      hasDataLoad,
    } = this.state;
    return (
      <div>
        {showPopUpModal === true ? (
          <PopUpModal
            type={popupModalType}
            open={showPopUpModal}
            proceedToYes={(event) =>
              this.deleteClassDetail(deleteClassId, event)
            }
            close={this.hideConfirmDeletePopUp}
            modalHeading={modalHeading}
            modalDescription={modalDescription}
          />
        ) : hasDataLoad ? (
          <div className="ui container">
            <Loaders isLoading={hasDataLoad} />
          </div>
        ) : (
          <Container className="mt-2rem main-layout-height">
            {/* {loginUserInfo.role_id === 2 ? '' : <h2>Classes List</h2>} */}
            <Grid>
              <Grid.Row>
                <Grid.Column
                  computer={loginUserInfo.role_id === 2 ? 9 : 5}
                  mobile={16}
                  tablet={5}
                >
                  <div className="w-100 text-center admin-mobile-page-heading">
                    <h2>Classes List</h2>
                  </div>
                </Grid.Column>
                {loginUserInfo.role_id === 2 ? (
                  ""
                ) : (
                  <Grid.Column computer={5} mobile={1} />
                )}
                <Grid.Column
                  computer={loginUserInfo.role_id === 2 ? 5 : 6}
                  mobile={15}
                  tablet={6}
                >
                  <div className={`ui fluid action input `}>
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchClass}
                      onChange={this.handleSearchInput}
                    />
                    {clearSearchClass === false ? (
                      <button
                        className="ui green icon button"
                        onClick={this.searchClassInTable}
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
                {loginUserInfo.role_id === 2 ? (
                  <Grid.Column computer={2} mobile={16} tablet={5}>
                    <Button
                      color="blue"
                      fluid
                      inverted
                      onClick={this.openAddClassPage}
                      content="Add Class"
                      className="add-class-btn"
                    />
                  </Grid.Column>
                ) : (
                  ""
                )}
              </Grid.Row>
            </Grid>

            <table
              className={`ui unstackable celled compact table table-theme-${loginUserInfo.role_id}`}
            >
              <thead>
                <tr className="center aligned">
                  <th>Action</th>
                  <th>Class name </th>
                  <th>Class age </th>
                </tr>
              </thead>
              <tbody>
                {allClassesInfo.length ? (
                  allClassesInfo.map((value, id) => {
                    return (
                      <tr key={id} className="center aligned">
                        <td>
                          <i
                            aria-hidden="true"
                            className="eye blue small link icon view-icon"
                            onClick={(event) =>
                              this.viewClassDetail(value.id, event)
                            }
                          ></i>
                          {loginUserInfo.role_id === 2 ? (
                            <span className="table-icons-spacing">
                              <i
                                aria-hidden="true"
                                className="pencil green alternate small link icon view-icon"
                                onClick={(event) =>
                                  this.editClassDetail(value.id, event)
                                }
                              ></i>
                            </span>
                          ) : (
                            ""
                          )}
                          {loginUserInfo.role_id === 2 ? (
                            <span className="table-icons-spacing">
                              <i
                                aria-hidden="true"
                                className="trash red alternate outline small link icon view-icon"
                                onClick={(event) =>
                                  this.showConfirmDeletePopUp(value.id, event)
                                }
                              ></i>
                            </span>
                          ) : (
                            ""
                          )}
                        </td>
                        <td>{value.class_name}</td>
                        <td>{value.class_age}</td>
                        {/* <td >{value.students}</td> */}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td className="allclasses-empty-msg" colSpan={3}>
                      {" "}
                      No Class Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {total_records > 20 ? (
              <Grid>
                <Grid.Row>
                  <Grid.Column computer={5} mobile={16} tablet={6}>
                    <label>Show Record:</label>
                    <Dropdown
                      defaultValue={recordView[0].value}
                      compact
                      search
                      selection
                      onChange={this.handleRecordDropdown}
                      options={recordView}
                      value={page_size}
                    ></Dropdown>
                    <label>Record per page</label>
                  </Grid.Column>
                  <Grid.Column computer={5} mobile={5} tablet={5} />
                  <Grid.Column computer={5} mobile={16} tablet={5}>
                    {total_records > 20 ? (
                      <Pagination
                        defaultActivePage={page_number}
                        firstItem={null}
                        lastItem={null}
                        pointing
                        secondary
                        onPageChange={this.changePage}
                        totalPages={total_pages}
                      />
                    ) : (
                      ""
                    )}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            ) : (
              ""
            )}
          </Container>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loginUserInfo: state.loginReducer.loginUserInfo,
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewClasses);
