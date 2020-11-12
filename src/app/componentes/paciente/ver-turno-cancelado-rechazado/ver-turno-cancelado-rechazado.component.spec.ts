import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTurnoCanceladoRechazadoComponent } from './ver-turno-cancelado-rechazado.component';

describe('VerTurnoCanceladoRechazadoComponent', () => {
  let component: VerTurnoCanceladoRechazadoComponent;
  let fixture: ComponentFixture<VerTurnoCanceladoRechazadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerTurnoCanceladoRechazadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerTurnoCanceladoRechazadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
