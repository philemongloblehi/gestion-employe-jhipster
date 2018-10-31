import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITache } from 'app/shared/model/tache.model';
import { TacheService } from './tache.service';
import { IEmploie } from 'app/shared/model/emploie.model';
import { EmploieService } from 'app/entities/emploie';

@Component({
    selector: 'jhi-tache-update',
    templateUrl: './tache-update.component.html'
})
export class TacheUpdateComponent implements OnInit {
    tache: ITache;
    isSaving: boolean;

    emploies: IEmploie[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private tacheService: TacheService,
        private emploieService: EmploieService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tache }) => {
            this.tache = tache;
        });
        this.emploieService.query().subscribe(
            (res: HttpResponse<IEmploie[]>) => {
                this.emploies = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.tache.id !== undefined) {
            this.subscribeToSaveResponse(this.tacheService.update(this.tache));
        } else {
            this.subscribeToSaveResponse(this.tacheService.create(this.tache));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITache>>) {
        result.subscribe((res: HttpResponse<ITache>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackEmploieById(index: number, item: IEmploie) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
