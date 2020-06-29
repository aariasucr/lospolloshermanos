import {async, ComponentFixture, TestBed, fakeAsync, tick} from "@angular/core/testing";

import {ProfileComponent} from "./profile.component";
import {routes} from "../app-routing.module";
import {RouterTestingModule} from "@angular/router/testing";
import {ToastrModule} from "ngx-toastr";
import {AngularFireStorage} from "@angular/fire/storage";
import {AngularFireDatabase, AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFireAuth} from "@angular/fire/auth";
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
import {UserService} from "../shared/user.service";
import {AngularFireModule} from "@angular/fire";
import {environment} from "src/environments/environment";
import {NotificationService} from "../shared/notification.service";

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

  // Mock de la base de datosfollowersArray.push
  const mockDatabase: any = {
    AngularFireDatabase() {
      return {
        database() {
          return {
            ref() {
              return {once() {}};
            }
          };
        }
      };
    }
  };

  const mockConfig: any = {
    getConfig() {
      return Promise.resolve(true);
    }
  };

  // Spies para UserService
  let userService: UserService;
  let userServiceSpy: jasmine.Spy;

  // Spies para notifService
  let notificationService: NotificationService;
  let notificationServiceSpy: jasmine.Spy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        ToastrModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        //AngularFireStorageModule,
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
        {provide: AngularFireAuth, useValue: mockAngularFireAuth},
        //{provide: AngularFireDatabase, useValue: mockDatabase},
        {provide: AngularFireStorage, useValue: null}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    userService = fixture.debugElement.injector.get(UserService);
    //userServiceSpy = spyOn(userService, "getUserData");
    let result: Promise<any>;
    userServiceSpy = spyOn(userService, "getUserPosts").and.returnValue(result);

    userService.userId = userData.uid;
    userService.performLogin(userData.uid);

    notificationService = fixture.debugElement.injector.get(NotificationService);
    notificationServiceSpy = spyOn(notificationService, "showSuccessMessage");
    notificationServiceSpy = spyOn(notificationService, "showErrorMessage");
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize", fakeAsync(() => {
    userService.performLogin(userData.uid);
    component.ngOnInit();
    tick(1000);
    component.route = "/myprofile";
    expect(component.allowComments).toBeTruthy();
    expect(component.followersList).toBeTruthy();
    expect(component.posts).toBeTruthy();
    expect(component.followingList).toBeTruthy();
    expect(component.userDataId).toBeTruthy();
    expect(component.profilePicturePath).toBe("");
    expect(component.route).toBeTruthy();
    expect(component.modalTitle).toBe("");
    expect(component.followUnfollowBtn).toBeTruthy();
  }));

  it("should getNumberFollowersAndFollowing", () => {
    component.route = "/myprofile";
    userService.userId = userData.uid;
    component.getNumberFollowersAndFollowing();
    expect(component.following).toBeGreaterThanOrEqual(0);
  });

  it("should do a comment ", () => {
    const testForm = {
      reset() {},
      value: {
        comment: "blah"
      }
    } as NgForm;
    component.onSubmitComment(testForm);
    expect(notificationServiceSpy).toBeTruthy();
    expect(notificationServiceSpy.calls.all().length).toBeGreaterThanOrEqual(0);

    //prueba con commentario vacio
    const testFormEmpty = {
      reset() {},
      value: {
        comment: ""
      }
    } as NgForm;
    component.onSubmitComment(testFormEmpty);
    expect(notificationServiceSpy).toBeTruthy();
    expect(notificationServiceSpy.calls.all().length).toBeGreaterThanOrEqual(0);
  });

  it("should change allow comments", () => {
    component.route = "/myprofile";
    let allow = component.allowComments;
    component.changeAllowComments();
    expect(allow).toBe(!component.allowComments);
  });

  it("should get posts", fakeAsync(() => {
    component.ngOnInit();
    //component.setRoute("/myprofile");
    userService.performLogin(userData.uid);
    component.getPosts();
    expect(userServiceSpy).toBeTruthy();
    expect(userServiceSpy.calls.all().length).toBeGreaterThanOrEqual(0);
    expect(component.posts.length).toBeGreaterThanOrEqual(0);
  }));

  it("should startToFollowUnfollow", fakeAsync(() => {
    component.ngOnInit();
    tick();
    component.route = "/user/234567";
    userService.performLogin(userData.uid);
    let btn = component.followUnfollowBtn;
    //component.startToFollowUnfollow();
    expect(component.followUnfollowBtn).toBe(btn);
  }));
});
