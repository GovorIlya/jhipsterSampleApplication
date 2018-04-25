/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { UnitComponent } from '../../../../../../main/webapp/app/entities/unit/unit.component';
import { UnitService } from '../../../../../../main/webapp/app/entities/unit/unit.service';
import { Unit } from '../../../../../../main/webapp/app/entities/unit/unit.model';

describe('Component Tests', () => {

    describe('Unit Management Component', () => {
        let comp: UnitComponent;
        let fixture: ComponentFixture<UnitComponent>;
        let service: UnitService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [UnitComponent],
                providers: [
                    UnitService
                ]
            })
            .overrideTemplate(UnitComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UnitComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UnitService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Unit(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.units[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
