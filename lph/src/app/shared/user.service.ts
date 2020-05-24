import {Injectable, EventEmitter} from "@angular/core";
import * as firebase from "firebase/app";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private isLogged = false;
  public statusChange: any = new EventEmitter<any>();

  constructor() {}

  performLogin() {
    this.isLogged = true;

    const userData = {
      fullName: firebase.auth().currentUser.displayName
    };

    this.statusChange.emit(userData);
  }

  isUserLogged() {
    return this.isLogged;
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
}
