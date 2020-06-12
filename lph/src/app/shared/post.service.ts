import {Injectable} from '@angular/core';
/** [FB] Actualización de Firebase */
// import * as firebase from "firebase";
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private firebaseDatabase: AngularFireDatabase,
              private firebaseAuth: AngularFireAuth) {}

  /** [FB] Actaulización */
  /* addNewPostAsync(numberComm: number, date: string, numberLikes: number, imgUrl: string) {
    const firebaseUserId = firebase.auth().currentUser.uid;
    const newPostKey = firebase.database().ref().child(`posts/${firebaseUserId}`).push().key;

    const newPostEntry = {
      numberComm: numberComm,
      date: date,
      numberLikes: numberLikes,
      img: imgUrl
    };

    const updates = {};
    updates[`posts/${firebaseUserId}/${newPostKey}`] = newPostEntry;
    return firebase.database().ref().update(updates);
  }*/

  addNewPostAsync(content: string, author: string, imgUrl: string) {
    return this.firebaseAuth.currentUser.then(userData => {
      const firebaseUserId = userData.uid;
      const newPostKey = this.firebaseDatabase.database
        .ref()
        .child(`posts/${firebaseUserId}`)
        .push().key;

      if (imgUrl === '') {
        imgUrl = 'https://placeimg.com/320/240/any/sepia';
      }

      const newPostEntry = {
        author: author,
        content: content,
        created: new Date().getTime(),
        creationDate: new Date().toString(),
        img: imgUrl
      };

      const updates = {};
      updates[`posts/${firebaseUserId}/${newPostKey}`] = newPostEntry;

      return this.firebaseDatabase.database.ref().update(updates);
    });
  }
}
