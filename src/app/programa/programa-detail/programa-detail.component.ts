import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Area } from 'src/app/area/area';
import { Programa } from '../programa';
import { ProgramaService } from '../programa.service';
import { Requisito } from 'src/app/requisito/requisito';
import {CommunicationService } from 'src/app/communication.service'
import {saveAs} from "file-saver";

@Component({
  selector: 'app-programa-detail',
  templateUrl: './programa-detail.component.html',
  styleUrls: ['./programa-detail.component.css']
})
export class ProgramaDetailComponent implements OnInit {

  programaId!: string;
  @Input() programaDetail!: Programa;
  conocimiento: Array<Area> = [];
  semestres: Array<Area> = [];
  requisitos: Array<Requisito> = [];
  programaForm! : FormGroup;

  constructor(
    private route: ActivatedRoute,
    private programaService: ProgramaService,
    private communicationService: CommunicationService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  getPrograma(){
    this.programaService.getPrograma(this.programaId).subscribe(programa=>{
      this.programaDetail = programa;
      this.getAreas(programa);
      this.getRequisitos(programa);
      console.log(programa)
    })
  }

  getAreas(programa: Programa): void {
    this.programaService.getAreas(programa.id).subscribe(areas => {
      areas.forEach( (area) => {
        if (area.tipo == 'Semestre') {
          this.semestres.push(area);
        }
        else {
          this.conocimiento.push(area);
        }

      })

    })
  }

  getRequisitos(programa: Programa): void {
    this.programaService.getRequisitos(programa.id).subscribe({ next: requisitos =>
      this.requisitos = requisitos})
  }

  deleteConocimiento(area: Area) {
    this.programaService.deleteAreaPrograma(this.programaDetail.id, area.id).subscribe(response => {
      this.conocimiento = this.conocimiento.filter(item => item.id != area.id)
    })
  }

  deleteSemestre(area: Area) {
    this.programaService.deleteAreaPrograma(this.programaDetail.id, area.id).subscribe(response => {
      this.semestres = this.semestres.filter(item => item.id != area.id)
    })
  }

  deleteRequisito(req: Requisito) {
    this.programaService.deleteRequisitoPrograma(this.programaDetail.id, req.id).subscribe(response => {
      this.requisitos = this.requisitos.filter(item => item.id != req.id)
    })
  }

  navegarArea() {
    this.communicationService.writeProgramaPrev(this.programaDetail.id)
  }

  ngOnInit() {
      this.programaId = this.route.snapshot.paramMap.get('id')!
      if (this.programaId)
        this.getPrograma();
  }

  getReglasTexto(area: Area): string {
    var rta = ''
    area.reglas.forEach(function(regla) {
      rta += regla.nombre+', '
    })
    rta = rta.slice(0,-2)
    return rta
  }

  descargarAreas() {
    var fileName = "programa_" + this.programaDetail.nombre + "_areas.json"
    var programaDescarga = this.programaDetail
    programaDescarga.areas = this.conocimiento
    var file = new Blob([JSON.stringify(programaDescarga)], {type: 'application/json'})
    saveAs(file, fileName)
  }

  descargarSemestres() {
    var fileName = "programa_" + this.programaDetail.nombre + "_semestres.json"
    var programaDescarga = this.programaDetail
    programaDescarga.areas = this.semestres
    var file = new Blob([JSON.stringify(programaDescarga)], {type: 'application/json'})
    saveAs(file, fileName)
  }
}
