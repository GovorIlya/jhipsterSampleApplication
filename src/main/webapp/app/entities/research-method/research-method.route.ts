import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ResearchMethodComponent } from './research-method.component';
import { ResearchMethodDetailComponent } from './research-method-detail.component';
import { ResearchMethodPopupComponent } from './research-method-dialog.component';
import { ResearchMethodDeletePopupComponent } from './research-method-delete-dialog.component';

export const researchMethodRoute: Routes = [
    {
        path: 'research-method',
        component: ResearchMethodComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.researchMethod.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'research-method/:id',
        component: ResearchMethodDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.researchMethod.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const researchMethodPopupRoute: Routes = [
    {
        path: 'research-method-new',
        component: ResearchMethodPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.researchMethod.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'research-method/:id/edit',
        component: ResearchMethodPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.researchMethod.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'research-method/:id/delete',
        component: ResearchMethodDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.researchMethod.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
