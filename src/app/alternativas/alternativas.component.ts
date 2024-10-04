import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlternativasService } from './alternativas.service';
import { ProyectoService } from '../proyectos/proyecto.service';

@Component({
  selector: 'app-alternativas',
  standalone: true,
  imports: [RouterModule,FormsModule,HttpClientModule],
  templateUrl: './alternativas.component.html',
  styleUrl: './alternativas.component.css'
})

export class AlternativasComponent implements OnInit {

    alternativas : any[]=[]
    proyectos : any[]=[]
    constructor(private alternativasService: AlternativasService, private proyectoService: ProyectoService) {}

    ngOnInit(){
      this.llenarTabla();
      this.cargarProyectos();
    }

    alternativasProj = {
      id : 0,
      idAlternativa: 0,
      nombre: '',
      descripcion: ''
    }

    //Mostrar si hay alternativas
    llenarTabla() {
      const idProyecto = this.alternativasProj.id; // Usamos el id de la alternativa como idProyecto
      
      this.alternativas = [];
      this.alternativasService.getAlternativas(idProyecto).subscribe(
        (data) => {
          this.alternativas = data;
          console.log(this.alternativas);
        },
        (error) => {
          console.error('Error obteniendo alternativas:', error);
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
    

    hayAlternativas(){
      return this.alternativas.length>0;
    }

    seleccionarAlternativa(alter:{id_proyecto:number, id:number, nombre:string, descripcion:string}){
      this.alternativasProj.id = alter.id_proyecto;
      this.alternativasProj.idAlternativa = alter.id;
      this.alternativasProj.nombre = alter.nombre;
      this.alternativasProj.descripcion = alter.descripcion;
      
    }

    eliminarAlternativa(){
      if(this.alternativasProj.id === 0 && this.alternativasProj.idAlternativa === 0){
        alert('Debe ingresar ambos id para poder borrar la alternativa');
        return;
      }

      this.alternativasService.deleteAlternativa(this.alternativasProj.id,this.alternativasProj.idAlternativa).subscribe()
      this.llenarTabla()
      return;
    }

    modificarAlternativa(){
      if(this.alternativasProj.id === 0){
        alert('Ingresa un ID para poder modificar la alternativa');
        return;
      }

      const alternativaEncontrada = this.alternativas.find(alter => alter.id === this.alternativasProj.idAlternativa);

      if (alternativaEncontrada) {
        this.alternativasService.updateAlternativa(
          this.alternativasProj.id,
          this.alternativasProj.idAlternativa,
          this.alternativasProj.nombre,
          this.alternativasProj.descripcion).subscribe()
        this.llenarTabla()
        return;
      }
    }

    agregarAlternativa() {

    if(!this.alternativasProj.id || !this.alternativasProj.nombre || !this.alternativasProj.descripcion){
     alert('Debes de llenar todos los campos')
     return;
     }
    console.log('agregarAlternativa llamado'); // Para asegurarte que se llama
    for (const element of this.alternativas) {
        if (element.id == this.alternativasProj.id) {
            alert('Ya existe una alternativa con ese ID');
            return;
        }
    }
    this.alternativasService.postAlternativa(
        this.alternativasProj.id,
        this.alternativasProj.nombre,
        this.alternativasProj.descripcion
    ).subscribe(
        response => {
            console.log('Alternativa creada con éxito', response);
            this.llenarTabla();
            this.limpiar();
        },
        error => {
            console.error('Error creando alternativa:', error); // Asegúrate de registrar el error
            console.error('Detalles del error:', error.message, error.status);
        }
    );
}


    consultarAlternativa(){
      if(!this.alternativasProj.id || this.alternativasProj.id === 0){
        alert("Debe ingresar un ID de Proyecto e ID de Alternativa para poder consultar la alternativa");
        return;
      }

      this.alternativasService.getAlternativas(this.alternativasProj.id).subscribe(
        (data) => {
    
          if (data.length === 0) {
            alert("No hay alternativas para este ID de Proyecto o el proyecto no existe.");
          } else {
            
            this.alternativas = data; 
            this.alternativasProj.idAlternativa = 0;
            this.alternativasProj.nombre = '';
            this.alternativasProj.descripcion = '';
            console.log(this.alternativas); 
          }
        },
        (error) => {
          console.error('Error obteniendo alternativas:', error);
          alert("Ocurrió un error al consultar las alternativas. Verifique el ID del proyecto.");
        }
      );
      
      this.llenarTabla();
  }


    limpiar(){
      this.alternativasProj.id = 0;
      this.alternativasProj.idAlternativa = 0;
      this.alternativasProj.nombre = '';
      this.alternativasProj.descripcion = '';
    }


}
