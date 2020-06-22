import {TestBed} from "@angular/core/testing";

import {ChatService} from "./chat.service";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFireModule} from "@angular/fire";
import {environment} from "src/environments/environment";

describe("ChatService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireDatabaseModule
      ]
    })
  );

  it("should be created", () => {
    const service: ChatService = TestBed.get(ChatService);
    expect(service).toBeTruthy();
  });
});
