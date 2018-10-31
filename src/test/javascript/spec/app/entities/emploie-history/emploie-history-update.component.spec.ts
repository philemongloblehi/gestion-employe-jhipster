/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionEmployeAkilTestModule } from '../../../test.module';
import { EmploieHistoryUpdateComponent } from 'app/entities/emploie-history/emploie-history-update.component';
import { EmploieHistoryService } from 'app/entities/emploie-history/emploie-history.service';
import { EmploieHistory } from 'app/shared/model/emploie-history.model';

describe('Component Tests', () => {
    describe('EmploieHistory Management Update Component', () => {
        let comp: EmploieHistoryUpdateComponent;
        let fixture: ComponentFixture<EmploieHistoryUpdateComponent>;
        let service: EmploieHistoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEmployeAkilTestModule],
                declarations: [EmploieHistoryUpdateComponent]
            })
                .overrideTemplate(EmploieHistoryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EmploieHistoryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmploieHistoryService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EmploieHistory(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.emploieHistory = entity;
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
                    const entity = new EmploieHistory();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.emploieHistory = entity;
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
