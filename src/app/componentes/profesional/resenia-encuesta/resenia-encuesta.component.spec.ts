import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReseniaEncuestaComponent } from './resenia-encuesta.component';

describe('ReseniaEncuestaComponent', () => {
  let component: ReseniaEncuestaComponent;
  let fixture: ComponentFixture<ReseniaEncuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReseniaEncuestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReseniaEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
