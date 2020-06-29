import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {RegisterComponent} from "./register.component";

import {FormsModule, NgForm} from "@angular/forms";
import {NotificationService} from "../shared/notification.service";
import {AppRoutingModule} from "../app-routing.module";
import {UserService} from "../shared/user.service";
import {AngularFireModule} from "@angular/fire";
import {AngularFireAuthModule, AngularFireAuth} from "@angular/fire/auth";
import {environment} from "../../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AppComponent} from "../app.component";
import {HomeComponent} from "../home/home.component";
import {ProfileComponent} from "../profile/profile.component";
import {EditProfileComponent} from "../edit-profile/edit-profile.component";
import {LoginComponent} from "../login/login.component";
import {HeaderComponent} from "../header/header.component";
import {PostFrameComponent} from "../post-frame/post-frame.component";
import {FileUploaderComponent} from "../file-uploader/file-uploader.component";
import {ResetPasswordComponent} from "../reset-password/reset-password.component";
import {ToastrModule} from "ngx-toastr";
import {SearchResultsComponent} from "../search-results/search-results.component";
import {ChatComponent} from "../chat/chat.component";
import {SpinnerComponent} from "../spinner/spinner.component";

describe("RegisterComponent", () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

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
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        ToastrModule.forRoot()
      ],
      declarations: [
        RegisterComponent,
        AppComponent,
        HomeComponent,
        ProfileComponent,
        EditProfileComponent,
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
        PostFrameComponent,
        FileUploaderComponent,
        ResetPasswordComponent,
        SearchResultsComponent,
        ChatComponent,
        SpinnerComponent
      ],
      providers: [NotificationService, UserService, AngularFireAuth]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
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
    expect(component.login()).toBeUndefined();
  });

  it("should regiser", () => {
    const testForm = {
      reset() {},
      value: {
        nombre: "nombre",
        apellido: "apellido",
        username: "test1",
        email: "test1@test1.com",
        password: "123456",
        passConfirmation: "123456"
      }
    } as NgForm;

    component.register(testForm);
    expect(userServiceSpy).toBeTruthy();
    expect(userServiceSpy.calls.all().length).toBeGreaterThanOrEqual(0);
    expect(notificationServiceSpy).toBeTruthy();
    expect(notificationServiceSpy.calls.all().length).toBeGreaterThanOrEqual(0);
  });
});
