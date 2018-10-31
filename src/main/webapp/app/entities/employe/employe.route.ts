import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employe } from 'app/shared/model/employe.model';
import { EmployeService } from './employe.service';
import { EmployeComponent } from './employe.component';
import { EmployeDetailComponent } from './employe-detail.component';
import { EmployeUpdateComponent } from './employe-update.component';
import { EmployeDeletePopupComponent } from './employe-delete-dialog.component';
import { IEmploye } from 'app/shared/model/employe.model';

@Injectable({ providedIn: 'root' })
export class EmployeResolve implements Resolve<IEmploye> {
    constructor(private service: EmployeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((employe: HttpResponse<Employe>) => employe.body));
        }
        return of(new Employe());
    }
}

export const employeRoute: Routes = [
    {
        path: 'employe',
        component: EmployeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEmployeAkilApp.employe.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'employe/:id/view',
        component: EmployeDetailComponent,
        resolve: {
            employe: EmployeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEmployeAkilApp.employe.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'employe/new',
        component: EmployeUpdateComponent,
        resolve: {
            employe: EmployeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEmployeAkilApp.employe.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'employe/:id/edit',
        component: EmployeUpdateComponent,
        resolve: {
            employe: EmployeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEmployeAkilApp.employe.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const employePopupRoute: Routes = [
    {
        path: 'employe/:id/delete',
        component: EmployeDeletePopupComponent,
        resolve: {
            employe: EmployeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEmployeAkilApp.employe.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
