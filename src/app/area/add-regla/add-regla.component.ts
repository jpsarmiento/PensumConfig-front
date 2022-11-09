import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AreaService } from '../area.service';
import { Area } from '../area';
import { ReglaService } from 'src/app/regla/regla.service';
import { Regla } from 'src/app/regla/regla';

@Component({
  selector: 'app-add-regla',
  templateUrl: './add-regla.component.html',
  styleUrls: ['./add-regla.component.css']
})
export class AddReglaComponent implements OnInit {

  areaId!: string;
  @Input() areaDetail!: Area;
  selected: Array<Regla> = [];
  reglas: Array<Regla> = [];

  constructor(
    private route: ActivatedRoute,
    private areaService: AreaService,
    private reglaService: ReglaService,
    private toastr: ToastrService) { }


    getArea(){
      this.areaService.getArea(this.areaId).subscribe(area=>{
        this.areaDetail = area;
      })
    }

    getReglas(): void {
      this.reglaService.getReglas().subscribe({next: reglas =>
      this.reglas = reglas, error: e => console.error(e)});
    }

    filtrar() {
      const filtro = document.getElementById('filtro') as HTMLInputElement;
      const value = filtro.value

      if (value.length != 0) {
      this.reglaService.getReglasQuery(value).subscribe({next: reglas =>
        this.reglas = reglas, error: e => console.error(e)});
      }
      else {
        this.getReglas();
      }
    }

    addRegla(regla: Regla) {
      this.selected.push(regla)
      this.reglas = this.reglas.filter(item => item.id != regla.id);
    }

    addReglaArea(regla: Regla) {
        this.areaService.addReglaArea(this.areaDetail.id, regla.id).subscribe(area =>{
          this.areaDetail = area
        })
      }

    addReglasArea() {
      if (this.selected.length != 0) {
        this.selected.forEach((regla) => {
          this.addReglaArea(regla)
        })
        }
      else {
        this.toastr.error("No ha seleccionado ninguna regla para agregar al área", "Error")
      }
      if(window.localStorage.getItem('token')!=null) {
        this.toastr.success("Las reglas fueron agregadas", "Área actualizada")
      }
    }

  ngOnInit() {
    if(this.areaDetail === undefined){
      this.areaId= this.route.snapshot.paramMap.get('id')!
      if (this.areaId)
        this.getArea();
      }

    this.getReglas();
  }

}
