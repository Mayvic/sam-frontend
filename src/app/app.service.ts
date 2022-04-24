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

    // getMateriasNaoAvaliadas(periodo: any): Observable<any>{
        
    //     let token = localStorage.getItem('token');
    //     let params = {
    //         avaliadas: 0,
    //         periodo: `${periodo.ano}.${periodo.periodo}`
    //     }
    //     return this.http.get(`${this.apiURL}/materias`, {params,headers:{authorization: `Bearer ${token}`}});
    // }

    getMaterias(periodo: any, isAvaliada?: number): Observable<any>{
        let params;
        if(isAvaliada == 0 || isAvaliada == 1){
            params = {
                avaliadas: isAvaliada,
                periodo: `${periodo.ano}.${periodo.periodo}`
            }

        }else {
            params = {
                periodo: `${periodo.ano}.${periodo.periodo}`
            }
        }
        
        let token = localStorage.getItem('token');
        return this.http.get(`${this.apiURL}/materias`, {params,headers:{authorization: `Bearer ${token}`}});
    }

    getRelatorioMateira(id: number): Observable<any>{
        let token = localStorage.getItem('token');
        return this.http.get(`${this.apiURL}/report/${id}`, {headers:{authorization: `Bearer ${token}`}});
    }

    logout(){
        let token = localStorage.getItem('token');
        return this.http.post(`${this.apiURL}/logout`, null,{headers:{authorization: `Bearer ${token}`}});
    }
}