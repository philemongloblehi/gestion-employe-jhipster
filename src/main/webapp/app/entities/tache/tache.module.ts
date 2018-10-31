import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEmployeAkilSharedModule } from 'app/shared';
import {
    TacheComponent,
    TacheDetailComponent,
    TacheUpdateComponent,
    TacheDeletePopupComponent,
    TacheDeleteDialogComponent,
    tacheRoute,
    tachePopupRoute
} from './';

const ENTITY_STATES = [...tacheRoute, ...tachePopupRoute];

@NgModule({
    imports: [GestionEmployeAkilSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [TacheComponent, TacheDetailComponent, TacheUpdateComponent, TacheDeleteDialogComponent, TacheDeletePopupComponent],
    entryComponents: [TacheComponent, TacheUpdateComponent, TacheDeleteDialogComponent, TacheDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEmployeAkilTacheModule {}
