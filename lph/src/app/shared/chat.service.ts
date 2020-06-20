import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "@angular/fire/database";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  private newMessagesNumber: Subject<number> = new Subject<number>();

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
