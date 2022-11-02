import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Regla } from 'src/app/regla/regla';
import { Area } from '../area';
import { AreaService } from '../area.service';
import { ActivatedRoute } from '@angular/router';
import {CommunicationService } from 'src/app/communication.service';

@Component({
  selector: 'app-area-detail',
  templateUrl: './area-detail.component.html',
  styleUrls: ['./area-detail.component.css']
})
export class AreaDetailComponent implements OnInit {

  programaId: string = '';
  areaId!: string;
  @Input() areaDetail!: Area;
  reglas: Array<Regla> = [];
  areaForm! : FormGroup;

  constructor(
    private route: ActivatedRoute,
    private areaService: AreaService,
    private communicationService: CommunicationService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  getArea(){
    this.areaService.getArea(this.areaId).subscribe(area=>{
      this.areaDetail = area;
      this.getReglas(area);
    })
  }

  getReglas(area: Area): void {
    this.areaService.getReglas(area.id).subscribe({ next: reglas =>
      this.reglas = reglas})
  }

  deleteRegla(regla: Regla) {
    this.areaService.deleteReglaArea(this.areaDetail.id, regla.id).subscribe(response => {
      this.reglas = this.reglas.filter(item => item.id != regla.id)
    })
  }

  navegarRegla() {
    this.communicationService.writeAreaPrev(this.areaDetail.id)
  }

  clearPrev() {
    this.communicationService.writeAreaPrev("")
    this.communicationService.writeProgramaPrev("")
  }

  writePrograma(id: string) {
    this.communicationService.writeProgramaPrev(id);
  }

  getPrograma() {
    this.programaId = this.communicationService.getProgramaPrev();
  }

  ngOnInit() {
      this.areaId = this.route.snapshot.paramMap.get('id')!
      if (this.areaId)
        this.getArea();
      this.getPrograma();
  }
}
