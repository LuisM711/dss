import { Component } from '@angular/core';
//tabla
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
//select
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

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
  
  options = [
    { value: .20, viewValue: '1/5' },
    { value: .25, viewValue: '1/4' },
    { value: .33, viewValue: '1/3' },
    { value: .50, viewValue: '1/2' },
    { value: 1, viewValue: '1' },
    { value: 2, viewValue: '2' },
    { value: 3, viewValue: '3' },
    { value: 4, viewValue: '4' },
    { value: 5, viewValue: '5' },
  ];
  
  onSelectionChange(event: any)
  {
    this.showTable = !!event.value;
  }
  showTable = false;
  
  columns = 4;
  dataSource: any[] = [];
  
  displayedColumns: string[] = ['Pepe','Pecas','Pica','Papas'];
  fullColumnList: string[] = [];

  criterios: string[] = [];

  constructor() {
    this.generateTable();
  }

  generateTable() { 
    this.fullColumnList = ['header', ...this.displayedColumns];
    this.dataSource = Array.from({ length: this.columns }, (_, i) => {
      const row: any = { 
        header: this.displayedColumns[i]
        };

        this.displayedColumns.forEach(column => {
          row[column] = 1; // Establecer valor por defecto
        });

      return row;
    });
  }

  updateOppositeValue(rowIndex: number, colIndex: number, newValue: number) {
    const oppositeRowIndex = rowIndex;// Índice de fila opuesto
    const oppositeColIndex = colIndex; // Índice de columna opuesta
    
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

  //valores de select
  proyectos: Proyectos[] = [
    {value: '1', viewValue: 'Proyecto 1'},
    {value: '2', viewValue: 'Proyecto 2'},
    {value: '3', viewValue: 'Proyecto 3'},
  ];

}
