import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CriteriosService } from './criterios.service';
import { ProyectoService } from '../proyectos/proyecto.service';

@Component({
  selector: 'app-criterios',
  standalone: true,
  imports: [RouterModule,FormsModule,HttpClientModule],
  templateUrl: './criterios.component.html',
  styleUrl: './criterios.component.css'
})

export class CriteriosComponent implements OnInit {

    criterios : any[]=[]
    proyectos : any[]=[]
    constructor(private criteriosService: CriteriosService, private proyectoService: ProyectoService) {}

    ngOnInit(){
      this.llenarTabla();
      this.cargarProyectos();
    }

    criteriosProj = {
      id : 0,
      idCriterios: 0,
      nombre: '',
      descripcion: ''
    }

    //Mostrar si hay criterios
    llenarTabla() {
      const idProyecto = this.criteriosProj.id; // Usamos el id del criterio como idProyecto
      
      this.criterios = [];
      this.criteriosService.getCriterios(idProyecto).subscribe(
        (data) => {
          this.criterios = data;
          console.log(this.criterios);
        },
        (error) => {
          console.error('Error obteniendo los criterios:', error);
        }
      );
    }

    cargarProyectos() {
      this.proyectos = [];

      this.proyectoService.getProyectos().subscribe(
        (data) => {
          this.proyectos = data;
          console.log(this.proyectos);
        },
        (error) => {
          console.error('Error obteniendo proyectos:', error);
        }
      )
    }
    

    hayCriterios(){
      return this.criterios.length>0;
    }

    seleccionarCriterio(alter:{id_proyecto:number, id:number, nombre:string, descripcion:string}){
      this.criteriosProj.id = alter.id_proyecto;
      this.criteriosProj.idCriterios = alter.id;
      this.criteriosProj.nombre = alter.nombre;
      this.criteriosProj.descripcion = alter.descripcion;
      
    }

    eliminarCriterio(){
      if(this.criteriosProj.id === 0 && this.criteriosProj.idCriterios === 0){
        alert('Debe ingresar ambos id para poder borrar el criterio');
        return;
      }

      this.criteriosService.deleteCriterio(this.criteriosProj.id,this.criteriosProj.idCriterios).subscribe()
      this.llenarTabla()
      return;
    }

    modificarCriterio(){
      if(this.criteriosProj.id === 0){
        alert('Ingresa un ID para poder modificar el criterio');
        return;
      }

      const criterioEncontrada = this.criterios.find(alter => alter.id === this.criteriosProj.idCriterios);

      if (criterioEncontrada) {
        this.criteriosService.updateCriterio(
          this.criteriosProj.id,
          this.criteriosProj.idCriterios,
          this.criteriosProj.nombre,
          this.criteriosProj.descripcion).subscribe()
        this.llenarTabla()
        return;
      }
    }

    agregarCriterio() {

    if(!this.criteriosProj.id || !this.criteriosProj.nombre || !this.criteriosProj.descripcion){
     alert('Debes de llenar todos los campos')
     return;
     }
    console.log('agregarCriterios llamado'); // Para asegurarte que se llama
    for (const element of this.criterios) {
        if (element.id == this.criteriosProj.id) {
            alert('Ya existe un criterio con ese ID');
            return;
        }
    }
    this.criteriosService.postCriterio(
        this.criteriosProj.id,
        this.criteriosProj.nombre,
        this.criteriosProj.descripcion
    ).subscribe(
        response => {
            console.log('Criterio creado con éxito', response);
            this.llenarTabla();
            this.limpiar();
        },
        error => {
            console.error('Error creando criterio:', error); // Asegúrate de registrar el error
            console.error('Detalles del error:', error.message, error.status);
        }
    );
}


    consultarCriterio(){
      if(!this.criteriosProj.id || this.criteriosProj.id === 0){
        alert("Debe ingresar un ID de Proyecto e ID de Criterio para poder consultar el criterio");
        return;
      }

      this.criteriosService.getCriterios(this.criteriosProj.id).subscribe(
        (data) => {
    
          if (data.length === 0) {
            alert("No hay criterios para este ID de Proyecto o el proyecto no existe.");
          } else {
            
            this.criterios = data; 
            this.criteriosProj.idCriterios = 0;
            this.criteriosProj.nombre = '';
            this.criteriosProj.descripcion = '';
            console.log(this.criterios); 
          }
        },
        (error) => {
          console.error('Error obteniendo los Criterios:', error);
          alert("Ocurrió un error al consultar los Criterios. Verifique el ID del proyecto.");
        }
      );
      
      this.llenarTabla();
  }


    limpiar(){
      this.criteriosProj.id = 0;
      this.criteriosProj.idCriterios = 0;
      this.criteriosProj.nombre = '';
      this.criteriosProj.descripcion = '';
    }


}
