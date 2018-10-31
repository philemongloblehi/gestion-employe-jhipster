import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPays } from 'app/shared/model/pays.model';
import { Principal } from 'app/core';
import { PaysService } from './pays.service';

@Component({
    selector: 'jhi-pays',
    templateUrl: './pays.component.html'
})
export class PaysComponent implements OnInit, OnDestroy {
    pays: IPays[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private paysService: PaysService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.paysService
                .search({
                    query: this.currentSearch
                })
                .subscribe((res: HttpResponse<IPays[]>) => (this.pays = res.body), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.paysService.query().subscribe(
            (res: HttpResponse<IPays[]>) => {
                this.pays = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPays();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPays) {
        return item.id;
    }

    registerChangeInPays() {
        this.eventSubscriber = this.eventManager.subscribe('paysListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
