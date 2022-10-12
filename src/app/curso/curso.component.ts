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
  constructor(private cursoService: CursoService) { }

  getCursos() {
    this.cursoService.getCursos().subscribe(cursos => {
      this.cursos = cursos;
    });
  }

  ngOnInit() {
    this.getCursos();
  }
}
