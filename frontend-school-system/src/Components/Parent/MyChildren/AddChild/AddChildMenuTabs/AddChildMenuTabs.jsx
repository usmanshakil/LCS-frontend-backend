import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import _ from 'lodash';
//css
import './AddChildHorizontalOption.css';

export function AddChildMenuTabs(props) {

  return (
    <div>
      <AddChildVerticalMenus {...props} />
      <AddChildHorizontalOption {...props} />
      <HorizontalSubMenu {...props} />
    </div>
  )
}



export function AddChildVerticalMenus(props) {
  let { parentForm, subForm, editType, previousSubmittedStatusObj } = props,
    { childInfo,
      parent1,
      parent2,
      emergencyContact1,
      emergencyContact2,
      medicalInformation,
      devReport,
      childHealth,
      childEatingHabit,
      childToiletHabit,
      childSleepingHabit,
      socialRelationship,
      dailySchedule,
      parentAgreement,
      offsiteActivityPermission,
      localFieldTripPermission,
      sunscreenPermission,
      toothbrushingPermission,
      photoRelease,
      transportationAuthority,
      schoolDirectoryForm } = previousSubmittedStatusObj,
    isObjectIsEmpty = _.isEmpty(previousSubmittedStatusObj);
  return (
    <Menu vertical fluid className="d-v" >
      {parentForm === 'familyInfo' ? '' : <Menu.Item
        name='Family info'
        active={subForm === 'familyInfo' ? true : false}
        onClick={() => props.showNextForm('familyInfo', 'childInfo')}
        disabled={editType === '' ? true : false}
      >Family info
      {editType === '' ? subForm === 'familyInfo' ? '' : <Icon name='check' color="green" /> : ''}
      </Menu.Item>}

      {parentForm === 'familyInfo' ?
        <Menu.Item>
          <Menu.Header>
            Family info
      </Menu.Header>
          <Menu.Menu>
            <Menu.Item
              name='Add Child'
              className={subForm === 'childInfo' ? 'active-menu' : 'inactive-menu'}
              active={subForm === 'childInfo' ? true : false} onClick={() => props.showNextForm('familyInfo', 'childInfo')}
              disabled={editType === '' ? true : false}
            > Add Child
              {editType === '' ? isObjectIsEmpty ? '' : childInfo ? <Icon name='check' color="green" /> : '' : ''}
            </Menu.Item>
            <Menu.Item
              name='Parent 1 Info'
              active={subForm === 'parent1' ? true : false} onClick={() => props.showNextForm('familyInfo', 'parent1')}
              className={subForm === 'parent1' ? 'active-menu' : 'inactive-menu'}
              disabled={editType === '' ? true : false}
            >Parent 1 Info
             {editType === '' ? isObjectIsEmpty ? '' : parent1 ? <Icon name='check' color="green" /> : '' : ''}
            </Menu.Item>
            <Menu.Item
              name='Parent 2 Info'
              active={subForm === 'parent2' ? true : false} onClick={() => props.showNextForm('familyInfo', 'parent2')}
              className={subForm === 'parent2' ? 'active-menu' : 'inactive-menu'}
              disabled={editType === '' ? true : false}

            >Parent 2 Info {editType === '' ? isObjectIsEmpty ? '' : parent2 ? <Icon name='check' color="green" /> : '' : ''}</Menu.Item>
            <Menu.Item
              name='Emergency Contact 1'
              active={subForm === 'emergencyContact1' ? true : false} onClick={() => props.showNextForm('familyInfo', 'emergencyContact1')}
              className={subForm === 'emergencyContact1' ? 'active-menu' : 'inactive-menu'}
              disabled={editType === '' ? true : false}
            >Emergency Contact 1{editType === '' ? isObjectIsEmpty ? '' : emergencyContact1 ? <Icon name='check' color="green" /> : '' : ''}</Menu.Item>
            <Menu.Item
              name='Emergency Contact 2'
              active={subForm === 'emergencyContact2' ? true : false} onClick={() => props.showNextForm('familyInfo', 'emergencyContact2')}
              className={subForm === 'emergencyContact2' ? 'active-menu' : 'inactive-menu'}
              disabled={editType === '' ? true : false}
            >Emergency Contact 2{editType === '' ? isObjectIsEmpty ? '' : emergencyContact2 ? <Icon name='check' color="green" /> : '' : ''}</Menu.Item>
            <Menu.Item
              name='Medical Information'
              active={subForm === 'medicalInformation' ? true : false} onClick={() => props.showNextForm('familyInfo', 'medicalInformation')}
              className={subForm === 'medicalInformation' ? 'active-menu' : 'inactive-menu'}
              disabled={editType === '' ? true : false}
            >Medical Information{editType === '' ? isObjectIsEmpty ? '' : medicalInformation ? <Icon name='check' color="green" /> : '' : ''}
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>

        : ''}

      {parentForm === 'devReport' ? '' : <Menu.Item
        name='Dev report'
        active={parentForm === 'devReport' ? true : false}
        onClick={() => props.showNextForm('devReport', 'devReport')}
        disabled={editType === '' ? true : false}
      >Dev report
      {editType === '' ? parentForm === 'familyInfo' ? '' : parentForm === 'devReport' ? '' : <Icon name='check' color="green" /> : ''}
      </Menu.Item>}
      {parentForm === 'devReport' ? <Menu.Item>
        <Menu.Header >
          Dev report
      </Menu.Header>
        <Menu.Menu>
          <Menu.Item
            name='DEVELOPMENTAL HISTORY'
            active={subForm === 'devReport' ? true : false} onClick={() => props.showNextForm('devReport', 'devReport')}
            className={subForm === 'devReport' ? 'active-menu' : 'inactive-menu'}
            disabled={editType === '' ? true : false}
          >DEVELOPMENTAL HISTORY{editType === '' ? isObjectIsEmpty ? '' : devReport ? <Icon name='check' color="green" /> : '' : ''}
          </Menu.Item>
          <Menu.Item
            name='HEALTH'
            active={subForm === 'childHealth' ? true : false} onClick={() => props.showNextForm('devReport', 'childHealth')}
            className={subForm === 'childHealth' ? 'active-menu' : 'inactive-menu'}
            disabled={editType === '' ? true : false}
          >HEALTH {editType === '' ? isObjectIsEmpty ? '' : childHealth ? <Icon name='check' color="green" /> : '' : ''}</Menu.Item>
          <Menu.Item
            name='EATING HABITS'
            active={subForm === 'childEatingHabit' ? true : false} onClick={() => props.showNextForm('devReport', 'childEatingHabit')}
            className={subForm === 'childEatingHabit' ? 'active-menu' : 'inactive-menu'}
            disabled={editType === '' ? true : false}>
            EATING HABITS {editType === '' ? isObjectIsEmpty ? '' : childEatingHabit ? <Icon name='check' color="green" /> : '' : ''}
          </Menu.Item>
          <Menu.Item
            name='TOILET HABITS'
            active={subForm === 'childToiletHabit' ? true : false} onClick={() => props.showNextForm('devReport', 'childToiletHabit')}
            className={subForm === 'childToiletHabit' ? 'active-menu' : 'inactive-menu'}
            disabled={editType === '' ? true : false}
          >TOILET HABITS
              {editType === '' ? isObjectIsEmpty ? '' : childToiletHabit ? <Icon name='check' color="green" /> : '' : ''}
          </Menu.Item>
          <Menu.Item
            name='SLEEPING HABITS'
            active={subForm === 'childSleepingHabit' ? true : false} onClick={() => props.showNextForm('devReport', 'childSleepingHabit')}
            className={subForm === 'childSleepingHabit' ? 'active-menu' : 'inactive-menu'}
            disabled={editType === '' ? true : false}
          >SLEEPING HABITS
{editType === '' ? isObjectIsEmpty ? '' : childSleepingHabit ? <Icon name='check' color="green" /> : '' : ''}
          </Menu.Item>
          <Menu.Item
            name='SOCIAL RELATIONSHIPS'
            active={subForm === 'socialRelationship' ? true : false} onClick={() => props.showNextForm('devReport', 'socialRelationship')}
            className={subForm === 'socialRelationship' ? 'active-menu' : 'inactive-menu'}
            disabled={editType === '' ? true : false}

          >SOCIAL RELATIONSHIPS {editType === '' ? isObjectIsEmpty ? '' : socialRelationship ? <Icon name='check' color="green" /> : '' : ''}</Menu.Item>
          <Menu.Item
            name='DAILY SCHEDULE'
            active={subForm === 'dailySchedule' ? true : false} onClick={() => props.showNextForm('devReport', 'dailySchedule')}
            className={subForm === 'dailySchedule' ? 'active-menu' : 'inactive-menu'}
            disabled={editType === '' ? true : false}
          >DAILY SCHEDULE
              {editType === '' ? isObjectIsEmpty ? '' : dailySchedule ? <Icon name='check' color="green" /> : '' : ''}
          </Menu.Item>
        </Menu.Menu>
      </Menu.Item>
        : ''
      }

      <Menu.Item
        name='Parent agreement'
        active={parentForm === 'parentAgreement'}
        className={parentForm === 'parentAgreement' ? 'active-menu' : 'inactive-menu'}
        onClick={() => props.showNextForm('parentAgreement', 'parentAgreement')}
        disabled={editType === '' ? true : false}

      >Parent agreement
      {editType === '' ? parentAgreement ? <Icon name='check' color="green" /> : '' : ''}
      </Menu.Item>

      <Menu.Item
        name='Offsite Activity Permission'
        active={parentForm === 'offsiteActivityPermission'}
        className={parentForm === 'offsiteActivityPermission' ? 'active-menu' : 'inactive-menu'}
        onClick={() => props.showNextForm('offsiteActivityPermission', 'offsiteActivityPermission')}
        disabled={editType === '' ? true : false}

      >Offsite Activity Permission
            {editType === '' ? offsiteActivityPermission ? <Icon name='check' color="green" /> : '' : ''}

      </Menu.Item>

      <Menu.Item
        name='Local Field Trip Permission'
        active={parentForm === 'localFieldTripPermission'}
        className={parentForm === 'localFieldTripPermission' ? 'active-menu' : 'inactive-menu'}
        onClick={() => props.showNextForm('localFieldTripPermission', 'localFieldTripPermission')}
        disabled={editType === '' ? true : false}>
        Local Field Trip Permission
      {editType === '' ? localFieldTripPermission ? <Icon name='check' color="green" /> : '' : ''}

      </Menu.Item>
      <Menu.Item
        name='Sunscreen Permission'
        active={parentForm === 'sunscreenPermission'}
        className={parentForm === 'sunscreenPermission' ? 'active-menu' : 'inactive-menu'}
        onClick={() => props.showNextForm('sunscreenPermission', 'sunscreenPermission')}
        disabled={editType === '' ? true : false}>Sunscreen Permission
      {editType === '' ? sunscreenPermission ? <Icon name='check' color="green" /> : '' : ''}

      </Menu.Item>
      <Menu.Item
        name='Toothbrushing Permission'
        active={parentForm === 'toothbrushingPermission'}
        className={parentForm === 'toothbrushingPermission' ? 'active-menu' : 'inactive-menu'}
        onClick={() => props.showNextForm('toothbrushingPermission', 'toothbrushingPermission')}
        disabled={editType === '' ? true : false}>
        Toothbrushing Permission
        {editType === '' ? toothbrushingPermission ? <Icon name='check' color="green" /> : '' : ''}

      </Menu.Item>

      <Menu.Item
        name='Photo Release'
        active={parentForm === 'photoRelease'}
        onClick={() => props.showNextForm('photoRelease', 'photoRelease')}
        className={parentForm === 'photoRelease' ? 'active-menu' : 'inactive-menu'}
        disabled={editType === '' ? true : false}>
        Photo Release
        {editType === '' ? photoRelease ? <Icon name='check' color="green" /> : '' : ''}


      </Menu.Item>
      <Menu.Item
        name='Transportation Authority'
        active={parentForm === 'transportationAuthority'}
        className={parentForm === 'transportationAuthority' ? 'active-menu' : 'inactive-menu'}
        onClick={() => props.showNextForm('transportationAuthority', 'transportationAuthority')}
        disabled={editType === '' ? true : false}

      >
        Transportation Authority
        {editType === '' ? transportationAuthority ? <Icon name='check' color="green" /> : '' : ''}

      </Menu.Item>
      <Menu.Item
        name="SCHOOL DIRECTORY FORM"
        active={parentForm === "schoolDirectoryForm"}
        className={parentForm === "schoolDirectoryForm" ? 'active-menu' : 'inactive-menu'}
        onClick={() => props.showNextForm('schoolDirectoryForm', 'schoolDirectoryForm')}
        disabled={editType === '' ? true : false}

      >
        School Directory Form
        {editType === '' ? schoolDirectoryForm ? <Icon name='check' color="green" /> : '' : ''}

      </Menu.Item>
    </Menu>
  )
}



