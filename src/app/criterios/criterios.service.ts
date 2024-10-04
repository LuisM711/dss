import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../app-config'; 

@Injectable({
  providedIn: 'root'
})
export class CriteriosService {
  private apiUrl = `${AppConfig.apiUrl}criterios`; // Cambia esta URL por la del servidor

  constructor(private http: HttpClient) { }

   // POST: Crear un nuevo criterio
  postCriterio(id_proyecto: number, nombre: string, descripcion: string): Observable<any> {
    const body = {nombre, descripcion, peso: 1 }; // Puedes ajustar el peso si es necesario
    return this.http.post(`${this.apiUrl}/${id_proyecto}`, body);
  }

  // GET: Obtener todos los criterios de un proyecto
  getCriterios(id_proyecto: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id_proyecto}`);
  }

  getSingleCriterio(id_proyecto: number, id_criterio: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id_proyecto}/${id_criterio}`);
  }

  // PUT: Actualizar un criterio por ID
  updateCriterio(id_proyecto: number, id_criterio: number, nombre: string, descripcion: string): Observable<any> {
    const body = { nombre, descripcion, peso: 1 };
    return this.http.put(`${this.apiUrl}/${id_proyecto}/${id_criterio}`, body);
  }

  // DELETE: Eliminar un criterio por ID
  deleteCriterio(id_proyecto: number, id_criterio: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id_proyecto}/${id_criterio}`);
  }

}
