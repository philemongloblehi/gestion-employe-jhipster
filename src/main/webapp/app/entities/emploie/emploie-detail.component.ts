import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmploie } from 'app/shared/model/emploie.model';

@Component({
    selector: 'jhi-emploie-detail',
    templateUrl: './emploie-detail.component.html'
})
export class EmploieDetailComponent implements OnInit {
    emploie: IEmploie;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ emploie }) => {
            this.emploie = emploie;
        });
    }

    previousState() {
        window.history.back();
    }
}
