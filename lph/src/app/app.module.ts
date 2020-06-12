import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";
import {FormsModule} from "@angular/forms";
import {UserService} from "./shared/user.service";
import {RouteGuard} from "./shared/route-guard";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {NotificationService} from "./shared/notification.service";
import {HeaderComponent} from "./header/header.component";
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {ProfileComponent} from "./profile/profile.component";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {FileUploaderComponent} from "./file-uploader/file-uploader.component";
import {PostFrameComponent} from "./post-frame/post-frame.component";
//import {AngularFirestore} from "@angular/fire/firestore";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ModalService} from "./shared/modal.service";
import {MessagesComponent} from "./messages/messages.component";
import {AngularFireModule} from "@angular/fire";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {ChatService} from "./shared/chat.service";
import {environment} from "src/environments/environment";

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
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [UserService, RouteGuard, NotificationService, ModalService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule {}
