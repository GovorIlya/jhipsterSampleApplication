import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { UnitDescription } from './unit-description.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UnitDescription>;

@Injectable()
export class UnitDescriptionService {

    private resourceUrl =  SERVER_API_URL + 'api/unit-descriptions';

    constructor(private http: HttpClient) { }

    create(unitDescription: UnitDescription): Observable<EntityResponseType> {
        const copy = this.convert(unitDescription);
        return this.http.post<UnitDescription>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(unitDescription: UnitDescription): Observable<EntityResponseType> {
        const copy = this.convert(unitDescription);
        return this.http.put<UnitDescription>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UnitDescription>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UnitDescription[]>> {
        const options = createRequestOption(req);
        return this.http.get<UnitDescription[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UnitDescription[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UnitDescription = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UnitDescription[]>): HttpResponse<UnitDescription[]> {
        const jsonResponse: UnitDescription[] = res.body;
        const body: UnitDescription[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UnitDescription.
     */
    private convertItemFromServer(unitDescription: UnitDescription): UnitDescription {
        const copy: UnitDescription = Object.assign({}, unitDescription);
        return copy;
    }

    /**
     * Convert a UnitDescription to a JSON which can be sent to the server.
     */
    private convert(unitDescription: UnitDescription): UnitDescription {
        const copy: UnitDescription = Object.assign({}, unitDescription);
        return copy;
    }
}
