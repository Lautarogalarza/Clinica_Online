import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTurnoAceptadoComponent } from './ver-turno-aceptado.component';

describe('VerTurnoAceptadoComponent', () => {
  let component: VerTurnoAceptadoComponent;
  let fixture: ComponentFixture<VerTurnoAceptadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerTurnoAceptadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerTurnoAceptadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
