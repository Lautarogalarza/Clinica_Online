import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginContenedorComponent } from './login-contenedor.component';

describe('LoginContenedorComponent', () => {
  let component: LoginContenedorComponent;
  let fixture: ComponentFixture<LoginContenedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginContenedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginContenedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
