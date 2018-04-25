import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { ResearchMethod } from './research-method.model';
import { ResearchMethodService } from './research-method.service';

@Component({
    selector: 'jhi-research-method-detail',
    templateUrl: './research-method-detail.component.html'
})
export class ResearchMethodDetailComponent implements OnInit, OnDestroy {

    researchMethod: ResearchMethod;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private researchMethodService: ResearchMethodService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInResearchMethods();
    }

    load(id) {
        this.researchMethodService.find(id)
            .subscribe((researchMethodResponse: HttpResponse<ResearchMethod>) => {
                this.researchMethod = researchMethodResponse.body;
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

    registerChangeInResearchMethods() {
        this.eventSubscriber = this.eventManager.subscribe(
            'researchMethodListModification',
            (response) => this.load(this.researchMethod.id)
        );
    }
}
