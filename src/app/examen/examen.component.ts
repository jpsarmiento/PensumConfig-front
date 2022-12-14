import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Examen } from './examen';
import { ExamenService } from './examen.service';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {

  examenes: Array<Examen> = [];
  selected: Boolean = false;
  selectedExamen!: Examen;
  examenForm! : FormGroup;

  constructor(
    private examenService: ExamenService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

    getExamenes(): void {
      this.examenService.getExamenes().subscribe({next: examenes =>
      this.examenes = examenes, error: e => console.error(e)});
    }

    onSelected(examen: Examen): void {
      this.selected = true;
      this.selectedExamen = examen;
    }

    deleteExamen(examen: Examen) {
      this.examenService.deleteExamen(examen.id).subscribe(response => {
        this.examenes = this.examenes.filter(item => item.id != examen.id);
        this.toastr.success(examen.nombre, "Examen eliminado");
      })
      this.selected = false;
    }

    formularioModificar() {
      this.examenForm = this.formBuilder.group({
        nombre: [this.selectedExamen.nombre, [Validators.required, Validators.minLength(2), Validators.maxLength(70)]],
        min_nota: [this.selectedExamen.min_nota, [Validators.required, Validators.min(0)]],
      })
    }

    formularioCrear() {
      this.examenForm = this.formBuilder.group({
        nombre: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(70)]],
        min_nota: ["", [Validators.required, Validators.min(0)]],
      })
    }

    createExamen(examen: Examen) {
      this.examenService.createExamen(examen).subscribe(examen =>{
        this.toastr.success(examen.nombre, "Examen creado")
        this.examenForm.reset();
        this.getExamenes()
      })
    }

    updateExamen(examen: Examen) {
      this.examenService.updateExamen(this.selectedExamen.id, examen).subscribe(examen =>{
        this.toastr.success(examen.nombre, "Examen actualizado");
        this.selectedExamen = examen;
        this.getExamenes();
      })
    }

    filtrar() {
      const filtro = document.getElementById('filtro') as HTMLInputElement;
      const value = filtro.value

      if (value.length != 0) {
      this.examenService.getExamenesQuery(value).subscribe({next: examenes =>
        this.examenes = examenes, error: e => console.error(e)});
      }
      else {
        this.getExamenes();
      }
    }

  ngOnInit() {
    this.getExamenes()

    this.examenForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(70)]],
      min_nota: ["", [Validators.required, Validators.min(0)]],
    })
  }

}
