import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Token } from './token';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private apiUrl = environment.baseUrl;

constructor(private http: HttpClient) { }

login(user: User): Observable<Token> {
  return this.http.post<Token>(this.apiUrl+'users/login', user)
}
}
