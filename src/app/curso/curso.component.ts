import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Curso } from './curso';
import { CursoService } from './curso.service';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  cursos: Array<Curso> = [];
  allCursos:  Array<Curso> = [];
  selected: Boolean = false;
  selectedCurso!: Curso;
  cursoForm! : FormGroup;
  epsilon: Boolean = false;
  epsilon2: Boolean = false;
  tipoE: Boolean = false;
  tipoE2: Boolean = false;

  constructor(
    private cursoService: CursoService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  getCursos(): void {
    this.cursoService.getCursos().subscribe({next: cursos =>
    this.cursos = cursos, error: e => console.error(e)});
  }

  onSelected(curso: Curso): void {
    this.selected = true;
    this.selectedCurso = curso;
  }

  deleteCurso(curso: Curso) {
    this.cursoService.deleteCurso(curso.id).subscribe(response => {
      this.cursos = this.cursos.filter(item => item.id != curso.id);
      this.allCursos = this.allCursos.filter(item => item.id != curso.id);
    })
  }

  checkEpsilon(value: Boolean) {
    this.epsilon = value
  }

  checkEpsilon2(value: Boolean) {
    this.epsilon2 = value
  }

  checkE(value: Boolean) {
    this.tipoE = value
  }

  checkE2(value: Boolean) {
    this.tipoE2 = value
  }

  formularioModificar() {
    this.cursoForm = this.formBuilder.group({
      nombre: [this.selectedCurso.nombre, [Validators.required, Validators.minLength(2), Validators.maxLength(70)]],
      sigla: [this.selectedCurso.sigla, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      codigo: [this.selectedCurso.codigo, [Validators.required, Validators.min(1000), Validators.max(7000)]],
      creditos: [this.selectedCurso.creditos, [Validators.required, Validators.min(0)]],
      es_epsilon: [],
      es_tipo_e: [],
    })
  }

  formularioCrear() {
    this.cursoForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(70)]],
      sigla: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      codigo: ["", [Validators.required, Validators.min(1000), Validators.max(7000)]],
      creditos: ["", [Validators.required, Validators.min(0)]],
      es_epsilon: [false],
      es_tipo_e: [false],
    })
  }

  createCurso(curso: Curso) {
    curso.sigla = curso.sigla.toUpperCase();
    curso.es_epsilon = this.epsilon;
    curso.es_tipo_e = this.tipoE;

    this.cursoService.createCurso(curso).subscribe(curso =>{
      this.toastr.success(curso.sigla+"-"+curso.codigo, "Curso creado")
      this.cursoForm.reset();
      this.getCursos()
    })
  }

  updateCurso(curso: Curso) {
    curso.sigla = curso.sigla.toUpperCase();
    curso.es_epsilon = this.epsilon2;
    curso.es_tipo_e = this.tipoE2;
    this.cursoService.updateCurso(this.selectedCurso.id, curso).subscribe(curso =>{
      this.toastr.success(curso.sigla+"-"+curso.codigo, "Curso actualizado");
      this.selectedCurso = curso;
      this.getCursos();
    })
  }

  filtrar() {
    if(this.allCursos.length==0 && this.cursos.length != 0)
      this.allCursos = this.cursos;

    this.cursos = this.allCursos;
    const filtro = document.getElementById('filtro') as HTMLInputElement;
    const value = filtro.value

    if (value.length != 0)
      this.cursos =  this.cursos.filter(item => item.sigla.includes(value.toUpperCase()));
  }

  ngOnInit() {
    this.getCursos();

    this.cursoForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(2)]],
      sigla: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      codigo: ["", [Validators.required, Validators.min(1000), Validators.max(7000)]],
      creditos: ["", [Validators.required, Validators.min(0)]],
      es_epsilon: [false],
      es_tipo_e: [false],
    })
  }
}
