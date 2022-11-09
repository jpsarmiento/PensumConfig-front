import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Area } from 'src/app/area/area';
import { AreaService } from 'src/app/area/area.service';
import { Programa } from '../programa';
import { ProgramaService } from '../programa.service';

@Component({
  selector: 'app-add-area',
  templateUrl: './add-area.component.html',
  styleUrls: ['./add-area.component.css']
})
export class AddAreaComponent implements OnInit {

  programaId!: string;
  @Input() programaDetail!: Programa;
  selected: Array<Area> = [];
  areas: Array<Area> = [];

  constructor(
    private route: ActivatedRoute,
    private programaService: ProgramaService,
    private areaService: AreaService,
    private toastr: ToastrService) { }


    getPrograma(){
      this.programaService.getPrograma(this.programaId).subscribe(programa=>{
        this.programaDetail = programa;
      })
    }

    getAreas(): void {
      this.areaService.getAreas().subscribe({next: areas =>
      this.areas = areas, error: e => console.error(e)});
    }

    filtrar() {
      const filtro = document.getElementById('filtro') as HTMLInputElement;
      const value = filtro.value

      if (value.length != 0) {
      this.areaService.getAreasQuery(value).subscribe({next: areas =>
        this.areas = areas, error: e => console.error(e)});
      }
      else {
        this.getAreas();
      }
    }

    addArea(area: Area) {
      this.selected.push(area)
      this.areas = this.areas.filter(item => item.id != area.id);
    }

    addAreaPrograma(area: Area) {
        this.programaService.addAreaPrograma(this.programaDetail.id, area.id).subscribe(programa =>{
          this.programaDetail = programa
        })
      }

    addAreasPrograma() {
      if (this.selected.length != 0) {
        this.selected.forEach((area) => {
          this.addAreaPrograma(area)
        })
        }
      else {
        this.toastr.error("No ha seleccionado ninguna área para agregar al programa", "Error")
      }
      if(window.localStorage.getItem('token')!=null) {
        this.toastr.success("Las areas fueron agregadas", "Programa actualizado")
      }
    }

  ngOnInit() {
    if(this.programaDetail === undefined){
      this.programaId = this.route.snapshot.paramMap.get('id')!
      if (this.programaId)
        this.getPrograma();
      }

    this.getAreas();
  }
}
