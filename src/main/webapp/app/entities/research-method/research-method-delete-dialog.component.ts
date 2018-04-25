import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ResearchMethod } from './research-method.model';
import { ResearchMethodPopupService } from './research-method-popup.service';
import { ResearchMethodService } from './research-method.service';

@Component({
    selector: 'jhi-research-method-delete-dialog',
    templateUrl: './research-method-delete-dialog.component.html'
})
export class ResearchMethodDeleteDialogComponent {

    researchMethod: ResearchMethod;

    constructor(
        private researchMethodService: ResearchMethodService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.researchMethodService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'researchMethodListModification',
                content: 'Deleted an researchMethod'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-research-method-delete-popup',
    template: ''
})
export class ResearchMethodDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private researchMethodPopupService: ResearchMethodPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.researchMethodPopupService
                .open(ResearchMethodDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
