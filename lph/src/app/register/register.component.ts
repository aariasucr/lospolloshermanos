import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import * as firebase from "firebase";
import {NotificationService} from "../shared/notification.service";
import {UserService} from "../shared/user.service";

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
    console.log("click login");
    this.router.navigate(["/login"]);
  }

  register(form: NgForm) {
    const nombre = form.value.nombre;
    const apellido = form.value.apellido;
    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;
    const pass_confirmation = form.value.password_confirmation;

    console.log(nombre, apellido, username, email, password, pass_confirmation);

    if (password == pass_confirmation) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          user.user.updateProfile({
            displayName: nombre + " " + apellido
          });
          this.userService.performLogin();
          this.router.navigate(["/home"]);
          this.notificationService.showSuccessMessage("Bienvenido", "Sesión iniciada");
        })
        .catch((error) => {
          this.notificationService.showErrorMessage("Error", error.message);
        });
    } else {
      this.notificationService.showErrorMessage("Error", "Las contraseñas no coinciden.");
    }
  }
}
