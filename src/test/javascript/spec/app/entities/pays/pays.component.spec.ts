/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionEmployeAkilTestModule } from '../../../test.module';
import { PaysComponent } from 'app/entities/pays/pays.component';
import { PaysService } from 'app/entities/pays/pays.service';
import { Pays } from 'app/shared/model/pays.model';

describe('Component Tests', () => {
    describe('Pays Management Component', () => {
        let comp: PaysComponent;
        let fixture: ComponentFixture<PaysComponent>;
        let service: PaysService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEmployeAkilTestModule],
                declarations: [PaysComponent],
                providers: []
            })
                .overrideTemplate(PaysComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PaysComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaysService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Pays(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.pays[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
