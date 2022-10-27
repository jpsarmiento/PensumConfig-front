import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Requisito } from './requisito';

@Injectable({
  providedIn: 'root'
})
export class RequisitoService {

  private apiUrl = environment.baseUrl + 'requisitos';

  constructor(private http: HttpClient) { }

  getRequisitos(): Observable<Requisito[]> {
    return this.http.get<Requisito[]>(this.apiUrl);
  }

  getRequisito(id: string): Observable<Requisito> {
    return this.http.get<Requisito>(this.apiUrl+'/'+id);
  }

  deleteRequisito(id: string) {
    return this.http.delete(this.apiUrl+'/'+id)
  }

  createRequisito(requisito: Requisito): Observable<Requisito> {
    return this.http.post<Requisito>(this.apiUrl, requisito);
 }

  updateRequisito(id: string, requisito: Requisito): Observable<Requisito> {
    return this.http.put<Requisito>(this.apiUrl+"/"+id, requisito);
  }
}
