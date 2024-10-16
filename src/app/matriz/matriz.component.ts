import { Component } from '@angular/core';
 //select
 import {FormsModule} from '@angular/forms';
 import {MatInputModule} from '@angular/material/input';
 import {MatSelectModule} from '@angular/material/select';
 import {MatFormFieldModule} from '@angular/material/form-field';
 //tabla
 import { NgFor, NgIf } from '@angular/common';
 import { MatTableModule } from '@angular/material/table';
 //import
 import { MatrizService } from './matriz.service';
 import { CriteriosService } from '../criterios/criterios.service';
 import { provideHttpClient } from '@angular/common/http';
 import { AlternativasService } from '../alternativas/alternativas.service';
import { L } from '@angular/cdk/keycodes';
import { forkJoin } from 'rxjs';

 interface Proyectos {
   value: string;
   viewValue: string;
 }

 @Component({
   selector: 'app-matriz',
   standalone: true,
   imports: [
    MatFormFieldModule
    ,MatSelectModule
    ,MatInputModule
    ,FormsModule
    ,NgFor
    ,NgIf
    ,MatTableModule
    ],

   templateUrl: './matriz.component.html',
   styleUrl: './matriz.component.css'
 })



 export class MatrizComponent{
  proyectos: any[] = [];
  dataSource: any[] = [];

  displayedColumns: string[] = [];
  fullColumnList: string[] = [];
  proyectoSeleccionado: number = 0;
   
  criteriosProj = {
    id : 0,
    idCriterios: 0,
    nombre: '',
    descripcion: ''
  }
  alternativasProj = {
    id : 0,
    idAlternativa: 0,
    nombre: '',
    descripcion: ''
  }

  constructor(private matrizService: MatrizService, private criteriosService: CriteriosService, private alternativasService: AlternativasService) {
    this.llenarproyectos();
  }

  llenarproyectos(){
    this.proyectos=[]
    this.matrizService.getProyectos().subscribe(
      (data) => {
        this.proyectos = data;
        console.log(this.proyectos)
      },
      (error) => {
        console.error('Error obteniendo proyectos:', error);
      }
    );
  }


  onProyectoSeleccionado(proyectoId: number): void {
    this.errorCargandoAlternativas = false;
    this.errorCargandoCriterios = false;
    this.generateTable();
  }



  criterios: string[] = [];
  ponderaciones: number[] = [];
  rows: number = 0;
  errorCargandoCriterios: boolean = false;
  
cargarcriterios() {
  const idProyecto = this.proyectoSeleccionado;
  this.criterios = [];
  this.errorCargandoCriterios = false;

  this.criteriosService.getCriterios(idProyecto).subscribe(
    (data) => {
      if (data.length === 0) {
        this.errorCargandoCriterios = true;
      } else {
        this.criterios = data;
        this.displayedColumns = data.map(criterio => criterio.nombre);
        this.ponderaciones = data.map(criterio => criterio.peso);
        this.rows = this.displayedColumns.length;

        console.log("Criterios con pesos", this.displayedColumns);
        console.log("Filas", this.rows);
      }
    },
    (error) => {
      console.error('Error obteniendo los criterios:', error);
      this.errorCargandoCriterios = true;
    }
  );
}

  alternativas: any[] = [];
  nombresaltenativas: any[] = [];
  id_alternativas: any[] = [];
  columns: number = 0;

  errorCargandoAlternativas: boolean = false;

cargaralternativas() {
  const idProyecto = this.proyectoSeleccionado;
  this.alternativas = [];
  this.errorCargandoAlternativas = false;

  this.alternativasService.getAlternativas(idProyecto).subscribe(
    (data) => {
      if (data.length === 0) {
        this.errorCargandoAlternativas = true;
      } else {
        this.alternativas = data;
        this.nombresaltenativas = data.map(alternativa => alternativa.nombre);
        this.columns = this.nombresaltenativas.length;
      }
    },
    (error) => {
      console.error('Error obteniendo alternativas:', error);
      this.errorCargandoAlternativas = true;
    }
  );

  console.log('alternativas datos', this.alternativas);
  console.log("alternativas", this.nombresaltenativas);
  console.log("columnas", this.columns);
}

errorCargandoPonderaciones: boolean = false;

generateTable() {
  forkJoin([
    this.alternativasService.getAlternativas(this.proyectoSeleccionado),
    this.criteriosService.getCriterios(this.proyectoSeleccionado)
  ]).subscribe(
    ([alternativasData, criteriosData]) => {
      if (alternativasData.length === 0) {
        this.errorCargandoAlternativas = true;
      } else {
        this.errorCargandoAlternativas = false;
        this.alternativas = alternativasData;
        this.displayedColumns = alternativasData.map(alternativa => alternativa.nombre);
        this.id_alternativas = alternativasData.map(alternativas => alternativas.id);
        this.columns = this.displayedColumns.length;
        console.log('Alternativas:', this.id_alternativas);
      }

      if (criteriosData.length === 0) {
        this.errorCargandoCriterios = true;
      } else {
        this.errorCargandoCriterios = false;
        this.criterios = criteriosData.map(criterio => criterio.nombre);
        this.ponderaciones = criteriosData.map(criterio => criterio.peso || 0);
        this.rows = this.criterios.length;
        console.log('Criterios:', this.criterios);
        console.log('Filas:', this.rows);
        

        if (this.ponderaciones.every(peso => peso === 0)) {
          this.errorCargandoPonderaciones = true;
        } else {
          this.errorCargandoPonderaciones = false;
        }
      }

      if (!this.errorCargandoAlternativas && !this.errorCargandoCriterios) {
        this.fullColumnList = ['header', 'ponderacion', ...this.displayedColumns];
        this.dataSource = Array.from({ length: this.rows }, (_, i) => {
          const row: any = { 
            header: this.criterios[i],
            ponderacion: this.ponderaciones[i] || 0 
          };
  
          this.displayedColumns.forEach(column => {
            row[column] = 1;
          });
          return row;
        });
        console.log('Tabla generada:', this.dataSource);
      }
    },
    (error) => {
      console.error('Error obteniendo datos:', error);
      this.errorCargandoAlternativas = true;
      this.errorCargandoCriterios = true;
    }
  );
}


columnValues: { [key: string]: number[] } = {};
resultados: { [key: string]: number } = {};

guardarValores() {

  this.columnValues = {};
  this.resultados = {};
  
  this.displayedColumns.forEach(column => {
    this.resultados[column] = 0;
  });
  

  this.dataSource.forEach((element, index) => {
    if (!this.columnValues['ponderacion']) {
      this.columnValues['ponderacion'] = [];
    }
    this.columnValues['ponderacion'].push(element.ponderacion);

    this.displayedColumns.forEach(column => {
      if (!this.columnValues[column]) {
        this.columnValues[column] = [];
      }
      this.columnValues[column].push(element[column]);
      this.resultados[column] += element.ponderacion * element[column];
      
    });
  });

  const columnas = this.resultados['length'];
  let proyecto = new Array(columnas).fill(this.proyectoSeleccionado);
  console.log('Valores de columnas:', this.columnValues);
  console.log('Resultados por columna:', this.resultados);
  console.log('ID de alternativa', this.id_alternativas);
  console.log('ID de Proyecto',proyecto);
  
  console.log('limite');
  console.log('Resultados por columna:', this.resultados);

  const combinacion = Object.keys(this.resultados).map((key, index) => ({
    id_alternativa: this.id_alternativas[index],
    id_proyecto: this.proyectoSeleccionado,
    resultado: this.resultados[key]
  }));

  console.log('resultado', combinacion);
  
}
}
