/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { RatingMethodComponent } from '../../../../../../main/webapp/app/entities/rating-method/rating-method.component';
import { RatingMethodService } from '../../../../../../main/webapp/app/entities/rating-method/rating-method.service';
import { RatingMethod } from '../../../../../../main/webapp/app/entities/rating-method/rating-method.model';

describe('Component Tests', () => {

    describe('RatingMethod Management Component', () => {
        let comp: RatingMethodComponent;
        let fixture: ComponentFixture<RatingMethodComponent>;
        let service: RatingMethodService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [RatingMethodComponent],
                providers: [
                    RatingMethodService
                ]
            })
            .overrideTemplate(RatingMethodComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RatingMethodComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RatingMethodService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RatingMethod(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ratingMethods[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
