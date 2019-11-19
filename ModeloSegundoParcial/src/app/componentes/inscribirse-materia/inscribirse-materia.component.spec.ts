import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscribirseMateriaComponent } from './inscribirse-materia.component';

describe('InscribirseMateriaComponent', () => {
  let component: InscribirseMateriaComponent;
  let fixture: ComponentFixture<InscribirseMateriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscribirseMateriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscribirseMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
