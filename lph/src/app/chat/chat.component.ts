import {Component, OnInit} from "@angular/core";
import * as firebase from "firebase";
import {UserService} from "../shared/user.service";
import {Message, PreviewMessage} from "../shared/model";
import {ChatService} from "../shared/chat.service";
import {AngularFireDatabase} from "@angular/fire/database";

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
    private db: AngularFireDatabase
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
              senderId: element["sender"],
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
        return ref.orderByChild("timestamp");
      })
      .valueChanges();
    /*return firebase
      .database()
      .ref("/conversationsPerUser/" + this.userData.uid)
      .once(
        "value",
        function (snapshot) {
          return snapshot.val();
        },
        function (errorObject) {
          console.error("The read failed: " + errorObject);
        }
      );*/
  }

  getUserChats(idChat: string) {
    return this.db
      .list("/chatRooms/" + idChat + "/messages", (ref) => {
        return ref.orderByChild("timestamp");
      })
      .valueChanges();
    /*return this.chatService.getMessages(idChat).subscribe((messagesList) => {
      let localList: Array<Message> = new Array<Message>();
      messagesList.forEach((element) => {
        let oneMessage: Message;
        oneMessage = {
          datetime: element["datetime"],
          message: element["mensaje"],
          senderId: element["sender"],
          timestamp: element["timestamp"]
        };
        localList.push(oneMessage);
      });
      this.messagesArray = localList;
      console.log("metodo", localList);
      return localList;
    });*/
  }

  getPreviews() {
    let myid = this.userData.uid;
    let pr: Array<PreviewMessage> = [];
    this.userchatRooms.forEach((room) => {
      firebase
        .database()
        .ref("chatRooms/" + room)
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
            let prev = firebase
              .database()
              .ref("/users/" + user)
              .orderByChild("timestamp")
              .once(
                "value",
                function (users) {
                  _photo = users.val()["profilePhoto"];
                  _name = users.val()["fullName"];
                  let lista = snapshot.val().messages;
                  _lastmessage = lista[lista.length - 1].mensaje;
                  _date = lista[lista.length - 1].datetime;
                  let preview: PreviewMessage = {
                    idChat: room,
                    date: _date,
                    lastMessage: _lastmessage,
                    name: _name,
                    photo: _photo
                  };
                  //return preview;
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
    console.log("lb", this.previews);
  }

  openChat(idchat: string) {
    this.selectedChat = idchat;
    this.messagesArray = [];
    this.chatService.getMessages(idchat).subscribe((messageList: Array<Message>) => {
      this.messagesArray = messageList;
      console.log("open", this.messagesArray);
    });
  }

  newMessage(message) {
    console.log(message);
  }
}
