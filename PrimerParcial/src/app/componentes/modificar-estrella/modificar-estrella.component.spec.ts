import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarEstrellaComponent } from './modificar-estrella.component';

describe('ModificarEstrellaComponent', () => {
  let component: ModificarEstrellaComponent;
  let fixture: ComponentFixture<ModificarEstrellaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarEstrellaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarEstrellaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
