import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Regla } from '../regla/regla';
import { Area } from './area';

@Injectable({
  providedIn: 'root'
})
export class AreaService {


  private apiUrl = environment.baseUrl + 'areas';

  constructor(private http: HttpClient) { }

  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(this.apiUrl);
  }

  getArea(id: string): Observable<Area> {
    return this.http.get<Area>(this.apiUrl+'/'+id);
  }

  getAreasQuery(query: string): Observable<Area[]> {
    return this.http.get<Area[]>(this.apiUrl+'/findByFilter/param?query='+query);
  }

  deleteArea(id: string) {
    return this.http.delete(this.apiUrl+'/'+id)
  }

  createArea(area: Area): Observable<Area> {
    return this.http.post<Area>(this.apiUrl, area);
 }

  updateArea(id: string, area: Area): Observable<Area> {
    return this.http.put<Area>(this.apiUrl+"/"+id, area);
  }

  getReglas(id: string): Observable<Regla[]> {
    return this.http.get<Regla[]>(this.apiUrl+'/'+id+'/reglas')
  }

 addReglaArea(areaid: string, reglaid: string) : Observable<Area>{
  return this.http.post<Area>(this.apiUrl+'/'+areaid+'/reglas/'+reglaid, null)
 }

 deleteReglaArea(areaid: string, reglaid: string) {
  return this.http.delete(this.apiUrl+'/'+areaid+'/reglas/'+reglaid)
}
}
