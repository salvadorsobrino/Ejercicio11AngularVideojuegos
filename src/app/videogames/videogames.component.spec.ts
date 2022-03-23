/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VideogamesComponent } from './videogames.component';

describe('VideogamesComponent', () => {
  let component: VideogamesComponent;
  let fixture: ComponentFixture<VideogamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideogamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideogamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
