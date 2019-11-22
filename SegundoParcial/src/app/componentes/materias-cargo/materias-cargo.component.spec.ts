import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasCargoComponent } from './materias-cargo.component';

describe('MateriasCargoComponent', () => {
  let component: MateriasCargoComponent;
  let fixture: ComponentFixture<MateriasCargoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriasCargoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriasCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
