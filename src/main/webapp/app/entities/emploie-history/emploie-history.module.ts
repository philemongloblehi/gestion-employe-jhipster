import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEmployeAkilSharedModule } from 'app/shared';
import {
    EmploieHistoryComponent,
    EmploieHistoryDetailComponent,
    EmploieHistoryUpdateComponent,
    EmploieHistoryDeletePopupComponent,
    EmploieHistoryDeleteDialogComponent,
    emploieHistoryRoute,
    emploieHistoryPopupRoute
} from './';

const ENTITY_STATES = [...emploieHistoryRoute, ...emploieHistoryPopupRoute];

@NgModule({
    imports: [GestionEmployeAkilSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EmploieHistoryComponent,
        EmploieHistoryDetailComponent,
        EmploieHistoryUpdateComponent,
        EmploieHistoryDeleteDialogComponent,
        EmploieHistoryDeletePopupComponent
    ],
    entryComponents: [
        EmploieHistoryComponent,
        EmploieHistoryUpdateComponent,
        EmploieHistoryDeleteDialogComponent,
        EmploieHistoryDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEmployeAkilEmploieHistoryModule {}
