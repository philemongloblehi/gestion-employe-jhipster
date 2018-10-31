import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmploieHistory } from 'app/shared/model/emploie-history.model';
import { EmploieHistoryService } from './emploie-history.service';
import { EmploieHistoryComponent } from './emploie-history.component';
import { EmploieHistoryDetailComponent } from './emploie-history-detail.component';
import { EmploieHistoryUpdateComponent } from './emploie-history-update.component';
import { EmploieHistoryDeletePopupComponent } from './emploie-history-delete-dialog.component';
import { IEmploieHistory } from 'app/shared/model/emploie-history.model';

@Injectable({ providedIn: 'root' })
export class EmploieHistoryResolve implements Resolve<IEmploieHistory> {
    constructor(private service: EmploieHistoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((emploieHistory: HttpResponse<EmploieHistory>) => emploieHistory.body));
        }
        return of(new EmploieHistory());
    }
}

export const emploieHistoryRoute: Routes = [
    {
        path: 'emploie-history',
        component: EmploieHistoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEmployeAkilApp.emploieHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'emploie-history/:id/view',
        component: EmploieHistoryDetailComponent,
        resolve: {
            emploieHistory: EmploieHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEmployeAkilApp.emploieHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'emploie-history/new',
        component: EmploieHistoryUpdateComponent,
        resolve: {
            emploieHistory: EmploieHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEmployeAkilApp.emploieHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'emploie-history/:id/edit',
        component: EmploieHistoryUpdateComponent,
        resolve: {
            emploieHistory: EmploieHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEmployeAkilApp.emploieHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const emploieHistoryPopupRoute: Routes = [
    {
        path: 'emploie-history/:id/delete',
        component: EmploieHistoryDeletePopupComponent,
        resolve: {
            emploieHistory: EmploieHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEmployeAkilApp.emploieHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
