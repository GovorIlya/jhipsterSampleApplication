/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { UnitDescriptionComponent } from '../../../../../../main/webapp/app/entities/unit-description/unit-description.component';
import { UnitDescriptionService } from '../../../../../../main/webapp/app/entities/unit-description/unit-description.service';
import { UnitDescription } from '../../../../../../main/webapp/app/entities/unit-description/unit-description.model';

describe('Component Tests', () => {

    describe('UnitDescription Management Component', () => {
        let comp: UnitDescriptionComponent;
        let fixture: ComponentFixture<UnitDescriptionComponent>;
        let service: UnitDescriptionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [UnitDescriptionComponent],
                providers: [
                    UnitDescriptionService
                ]
            })
            .overrideTemplate(UnitDescriptionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UnitDescriptionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UnitDescriptionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new UnitDescription(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.unitDescriptions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
