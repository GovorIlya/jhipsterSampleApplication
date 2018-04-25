import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { UnitDescription } from './unit-description.model';
import { UnitDescriptionService } from './unit-description.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-unit-description',
    templateUrl: './unit-description.component.html'
})
export class UnitDescriptionComponent implements OnInit, OnDestroy {
unitDescriptions: UnitDescription[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private unitDescriptionService: UnitDescriptionService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.unitDescriptionService.query().subscribe(
            (res: HttpResponse<UnitDescription[]>) => {
                this.unitDescriptions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInUnitDescriptions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: UnitDescription) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInUnitDescriptions() {
        this.eventSubscriber = this.eventManager.subscribe('unitDescriptionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
