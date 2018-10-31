import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tache } from 'app/shared/model/tache.model';
import { TacheService } from './tache.service';
import { TacheComponent } from './tache.component';
import { TacheDetailComponent } from './tache-detail.component';
import { TacheUpdateComponent } from './tache-update.component';
import { TacheDeletePopupComponent } from './tache-delete-dialog.component';
import { ITache } from 'app/shared/model/tache.model';

@Injectable({ providedIn: 'root' })
export class TacheResolve implements Resolve<ITache> {
    constructor(private service: TacheService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((tache: HttpResponse<Tache>) => tache.body));
        }
        return of(new Tache());
    }
}

export const tacheRoute: Routes = [
    {
        path: 'tache',
        component: TacheComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEmployeAkilApp.tache.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tache/:id/view',
        component: TacheDetailComponent,
        resolve: {
            tache: TacheResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEmployeAkilApp.tache.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tache/new',
        component: TacheUpdateComponent,
        resolve: {
            tache: TacheResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEmployeAkilApp.tache.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tache/:id/edit',
        component: TacheUpdateComponent,
        resolve: {
            tache: TacheResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEmployeAkilApp.tache.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tachePopupRoute: Routes = [
    {
        path: 'tache/:id/delete',
        component: TacheDeletePopupComponent,
        resolve: {
            tache: TacheResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEmployeAkilApp.tache.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
