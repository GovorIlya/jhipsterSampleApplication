import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    UnitDescriptionService,
    UnitDescriptionPopupService,
    UnitDescriptionComponent,
    UnitDescriptionDetailComponent,
    UnitDescriptionDialogComponent,
    UnitDescriptionPopupComponent,
    UnitDescriptionDeletePopupComponent,
    UnitDescriptionDeleteDialogComponent,
    unitDescriptionRoute,
    unitDescriptionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...unitDescriptionRoute,
    ...unitDescriptionPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UnitDescriptionComponent,
        UnitDescriptionDetailComponent,
        UnitDescriptionDialogComponent,
        UnitDescriptionDeleteDialogComponent,
        UnitDescriptionPopupComponent,
        UnitDescriptionDeletePopupComponent,
    ],
    entryComponents: [
        UnitDescriptionComponent,
        UnitDescriptionDialogComponent,
        UnitDescriptionPopupComponent,
        UnitDescriptionDeleteDialogComponent,
        UnitDescriptionDeletePopupComponent,
    ],
    providers: [
        UnitDescriptionService,
        UnitDescriptionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationUnitDescriptionModule {}
