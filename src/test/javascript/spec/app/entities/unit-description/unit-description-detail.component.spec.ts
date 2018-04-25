/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { UnitDescriptionDetailComponent } from '../../../../../../main/webapp/app/entities/unit-description/unit-description-detail.component';
import { UnitDescriptionService } from '../../../../../../main/webapp/app/entities/unit-description/unit-description.service';
import { UnitDescription } from '../../../../../../main/webapp/app/entities/unit-description/unit-description.model';

describe('Component Tests', () => {

    describe('UnitDescription Management Detail Component', () => {
        let comp: UnitDescriptionDetailComponent;
        let fixture: ComponentFixture<UnitDescriptionDetailComponent>;
        let service: UnitDescriptionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [UnitDescriptionDetailComponent],
                providers: [
                    UnitDescriptionService
                ]
            })
            .overrideTemplate(UnitDescriptionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UnitDescriptionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UnitDescriptionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new UnitDescription(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.unitDescription).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
