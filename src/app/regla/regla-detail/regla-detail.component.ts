import { Component, Input, OnInit } from '@angular/core';
import { Regla } from '../regla';
import { ReglaService } from '../regla.service';
import { ActivatedRoute } from '@angular/router';
import { Termino } from 'src/app/termino';

@Component({
  selector: 'app-regla-detail',
  templateUrl: './regla-detail.component.html',
  styleUrls: ['./regla-detail.component.css']
})
export class ReglaDetailComponent implements OnInit {

  reglaId!: string;
  @Input() reglaDetail!: Regla;
  terminos: Array<Termino> = [];

  constructor(
   private route: ActivatedRoute,
   private reglaService: ReglaService
  ) { }

  getRegla(){
    this.reglaService.getRegla(this.reglaId).subscribe(regla=>{
      this.reglaDetail = regla;
      this.getTerminos(regla);
    })
  }

  getTerminos(regla: Regla): void {
    this.reglaService.getTerminos(regla.id).subscribe({ next: terms =>
      this.terminos = terms})
  }

  deleteTermino(termino: Termino) {
    this.reglaService.deleteTerminoRegla(this.reglaDetail.id, termino.id).subscribe(response => {
      this.terminos = this.terminos.filter(item => item.id != termino.id)
    })
  }

  ngOnInit() {
    if(this.reglaDetail === undefined){
      this.reglaId = this.route.snapshot.paramMap.get('id')!
      if (this.reglaId)
        this.getRegla();
      }
  }

  getCursosTexto(termino: Termino): string {
    var rta = ""
    termino.cursos.forEach(function(curso) {
      rta += curso.sigla+'-'+curso.codigo+', '
    })
    console.log(rta);
    return rta.slice(0,-2)
  }



}
