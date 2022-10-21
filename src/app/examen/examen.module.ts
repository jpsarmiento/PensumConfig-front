import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamenComponent } from './examen.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, AppRoutingModule],
  declarations: [ExamenComponent],
  exports:[ExamenComponent]
})
export class ExamenModule { }
