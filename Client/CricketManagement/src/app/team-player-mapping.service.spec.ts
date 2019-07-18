import { TestBed, inject } from '@angular/core/testing';

import { TeamPlayerMappingService } from './team-player-mapping.service';

describe('TeamPlayerMappingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamPlayerMappingService]
    });
  });

  it('should be created', inject([TeamPlayerMappingService], (service: TeamPlayerMappingService) => {
    expect(service).toBeTruthy();
  }));
});
