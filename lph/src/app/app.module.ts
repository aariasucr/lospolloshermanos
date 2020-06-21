import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {UserService} from './shared/user.service';
import {RouteGuard} from './shared/route-guard';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {NotificationService} from './shared/notification.service';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ProfileComponent} from './profile/profile.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {FileUploaderComponent} from './file-uploader/file-uploader.component';
import {PostFrameComponent} from './post-frame/post-frame.component';
// import {AngularFirestore} from "@angular/fire/firestore";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalService} from './shared/modal.service';
import {ChatComponent} from './chat/chat.component';
import {ChatService} from './shared/chat.service';
import {DatePipe} from '@angular/common';
/** Añadido del servicio de firebase, se debe, antes, haber instalado: npm i @angular/fire --save */
import {AngularFireModule} from '@angular/fire'; // Recibe la configuración de firebase, es el módulo central.
import {AngularFireDatabaseModule} from '@angular/fire/database'; // Para la base de datos realtime
import {AngularFireAuthModule} from '@angular/fire/auth'; // Para las funcionalidades de autenticación.
import {AngularFireStorageModule} from '@angular/fire/storage'; // Para las funcionalidades del storage
/** Para no subir credenciales a git: */
import {environment} from 'src/environments/environment';
import {CommentService} from './shared/comment.service';
import { PostCommentService } from './shared/post-comment.service';
import { PostService } from './shared/post.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ProfileComponent,
    EditProfileComponent,
    FileUploaderComponent,
    PostFrameComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [
    UserService,
    RouteGuard,
    NotificationService,
    ModalService,
    ChatService,
    DatePipe,
    CommentService,
    PostCommentService,
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
