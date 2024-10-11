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

  //hacer select de proyectos, que tengan criterios, alternativas y peso de criterios
  proyectos: any[] = [];
  dataSource: any[] = [];

  displayedColumns: string[] = []; // nombre de alternativas
  fullColumnList: string[] = [];  // Lista completa de columnas, incluyendo la de header
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
    this.generateTable();
  }


  criterios: string[] = [];
  ponderaciones: number[] = [];
  rows: number = 0;

  cargarcriterios() {
    const idProyecto = this.proyectoSeleccionado;
    this.criterios = [];
    this.criteriosService.getCriterios(idProyecto).subscribe(
      (data) => {
        this.criterios = data;
        this.displayedColumns = data.map(criterios => criterios.nombre);
        this.ponderaciones = data.map(criterios => criterios.peso)
        this.rows = this.displayedColumns.length;
        console.log("Criterios con pesos",this.displayedColumns);
        console.log("filas",this.rows);
      },
      (error) => {
        console.error('Error obteniendo los criterios:', error);
      }
    );
  }

  alternativas: any[] = [];
  nombresaltenativas: any[] = [];
  id_alternativas: any[] = [];
  columns: number = 0;
  cargaralternativas() {
    const idProyecto = this.proyectoSeleccionado;
    this.alternativas = [];
    this.alternativasService.getAlternativas(idProyecto).subscribe(
      (data) => {
        this.alternativas = data;
        this.nombresaltenativas = data.map(alternativas => alternativas.nombre)
        this.columns = this.nombresaltenativas.length;
        console.log("alternativas",this.nombresaltenativas);
        console.log("columnas",this.columns);
      },
      (error) => {
        console.error('Error obteniendo alternativas:', error);
      }
    );
  }

  generateTable() {
    // Wait for both cargaralternativas and cargarcriterios to finish
    forkJoin([
      this.alternativasService.getAlternativas(this.proyectoSeleccionado),
      this.criteriosService.getCriterios(this.proyectoSeleccionado)
    ]).subscribe(
      ([alternativasData, criteriosData]) => {
        // Set alternativas and criterios data
        this.alternativas = alternativasData;
        this.displayedColumns = alternativasData.map(alternativa => alternativa.nombre);
        this.columns = this.nombresaltenativas.length;
        this.id_alternativas = alternativasData.map(alternativas => alternativas.id);
        console.log(this.id_alternativas);

  
        this.criterios = criteriosData.map(criterio => criterio.nombre);
        this.ponderaciones = criteriosData.map(criterio => criterio.peso);
        this.rows = this.criterios.length;

  
        console.log(this.rows, this.columns);
        // Now that rows and columns have been set, generate the table
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
      },
      (error) => {
        console.error('Error obteniendo datos:', error);
      }
    );
  }


columnValues: { [key: string]: number[] } = {}; // Objeto para almacenar valores de cada columna

resultados: { [key: string]: number } = {}; // Objeto para almacenar la suma de cada columna

guardarValores() {
  // Reinicia los arreglos de valores
  this.columnValues = {};
  this.resultados = {}; // Reinicia los resultados

  // Inicializa los resultados a 0
  this.displayedColumns.forEach(column => {
    this.resultados[column] = 0; // Asegúrate de incluir 'ponderacion' si también lo necesitas
  });
  
  // Recorre dataSource y llena los arreglos
  this.dataSource.forEach((element, index) => {
    // Guarda el valor de ponderación
    if (!this.columnValues['ponderacion']) {
      this.columnValues['ponderacion'] = [];
    }
    this.columnValues['ponderacion'].push(element.ponderacion);

    // Recorre las otras columnas y guarda los valores
    this.displayedColumns.forEach(column => {
      if (!this.columnValues[column]) {
        this.columnValues[column] = [];
      }
      this.columnValues[column].push(element[column]);

      // Multiplica y suma el valor de ponderación con el valor de la columna
      this.resultados[column] += element.ponderacion * element[column];
    });
  });

  // Aquí puedes hacer algo con columnValues y resultados, como imprimirlo
  console.log('Valores de columnas:', this.columnValues);
  console.log('Resultados por columna:', this.resultados);
}
}
