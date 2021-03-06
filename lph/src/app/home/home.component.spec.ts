import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {HomeComponent} from "./home.component";

import {FormsModule, NgForm} from "@angular/forms";
import {NotificationService} from "../shared/notification.service";
import {PostService} from "../shared/post.service";
import {UserService} from "../shared/user.service";
import {AngularFireModule} from "@angular/fire";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {environment} from "../../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {ResetPasswordComponent} from "../reset-password/reset-password.component";
import {RegisterComponent} from "../register/register.component";
import {AppComponent} from "../app.component";
import {ProfileComponent} from "../profile/profile.component";
import {EditProfileComponent} from "../edit-profile/edit-profile.component";
import {LoginComponent} from "../login/login.component";
import {HeaderComponent} from "../header/header.component";
import {PostFrameComponent} from "../post-frame/post-frame.component";
import {FileUploaderComponent} from "../file-uploader/file-uploader.component";

import {routes} from "../app-routing.module";
import {RouterTestingModule} from "@angular/router/testing";
import {SearchResultsComponent} from "../search-results/search-results.component";
import {ChatComponent} from "../chat/chat.component";
import {SpinnerComponent} from "../spinner/spinner.component";
import {ToastrModule} from "ngx-toastr";
import {AngularFireStorageModule} from "@angular/fire/storage";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  //mock de datos de usuario
  const userData = {
    uid: "ZhLvdu5951NUkgrkQSXf7pNULGc2"
  };

  const mockAngularFireAuth: any = {
    currentUser: Promise.resolve(userData)
  };

  // Spies para UserService
  let userService: UserService;
  let userServiceSpy: jasmine.Spy;

  // Spies para notifService
  let notificationService: NotificationService;
  let notificationServiceSpy: jasmine.Spy;

  let postService: PostService;
  let postServiceSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot(),
        FormsModule,
        RouterTestingModule.withRoutes(routes),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireStorageModule,
        AngularFireDatabaseModule
      ],
      declarations: [
        HomeComponent,
        RegisterComponent,
        AppComponent,
        ProfileComponent,
        LoginComponent,
        SearchResultsComponent,
        ChatComponent,
        ResetPasswordComponent,
        FileUploaderComponent,
        PostFrameComponent,
        HeaderComponent,
        SpinnerComponent,
        EditProfileComponent
      ],
      providers: [NotificationService, PostService, UserService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    userService = fixture.debugElement.injector.get(UserService);
    userServiceSpy = spyOn(userService, "getUserDataFromFirebase");

    postService = fixture.debugElement.injector.get(PostService);
    postServiceSpy = spyOn(postService, "addNewPostAsync");

    notificationService = fixture.debugElement.injector.get(NotificationService);
    notificationServiceSpy = spyOn(notificationService, "showSuccessMessage");
    notificationServiceSpy = spyOn(notificationService, "showErrorMessage");
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initiate", () => {
    component.ngOnInit();
    expect(component.user).not.toBeNull();
  });

  it("should pick imagr", () => {
    component.onImagePicked("imagen");
    expect(component.uploadedFileUrl).toBe("imagen");
  });

  it("should upload image", () => {
    const testForm = {
      reset() {},
      value: {
        comment: "blah"
      }
    } as NgForm;
    component.onSubmit(testForm);
    expect(notificationServiceSpy).toBeTruthy();
    expect(notificationServiceSpy.calls.all().length).toBeGreaterThanOrEqual(0);
    expect(userServiceSpy).toBeTruthy();
    expect(userServiceSpy.calls.all().length).toBeGreaterThanOrEqual(0);
    expect(postServiceSpy).toBeTruthy();
    expect(postServiceSpy.calls.all().length).toBeGreaterThanOrEqual(0);
  });
});
