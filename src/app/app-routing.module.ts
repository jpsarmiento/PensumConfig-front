import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AreaComponent } from './area/area.component';
import { CursoComponent } from './curso/curso.component';
import { ExamenComponent } from './examen/examen.component';
import { ProgramaComponent } from './programa/programa.component';
import { AddExamenComponent } from './regla/add-examen/add-examen.component';
import { AddTerminoComponent } from './regla/add-termino/add-termino.component';
import { ReglaDetailComponent } from './regla/regla-detail/regla-detail.component';
import { ReglaComponent } from './regla/regla.component';

const routes: Routes = [
  {
    path: 'cursos', component: CursoComponent
  },
  {
    path: 'examenes', component: ExamenComponent
  },
  {
    path: 'reglas',
    children: [
      {
        path: 'lista', component: ReglaComponent
      },
      {
        path: ':id',
        children: [
          {
            path: 'detalle', component: ReglaDetailComponent
          },
          {
            path: 'addterm', component: AddTerminoComponent
          },
          {
            path: 'addexamen', component: AddExamenComponent
          }
        ]
      }
    ]
  },
  {
    path: 'areas',
    children: [
      {
        path: 'lista', component: AreaComponent
      },
      {
        path: ':id',
        children: [
          {
            path: 'detalle', component: ReglaDetailComponent
          },
          {
            path: 'addregla', component: AddTerminoComponent
          }
        ]
      }
    ]
  },
  {
    path: 'programas',
    children: [
      {
        path: 'lista', component: ProgramaComponent
      },
      {
        path: ':id',
        children: [
          {
            path: 'detalle', component: ReglaDetailComponent
          },
          {
            path: 'addarea', component: AddTerminoComponent
          },
          {
            path: 'addrequisito', component: AddTerminoComponent
          }
        ]
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
