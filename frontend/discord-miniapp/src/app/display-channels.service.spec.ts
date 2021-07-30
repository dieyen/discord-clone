import { TestBed } from '@angular/core/testing';

import { DisplayChannelsService } from './_services/display-channels.service';

describe('DisplayChannelsService', () => {
  let service: DisplayChannelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayChannelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
