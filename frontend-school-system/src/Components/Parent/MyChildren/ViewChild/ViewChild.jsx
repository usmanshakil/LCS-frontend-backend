import React, { Component } from "react";
import {
  Table,
  Container,
  Icon,
  Button,
  Grid,
  Pagination,
  Dropdown,
  Popup,
  Header,
} from "semantic-ui-react";
import { connect } from "react-redux";
import moment from "moment";
import Cookies from "js-cookie";
import SimpleReactValidator from "simple-react-validator";
//api
import { viewChild } from "../../../../ApiAction/View";
import {
  removeParentChild,
  renewStudentAdmission,
} from "../../../../ApiAction/Parent";
import {
  viewAdminStudentList,
  deleteChild,
  searchAdminStudentList,
  getSelectedStudent,
} from "../../../../ApiAction/Admin";
//popup mmodal
import { PopUpModal } from "../../../";
//Constants
import { constants } from "../../../";
//loader
import { Loaders } from "../../../Shared";
// component
// import { ViewChildAllData } from './ViewChildAllData';
//css
import "./ViewChild.css";
import { apiBaseUrl } from "../../../../ApiAction/DbConfig/ApiBaseUrl";
import ChildRecordCheckList from "../../../Admin/ChildRecordCheckList/ChildRecordCheckList";

class ViewChild extends Component {
  constructor(props) {
    super(props);
    this.state = {
      childForm: "",
      allChildInfo: [],
      childInfo: [],
      showChildAllInfo: false,
      childAllInfo: {},
      hasDataLoad: true,
      clearSearch: false,
      searchStudent: "",
      loginUserInfo: props.loginUserInfo,
      adminStudentList: [],
      column: "",
      direction: "",
      siblingRange: 1,
      page_number: 1,
      page_size: 20,
      total_records: 0,
      boundaryRange: 0,
      showFirstAndLastNav: true,
      showPreviousAndNextNav: true,
      showEllipsis: true,
      recordView: constants.SORT_RECORD,
      total_pages: "",
      apiStatusCode: "",
      activeStudentId: "",
      modalOpen: false,
      modalType: "",
      modalHeader: " ",
      modalDescription: "",
      editType: "",
      blankSignatureValidationMessage: "",
      userDropdown: constants.STUDENT_STATUS,
      status: "Active",
      token: Cookies.get("loginUserToken"),
      renewal_data: {
        new_admission_date: "",
        new_expiration_date: "",
        confirm_by_parent: false,
        parent_signature: "",
        parent_name: "",
        parent_signature_name: "",
        child_name: "",
      },
    };
    this.currentDate = moment().add(30, "days").format("MM/DD/YYYY");
    this.signaturePad = React.createRef();
    this.renewalAdmission = new SimpleReactValidator();
  }

  //set height and width of signature canvas
  fitToContainer = () => {
    //get element
    var canvas = document.querySelector("canvas");
    // Make it visually fill the positioned parent
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    // ...then set the internal size to match
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    return canvas;
  };
  componentWillMount() {
    if (this.props.loginUserInfo.role_id === 2) {
      this.getAdminChildList();
    } else if (this.props.loginUserInfo.role_id === 3) {
      this.getChildList();
    } else {
      this.props.history.push("/home");
    }
    this.formRef = React.createRef();
  }

