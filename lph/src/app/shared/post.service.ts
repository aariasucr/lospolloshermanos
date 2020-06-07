import {Injectable} from "@angular/core";
import * as firebase from "firebase";

@Injectable({
  providedIn: "root"
})
export class PostService {
  constructor() {}

  addNewPostAsync(numberComm: number, date: string, numberLikes: number, imgUrl: string) {
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
  }
}
