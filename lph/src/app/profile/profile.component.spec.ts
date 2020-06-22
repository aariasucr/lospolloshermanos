import {async, ComponentFixture, TestBed, fakeAsync, tick} from "@angular/core/testing";

import {ProfileComponent} from "./profile.component";
import {routes} from "../app-routing.module";
import {RouterTestingModule} from "@angular/router/testing";
import {AngularFireModule} from "@angular/fire";
import {environment} from "src/environments/environment";
import {ToastrModule} from "ngx-toastr";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireDatabaseModule, AngularFireDatabase} from "@angular/fire/database";
import {AngularFireAuthModule, AngularFireAuth} from "@angular/fire/auth";
import {NgForm} from "@angular/forms";
import {AppComponent} from "../app.component";
import {HomeComponent} from "../home/home.component";
import {EditProfileComponent} from "../edit-profile/edit-profile.component";
import {LoginComponent} from "../login/login.component";
import {RegisterComponent} from "../register/register.component";
import {SearchResultsComponent} from "../search-results/search-results.component";
import {ChatComponent} from "../chat/chat.component";
import {ResetPasswordComponent} from "../reset-password/reset-password.component";
import {HeaderComponent} from "../header/header.component";
import {FileUploaderComponent} from "../file-uploader/file-uploader.component";
import {PostFrameComponent} from "../post-frame/post-frame.component";
import {SpinnerComponent} from "../spinner/spinner.component";
import {DatePipe} from "@angular/common";

describe("ProfileComponent", () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  //mock de datos de usuario
  const userData = {
    uid: "ZhLvdu5951NUkgrkQSXf7pNULGc2"
  };

  const mockAngularFireAuth: any = {
    currentUser: Promise.resolve(userData)
  };

  const mockDatabase: any = {
    list() {
      return {
        snapshotChanges() {
          return {subscribe() {}};
        }
      };
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        ToastrModule.forRoot(),
        AngularFireStorageModule,
        AngularFireDatabaseModule
        //AngularFireAuthModule
      ],
      declarations: [
        ProfileComponent,
        NgForm,
        AppComponent,
        HomeComponent,
        EditProfileComponent,
        LoginComponent,
        RegisterComponent,
        SearchResultsComponent,
        ChatComponent,
        ResetPasswordComponent,
        HeaderComponent,
        FileUploaderComponent,
        PostFrameComponent,
        SpinnerComponent
      ],
      providers: [
        DatePipe,
        {provide: AngularFireAuth, useValue: mockAngularFireAuth}
        //{provide: AngularFireDatabase, useValue: mockDatabase}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize", fakeAsync(() => {
    component.ngOnInit();
    tick(1000);
    expect(component.followersList).toBeTruthy();
    //console.log("############", userData, component.followersList);
    expect(component.posts).toBeTruthy();
    expect(component.followingList).toBeTruthy();
    expect(component.userDataId).toBeTruthy();
    expect(component.profilePicturePath).not.toBeTruthy();
    expect(component.route).toBeTruthy();
    expect(component.modalTitle).toBe("");
    expect(component.followUnfollowBtn).toBeTruthy();
    //component.startToFollowUnfollow();
  }));
});
