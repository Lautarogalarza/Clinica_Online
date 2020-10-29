import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalPorEspecialidadComponent } from './profesional-por-especialidad.component';

describe('ProfesionalPorEspecialidadComponent', () => {
  let component: ProfesionalPorEspecialidadComponent;
  let fixture: ComponentFixture<ProfesionalPorEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesionalPorEspecialidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalPorEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
