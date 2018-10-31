import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmploieHistory } from 'app/shared/model/emploie-history.model';

@Component({
    selector: 'jhi-emploie-history-detail',
    templateUrl: './emploie-history-detail.component.html'
})
export class EmploieHistoryDetailComponent implements OnInit {
    emploieHistory: IEmploieHistory;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ emploieHistory }) => {
            this.emploieHistory = emploieHistory;
        });
    }

    previousState() {
        window.history.back();
    }
}
