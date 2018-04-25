import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { RatingMethod } from './rating-method.model';
import { RatingMethodService } from './rating-method.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-rating-method',
    templateUrl: './rating-method.component.html'
})
export class RatingMethodComponent implements OnInit, OnDestroy {
ratingMethods: RatingMethod[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ratingMethodService: RatingMethodService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.ratingMethodService.query().subscribe(
            (res: HttpResponse<RatingMethod[]>) => {
                this.ratingMethods = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRatingMethods();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RatingMethod) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInRatingMethods() {
        this.eventSubscriber = this.eventManager.subscribe('ratingMethodListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
