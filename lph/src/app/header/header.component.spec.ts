import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {HeaderComponent} from "./header.component";
import {NgForm} from "@angular/forms";
import {AngularFireModule} from "@angular/fire";
import {environment} from "src/environments/environment";
import {AngularFireStorageModule, AngularFireStorage} from "@angular/fire/storage";
import {AngularFireDatabaseModule, AngularFireDatabase} from "@angular/fire/database";
import {AngularFireAuthModule, AngularFireAuth} from "@angular/fire/auth";
import {routes} from "../app-routing.module";
import {RouterTestingModule} from "@angular/router/testing";
import {AppComponent} from "../app.component";
import {HomeComponent} from "../home/home.component";
import {ProfileComponent} from "../profile/profile.component";
import {EditProfileComponent} from "../edit-profile/edit-profile.component";
import {LoginComponent} from "../login/login.component";
import {RegisterComponent} from "../register/register.component";
import {SearchResultsComponent} from "../search-results/search-results.component";
import {FileUploaderComponent} from "../file-uploader/file-uploader.component";
import {PostFrameComponent} from "../post-frame/post-frame.component";
import {SpinnerComponent} from "../spinner/spinner.component";
import {ChatComponent} from "../chat/chat.component";
import {ResetPasswordComponent} from "../reset-password/reset-password.component";
import {UserService} from "../shared/user.service";
import {database} from "firebase";
import {ModalService} from "../shared/modal.service";
import {SearchService} from "../shared/search.service";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  //mock de datos de usuario
  const userData = {
    uid: "ZhLvdu5951NUkgrkQSXf7pNULGc2"
  };

  const mockAngularFireAuth: any = {
    currentUser: Promise.resolve(userData)
  };

  // Mock de la base de datosfollowersArray.push
  const mockDatabase: any = {};

  // Spies para UserService
  let userService: UserService;
  let userServiceSpy: jasmine.Spy;

  let modalService: ModalService;
  let modalServiceSpy: jasmine.Spy;

  let searchService: SearchService;
  let searchServiceSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        //AngularFireStorageModule,
        AngularFireDatabaseModule
        //AngularFireAuthModule
      ],
      declarations: [
        HeaderComponent,
        NgForm,
        AppComponent,
        HomeComponent,
        ProfileComponent,
        EditProfileComponent,
        LoginComponent,
        RegisterComponent,
        SearchResultsComponent,
        FileUploaderComponent,
        PostFrameComponent,
        SpinnerComponent,
        ChatComponent,
        ResetPasswordComponent
      ],
      providers: [{provide: AngularFireAuth, useValue: mockAngularFireAuth}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    userService = fixture.debugElement.injector.get(UserService);
    userServiceSpy = spyOn(userService, "performLogin");
    userServiceSpy = spyOn(userService, "performLogout");

    modalService = fixture.debugElement.injector.get(ModalService);
    modalServiceSpy = spyOn(modalService, "open");

    searchService = fixture.debugElement.injector.get(SearchService);
    searchServiceSpy = spyOn(searchService, "setValueToSearch");

    //userService.userId = userData.uid;
    //userService.performLogin(userData.uid);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initiate", () => {
    //userService.performLogin(userData.uid);
    component.ngOnInit();

    expect(component.numOfNotifications).toBe(0);
    expect(component.newLikes).toBe(0);
    expect(component.newFollower).toBe(0);
    expect(component.newComments).toBe(0);
    expect(component.newMessages).toBe(0);
    expect(component.isLogged).not.toBeNull();
    expect(component.userName).not.toBeNull();
    expect(component.fullName).not.toBeNull();
  });

  it("should get messages number", () => {
    let n = component.newMessages;
    component.messagesNumber();
    expect(component.newMessages).toBeGreaterThanOrEqual(n);
  });

  it("should get new likes number", () => {
    let n = component.newLikes;
    component.likesNumber();
    expect(component.newLikes).toBeGreaterThanOrEqual(n);
  });

  it("should get new Comments number", () => {
    let n = component.newComments;
    component.commentsNumber();
    expect(component.newComments).toBeGreaterThanOrEqual(n);
  });

  it("should get new Comments number", () => {
    let n = component.newFollower;
    component.followersNumber();
    expect(component.newFollower).toBeGreaterThanOrEqual(n);
  });

  it("should put new messages in 0", () => {
    component.newMessages = 12;
    component.resetMessages();
    expect(component.newMessages).toBe(0);
  });

  it("should perform logout", () => {
    component.logout();
    expect(userServiceSpy).toBeTruthy();
    expect(userServiceSpy.calls.all().length).toBeGreaterThanOrEqual(0);
  });

  it("should reset Notifications", () => {
    component.resetNotifications();
    expect(component.numOfNotifications).toBe(0);
    expect(component.newLikes).toBe(0);
    expect(component.newFollower).toBe(0);
    expect(component.newComments).toBe(0);
  });

  it("should open modal", () => {
    const modal: any = {
      open: jasmine
        .createSpy("modal.open")
        .and.returnValue({result: {then: jasmine.createSpy("modal.result.then")}}),
      close: jasmine.createSpy("modal.close"),
      dismiss: jasmine.createSpy("modal.dismiss")
    };
    component.openNotifications(modal);
    expect(modalServiceSpy).toBeTruthy();
    expect(modalServiceSpy.calls.all().length).toBeGreaterThanOrEqual(0);
  });

  it("should search", () => {
    const testForm = {
      reset() {},
      value: {
        searchText: "jimmy"
      }
    } as NgForm;
    component.search(testForm);
    expect(searchServiceSpy).toBeTruthy();
    expect(searchServiceSpy.calls.all().length).toBeGreaterThanOrEqual(0);
  });
});
