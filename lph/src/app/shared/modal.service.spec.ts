import {TestBed} from '@angular/core/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {ModalService} from './modal.service';

describe('ModalServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [NgbModule]
  }));

  it('should be created', () => {
    const service: ModalService = TestBed.get(ModalService);
    expect(service).toBeTruthy();
  });
});
