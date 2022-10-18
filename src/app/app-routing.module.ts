import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CursoComponent } from './curso/curso.component';
import { ReglaComponent } from './regla/regla.component';

const routes: Routes = [
  {path: 'cursos', component: CursoComponent},

  {path: 'reglas', component: ReglaComponent,
  children: [{path: ':id', component: ReglaComponent}]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
