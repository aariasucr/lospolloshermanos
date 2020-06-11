import {Component, OnInit} from "@angular/core";
import * as firebase from "firebase";
import {UserService} from "../shared/user.service";
import {Message} from "../shared/model";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.css"]
})
export class MessagesComponent implements OnInit {
  public userchatRooms: Array<string>;
  public messages: Array<Message>;
  public userData;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userData = this.userService.getUserData();
    this.getUserChatRooms()
      .then((rooms) => {
        this.userchatRooms = rooms.val();
        console.log(this.userchatRooms);
      })
      .catch((error) => {
        console.error(error);
      });
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
    //obtener chats y acomodarlos en html
  }
}
