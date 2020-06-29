import {Injectable} from "@angular/core";
//import * as firebase from "firebase";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFireDatabase} from "@angular/fire/database";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SearchService {
  private prom: Subject<string> = new Subject<string>();

  constructor(
    private firebaseAuth: AngularFireAuth,
    private firebaseDatabase: AngularFireDatabase
  ) {}

  setValueToSearch(val: string) {
    this.prom.next(val);
  }

  getValueToSearch(): Observable<string> {
    return this.prom.asObservable();
  }

  fetchResults(val: string) {
    return this.firebaseDatabase.database
      .ref("users/")
      .orderByChild("nameToLower")
      .startAt(val)
      .endAt(val + "\uf8ff")
      .once("value", function (snapshot) {
        if (snapshot.val != null) {
          return snapshot.val();
        } else {
          return null;
        }
      });
  }
}
