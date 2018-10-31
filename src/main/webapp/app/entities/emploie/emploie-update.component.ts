import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IEmploie } from 'app/shared/model/emploie.model';
import { EmploieService } from './emploie.service';
import { IEmploye } from 'app/shared/model/employe.model';
import { EmployeService } from 'app/entities/employe';
import { ITache } from 'app/shared/model/tache.model';
import { TacheService } from 'app/entities/tache';

@Component({
    selector: 'jhi-emploie-update',
    templateUrl: './emploie-update.component.html'
})
export class EmploieUpdateComponent implements OnInit {
    emploie: IEmploie;
    isSaving: boolean;

    employes: IEmploye[];

    taches: ITache[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private emploieService: EmploieService,
        private employeService: EmployeService,
        private tacheService: TacheService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ emploie }) => {
            this.emploie = emploie;
        });
        this.employeService.query().subscribe(
            (res: HttpResponse<IEmploye[]>) => {
                this.employes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.tacheService.query().subscribe(
            (res: HttpResponse<ITache[]>) => {
                this.taches = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.emploie.id !== undefined) {
            this.subscribeToSaveResponse(this.emploieService.update(this.emploie));
        } else {
            this.subscribeToSaveResponse(this.emploieService.create(this.emploie));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEmploie>>) {
        result.subscribe((res: HttpResponse<IEmploie>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackEmployeById(index: number, item: IEmploye) {
        return item.id;
    }

    trackTacheById(index: number, item: ITache) {
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
