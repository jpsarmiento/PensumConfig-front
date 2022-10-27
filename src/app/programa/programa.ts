import { Area } from "../area/area";
import { Requisito } from "../requisito/requisito";

export class Programa {

  id: string;
  nombre: string;
  min_gpa: number;
  tipo: string;
  areas: Array<Area> = [];
  requisitos: Array<Requisito>

  public constructor(id: string, nombre: string, min_gpa: number, tipo: string, areas: Array<Area>, requisitos: Array<Requisito>) {
    this.id = id;
    this.nombre = nombre;
    this.min_gpa = min_gpa;
    this.tipo = tipo;
    this.areas = areas;
    this.requisitos = requisitos;
  }

}
