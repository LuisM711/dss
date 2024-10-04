import { Routes } from '@angular/router';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { AlternativasComponent } from './alternativas/alternativas.component';
import { CriteriosComponent } from './criterios/criterios.component';
// import { MatrizComponent } from './matriz/matriz.component';
import { ScoreComponent } from './score/score.component';
import { PonderacionComponent } from './ponderacion/ponderacion.component';
import { ResultadosComponent } from './resultados/resultados.component';

export const routes: Routes = [
    {
        path:"proyectos",
        component: ProyectosComponent
    },{
        path:"alternativas",
        component: AlternativasComponent
    },{
        path:"criterios",
        component: CriteriosComponent
    }
,{
        path:"score",
        component: ScoreComponent
    },{
        path:"pesos",
        component: PonderacionComponent
    },{
        path:"resultados",
        component:ResultadosComponent
    },{
        path:"**",
        redirectTo:""
    }
];
