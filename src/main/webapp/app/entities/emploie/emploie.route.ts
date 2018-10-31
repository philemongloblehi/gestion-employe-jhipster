import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Emploie } from 'app/shared/model/emploie.model';
import { EmploieService } from './emploie.service';
import { EmploieComponent } from './emploie.component';
import { EmploieDetailComponent } from './emploie-detail.component';
import { EmploieUpdateComponent } from './emploie-update.component';
import { EmploieDeletePopupComponent } from './emploie-delete-dialog.component';
import { IEmploie } from 'app/shared/model/emploie.model';

@Injectable({ providedIn: 'root' })
export class EmploieResolve implements Resolve<IEmploie> {
    constructor(private service: EmploieService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((emploie: HttpResponse<Emploie>) => emploie.body));
        }
        return of(new Emploie());
    }
}

export const emploieRoute: Routes = [
    {
        path: 'emploie',
        component: EmploieComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'gestionEmployeAkilApp.emploie.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'emploie/:id/view',
        component: EmploieDetailComponent,
        resolve: {
            emploie: EmploieResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEmployeAkilApp.emploie.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'emploie/new',
        component: EmploieUpdateComponent,
        resolve: {
            emploie: EmploieResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEmployeAkilApp.emploie.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'emploie/:id/edit',
        component: EmploieUpdateComponent,
        resolve: {
            emploie: EmploieResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEmployeAkilApp.emploie.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const emploiePopupRoute: Routes = [
    {
        path: 'emploie/:id/delete',
        component: EmploieDeletePopupComponent,
        resolve: {
            emploie: EmploieResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEmployeAkilApp.emploie.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
