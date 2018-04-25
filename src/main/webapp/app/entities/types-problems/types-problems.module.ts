import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    TypesProblemsService,
    TypesProblemsPopupService,
    TypesProblemsComponent,
    TypesProblemsDetailComponent,
    TypesProblemsDialogComponent,
    TypesProblemsPopupComponent,
    TypesProblemsDeletePopupComponent,
    TypesProblemsDeleteDialogComponent,
    typesProblemsRoute,
    typesProblemsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...typesProblemsRoute,
    ...typesProblemsPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TypesProblemsComponent,
        TypesProblemsDetailComponent,
        TypesProblemsDialogComponent,
        TypesProblemsDeleteDialogComponent,
        TypesProblemsPopupComponent,
        TypesProblemsDeletePopupComponent,
    ],
    entryComponents: [
        TypesProblemsComponent,
        TypesProblemsDialogComponent,
        TypesProblemsPopupComponent,
        TypesProblemsDeleteDialogComponent,
        TypesProblemsDeletePopupComponent,
    ],
    providers: [
        TypesProblemsService,
        TypesProblemsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationTypesProblemsModule {}
