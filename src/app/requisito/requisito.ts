import { Programa } from "../programa/programa";

export class Requisito {
  id: string;
  nombre: string;
  descripcion: string;
  programas: Array<Programa> = []

  public constructor(id: string, nombre: string, descripcion: string, programas: Array<Programa>) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.programas = programas;
  }
}
