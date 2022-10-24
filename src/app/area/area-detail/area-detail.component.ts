import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Regla } from 'src/app/regla/regla';
import { Area } from '../area';
import { AreaService } from '../area.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-area-detail',
  templateUrl: './area-detail.component.html',
  styleUrls: ['./area-detail.component.css']
})
export class AreaDetailComponent implements OnInit {

  areaId!: string;
  @Input() areaDetail!: Area;
  reglas: Array<Regla> = [];
  areaForm! : FormGroup;

  constructor(
    private route: ActivatedRoute,
    private areaService: AreaService,
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

  ngOnInit() {
      this.areaId = this.route.snapshot.paramMap.get('id')!
      if (this.areaId)
        this.getArea();
  }
}
