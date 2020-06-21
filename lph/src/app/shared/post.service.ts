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

  addNewPostAsync(author: string, imgUrl: string, postDescription: string) {
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
        auth: author,
        img: imgUrl,
        postDesc: postDescription,
        created: new Date().getTime(),
        creationDate: new Date().toString(),
        likeCounter: 0,
        commentCounter: 0
      };

      const updates = {};
      updates[`posts/${firebaseUserId}/${newPostKey}`] = newPostEntry;

      return this.firebaseDatabase.database.ref().update(updates);
    });
  }

  getSpecifictPost(userId: string, idPost: string) {
    return this.firebaseDatabase
    .database
    .ref('posts/' + userId + '/' + idPost).once('value',
    snapshot => {
      if (snapshot.val() != null) {
        return snapshot.val();
      } else {
        console.log('Error');
      }
    },
    errorObject => {
      console.error('The read failed: ' + errorObject);
    });
  }
}
