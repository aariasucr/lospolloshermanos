import {Component, OnInit} from "@angular/core";
import * as firebase from "firebase";
import {from} from "rxjs";
import {UserService} from "./shared/user.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "lph";

  constructor(private userService: UserService) {}

  ngOnInit() {
    const firebaseConfig = {
      apiKey: "AIzaSyCp0uZpvmob9CKnj3ss4s5O9PHfaYqr_vg",
      authDomain: "lhp-ci2400.firebaseapp.com",
      databaseURL: "https://lhp-ci2400.firebaseio.com",
      projectId: "lhp-ci2400",
      storageBucket: "lhp-ci2400.appspot.com",
      messagingSenderId: "109795544705",
      appId: "1:109795544705:web:06f0b2f9c9c8a533380780",
      measurementId: "G-70M8BRKPMF"
    };

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
