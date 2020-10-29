import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalPorApellidoComponent } from './profesional-por-apellido.component';

describe('ProfesionalPorApellidoComponent', () => {
  let component: ProfesionalPorApellidoComponent;
  let fixture: ComponentFixture<ProfesionalPorApellidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesionalPorApellidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalPorApellidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
