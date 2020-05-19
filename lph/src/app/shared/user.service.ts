import {Injectable, EventEmitter} from "@angular/core";

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
      username: "q@q.com",
      password: "123"
    };

    this.statusChange.emit(userData);
  }

  performLogout() {
    this.isLogged = false;
    this.statusChange.emit(null);
  }

  isUserLogged() {
    return this.isLogged;
  }
}
