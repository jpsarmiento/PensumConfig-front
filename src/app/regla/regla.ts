import { Termino } from "../termino";

export class Regla {

  id: string;
  nombre: string;
  semestre_inicio: number;
  semestre_vigencia: number;
  creditos: number;
  terminos: Termino[];

  public constructor(id: string, nombre: string, semestre_inicio: number, creditos: number, semestre_vigencia: number, terminos: Termino[]) {
    this.id = id;
    this.nombre = nombre;
    this.semestre_inicio = semestre_inicio;
    this.semestre_vigencia = semestre_vigencia;
    this.creditos = creditos;
    this.terminos = terminos;
  }

}
