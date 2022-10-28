import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Programa } from './programa';
import { ProgramaService } from './programa.service';

@Component({
  selector: 'app-programa',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.css']
})
export class ProgramaComponent implements OnInit {

  programas: Array<Programa> = [];
  selected: Boolean = false;
  selectedPrograma!: Programa;
  programaForm! : FormGroup;

  constructor(
    private programaService: ProgramaService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  getProgramas(): void {
    this.programaService.getProgramas().subscribe({next: programas =>
    this.programas = programas, error: e => console.error(e)});
  }

  onSelected(programa: Programa): void {
    this.selected = true;
    this.selectedPrograma = programa;
  }

  deletePrograma(programa: Programa) {
    this.programaService.deletePrograma(programa.id).subscribe(response => {
      this.programas = this.programas.filter(item => item.id != programa.id);
      this.toastr.success(programa.nombre, "Programa eliminado");
    })
    this.selected = false;
  }

  formularioModificar() {
    this.programaForm= this.formBuilder.group({
      nombre: [this.selectedPrograma.nombre, [Validators.required, Validators.minLength(2), Validators.maxLength(70)]],
      tipo: [this.selectedPrograma.tipo, [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
      min_gpa: [this.selectedPrograma.min_gpa, [Validators.required, Validators.min(0), Validators.max(5)]]
    })
  }

  formularioCrear() {
    this.programaForm= this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(70)]],
      tipo: ["", [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
      min_gpa: ["", [Validators.required, Validators.min(0), Validators.max(5)]]
    })
  }

  createPrograma(programa: Programa) {
    this.programaService.createPrograma(programa).subscribe(programa =>{
      this.toastr.success(programa.nombre, "Programa creado")
      this.programaForm.reset();
      this.getProgramas()
    })
  }

  updatePrograma(programa: Programa) {
    this.programaService.updatePrograma(this.selectedPrograma.id, programa).subscribe(programa =>{
      this.toastr.success(programa.nombre, "Programa actualizado");
      this.selectedPrograma = programa;
      this.getProgramas();
    })
  }

  ngOnInit() {
    this.getProgramas();
    this.formularioCrear();
  }

  filtrar() {
    const filtro = document.getElementById('filtro') as HTMLInputElement;
    const value = filtro.value

    if (value.length != 0) {
    this.programaService.getProgramasQuery(value).subscribe({next: programs =>
      this.programas = programs, error: e => console.error(e)});
    }
    else {
      this.getProgramas();
    }
  }

}
