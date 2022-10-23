/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddReglaComponent } from './add-regla.component';

describe('AddReglaComponent', () => {
  let component: AddReglaComponent;
  let fixture: ComponentFixture<AddReglaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReglaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReglaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
