import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLogged = false;

  constructor() { }

  performLogin(){
    this.isLogged = true;
  }

  isUserLogged(){
    return this.isLogged;
  }
}
