import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPays } from 'app/shared/model/pays.model';
import { PaysService } from './pays.service';
import { IRegion } from 'app/shared/model/region.model';
import { RegionService } from 'app/entities/region';

@Component({
    selector: 'jhi-pays-update',
    templateUrl: './pays-update.component.html'
})
export class PaysUpdateComponent implements OnInit {
    pays: IPays;
    isSaving: boolean;

    regions: IRegion[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private paysService: PaysService,
        private regionService: RegionService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ pays }) => {
            this.pays = pays;
        });
        this.regionService.query({ filter: 'pays-is-null' }).subscribe(
            (res: HttpResponse<IRegion[]>) => {
                if (!this.pays.region || !this.pays.region.id) {
                    this.regions = res.body;
                } else {
                    this.regionService.find(this.pays.region.id).subscribe(
                        (subRes: HttpResponse<IRegion>) => {
                            this.regions = [subRes.body].concat(res.body);
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
        if (this.pays.id !== undefined) {
            this.subscribeToSaveResponse(this.paysService.update(this.pays));
        } else {
            this.subscribeToSaveResponse(this.paysService.create(this.pays));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPays>>) {
        result.subscribe((res: HttpResponse<IPays>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackRegionById(index: number, item: IRegion) {
        return item.id;
    }
}
