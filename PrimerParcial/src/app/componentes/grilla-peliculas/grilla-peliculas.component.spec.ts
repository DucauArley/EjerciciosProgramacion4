import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaPeliculasComponent } from './grilla-peliculas.component';

describe('GrillaPeliculasComponent', () => {
  let component: GrillaPeliculasComponent;
  let fixture: ComponentFixture<GrillaPeliculasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrillaPeliculasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrillaPeliculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
