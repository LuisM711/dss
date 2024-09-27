import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProyectoService } from './proyecto.service';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css'
})

export class ProyectosComponent {
  projects : any[]=[]
  constructor(private proyectoService: ProyectoService) {
    this.llenartabla()
  }

  proj = {
      id: 0,
      Nombre: '',
      Descripcion: ''
  };
  llenartabla(){
    this.projects=[]
    this.proyectoService.getProyectos().subscribe(
      (data) => {
        this.projects = data;
        console.log(this.projects)
      },
      (error) => {
        console.error('Error obteniendo proyectos:', error);
      }
    );
  }
  hayRegistros(){
    return this.projects.length>0;
  }
  borrar(){
    if(this.proj.id === 0){
      alert('Debe ingresar un id para poder borrar el proyecto');
      return;
    }
    this.proyectoService.deleteProyecto(this.proj.id).subscribe()
    this.llenartabla()
    return;
  }
  modificar(){
    if(this.proj.id === 0){
      alert('Debe ingresar un id para poder consultar el proyecto');
      return;
    }
    if ((this.projects.filter(project =>project.id === this.proj.id)).length>0) {
      this.proyectoService.updateProyecto(this.proj.id,this.proj.Nombre,this.proj.Descripcion).subscribe()
      this.llenartabla()
      return;
    }
    alert('No existe artículo con ese código')
  }

  agregar(){
    for(const element of this.projects){
      if(element.id == this.proj.id){
        alert('Ya existe un proyecto con ese código');
        return;
      }
    }
    this.proyectoService.postProyecto(this.proj.Nombre,this.proj.Descripcion).subscribe()
    this.llenartabla()
    this.limpiar();
  }
  consultar(){
    if(!this.proj.id || this.proj.id===0){
      alert("Debe ingresar un id para poder consultar el proyecto");
      return;
    }
    const proyectoEncontrado = this.projects.find(project => project.id === this.proj.id);
    if (proyectoEncontrado) {
        this.proj.Nombre = proyectoEncontrado.nombre;
        this.proj.Descripcion = proyectoEncontrado.objetivo;
    } else {
        alert("Proyecto no encontrado con el ID ingresado.");
        this.limpiar;
    }
  }
  seleccionar(proj:{id:number,nombre:string,objetivo:string}){
    this.proj.id=proj.id;
    this.proj.Nombre=proj.nombre;
    this.proj.Descripcion=proj.objetivo;
  }
  limpiar(){
    this.proj = {
        id: 0,
        Nombre: '',
        Descripcion: ''
    };
  }
}
