import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RatingMethod } from './rating-method.model';
import { RatingMethodPopupService } from './rating-method-popup.service';
import { RatingMethodService } from './rating-method.service';

@Component({
    selector: 'jhi-rating-method-delete-dialog',
    templateUrl: './rating-method-delete-dialog.component.html'
})
export class RatingMethodDeleteDialogComponent {

    ratingMethod: RatingMethod;

    constructor(
        private ratingMethodService: RatingMethodService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ratingMethodService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ratingMethodListModification',
                content: 'Deleted an ratingMethod'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rating-method-delete-popup',
    template: ''
})
export class RatingMethodDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ratingMethodPopupService: RatingMethodPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ratingMethodPopupService
                .open(RatingMethodDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
