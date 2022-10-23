import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaComponent } from './area.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { AreaDetailComponent } from './area-detail/area-detail.component';
import { AddReglaComponent } from './add-regla/add-regla.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, AppRoutingModule],
  declarations: [AreaComponent, AreaDetailComponent, AddReglaComponent],
  exports:[AreaComponent]
})
export class AreaModule { }
