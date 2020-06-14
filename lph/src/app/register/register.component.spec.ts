import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';

import {FormsModule} from '@angular/forms';
import {NotificationService} from '../shared/notification.service';
import {AppRoutingModule} from '../app-routing.module';
import {UserService} from '../shared/user.service';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { AppComponent } from '../app.component';
import { HomeComponent } from '../home/home.component';
import { ProfileComponent } from '../profile/profile.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { LoginComponent } from '../login/login.component';
import { HeaderComponent } from '../header/header.component';
import { PostFrameComponent } from '../post-frame/post-frame.component';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { ToastrModule } from 'ngx-toastr';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        ToastrModule.forRoot()],
      declarations: [ RegisterComponent,
        AppComponent,
        HomeComponent,
        ProfileComponent,
        EditProfileComponent,
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
        PostFrameComponent,
        FileUploaderComponent,
        ResetPasswordComponent],
      providers : [NotificationService, UserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
