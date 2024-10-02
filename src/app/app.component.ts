import { Component } from '@angular/core';
import { RouterModule,RouterOutlet } from '@angular/router'; // Importa RouterModule
import { ProyectoService } from './proyectos/proyecto.service';
import { HttpClient, HttpClientModule, provideHttpClient,withFetch } from '@angular/common/http';
import { ProyectosComponent } from './proyectos/proyectos.component';



@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [ProyectosComponent, RouterModule, HttpClientModule] // Asegúrate de importar RouterModule

})
export class AppComponent {
  selectOption: string = "";
  
  onOptionSelected(option: string, event: MouseEvent): void {
    event.preventDefault();
    this.selectOption = option; 
  }
}
