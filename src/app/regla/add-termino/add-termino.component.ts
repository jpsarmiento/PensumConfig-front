import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from '../../curso/curso.service';
import { Termino } from '../../termino';
import { Curso } from '../../curso/curso';
import { ReglaService } from '../regla.service';
import { Regla } from '../regla';

@Component({
  selector: 'app-add-termino',
  templateUrl: './add-termino.component.html',
  styleUrls: ['./add-termino.component.css']
})
export class AddTerminoComponent implements OnInit {

  @Input() regla!: Regla;
  termino!: Termino;
  cursos: Array<Curso> = [];
  allCursos:  Array<Curso> = [];

  constructor(
    private route: ActivatedRoute,
    private reglaService: ReglaService,
    private cursoService: CursoService) { }

    getCursos(): void {
      this.cursoService.getCursos().subscribe({next: cursos =>
      this.cursos = cursos, error: e => console.error(e)});
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

    addCursoTermino(curso: Curso) {
      this.reglaService.addCursoTermino(this.termino.id, curso.id).subscribe(termino =>{
        this.termino = termino
      })

      this.cursos = this.cursos.filter(item => item.id != curso.id);
      this.allCursos = this.allCursos.filter(item => item.id != curso.id);
    }

    addTerminoRegla(termino: Termino) {
      this.reglaService.addTerminoRegla(this.regla.id, termino.id).subscribe(regla =>{
        this.regla = regla
      })
    }

    crearTermino(termino: Termino) {
      this.reglaService.createTermino(termino).subscribe(termino =>{
        this.termino = termino;
      })
    }

  ngOnInit() {
    this.getCursos();
    this.crearTermino(this.termino)
  }
}

