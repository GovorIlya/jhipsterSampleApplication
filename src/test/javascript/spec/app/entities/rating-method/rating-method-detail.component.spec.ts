/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { RatingMethodDetailComponent } from '../../../../../../main/webapp/app/entities/rating-method/rating-method-detail.component';
import { RatingMethodService } from '../../../../../../main/webapp/app/entities/rating-method/rating-method.service';
import { RatingMethod } from '../../../../../../main/webapp/app/entities/rating-method/rating-method.model';

describe('Component Tests', () => {

    describe('RatingMethod Management Detail Component', () => {
        let comp: RatingMethodDetailComponent;
        let fixture: ComponentFixture<RatingMethodDetailComponent>;
        let service: RatingMethodService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [RatingMethodDetailComponent],
                providers: [
                    RatingMethodService
                ]
            })
            .overrideTemplate(RatingMethodDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RatingMethodDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RatingMethodService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RatingMethod(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ratingMethod).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
