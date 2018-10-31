import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Departement } from 'app/shared/model/departement.model';
import { DepartementService } from './departement.service';
import { DepartementComponent } from './departement.component';
import { DepartementDetailComponent } from './departement-detail.component';
import { DepartementUpdateComponent } from './departement-update.component';
import { DepartementDeletePopupComponent } from './departement-delete-dialog.component';
import { IDepartement } from 'app/shared/model/departement.model';

@Injectable({ providedIn: 'root' })
export class DepartementResolve implements Resolve<IDepartement> {
    constructor(private service: DepartementService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((departement: HttpResponse<Departement>) => departement.body));
        }
        return of(new Departement());
    }
}

export const departementRoute: Routes = [
    {
        path: 'departement',
        component: DepartementComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEmployeAkilApp.departement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'departement/:id/view',
        component: DepartementDetailComponent,
        resolve: {
            departement: DepartementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEmployeAkilApp.departement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'departement/new',
        component: DepartementUpdateComponent,
        resolve: {
            departement: DepartementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEmployeAkilApp.departement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'departement/:id/edit',
        component: DepartementUpdateComponent,
        resolve: {
            departement: DepartementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEmployeAkilApp.departement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const departementPopupRoute: Routes = [
    {
        path: 'departement/:id/delete',
        component: DepartementDeletePopupComponent,
        resolve: {
            departement: DepartementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEmployeAkilApp.departement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
