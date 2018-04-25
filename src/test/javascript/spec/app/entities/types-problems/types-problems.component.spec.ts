/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TypesProblemsComponent } from '../../../../../../main/webapp/app/entities/types-problems/types-problems.component';
import { TypesProblemsService } from '../../../../../../main/webapp/app/entities/types-problems/types-problems.service';
import { TypesProblems } from '../../../../../../main/webapp/app/entities/types-problems/types-problems.model';

describe('Component Tests', () => {

    describe('TypesProblems Management Component', () => {
        let comp: TypesProblemsComponent;
        let fixture: ComponentFixture<TypesProblemsComponent>;
        let service: TypesProblemsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [TypesProblemsComponent],
                providers: [
                    TypesProblemsService
                ]
            })
            .overrideTemplate(TypesProblemsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TypesProblemsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypesProblemsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TypesProblems(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.typesProblems[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
