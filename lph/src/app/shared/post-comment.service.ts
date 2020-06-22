import { Injectable, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {CommentPost} from '../shared/model';

@Injectable({
  providedIn: 'root'
})
export class PostCommentService{
  commentPost: CommentPost[] = [];
  constructor(
    private firebaseDatabase: AngularFireDatabase,
    private firebaseAuth: AngularFireAuth) { }

  addNewPostCommentAsync(idPost: string, auth: string, postComment: string ){
    return this.firebaseAuth.currentUser.then(userData => {
      const firebaseUserId = userData.uid;
      const newPostCommentKey = this.firebaseDatabase.database
        .ref()
        .child(`comment/${idPost}`)
        .push().key;

      const newPostCommentEntry = {
        author: auth,
        comment: postComment,
        created: new Date().getTime(),
        creationDate: new Date().toString(),
      };

      const updates = {};
      updates[`comment/${idPost}/${newPostCommentKey}`] = newPostCommentEntry;

      return this.firebaseDatabase.database.ref().update(updates);
    });
  }

  /*getAllPostComments(idCommentPost: string){
    return this.firebaseDatabase
      .list(`comment/${idCommentPost}`, (ref) => ref.limitToLast(10).orderByChild('created'))
      .snapshotChanges()
      .subscribe((data) => {  // Cuando se detecte algún cambio en la base, va a ir a traer ese cambio de forma reactiva.
        return this.commentPost = data.map((e) => { // A cada elemento que viene, de los 100 que se traen, se le saca el val
          console.log(e.payload.val());
          return {
            ...(e.payload.val() as CommentPost)
          };
        });
      });
  }*/

  getAllPostComments(idCommentPost: string){
    return this.firebaseDatabase
      .list(`comment/${idCommentPost}`, (ref) => ref.limitToLast(10).orderByChild('created'));
  }
}
