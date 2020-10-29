import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalPorDiaComponent } from './profesional-por-dia.component';

describe('ProfesionalPorDiaComponent', () => {
  let component: ProfesionalPorDiaComponent;
  let fixture: ComponentFixture<ProfesionalPorDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesionalPorDiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalPorDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
