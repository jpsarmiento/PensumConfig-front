import { Curso } from "./curso/curso";
import { Regla } from "./regla/regla";

export class Termino {

  id: string;
  cursos: Curso[];
  regla: Regla;

  public constructor(id: string, cursos: Curso[], regla: Regla) {
    this.id = id;
    this.cursos = cursos;
    this.regla = regla;
  }
}
