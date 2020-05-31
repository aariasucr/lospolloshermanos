import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {UserService} from "../shared/user.service";
import * as firebase from "firebase";
import {database} from "firebase";
import {NotificationService} from "../shared/notification.service";
@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.css"]
})
export class EditProfileComponent implements OnInit {
  public user;

  constructor(private userService: UserService, private notificationService: NotificationService) {}

  ngOnInit() {
    this.user = this.userService.getUserData();
  }

  onSubmitData(form: NgForm) {
    const nombre = form.value.name;

    if (nombre != "" && nombre != null) {
      firebase
        .database()
        .ref("/users/" + this.user.displayName)
        .update({fullName: nombre});
      this.notificationService.showSuccessMessage("Hecho", "Nombre actualizado");
    } else {
      this.notificationService.showErrorMessage("Error", "Debes escribir un nombre");
    }
  }

  onSubmitPassword(form: NgForm) {
    const currentPass = form.value.currentPassword;
    const newPass = form.value.newPassword;
    const newPass2 = form.value.newPassword2;

    firebase
      .auth()
      .signInWithEmailAndPassword(this.user.email, currentPass)
      .then((userData) => {
        if (newPass == newPass2) {
          this.user.updatePassword(newPass).then(
            () => {
              this.notificationService.showSuccessMessage("Hecho", "Se cambió la contraseña");
            },
            (error) => {
              this.notificationService.showSuccessMessage("Error", error.message);
            }
          );
        }
      })
      .catch((error) => {
        this.notificationService.showErrorMessage("Usuario o contraseña incorrecto", error.message);
      });
  }
}
