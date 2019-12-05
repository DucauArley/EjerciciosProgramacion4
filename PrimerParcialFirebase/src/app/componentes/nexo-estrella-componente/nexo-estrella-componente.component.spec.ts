import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NexoEstrellaComponenteComponent } from './nexo-estrella-componente.component';

describe('NexoEstrellaComponenteComponent', () => {
  let component: NexoEstrellaComponenteComponent;
  let fixture: ComponentFixture<NexoEstrellaComponenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NexoEstrellaComponenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NexoEstrellaComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
