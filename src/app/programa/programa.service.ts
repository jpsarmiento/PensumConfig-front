import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Programa } from './programa';
import { Area } from '../area/area';
import { Requisito } from '../requisito/requisito';


@Injectable({
  providedIn: 'root'
})
export class ProgramaService {

  private apiUrl = environment.baseUrl + 'programas';

  constructor(private http: HttpClient) { }

  getProgramas(): Observable<Programa[]> {
    return this.http.get<Programa[]>(this.apiUrl);
  }

  getPrograma(id: string): Observable<Programa> {
    return this.http.get<Programa>(this.apiUrl+'/'+id);
  }

  deletePrograma(id: string) {
    return this.http.delete(this.apiUrl+'/'+id)
  }

  createPrograma(programa: Programa): Observable<Programa> {
    return this.http.post<Programa>(this.apiUrl, programa);
 }

  updatePrograma(id: string, programa: Programa): Observable<Programa> {
    return this.http.put<Programa>(this.apiUrl+"/"+id, programa);
  }

  getAreas(id: string): Observable<Area[]> {
    return this.http.get<Area[]>(this.apiUrl+'/'+id+'/areas')
  }

  getRequisitos(id: string): Observable<Requisito[]> {
    return this.http.get<Requisito[]>(this.apiUrl+'/'+id+'/requisitos')
  }

 addAreaPrograma(programaid: string, areaid: string) : Observable<Programa>{
  return this.http.post<Programa>(this.apiUrl+'/'+programaid+'/areas/'+areaid, null)
 }

 deleteAreaPrograma(programaid: string, areaid: string) {
  return this.http.delete(this.apiUrl+'/'+programaid+'/areas/'+areaid)
 }

 addRequisitoPrograma(programaid: string, requisitoid: string) : Observable<Programa>{
  return this.http.post<Programa>(this.apiUrl+'/'+programaid+'/requisitos/'+requisitoid, null)
 }

 deleteRequisitoPrograma(programaid: string, requisito: string) {
  return this.http.delete(this.apiUrl+'/'+programaid+'/requisitos/'+requisito)
 }

}
