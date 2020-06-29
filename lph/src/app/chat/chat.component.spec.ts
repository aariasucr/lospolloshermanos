import {async, ComponentFixture, TestBed, fakeAsync, tick} from "@angular/core/testing";
import {NgForm} from "@angular/forms";
import {ChatComponent} from "./chat.component";
import {AngularFireModule} from "@angular/fire";
import {environment} from "src/environments/environment";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {DatePipe} from "@angular/common";

describe("ChatComponent", () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule
      ],
      declarations: [ChatComponent, NgForm],
      providers: [DatePipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize", fakeAsync(() => {
    component.ngOnInit();
    tick(1000);
    expect(component.userData).toBeTruthy();
    expect(component.messagesArray).toBeTruthy();
    expect(component.previews).toBeTruthy();
    expect(component.selectedChat).toBeTruthy();
    expect(component.userchatRooms).toBeTruthy();
    component.getPreviews();
    expect(component.previews.length).toBeGreaterThanOrEqual(0);
  }));

  it("should get chat rooms", () => {
    expect(component.getUserChatRooms()).toBeTruthy();
  });

  it("should get users chats", () => {
    expect(component.getUserChats("idchat")).toBeTruthy();
  });

  it("should open chat", () => {
    expect(
      component.openChat("2SYMvre2sRerkIbNqFam81KEGH52_gwDQfnT6KrNc3I1sLigDtK2Mcgo1")
    ).toBeUndefined();
  });

  it("should send message", () => {
    const testForm = {
      reset() {},
      value: {
        mensaje: "blah"
      }
    } as NgForm;
    expect(component.sendNewMessage(testForm)).toBeUndefined();
  });
});
