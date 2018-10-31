import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pays } from 'app/shared/model/pays.model';
import { PaysService } from './pays.service';
import { PaysComponent } from './pays.component';
import { PaysDetailComponent } from './pays-detail.component';
import { PaysUpdateComponent } from './pays-update.component';
import { PaysDeletePopupComponent } from './pays-delete-dialog.component';
import { IPays } from 'app/shared/model/pays.model';

@Injectable({ providedIn: 'root' })
export class PaysResolve implements Resolve<IPays> {
    constructor(private service: PaysService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((pays: HttpResponse<Pays>) => pays.body));
        }
        return of(new Pays());
    }
}

export const paysRoute: Routes = [
    {
        path: 'pays',
        component: PaysComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEmployeAkilApp.pays.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pays/:id/view',
        component: PaysDetailComponent,
        resolve: {
            pays: PaysResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEmployeAkilApp.pays.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pays/new',
        component: PaysUpdateComponent,
        resolve: {
            pays: PaysResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEmployeAkilApp.pays.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pays/:id/edit',
        component: PaysUpdateComponent,
        resolve: {
            pays: PaysResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEmployeAkilApp.pays.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const paysPopupRoute: Routes = [
    {
        path: 'pays/:id/delete',
        component: PaysDeletePopupComponent,
        resolve: {
            pays: PaysResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEmployeAkilApp.pays.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
