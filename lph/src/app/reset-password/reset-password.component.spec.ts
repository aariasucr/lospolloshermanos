import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {ResetPasswordComponent} from "./reset-password.component";
import {NotificationService} from "../shared/notification.service";
import {AngularFireModule} from "@angular/fire";
import {AngularFireAuthModule, AngularFireAuth} from "@angular/fire/auth";
import {environment} from "../../environments/environment";
import {ToastrModule} from "ngx-toastr";
import {NgForm} from "@angular/forms";
import {routes} from "../app-routing.module";
import {RouterTestingModule} from "@angular/router/testing";
import {AppComponent} from "../app.component";
import {HomeComponent} from "../home/home.component";
import {ProfileComponent} from "../profile/profile.component";
import {EditProfileComponent} from "../edit-profile/edit-profile.component";
import {LoginComponent} from "../login/login.component";
import {RegisterComponent} from "../register/register.component";
import {SearchResultsComponent} from "../search-results/search-results.component";
import {ChatComponent} from "../chat/chat.component";
import {SpinnerComponent} from "../spinner/spinner.component";
import {HeaderComponent} from "../header/header.component";
import {FileUploaderComponent} from "../file-uploader/file-uploader.component";
import {PostFrameComponent} from "../post-frame/post-frame.component";

describe("ResetPasswordComponent", () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  //mock de datos de usuario
  const userData = {
    uid: "ZhLvdu5951NUkgrkQSXf7pNULGc2"
  };

  const mockAngularFireAuth: any = {
    currentUser: Promise.resolve(userData)
  };
  // Spies para notifService
  let notificationService: NotificationService;
  let notificationServiceSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        ToastrModule.forRoot()
      ],
      declarations: [
        ResetPasswordComponent,
        NgForm,
        AppComponent,
        HomeComponent,
        ProfileComponent,
        ResetPasswordComponent,
        EditProfileComponent,
        LoginComponent,
        RegisterComponent,
        SearchResultsComponent,
        ChatComponent,
        SpinnerComponent,
        HeaderComponent,
        FileUploaderComponent,
        PostFrameComponent
      ],
      providers: [NotificationService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    notificationService = fixture.debugElement.injector.get(NotificationService);
    notificationServiceSpy = spyOn(notificationService, "showSuccessMessage");
    notificationServiceSpy = spyOn(notificationService, "showErrorMessage");
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should reset password ", () => {
    const testForm = {
      reset() {},
      value: {
        email: "blah@email.com"
      }
    } as NgForm;
    component.resetPassword(testForm);
    expect(notificationServiceSpy).toBeTruthy();
    expect(notificationServiceSpy.calls.all().length).toBeGreaterThanOrEqual(0);

    const testFormOk = {
      reset() {},
      value: {
        email: "test@test.com"
      }
    } as NgForm;
    component.resetPassword(testFormOk);
    expect(notificationServiceSpy).toBeTruthy();
    expect(notificationServiceSpy.calls.all().length).toBeGreaterThanOrEqual(0);
  });
});
