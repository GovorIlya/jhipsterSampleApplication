import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TypesProblemsComponent } from './types-problems.component';
import { TypesProblemsDetailComponent } from './types-problems-detail.component';
import { TypesProblemsPopupComponent } from './types-problems-dialog.component';
import { TypesProblemsDeletePopupComponent } from './types-problems-delete-dialog.component';

export const typesProblemsRoute: Routes = [
    {
        path: 'types-problems',
        component: TypesProblemsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.typesProblems.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'types-problems/:id',
        component: TypesProblemsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.typesProblems.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const typesProblemsPopupRoute: Routes = [
    {
        path: 'types-problems-new',
        component: TypesProblemsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.typesProblems.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'types-problems/:id/edit',
        component: TypesProblemsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.typesProblems.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'types-problems/:id/delete',
        component: TypesProblemsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.typesProblems.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
