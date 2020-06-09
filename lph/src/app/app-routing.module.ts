import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";
import {RouteGuard} from "./shared/route-guard";
import {RegisterComponent} from "./register/register.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {ProfileComponent} from "./profile/profile.component";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path: "", component: AppComponent, canActivate: [RouteGuard]},
  {path: "home", component: HomeComponent, canActivate: [RouteGuard]},
  {path: "myprofile", component: ProfileComponent, canActivate: [RouteGuard]},
  {path: "user/:userid", component: ProfileComponent, canActivate: [RouteGuard]},
  {path: "editmyprofile", component: EditProfileComponent, canActivate: [RouteGuard]},
  {path: "login", component: LoginComponent},
  {path: "logout", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "resetPassword", component: ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
