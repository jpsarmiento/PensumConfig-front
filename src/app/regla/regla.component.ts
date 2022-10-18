import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Regla } from './regla';
import { ReglaService } from './regla.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-regla',
  templateUrl: './regla.component.html',
  styleUrls: ['./regla.component.css']
})
export class ReglaComponent implements OnInit {

  reglas: Array<Regla> = [];
  selected: Boolean = false;
  selectedRegla!: Regla;
  reglaForm! : FormGroup;

  constructor(
    private reglaService: ReglaService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  getReglas(): void {
    this.reglaService.getReglas().subscribe({next: reglas =>
    this.reglas = reglas, error: e => console.error(e)});
  }

  onSelected(regla: Regla): void {
    this.selected = true;
    this.selectedRegla = regla;
  }

  deleteRegla(regla: Regla) {
    this.reglaService.deleteRegla(regla.id).subscribe(response => {
      this.reglas = this.reglas.filter(item => item.id != regla.id);
    })
  }

  formularioModificar() {
    this.reglaForm = this.formBuilder.group({
      nombre: [this.selectedRegla.nombre, [Validators.required, Validators.minLength(2), Validators.maxLength(70)]],
      semestre_inicio: [this.selectedRegla.semestre_inicio, [Validators.required, Validators.min(200000), Validators.max(205002)]],
      semestre_vigencia: [this.selectedRegla.semestre_vigencia, [Validators.required, Validators.min(200000), Validators.max(205002)]],
      creditos: [this.selectedRegla.creditos, [Validators.required, Validators.min(0)]]
    })
  }

  formularioCrear() {
    this.reglaForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(70)]],
      semestre_inicio: ["", [Validators.required, Validators.min(200000), Validators.max(205002)]],
      semestre_vigencia: ["", [Validators.required, Validators.min(200000), Validators.max(205002)]],
      creditos: ["", [Validators.required, Validators.min(0)]]
    })
  }

  createRegla(regla: Regla) {
    this.reglaService.createRegla(regla).subscribe(regla =>{
      console.info("La regla fue creada: ", regla)
      this.toastr.success(regla.nombre, "Regla creado")
      this.reglaForm.reset();
      this.getReglas()
    })
  }

  updateRegla(regla: Regla) {
    this.reglaService.updateRegla(this.selectedRegla.id, regla).subscribe(regla =>{
      console.info("La regla fue actualizada: ", regla)
      this.toastr.success(regla.nombre, "Regla actualizada");
      this.selectedRegla = regla;
      this.getReglas();
    })
  }

  ngOnInit() {
    this.getReglas();

    this.reglaForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(70)]],
      semestre_inicio: ["", [Validators.required, Validators.min(200000), Validators.max(205002)]],
      semestre_vigencia: ["", [Validators.required, Validators.min(200000), Validators.max(205002)]],
      creditos: ["", [Validators.required, Validators.min(0)]]
    })
  }

  splitNum1(num: number) {
    const arreglo = Array.from(num.toString()).map(Number)
    return ""+  arreglo[0]+arreglo[1]+arreglo[2]+arreglo[3]
  }

  splitNum2(num: number) {
    const arreglo = Array.from(num.toString()).map(Number)
    return ""+arreglo[4]+arreglo[5]
  }

}
