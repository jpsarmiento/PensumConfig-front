import { Component, OnInit } from '@angular/core';
import { Curso } from './curso';
import { CursoService } from './curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  cursos: Array<Curso> = [];
  selected: Boolean = false;
  selectedCurso!: Curso;

  constructor(private cursoService: CursoService) { }

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

  ngOnInit() {
    this.getCursos();
  }
}
