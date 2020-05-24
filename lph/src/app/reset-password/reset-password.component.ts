import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import * as firebase from "firebase";
import {NotificationService} from "../shared/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"]
})
export class ResetPasswordComponent implements OnInit {
  constructor(private notificationService: NotificationService, private router: Router) {}

  ngOnInit() {}
  resetPassword(form: NgForm) {
    const email = form.value.email;

    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        this.notificationService.showSuccessMessage(
          "Revisa tu correo",
          "Se ha enviado un correo para restablecer la contraseña",
          4000
        );
        this.router.navigate(["/login"]);
      })
      .catch((error) => {
        this.notificationService.showErrorMessage("Error", error.message, 4000);
      });
  }
}
