import { Regla } from "../regla/regla";

export class Area {

  id: string;
  nombre: string;
  creditos: number;
  prioridad: string;
  reglas: Array<Regla> = [];

  public constructor(id: string, nombre: string, creditos: number, prioridad: string, reglas: Array<Regla>) {
    this.id = id;
    this.nombre = nombre;
    this.creditos = creditos;
    this.prioridad = prioridad;
    this.reglas = reglas;
  }

}
