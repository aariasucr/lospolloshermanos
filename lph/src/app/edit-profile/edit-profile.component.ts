import {Component, OnInit} from "@angular/core";
//import * as firebase from "firebase";
import {NgForm} from "@angular/forms";
import {UserService} from "../shared/user.service";
import {NotificationService} from "../shared/notification.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFireDatabase} from "@angular/fire/database";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.css"]
})
export class EditProfileComponent implements OnInit {
  public user;
  public urlImage;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private firebaseAuth: AngularFireAuth,
    private firebaseDatabase: AngularFireDatabase
  ) {
    this.urlImage = "";
  }

  ngOnInit() {
    this.firebaseAuth.currentUser.then((user) => {
      if (user != null) {
        this.user = user.uid;
      }
    });
    //this.user = firebase.auth().currentUser.uid;
  }

  onSubmitData(form: NgForm) {
    this.firebaseAuth.currentUser.then((userData) => {
      this.user = userData.uid;
      const nombre: string = form.value.name;
      const newEmail: string = form.value.email;
      const newUsername: string = form.value.username;

      if (nombre.length !== 0) {
        console.log("entra a nombre ", this.user);
        this.firebaseDatabase.database.ref("/users/" + this.user.uid).update({
          fullName: nombre,
          nameToLower: nombre.toLowerCase()
        });
        this.notificationService.showSuccessMessage("Hecho", "Nombre actualizado");
      }

      if (newEmail !== "" && newEmail != null) {
        this.user
          .updateEmail(newEmail)
          .then(() => {
            this.notificationService.showSuccessMessage("Hecho", "Se cambió el correo electrónico");
          })
          .catch((error) => {
            this.notificationService.showSuccessMessage("Error", error.message);
          });
      }

      if (newUsername !== "" && newUsername != null) {
        this.user.updateProfile({displayName: newUsername});
        this.notificationService.showSuccessMessage("Hecho", "Se cambió su nombre de usuario");
      }
    });
  }

  getPhotoUrl(url: string) {
    this.urlImage = url;
  }

  onChangePhoto() {
    this.firebaseAuth.currentUser.then((user) => {
      const newPhoto = "";
      user.updateProfile({photoURL: newPhoto}).then(() => {
        this.firebaseDatabase.database
          .ref("/users/" + this.user.uid)
          .update({profilePhoto: this.urlImage});
        this.notificationService.showSuccessMessage("Hecho", "Se cambió la foto de perfil");
      });
    });
  }

  onSubmitPassword(form: NgForm) {
    const currentPass = form.value.currentPassword;
    const newPass = form.value.newPassword;
    const newPass2 = form.value.newPassword2;

    this.firebaseAuth
      .signInWithEmailAndPassword(this.user.email, currentPass)
      .then((userData) => {
        if (newPass === newPass2) {
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
