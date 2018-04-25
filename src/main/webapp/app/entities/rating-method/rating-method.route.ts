import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RatingMethodComponent } from './rating-method.component';
import { RatingMethodDetailComponent } from './rating-method-detail.component';
import { RatingMethodPopupComponent } from './rating-method-dialog.component';
import { RatingMethodDeletePopupComponent } from './rating-method-delete-dialog.component';

export const ratingMethodRoute: Routes = [
    {
        path: 'rating-method',
        component: RatingMethodComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.ratingMethod.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'rating-method/:id',
        component: RatingMethodDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.ratingMethod.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ratingMethodPopupRoute: Routes = [
    {
        path: 'rating-method-new',
        component: RatingMethodPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.ratingMethod.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rating-method/:id/edit',
        component: RatingMethodPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.ratingMethod.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rating-method/:id/delete',
        component: RatingMethodDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.ratingMethod.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
