import {TestBed} from "@angular/core/testing";

import {PostCommentService} from "./post-comment.service";
import {AngularFireModule} from "@angular/fire";
import {environment} from "src/environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFireAuthModule} from "@angular/fire/auth";

describe("PostCommentService", () => {
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
    const service: PostCommentService = TestBed.get(PostCommentService);
    expect(service).toBeTruthy();
  });
});
