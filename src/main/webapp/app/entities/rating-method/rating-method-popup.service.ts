import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { RatingMethod } from './rating-method.model';
import { RatingMethodService } from './rating-method.service';

@Injectable()
export class RatingMethodPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private ratingMethodService: RatingMethodService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.ratingMethodService.find(id)
                    .subscribe((ratingMethodResponse: HttpResponse<RatingMethod>) => {
                        const ratingMethod: RatingMethod = ratingMethodResponse.body;
                        this.ngbModalRef = this.ratingMethodModalRef(component, ratingMethod);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.ratingMethodModalRef(component, new RatingMethod());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    ratingMethodModalRef(component: Component, ratingMethod: RatingMethod): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.ratingMethod = ratingMethod;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
