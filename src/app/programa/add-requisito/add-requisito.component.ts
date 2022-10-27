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
  allRequisitos:  Array<Requisito> = [];

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
      if(this.allRequisitos.length==0 && this.requisitos.length != 0)
        this.allRequisitos= this.requisitos;

      this.requisitos = this.allRequisitos;
      const filtro = document.getElementById('filtro') as HTMLInputElement;
      const value = filtro.value

      if (value.length != 0)
        this.requisitos =  this.requisitos.filter(item => item.nombre.toUpperCase().includes(value.toUpperCase()));
    }

    addRequisito(requisito: Requisito) {
      this.selected.push(requisito)
      this.requisitos = this.requisitos.filter(item => item.id != requisito.id);
      this.allRequisitos = this.allRequisitos.filter(item => item.id != requisito.id);
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
          this.toastr.success("Las requisitos fueron agregados", "Programa actualizado")
        }
      else {
        this.toastr.error("No ha seleccionado ningún área para agregar al programa", "Error")
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
