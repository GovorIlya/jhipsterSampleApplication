/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { UnitDialogComponent } from '../../../../../../main/webapp/app/entities/unit/unit-dialog.component';
import { UnitService } from '../../../../../../main/webapp/app/entities/unit/unit.service';
import { Unit } from '../../../../../../main/webapp/app/entities/unit/unit.model';
import { UnitDescriptionService } from '../../../../../../main/webapp/app/entities/unit-description';
import { ImageService } from '../../../../../../main/webapp/app/entities/image';
import { ResearchMethodService } from '../../../../../../main/webapp/app/entities/research-method';
import { TypesProblemsService } from '../../../../../../main/webapp/app/entities/types-problems';
import { RatingMethodService } from '../../../../../../main/webapp/app/entities/rating-method';

describe('Component Tests', () => {

    describe('Unit Management Dialog Component', () => {
        let comp: UnitDialogComponent;
        let fixture: ComponentFixture<UnitDialogComponent>;
        let service: UnitService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [UnitDialogComponent],
                providers: [
                    UnitDescriptionService,
                    ImageService,
                    ResearchMethodService,
                    TypesProblemsService,
                    RatingMethodService,
                    UnitService
                ]
            })
            .overrideTemplate(UnitDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UnitDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UnitService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Unit(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.unit = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'unitListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Unit();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.unit = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'unitListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
