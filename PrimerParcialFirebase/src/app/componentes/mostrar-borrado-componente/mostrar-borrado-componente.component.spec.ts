import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarBorradoComponenteComponent } from './mostrar-borrado-componente.component';

describe('MostrarBorradoComponenteComponent', () => {
  let component: MostrarBorradoComponenteComponent;
  let fixture: ComponentFixture<MostrarBorradoComponenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarBorradoComponenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarBorradoComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
