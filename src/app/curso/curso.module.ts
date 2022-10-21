import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursoComponent } from './curso.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, AppRoutingModule],
  declarations: [CursoComponent],
  exports: [CursoComponent]
})
export class CursoModule { }
