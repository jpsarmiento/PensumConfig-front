import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CursoComponent } from './curso/curso.component';
import { ExamenComponent } from './examen/examen.component';
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
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
