import { Injectable, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class PostCommentService{

  constructor(
    private firebaseDatabase: AngularFireDatabase,
    private firebaseAuth: AngularFireAuth) { }

  addNewPostCommentAsync(idPost: string, author: string, postComment: string ){
    return this.firebaseAuth.currentUser.then(userData => {
      const firebaseUserId = userData.uid;
      const newPostCommentKey = this.firebaseDatabase.database
        .ref()
        .child(`comment/${idPost}`)
        .push().key;

      const newPostCommentEntry = {
        auth: author,
        comment: postComment,
        created: new Date().getTime(),
        creationDate: new Date().toString(),
      };

      const updates = {};
      updates[`posts/${idPost}/${newPostCommentKey}`] = newPostCommentEntry;

      return this.firebaseDatabase.database.ref().update(updates);
    });
  }
}
