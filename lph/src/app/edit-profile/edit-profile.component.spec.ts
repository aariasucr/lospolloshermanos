import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {EditProfileComponent} from "./edit-profile.component";
import {FileUploaderComponent} from "../file-uploader/file-uploader.component";
import {FormsModule} from "@angular/forms";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {environment} from "src/environments/environment";
import {AngularFireModule} from "@angular/fire";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {ToastrModule} from "ngx-toastr";
import {AngularFireStorageModule} from "@angular/fire/storage";

describe("EditProfileComponent", () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;

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
      declarations: [EditProfileComponent, FileUploaderComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
