import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { TypesProblems } from './types-problems.model';
import { TypesProblemsPopupService } from './types-problems-popup.service';
import { TypesProblemsService } from './types-problems.service';
import { Unit, UnitService } from '../unit';

@Component({
    selector: 'jhi-types-problems-dialog',
    templateUrl: './types-problems-dialog.component.html'
})
export class TypesProblemsDialogComponent implements OnInit {

    typesProblems: TypesProblems;
    isSaving: boolean;

    units: Unit[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private typesProblemsService: TypesProblemsService,
        private unitService: UnitService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.unitService.query()
            .subscribe((res: HttpResponse<Unit[]>) => { this.units = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.typesProblems.id !== undefined) {
            this.subscribeToSaveResponse(
                this.typesProblemsService.update(this.typesProblems));
        } else {
            this.subscribeToSaveResponse(
                this.typesProblemsService.create(this.typesProblems));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TypesProblems>>) {
        result.subscribe((res: HttpResponse<TypesProblems>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TypesProblems) {
        this.eventManager.broadcast({ name: 'typesProblemsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUnitById(index: number, item: Unit) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-types-problems-popup',
    template: ''
})
export class TypesProblemsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private typesProblemsPopupService: TypesProblemsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.typesProblemsPopupService
                    .open(TypesProblemsDialogComponent as Component, params['id']);
            } else {
                this.typesProblemsPopupService
                    .open(TypesProblemsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
