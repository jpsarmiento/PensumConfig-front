import { Component } from '@angular/core';
import { CommunicationService } from './communication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PensumConfig-front';


  constructor(
    private communicationService: CommunicationService) {  }

  clearPrev() {
    this.communicationService.writeAreaPrev("")
    this.communicationService.writeProgramaPrev("")
  }

  login() {
    const user_input = document.getElementById('username') as HTMLInputElement;
    const username = user_input.value
    const pass_input = document.getElementById('password') as HTMLInputElement;
    const password = pass_input.value

    user_input.value = ''
    pass_input.value = ''

    console.log(username, 'Username:')
    console.log(password, 'Password:')
  }
}
