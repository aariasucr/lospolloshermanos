import {Component, OnInit} from "@angular/core";
import * as firebase from "firebase";
import {UserService} from "../shared/user.service";
import {Message, PreviewMessage} from "../shared/model";
import {ChatService} from "../shared/chat.service";
import {AngularFireDatabase} from "@angular/fire/database";
import {DatePipe} from "@angular/common";
import {NgForm} from "@angular/forms";

@Component({
  selector: "app-messages",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit {
  public userchatRooms: Array<string>;
  public messages: Map<string, Array<Message>>;
  public messagesArray: Array<Message>;
  public selesctedChatRoom: string;
  public userData;
  public selectedRoomChat: string;
  public previews: Array<PreviewMessage>;
  public selectedChat: string;

  constructor(
    private userService: UserService,
    private chatService: ChatService,
    private db: AngularFireDatabase,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.selectedChat = "";
    this.previews = [];
    this.messagesArray = [];
    this.messages = new Map();
    this.userData = this.userService.getUserData();
    this.getUserChatRooms().subscribe((rooms: Array<string>) => {
      //console.log("rooms", rooms);
      this.userchatRooms = rooms;
      rooms.forEach((room) => {
        this.getUserChats(room).subscribe((messageList) => {
          //console.log(messageList);
          let lista = [];
          messageList.forEach((element) => {
            let oneMessage: Message;
            oneMessage = {
              datetime: element["datetime"],
              message: element["mensaje"],
              sender: element["sender"],
              timestamp: element["timestamp"]
            };
            lista.push(oneMessage);
          });
          this.messages.set(room, lista);
          this.getPreviews();
        });
      });
    });
  }

  getUserChatRooms() {
    return this.db
      .list("/conversationsPerUser/" + this.userData.uid, (ref) => {
        return ref;
      })
      .valueChanges();
  }

  getUserChats(idChat: string) {
    return this.db
      .list("/chatRooms/" + idChat + "/messages", (ref) => {
        return ref;
      })
      .valueChanges();
  }

  getPreviews() {
    let myid = this.userData.uid;
    let pr: Array<PreviewMessage> = [];
    this.userchatRooms.forEach((room) => {
      firebase
        .database()
        .ref("chatRooms/" + room)
        .orderByChild("timestamp")
        .once(
          "value",
          function (snapshot) {
            let _photo = "";
            let _name = "";
            let _lastmessage = "";
            let _date = "";
            let user = snapshot.val().users["user1"];
            if (snapshot.val().users["user1"] == myid) {
              user = snapshot.val().users["user2"];
            }
            firebase
              .database()
              .ref("/users/" + user)
              .once(
                "value",
                function (users) {
                  _photo = users.val()["profilePhoto"];
                  _name = users.val()["fullName"];
                  let lista = snapshot.val().messages;
                  console.log("lista de mensajes", lista);
                  _lastmessage = lista[lista.length - 1].message;
                  _date = lista[lista.length - 1].datetime;
                  let preview: PreviewMessage = {
                    idChat: room,
                    date: _date,
                    lastMessage: _lastmessage,
                    name: _name,
                    photo: _photo
                  };
                  pr.push(preview);
                },
                function (errorObject) {
                  console.error("The read failed: " + errorObject);
                }
              );
          },
          function (errorObject) {
            console.error("The read failed: " + errorObject);
          }
        );
    });
    this.previews = pr;
  }

  openChat(idchat: string) {
    this.selectedChat = idchat;
    this.messagesArray = [];
    this.chatService.getMessages(idchat).subscribe((messageList: Array<Message>) => {
      this.messagesArray = messageList;
      console.log("open", this.messagesArray);
    });
  }

  sendNewMessage(form: NgForm) {
    const mensaje = form.value.msg;
    form.resetForm();
    if (this.selectedChat !== "") {
      let now = new Date();
      let n = this.datePipe.transform(now, "dd-MM-yyyy HH:mm");
      const current = new Date();
      current.setHours(0);
      current.setMinutes(0);
      current.setSeconds(0);
      current.setMilliseconds(0);
      const stamp = current.getTime();
      let nMessage: Message = {
        datetime: n,
        message: mensaje,
        sender: this.userData.uid,
        timestamp: stamp
      };

      firebase
        .database()
        .ref("/chatRooms/" + this.selectedChat + "/timestamp")
        .set(stamp)
        .then(() => {
          this.messagesArray.push(nMessage);
          this.db
            .object("/chatRooms/" + this.selectedChat + "/messages")
            .update(this.messagesArray);
        });
    }
  }
}
