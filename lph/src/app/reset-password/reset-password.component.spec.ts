import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {ResetPasswordComponent} from "./reset-password.component";
import {NotificationService} from "../shared/notification.service";
import {AngularFireModule} from "@angular/fire";
import {AngularFireAuthModule} from "@angular/fire/auth";
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
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
