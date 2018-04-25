import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { UnitComponent } from './unit.component';
import { UnitDetailComponent } from './unit-detail.component';
import { UnitPopupComponent } from './unit-dialog.component';
import { UnitDeletePopupComponent } from './unit-delete-dialog.component';

export const unitRoute: Routes = [
    {
        path: 'unit',
        component: UnitComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.unit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'unit/:id',
        component: UnitDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.unit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const unitPopupRoute: Routes = [
    {
        path: 'unit-new',
        component: UnitPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.unit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'unit/:id/edit',
        component: UnitPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.unit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'unit/:id/delete',
        component: UnitDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.unit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
