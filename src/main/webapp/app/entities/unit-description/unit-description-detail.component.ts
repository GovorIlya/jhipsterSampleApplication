import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { UnitDescription } from './unit-description.model';
import { UnitDescriptionService } from './unit-description.service';

@Component({
    selector: 'jhi-unit-description-detail',
    templateUrl: './unit-description-detail.component.html'
})
export class UnitDescriptionDetailComponent implements OnInit, OnDestroy {

    unitDescription: UnitDescription;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private unitDescriptionService: UnitDescriptionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUnitDescriptions();
    }

    load(id) {
        this.unitDescriptionService.find(id)
            .subscribe((unitDescriptionResponse: HttpResponse<UnitDescription>) => {
                this.unitDescription = unitDescriptionResponse.body;
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

    registerChangeInUnitDescriptions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'unitDescriptionListModification',
            (response) => this.load(this.unitDescription.id)
        );
    }
}
