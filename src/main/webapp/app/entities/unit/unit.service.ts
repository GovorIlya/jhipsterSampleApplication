import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Unit } from './unit.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Unit>;

@Injectable()
export class UnitService {

    private resourceUrl =  SERVER_API_URL + 'api/units';

    constructor(private http: HttpClient) { }

    create(unit: Unit): Observable<EntityResponseType> {
        const copy = this.convert(unit);
        return this.http.post<Unit>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(unit: Unit): Observable<EntityResponseType> {
        const copy = this.convert(unit);
        return this.http.put<Unit>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Unit>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Unit[]>> {
        const options = createRequestOption(req);
        return this.http.get<Unit[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Unit[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Unit = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Unit[]>): HttpResponse<Unit[]> {
        const jsonResponse: Unit[] = res.body;
        const body: Unit[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Unit.
     */
    private convertItemFromServer(unit: Unit): Unit {
        const copy: Unit = Object.assign({}, unit);
        return copy;
    }

    /**
     * Convert a Unit to a JSON which can be sent to the server.
     */
    private convert(unit: Unit): Unit {
        const copy: Unit = Object.assign({}, unit);
        return copy;
    }
}
