import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CursoModule } from './curso/curso.module';
import { HttpErrorInterceptorService } from './interceptors/HttpErrorInterceptorService.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReglaModule } from './regla/regla.module';
import { ExamenModule } from './examen/examen.module';
import { AreaModule } from './area/area.module';
import { ProgramaModule } from './programa/programa.module';
import { RequisitoModule } from './requisito/requisito.module';
import { HomeComponent } from './home/home.component';
import { InterceptorService } from './interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
   ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    CursoModule,
    ReglaModule,
    ExamenModule,
    AreaModule,
    ProgramaModule,
    RequisitoModule,
    HttpClientModule,
    ToastrModule.forRoot({timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true}),
    BrowserAnimationsModule
  ],
  providers: [

    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi:true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true
      },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
