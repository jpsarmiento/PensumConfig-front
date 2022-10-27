import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Requisito } from './requisito';
import { RequisitoService } from './requisito.service';


@Component({
  selector: 'app-requisito',
  templateUrl: './requisito.component.html',
  styleUrls: ['./requisito.component.css']
})
export class RequisitoComponent implements OnInit {


  requisitos: Array<Requisito> = [];
  allRequisitos:  Array<Requisito> = [];
  selected: Boolean = false;
  selectedRequisito!: Requisito;
  requisitoForm! : FormGroup;

  constructor(
    private requisitoService: RequisitoService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

    getRequisitos(): void {
      this.requisitoService.getRequisitos().subscribe({next: requisitos =>
      this.requisitos = requisitos, error: e => console.error(e)});
    }

    onSelected(requisito: Requisito): void {
      this.selected = true;
      this.selectedRequisito = requisito;
    }

    deleteRequisito(requisito: Requisito) {
      this.requisitoService.deleteRequisito(requisito.id).subscribe(response => {
        this.requisitos = this.requisitos.filter(item => item.id != requisito.id);
        this.allRequisitos = this.allRequisitos.filter(item => item.id != requisito.id);
      })
    }

    formularioModificar() {
      this.requisitoForm = this.formBuilder.group({
        nombre: [this.selectedRequisito.nombre, [Validators.required, Validators.minLength(2), Validators.maxLength(70)]],
        descripcion: [this.selectedRequisito.descripcion, [Validators.required, Validators.minLength(2)]]
      })
    }

    formularioCrear() {
      this.requisitoForm = this.formBuilder.group({
        nombre: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(70)]],
        descripcion: ["", [Validators.required, Validators.minLength(2)]]
      })
    }

    createRequisito(requisito: Requisito) {
      this.requisitoService.createRequisito(requisito).subscribe(requisito =>{
        this.toastr.success(requisito.nombre, "Requisito creado")
        this.requisitoForm.reset();
        this.getRequisitos()
      })
    }

    updateRequisito(requisito: Requisito) {
      this.requisitoService.updateRequisito(this.selectedRequisito.id, requisito).subscribe(requisito =>{
        this.toastr.success(requisito.nombre, "Requisito actualizado");
        this.selectedRequisito = requisito;
        this.getRequisitos();
      })
    }

    filtrar() {
      if(this.allRequisitos.length==0 && this.requisitos.length != 0)
        this.allRequisitos = this.requisitos;

      this.requisitos = this.allRequisitos;
      const filtro = document.getElementById('filtro') as HTMLInputElement;
      const value = filtro.value

      if (value.length != 0)
        this.requisitos =  this.requisitos.filter(item => item.nombre.toUpperCase().includes(value.toUpperCase()));
    }

  ngOnInit() {
    this.getRequisitos()

    this.requisitoForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(70)]],
      descripcion: ["", [Validators.required, Validators.minLength(2)]]
    })
  }


}
