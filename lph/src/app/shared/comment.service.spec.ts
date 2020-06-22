import {TestBed} from "@angular/core/testing";

import {CommentService} from "./comment.service";
import {AngularFireModule} from "@angular/fire";
import {environment} from "src/environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFireAuthModule} from "@angular/fire/auth";

describe("CommentService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule
      ]
    })
  );

  it("should be created", () => {
    const service: CommentService = TestBed.get(CommentService);
    expect(service).toBeTruthy();
  });
});
