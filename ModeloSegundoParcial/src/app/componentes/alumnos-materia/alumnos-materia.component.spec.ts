import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosMateriaComponent } from './alumnos-materia.component';

describe('AlumnosMateriaComponent', () => {
  let component: AlumnosMateriaComponent;
  let fixture: ComponentFixture<AlumnosMateriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumnosMateriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnosMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
