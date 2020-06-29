import {TestBed} from "@angular/core/testing";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {ModalService} from "./modal.service";

describe("ModalServiceService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [NgbModule]
    })
  );

  let modalService: ModalService;

  it("should be created", () => {
    const service: ModalService = TestBed.get(ModalService);
    expect(service).toBeTruthy();
    modalService = TestBed.get(ModalService);
  });

  it("should close modal", () => {
    const service: ModalService = TestBed.get(ModalService);
    expect(service.close()).toBeUndefined();
  });
});
