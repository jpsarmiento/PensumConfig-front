import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';import { Requisito } from 'src/app/requisito/requisito';
import { RequisitoService } from 'src/app/requisito/requisito.service';
import { Programa } from '../programa';
import { ProgramaService } from '../programa.service';

@Component({
  selector: 'app-add-requisito',
  templateUrl: './add-requisito.component.html',
  styleUrls: ['./add-requisito.component.css']
})
export class AddRequisitoComponent implements OnInit {

  programaId!: string;
  @Input() programaDetail!: Programa;
  selected: Array<Requisito> = [];
  requisitos: Array<Requisito> = [];

  constructor(
    private route: ActivatedRoute,
    private programaService: ProgramaService,
    private requisitoService: RequisitoService,
    private toastr: ToastrService) { }


    getPrograma(){
      this.programaService.getPrograma(this.programaId).subscribe(programa=>{
        this.programaDetail = programa;
      })
    }

    getRequisitos(): void {
      this.requisitoService.getRequisitos().subscribe({next: requisitos =>
      this.requisitos = requisitos, error: e => console.error(e)});
    }

    filtrar() {
      const filtro = document.getElementById('filtro') as HTMLInputElement;
      const value = filtro.value

      if (value.length != 0) {
      this.requisitoService.getRequisitosQuery(value).subscribe({next: requisitos =>
        this.requisitos = requisitos, error: e => console.error(e)});
      }
      else {
        this.getRequisitos();
      }
    }

    addRequisito(requisito: Requisito) {
      this.selected.push(requisito)
      this.requisitos = this.requisitos.filter(item => item.id != requisito.id);
    }

    addRequisitoPrograma(requisito: Requisito) {
        this.programaService.addRequisitoPrograma(this.programaDetail.id, requisito.id).subscribe(programa =>{
          this.programaDetail = programa
        })
      }

    addRequisitosPrograma() {
      if (this.selected.length != 0) {
        this.selected.forEach((requisito) => {
          this.addRequisitoPrograma(requisito)
        })
        }
      else {
        this.toastr.error("No ha seleccionado ningún área para agregar al programa", "Error")
      }
      if(window.localStorage.getItem('token')!=null) {
        this.toastr.success("Los requisitos fueron agregados", "Programa actualizado")
      }
    }

  ngOnInit() {
    if(this.programaDetail === undefined){
      this.programaId = this.route.snapshot.paramMap.get('id')!
      if (this.programaId)
        this.getPrograma();
      }

    this.getRequisitos();
  }

}
