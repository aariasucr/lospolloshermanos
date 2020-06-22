import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {PostFrameComponent} from "./post-frame.component";
import {AngularFireModule} from "@angular/fire";
import {environment} from "src/environments/environment";
import {ToastrModule} from "ngx-toastr";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {NgForm} from "@angular/forms";

describe("PostFrameComponent", () => {
  let component: PostFrameComponent;
  let fixture: ComponentFixture<PostFrameComponent>;

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
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
