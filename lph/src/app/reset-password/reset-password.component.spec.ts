import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordComponent } from './reset-password.component';

import {FormsModule} from '@angular/forms';
import {NotificationService} from '../shared/notification.service';
// import {Router} from '@angular/router';
import {AppRoutingModule} from '../app-routing.module';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { AppComponent } from '../app.component';
import { HomeComponent } from '../home/home.component';
import { ProfileComponent } from '../profile/profile.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { HeaderComponent } from '../header/header.component';
import { PostFrameComponent } from '../post-frame/post-frame.component';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { ToastrModule } from 'ngx-toastr';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        ToastrModule.forRoot()],
      declarations: [ ResetPasswordComponent,
        AppComponent,
        HomeComponent,
        ProfileComponent,
        EditProfileComponent,
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
        PostFrameComponent,
        FileUploaderComponent],
      providers: [NotificationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
