import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDepartement } from 'app/shared/model/departement.model';

type EntityResponseType = HttpResponse<IDepartement>;
type EntityArrayResponseType = HttpResponse<IDepartement[]>;

@Injectable({ providedIn: 'root' })
export class DepartementService {
    public resourceUrl = SERVER_API_URL + 'api/departements';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/departements';

    constructor(private http: HttpClient) {}

    create(departement: IDepartement): Observable<EntityResponseType> {
        return this.http.post<IDepartement>(this.resourceUrl, departement, { observe: 'response' });
    }

    update(departement: IDepartement): Observable<EntityResponseType> {
        return this.http.put<IDepartement>(this.resourceUrl, departement, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDepartement>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDepartement[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDepartement[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
