import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

import {FormsModule} from '@angular/forms';
import {NotificationService} from '../shared/notification.service';
import { PostService } from '../shared/post.service';
import {UserService} from '../shared/user.service';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { RegisterComponent } from '../register/register.component';
import { AppComponent } from '../app.component';
import { ProfileComponent } from '../profile/profile.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { LoginComponent } from '../login/login.component';
import { HeaderComponent } from '../header/header.component';
import { PostFrameComponent } from '../post-frame/post-frame.component';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { RouterOutlet } from '@angular/router';

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule],
      declarations: [ HomeComponent,
        RegisterComponent,
        AppComponent,
        ProfileComponent,
        EditProfileComponent,
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
        PostFrameComponent,
        FileUploaderComponent,
        ResetPasswordComponent,
        RouterOutlet],
      providers: [NotificationService,
      PostService,
      UserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
