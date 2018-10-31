/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEmployeAkilTestModule } from '../../../test.module';
import { EmploieDetailComponent } from 'app/entities/emploie/emploie-detail.component';
import { Emploie } from 'app/shared/model/emploie.model';

describe('Component Tests', () => {
    describe('Emploie Management Detail Component', () => {
        let comp: EmploieDetailComponent;
        let fixture: ComponentFixture<EmploieDetailComponent>;
        const route = ({ data: of({ emploie: new Emploie(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEmployeAkilTestModule],
                declarations: [EmploieDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EmploieDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EmploieDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.emploie).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
