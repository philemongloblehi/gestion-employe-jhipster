import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEmploieHistory } from 'app/shared/model/emploie-history.model';

type EntityResponseType = HttpResponse<IEmploieHistory>;
type EntityArrayResponseType = HttpResponse<IEmploieHistory[]>;

@Injectable({ providedIn: 'root' })
export class EmploieHistoryService {
    public resourceUrl = SERVER_API_URL + 'api/emploie-histories';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/emploie-histories';

    constructor(private http: HttpClient) {}

    create(emploieHistory: IEmploieHistory): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(emploieHistory);
        return this.http
            .post<IEmploieHistory>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(emploieHistory: IEmploieHistory): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(emploieHistory);
        return this.http
            .put<IEmploieHistory>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IEmploieHistory>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IEmploieHistory[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IEmploieHistory[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(emploieHistory: IEmploieHistory): IEmploieHistory {
        const copy: IEmploieHistory = Object.assign({}, emploieHistory, {
            dateDebut: emploieHistory.dateDebut != null && emploieHistory.dateDebut.isValid() ? emploieHistory.dateDebut.toJSON() : null,
            dateFin: emploieHistory.dateFin != null && emploieHistory.dateFin.isValid() ? emploieHistory.dateFin.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dateDebut = res.body.dateDebut != null ? moment(res.body.dateDebut) : null;
        res.body.dateFin = res.body.dateFin != null ? moment(res.body.dateFin) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((emploieHistory: IEmploieHistory) => {
            emploieHistory.dateDebut = emploieHistory.dateDebut != null ? moment(emploieHistory.dateDebut) : null;
            emploieHistory.dateFin = emploieHistory.dateFin != null ? moment(emploieHistory.dateFin) : null;
        });
        return res;
    }
}
