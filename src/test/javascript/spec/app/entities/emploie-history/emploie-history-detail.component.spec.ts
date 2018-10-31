/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEmployeAkilTestModule } from '../../../test.module';
import { EmploieHistoryDetailComponent } from 'app/entities/emploie-history/emploie-history-detail.component';
import { EmploieHistory } from 'app/shared/model/emploie-history.model';

describe('Component Tests', () => {
    describe('EmploieHistory Management Detail Component', () => {
        let comp: EmploieHistoryDetailComponent;
        let fixture: ComponentFixture<EmploieHistoryDetailComponent>;
        const route = ({ data: of({ emploieHistory: new EmploieHistory(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEmployeAkilTestModule],
                declarations: [EmploieHistoryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EmploieHistoryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EmploieHistoryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.emploieHistory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
