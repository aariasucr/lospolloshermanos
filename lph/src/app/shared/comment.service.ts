import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(
    private firebaseDatabase: AngularFireDatabase,
    private firebaseAuth: AngularFireAuth
  ) {}

  newMessage(userId: string) {
    let db = this.firebaseDatabase.database;
    let numMessages = 0;

    db.ref('notifications/' + userId + '/messages').once('value', function (snapshot) {
      if (snapshot.val() != null) {
        numMessages = snapshot.val();
        //console.log("envi", snapshot.val());
        numMessages = numMessages + 1;
      } else {
        numMessages = 1;
      }
      db.ref('notifications/' + userId + '/messages').set(numMessages);
    });
  }

  getNewMessage(userId: string) {
    return this.firebaseDatabase.database.ref('/notifications/' + userId + '/messages').on(
      'value',
      (snapshot) => {
        return snapshot.val();
      },
      (errorObject) => {
        console.error('The read failed: ' + errorObject);
      }
    );
  }

  newFollower(userId: string) {
    let db = this.firebaseDatabase.database;
    let numfollowers = 0;

    this.firebaseDatabase.database.ref('/notifications/' + userId + '/newFollowers').once(
      'value',
      (snapshot) => {
        if (snapshot.val() != null) {
          numfollowers = snapshot.val();
          numfollowers = numfollowers + 1;
        } else {
          numfollowers = 1;
        }
        db.ref('notifications/' + userId + '/newFollowers').set(numfollowers);
      },
      (errorObject) => {
        console.error('The read failed: ' + errorObject);
      }
    );
  }

  getNewFollower(userId: string) {
    return this.firebaseDatabase.database.ref('/notifications/' + userId + '/newFollowers').on(
      'value',
      (snapshot) => {
        return snapshot.val();
      },
      (errorObject) => {
        console.error('The read failed: ' + errorObject);
      }
    );
  }

  newComment(userId: string) {
    let db = this.firebaseDatabase.database;
    let numComments = 0;
    this.firebaseDatabase.database.ref('/notifications/' + userId + '/newComments').once(
      'value',
      (snapshot) => {
        if (snapshot.val() != null) {
          numComments = snapshot.val();
          numComments += 1;
        } else {
          numComments = 1;
        }
        db.ref('notifications/' + userId + '/newComments').set(numComments);
      },
      (errorObject) => {
        console.error('The read failed: ' + errorObject);
      }
    );
  }

  getNewComment(userId: string) {
    return this.firebaseDatabase.database.ref('/notifications/' + userId + '/newComments').on(
      'value',
      (snapshot) => {
        return snapshot.val();
      },
      (errorObject) => {
        console.error('The read failed: ' + errorObject);
      }
    );
  }

  newLike(userId: string) {
    let db = this.firebaseDatabase.database;
    let numLikes = 0;
    this.firebaseDatabase.database.ref('/notifications/' + userId + '/newLikes').once(
      'value',
      (snapshot) => {
        if (snapshot.val() != null) {
          numLikes = snapshot.val();
          numLikes += 1;
        } else {
          numLikes = 1;
        }
        db.ref('notifications/' + userId + '/newLikes').set(numLikes);
      },
      (errorObject) => {
        console.error('The read failed: ' + errorObject);
      }
    );
  }
  getNewLike(userId: string) {
    return this.firebaseDatabase.database.ref('/notifications/' + userId + '/newLikes').on(
      'value',
      (snapshot) => {
        return snapshot.val();
      },
      (errorObject) => {
        console.error('The read failed: ' + errorObject);
      }
    );
  }
}