  //clear signature from signature pad
  clearSignature = () => {
    this.signaturePad.current.clear();
  };
  //fetching admin student list
  getAdminChildList = () => {
    let { page_number, page_size, column, status, direction } = this.state;
    this.setState({ hasDataLoad: true });

    viewAdminStudentList(page_number, page_size, status, column, direction)
      .then((res) => {
        //filtering data from viewadmin student api
        console.log(
          "viewAdminChildList has response in getAdminChildList function as :",
         JSON.stringify( res.data)
        );
        let childInfoArray = this.getChildTableInfo(res.data);
        console.log("childInfoArray is :", JSON.stringify(childInfoArray));
        this.setState({
          adminStudentList: res.data,
          hasDataLoad: false,
          childInfo: childInfoArray.length ? childInfoArray : [],

          total_records: res.total_records,
          total_pages: Math.ceil(res.total_records / this.state.page_size),
        });
      })
      .catch((err) => {
        this.setState(
          {
            apiStatusCode: err ? err.status : 500,
            hasDataLoad: false,
            total_pages: Math.ceil(
              this.state.total_records / this.state.page_size
            ),
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
  //fetching parent child list
  getChildList = async () => {
    this.setState({ hasDataLoad: true });
    viewChild()
      .then((res) => {
        console.log("For parent, the viewCHild has response as:", res.data);
        let childInfoArray = this.getChildTableInfo(res.data);
        console.log("childInfoArray has value:", JSON.stringify(childInfoArray));

        this.setState({
          hasDataLoad: false,
          allChildInfo: res.data.length ? res.data : [],
          childInfo: childInfoArray,
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
 
  // getting child firstname lastname and other detail it is displayed in child view table
  getChildTableInfo = (allData) => {
    var childInfoArray = [];
    for (let child = 0; child < allData.length; child++) {
      let childInfoObj = {},
        renewalDate = "";
      childInfoObj.studentClassName = allData[child].class
        ? allData[child].class.class_name
        : "";
      childInfoObj.childFirstName = allData[child].first_name;
      childInfoObj.childLastName = allData[child].last_name;
      // find renewal date which is 1 year from admission date
      renewalDate = moment(allData[child].expiry_date);
      childInfoObj.childAdmissionRenewalDate = moment(renewalDate._d).format(
        "MM/DD/YYYY"
      );
      childInfoObj.childId = allData[child].id;
      if (allData[child].medicalInfo.length) {
        childInfoObj.medical_reports =
          allData[child].medicalInfo[0].medical_reports;
        // reportData.forEach(function(report){
        //   childInfoObj.physical_reports = report;
        // })
        // for (let medicalInfo = 0; medicalInfo < reportData.length; medicalInfo++) {
        //   childInfoObj.physical_reports = reportData.physical_reports
        //   // childInfoObj.medical_report_id = allData[child].medicalInfo[0].id
        // }
      } else {
        childInfoObj.medical_reports = [];
      }
      for (
        let parent = 0;
        parent < allData[child].parentInfo.length;
        parent++
      ) {
        if (allData[child].parentInfo[parent].parent_type === "parent1") {
          childInfoObj.parent1FirstName =
            allData[child].parentInfo[parent].first_name;
          childInfoObj.parent1LastName =
            allData[child].parentInfo[parent].last_name;
          childInfoObj.parent1Id = allData[child].parentInfo[parent].id;
        } else {
          childInfoObj.parent2FirstName =
            allData[child].parentInfo[parent].first_name;
          childInfoObj.parent2LastName =
            allData[child].parentInfo[parent].last_name;
          childInfoObj.parent2Id = allData[child].parentInfo[parent].id;
        }
      }
      childInfoArray.push(childInfoObj);
    }
    return childInfoArray;
  };
  // on clicking on add child redirect to add child page
  redirectToAddChildForm = () => {
    this.props.history.push({
      pathname: "/student/add",
      state: { editType: this.state.editType },
    });
  };

  //on clicking eye icon show specifc child all details
  showChildData = (event) => {
    let { loginUserInfo } = this.state,
      { id } = event.target;
    //Fetch student data from api
    this.setState({ hasDataLoad: true });
    getSelectedStudent(id)
      .then((res) => {
        this.setState({ hasDataLoad: false });
        this.props.history.push({
          pathname: `/student/view`,
          state: { childAllInfo: res.data, loginUserInfo },
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
    // if (loginUserInfo.role_id === 2) {
    //   childDetails = adminStudentList.filter(x => {
    //     if (x.id === parseInt(id)) {
    //       return x;
    //     }
    //   })
    //   this.props.history.push({
    //     pathname: `/student/view`,
    //     state: { childAllInfo: childDetails,loginUserInfo:this.state.loginUserInfo }
    //   });

    // } else {
    //   childDetails = allChildInfo.filter(x => {
    //     if (x.id === parseInt(id)) {
    //       return x
    //     }
    //   })
    //   this.props.history.push({
    //     pathname: `/student/view`,
    //     state: { childAllInfo: childDetails,loginUserInfo:this.state.loginUserInfo }
    //   });
    // }
  };

  // getting details of active child and passing data to add child component
  editChild = (event) => {
    let { loginUserInfo } = this.state,
      { id } = event.target;
    let editType = loginUserInfo.role_id === 2 ? "admin" : "parent";
    this.setState({ hasDataLoad: true });
    getSelectedStudent(id)
      .then((res) => {
        console.log(
          "getSelectedStudent Fn in editChild function is called and its response is:",
          res.data
        );
        this.setState({ hasDataLoad: false });
        this.props.history.push({
          pathname: "/student/edit",
          //state: { childForm: res.data, editType }
          state: { id: id, editType },
        });
        // this.setState({
        //   childForm: res.data,
        //   editType: editType
        // }, () => {
        //   this.props.history.push({
        //     pathname: '/student/edit',
        //     state: { childForm: this.state.childForm, editType: this.state.editType }
        //   })
        // })
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
    // if (loginUserInfo.role_id === 2) {
    //   childDetails = adminStudentList.filter(x => {
    //     if (x.id === parseInt(id)) {
    //       return x
    //     }
    //   })
    // } else {
    //   childDetails = allChildInfo.filter(x => {
    //     if (x.id === parseInt(id)) {
    //       return x
    //     }
    //   })
    // }
  };

  // showing confirm popup
  showDeleteConfirmation = (event) => {
    let { id } = event.target;

    this.setState({
      modalOpen: true,
      modalType: constants.DELETE_CONFIRMATION_MODAL,
      modalHeader: "Delete Student ",
      modalDescription: "Are you sure, you want to remove the student",
      activeStudentId: id,
    });
  };

  // when user click on proceed to yes button then delete api is called
  proceedToYes = () => {
    this.setState(
      {
        modalOpen: false,
        popupModalType: "",
        modalHeader: "",
        modalDescription: "",
        showPopUpModal: false,
        hasDataLoad: true,
      },
      () => {
        if (this.state.loginUserInfo.role_id === 2) {
          this.removeChild(this.state.activeStudentId);
        } else {
          this.deleteParentChild(this.state.activeStudentId);
        }
      }
    );
  };

  // close popup modal
  close = () => {
    if (this.state.modalType === "Error Modal") {
      this.setState(
        {
          modalOpen: false,
          modalType: "",
          modalHeader: "",
          modalDescription: "",
        },
        () => {
          this.props._removeToken();
        }
      );
    } else {
      this.setState({
        modalOpen: false,
        modalType: "",
        modalHeader: "",
        modalDescription: "",
        renewal_data: {
          new_admission_date: "",
          new_expiration_date: "",
          confirm_by_parent: false,
          parent_signature: "",
          parent_name: "",
          parent_signature_name: "",
          child_name: "",
        },
      });
    }
  };
  // remove child from list in parent view
  deleteParentChild = (id) => {
    removeParentChild(id)
      .then((res) => {
        this.setState(
          {
            modalOpen: false,
            modalType: "",
            modalHeader: "",
            modalDescription: "",
            hasDataLoad: false,
          },
          () => {
            this.props.customProps._toastMessage("success", res.message);
            this.getChildList();
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

  removeChild = (id) => {
    deleteChild(id)
      .then((res) => {
        this.setState(
          {
            modalOpen: false,
            modalType: "",
            modalHeader: "",
            modalDescription: "",
          },
          () => {
            this.props.customProps._toastMessage("success", res.message);
            this.getAdminChildList();
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

  //handle input of search child input box
  handleSearchInput = (event) => {
    let { value } = event.target;

    this.setState({
      searchStudent: value,
    });
  };

  //searching child in table
  searchChildInTable = () => {
    let { searchStudent, loginUserInfo } = this.state;
    if (searchStudent === "") {
      this.props.customProps._toastMessage("error", "please enter valid input");
    } else {
      this.setState(
        {
          hasDataLoad: true,
          clearSearch: true,
        },
        () => {
          if (loginUserInfo.role_id === 2) {
            this.searchAdminStudentList();
          }
        }
      );
    }
  };
  // search student list in admin module
  searchAdminStudentList = () => {
    let {
      searchStudent,
      column,
      status,
      direction,
      page_number,
      page_size,
    } = this.state;
    searchAdminStudentList(
      searchStudent,
      status,
      column,
      direction,
      page_number,
      page_size
    )
      .then((res) => {
        let childInfoArray = this.getChildTableInfo(res.data);
        this.setState({
          adminStudentList: res.data,
          // adminStudentList: res.data.length?res.data.sort((a, b) =>{
          //   if(a[column] && b[column]){
          //     var textA = a[column].toUpperCase();
          //     var textB = b[column].toUpperCase();
          //     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
          // }
          // }):[],
          hasDataLoad: false,
          childInfo: childInfoArray,
          total_records: 0,
          page_number: 1,
          page_size: 20,
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

  //clearing search input box and fetching user list
  clearSearch = () => {
    this.setState(
      {
        searchStudent: "",
        clearSearch: false,
        hasDataLoad: true,
      },
      () => {
        if (this.state.loginUserInfo.role_id === 2) {
          this.getAdminChildList();
        } else {
          this.getChildList();
        }
      }
    );
  };

  // sorting columns in ascending or descending order
  handleSort = (clickedColumn) => () => {
    const { column, direction, searchStudent } = this.state;
    if (column !== clickedColumn) {
      this.setState(
        {
          column: clickedColumn,
          hasDataLoad: true,
          direction: "ascending",
        },
        () => {
          this.getAdminChildList();
        }
      );
    } else {
      this.setState(
        {
          direction: direction === "ascending" ? "descending" : "ascending",
          hasDataLoad: true,
        },
        () => {
          if (this.state.loginUserInfo.role_id === 2) {
            searchStudent
              ? this.searchAdminStudentList()
              : this.getAdminChildList();
          } else {
            searchStudent ? this.searchChildInTable() : this.getChildList();
          }
        }
      );
    }
  };

  //handle dropdown page
  handleRecordDropdown = (e, value) => {
    this.setState(
      {
        page_size: value,
      },
      () => {
        if (this.props.loginUserInfo.role_id === 2) {
          this.getAdminChildList();
        } else {
          this.getChildList();
        }
      }
    );
  };

  // onchange of page show activve page number in pagination
  handlePaginationChange = (e, { activePage }) => {
    this.setState(
      {
        page_number: activePage,
        hasDataLoad: true,
      },
      () => {
        if (this.props.loginUserInfo.role_id === 2) {
          this.getAdminChildList();
        } else {
          this.getChildList();
        }
      }
    );
  };
  // handle dropdown inputs
  handleRecordDropdown = (event, value) => {
    this.setState(
      {
        page_size: value,
        page_number: 1,
        hasDataLoad: true,
      },
      () => {
        if (this.props.loginUserInfo.role_id === 2) {
          this.getAdminChildList();
        } else {
          this.getChildList();
        }
      }
    );
  };
  clearRenewalError = () => {
    this.renewalAdmission.hideMessages();
    this.forceUpdate();
  };
  _handleInput = (event) => {
    this.clearRenewalError();
    if (event.target.name === "confirm_by_parent") {
      let { name, checked } = event.target,
        { renewal_data } = this.state;
      renewal_data[name] = checked;
      this.setState({
        renewal_data,
      });
    } else {
      let { name, value } = event.target,
        { renewal_data } = this.state;
      renewal_data[name] = value;
      this.setState({
        renewal_data,
      });
    }
  };
  //Renew student admission
  renewAdmission = (event) => {
    let { id } = event.target;
    let { childInfo, renewal_data, loginUserInfo } = this.state;
    let curChild = childInfo[id];
    let new_admission_date = moment().format("MM/DD/YYYY"),
      new_expiration_date = moment().add(1, "year").format("MM/DD/YYYY");
    renewal_data.new_admission_date = new_admission_date;
    renewal_data.new_expiration_date = new_expiration_date;
    renewal_data.child_name = `${curChild.childFirstName} ${curChild.childLastName}`;
    console.log("I have the following data for renewal child", renewal_data);
    if (loginUserInfo.role_id === 3) {
      this.setState(
        {
          modalOpen: true,
          modalType: constants.RENEWAL_ADMISSION_DATE_MODAL,
          modalHeader: "Renew Admission",
          activeStudentId: curChild.childId,
          renewal_data,
        },
        () => {
          this.fitToContainer();
        }
      );
    } else {
      this.setState({
        modalOpen: true,
        modalType: constants.RENEWAL_ADMISSION_DATE_MODAL,
        modalHeader: "Renew Admission",
        activeStudentId: curChild.childId,
        renewal_data,
      });
    }
  };
  submitRenewal = () => {
    let { renewal_data, activeStudentId, loginUserInfo } = this.state;
    if (loginUserInfo.role_id === 3) {
      if (this.renewalAdmission.allValid()) {
        if (this.signaturePad.current.isEmpty()) {
          this.setState({
            blankSignatureValidationMessage: `The parent signature field is required`,
          });
          return false;
        }
        let data = {
          expiry_date: renewal_data.new_expiration_date,
          child_id: activeStudentId,
          child_name: renewal_data.child_name,
          parent_signature: this.signaturePad.current.toDataURL("image/png"),
          parent_signature_name: renewal_data.parent_signature_name,
        };
        console.log(
          "I have the following Data for parent renewal date :",
          data
        );
        renewStudentAdmission(data)
          .then((res) => {
            console.log("I have all the response of submit renewal : ", res);
            if (loginUserInfo.role_id == 2) {
              this.getAdminChildList();
            } else if (loginUserInfo.role_id == 3) {
              this.getChildList();
            }

            this.props.customProps._toastMessage("success", res.message);
            this.close();
          })
          .catch((error) => {
            this.props.customProps._toastMessage("error", error.message);
          });
      } else {
        this.renewalAdmission.showMessages();
        this.forceUpdate();
      }
    }

    //For admin .....
    else {
      if (this.renewalAdmission.allValid()) {
        let data = {
          expiry_date: renewal_data.new_expiration_date,
          child_id: activeStudentId,
          child_name: renewal_data.child_name,
          parent_signature: "",
          parent_signature_name: "",
        };
        console.log("I have this data for admin child renewal", data);
        renewStudentAdmission(data)
          .then((res) => {
            console.log("RenewStudentAdmission has response", res);
            this.getAdminChildList();
            this.props.customProps._toastMessage("success", res.message);
            this.close();
          })
          .catch((error) => {
            this.props.customProps._toastMessage("error", error.message);
          });
      } else {
        this.renewalAdmission.showMessages();
        this.forceUpdate();
      }
    }
  };
  // show data on change of student status dropdown
  handleDropdown = (value, event) => {
    this.setState(
      {
        isLoading: true,
        status: value,
      },
      () => {
        if (this.state.searchStudent) {
          this.searchChildInTable();
        } else {
          this.getAdminChildList();
        }
      }
    );
  };

  render() {
    let {
      childInfo,
      // showChildAllInfo,
      // childAllInfo,
      hasDataLoad,
      clearSearch,
      searchStudent,
      loginUserInfo,
      column,
      direction,
      siblingRange,
      showFirstAndLastNav,
      showPreviousAndNextNav,
      showEllipsis,
      boundaryRange,
      total_pages,
      page_number,
      page_size,
      recordView,
      total_records,
      modalOpen,
      modalType,
      modalHeader,
      addTeacherModal,
      isModalLoading,
      modalDescription,
      renewal_data,
      blankSignatureValidationMessage,
      userDropdown,
      status,
      token,
    } = this.state;

    return (
      <div ref={this.formRef}>
        <PopUpModal
          open={modalOpen}
          type={modalType}
          modalHeader={modalHeader}
          isModalLoading={isModalLoading}
          close={this.close}
          addTeacherModal={addTeacherModal}
          pop_up_validation={this.renewalAdmission}
          showLoader={this.showLoader}
          modalDescription={modalDescription}
          _handle_input={this._handleInput}
          proceedToYes={this.proceedToYes}
          renewal_data={renewal_data}
          signature_pad={this.signaturePad}
          logged_User={loginUserInfo}
          blankSignatureValidationMessage={blankSignatureValidationMessage}
          clear_signature={this.clearSignature}
          submit_renewal={this.submitRenewal}
        />
        {
          // showChildAllInfo ?
          //   <ViewChildAllData childAllInfo={childAllInfo} loginUserInfo={loginUserInfo} formRef={this.formRef}/>
          //   :
          hasDataLoad ? (
            <div className="ui container">
              <Loaders isLoading={hasDataLoad} />
            </div>
          ) : (
            <Container
              className={`${
                total_records >= 20 ? "mb-5" : ""
              } main-layout-height mt-2rem view-child-page`}
            >
 
              <Grid>
                {loginUserInfo.role_id === 2 ? (
                  " "
                ) : (
                  <Grid.Row>
                    <Grid.Column computer={6} tablet={8} />
                    <Grid.Column computer={8} tablet={5} />
                    <Grid.Column computer={2} tablet={3} mobile={16}>
                      <Button
                        color="teal"
                        fluid
                        onClick={this.redirectToAddChildForm}
                      >
                        Add Child
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                )}

                {loginUserInfo.role_id === 2 ? (
                  <Grid.Row>
                    <Grid.Column computer={5} tablet={5} mobile={16}>
                      <div className="w-100 text-center admin-mobile-page-heading m-v">
                        <h2 className="ui header">Child list</h2>
                      </div>
                      <div className=""> 
                      <button
                            className="ui green   button"
                            onClick={()=> this.props.history.push('/students/childRecordCheckList')}
                          >
                        Children Record CheckList 
                          </button> 
                      </div>
                    </Grid.Column>
                    <Grid.Column computer={4} tablet={4} />
                    <Grid.Column computer={4} tablet={4} mobile={16}>
                      <div className="ui fluid action input"> 
                        <input
                          type="text"
                          placeholder="Search"
                          value={searchStudent}
                          onChange={this.handleSearchInput}
                        />
                        {clearSearch === false ? (
                          <button
                            className="ui green icon button"
                            onClick={this.searchChildInTable}
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
                    <Grid.Column computer={3} tablet={3} mobile={16}>
                      <div className="margin-top-5">
                        <Dropdown
                          fluid
                          selection
                          options={userDropdown}
                          // defaultValue={userDropdown[0].value}
                          value={status}
                          onChange={(event, { value }) =>
                            this.handleDropdown(value, event)
                          }
                        />
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                ) : (
                  ""
                )}
                {/* <div className={`${loginUserInfo.role_id === 2 ? "" : "mt-2rem"}`} /> */}
              </Grid>
              <Grid.Row className="view-child mt-2rem">
                <Grid.Column computer={16} tablet={16} mobile={16}>
                  <Table celled sortable compact unstackable singleLine>
                    <Table.Header>
                      <Table.Row textAlign="center">
                        <Table.HeaderCell>Action</Table.HeaderCell>
                        {/* incase of parent renewal column is displayed  */}
                        {/* <Table.HeaderCell>Documents</Table.HeaderCell> */}
                        <Table.HeaderCell
                        // sorted={column === 'renewal' ? direction : null}
                        // onClick={this.handleSort('renewal')}
                        >
                          Renewal
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          sorted={
                            column === "childFirstName" ? direction : null
                          }
                          onClick={this.handleSort("childFirstName")}
                        >
                          Child First Name
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          sorted={column === "childLastName" ? direction : null}
                          onClick={this.handleSort("childLastName")}
                        >
                          Child Last Name
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          sorted={
                            column === "parent1FirstName" ? direction : null
                          }
                          onClick={this.handleSort("parent1FirstName")}
                        >
                          P1 First Name
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          sorted={
                            column === "parent1LastName" ? direction : null
                          }
                          onClick={this.handleSort("parent1LastName")}
                        >
                          P1 Last Name
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          sorted={
                            column === "parent2FirstName" ? direction : null
                          }
                          onClick={this.handleSort("parent2FirstName")}
                        >
                          P2 First Name
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          sorted={
                            column === "parent2LastName" ? direction : null
                          }
                          onClick={this.handleSort("parent2LastName")}
                        >
                          P2 Last Name
                        </Table.HeaderCell>

                        <Table.HeaderCell
                          sorted={
                            column === "studentClassName" ? direction : null
                          }
                          onClick={this.handleSort("studentClassName")}
                        >
                          Class
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {childInfo.length ? (
                        childInfo.map((value, index) => {
                          return (
                            <Table.Row key={index} textAlign="center">
                              <Table.Cell>
                                {loginUserInfo.role_id === 2 ? (
                                  <span className="table-icons-spacing">
                                    <Icon
                                      name="eye"
                                      className="view-icon"
                                      link
                                      size="small"
                                      title="View Child"
                                      color="blue"
                                      onClick={this.showChildData}
                                      id={value.childId}
                                    />
                                  </span>
                                ) : (
                                  ""
                                )}
                                <span className="table-icons-spacing">
                                  <Icon
                                    name="edit"
                                    className="view-icon"
                                    link
                                    size="small"
                                    title="Edit Child"
                                    color="green"
                                    onClick={this.editChild}
                                    id={value.childId}
                                  />
                                </span>
                                {loginUserInfo.role_id === 3 ||
                                loginUserInfo.role_id === 2 ? (
                                  <span className="table-icons-spacing">
                                    <Icon
                                      name="calendar alternate"
                                      className="view-icon"
                                      link
                                      size="small"
                                      title="Renew Admission"
                                      color={
                                        Date.parse(this.currentDate) <
                                        Date.parse(
                                          value.childAdmissionRenewalDate
                                        )
                                          ? "blue"
                                          : "red"
                                      }
                                      onClick={this.renewAdmission}
                                      id={index}
                                      disabled={
                                        Date.parse(this.currentDate) <
                                        Date.parse(
                                          value.childAdmissionRenewalDate
                                        )
                                      }
                                    />
                                  </span>
                                ) : (
                                  ""
                                )}
                                <Popup
                                  trigger={
                                    <span className="table-icons-spacing">
                                      <Icon
                                        name="file alternate outline"
                                        link
                                        className="view-icon"
                                        color="teal"
                                        size="small"
                                        disabled={
                                          value.medical_reports.length
                                            ? false
                                            : true
                                        }
                                      />
                                    </span>
                                  }
                                  flowing
                                  hoverable
                                  disabled={
                                    value.medical_reports.length ? false : true
                                  }
                                >
                                  <Grid
                                    centered
                                    divided
                                    columns={
                                      value.medical_reports.length === 0
                                        ? 1
                                        : value.medical_reports.length
                                    }
                                  >
                                    {value.medical_reports.length ? (
                                      value.medical_reports.map(
                                        (data, index) => {
                                          return (
                                            <Grid.Column
                                              textAlign="center"
                                              disabled={
                                                data === "" ? true : false
                                              }
                                              key={`${data.physical_report}-${index}`}
                                            >
                                              {data === "" ? (
                                                <Header as="h4">
                                                  No File Available
                                                </Header>
                                              ) : (
                                                <Header as="h4">
                                                  File {index + 1}
                                                </Header>
                                              )}
                                              {data === "" ? (
                                                ""
                                              ) : (
                                                <a
                                                  href={
                                                    apiBaseUrl +
                                                    "/download/report/" +
                                                    value.childId +
                                                    "/" +
                                                    data.physical_report +
                                                    "/" +
                                                    token
                                                  }
                                                  target="blank"
                                                  rel="noopener noreferrer"
                                                >
                                                  Download
                                                </a>
                                              )}
                                            </Grid.Column>
                                          );
                                        }
                                      )
                                    ) : (
                                      <Grid.Column textAlign="center">
                                        <Header as="h4">
                                          No Report Available
                                        </Header>
                                      </Grid.Column>
                                    )}
                                  </Grid>
                                </Popup>
                                <span className="table-icons-spacing">
                                  <Icon
                                    name="trash alternate outline"
                                    className="view-icon"
                                    link
                                    size="small"
                                    title="Delete Child"
                                    color="red"
                                    onClick={this.showDeleteConfirmation}
                                    id={value.childId}
                                  />
                                </span>
                              </Table.Cell>
                              <Table.Cell
                                title={value.childAdmissionRenewalDate}
                                className="cursor-pointer"
                              >
                                {value.childAdmissionRenewalDate}
                              </Table.Cell>
                              <Table.Cell
                                title={value.childFirstName}
                                className="cursor-pointer"
                              >
                                {value.childFirstName}
                              </Table.Cell>
                              <Table.Cell
                                title={value.childLastName}
                                className="cursor-pointer"
                              >
                                {value.childLastName}
                              </Table.Cell>
                              <Table.Cell
                                title={value.parent1FirstName}
                                className="cursor-pointer"
                              >
                                {value.parent1FirstName}
                              </Table.Cell>
                              <Table.Cell
                                title={value.parent1LastName}
                                className="cursor-pointer"
                              >
                                {value.parent1LastName}
                              </Table.Cell>
                              <Table.Cell
                                title={value.parent2FirstName}
                                className="cursor-pointer"
                              >
                                {value.parent2FirstName}
                              </Table.Cell>
                              <Table.Cell
                                title={value.parent2LastName}
                                className="cursor-pointer"
                              >
                                {value.parent2LastName}
                              </Table.Cell>
                              <Table.Cell
                                title={value.studentClassName}
                                className="cursor-pointer"
                              >
                                {value.studentClassName}
                              </Table.Cell>
                            </Table.Row>
                          );
                        })
                      ) : (
                        <Table.Row>
                          <Table.Cell
                            colSpan="7"
                            className="center-table-text capitalize"
                          >
                            no record found
                          </Table.Cell>
                        </Table.Row>
                      )}
                    </Table.Body>
                  </Table>
                </Grid.Column>
              </Grid.Row>
              {total_records >= 20 ? (
                <Grid>
                  <Grid.Row className="mt-2rem">
                    <Grid.Column computer={6} mobile={16}>
                      <label className="mr-5">Show Record:</label>
                      <Dropdown
                        // defaultValue={recordView[0].value}
                        compact
                        selection
                        options={recordView}
                        value={page_size}
                        onChange={(event, { value }) =>
                          this.handleRecordDropdown(event, value)
                        }
                      ></Dropdown>
                      <label className="ml-5">Record per page</label>
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
                </Grid>
              ) : (
                ""
              )}
            </Container>
          )
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewChild);
