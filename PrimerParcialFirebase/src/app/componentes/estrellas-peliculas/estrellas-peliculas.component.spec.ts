import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstrellasPeliculasComponent } from './estrellas-peliculas.component';

describe('EstrellasPeliculasComponent', () => {
  let component: EstrellasPeliculasComponent;
  let fixture: ComponentFixture<EstrellasPeliculasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstrellasPeliculasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstrellasPeliculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
