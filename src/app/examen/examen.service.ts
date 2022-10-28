import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Examen } from './examen';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  private apiUrl = environment.baseUrl + 'examenes';

  constructor(private http: HttpClient) { }

  getExamenes(): Observable<Examen[]> {
    return this.http.get<Examen[]>(this.apiUrl);
  }

  getExamen(id: string): Observable<Examen> {
    return this.http.get<Examen>(this.apiUrl+'/'+id);
  }

  getExamenesQuery(query: string): Observable<Examen[]> {
    return this.http.get<Examen[]>(this.apiUrl+'/findByFilter/param?query='+query);
  }

  deleteExamen(id: string) {
    return this.http.delete(this.apiUrl+'/'+id)
  }

  createExamen(examen: Examen): Observable<Examen> {
    return this.http.post<Examen>(this.apiUrl, examen);
 }

  updateExamen(id: string, examen: Examen): Observable<Examen> {
    return this.http.put<Examen>(this.apiUrl+"/"+id, examen);
  }
}
