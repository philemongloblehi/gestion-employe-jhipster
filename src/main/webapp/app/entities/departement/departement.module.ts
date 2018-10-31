import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEmployeAkilSharedModule } from 'app/shared';
import {
    DepartementComponent,
    DepartementDetailComponent,
    DepartementUpdateComponent,
    DepartementDeletePopupComponent,
    DepartementDeleteDialogComponent,
    departementRoute,
    departementPopupRoute
} from './';

const ENTITY_STATES = [...departementRoute, ...departementPopupRoute];

@NgModule({
    imports: [GestionEmployeAkilSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DepartementComponent,
        DepartementDetailComponent,
        DepartementUpdateComponent,
        DepartementDeleteDialogComponent,
        DepartementDeletePopupComponent
    ],
    entryComponents: [DepartementComponent, DepartementUpdateComponent, DepartementDeleteDialogComponent, DepartementDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEmployeAkilDepartementModule {}
