import {Injectable} from "@angular/core";
import * as firebase from "firebase";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SearchService {
  private prom: Subject<string> = new Subject<string>();
  constructor() {}

  setValueToSearch(val: string) {
    this.prom.next(val);
  }

  getValueToSearch(): Observable<string> {
    return this.prom.asObservable();
  }

  fetchResults(val: string) {
    return firebase
      .database()
      .ref("users/")
      .orderByChild("nameToLower")
      .startAt(val)
      .endAt(val + "\uf8ff")
      .once("value", function (snapshot) {
        return snapshot.val();
      });
  }
}
