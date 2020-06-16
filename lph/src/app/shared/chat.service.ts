import {Injectable, OnInit} from "@angular/core";
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/database";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  constructor(private db: AngularFireDatabase) {}

  getMessagesList(chatId) {
    return this.db.object(chatId).valueChanges();
  }

  getMessages(chat: string): Observable<any> {
    return this.db
      .list("/chatRooms/" + chat + "/messages", (ref) => {
        return ref; //.orderByChild("timestamp");
      })
      .valueChanges();
  }
}
