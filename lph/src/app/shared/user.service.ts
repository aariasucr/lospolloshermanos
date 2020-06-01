import {Injectable, EventEmitter} from "@angular/core";
import * as firebase from "firebase/app";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private isLogged = false;
  public statusChange: any = new EventEmitter<any>();
  private userData: Object;

  constructor() {}

  performLogin() {
    this.isLogged = true;
    const userData = {
      fullName: firebase.auth().currentUser.displayName
    };
    this.statusChange.emit(userData);
  }

  getUserData() {
    this.userData = firebase.auth().currentUser;
    return this.userData;
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
