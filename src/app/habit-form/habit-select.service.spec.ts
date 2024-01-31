import { TestBed } from '@angular/core/testing';

import { HabitSelectService } from './habit-select.service';

describe('HabitSelectService', () => {
  let service: HabitSelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabitSelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
