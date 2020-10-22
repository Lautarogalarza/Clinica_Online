import { TestBed } from '@angular/core/testing';

import { UsuarioBDService } from './usuario-bd.service';

describe('UsuarioBDService', () => {
  let service: UsuarioBDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioBDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
