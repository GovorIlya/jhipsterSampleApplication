import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { TypesProblems } from './types-problems.model';
import { TypesProblemsService } from './types-problems.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-types-problems',
    templateUrl: './types-problems.component.html'
})
export class TypesProblemsComponent implements OnInit, OnDestroy {
typesProblems: TypesProblems[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private typesProblemsService: TypesProblemsService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.typesProblemsService.query().subscribe(
            (res: HttpResponse<TypesProblems[]>) => {
                this.typesProblems = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTypesProblems();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TypesProblems) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInTypesProblems() {
        this.eventSubscriber = this.eventManager.subscribe('typesProblemsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
