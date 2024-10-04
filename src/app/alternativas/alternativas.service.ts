import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../app-config'; 

@Injectable({
  providedIn: 'root'
})

export class AlternativasService {

    private apiUrl = `${AppConfig.apiUrl}alternativas`;
    constructor(private http: HttpClient) {}

    //Crear una nueva alternativa

    postAlternativa(idProyecto:number, nombre:string, descripcion:string): Observable<any>{
        const body = {idProyecto, nombre, descripcion};
        return this.http.post(`${this.apiUrl}/${idProyecto}`, body);
        
    }

    //Obtener todas las alternativas
    getAlternativas(idProyecto:number): Observable<any[]>{
      return this.http.get<any[]>(`${this.apiUrl}/${idProyecto}`);
    }

    //Actualizar una alternativa por ID
    updateAlternativa(idProyecto:number, idAlternativa :number, nombre:string, descripcion:string): Observable<any>{
      const body = {nombre, descripcion};
      return this.http.put(`${this.apiUrl}/${idProyecto}/${idAlternativa}`, body);
    }

    deleteAlternativa(idProyecto:number, idAlternativa:number): Observable<any>{
      return this.http.delete(`${this.apiUrl}/${idProyecto}/${idAlternativa}`);
    }


}