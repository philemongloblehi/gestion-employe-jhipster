import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IEmploieHistory } from 'app/shared/model/emploie-history.model';
import { EmploieHistoryService } from './emploie-history.service';
import { IEmploie } from 'app/shared/model/emploie.model';
import { EmploieService } from 'app/entities/emploie';
import { IDepartement } from 'app/shared/model/departement.model';
import { DepartementService } from 'app/entities/departement';
import { IEmploye } from 'app/shared/model/employe.model';
import { EmployeService } from 'app/entities/employe';

@Component({
    selector: 'jhi-emploie-history-update',
    templateUrl: './emploie-history-update.component.html'
})
export class EmploieHistoryUpdateComponent implements OnInit {
    emploieHistory: IEmploieHistory;
    isSaving: boolean;

    emploies: IEmploie[];

    departements: IDepartement[];

    employes: IEmploye[];
    dateDebut: string;
    dateFin: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private emploieHistoryService: EmploieHistoryService,
        private emploieService: EmploieService,
        private departementService: DepartementService,
        private employeService: EmployeService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ emploieHistory }) => {
            this.emploieHistory = emploieHistory;
            this.dateDebut = this.emploieHistory.dateDebut != null ? this.emploieHistory.dateDebut.format(DATE_TIME_FORMAT) : null;
            this.dateFin = this.emploieHistory.dateFin != null ? this.emploieHistory.dateFin.format(DATE_TIME_FORMAT) : null;
        });
        this.emploieService.query({ filter: 'emploiehistory-is-null' }).subscribe(
            (res: HttpResponse<IEmploie[]>) => {
                if (!this.emploieHistory.emploie || !this.emploieHistory.emploie.id) {
                    this.emploies = res.body;
                } else {
                    this.emploieService.find(this.emploieHistory.emploie.id).subscribe(
                        (subRes: HttpResponse<IEmploie>) => {
                            this.emploies = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.departementService.query({ filter: 'emploiehistory-is-null' }).subscribe(
            (res: HttpResponse<IDepartement[]>) => {
                if (!this.emploieHistory.departement || !this.emploieHistory.departement.id) {
                    this.departements = res.body;
                } else {
                    this.departementService.find(this.emploieHistory.departement.id).subscribe(
                        (subRes: HttpResponse<IDepartement>) => {
                            this.departements = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.employeService.query({ filter: 'emploiehistory-is-null' }).subscribe(
            (res: HttpResponse<IEmploye[]>) => {
                if (!this.emploieHistory.employe || !this.emploieHistory.employe.id) {
                    this.employes = res.body;
                } else {
                    this.employeService.find(this.emploieHistory.employe.id).subscribe(
                        (subRes: HttpResponse<IEmploye>) => {
                            this.employes = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.emploieHistory.dateDebut = this.dateDebut != null ? moment(this.dateDebut, DATE_TIME_FORMAT) : null;
        this.emploieHistory.dateFin = this.dateFin != null ? moment(this.dateFin, DATE_TIME_FORMAT) : null;
        if (this.emploieHistory.id !== undefined) {
            this.subscribeToSaveResponse(this.emploieHistoryService.update(this.emploieHistory));
        } else {
            this.subscribeToSaveResponse(this.emploieHistoryService.create(this.emploieHistory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEmploieHistory>>) {
        result.subscribe((res: HttpResponse<IEmploieHistory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDepartementById(index: number, item: IDepartement) {
        return item.id;
    }

    trackEmployeById(index: number, item: IEmploye) {
        return item.id;
    }
}
