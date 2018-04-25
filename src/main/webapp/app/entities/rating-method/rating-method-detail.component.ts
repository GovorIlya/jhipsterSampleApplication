import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { RatingMethod } from './rating-method.model';
import { RatingMethodService } from './rating-method.service';

@Component({
    selector: 'jhi-rating-method-detail',
    templateUrl: './rating-method-detail.component.html'
})
export class RatingMethodDetailComponent implements OnInit, OnDestroy {

    ratingMethod: RatingMethod;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private ratingMethodService: RatingMethodService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRatingMethods();
    }

    load(id) {
        this.ratingMethodService.find(id)
            .subscribe((ratingMethodResponse: HttpResponse<RatingMethod>) => {
                this.ratingMethod = ratingMethodResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRatingMethods() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ratingMethodListModification',
            (response) => this.load(this.ratingMethod.id)
        );
    }
}
