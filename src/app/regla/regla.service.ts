import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Regla } from './regla';

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

  createRegla(curso: Regla): Observable<Regla> {
    return this.http.post<Regla>(this.apiUrl, curso);
 }

  updateRegla(id: string, curso: Regla): Observable<Regla> {
    return this.http.put<Regla>(this.apiUrl+"/"+id, curso);
  }

}
