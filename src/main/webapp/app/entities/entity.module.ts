import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GestionEmployeAkilRegionModule } from './region/region.module';
import { GestionEmployeAkilPaysModule } from './pays/pays.module';
import { GestionEmployeAkilLocalisationModule } from './localisation/localisation.module';
import { GestionEmployeAkilDepartementModule } from './departement/departement.module';
import { GestionEmployeAkilTacheModule } from './tache/tache.module';
import { GestionEmployeAkilEmployeModule } from './employe/employe.module';
import { GestionEmployeAkilEmploieModule } from './emploie/emploie.module';
import { GestionEmployeAkilEmploieHistoryModule } from './emploie-history/emploie-history.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        GestionEmployeAkilRegionModule,
        GestionEmployeAkilPaysModule,
        GestionEmployeAkilLocalisationModule,
        GestionEmployeAkilDepartementModule,
        GestionEmployeAkilTacheModule,
        GestionEmployeAkilEmployeModule,
        GestionEmployeAkilEmploieModule,
        GestionEmployeAkilEmploieHistoryModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEmployeAkilEntityModule {}
