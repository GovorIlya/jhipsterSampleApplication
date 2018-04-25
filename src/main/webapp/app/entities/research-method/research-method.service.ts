import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ResearchMethod } from './research-method.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ResearchMethod>;

@Injectable()
export class ResearchMethodService {

    private resourceUrl =  SERVER_API_URL + 'api/research-methods';

    constructor(private http: HttpClient) { }

    create(researchMethod: ResearchMethod): Observable<EntityResponseType> {
        const copy = this.convert(researchMethod);
        return this.http.post<ResearchMethod>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(researchMethod: ResearchMethod): Observable<EntityResponseType> {
        const copy = this.convert(researchMethod);
        return this.http.put<ResearchMethod>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ResearchMethod>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ResearchMethod[]>> {
        const options = createRequestOption(req);
        return this.http.get<ResearchMethod[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ResearchMethod[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ResearchMethod = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ResearchMethod[]>): HttpResponse<ResearchMethod[]> {
        const jsonResponse: ResearchMethod[] = res.body;
        const body: ResearchMethod[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ResearchMethod.
     */
    private convertItemFromServer(researchMethod: ResearchMethod): ResearchMethod {
        const copy: ResearchMethod = Object.assign({}, researchMethod);
        return copy;
    }

    /**
     * Convert a ResearchMethod to a JSON which can be sent to the server.
     */
    private convert(researchMethod: ResearchMethod): ResearchMethod {
        const copy: ResearchMethod = Object.assign({}, researchMethod);
        return copy;
    }
}
