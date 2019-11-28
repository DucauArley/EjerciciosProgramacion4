import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaEstrellaComponent } from './alta-estrella.component';

describe('AltaEstrellaComponent', () => {
  let component: AltaEstrellaComponent;
  let fixture: ComponentFixture<AltaEstrellaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaEstrellaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaEstrellaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