export function AddChildHorizontalOption(props) {
  let { addChildMenu, editType, parentForm } = props;
  return (
    <div className="m-v">
      <div className="w-100 add-child-forms "
        ref={props.addChildMenuSectionRef}
        disabled={editType === '' ? true : false}
      >
        {
          addChildMenu.map((value, index) => {
            return (
              <div
                id={index}
                key={value.key}
                className={` add-child-forms-options ${parentForm === value.value ? 'parent-theme' : ''}`}
                onClick={() => props.showNextForm(value.value, value.key)}
                ref={props.addChildMenuRef[value.key]}
                disabled={editType === '' ? true : false}
              >
                {value.text}
              </div>

            )
          })
        }
      </div>
    </div>
  )
}


function HorizontalSubMenu(props) {
  let { parentForm } = props;

  return (
    <div>
      {
        parentForm === 'devReport' || parentForm === 'familyInfo' ? <div className="ui horizontal segments m-v">
          {getActiveHorizontalSubMenu(props)}
        </div> : ''
      }
    </div>

  )
}


function getActiveHorizontalSubMenu(props) {
  let { subForm, parentForm } = props;

  if (parentForm === 'devReport' || parentForm === 'familyInfo') {


    switch (subForm) {
      case 'childInfo':
        return <div className="ui segment center aligned">Add Child</div>;
      case 'parent1':
        return <div className="ui segment center aligned">Parent 1 Info</div>;
      case 'parent2':
        return <div className="ui segment center aligned">Parent 2 Info</div>;
      case 'emergencyContact1':
        return <div className="ui segment center aligned">Emergency Contact 1</div>;
      case 'emergencyContact2':
        return <div className="ui segment center aligned">Emergency Contact 2</div>;
      case 'medicalInformation':
        return <div className="ui segment center aligned">Medical Information</div>;
      case 'devReport':
        return <div className="ui segment center aligned">DEVELOPMENTAL HISTORY</div>;
      case 'childHealth':
        return <div className="ui segment center aligned">HEALTH</div>;
      case 'childEatingHabit':
        return <div className="ui segment center aligned">EATING HABITS</div>;
      case 'childToiletHabit':
        return <div className="ui segment center aligned">TOILET HABITS</div>;
      case 'childSleepingHabit':
        return <div className="ui segment center aligned">SLEEPING HABITS</div>;
      case 'socialRelationship':
        return <div className="ui segment center aligned">SOCIAL RELATIONSHIPS</div>;
      case 'dailySchedule':
        return <div className="ui segment center aligned">DAILY SCHEDULE</div>;
        default:
          return <div className="ui segment center aligned">Add Child</div>;
    }
  }


}