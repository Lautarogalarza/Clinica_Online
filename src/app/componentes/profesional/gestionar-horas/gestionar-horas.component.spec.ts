import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarHorasComponent } from './gestionar-horas.component';

describe('GestionarHorasComponent', () => {
  let component: GestionarHorasComponent;
  let fixture: ComponentFixture<GestionarHorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarHorasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarHorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
