import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {UserService} from "../shared/user.service";
import {Router} from "@angular/router";
import {NotificationService} from "../shared/notification.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    if (email == "q@q.com" && password == "123") {
      this.userService.performLogin();
      this.router.navigate(["/home"]);
      this.notificationService.showSuccessMessage("Exito", "Sesión iniciada");
    } else {
      this.notificationService.showErrorMessage(
        "Usuario o contraseña incorrecto",
        "Error al iniciar sesión"
      );
    }
  }
}
