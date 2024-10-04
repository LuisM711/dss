import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../app-config';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private apiUrl = `${AppConfig.apiUrl}proyecto`; // Cambia esta URL por la del servidor

  constructor(private http: HttpClient) {}

  // POST: Crear un nuevo proyecto
  postProyecto(nombre: string, objetivo: string): Observable<any> {
    const body = { nombre, objetivo };
    return this.http.post(`${this.apiUrl}/`, body);
  }

  // GET: Obtener todos los proyectos
  getProyectos(){
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // PUT: Actualizar un proyecto por ID
  updateProyecto(proyecto_id: number, nombre: string, objetivo: string): Observable<any> {
    const body = { nombre, objetivo };
    return this.http.put(`${this.apiUrl}/${proyecto_id}`, body);
  }

  // DELETE: Eliminar un proyecto por ID
  deleteProyecto(proyecto_id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${proyecto_id}`);
  }
}
