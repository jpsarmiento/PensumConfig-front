import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReglaComponent } from './regla.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  declarations: [ReglaComponent],
  exports: [ReglaComponent]
})
export class ReglaModule { }
