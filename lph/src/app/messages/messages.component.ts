import {Component, OnInit} from "@angular/core";
import * as firebase from "firebase";
import {UserService} from "../shared/user.service";
import {Message} from "../shared/model";
import {ChatService} from "../shared/chat.service";
import {Observable} from "rxjs";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.css"]
})
export class MessagesComponent implements OnInit {
  public userchatRooms: Array<string>;
  public messages: Array<Message>;
  public array: Array<any>;
  public selesctedChatRoom: string;
  public userData: any;

  constructor(private userService: UserService, private chatService: ChatService) {}

  ngOnInit() {
    this.userData = this.userService.getUserData();
    this.getUserChatRooms()
      .then((rooms) => {
        this.userchatRooms = rooms.val();
        //console.log(this.userchatRooms);
      })
      .catch((error) => {
        console.error(error);
      });

    this.getUserChats();
  }

  getUserChatRooms() {
    return firebase
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
      );
  }

  getUserChats() {
    this.chatService.getMessages().subscribe((messagesList) => {
      console.log(messagesList);
    });
    /* let a = firebase
      .database()
      .ref("/chatRooms/chat1/messages")
      .once(
        "value",
        function (snapshot) {
          snapshot.val().forEach((mensaje) => {
            console.log(mensaje);
          });

          return snapshot.val();
        },
        function (errorObject) {
          console.error("The read failed: " + errorObject);
        }
      ); */
  }
}
