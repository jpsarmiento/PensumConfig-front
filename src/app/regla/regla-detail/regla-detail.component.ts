import { Component, Input, OnInit } from '@angular/core';
import { Regla } from '../regla';

@Component({
  selector: 'app-regla-detail',
  templateUrl: './regla-detail.component.html',
  styleUrls: ['./regla-detail.component.css']
})
export class ReglaDetailComponent implements OnInit {

  @Input() reglaDetail!: Regla;

  constructor() { }

  ngOnInit() {
  }

}
