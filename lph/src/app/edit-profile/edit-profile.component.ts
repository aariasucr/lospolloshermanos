import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {UserService} from "../shared/user.service";
import * as firebase from "firebase";
import {NotificationService} from "../shared/notification.service";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.css"]
})
export class EditProfileComponent implements OnInit {
  public user;
  public urlImage;

  constructor(private userService: UserService, private notificationService: NotificationService) {
    this.urlImage = "";
  }

  ngOnInit() {
    this.user = this.userService.getUserData();
  }

  onSubmitData(form: NgForm) {
    const nombre: string = form.value.name;
    const newEmail: string = form.value.email;
    const newUsername: string = form.value.username;

    if (nombre.length != 0) {
      console.log("entra a nombre");
      firebase
        .database()
        .ref("/users/" + this.user.uid)
        .update({fullName: nombre});
      this.notificationService.showSuccessMessage("Hecho", "Nombre actualizado");
    }

    if (newEmail != "" && newEmail != null) {
      this.user
        .updateEmail(newEmail)
        .then(() => {
          this.notificationService.showSuccessMessage("Hecho", "Se cambió el correo electrónico");
        })
        .catch((error) => {
          this.notificationService.showSuccessMessage("Error", error.message);
        });
    }

    if (newUsername != "" && newUsername != null) {
      this.user.updateProfile({displayName: newUsername});
      this.notificationService.showSuccessMessage("Hecho", "Se cambió su nombre de usuario");
    }
  }

  getPhotoUrl(url: string) {
    this.urlImage = url;
  }

  onChangePhoto() {
    let newPhoto = "";
    let user = firebase.auth().currentUser;
    user.updateProfile({photoURL: newPhoto}).then(() => {
      firebase
        .database()
        .ref("/users/" + this.user.uid)
        .update({profilePhoto: this.urlImage});
      this.notificationService.showSuccessMessage("Hecho", "Se cambió la foto de perfil");
    });
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
          this.user
            .updatePassword(newPass)
            .then(() => {
              this.notificationService.showSuccessMessage("Hecho", "Se cambió la contraseña");
            })
            .catch((error) => {
              this.notificationService.showSuccessMessage("Error", error.message);
            });
        }
      })
      .catch((error2) => {
        this.notificationService.showErrorMessage(
          "Usuario o contraseña incorrecto",
          error2.message
        );
      });
  }
}
