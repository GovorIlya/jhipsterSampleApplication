import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ResearchMethod } from './research-method.model';
import { ResearchMethodPopupService } from './research-method-popup.service';
import { ResearchMethodService } from './research-method.service';
import { Unit, UnitService } from '../unit';

@Component({
    selector: 'jhi-research-method-dialog',
    templateUrl: './research-method-dialog.component.html'
})
export class ResearchMethodDialogComponent implements OnInit {

    researchMethod: ResearchMethod;
    isSaving: boolean;

    units: Unit[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private researchMethodService: ResearchMethodService,
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
        if (this.researchMethod.id !== undefined) {
            this.subscribeToSaveResponse(
                this.researchMethodService.update(this.researchMethod));
        } else {
            this.subscribeToSaveResponse(
                this.researchMethodService.create(this.researchMethod));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ResearchMethod>>) {
        result.subscribe((res: HttpResponse<ResearchMethod>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ResearchMethod) {
        this.eventManager.broadcast({ name: 'researchMethodListModification', content: 'OK'});
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
    selector: 'jhi-research-method-popup',
    template: ''
})
export class ResearchMethodPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private researchMethodPopupService: ResearchMethodPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.researchMethodPopupService
                    .open(ResearchMethodDialogComponent as Component, params['id']);
            } else {
                this.researchMethodPopupService
                    .open(ResearchMethodDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
