import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { TypesProblems } from './types-problems.model';
import { TypesProblemsService } from './types-problems.service';

@Component({
    selector: 'jhi-types-problems-detail',
    templateUrl: './types-problems-detail.component.html'
})
export class TypesProblemsDetailComponent implements OnInit, OnDestroy {

    typesProblems: TypesProblems;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private typesProblemsService: TypesProblemsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTypesProblems();
    }

    load(id) {
        this.typesProblemsService.find(id)
            .subscribe((typesProblemsResponse: HttpResponse<TypesProblems>) => {
                this.typesProblems = typesProblemsResponse.body;
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

    registerChangeInTypesProblems() {
        this.eventSubscriber = this.eventManager.subscribe(
            'typesProblemsListModification',
            (response) => this.load(this.typesProblems.id)
        );
    }
}
