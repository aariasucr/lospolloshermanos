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
    /* const firebaseConfig = {
      apiKey: 'AIzaSyCp0uZpvmob9CKnj3ss4s5O9PHfaYqr_vg',
      authDomain: 'lhp-ci2400.firebaseapp.com',
      databaseURL: 'https://lhp-ci2400.firebaseio.com',
      projectId: 'lhp-ci2400',
      storageBucket: 'lhp-ci2400.appspot.com',
      messagingSenderId: '109795544705',
      appId: '1:109795544705:web:06f0b2f9c9c8a533380780',
      measurementId: 'G-70M8BRKPMF'
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
    }); */

    this.firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userService.performLogin(user.uid); // Se le ingresa el primary Key que viene desde firebase
      } else {
        this.userService.performLogout();
      }
    });
  }
}
