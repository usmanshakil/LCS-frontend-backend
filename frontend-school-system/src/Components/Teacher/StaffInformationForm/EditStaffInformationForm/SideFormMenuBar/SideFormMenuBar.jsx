import React from 'react';
import { Menu,Icon} from 'semantic-ui-react';


export  function SideFormMenuBar(props) {
  return (
    <div>
      <VerticalSubMenu {...props} />
      <HorizontalSubMenu {...props} />
      <HorizontalSubMenuTitle {...props} />
    </div>
  )
} 

function VerticalSubMenu(props){
  let {activeTabName,previousSubmittedStatusObj,editType}=props,
  {
    staff_hiring_form_detail,
    staff_administrative_teaching_staff_detail,
    staff_education_detail,
    staff_personal_reference_detail,
    staff_professional_reference_detail,
    staff_references_detail,
    staff_emergency_detail,
    // staff_statement_of_compliance_with_cori_detail,
    staff_handbook_waiver_detail
  }=previousSubmittedStatusObj;
  return (
     <Menu vertical fluid className="d-v">
    <Menu.Item  active={activeTabName === 'staffBasicInfo'}
      className={activeTabName === 'staffBasicInfo' ? 'active-menu' : 'inactive-menu'}
      onClick={(event) => props._loadTab('staffBasicInfo', event)}
      disabled={editType==='editForm'? false :activeTabName === 'staffBasicInfo' ? false : true}
      >Staff basic information
            {editType ==='addForm'?staff_hiring_form_detail ? <Icon name='check' color="green" /> : '': '' }
      </Menu.Item>
    <Menu.Item active={activeTabName === 'administartionAndStaff'}
      className={activeTabName === 'administartionAndStaff' ? 'active-menu' : 'inactive-menu'}
      onClick={(event) => props._loadTab('administartionAndStaff', event)}
      disabled={editType==='editForm'? false :activeTabName === 'administartionAndStaff' ? false : true}
      
      >Administrative and teaching staff
            {editType ==='addForm'?staff_administrative_teaching_staff_detail ? <Icon name='check' color="green" /> : '':'' }
      
      </Menu.Item>
    <Menu.Item active={activeTabName === 'education'}
      className={activeTabName === 'education' ? 'active-menu' : 'inactive-menu'}
      onClick={(event) => props._loadTab('education', event)}
      disabled={editType==='editForm'? false :activeTabName === 'education' ? false : true}
      
      >Education
            {editType ==='addForm'?staff_education_detail ? <Icon name='check' color="green" /> : '':'' }
      
      </Menu.Item>
    <Menu.Item active={activeTabName === 'personalReference'}
      className={activeTabName === 'personalReference' ? 'active-menu' : 'inactive-menu'}
      onClick={(event) => props._loadTab('personalReference', event)}
      disabled={editType==='editForm'? false :activeTabName === 'personalReference' ? false : true}
      
      >Personal reference
            {editType ==='addForm'?staff_personal_reference_detail ? <Icon name='check' color="green" /> : '':'' }
      
      </Menu.Item>
    <Menu.Item active={activeTabName === 'professionalRefernce'}
      className={activeTabName === 'professionalRefernce' ? 'active-menu' : 'inactive-menu'}
      onClick={(event) => props._loadTab('professionalRefernce', event)}
      disabled={editType==='editForm'? false :activeTabName === 'professionalRefernce' ? false : true}
      
      >Professional reference
            {editType ==='addForm'?staff_professional_reference_detail ? <Icon name='check' color="green" /> : '':'' }
      
      </Menu.Item>
    <Menu.Item active={activeTabName === 'reference'}
      className={activeTabName === 'reference' ? 'active-menu' : 'inactive-menu'}
      onClick={(event) => props._loadTab('reference', event)}
      disabled={editType==='editForm'? false :activeTabName === 'reference' ? false : true}
      
      >Reference
            {editType ==='addForm'?staff_references_detail ? <Icon name='check' color="green" /> : '' :''}
      
      </Menu.Item>
    <Menu.Item active={activeTabName === 'staffEmergencyForm'}
      className={activeTabName === 'staffEmergencyForm' ? 'active-menu' : 'inactive-menu'}
      onClick={(event) => props._loadTab('staffEmergencyForm', event)}
      disabled={editType==='editForm'? false :activeTabName === 'staffEmergencyForm' ? false : true}
      
      >Staff emergency form
            {editType ==='addForm'?staff_emergency_detail ? <Icon name='check' color="green" /> : '':'' }
      
      </Menu.Item>
    <Menu.Item active={activeTabName === 'staffAgreement'}
      className={activeTabName === 'staffAgreement' ? 'active-menu' : 'inactive-menu'}
      onClick={(event) => props._loadTab('staffAgreement', event)}
      disabled={editType==='editForm'? false :activeTabName === 'staffAgreement' ? false : true}
      >Staff handbook waiver
            {editType ==='addForm'?staff_handbook_waiver_detail ? <Icon name='check' color="green" /> : '':'' }
      
      </Menu.Item>

     </Menu>
  )
}

function HorizontalSubMenu(props){
  let { activeTab,editType,editchildHorizontalMenu } = props;

  return(
<div className="m-v">
  {
    editType ==="editForm"? <div className="w-100 add-child-forms "
    // ref={props.addChildMenuSectionRef}
    // disabled={editType === '' ? true : false}
  >
    {
      editchildHorizontalMenu.map((value, index) => {
        return (
          <div
            id={index}
            key={value.key}
            className={` add-child-forms-options ${activeTab === value.value ? 'parent-theme' : ''}`}
            onClick={() => props._loadTab(value.value)}
            // ref={props.addChildMenuRef[index]}
            disabled={editType === '' ? true : false}
          >
            {value.text}
          </div>

        )
      })
    }
  </div>:''
  }
     
    </div>
  )
}





function HorizontalSubMenuTitle(props) {
  let { activeTabName } = props;
  
  return (
    <div>
        <div className="ui horizontal segments m-v">
          {pageHeading(activeTabName)}
        </div>      
    </div>
  )
}


function pageHeading(props){
    switch (props) {
      case 'staffBasicInfo':
          return <div className="ui segment center aligned">Staff basic information</div>;
      case 'administartionAndStaff':
          return <div className="ui segment center aligned">Administrative and teaching staff</div>;
      case 'education':
          return <div className="ui segment center aligned">Education</div>;
      case 'personalReference':
          return <div className="ui segment center aligned">Personal reference</div>;
      case 'professionalRefernce':
          return <div className="ui segment center aligned">Personal reference</div>;
      case 'reference':
          return <div className="ui segment center aligned">Professional reference</div>;
      case 'staffEmergencyForm':
          return <div className="ui segment center aligned">Reference</div>;
      case 'staffAgreement':
          return <div className="ui segment center aligned">Staff handbook waiver</div>;
      default:
          return <div className="ui segment center aligned">Staff basic information</div>;
  }
  
}
