import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from './curso';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrl = environment.baseUrl + 'cursos';

  constructor(private http: HttpClient) { }

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }

  getCursosQuery(query: string): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl+'/findByFilter/param?query='+query);
  }

  getCurso(id: string): Observable<Curso> {
    return this.http.get<Curso>(this.apiUrl+'/'+id);
  }

  deleteCurso(id: string) {
    return this.http.delete(this.apiUrl+'/'+id)
  }

  createCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, curso);
 }

  updateCurso(id: string, curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(this.apiUrl+"/"+id, curso);
  }

}
