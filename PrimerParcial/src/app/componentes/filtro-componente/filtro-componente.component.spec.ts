import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroComponenteComponent } from './filtro-componente.component';

describe('FiltroComponenteComponent', () => {
  let component: FiltroComponenteComponent;
  let fixture: ComponentFixture<FiltroComponenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroComponenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
