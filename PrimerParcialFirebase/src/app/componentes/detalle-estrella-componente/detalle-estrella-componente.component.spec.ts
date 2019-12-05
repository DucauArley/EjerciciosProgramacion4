import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEstrellaComponenteComponent } from './detalle-estrella-componente.component';

describe('DetalleEstrellaComponenteComponent', () => {
  let component: DetalleEstrellaComponenteComponent;
  let fixture: ComponentFixture<DetalleEstrellaComponenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleEstrellaComponenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleEstrellaComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
