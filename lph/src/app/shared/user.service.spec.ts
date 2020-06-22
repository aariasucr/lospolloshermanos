import {TestBed} from "@angular/core/testing";

import {UserService} from "./user.service";

import {AngularFireModule} from "@angular/fire";
import {AngularFireAuthModule, AngularFireAuth} from "@angular/fire/auth";
import {environment} from "../../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/database";

const userData = {
  uid: "ZhLvdu5951NUkgrkQSXf7pNULGc2"
};

const mockAngularFireAuth: any = {
  currentUser: Promise.resolve(userData)
};

describe("UserService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule
      ],
      providers: [{provide: AngularFireAuth, useValue: mockAngularFireAuth}]
    })
  );

  it("should be created", () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
