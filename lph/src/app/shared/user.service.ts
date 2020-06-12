import {Injectable, EventEmitter} from '@angular/core';
/** [FB] Actualización firebase */
// import * as firebase from 'firebase/app';
import { UserData } from './model';  // [FB] para administración de datos de usuario
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLogged = false;
  public statusChange: any = new EventEmitter<any>();
  private user;

  constructor(private firebaseAuth: AngularFireAuth,
              private firebaseDatabase: AngularFireDatabase) {}
  // [FB]antes no recibía parámeto
  performLogin(uid: string) {
    /*this.isLogged = true;
    const userData = {
      fullName: firebase.auth().currentUser.displayName
    };
    this.user = firebase.auth().currentUser;
    this.statusChange.emit(userData);*/
    /** [FB] de aquí para abajo */
    this.getUserDataFromFirebase(uid).then(result => {
      this.isLogged = true;
      this.user = result.val();
      console.log('***************************', this.user);
      this.statusChange.emit(this.user);
    });
  }

  getUserData() {
    return this.user;
  }

  /** [FB]Agregado por Firebase */
  isUserLogged() {
    return this.isLogged;
  }


  performLogout() {
    this.firebaseAuth
      .signOut()
      .then(() => {
        this.isLogged = false;
        this.statusChange.emit(null);
      });
  }

  getUserPosts(userId: string = this.user.uid) {
    return this.firebaseDatabase.database
      .ref('/posts/' + userId)
      .orderByChild('created')
      .once(
        'value',
        snapshot => {
          return snapshot.val();
        },
        errorObject => {
          console.error('The read failed: ' + errorObject);
        }
      );
  }

  getUserFollowers(userId: string = this.user.uid) {
    return this.firebaseDatabase.database
      .ref('/followers/' + userId)
      .once(
        'value',
        snapshot => {
          return snapshot.val();
        },
        errorObject => {
          console.error('The read failed: ' + errorObject);
        }
      );
  }
  /* [FB] Ejemplo a tomar para regresar todo a la normalidad
  getUserFollowing(userId: string = this.user.uid) {
    return firebase
      .database()
      .ref('/following/' + userId)
      .once(
        'value',
        function(snapshot) {
          return snapshot.val();
        },
        function(errorObject) {
          console.error('The read failed: ' + errorObject);
        }
      );
  }*/
  getUserFollowing(userId: string = this.user.uid) {
    return this.firebaseDatabase.database
      .ref('/following/' + userId)
      .once(
        'value',
        snapshot => {
          return snapshot.val();
        },
        errorObject => {
          console.error('The read failed: ' + errorObject);
        }
      );
  }

  getUserDataFromFirebase(uid: string) {
    return this.firebaseDatabase.database
      .ref('users')
      .child(uid)
      .once('value');
  }
}
