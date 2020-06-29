import {Component, OnInit} from "@angular/core";
import {Message, PreviewMessage} from "../shared/model";
import {ChatService} from "../shared/chat.service";
import {AngularFireDatabase} from "@angular/fire/database";
import {DatePipe} from "@angular/common";
import {NgForm} from "@angular/forms";
import {CommentService} from "../shared/comment.service";
import {AngularFireAuth} from "@angular/fire/auth";
@Component({
  selector: "app-messages",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit {
  public userchatRooms: Array<string>;
  public messagesArray: Array<Message>;
  public userData;
  public previews: Array<PreviewMessage>;
  public selectedChat: string;

  constructor(
    private chatService: ChatService,
    private db: AngularFireDatabase,
    private commentService: CommentService,
    private datePipe: DatePipe,
    private firebaseAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.userData = "not set";
    this.selectedChat = "not set";
    this.messagesArray = [];
    this.previews = [];
    this.userchatRooms = [];
    this.firebaseAuth.currentUser.then((user) => {
      if (user != null) {
        this.userData = user.uid;
        this.previews = [];
        this.getUserChatRooms().subscribe((rooms: Array<string>) => {
          //console.log("click al inicio");
          this.userchatRooms = rooms;
          rooms.forEach((room) => {
            this.getUserChats(room).subscribe((messageList) => {
              //this.previews = [];
              this.getPreviews();
              //console.log("message list", messageList);
              //let lista = [];
              messageList.forEach((element) => {
                let oneMessage: Message;
                oneMessage = {
                  datetime: element["datetime"],
                  message: element["mensaje"],
                  sender: element["sender"],
                  timestamp: element["timestamp"]
                };
                //lista.push(oneMessage);
              });
            });
          });
        });
      }
    });
  }

  getUserChatRooms() {
    return this.db
      .list("/conversationsPerUser/" + this.userData, (ref) => {
        return ref;
      })
      .valueChanges();
  }

  getUserChats(idChat: string) {
    if (idChat != "" && !!idChat) {
      return this.db
        .list("/chatRooms/" + idChat + "/messages", (ref) => {
          return ref.orderByChild("timestamp");
        })
        .valueChanges();
    }
  }

  getPreviews() {
    let database = this.db.database;
    this.firebaseAuth.currentUser.then((user) => {
      if (user != null) {
        let myid = user.uid;
        let pr: Array<PreviewMessage> = [];
        this.userchatRooms.forEach((room) => {
          this.db.database
            .ref("chatRooms/" + room)
            .orderByChild("timestamp")
            .once(
              "value",
              function (snapshot) {
                if (snapshot.val() != null) {
                  let _photo = "";
                  let _name = "";
                  let _lastmessage = "";
                  let _date = "";
                  let user = snapshot.val()["users"]["user1"];
                  if (snapshot.val().users["user1"] == myid) {
                    user = snapshot.val().users["user2"];
                  }
                  database.ref("/users/" + user).once(
                    "value",
                    function (users) {
                      _photo = users.val()["profilePhoto"];
                      _name = users.val()["fullName"];
                      let lista = snapshot.val().messages;
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
                }
              },
              function (errorObject) {
                console.error("The read failed: " + errorObject);
              }
            );
        });

        this.previews = pr;
      }
    });

    //console.log("previ", this.previews);
  }

  openChat(idchat: string) {
    this.selectedChat = idchat;
    this.messagesArray = [];
    this.chatService.getMessages(idchat).subscribe((messageList: Array<Message>) => {
      this.messagesArray = messageList;
    });
  }

  sendNewMessage(form: NgForm) {
    const mensaje = form.value.msg;
    //form.resetForm();
    if (this.selectedChat !== "not set") {
      let now = new Date();
      let n = this.datePipe.transform(now, "dd-MM-yyyy HH:mm");
      const current = new Date();
      const stamp = current.getTime();
      let nMessage: Message = {
        datetime: n,
        message: mensaje,
        sender: this.userData,
        timestamp: stamp
      };
      this.db.database
        .ref("/chatRooms/" + this.selectedChat + "/timestamp")
        .set(stamp)
        .then(() => {
          this.messagesArray.push(nMessage);
          this.db.object("/chatRooms/" + this.selectedChat + "/messages").set(this.messagesArray);
        });
      let friendId = this.selectedChat.replace(this.userData, "");
      friendId = friendId.replace("_", "");
      this.commentService.newMessage(friendId);
    }
  }
}
