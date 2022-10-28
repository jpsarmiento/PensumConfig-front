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
}
