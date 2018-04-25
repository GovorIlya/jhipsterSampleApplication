import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UnitDescription } from './unit-description.model';
import { UnitDescriptionPopupService } from './unit-description-popup.service';
import { UnitDescriptionService } from './unit-description.service';

@Component({
    selector: 'jhi-unit-description-delete-dialog',
    templateUrl: './unit-description-delete-dialog.component.html'
})
export class UnitDescriptionDeleteDialogComponent {

    unitDescription: UnitDescription;

    constructor(
        private unitDescriptionService: UnitDescriptionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.unitDescriptionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'unitDescriptionListModification',
                content: 'Deleted an unitDescription'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-unit-description-delete-popup',
    template: ''
})
export class UnitDescriptionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private unitDescriptionPopupService: UnitDescriptionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.unitDescriptionPopupService
                .open(UnitDescriptionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
