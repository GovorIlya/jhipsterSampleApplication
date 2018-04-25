import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Unit } from './unit.model';
import { UnitService } from './unit.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-unit',
    templateUrl: './unit.component.html'
})
export class UnitComponent implements OnInit, OnDestroy {
units: Unit[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private unitService: UnitService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.unitService.query().subscribe(
            (res: HttpResponse<Unit[]>) => {
                this.units = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInUnits();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Unit) {
        return item.id;
    }
    registerChangeInUnits() {
        this.eventSubscriber = this.eventManager.subscribe('unitListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
