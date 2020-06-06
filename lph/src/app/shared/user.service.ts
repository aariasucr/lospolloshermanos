import {Injectable, EventEmitter} from "@angular/core";
import * as firebase from "firebase/app";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private isLogged = false;
  public statusChange: any = new EventEmitter<any>();
  private user;

  constructor() {}

  performLogin() {
    this.isLogged = true;
    const userData = {
      fullName: firebase.auth().currentUser.displayName
    };
    this.user = firebase.auth().currentUser;
    this.statusChange.emit(userData);
  }

  getUserData() {
    return this.user;
  }

  performLogout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.isLogged = false;
        this.statusChange.emit(null);
      });
  }

  getUserPosts(userId: string = this.user.uid) {
    return firebase
      .database()
      .ref("/posts/" + userId)
      .orderByChild("created")
      .once(
        "value",
        function (snapshot) {
          return snapshot.val();
        },
        function (errorObject) {
          console.error("The read failed: " + errorObject);
        }
      );
  }

  getUserFollowers(userId: string = this.user.uid) {
    return firebase
      .database()
      .ref("/followers/" + userId)
      .once(
        "value",
        function (snapshot) {
          return snapshot.val();
        },
        function (errorObject) {
          console.error("The read failed: " + errorObject);
        }
      );
  }

  getUserFollowing(userId: string = this.user.uid) {
    return firebase
      .database()
      .ref("/following/" + userId)
      .once(
        "value",
        function (snapshot) {
          return snapshot.val();
        },
        function (errorObject) {
          console.error("The read failed: " + errorObject);
        }
      );
  }

  getUserDataFromFirebase(uid: string) {
    return firebase
      .database() // Aquí va a buscar la base de datos; si hubieran más, se debe especificar el nombre de la base
      .ref("users") // Se quiere ir a una referencia específica.
      .child(uid) // El hijo de la refrencia anterior
      .once("value"); // Se quiere sólo un dato

    // Todo lo anterior devuelve una promesa.
  }
}
