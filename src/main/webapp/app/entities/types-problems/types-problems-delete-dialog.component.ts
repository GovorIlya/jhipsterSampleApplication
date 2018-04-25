import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TypesProblems } from './types-problems.model';
import { TypesProblemsPopupService } from './types-problems-popup.service';
import { TypesProblemsService } from './types-problems.service';

@Component({
    selector: 'jhi-types-problems-delete-dialog',
    templateUrl: './types-problems-delete-dialog.component.html'
})
export class TypesProblemsDeleteDialogComponent {

    typesProblems: TypesProblems;

    constructor(
        private typesProblemsService: TypesProblemsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.typesProblemsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'typesProblemsListModification',
                content: 'Deleted an typesProblems'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-types-problems-delete-popup',
    template: ''
})
export class TypesProblemsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private typesProblemsPopupService: TypesProblemsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.typesProblemsPopupService
                .open(TypesProblemsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
