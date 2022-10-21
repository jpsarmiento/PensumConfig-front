import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReglaComponent } from './regla.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReglaDetailComponent } from './regla-detail/regla-detail.component';
import { RouterModule } from '@angular/router';
import { AddTerminoComponent } from './add-termino/add-termino.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, AppRoutingModule],
  declarations: [ReglaComponent, ReglaDetailComponent, AddTerminoComponent],
  exports: [ReglaComponent]
})
export class ReglaModule { }
