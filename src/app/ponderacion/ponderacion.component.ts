import { Component } from '@angular/core';
//tabla
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
//select
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
//import
import { PonderacionService } from './ponderacion.service';
import { CriteriosService } from '../criterios/criterios.service';
import { provideHttpClient } from '@angular/common/http';
import { L } from '@angular/cdk/keycodes';
import { forkJoin } from 'rxjs';

interface Proyectos {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-ponderacion',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './ponderacion.component.html',
  styleUrl: './ponderacion.component.css'
})

export class PonderacionComponent {
  
  proyectos: any[] = [];
  proyectoSeleccionado: number = 0;
  columns = 0;
  dataSource: any[] = [];
  displayedColumns: string[] = [];
  fullColumnList: string[] = [];
  criterios: string[] = [];
  id_criterios: any[] = [];


  constructor(private ponderacionService: PonderacionService, private criteriosService: CriteriosService)
  {
    this.llenarproyectos();
  }

  llenarproyectos(){
    this.proyectos=[]
    this.ponderacionService.getProyectos().subscribe(
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
    this.cargarcriterios();
  }
  
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
          this.displayedColumns = data.map(criterios => criterios.nombre);
          this.id_criterios = data.map(criterios => criterios.id);
          this.generateTable();
        }
      },
      (error) => {
        console.error('Error obteniendo los criterios:', error);
        this.errorCargandoCriterios = true;
      }
    );
  }

 
  

  generateTable() {
    this.columns = this.criterios.length;
    console.log(this.columns);
    this.fullColumnList = ['header', ...this.displayedColumns];
    this.dataSource = Array.from({ length: this.columns }, (_, i) => {
      const row: any = { 
        header: this.displayedColumns[i]
        };
        this.displayedColumns.forEach(column => {
          row[column] = 1;
        });

      return row;
    });
  }

  options = [
    { value: 5, viewValue: '5' },
    { value: 4, viewValue: '4' },
    { value: 3, viewValue: '3' },
    { value: 2, viewValue: '2' },
    { value: 1, viewValue: '1' },
    { value: .50, viewValue: '1/2' },
    { value: .33, viewValue: '1/3' },
    { value: .25, viewValue: '1/4' },
    { value: .20, viewValue: '1/5' },
  ];

  updateOppositeValue(rowIndex: number, colIndex: number, newValue: number) {
    const oppositeRowIndex = rowIndex;
    const oppositeColIndex = colIndex;
    
    if (newValue === 5) {
      this.dataSource[oppositeColIndex][this.displayedColumns[oppositeRowIndex]] = 0.20;
      const option = this.options.find(option => option.value === 0.20);
      if (option) {
        this.dataSource[oppositeColIndex]['viewValue_' + this.displayedColumns[oppositeRowIndex]] = '1/5';
      }

    } else if (newValue === 4){
      this.dataSource[oppositeColIndex][this.displayedColumns[oppositeRowIndex]] = 0.25;
      const option = this.options.find(option => option.value === 0.25);
      if (option) {
        this.dataSource[oppositeColIndex]['viewValue_' + this.displayedColumns[oppositeRowIndex]] = '1/4';
      }
    } else if (newValue === 3){
      this.dataSource[oppositeColIndex][this.displayedColumns[oppositeRowIndex]] = 0.33;
      const option = this.options.find(option => option.value === 0.33);
      if (option) {
        this.dataSource[oppositeColIndex]['viewValue_' + this.displayedColumns[oppositeRowIndex]] = '1/3';
      }
    } else if ( newValue === 2){
      this.dataSource[oppositeColIndex][this.displayedColumns[oppositeRowIndex]] = 0.50;
      const option = this.options.find(option => option.value === 0.50);
      if (option) {
        this.dataSource[oppositeColIndex]['viewValue_' + this.displayedColumns[oppositeRowIndex]] = '1/2';
      }
    } else if ( newValue === 1){
      this.dataSource[oppositeColIndex][this.displayedColumns[oppositeRowIndex]] = 1;
      const option = this.options.find(option => option.value === 1);
      if (option) {
        this.dataSource[oppositeColIndex]['viewValue_' + this.displayedColumns[oppositeRowIndex]] = '1';
      }
    } else if ( newValue === .50){
      this.dataSource[oppositeColIndex][this.displayedColumns[oppositeRowIndex]] = 2;
      const option = this.options.find(option => option.value === 2);
      if (option) {
        this.dataSource[oppositeColIndex]['viewValue_' + this.displayedColumns[oppositeRowIndex]] = '2';
      }
    } else if ( newValue === .33){
      this.dataSource[oppositeColIndex][this.displayedColumns[oppositeRowIndex]] = 3;
      const option = this.options.find(option => option.value === 3);
      if (option) {
        this.dataSource[oppositeColIndex]['viewValue_' + this.displayedColumns[oppositeRowIndex]] = '3';
      }
    } else if ( newValue === .25){
      this.dataSource[oppositeColIndex][this.displayedColumns[oppositeRowIndex]] = 4;
      const option = this.options.find(option => option.value === 4);
      if (option) {
        this.dataSource[oppositeColIndex]['viewValue_' + this.displayedColumns[oppositeRowIndex]] = '4';
      }
    }  else if ( newValue === .20){
      this.dataSource[oppositeColIndex][this.displayedColumns[oppositeRowIndex]] = 5;
      const option = this.options.find(option => option.value === 5);
      if (option) {
        this.dataSource[oppositeColIndex]['viewValue_' + this.displayedColumns[oppositeRowIndex]] = '5';
      }
    }
    else {
      this.dataSource[oppositeColIndex][this.displayedColumns[oppositeRowIndex]] = newValue;
    }
  }


  


  

  sumasColumnas: number[] = [];
  operacionesFilas: any[] = [];
  resultadosFilas: number[] = [];

  calcularSumas() {
    const sumas: number[] = [];
    this.displayedColumns.forEach((column) => {
      if (column !== 'header') {
        let suma = 0;

        this.dataSource.forEach(row => {
          suma += row[column] || 0;
        });

        sumas.push(suma);
      }
    });

    this.sumasColumnas = sumas;
    console.log('Sumas de columnas:', this.sumasColumnas);
    this.calcularOperacionesFilas();
  }

  calcularOperacionesFilas() {
    const operacionesFilas: any[] = [];
    const resultadosFilas: number[] = [];

    this.dataSource.forEach((row) => {
      const operacionesFila: any[] = [];
      let sumaFila = 0;
      let colIndex = 0;

      this.displayedColumns.forEach((column) => {
        if (column !== 'header' && this.sumasColumnas[colIndex] > 0) {
          const valor = row[column];
          const sumaColumna = this.sumasColumnas[colIndex];
          const resultadoDivision = valor / sumaColumna;
          const operacion = `${valor} / ${sumaColumna} = ${resultadoDivision.toFixed(2)}`;
          operacionesFila.push(operacion);
          sumaFila += resultadoDivision;
          colIndex++;
        }
      });

      operacionesFilas.push(operacionesFila);
      resultadosFilas.push(sumaFila);
    });

    this.operacionesFilas = operacionesFilas;
    this.resultadosFilas = resultadosFilas;
    console.log('Operaciones de filas:', this.operacionesFilas);
    console.log('Resultados sumados por fila:', this.resultadosFilas);

    const x = resultadosFilas.length;
    console.log(x);
    const resultadosDivididos = this.resultadosFilas.map((resultado: number) => resultado / x);
    console.log('Resultados sumados por fila divididos:', resultadosDivididos);
    const numerosRedondeados = resultadosDivididos.map((numero: number) => Math.round(numero * 10) / 10);

    console.log('ID Criterios', this.id_criterios);

    const resultadosCombinados = this.id_criterios.map((id, index) => {
    return {
        id: id,
        peso: numerosRedondeados[index] * 10
      };
    });
    
    console.log('Resultados:', resultadosCombinados);
  }
}
