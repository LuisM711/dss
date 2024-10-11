import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../app-config';

@Injectable({
  providedIn: 'root'
})

export class MatrizService {

  private apicriterios = 'http://localhost:8500/criterios';
  private apialternativas = 'http://localhost:8500/alternativas';
  private apiproyectos = 'http://localhost:8500/proyecto';
  constructor(private http: HttpClient) {}
  // GET: Obtener todos los proyectos
  getProyectos(){
    return this.http.get<any[]>(`${this.apiproyectos}`);
  }
  // GET de criterios
  getCriterios(id_proyecto: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apicriterios}/${id_proyecto}`);
  }
  // GET de Alternativas
  getAlternativas(idProyecto:number): Observable<any[]>{
    return this.http.get<any[]>(`${this.apialternativas}/${idProyecto}`);
  }

}
