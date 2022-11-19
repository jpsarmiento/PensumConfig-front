import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReglaService } from '../regla.service';
import { Regla } from '../regla';
import { ToastrService } from 'ngx-toastr';
import { CursoService } from 'src/app/curso/curso.service';
import { Curso } from 'src/app/curso/curso';
import { Termino } from 'src/app/termino';

@Component({
  selector: 'app-add-curso',
  templateUrl: './add-curso.component.html',
  styleUrls: ['./add-curso.component.css']
})
export class AddCursoComponent implements OnInit {

  reglaId!: string;
  @Input() reglaDetail!: Regla;
  selected: Array<Curso> = [];
  cursos: Array<Curso> = [];
  termino!: Termino;

  constructor(
    private route: ActivatedRoute,
    private reglaService: ReglaService,
    private cursoService: CursoService,
    private toastr: ToastrService) { }

  getRegla() {
    this.reglaService.getRegla(this.reglaId).subscribe(regla => {
      this.reglaDetail = regla;
    })
  }

  getCursos(): void {
    this.cursoService.getCursos().subscribe({
      next: cursos =>
        this.cursos = cursos, error: e => console.error(e)
    });
  }

  filtrar() {
    const filtro = document.getElementById('filtro') as HTMLInputElement;
    const value = filtro.value

    if (value.length != 0) {
      this.cursoService.getCursosQuery(value).subscribe({
        next: cursos =>
          this.cursos = cursos, error: e => console.error(e)
      });
    }
    else {
      this.getCursos();
    }
  }

  addCurso(curso: Curso) {
    this.selected.push(curso)
    this.cursos = this.cursos.filter(item => item.id != curso.id);
  }

  addCursoRegla(curso: Curso) {
    this.reglaService.createTermino(this.termino).subscribe(term => {
      this.reglaService.addCursoTermino(term.id, curso.id).subscribe(termin => {
        this.reglaService.addTerminoRegla(this.reglaDetail.id, termin.id).subscribe(regla => {
          this.reglaDetail = regla
          this.toastr.success("Los cursos fueron agregados", "Regla actualizada")
        })
      })
    })

  }

  addCursosRegla() {
    if (this.selected.length != 0) {
      this.selected.forEach((curso) => {
        this.addCursoRegla(curso)
      })
    }
    else {
      this.toastr.error("No ha seleccionado ningún curso para agregar a la regla", "Error")
    }
    if (window.localStorage.getItem('token') != null) {
      this.toastr.success("Los cursos fueron agregados", "Regla actualizada")
    }
  }

  ngOnInit() {
    if (this.reglaDetail === undefined) {
      this.reglaId = this.route.snapshot.paramMap.get('id')!
      if (this.reglaId)
        this.getRegla();
    }

    this.getCursos();
  }

}
