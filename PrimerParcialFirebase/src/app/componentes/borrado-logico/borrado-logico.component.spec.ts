import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorradoLogicoComponent } from './borrado-logico.component';

describe('BorradoLogicoComponent', () => {
  let component: BorradoLogicoComponent;
  let fixture: ComponentFixture<BorradoLogicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorradoLogicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorradoLogicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
