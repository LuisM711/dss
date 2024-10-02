import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CriteriosService } from './criterios.service';

@Component({
  selector: 'app-criterios',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './criterios.component.html',
  styleUrls: ['./criterios.component.css'] // Cambia 'styleUrl' a 'styleUrls'
})
export class CriteriosComponent {
  projects: any[] = [];
  id_proyecto: number = 1; // Cambia esto al ID del proyecto que estás usando

  crit = {
    id_proyecto: this.id_proyecto,
    id: 0,
    nombre: '',
    descripcion: ''
  };

  constructor(private criteriosService: CriteriosService) {
    this.llenartabla();
  }

  llenartabla() {
    this.projects = [];
    this.criteriosService.getCriterios(this.id_proyecto).subscribe(
      data => {
        this.projects = data;
      },
      error => {
        console.error('Error obteniendo criterios', error);
      }
    );
  }

  hayRegistros() {
    return this.projects.length > 0;
  }

  borrar() {
    if (this.crit.id === 0) {
      alert('Debe ingresar un ID para poder borrar el criterio');
      return;
    }
    this.criteriosService.deleteCriterio(this.id_proyecto, this.crit.id).subscribe(
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
      this.criteriosService.updateCriterio(this.id_proyecto, this.crit.id, this.crit.nombre, this.crit.descripcion).subscribe(
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
      if (element.id === this.crit.id) {
        alert('Ya existe un criterio con ese ID');
        return;
      }
    }
    this.criteriosService.postCriterio(this.id_proyecto, this.crit.nombre, this.crit.descripcion).subscribe(
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
    if (!this.crit.id || this.crit.id === 0) {
      alert("Debe ingresar un ID para poder consultar el criterio");
      return;
    }
    const criterioEncontrado = this.projects.find(project => project.id === this.crit.id);
    if (criterioEncontrado) {
      this.crit.nombre = criterioEncontrado.nombre;
      this.crit.descripcion = criterioEncontrado.descripcion;
    } else {
      alert("Criterio no encontrado con el ID ingresado.");
      this.limpiar();
    }
  }

  seleccionar(crit: { id_proyecto: number; id: number; nombre: string; descripcion: string }) {
    this.crit.id_proyecto = crit.id_proyecto;
    this.crit.id = crit.id;
    this.crit.nombre = crit.nombre;
    this.crit.descripcion = crit.descripcion;
  }

  limpiar() {
    this.crit = {
      id_proyecto: this.id_proyecto,
      id: 0,
      nombre: '',
      descripcion: ''
    };
  }
}
