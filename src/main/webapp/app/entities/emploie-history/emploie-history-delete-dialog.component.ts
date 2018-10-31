import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEmploieHistory } from 'app/shared/model/emploie-history.model';
import { EmploieHistoryService } from './emploie-history.service';

@Component({
    selector: 'jhi-emploie-history-delete-dialog',
    templateUrl: './emploie-history-delete-dialog.component.html'
})
export class EmploieHistoryDeleteDialogComponent {
    emploieHistory: IEmploieHistory;

    constructor(
        private emploieHistoryService: EmploieHistoryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.emploieHistoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'emploieHistoryListModification',
                content: 'Deleted an emploieHistory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-emploie-history-delete-popup',
    template: ''
})
export class EmploieHistoryDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ emploieHistory }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EmploieHistoryDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.emploieHistory = emploieHistory;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
