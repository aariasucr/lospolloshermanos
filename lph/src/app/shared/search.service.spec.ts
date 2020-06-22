import {TestBed} from "@angular/core/testing";

import {SearchService} from "./search.service";
import {RouterTestingModule} from "@angular/router/testing";
import {routes} from "../app-routing.module";
import {AngularFireModule} from "@angular/fire";
import {environment} from "src/environments/environment";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AppComponent} from "../app.component";
import {HomeComponent} from "../home/home.component";
import {ProfileComponent} from "../profile/profile.component";
import {EditProfileComponent} from "../edit-profile/edit-profile.component";
import {LoginComponent} from "../login/login.component";
import {RegisterComponent} from "../register/register.component";
import {SearchResultsComponent} from "../search-results/search-results.component";
import {ChatComponent} from "../chat/chat.component";
import {SpinnerComponent} from "../spinner/spinner.component";
import {ResetPasswordComponent} from "../reset-password/reset-password.component";
import {HeaderComponent} from "../header/header.component";
import {NgForm} from "@angular/forms";
import {FileUploaderComponent} from "../file-uploader/file-uploader.component";
import {PostFrameComponent} from "../post-frame/post-frame.component";

describe("SearchServiceService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule
      ],
      declarations: [
        AppComponent,
        HomeComponent,
        ProfileComponent,
        EditProfileComponent,
        LoginComponent,
        RegisterComponent,
        SearchResultsComponent,
        ChatComponent,
        SpinnerComponent,
        ResetPasswordComponent,
        SearchResultsComponent,
        HeaderComponent,
        NgForm,
        FileUploaderComponent,
        PostFrameComponent
      ]
    })
  );

  it("should be created", () => {
    const service: SearchService = TestBed.get(SearchService);
    expect(service).toBeTruthy();
  });
});
