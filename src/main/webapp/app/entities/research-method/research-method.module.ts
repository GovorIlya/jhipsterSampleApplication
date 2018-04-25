import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    ResearchMethodService,
    ResearchMethodPopupService,
    ResearchMethodComponent,
    ResearchMethodDetailComponent,
    ResearchMethodDialogComponent,
    ResearchMethodPopupComponent,
    ResearchMethodDeletePopupComponent,
    ResearchMethodDeleteDialogComponent,
    researchMethodRoute,
    researchMethodPopupRoute,
} from './';

const ENTITY_STATES = [
    ...researchMethodRoute,
    ...researchMethodPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ResearchMethodComponent,
        ResearchMethodDetailComponent,
        ResearchMethodDialogComponent,
        ResearchMethodDeleteDialogComponent,
        ResearchMethodPopupComponent,
        ResearchMethodDeletePopupComponent,
    ],
    entryComponents: [
        ResearchMethodComponent,
        ResearchMethodDialogComponent,
        ResearchMethodPopupComponent,
        ResearchMethodDeleteDialogComponent,
        ResearchMethodDeletePopupComponent,
    ],
    providers: [
        ResearchMethodService,
        ResearchMethodPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationResearchMethodModule {}
