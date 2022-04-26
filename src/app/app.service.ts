import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: "root"})
export class AppService {
    readonly apiURL: string;

    constructor(private http: HttpClient) {
        this.apiURL = 'https://sam-back-end.herokuapp.com';
    }

    // LOGIN
    login(data: any): Observable<any>{
        let body = {
            email: data.email,
            password: data.password
        }
        return this.http.post(`${this.apiURL}/login`, body);

    }

    logout(){
        let token = localStorage.getItem('token');
        return this.http.post(`${this.apiURL}/logout`, null,{headers:{authorization: `Bearer ${token}`}});
    }


    // AVALIACAO
    criarAvaliacao(data: any): Observable<any>{
        let body = data;
        let token = localStorage.getItem('token');

        return this.http.post(`${this.apiURL}/evaluation/create`, body, {headers:{authorization: `Bearer ${token}`}});
    }


    // ALUNO
    criarAluno(data: any): Observable<any>{
        let body = data;

        return this.http.post(`${this.apiURL}/student/create`, body);
    }

    editarAluno(data: any): Observable<any>{
        let body = data;
        let token = localStorage.getItem('token');

        return this.http.put(`${this.apiURL}/student`, body, {headers:{authorization: `Bearer ${token}`}});
    }

    getAluno(): Observable<any>{
        let token = localStorage.getItem('token');
        return this.http.get(`${this.apiURL}/student/me`, {headers:{authorization: `Bearer ${token}`}});
    }
    
    
    // MATERIA
    criarMateria(data: any): Observable<any>{
        let body = data;
        let token = localStorage.getItem('token');
        
        return this.http.post(`${this.apiURL}/meterias/create`, body, {headers:{authorization: `Bearer ${token}`}});
    }
    
    editarMateria(data: any): Observable<any>{
        let body = data;
        let token = localStorage.getItem('token');
        
        return this.http.put(`${this.apiURL}/materias`, body, {headers:{authorization: `Bearer ${token}`}});
    }
    
    getMaterias(periodo?: any, isAvaliada?: number): Observable<any>{

        let params = {};
        if(isAvaliada === 0 || isAvaliada === 1){
            params = {
                ...params,
                avaliadas: isAvaliada,
            }
            
        }
        if(periodo) {
            params = {
                ...params,
                periodo: `${periodo.ano}.${periodo.periodo}`
            }
        }
        
        let token = localStorage.getItem('token');
        return this.http.get(`${this.apiURL}/materias`, {params,headers:{authorization: `Bearer ${token}`}});
    }
    
    getUmaMateria(id:string): Observable<any>{
        let token = localStorage.getItem('token');
        return this.http.get(`${this.apiURL}/materias/${id}`, {headers:{authorization: `Bearer ${token}`}});
    }
    
    // RELATORIO
    getRelatorioMateria(id: number): Observable<any>{
        let token = localStorage.getItem('token');
        return this.http.get(`${this.apiURL}/report/${id}`, {headers:{authorization: `Bearer ${token}`}});
    }

    // PROFESSORES
    getProfessores(): Observable<any>{
        let token = localStorage.getItem('token');
        return this.http.get(`${this.apiURL}/professor`, {headers:{authorization: `Bearer ${token}`}});
    }

    // USUARIO
    getUsuario(): Observable<any>{
        let token = localStorage.getItem('token');
        return this.http.get(`${this.apiURL}/user`, {headers:{authorization: `Bearer ${token}`}});
    }

    
}