import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarAdminComponent } from './cargar-admin.component';

describe('CargarAdminComponent', () => {
  let component: CargarAdminComponent;
  let fixture: ComponentFixture<CargarAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargarAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
