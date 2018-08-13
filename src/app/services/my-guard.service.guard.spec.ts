import { TestBed, async, inject } from '@angular/core/testing';

import { MyGuard.ServiceGuard } from './my-guard.service.guard';

describe('MyGuard.ServiceGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyGuard.ServiceGuard]
    });
  });

  it('should ...', inject([MyGuard.ServiceGuard], (guard: MyGuard.ServiceGuard) => {
    expect(guard).toBeTruthy();
  }));
});
