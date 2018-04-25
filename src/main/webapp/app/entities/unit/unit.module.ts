import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    UnitService,
    UnitPopupService,
    UnitComponent,
    UnitDetailComponent,
    UnitDialogComponent,
    UnitPopupComponent,
    UnitDeletePopupComponent,
    UnitDeleteDialogComponent,
    unitRoute,
    unitPopupRoute,
} from './';

const ENTITY_STATES = [
    ...unitRoute,
    ...unitPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UnitComponent,
        UnitDetailComponent,
        UnitDialogComponent,
        UnitDeleteDialogComponent,
        UnitPopupComponent,
        UnitDeletePopupComponent,
    ],
    entryComponents: [
        UnitComponent,
        UnitDialogComponent,
        UnitPopupComponent,
        UnitDeleteDialogComponent,
        UnitDeletePopupComponent,
    ],
    providers: [
        UnitService,
        UnitPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationUnitModule {}
