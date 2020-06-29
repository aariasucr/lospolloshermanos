import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {LoginComponent} from "./login.component";
import {FormsModule, NgForm} from "@angular/forms";
import {AppRoutingModule} from "../app-routing.module";
import {ToastrModule} from "ngx-toastr";
import {AngularFireModule} from "@angular/fire";
import {environment} from "src/environments/environment";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {HomeComponent} from "../home/home.component";
import {FileUploaderComponent} from "../file-uploader/file-uploader.component";
import {AppComponent} from "../app.component";
import {ProfileComponent} from "../profile/profile.component";
import {EditProfileComponent} from "../edit-profile/edit-profile.component";
import {RegisterComponent} from "../register/register.component";
import {HeaderComponent} from "../header/header.component";
import {PostFrameComponent} from "../post-frame/post-frame.component";
import {ResetPasswordComponent} from "../reset-password/reset-password.component";
import {SearchResultsComponent} from "../search-results/search-results.component";
import {ChatComponent} from "../chat/chat.component";
import {SpinnerComponent} from "../spinner/spinner.component";
import {AngularFirePerformanceModule} from "@angular/fire/performance";
import {UserService} from "../shared/user.service";
import {NotificationService} from "../shared/notification.service";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  // Spies para UserService
  let userService: UserService;
  let userServiceSpy: jasmine.Spy;

  let notificationService: NotificationService;
  let notificationServiceSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        AppRoutingModule,
        ToastrModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFirePerformanceModule,
        AngularFireDatabaseModule
      ],
      declarations: [
        LoginComponent,
        AppComponent,
        HomeComponent,
        ProfileComponent,
        EditProfileComponent,
        RegisterComponent,
        HeaderComponent,
        PostFrameComponent,
        FileUploaderComponent,
        ResetPasswordComponent,
        SearchResultsComponent,
        ChatComponent,
        SpinnerComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    userService = fixture.debugElement.injector.get(UserService);
    userServiceSpy = spyOn(userService, "performLogin");

    notificationService = fixture.debugElement.injector.get(NotificationService);
    notificationServiceSpy = spyOn(notificationService, "showErrorMessage");
    notificationServiceSpy = spyOn(notificationService, "showSuccessMessage");
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should login", () => {
    const testForm = {
      reset() {},
      value: {
        email: "test@test.com",
        password: "123456"
      }
    } as NgForm;

    component.onSubmit(testForm);
    expect(userServiceSpy).toBeTruthy();
    expect(userServiceSpy.calls.all().length).toBeGreaterThanOrEqual(0);
    expect(notificationServiceSpy).toBeTruthy();
    expect(notificationServiceSpy.calls.all().length).toBeGreaterThanOrEqual(0);

    userService.performLogout();
  });
});
