import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReglaComponent } from './regla.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReglaDetailComponent } from './regla-detail/regla-detail.component';
import { RouterModule } from '@angular/router';
import { AddTerminoComponent } from './add-termino/add-termino.component';
import { AppRoutingModule } from '../app-routing.module';
import { AddExamenComponent } from './add-examen/add-examen.component';
import { AddCursoComponent } from './add-curso/add-curso.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, AppRoutingModule],
  declarations: [ReglaComponent, ReglaDetailComponent, AddTerminoComponent, AddExamenComponent, AddCursoComponent],
  exports: [ReglaComponent]
})
export class ReglaModule { }
