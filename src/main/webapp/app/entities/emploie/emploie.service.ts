import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEmploie } from 'app/shared/model/emploie.model';

type EntityResponseType = HttpResponse<IEmploie>;
type EntityArrayResponseType = HttpResponse<IEmploie[]>;

@Injectable({ providedIn: 'root' })
export class EmploieService {
    public resourceUrl = SERVER_API_URL + 'api/emploies';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/emploies';

    constructor(private http: HttpClient) {}

    create(emploie: IEmploie): Observable<EntityResponseType> {
        return this.http.post<IEmploie>(this.resourceUrl, emploie, { observe: 'response' });
    }

    update(emploie: IEmploie): Observable<EntityResponseType> {
        return this.http.put<IEmploie>(this.resourceUrl, emploie, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEmploie>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEmploie[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEmploie[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
