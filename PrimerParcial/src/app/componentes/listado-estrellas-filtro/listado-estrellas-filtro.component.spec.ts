import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoEstrellasFiltroComponent } from './listado-estrellas-filtro.component';

describe('ListadoEstrellasFiltroComponent', () => {
  let component: ListadoEstrellasFiltroComponent;
  let fixture: ComponentFixture<ListadoEstrellasFiltroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoEstrellasFiltroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoEstrellasFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
