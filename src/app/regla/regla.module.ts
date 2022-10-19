import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReglaComponent } from './regla.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReglaDetailComponent } from './regla-detail/regla-detail.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  declarations: [ReglaComponent, ReglaDetailComponent],
  exports: [ReglaComponent]
})
export class ReglaModule { }
