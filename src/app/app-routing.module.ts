import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CursoComponent } from './curso/curso.component';
import { AddTerminoComponent } from './regla/add-termino/add-termino.component';
import { ReglaDetailComponent } from './regla/regla-detail/regla-detail.component';
import { ReglaComponent } from './regla/regla.component';

const routes: Routes = [
  {
    path: 'cursos', component: CursoComponent
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
