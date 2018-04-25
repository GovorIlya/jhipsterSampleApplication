/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TypesProblemsDetailComponent } from '../../../../../../main/webapp/app/entities/types-problems/types-problems-detail.component';
import { TypesProblemsService } from '../../../../../../main/webapp/app/entities/types-problems/types-problems.service';
import { TypesProblems } from '../../../../../../main/webapp/app/entities/types-problems/types-problems.model';

describe('Component Tests', () => {

    describe('TypesProblems Management Detail Component', () => {
        let comp: TypesProblemsDetailComponent;
        let fixture: ComponentFixture<TypesProblemsDetailComponent>;
        let service: TypesProblemsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [TypesProblemsDetailComponent],
                providers: [
                    TypesProblemsService
                ]
            })
            .overrideTemplate(TypesProblemsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TypesProblemsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypesProblemsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TypesProblems(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.typesProblems).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
