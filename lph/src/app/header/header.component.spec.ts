import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {HeaderComponent} from "./header.component";
import {NgForm} from "@angular/forms";
import {AngularFireModule} from "@angular/fire";
import {environment} from "src/environments/environment";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {routes} from "../app-routing.module";
import {RouterTestingModule} from "@angular/router/testing";
import {AppComponent} from "../app.component";
import {HomeComponent} from "../home/home.component";
import {ProfileComponent} from "../profile/profile.component";
import {EditProfileComponent} from "../edit-profile/edit-profile.component";
import {LoginComponent} from "../login/login.component";
import {RegisterComponent} from "../register/register.component";
import {SearchResultsComponent} from "../search-results/search-results.component";
import {FileUploaderComponent} from "../file-uploader/file-uploader.component";
import {PostFrameComponent} from "../post-frame/post-frame.component";
import {SpinnerComponent} from "../spinner/spinner.component";
import {ChatComponent} from "../chat/chat.component";
import {ResetPasswordComponent} from "../reset-password/reset-password.component";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule
      ],
      declarations: [
        HeaderComponent,
        NgForm,
        AppComponent,
        HomeComponent,
        ProfileComponent,
        EditProfileComponent,
        LoginComponent,
        RegisterComponent,
        SearchResultsComponent,
        FileUploaderComponent,
        PostFrameComponent,
        SpinnerComponent,
        ChatComponent,
        ResetPasswordComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
