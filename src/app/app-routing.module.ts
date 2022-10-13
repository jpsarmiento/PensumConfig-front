import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CursoComponent } from './curso/curso.component';

const routes: Routes = [
  {path: 'cursos', component: CursoComponent,
  children: [{path: ':id', component: CursoComponent}],
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
