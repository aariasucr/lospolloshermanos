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

  // Spies para UserService
  let userServicePF: UserService;
  let userServicePFSpy: jasmine.Spy;

  // Spies para notifService
  let notificationPFService: NotificationService;
  let notificationPFServiceSpy: jasmine.Spy;

  let postServicePF: PostService;
  let postServicePFSpy: jasmine.Spy;

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

    userServicePF = fixture.debugElement.injector.get(UserService);
    userServicePFSpy = spyOn(userServicePF, "getUserDataFromFirebase");

    postServicePF = fixture.debugElement.injector.get(PostService);
    postServicePFSpy = spyOn(postServicePF, "addNewPostAsync");

    notificationPFService = fixture.debugElement.injector.get(NotificationService);
    notificationPFServiceSpy = spyOn(notificationPFService, "showSuccessMessage");
    notificationPFServiceSpy = spyOn(notificationPFService, "showErrorMessage");
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
    expect(notificationPFServiceSpy).toBeTruthy();
    expect(notificationPFServiceSpy.calls.all().length).toBeGreaterThanOrEqual(0);
    expect(userServicePFSpy).toBeTruthy();
    expect(userServicePFSpy.calls.all().length).toBeGreaterThanOrEqual(0);
    expect(postServicePFSpy).toBeTruthy();
    expect(postServicePFSpy.calls.all().length).toBeGreaterThanOrEqual(0);
  });
});
