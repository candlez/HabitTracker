import { TestBed } from '@angular/core/testing';

import { CreatorRedirectService } from './creator-redirect.service';

describe('CreatorRedirectService', () => {
  let service: CreatorRedirectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatorRedirectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
