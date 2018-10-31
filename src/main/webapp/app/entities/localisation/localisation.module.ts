import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEmployeAkilSharedModule } from 'app/shared';
import {
    LocalisationComponent,
    LocalisationDetailComponent,
    LocalisationUpdateComponent,
    LocalisationDeletePopupComponent,
    LocalisationDeleteDialogComponent,
    localisationRoute,
    localisationPopupRoute
} from './';

const ENTITY_STATES = [...localisationRoute, ...localisationPopupRoute];

@NgModule({
    imports: [GestionEmployeAkilSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LocalisationComponent,
        LocalisationDetailComponent,
        LocalisationUpdateComponent,
        LocalisationDeleteDialogComponent,
        LocalisationDeletePopupComponent
    ],
    entryComponents: [
        LocalisationComponent,
        LocalisationUpdateComponent,
        LocalisationDeleteDialogComponent,
        LocalisationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEmployeAkilLocalisationModule {}
