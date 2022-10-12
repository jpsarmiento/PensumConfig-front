export class Curso {
  nombre: string;
  sigla: string;
  codigo: number;
  creditos: number;
  es_epsilon: boolean;
  es_tipo_e: boolean;

  public constructor(nombre: string, sigla: string, codigo: number, creditos: number, es_epsilon: boolean, es_tipo_e: boolean, ) {
    this.nombre = nombre;
    this.sigla = sigla;
    this.codigo = codigo;
    this.creditos = creditos;
    this.es_epsilon = es_epsilon;
    this.es_tipo_e = es_tipo_e;
  }
}
