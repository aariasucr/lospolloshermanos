import {async, ComponentFixture, TestBed, fakeAsync, tick} from "@angular/core/testing";

import {PostFrameComponent} from "./post-frame.component";
import {AngularFireModule} from "@angular/fire";
import {environment} from "src/environments/environment";
import {ToastrModule} from "ngx-toastr";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {NgForm} from "@angular/forms";
import {UserService} from "../shared/user.service";
import {NotificationService} from "../shared/notification.service";
import {PostService} from "../shared/post.service";

describe("PostFrameComponent", () => {
  let component: PostFrameComponent;
  let fixture: ComponentFixture<PostFrameComponent>;

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
        AngularFireModule.initializeApp(environment.firebaseConfig),
        ToastrModule.forRoot(),
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule
      ],
      declarations: [PostFrameComponent, NgForm]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFrameComponent);
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

  it("should initialize", () => {
    component.ngOnInit();
    expect(component.postRef).toBeUndefined();
    expect(component.author).toBe("");
    expect(component.uploadedFileUrl).toBe("");
    expect(component.numComm).toBe(0);
    expect(component.userDataId).toBe("");
    expect(component.profilePicturePath).toBe("");
    expect(component.numLikes).toBe(0);
    expect(component.fullName).toBe("");
  });

  it("should change likes", () => {
    let n = component.numLikes;
    component.incNumLikes();
    expect(component.numLikes).not.toBe(n);
  });

  it("should make comment", () => {
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
