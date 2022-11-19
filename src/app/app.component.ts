import { Component } from '@angular/core';
import { CommunicationService } from './communication.service';
import { AppService } from './app.service'
import { User } from './user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PensumConfig-front';

  user!: User;

  constructor(
    private communicationService: CommunicationService,
    private appService: AppService,
    private toastr: ToastrService) {  }

  clearPrev() {
    this.communicationService.writeAreaPrev("")
    this.communicationService.writeProgramaPrev("")
  }

  login() {
    const user_input = document.getElementById('username') as HTMLInputElement;
    const username = user_input.value
    const pass_input = document.getElementById('password') as HTMLInputElement;
    const password = pass_input.value
    this.user = new User(username, password)
    this.getToken()

    user_input.value = ''
    pass_input.value = ''
  }

  getToken() {
    const modal = document.getElementById('closeLogin') as HTMLButtonElement;
    this.appService.login(this.user).subscribe(token =>{
      this.toastr.success('Bienvenido usuario '+this.user.username, "Sesión iniciada");
      window.localStorage.setItem('token', token.token)
      window.localStorage.setItem('user', this.user.username)
      modal.click()
    })
  }

  getUsername() {
    return window.localStorage.getItem('user')
  }

  cerrarSesion() {
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('token')
    this.toastr.success("Se ha cerrado la sesión correctamente","Sesión cerrada");
  }

}
