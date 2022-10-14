import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Curso } from './curso';
import { CursoService } from './curso.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  cursos: Array<Curso> = [];
  selected: Boolean = false;
  selectedCurso!: Curso;
  cursoForm! : FormGroup;
  epsilon: Boolean = false;
  tipoE: Boolean = false;

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
    })
  }

  checkEpsilon(value: Boolean) {
    this.epsilon = value
  }

  checkE(value: Boolean) {
    this.tipoE = value
  }

  createCurso(curso: Curso) {
    curso.sigla = curso.sigla.toUpperCase();
    curso.es_epsilon = this.epsilon;
    curso.es_tipo_e = this.tipoE;

    this.cursoService.createCurso(curso).subscribe(curso =>{
      console.info("El curso fue creado: ", curso)
      this.toastr.success(curso.sigla+"-"+curso.codigo, "Curso creado")
      this.cursoForm.reset();
    })
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
