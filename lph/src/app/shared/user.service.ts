import {Injectable, EventEmitter} from '@angular/core';
import { UserData } from './model';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLogged = false;
  public statusChange: any = new EventEmitter<any>();
  private user;
  private userId;

  constructor(private firebaseAuth: AngularFireAuth,
              private firebaseDatabase: AngularFireDatabase) {}

  performLogin(uid: string) {
    this.userId = uid;
    this.getUserDataFromFirebase(uid).then(result => {
      this.isLogged = true;
      this.user = result.val();
      this.statusChange.emit(this.user);
    });
  }

  getUserData() {
    return this.user;
  }

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

  getUserPosts(userId: string = this.userId) {
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

  getUserFollowers(userId: string = this.userId) {
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

  getUserFollowing(userId: string = this.userId) {
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

  getProfilePhoto(userId: string, route: string = '/myprofile') {
    if (route === '/myprofile') {
      return this.firebaseDatabase.database
        .ref('/users/' + userId + '/profilePhoto')
        .once(
          'value',
          snapshot => {
            return snapshot.val();
          },
          errorObject => {
            console.error('The read failed: ' + errorObject);
          }
        );
    } else if (route.includes('user')) {
      const userIdConst = route.replace('/user', '');
      return this.firebaseDatabase.database
        .ref('/users/' + userIdConst + '/profilePhoto')
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
  }

  getFullName(userId: string, route: string = '/myprofile') {
    let id = '';
    if (route === '/myprofile') {
      id = userId;
    } else if (route.includes('user')) {
      id = route.replace('/user', '');
    }

    return this.firebaseDatabase.database
      .ref('/users/' + id + '/fullName')
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
