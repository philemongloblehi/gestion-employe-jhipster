import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEmployeAkilSharedModule } from 'app/shared';
import {
    EmploieComponent,
    EmploieDetailComponent,
    EmploieUpdateComponent,
    EmploieDeletePopupComponent,
    EmploieDeleteDialogComponent,
    emploieRoute,
    emploiePopupRoute
} from './';

const ENTITY_STATES = [...emploieRoute, ...emploiePopupRoute];

@NgModule({
    imports: [GestionEmployeAkilSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EmploieComponent,
        EmploieDetailComponent,
        EmploieUpdateComponent,
        EmploieDeleteDialogComponent,
        EmploieDeletePopupComponent
    ],
    entryComponents: [EmploieComponent, EmploieUpdateComponent, EmploieDeleteDialogComponent, EmploieDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEmployeAkilEmploieModule {}
