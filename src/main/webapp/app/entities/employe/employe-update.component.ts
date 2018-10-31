import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IEmploye } from 'app/shared/model/employe.model';
import { EmployeService } from './employe.service';
import { IDepartement } from 'app/shared/model/departement.model';
import { DepartementService } from 'app/entities/departement';

@Component({
    selector: 'jhi-employe-update',
    templateUrl: './employe-update.component.html'
})
export class EmployeUpdateComponent implements OnInit {
    employe: IEmploye;
    isSaving: boolean;

    departements: IDepartement[];

    employes: IEmploye[];
    dateCreation: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private employeService: EmployeService,
        private departementService: DepartementService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ employe }) => {
            this.employe = employe;
            this.dateCreation = this.employe.dateCreation != null ? this.employe.dateCreation.format(DATE_TIME_FORMAT) : null;
        });
        this.departementService.query().subscribe(
            (res: HttpResponse<IDepartement[]>) => {
                this.departements = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.employeService.query().subscribe(
            (res: HttpResponse<IEmploye[]>) => {
                this.employes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.employe.dateCreation = this.dateCreation != null ? moment(this.dateCreation, DATE_TIME_FORMAT) : null;
        if (this.employe.id !== undefined) {
            this.subscribeToSaveResponse(this.employeService.update(this.employe));
        } else {
            this.subscribeToSaveResponse(this.employeService.create(this.employe));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEmploye>>) {
        result.subscribe((res: HttpResponse<IEmploye>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDepartementById(index: number, item: IDepartement) {
        return item.id;
    }

    trackEmployeById(index: number, item: IEmploye) {
        return item.id;
    }
}
