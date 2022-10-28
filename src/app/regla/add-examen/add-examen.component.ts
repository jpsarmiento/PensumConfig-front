import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamenService } from '../../examen/examen.service';
import { Examen } from '../../examen/examen'
import { ReglaService } from '../regla.service';
import { Regla } from '../regla';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-examen',
  templateUrl: './add-examen.component.html',
  styleUrls: ['./add-examen.component.css']
})
export class AddExamenComponent implements OnInit {

  reglaId!: string;
  @Input() reglaDetail!: Regla;
  selected: Array<Examen> = [];
  examenes: Array<Examen> = [];

  constructor(
    private route: ActivatedRoute,
    private reglaService: ReglaService,
    private examenService: ExamenService,
    private toastr: ToastrService) { }

    getRegla(){
      this.reglaService.getRegla(this.reglaId).subscribe(regla=>{
        this.reglaDetail = regla;
      })
    }

    getExamenes(): void {
      this.examenService.getExamenes().subscribe({next: examens =>
      this.examenes = examens, error: e => console.error(e)});
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

    addExamen(examen: Examen) {
      this.selected.push(examen)
      this.examenes = this.examenes.filter(item => item.id != examen.id);
    }

    addExamenRegla(examen: Examen) {
        this.reglaService.addExamenRegla(this.reglaDetail.id, examen.id).subscribe(regla =>{
          this.reglaDetail = regla
        })
      }

    addExamenesRegla() {
      if (this.selected.length != 0) {
        this.selected.forEach((examen) => {
          this.addExamenRegla(examen)
        })
          this.toastr.success("Los examenes fueron agregados", "Regla actualizada")
        }
      else {
        this.toastr.error("No ha seleccionado ningún examen para agregar a la regla", "Error")
      }
    }

  ngOnInit() {
    if(this.reglaDetail === undefined){
      this.reglaId = this.route.snapshot.paramMap.get('id')!
      if (this.reglaId)
        this.getRegla();
      }

    this.getExamenes();
  }

}
