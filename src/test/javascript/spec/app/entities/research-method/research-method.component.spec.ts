/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ResearchMethodComponent } from '../../../../../../main/webapp/app/entities/research-method/research-method.component';
import { ResearchMethodService } from '../../../../../../main/webapp/app/entities/research-method/research-method.service';
import { ResearchMethod } from '../../../../../../main/webapp/app/entities/research-method/research-method.model';

describe('Component Tests', () => {

    describe('ResearchMethod Management Component', () => {
        let comp: ResearchMethodComponent;
        let fixture: ComponentFixture<ResearchMethodComponent>;
        let service: ResearchMethodService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ResearchMethodComponent],
                providers: [
                    ResearchMethodService
                ]
            })
            .overrideTemplate(ResearchMethodComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ResearchMethodComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ResearchMethodService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ResearchMethod(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.researchMethods[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
