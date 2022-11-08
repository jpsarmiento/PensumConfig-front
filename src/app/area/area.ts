import { Programa } from "../programa/programa";
import { Regla } from "../regla/regla";

export class Area {

  id: string;
  nombre: string;
  creditos: number;
  prioridad: string;
  tipo: string;
  reglas: Array<Regla> = [];
  programas: Array<Programa> = [];

  public constructor(id: string, nombre: string, creditos: number, tipo: string, prioridad: string, reglas: Array<Regla>, programas: Array<Programa>) {
    this.id = id;
    this.nombre = nombre;
    this.creditos = creditos;
    this.prioridad = prioridad;
    this.tipo = tipo;
    this.reglas = reglas;
    this.programas = programas;
  }

}
