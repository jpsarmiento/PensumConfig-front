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
  allAreas:  Array<Area> = [];

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
      if(this.allAreas.length==0 && this.areas.length != 0)
        this.allAreas= this.areas;

      this.areas = this.allAreas;
      const filtro = document.getElementById('filtro') as HTMLInputElement;
      const value = filtro.value

      if (value.length != 0)
        this.areas =  this.areas.filter(item => item.nombre.toUpperCase().includes(value.toUpperCase()));
    }

    addArea(area: Area) {
      this.selected.push(area)
      this.areas = this.areas.filter(item => item.id != area.id);
      this.allAreas = this.allAreas.filter(item => item.id != area.id);
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
          this.toastr.success("Las areas fueron agregadas", "Programa actualizado")
        }
      else {
        this.toastr.error("No ha seleccionado ninguna área para agregar al programa", "Error")
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
