import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalNoHabilitadoComponent } from './profesional-no-habilitado.component';

describe('ProfesionalNoHabilitadoComponent', () => {
  let component: ProfesionalNoHabilitadoComponent;
  let fixture: ComponentFixture<ProfesionalNoHabilitadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesionalNoHabilitadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalNoHabilitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
