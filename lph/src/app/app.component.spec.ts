import {TestBed, async, fakeAsync, ComponentFixture} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {AppComponent} from "./app.component";
import {ToastrModule} from "ngx-toastr";
import {AngularFireModule} from "@angular/fire";
import {environment} from "src/environments/environment";
import {AngularFireAuthModule, AngularFireAuth} from "@angular/fire/auth";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {HeaderComponent} from "./header/header.component";
import {NgForm} from "@angular/forms";
import {UserService} from "./shared/user.service";

let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;

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

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ToastrModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule
      ],
      declarations: [AppComponent, HeaderComponent, NgForm]
      // providers: [{provide: AngularFireAuth, useValue: mockAngularFireAuth}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    userService = fixture.debugElement.injector.get(UserService);
    userServiceSpy = spyOn(userService, "performLogin").and.callFake((fn) => {
      return userData.uid;
    });
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'lph'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("lph");
  });
});
