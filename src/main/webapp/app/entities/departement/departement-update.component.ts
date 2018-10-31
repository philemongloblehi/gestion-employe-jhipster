import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDepartement } from 'app/shared/model/departement.model';
import { DepartementService } from './departement.service';
import { ILocalisation } from 'app/shared/model/localisation.model';
import { LocalisationService } from 'app/entities/localisation';

@Component({
    selector: 'jhi-departement-update',
    templateUrl: './departement-update.component.html'
})
export class DepartementUpdateComponent implements OnInit {
    departement: IDepartement;
    isSaving: boolean;

    localisations: ILocalisation[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private departementService: DepartementService,
        private localisationService: LocalisationService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ departement }) => {
            this.departement = departement;
        });
        this.localisationService.query({ filter: 'departement-is-null' }).subscribe(
            (res: HttpResponse<ILocalisation[]>) => {
                if (!this.departement.localisation || !this.departement.localisation.id) {
                    this.localisations = res.body;
                } else {
                    this.localisationService.find(this.departement.localisation.id).subscribe(
                        (subRes: HttpResponse<ILocalisation>) => {
                            this.localisations = [subRes.body].concat(res.body);
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
        if (this.departement.id !== undefined) {
            this.subscribeToSaveResponse(this.departementService.update(this.departement));
        } else {
            this.subscribeToSaveResponse(this.departementService.create(this.departement));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDepartement>>) {
        result.subscribe((res: HttpResponse<IDepartement>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackLocalisationById(index: number, item: ILocalisation) {
        return item.id;
    }
}
