/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { UnitDetailComponent } from '../../../../../../main/webapp/app/entities/unit/unit-detail.component';
import { UnitService } from '../../../../../../main/webapp/app/entities/unit/unit.service';
import { Unit } from '../../../../../../main/webapp/app/entities/unit/unit.model';

describe('Component Tests', () => {

    describe('Unit Management Detail Component', () => {
        let comp: UnitDetailComponent;
        let fixture: ComponentFixture<UnitDetailComponent>;
        let service: UnitService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [UnitDetailComponent],
                providers: [
                    UnitService
                ]
            })
            .overrideTemplate(UnitDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UnitDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UnitService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Unit(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.unit).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
