import { Component } from '@angular/core';
//select
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
//tabla
import { NgFor, NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

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



export class MatrizComponent {
  
  showTable = false;

  onSelectionChange(event: any)
  {
    this.showTable = !!event.value;
  }

  rows = 3;  // Número de filas inicial, get count de filas + 1
  columns = 3;  // Número de columnas inicial, get count de columnas + 2, para criterio y su ponderacion
  dataSource: any[] = [];  // Datos para la tabla, selectsql desde proyecto select
  
  displayedColumns: string[] = ['Pepe','Pecas','Pica'];
    // Columnas a mostrar
  fullColumnList: string[] = [];  // Lista completa de columnas, incluyendo la de header

  criterios: string[] = [];//aqui van criterios
  alternativas: any[] = [''];//aqui van alternativas
  ponderaciones: number[] = [3,4,5];//aqui van ponderacion de criterios

  constructor() {
    this.generateTable();
  }

  generateTable() { 
    this.fullColumnList = ['header', 'ponderacion', ...this.displayedColumns];
    this.dataSource = Array.from({ length: this.rows }, (_, i) => {
      const row: any = { 
        header: this.criterios[i] || `Fila ${i + 1}`,
        ponderacion: this.ponderaciones[i] || 0}; //get de select de criterios

      this.displayedColumns.forEach(column => {
        row[column] = 1;
      });
      return row;
    });
  }
