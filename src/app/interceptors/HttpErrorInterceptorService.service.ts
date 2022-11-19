import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor
 } from '@angular/common/http';
 import { Observable, throwError } from 'rxjs';
 import { catchError } from 'rxjs/operators';
 import { ToastrService } from 'ngx-toastr';
 import { Injectable } from '@angular/core';

 @Injectable()
 export class HttpErrorInterceptorService extends HttpErrorResponse {

  constructor(private toastrService: ToastrService) { super(toastrService) }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((httpErrorResponse: HttpErrorResponse) => {
          let errorMesagge = '';
          let errorType = '';

          if (httpErrorResponse.error instanceof ErrorEvent) {
            errorType = "Error de usuario"
            errorMesagge = httpErrorResponse.error.error;
          } else {
            errorType = "Error del servidor"
            if (httpErrorResponse.status === 0) {
              errorMesagge = "No hay conexión con el servidor.";
            }
            else if (httpErrorResponse.status === 401){
              errorType = "Error de autorización"
              errorMesagge = "No esta autorizado para realizar esta operación o las credenciales son incorrectas.";
            }
            else {
              errorMesagge = `${httpErrorResponse.status}: ${httpErrorResponse.error.message}`;
            }
            this.toastrService.error(errorMesagge, errorType, { closeButton: true });
          }
          return throwError(()=> new Error(errorMesagge));
        })
      )
  }
 }
