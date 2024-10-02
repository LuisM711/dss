import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CriteriosService } from './criterios.service';

@Component({
  selector: 'app-criterios',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './criterios.component.html',
  styleUrls: ['./criterios.component.css']
})
export class CriteriosComponent {
  projects: any[] = [];
  crit = {
    id_proyecto: 0,  // Cambia a 0 para que el usuario deba ingresar el ID del proyecto
    id: 0,
    nombre: '',
    descripcion: ''
  };

  constructor(private criteriosService: CriteriosService) {
    this.llenartabla();
  }

  llenartabla() {
    if (this.crit.id_proyecto !== 0) { // Solo cargar proyectos si el ID del proyecto no es 0
      this.projects = [];
      this.criteriosService.getCriterios(this.crit.id_proyecto).subscribe(
        data => {
          this.projects = data;
        },
        error => {
          console.error('Error obteniendo criterios', error);
        }
      );
    }
  }

  hayRegistros() {
    return this.projects.length > 0;
  }

  borrar() {
    if (this.crit.id === 0) {
      alert('Debe ingresar un ID para poder borrar el criterio');
      return;
    }
    this.criteriosService.deleteCriterio(this.crit.id_proyecto, this.crit.id).subscribe(
      response => {
        alert('Criterio eliminado con éxito');
        this.llenartabla();
        this.limpiar();
      },
      error => {
        console.error('Error eliminando criterio', error);
      }
    );
  }

  modificar() {
    if (this.crit.id === 0) {
      alert('Debe ingresar un ID para poder modificar el criterio');
      return;
    }
    const criterioEncontrado = this.projects.find(project => project.id === this.crit.id);
    if (criterioEncontrado) {
      this.criteriosService.updateCriterio(this.crit.id_proyecto, this.crit.id, this.crit.nombre, this.crit.descripcion).subscribe(
        response => {
          alert('Criterio modificado con éxito');
          this.llenartabla();
          this.limpiar();
        },
        error => {
          console.error('Error modificando criterio', error);
        }
      );
      return;
    }
    alert('No existe un criterio con ese ID');
  }

  agregar() {
    for (const element of this.projects) {
      // Verifica si ya existe un criterio con el mismo id en el mismo proyecto
      if (element.id === this.crit.id && element.id_proyecto === this.crit.id_proyecto) {
        alert('Ya existe un criterio con ese ID en este proyecto');
        return;
      }
    }
    // Utiliza crit.id_proyecto en lugar de una variable fija
    this.criteriosService.postCriterio(this.crit.id_proyecto, this.crit.nombre, this.crit.descripcion).subscribe(
      response => {
        alert('Criterio agregado con éxito');
        this.llenartabla();
        this.limpiar();
      },
      error => {
        console.error('Error agregando criterio', error);
      }
    );
  }

  consultar() {
    if (!this.crit.id || this.crit.id === 0 || this.crit.id_proyecto === 0) {
      alert("Debe ingresar un ID de proyecto y un ID de criterio para consultar.");
      return;
    }
    
    this.criteriosService.getSingleCriterio(this.crit.id_proyecto, this.crit.id).subscribe(
      criterioEncontrado => {
        this.crit.nombre = criterioEncontrado[0].nombre; // Ajusta según la estructura de tu respuesta
        this.crit.descripcion = criterioEncontrado[0].descripcion; // Ajusta según la estructura de tu respuesta
      },
      error => {
        console.error("Error al obtener el criterio", error);
        alert("Criterio no encontrado o error en la consulta.");
        this.limpiar(); // Llamar al método limpiar si no se encuentra el criterio
      }
    );
  }

  seleccionar(crit: { id_proyecto: number; id: number; nombre: string; descripcion: string }) {
    this.crit.id_proyecto = crit.id_proyecto;
    this.crit.id = crit.id;
    this.crit.nombre = crit.nombre;
    this.crit.descripcion = crit.descripcion;
  }

  limpiar() {
    this.crit = {
      id_proyecto: 0,  // Reinicia a 0 para que el usuario ingrese nuevamente
      id: 0,
      nombre: '',
      descripcion: ''
    };
  }
}
