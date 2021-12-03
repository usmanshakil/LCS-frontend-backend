import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Table, Pagination, Dropdown } from "semantic-ui-react";
//api
import { viewAdminStudentExpiredList } from "../../../ApiAction/Admin";
//Constants
import { constants } from "../../";
//loader
import { Loaders } from "../../Shared";
//css
import "./ExpiredAndRenewalStudentsList.css";

class ExpiredAndRenewalStudentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUserInfo: props.loginUserInfo,
      studentList: [],
      isPageLoading: true,
      page_number: 1,
      page_size: 20,
      total_records: 0,
      total_pages: "",
      recordView: constants.SORT_RECORD,
      column: null,
      direction: null,
      showExpiredList: false,
      siblingRange: 1,
      boundaryRange: 0,
      showEllipsis: true,
      showPreviousAndNextNav: true
    };
  }

  componentDidMount() {
    if (this.props.loginUserInfo.role_id === 2) {
      this.showExpiredStudentList();
    } else {
      this.props.history.push("/home");
    }
  }

  //  show expired and renewal student list
  showExpiredStudentList = () => {
    let { showExpiredList, page_number, page_size } = this.state;
    viewAdminStudentExpiredList(showExpiredList, page_number, page_size)
      .then(res => {
        this.setState({
          //   studentList: res.data.length ? res.data : [],
          studentList: res.data,
          column: "first_name",
          // usersList: _.sortBy(this.state.studentList, [clickedColumn]),
          direction: "ascending",
          isPageLoading: false,
          total_records: res.total_records,
          total_pages: Math.ceil(res.total_records / this.state.page_size)
        });
      })
      .catch(err => {
        this.setState(
          {
            apiStatusCode: err ? err.status : 500,
            isPageLoading: false
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
  // onchange of page show activve page number in pagination
  handlePaginationChange = (e, { activePage }) => {
    this.setState(
      {
        page_number: activePage,
        isPageLoading: true
      },
      () => {
        this.showExpiredStudentList();
      }
    );
  };
  // sorting columns in ascending or descending order
  handleSort = clickedColumn => () => {
    const { column, direction, studentList } = this.state;
    if (clickedColumn === "phone" || clickedColumn === "email") {
      if (column !== clickedColumn) {
        this.setState({
          column: clickedColumn,
          usersList: studentList.sort((a, b) =>
            a.user[clickedColumn].localeCompare(b.user[clickedColumn], 0, {
              numeric: false
            })
          ),
          // usersList: _.sortBy(this.state.studentList, [clickedColumn]),
          direction: "ascending"
        });
        return;
      }
    } else {
      if (column !== clickedColumn) {
        this.setState({
          column: clickedColumn,
          usersList: studentList.sort((a, b) => {
            if (a[clickedColumn] && b[clickedColumn]) {
             return a[clickedColumn].localeCompare(b[clickedColumn], 0, {
                numeric: false
              });
            }
          }),
          // usersList: _.sortBy(this.state.studentList, [clickedColumn]),
          direction: "ascending"
        });
      }
    }

    this.setState({
      usersList: this.state.studentList.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };
  // show expired list
  toggleList = (event, showExpiredList) => {
    this.setState(
      {
        showExpiredList: showExpiredList,
        isPageLoading: true
      },
      () => {
        this.showExpiredStudentList();
      }
    );
  };

  // handle dropdown inputs
  handleRecordDropdown = (event, value) => {
    this.setState(
      {
        page_size: value,
        page_number: 1,
        isPageLoading: false
      },
      () => {
        this.showExpiredStudentList();
      }
    );
  };

  render() {
    let {
      page_number,
      page_size,
      total_records,
      column,
      direction,
      recordView,
      isPageLoading,
      total_pages,
      studentList,
      showExpiredList,
      siblingRange,
      boundaryRange,
      showEllipsis,
      showPreviousAndNextNav
    } = this.state;
    return (
      <div>
        <div>
          {isPageLoading === true ? (
            <div className="ui container">
              <Loaders isLoading={isPageLoading} />
            </div>
          ) : (
            <div
              className={`${
                studentList.length >= 20 ? "mb-5" : ""
              } ui container main-layout-height mt-2rem`}
            >
              <Grid>
                <Grid.Row>
                  <Grid.Column computer={5} mobile={1} />
                  <Grid.Column computer={5} mobile={1} />
                  <Grid.Column computer={6} mobile={16}>
                    <div className="ui compact right floated segment">
                      <label className="switch">
                        <input
                          type="checkbox"
                          id="togBtn"
                          onClick={event =>
                            this.toggleList(event, !showExpiredList)
                          }
                          checked={showExpiredList}
                        />
                        <div className="slider round">
                          <span className="renewal">Renewal</span>
                          <span className="expired">Expired</span>
                        </div>
                      </label>
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <div className="view-child mt-2rem">
                <Table celled sortable compact unstackable>
                  <Table.Header>
                    <Table.Row textAlign="center">
                      {/* <Table.HeaderCell
                        sorted={column === "FirstName" ? direction : null}
                        onClick={this.handleSort("FirstName")}
                      >
                        S.No
                      </Table.HeaderCell> */}
                      <Table.HeaderCell
                        sorted={column === "expiry_date" ? direction : null}
                        onClick={this.handleSort("expiry_date")}
                      >
                        {showExpiredList ? "Expired" : "Renewal"}
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        sorted={column === "first_name" ? direction : null}
                        onClick={this.handleSort("first_name")}
                      >
                        First Name
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        sorted={column === "last_name" ? direction : null}
                        onClick={this.handleSort("last_name")}
                      >
                        Last Name
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        sorted={column === "admission_date" ? direction : null}
                        onClick={this.handleSort("admission_date")}
                      >
                        Admission Date
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        sorted={column === "phone" ? direction : null}
                        onClick={this.handleSort("phone")}
                      >
                        Phone Number
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        sorted={column === "email" ? direction : null}
                        onClick={this.handleSort("email")}
                      >
                        Email
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {studentList.length ? (
                      studentList.map((value, index) => {
                        return (
                          <Table.Row
                            className="top aligned center aligned"
                            key={index}
                            index={index}
                          >
                            {/* <Table.Cell
                              title={index}
                              className="cursor-pointer"
                            >
                              {index + 1}
                            </Table.Cell> */}
                            <Table.Cell
                              title={value.expiry_date}
                              className="cursor-pointer"
                            >
                              {value.expiry_date}
                            </Table.Cell>

                            <Table.Cell
                              title={value.first_name}
                              className="cursor-pointer"
                            >
                              {value.first_name}
                            </Table.Cell>
                            <Table.Cell
                              title={value.last_name}
                              className="cursor-pointer"
                            >
                              {value.last_name}
                            </Table.Cell>
                            <Table.Cell
                              title={value.admission_date}
                              className="cursor-pointer"
                            >
                              {value.admission_date}
                            </Table.Cell>
                            <Table.Cell
                              title={value.user.phone}
                              className="cursor-pointer"
                            >
                              {value.user.phone}
                            </Table.Cell>
                            <Table.Cell
                              title={value.user.email}
                              className="cursor-pointer"
                            >
                              {value.user.email}
                            </Table.Cell>
                          </Table.Row>
                        );
                      })
                    ) : (
                      <tr className="top aligned center aligned">
                        <td className="allclasses-empty-msg" colSpan="6">
                          {" "}
                          No user found
                        </td>
                      </tr>
                    )}
                  </Table.Body>
                </Table>
                {total_records > 20 ? (
                  <div className="pagination-bar">
                    <div>
                      <label>Show Record:</label>
                      <Dropdown
                        compact
                        search
                        selection
                        className="record-limit-bar"
                        onChange={(event, { value }) =>
                          this.handleRecordDropdown(event, value)
                        }
                        options={recordView}
                        value={page_size}
                      ></Dropdown>
                      <label>Record per page</label>
                    </div>
                    <div>
                      <Pagination
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
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginUserInfo: state.loginReducer.loginUserInfo
});

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpiredAndRenewalStudentsList);
