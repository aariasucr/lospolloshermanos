import {Injectable, OnInit} from "@angular/core";
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/database";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  constructor(private db: AngularFireDatabase) {}

  getMessagesList(chatId) {
    return this.db.object(chatId).valueChanges();
  }

  getMessages(chat = "") {
    return this.db
      .list("/chatRooms/chat1/messages", (ref) => {
        return ref.orderByChild("timestamp");
      })
      .valueChanges();
  }
}
