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

    criarAvaliacao(data: any): Observable<any>{
        let body = data;
        let token = localStorage.getItem('token');
        // let token = user.token.token;

        return this.http.post(`${this.apiURL}/evaluation/create`, body, {headers:{authorization: `Bearer ${token}`}});
    }

    getMateriasNaoAvaliadas(): Observable<any>{
        
        let token = localStorage.getItem('token');
        return this.http.get(`${this.apiURL}/materias/nao_avaliadas`, {headers:{authorization: `Bearer ${token}`}});
    }

    getMaterias(): Observable<any>{
        
        let token = localStorage.getItem('token');
        return this.http.get(`${this.apiURL}/materias`, {headers:{authorization: `Bearer ${token}`}});
    }

    getRelatorioMateira(id: number): Observable<any>{
        let token = localStorage.getItem('token');
        return this.http.get(`${this.apiURL}/report/${id}`, {headers:{authorization: `Bearer ${token}`}});
    }
}