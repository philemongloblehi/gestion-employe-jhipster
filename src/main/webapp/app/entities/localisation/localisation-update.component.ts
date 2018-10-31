import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ILocalisation } from 'app/shared/model/localisation.model';
import { LocalisationService } from './localisation.service';
import { IPays } from 'app/shared/model/pays.model';
import { PaysService } from 'app/entities/pays';

@Component({
    selector: 'jhi-localisation-update',
    templateUrl: './localisation-update.component.html'
})
export class LocalisationUpdateComponent implements OnInit {
    localisation: ILocalisation;
    isSaving: boolean;

    pays: IPays[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private localisationService: LocalisationService,
        private paysService: PaysService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ localisation }) => {
            this.localisation = localisation;
        });
        this.paysService.query({ filter: 'localisation-is-null' }).subscribe(
            (res: HttpResponse<IPays[]>) => {
                if (!this.localisation.pays || !this.localisation.pays.id) {
                    this.pays = res.body;
                } else {
                    this.paysService.find(this.localisation.pays.id).subscribe(
                        (subRes: HttpResponse<IPays>) => {
                            this.pays = [subRes.body].concat(res.body);
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
        if (this.localisation.id !== undefined) {
            this.subscribeToSaveResponse(this.localisationService.update(this.localisation));
        } else {
            this.subscribeToSaveResponse(this.localisationService.create(this.localisation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILocalisation>>) {
        result.subscribe((res: HttpResponse<ILocalisation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPaysById(index: number, item: IPays) {
        return item.id;
    }
}
