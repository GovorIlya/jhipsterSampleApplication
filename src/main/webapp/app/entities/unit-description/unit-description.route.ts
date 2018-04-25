import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { UnitDescriptionComponent } from './unit-description.component';
import { UnitDescriptionDetailComponent } from './unit-description-detail.component';
import { UnitDescriptionPopupComponent } from './unit-description-dialog.component';
import { UnitDescriptionDeletePopupComponent } from './unit-description-delete-dialog.component';

export const unitDescriptionRoute: Routes = [
    {
        path: 'unit-description',
        component: UnitDescriptionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.unitDescription.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'unit-description/:id',
        component: UnitDescriptionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.unitDescription.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const unitDescriptionPopupRoute: Routes = [
    {
        path: 'unit-description-new',
        component: UnitDescriptionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.unitDescription.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'unit-description/:id/edit',
        component: UnitDescriptionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.unitDescription.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'unit-description/:id/delete',
        component: UnitDescriptionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.unitDescription.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
