import { Termino } from "../termino";

export class Curso {
  id: string;
  nombre: string;
  sigla: string;
  codigo: number;
  creditos: number;
  es_epsilon: Boolean;
  es_tipo_e: Boolean;
  terminos: Array<Termino> = []

  public constructor(id: string, nombre: string, sigla: string, codigo: number, creditos: number, es_epsilon: boolean, es_tipo_e: boolean, terminos: Array<Termino>) {
    this.id = id;
    this.nombre = nombre;
    this.sigla = sigla;
    this.codigo = codigo;
    this.creditos = creditos;
    this.es_epsilon = es_epsilon;
    this.es_tipo_e = es_tipo_e;
    this.terminos = terminos;
  }
}
