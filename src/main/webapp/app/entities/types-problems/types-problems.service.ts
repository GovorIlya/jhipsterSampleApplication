import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TypesProblems } from './types-problems.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TypesProblems>;

@Injectable()
export class TypesProblemsService {

    private resourceUrl =  SERVER_API_URL + 'api/types-problems';

    constructor(private http: HttpClient) { }

    create(typesProblems: TypesProblems): Observable<EntityResponseType> {
        const copy = this.convert(typesProblems);
        return this.http.post<TypesProblems>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(typesProblems: TypesProblems): Observable<EntityResponseType> {
        const copy = this.convert(typesProblems);
        return this.http.put<TypesProblems>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TypesProblems>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TypesProblems[]>> {
        const options = createRequestOption(req);
        return this.http.get<TypesProblems[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TypesProblems[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TypesProblems = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TypesProblems[]>): HttpResponse<TypesProblems[]> {
        const jsonResponse: TypesProblems[] = res.body;
        const body: TypesProblems[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TypesProblems.
     */
    private convertItemFromServer(typesProblems: TypesProblems): TypesProblems {
        const copy: TypesProblems = Object.assign({}, typesProblems);
        return copy;
    }

    /**
     * Convert a TypesProblems to a JSON which can be sent to the server.
     */
    private convert(typesProblems: TypesProblems): TypesProblems {
        const copy: TypesProblems = Object.assign({}, typesProblems);
        return copy;
    }
}
