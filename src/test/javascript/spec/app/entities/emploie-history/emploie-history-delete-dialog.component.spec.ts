/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionEmployeAkilTestModule } from '../../../test.module';
import { EmploieHistoryDeleteDialogComponent } from 'app/entities/emploie-history/emploie-history-delete-dialog.component';
import { EmploieHistoryService } from 'app/entities/emploie-history/emploie-history.service';

describe('Component Tests', () => {
    describe('EmploieHistory Management Delete Component', () => {
        let comp: EmploieHistoryDeleteDialogComponent;
        let fixture: ComponentFixture<EmploieHistoryDeleteDialogComponent>;
        let service: EmploieHistoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEmployeAkilTestModule],
                declarations: [EmploieHistoryDeleteDialogComponent]
            })
                .overrideTemplate(EmploieHistoryDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EmploieHistoryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmploieHistoryService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
