import React from 'react';
import { AddChildInfo } from './AddChildInfo';
import { AddEmergencyContact } from './AddEmergencyContact';
import { AddMedicalInformation } from './AddMedicalInformation';
import { AddParentInfo } from './AddParentInfo';


export function FamilyInfo(props) {
    let { subForm } = props;

    return (
        <div className="add-child-border">
            {subForm === 'childInfo' ? <AddChildInfo {...props} /> : ''}
            {subForm === 'parent1' ? <AddParentInfo {...props} /> : ''}
            {subForm === 'parent2' ? <AddParentInfo {...props} /> : ''}
            {subForm === 'emergencyContact1' ? <AddEmergencyContact {...props} /> : ''}
            {subForm === 'emergencyContact2' ? <AddEmergencyContact {...props} /> : ''}
            {subForm === 'medicalInformation' ? <AddMedicalInformation {...props} /> : ''}
        </div>
        
    )
}