import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-alternativas',
  standalone: true,
  imports: [RouterModule,FormsModule,HttpClientModule],
  templateUrl: './alternativas.component.html',
  styleUrl: './alternativas.component.css'
})

export class AlternativasComponent {

    alternativasProj = {
      id : 0,
      idAlternaitva: 0,
      nombre: '',
      descripcion: ''
    }




}
