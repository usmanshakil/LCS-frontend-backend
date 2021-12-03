import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
//APi
import { viewStudentList } from '../../../ApiAction/Teacher';
//constant
import { constants } from '../../'
//Loader
import { Loaders } from '../../Shared';

class TeacherStudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUserInfo: props.loginUserInfo,
      total_records: 0,
      recordView: constants.SORT_RECORD,
      total_pages: '',
      studentList: [],
      hasDataLoad: true,
      apiStatusCode: '',
    }
  }

  componentWillMount() {
    if(this.props.loginUserInfo.role_id === 4){
      this.getStudentList()
    }else{
          this.props.history.push('/home')
      }
  }
  // get assigned student list to  active teacher
  getStudentList = () => {
    viewStudentList().then(res => {
      let childInfoArray = res.data.length ? this.getChildTableInfo(res.data) : [];
      this.setState({
        studentList: childInfoArray,
        hasDataLoad: false
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


  // getting child firstname lastname and other detail it is displayed in child view table
  getChildTableInfo = (allData) => {

    var childInfoArray = [];

    for (let child = 0; child < allData.length; child++) {
      let childInfoObj = {}, renewalDate = '';
      childInfoObj.childFullName = allData[child].first_name + ' ' + allData[child].last_name;
      // find renewal date which is 1 year from admission date
      renewalDate = moment(allData[child].admission_date).add(1, 'year');
      childInfoObj.childAdmissionRenewalDate = moment(renewalDate._d).format("MM/DD/YYYY")
      childInfoObj.childId = allData[child].id
      childInfoObj.class_name = allData[child].class.class_name
      childInfoObj.room = allData[child].class.room
      childInfoObj.location = allData[child].class.location

      for (let parent = 0; parent < allData[child].parentInfo.length; parent++) {

        if (allData[child].parentInfo[parent].parent_type === "parent1") {
          childInfoObj.parent1FullName = allData[child].parentInfo[parent].first_name + ' ' + allData[child].parentInfo[parent].last_name;
          childInfoObj.parent1Id = allData[child].parentInfo[parent].id
        } else {
          childInfoObj.parent2FullName = allData[child].parentInfo[parent].first_name + ' ' + allData[child].parentInfo[parent].last_name;
          childInfoObj.parent2Id = allData[child].parentInfo[parent].id
        }
      }

      childInfoArray.push(childInfoObj)
    }
    return childInfoArray
  }




  render() {

    let { studentList, hasDataLoad } = this.state;

    return (
      <div>

        {
          hasDataLoad ?
          <div className="ui container">
          <Loaders  isLoading={hasDataLoad} />
          </div>
          :
          <div className="ui container main-layout-height mt-2rem">
            <div className="ui grid">
              <div className="row">
                <div className="five wide computer eight wide tablet sixteen wide mobile column">
                <div className="w-100 text-center admin-mobile-page-heading m-v"><h2 className="ui header">Child list</h2></div>
                </div>
                <div className="five wide computer column" />
                <div className="five wide computer column" />
              </div>
              </div>
              <div className="view-child">

          <table className="ui celled single line sortable unstackable compact table">
            <thead >
              <tr className="center aligned">
                <th title="Child Name" className="cursor-pointer" >Child Name</th>
                <th title="Parent1 Name" className="cursor-pointer" >P1 Name</th>
                <th title="Parent2  Name" className="cursor-pointer" >P2  Name</th>
                <th title="Class" className="cursor-pointer" >Class</th>
                <th title="Room" className="cursor-pointer" >Room</th>
                <th title="Location" className="cursor-pointer" >Location</th>
              </tr>
            </thead>
            <tbody >
              {
                  studentList.length ? studentList.map((value, index) => {
                    return (
                      <tr className="center aligned" key={index}>
                        <td title={value.childFullName} className="cursor-pointer" >{value.childFullName}</td>
                        <td title={value.parent1FullName} className="cursor-pointer">{value.parent1FullName}</td>
                        <td title={value.parent2FullName} className="cursor-pointer">{value.parent2FullName}</td>
                        <td title={value.class_name} className="cursor-pointer">{value.class_name}</td>
                        <td title={value.room} className="cursor-pointer">{value.room}</td>
                        <td title={value.location} className="cursor-pointer">{value.location}</td>
                      </tr>
                    )
                  }) : <tr className="center aligned">
                      <td colSpan="6">No Student is assigned</td>
                    </tr>
              }

            </tbody>
          </table>
        </div>
        </div>

        }
      </div>
    )
  }
}


const mapStateToProps = state => ({
  loginUserInfo: state.loginReducer.loginUserInfo,

});

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherStudentList)