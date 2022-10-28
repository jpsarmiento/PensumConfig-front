import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private programaPrev = ''
  private areaPrev = ''

constructor() { }

  getProgramaPrev() {
    return this.programaPrev;
  }

  getAreaPrev() {
    return this.areaPrev
  }

  writeProgramaPrev(id: string) {
    this.programaPrev = id;
  }

  writeAreaPrev(id: string) {
    this.areaPrev = id;
  }
}
