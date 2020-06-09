import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import * as firebase from "firebase";
import {NotificationService} from "../shared/notification.service";
import {UserService} from "../shared/user.service";
import {NewAccount} from "../shared/model";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private userService: UserService
  ) {}

  ngOnInit() {}

  login() {
    this.router.navigate(["/login"]);
  }

  register(form: NgForm) {
    const nombre = form.value.nombre;
    const apellido = form.value.apellido;
    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;
    const pass_confirmation = form.value.password_confirmation;

    if (password == pass_confirmation) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          user.user.updateProfile({
            displayName: username,
            photoURL:
              "https://firebasestorage.googleapis.com/v0/b/lhp-ci2400.appspot.com/o/foto_inicial.jpg?alt=media&token=66d442c6-0bc9-4c84-b751-89507ae9db3a"
          });
          this.userService.performLogin();
          let newUser = firebase.auth().currentUser;

          let db: NewAccount;
          db = {
            fullName: nombre + " " + apellido,
            profilePhoto:
              "https://firebasestorage.googleapis.com/v0/b/lhp-ci2400.appspot.com/o/foto_inicial.jpg?alt=media&token=66d442c6-0bc9-4c84-b751-89507ae9db3a"
          };

          firebase
            .database()
            .ref("/users/" + newUser.uid.toString())
            .set(db);

          /*firebase
            .database()
            .ref("/posts/" + newUser.uid.toString())
            .set([]);

          firebase
            .database()
            .ref("/followers/" + newUser.uid.toString())
            .set([]);

          firebase
            .database()
            .ref("/following/" + newUser.uid.toString())
            .set([]);*/

          this.router.navigate(["/home"]);
          this.notificationService.showSuccessMessage("Bienvenido", "Sesión iniciada");
        })
        .catch((error) => {
          console.log(error.message);
          this.notificationService.showErrorMessage("Error", error.message);
        });
    } else {
      this.notificationService.showErrorMessage("Error", "Las contraseñas no coinciden.");
    }
  }
}
