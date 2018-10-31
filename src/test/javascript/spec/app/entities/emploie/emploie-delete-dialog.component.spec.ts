/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionEmployeAkilTestModule } from '../../../test.module';
import { EmploieDeleteDialogComponent } from 'app/entities/emploie/emploie-delete-dialog.component';
import { EmploieService } from 'app/entities/emploie/emploie.service';

describe('Component Tests', () => {
    describe('Emploie Management Delete Component', () => {
        let comp: EmploieDeleteDialogComponent;
        let fixture: ComponentFixture<EmploieDeleteDialogComponent>;
        let service: EmploieService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEmployeAkilTestModule],
                declarations: [EmploieDeleteDialogComponent]
            })
                .overrideTemplate(EmploieDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EmploieDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmploieService);
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
