import {Component, OnInit} from "@angular/core";
import {UserService} from "./shared/user.service";
/** Anadido de servicio de firebase */
import {AngularFireAuth} from "@angular/fire/auth";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "lph";

  constructor(private userService: UserService, private firebaseAuth: AngularFireAuth) {}

  ngOnInit() {
    this.firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userService.performLogin(user.uid); // Se le ingresa el primary Key que viene desde firebase
      } else {
        this.userService.performLogout();
      }
    });
  }
}
