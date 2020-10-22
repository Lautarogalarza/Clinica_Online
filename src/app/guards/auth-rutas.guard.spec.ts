import { TestBed } from '@angular/core/testing';

import { AuthRutasGuard } from './auth-rutas.guard';

describe('AuthRutasGuard', () => {
  let guard: AuthRutasGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthRutasGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
