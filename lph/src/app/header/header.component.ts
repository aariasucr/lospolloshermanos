import {Component, OnInit} from "@angular/core";
import {UserService} from "../shared/user.service";
import {Router} from "@angular/router";
import {CommentService} from "../shared/comment.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFireDatabase} from "@angular/fire/database";
import {ModalService} from "../shared/modal.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  isLogged = false;
  userName: string;
  fullName: string;
  userDataId: string;
  newMessages: number;
  newLikes: number;
  newFollower: number;
  newComments: number;
  numOfNotifications: number;

  constructor(
    private userService: UserService,
    private router: Router,
    private commentService: CommentService,
    private firebaseAuth: AngularFireAuth,
    private modalService: ModalService,
    private firebaseDatabase: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.numOfNotifications = 0;
    this.newLikes = 0;
    this.newFollower = 0;
    this.newComments = 0;
    this.newMessages = 0;
    this.userService.statusChange.subscribe((userData) => {
      if (userData) {
        this.isLogged = true;
        this.userName = userData.username;
        this.fullName = userData.fullName;
        this.firebaseAuth.currentUser.then((u) => {
          this.userDataId = u.uid;
          //console.log("user id", this.userDataId);
          this.messagesNumber();
          let likes = this.likesNumber();
          let comments = this.commentsNumber();
          let followers = this.followersNumber();

          console.log(this.newComments, this.newFollower, this.newLikes);
        });
      } else {
        this.isLogged = false;
      }
    });
  }

  messagesNumber() {
    this.firebaseDatabase.database.ref("/notifications/" + this.userDataId + "/messages").on(
      "value",
      (snapshot) => {
        this.newMessages = snapshot.val();
        //console.log(this.newMessages);
        return this.newMessages;
      },
      (errorObject) => {
        console.error("The read failed: " + errorObject);
      }
    );
  }

  likesNumber() {
    return this.firebaseDatabase.database.ref("/notifications/" + this.userDataId + "/newLikes").on(
      "value",
      (snapshot) => {
        this.newLikes = snapshot.val();
        this.numOfNotifications += this.newLikes;
        return this.newLikes;
      },
      (errorObject) => {
        console.error("The read failed: " + errorObject);
      }
    );
  }

  commentsNumber() {
    return this.firebaseDatabase.database
      .ref("/notifications/" + this.userDataId + "/newComments")
      .on(
        "value",
        (snapshot) => {
          this.newComments = snapshot.val();
          this.numOfNotifications += this.newComments;
          return this.newComments;
        },
        (errorObject) => {
          console.error("The read failed: " + errorObject);
        }
      );
  }

  followersNumber() {
    return this.firebaseDatabase.database
      .ref("/notifications/" + this.userDataId + "/newFollowers")
      .on(
        "value",
        (snapshot) => {
          this.newFollower = snapshot.val();
          this.numOfNotifications += this.newFollower;
          this.numOfNotifications = this.newFollower + this.newComments + this.newLikes;
          return this.newFollower;
        },
        (errorObject) => {
          console.error("The read failed: " + errorObject);
        }
      );
  }

  logout() {
    this.router.navigate(["/logout"]);
    this.userService.performLogout();
  }

  resetMessages() {
    this.newMessages = 0;
    this.firebaseDatabase.database
      .ref("/notifications/" + this.userDataId + "/messages")
      .set(this.newMessages);
  }

  resetNotifications(modal) {
    this.numOfNotifications = 0;
    this.newLikes = 0;
    this.newFollower = 0;
    this.newComments = 0;
    this.firebaseDatabase.database
      .ref("/notifications/" + this.userDataId + "/newLikes")
      .set(this.numOfNotifications);
    this.firebaseDatabase.database
      .ref("/notifications/" + this.userDataId + "/newComments")
      .set(this.numOfNotifications);

    this.firebaseDatabase.database
      .ref("/notifications/" + this.userDataId + "/newFollowers")
      .set(this.numOfNotifications);

    this.modalService.close();
  }

  openNotifications(modal) {
    this.modalService.open(modal);
  }

  //this.resetNotifications();
}
