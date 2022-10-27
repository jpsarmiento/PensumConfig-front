import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Area } from 'src/app/area/area';
import { Programa } from '../programa';
import { ProgramaService } from '../programa.service';
import { Requisito } from 'src/app/requisito/requisito';

@Component({
  selector: 'app-programa-detail',
  templateUrl: './programa-detail.component.html',
  styleUrls: ['./programa-detail.component.css']
})
export class ProgramaDetailComponent implements OnInit {


  programaId!: string;
  @Input() programaDetail!: Programa;
  areas: Array<Area> = [];
  requisitos: Array<Requisito> = [];
  programaForm! : FormGroup;

  constructor(
    private route: ActivatedRoute,
    private programaService: ProgramaService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  getPrograma(){
    this.programaService.getPrograma(this.programaId).subscribe(programa=>{
      this.programaDetail = programa;
      this.getAreas(programa);
      this.getRequisitos(programa);
    })
  }

  getAreas(programa: Programa): void {
    this.programaService.getAreas(programa.id).subscribe({ next: areas =>
      this.areas = areas})
  }

  getRequisitos(programa: Programa): void {
    this.programaService.getRequisitos(programa.id).subscribe({ next: requisitos =>
      this.requisitos = requisitos})
  }

  deleteArea(area: Area) {
    this.programaService.deleteAreaPrograma(this.programaDetail.id, area.id).subscribe(response => {
      this.areas = this.areas.filter(item => item.id != area.id)
    })
  }

  deleteRequisito(req: Requisito) {
    this.programaService.deleteRequisitoPrograma(this.programaDetail.id, req.id).subscribe(response => {
      this.requisitos = this.requisitos.filter(item => item.id != req.id)
    })
  }

  ngOnInit() {
      this.programaId = this.route.snapshot.paramMap.get('id')!
      if (this.programaId)
        this.getPrograma();
  }


}
