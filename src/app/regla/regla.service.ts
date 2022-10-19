import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Regla } from './regla';
import { Termino } from '../termino';
import { Curso } from '../curso/curso';

@Injectable({
  providedIn: 'root'
})
export class ReglaService {
  private apiUrl = environment.baseUrl + 'reglas';

  constructor(private http: HttpClient) { }

  getReglas(): Observable<Regla[]> {
    return this.http.get<Regla[]>(this.apiUrl);
  }

  getRegla(id: string): Observable<Regla> {
    return this.http.get<Regla>(this.apiUrl+'/'+id);
  }

  deleteRegla(id: string) {
    return this.http.delete(this.apiUrl+'/'+id)
  }

  createRegla(regla: Regla): Observable<Regla> {
    return this.http.post<Regla>(this.apiUrl, regla);
 }

  updateRegla(id: string, regla: Regla): Observable<Regla> {
    return this.http.put<Regla>(this.apiUrl+"/"+id, regla);
  }

  getTerminos(id: string): Observable<Termino[]> {
    return this.http.get<Termino[]>(this.apiUrl+'/'+id+'/terminos')
  }

  getCursos(id: string): Observable<Curso[]> {
    return this.http.get<Curso[]>(environment.baseUrl+'terminos/'+id+'/cursos')
  }

  getTermino(id: string): Observable<Termino> {
    return this.http.get<Termino>(environment.baseUrl+'terminos/'+id)
  }
}
