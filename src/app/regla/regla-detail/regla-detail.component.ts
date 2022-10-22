import { Component, Input, OnInit } from '@angular/core';
import { Regla } from '../regla';
import { ReglaService } from '../regla.service';
import { ActivatedRoute } from '@angular/router';
import { Termino } from 'src/app/termino';
import { Examen } from 'src/app/examen/examen';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-regla-detail',
  templateUrl: './regla-detail.component.html',
  styleUrls: ['./regla-detail.component.css']
})
export class ReglaDetailComponent implements OnInit {

  reglaId!: string;
  @Input() reglaDetail!: Regla;
  terminos: Array<Termino> = [];
  examenes: Array<Examen> = [];
  reglaForm! : FormGroup;

  constructor(
   private route: ActivatedRoute,
   private reglaService: ReglaService,
   private formBuilder: FormBuilder,
   private toastr: ToastrService
  ) { }

  getRegla(){
    this.reglaService.getRegla(this.reglaId).subscribe(regla=>{
      this.reglaDetail = regla;
      this.getTerminos(regla);
      this.getExamenes(regla);
    })
  }

  getTerminos(regla: Regla): void {
    this.reglaService.getTerminos(regla.id).subscribe({ next: terms =>
      this.terminos = terms})
  }

  getExamenes(regla: Regla): void {
    this.reglaService.getExamenes(regla.id).subscribe({ next: examenes =>
      this.examenes = examenes})
  }

  deleteTermino(termino: Termino) {
    this.reglaService.deleteTerminoRegla(this.reglaDetail.id, termino.id).subscribe(response => {
      this.terminos = this.terminos.filter(item => item.id != termino.id)
    })
  }

  deleteExamen(examen: Examen) {
    this.reglaService.deleteExamenRegla(this.reglaDetail.id, examen.id).subscribe(response => {
      this.examenes = this.examenes.filter(item => item.id != examen.id)
    })
  }

  formularioModificar() {
    this.reglaForm = this.formBuilder.group({
      nombre: [this.reglaDetail.nombre, [Validators.required, Validators.minLength(2), Validators.maxLength(70)]],
      semestre_inicio: [this.reglaDetail.semestre_inicio, [Validators.required, Validators.min(200000), Validators.max(205002)]],
      semestre_vigencia: [this.reglaDetail.semestre_vigencia, [Validators.required, Validators.min(200000), Validators.max(205002)]],
      creditos: [this.reglaDetail.creditos, [Validators.required, Validators.min(0)]]
    })
  }

  updateRegla(regla: Regla) {
    this.reglaService.updateRegla(this.reglaDetail.id, regla).subscribe(regla =>{
      this.toastr.success(regla.nombre, "Regla actualizada");
      this.getRegla()
    })
  }

  ngOnInit() {
      this.reglaId = this.route.snapshot.paramMap.get('id')!
      if (this.reglaId)
        this.getRegla();

  }

  splitNum1(num: number) {
    const arreglo = Array.from(num.toString()).map(Number)
    return ""+  arreglo[0]+arreglo[1]+arreglo[2]+arreglo[3]
  }

  splitNum2(num: number) {
    const arreglo = Array.from(num.toString()).map(Number)
    return ""+arreglo[4]+arreglo[5]
  }

  getCursosTexto(termino: Termino): string {
    var rta = ""
    termino.cursos.forEach(function(curso) {
      rta += curso.sigla+'-'+curso.codigo+', '
    })
    return rta.slice(0,-2)
  }
}
