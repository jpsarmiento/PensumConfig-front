import { Regla } from "../regla/regla";

export class Examen {
  id: string;
  nombre: string;
  min_nota: number;
  regla: Regla;

  public constructor(id: string, nombre: string, min_nota: number,  regla: Regla) {
    this.id = id;
    this.nombre = nombre;
    this.min_nota = min_nota;
    this.regla = regla;
  }
}
