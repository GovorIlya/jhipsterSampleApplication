import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { UnitDescription } from './unit-description.model';
import { UnitDescriptionPopupService } from './unit-description-popup.service';
import { UnitDescriptionService } from './unit-description.service';
import { Unit, UnitService } from '../unit';

@Component({
    selector: 'jhi-unit-description-dialog',
    templateUrl: './unit-description-dialog.component.html'
})
export class UnitDescriptionDialogComponent implements OnInit {

    unitDescription: UnitDescription;
    isSaving: boolean;

    units: Unit[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private unitDescriptionService: UnitDescriptionService,
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
        if (this.unitDescription.id !== undefined) {
            this.subscribeToSaveResponse(
                this.unitDescriptionService.update(this.unitDescription));
        } else {
            this.subscribeToSaveResponse(
                this.unitDescriptionService.create(this.unitDescription));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UnitDescription>>) {
        result.subscribe((res: HttpResponse<UnitDescription>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UnitDescription) {
        this.eventManager.broadcast({ name: 'unitDescriptionListModification', content: 'OK'});
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
    selector: 'jhi-unit-description-popup',
    template: ''
})
export class UnitDescriptionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private unitDescriptionPopupService: UnitDescriptionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.unitDescriptionPopupService
                    .open(UnitDescriptionDialogComponent as Component, params['id']);
            } else {
                this.unitDescriptionPopupService
                    .open(UnitDescriptionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
