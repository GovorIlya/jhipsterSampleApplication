import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { RatingMethod } from './rating-method.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RatingMethod>;

@Injectable()
export class RatingMethodService {

    private resourceUrl =  SERVER_API_URL + 'api/rating-methods';

    constructor(private http: HttpClient) { }

    create(ratingMethod: RatingMethod): Observable<EntityResponseType> {
        const copy = this.convert(ratingMethod);
        return this.http.post<RatingMethod>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(ratingMethod: RatingMethod): Observable<EntityResponseType> {
        const copy = this.convert(ratingMethod);
        return this.http.put<RatingMethod>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RatingMethod>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RatingMethod[]>> {
        const options = createRequestOption(req);
        return this.http.get<RatingMethod[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RatingMethod[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RatingMethod = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RatingMethod[]>): HttpResponse<RatingMethod[]> {
        const jsonResponse: RatingMethod[] = res.body;
        const body: RatingMethod[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RatingMethod.
     */
    private convertItemFromServer(ratingMethod: RatingMethod): RatingMethod {
        const copy: RatingMethod = Object.assign({}, ratingMethod);
        return copy;
    }

    /**
     * Convert a RatingMethod to a JSON which can be sent to the server.
     */
    private convert(ratingMethod: RatingMethod): RatingMethod {
        const copy: RatingMethod = Object.assign({}, ratingMethod);
        return copy;
    }
}
