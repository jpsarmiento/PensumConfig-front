import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from '../../curso/curso.service';
import { Termino } from '../../termino';
import { Curso } from '../../curso/curso';
import { ReglaService } from '../regla.service';
import { Regla } from '../regla';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-termino',
  templateUrl: './add-termino.component.html',
  styleUrls: ['./add-termino.component.css']
})
export class AddTerminoComponent implements OnInit {

  reglaId!: string;
  @Input() reglaDetail!: Regla;
  termino!: Termino;
  cursos: Array<Curso> = [];

  constructor(
    private route: ActivatedRoute,
    private reglaService: ReglaService,
    private cursoService: CursoService,
    private toastr: ToastrService) { }

    getRegla(){
      this.reglaService.getRegla(this.reglaId).subscribe(regla=>{
        this.reglaDetail = regla;
      })
    }

    getCursos(): void {
      this.cursoService.getCursos().subscribe({next: cursos =>
      this.cursos = cursos, error: e => console.error(e)});
    }

    filtrar() {
      const filtro = document.getElementById('filtro') as HTMLInputElement;
      const value = filtro.value

      if (value.length != 0) {
      this.cursoService.getCursosQuery(value).subscribe({next: cursos =>
        this.cursos = cursos, error: e => console.error(e)});
      }
      else {
        this.getCursos();
      }
    }

    addCursoTermino(curso: Curso) {
      this.reglaService.addCursoTermino(this.termino.id, curso.id).subscribe(termino =>{
        this.termino = termino
      })

      this.cursos = this.cursos.filter(item => item.id != curso.id);
    }

    addTerminoRegla(termino: Termino) {
      if (termino.cursos != undefined) {
      this.reglaService.addTerminoRegla(this.reglaDetail.id, termino.id).subscribe(regla =>{
        this.reglaDetail = regla
        this.toastr.success("Los cursos fueron agregados", "Regla actualizada")
      })
    }
    else {
      this.toastr.error("No ha seleccionado ningún curso para agregar a la regla", "Error")
    }
    }

    crearTermino(termino: Termino) {
      this.reglaService.createTermino(termino).subscribe(termino =>{
        this.termino = termino;
      })
    }

  ngOnInit() {

    if(this.reglaDetail === undefined){
      this.reglaId = this.route.snapshot.paramMap.get('id')!
      if (this.reglaId)
        this.getRegla();
      }

    this.getCursos();
    this.crearTermino(this.termino)
  }
}
