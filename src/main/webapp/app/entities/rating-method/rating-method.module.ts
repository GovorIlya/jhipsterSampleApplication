import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    RatingMethodService,
    RatingMethodPopupService,
    RatingMethodComponent,
    RatingMethodDetailComponent,
    RatingMethodDialogComponent,
    RatingMethodPopupComponent,
    RatingMethodDeletePopupComponent,
    RatingMethodDeleteDialogComponent,
    ratingMethodRoute,
    ratingMethodPopupRoute,
} from './';

const ENTITY_STATES = [
    ...ratingMethodRoute,
    ...ratingMethodPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RatingMethodComponent,
        RatingMethodDetailComponent,
        RatingMethodDialogComponent,
        RatingMethodDeleteDialogComponent,
        RatingMethodPopupComponent,
        RatingMethodDeletePopupComponent,
    ],
    entryComponents: [
        RatingMethodComponent,
        RatingMethodDialogComponent,
        RatingMethodPopupComponent,
        RatingMethodDeleteDialogComponent,
        RatingMethodDeletePopupComponent,
    ],
    providers: [
        RatingMethodService,
        RatingMethodPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationRatingMethodModule {}
