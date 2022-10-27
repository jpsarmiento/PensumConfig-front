import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { ProgramaComponent } from './programa.component';
import { AddAreaComponent } from './add-area/add-area.component';
import { ProgramaDetailComponent } from './programa-detail/programa-detail.component';
import { AddRequisitoComponent } from './add-requisito/add-requisito.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, AppRoutingModule],
  declarations: [ProgramaComponent, ProgramaDetailComponent, AddAreaComponent, AddRequisitoComponent],
  exports:[ProgramaComponent]
})
export class ProgramaModule { }
