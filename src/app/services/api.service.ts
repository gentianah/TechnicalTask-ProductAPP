import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment.dev";
import { debug } from "node:console";
import { HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) { }
    //get method
    get<HttpResponseModel>(path: string): Observable<HttpResponseModel> {
        const url = `${environment.apiUrl}/${path}`
        return this.http.get<HttpResponseModel>(url);
    }
    //get by id: int
    getById<HttpResponseModel>(path: string, id: number): Observable<HttpResponseModel> {
        const url = `${environment.apiUrl}/${path}/${id}`;
        return this.http.get<HttpResponseModel>(url);
    }
    //get by id: number
    getByuserId<HttpResponseModel>(path: string, id: string): Observable<HttpResponseModel> {
        const url = `${environment.apiUrl}/${path}/${id}`;
        return this.http.get<HttpResponseModel>(url);
    }
    //update 
    put<HttpResponseModel, RequestModel>(path: string, data: RequestModel): Observable<HttpResponseModel> {
        const url = `${environment.apiUrl}/${path}`;
        return this.http.put<HttpResponseModel>(url, data);
    }
    //post
    post<HttpResponseModel, RequestModel>(path: string, data: RequestModel): Observable<HttpResponseModel> {
        const url = `${environment.apiUrl}/${path}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.post<HttpResponseModel>(url, data, { headers });
    }

    delete<HttpResponseModel>(path: string): Observable<HttpResponseModel> {
        const url = `${environment.apiUrl}/${path}`;
        return this.http.delete<HttpResponseModel>(url);
    }

    postProducts<HttpResponseModel, RequestModel>(path: string, data: RequestModel): Observable<HttpResponseModel> {
        const url = `${environment.apiUrl}/${path}`;

        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

        return this.http.post<HttpResponseModel>(url, data, { headers });
    }
}