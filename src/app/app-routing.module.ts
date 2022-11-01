import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddReglaComponent } from './area/add-regla/add-regla.component';
import { AreaDetailComponent } from './area/area-detail/area-detail.component';
import { AreaComponent } from './area/area.component';
import { CursoComponent } from './curso/curso.component';
import { ExamenComponent } from './examen/examen.component';
import { HomeComponent } from './home/home.component';
import { AddAreaComponent } from './programa/add-area/add-area.component';
import { AddRequisitoComponent } from './programa/add-requisito/add-requisito.component';
import { ProgramaDetailComponent } from './programa/programa-detail/programa-detail.component';
import { ProgramaComponent } from './programa/programa.component';
import { AddExamenComponent } from './regla/add-examen/add-examen.component';
import { AddTerminoComponent } from './regla/add-termino/add-termino.component';
import { ReglaDetailComponent } from './regla/regla-detail/regla-detail.component';
import { ReglaComponent } from './regla/regla.component';
import { RequisitoComponent } from './requisito/requisito.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'cursos', component: CursoComponent
  },
  {
    path: 'examenes', component: ExamenComponent
  },
  {
    path: 'requisitos', component: RequisitoComponent
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
            path: 'detalle', component: AreaDetailComponent
          },
          {
            path: 'addregla', component: AddReglaComponent
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
            path: 'detalle', component: ProgramaDetailComponent
          },
          {
            path: 'addarea', component: AddAreaComponent
          },
          {
            path: 'addrequisito', component: AddRequisitoComponent
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
