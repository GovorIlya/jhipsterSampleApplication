import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ResearchMethod } from './research-method.model';
import { ResearchMethodService } from './research-method.service';

@Injectable()
export class ResearchMethodPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private researchMethodService: ResearchMethodService

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
                this.researchMethodService.find(id)
                    .subscribe((researchMethodResponse: HttpResponse<ResearchMethod>) => {
                        const researchMethod: ResearchMethod = researchMethodResponse.body;
                        this.ngbModalRef = this.researchMethodModalRef(component, researchMethod);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.researchMethodModalRef(component, new ResearchMethod());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    researchMethodModalRef(component: Component, researchMethod: ResearchMethod): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.researchMethod = researchMethod;
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
