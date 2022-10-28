import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Area } from './area';
import { AreaService } from './area.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  areas: Array<Area> = [];
  selected: Boolean = false;
  selectedArea!: Area;
  areaForm! : FormGroup;

  constructor(
    private areaService: AreaService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  getAreas(): void {
    this.areaService.getAreas().subscribe({next: areas =>
    this.areas = areas, error: e => console.error(e)});
  }

  onSelected(area: Area): void {
    this.selected = true;
    this.selectedArea = area;
  }

  deleteArea(area: Area) {
    this.areaService.deleteArea(area.id).subscribe(response => {
      this.areas = this.areas.filter(item => item.id != area.id);
    })
  }

  formularioModificar() {
    this.areaForm= this.formBuilder.group({
      nombre: [this.selectedArea.nombre, [Validators.required, Validators.minLength(2), Validators.maxLength(70)]],
      prioridad: [this.selectedArea.prioridad, [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      creditos: [this.selectedArea.creditos, [Validators.required, Validators.min(0)]]
    })
  }

  formularioCrear() {
    this.areaForm= this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(70)]],
      prioridad: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      creditos: ["", [Validators.required, Validators.min(0)]]
    })
  }

  createArea(area: Area) {
    this.areaService.createArea(area).subscribe(area =>{
      this.toastr.success(area.nombre, "Área creada")
      this.areaForm.reset();
      this.getAreas()
    })
  }

  updateArea(area: Area) {
    this.areaService.updateArea(this.selectedArea.id, area).subscribe(area =>{
      this.toastr.success(area.nombre, "Área actualizada");
      this.selectedArea = area;
      this.getAreas();
    })
  }

  ngOnInit() {
    this.getAreas();
    this.formularioCrear();
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
}
