import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaEstrellasComponent } from './grilla-estrellas.component';

describe('GrillaEstrellasComponent', () => {
  let component: GrillaEstrellasComponent;
  let fixture: ComponentFixture<GrillaEstrellasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrillaEstrellasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrillaEstrellasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
