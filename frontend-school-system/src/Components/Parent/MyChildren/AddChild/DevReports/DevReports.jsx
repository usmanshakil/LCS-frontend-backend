import React from 'react';
// Components

import { ChildDevolpmentalReport } from './ChildDevolpmentalReport';
import { DailySchedule } from './DailySchedule';
import { EatingHabits } from './EatingHabits';
import { Health } from './Health';
import { SleepingHabits } from './SleepingHabits';
import { SocialRelationships } from './SocialRelationships';
import { ToiletHabits } from './ToiletHabits';

export function DevReports(props) {

    let { subForm } = props;
    return (
        <div>
            {/* {GetComponentByActiveStep(props)} */}
            {subForm === 'devReport' ? <ChildDevolpmentalReport {...props} /> : ''}
            {subForm === 'childHealth' ? <Health {...props} /> : ''}
            {subForm === 'childEatingHabit' ? <EatingHabits {...props} /> : ''}
            {subForm === 'childToiletHabit' ? <ToiletHabits {...props} /> : ''}
            {subForm === 'childSleepingHabit' ? <SleepingHabits {...props} /> : ''}
            {subForm === 'socialRelationship' ? <SocialRelationships {...props} /> : ''}
            {subForm === 'dailySchedule' ? <DailySchedule {...props} /> : ''}
        </div>
    )
}

