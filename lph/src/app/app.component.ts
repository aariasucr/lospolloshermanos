import {Component, OnInit} from "@angular/core";
import * as firebase from "firebase";
import {UserService} from "./shared/user.service";
import {environment} from "src/environments/environment";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "lph";

  constructor(private userService: UserService) {}

  ngOnInit() {
    let firebaseConfig = environment.firebaseConfig;

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userService.performLogin();
      } else {
        this.userService.performLogout();
      }
    });
  }
}
