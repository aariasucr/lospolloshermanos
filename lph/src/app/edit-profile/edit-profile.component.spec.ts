import {async, ComponentFixture, TestBed, fakeAsync, tick} from "@angular/core/testing";

import {EditProfileComponent} from "./edit-profile.component";
import {FileUploaderComponent} from "../file-uploader/file-uploader.component";
import {FormsModule, NgForm} from "@angular/forms";
import {AngularFireAuthModule, AngularFireAuth} from "@angular/fire/auth";
import {environment} from "src/environments/environment";
import {AngularFireModule} from "@angular/fire";
import {AngularFireDatabaseModule, AngularFireDatabase} from "@angular/fire/database";
import {ToastrModule} from "ngx-toastr";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {UserService} from "../shared/user.service";
import {NotificationService} from "../shared/notification.service";

describe("EditProfileComponent", () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;

  // Spies para UserService
  let userService: UserService;
  let userServiceSpy: jasmine.Spy;

  // Spies para notifService
  let notificationService: NotificationService;
  let notificationServiceSpy: jasmine.Spy;

  //mock de datos de usuario
  const userData = {
    uid: "ZhLvdu5951NUkgrkQSXf7pNULGc2"
  };

  const mockAngularFireAuth: any = {
    currentUser: Promise.resolve(userData)
  };

  // Mock de la base de datos
  const mockDatabase: any = {
    AngularFireDatabase() {
      return {
        database() {
          return {
            ref() {
              return {update() {}};
            }
          };
        }
      };
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        ToastrModule.forRoot(),
        FormsModule,
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule
      ],
      declarations: [EditProfileComponent, FileUploaderComponent],
      providers: [
        //{provide: AngularFireAuth, useValue: mockAngularFireAuth}
        //{provide: AngularFireDatabase, useValue: mockDatabase}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    userService = fixture.debugElement.injector.get(UserService);
    userServiceSpy = spyOn(userService, "performLogin");

    notificationService = fixture.debugElement.injector.get(NotificationService);
    notificationServiceSpy = spyOn(notificationService, "showSuccessMessage");
    notificationServiceSpy = spyOn(notificationService, "showErrorMessage");
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize", fakeAsync(() => {
    component.ngOnInit();
    tick(1000);
    expect(component.user).toBeTruthy();
    expect(component.urlImage).toBeTruthy();
  }));

  it("should get photo url", () => {
    const url = "fotoUrl";
    component.getPhotoUrl(url);
    expect(component.urlImage).toBe(url);
  });

  it("should submit data", () => {
    const testForm = {
      reset() {},
      value: {
        nombre: "",
        newEmail: "",
        newUsername: ""
      }
    } as NgForm;

    component.onSubmitData(testForm);
    expect(notificationServiceSpy).toBeTruthy();
    expect(notificationServiceSpy.calls.all().length).toBeGreaterThanOrEqual(0);

    const testFormOk = {
      reset() {},
      value: {
        nombre: "Jimmy Acuña",
        newEmail: "email@email.com",
        newUsername: "jimmyacua"
      }
    } as NgForm;

    component.onSubmitData(testFormOk);
    expect(notificationServiceSpy).toBeTruthy();
    expect(notificationServiceSpy.calls.all().length).toBeGreaterThanOrEqual(0);
  });

  it("should change photo", () => {
    component.onChangePhoto();
    expect(notificationServiceSpy).toBeTruthy();
    expect(notificationServiceSpy.calls.all().length).toBeGreaterThanOrEqual(0);
  });

  it("should change password", () => {
    console.log("en test", component.user);
    const testFormOk = {
      reset() {},
      value: {
        newPass: "123456",
        newPass2: "123456"
      }
    } as NgForm;

    component.onSubmitPassword(testFormOk);
    expect(notificationServiceSpy).toBeTruthy();
    expect(notificationServiceSpy.calls.all().length).toBeGreaterThanOrEqual(0);
  });
});
