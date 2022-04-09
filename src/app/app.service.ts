import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: "root"})
export class AppService {
    readonly apiURL: string;

    constructor(private http: HttpClient) {
        this.apiURL = 'https://sam-back-end.herokuapp.com';
    }

    login(data: any): Observable<any>{
        let body = {
            email: data.email,
            password: data.password
        }
        return this.http.post(`${this.apiURL}/login`, body);

    }
}