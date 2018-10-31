/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionEmployeAkilTestModule } from '../../../test.module';
import { EmploieUpdateComponent } from 'app/entities/emploie/emploie-update.component';
import { EmploieService } from 'app/entities/emploie/emploie.service';
import { Emploie } from 'app/shared/model/emploie.model';

describe('Component Tests', () => {
    describe('Emploie Management Update Component', () => {
        let comp: EmploieUpdateComponent;
        let fixture: ComponentFixture<EmploieUpdateComponent>;
        let service: EmploieService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEmployeAkilTestModule],
                declarations: [EmploieUpdateComponent]
            })
                .overrideTemplate(EmploieUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EmploieUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmploieService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Emploie(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.emploie = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Emploie();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.emploie = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
