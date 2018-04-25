import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ResearchMethod } from './research-method.model';
import { ResearchMethodService } from './research-method.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-research-method',
    templateUrl: './research-method.component.html'
})
export class ResearchMethodComponent implements OnInit, OnDestroy {
researchMethods: ResearchMethod[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private researchMethodService: ResearchMethodService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.researchMethodService.query().subscribe(
            (res: HttpResponse<ResearchMethod[]>) => {
                this.researchMethods = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInResearchMethods();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ResearchMethod) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInResearchMethods() {
        this.eventSubscriber = this.eventManager.subscribe('researchMethodListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
