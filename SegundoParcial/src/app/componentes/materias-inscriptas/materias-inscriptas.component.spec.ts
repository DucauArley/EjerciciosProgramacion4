import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasInscriptasComponent } from './materias-inscriptas.component';

describe('MateriasInscriptasComponent', () => {
  let component: MateriasInscriptasComponent;
  let fixture: ComponentFixture<MateriasInscriptasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriasInscriptasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriasInscriptasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
