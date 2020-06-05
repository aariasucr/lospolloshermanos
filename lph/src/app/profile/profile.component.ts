import {Component, OnInit} from "@angular/core";
import {UserService} from "../shared/user.service";
import * as firebase from "firebase";
import {Router} from "@angular/router";
import {ModalService} from "../shared/modal.service";
import {Friend} from "../shared/model";
//import {AngularFireAuth} from "@angular/fire/auth";
//import {error} from "util";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  public userData;
  public profilePicturePath;
  public fullName;
  public followers;
  public following;
  public postsNumber = 0;
  public posts: Array<string> = [];
  modalTitle = "";
  public followersList: Array<Friend> = [];
  public followingList: Array<Friend> = [];

  constructor(
    private userService: UserService,
    private modalService: ModalService,
    private router: Router //private firebaseAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.userData = this.getUser();

    this.getProfilePhoto()
      .then((photo) => {
        this.profilePicturePath = photo.val();
      })
      .catch((error) => {
        console.error("error", error);
      });

    this.getFullName()
      .then((name) => {
        this.fullName = name.val();
      })
      .catch((error) => {
        console.error("error", error);
      });

    this.userService.getUserFollowers().then((followers) => {
      this.followers = followers.val().length;
    });

    this.userService.getUserFollowing().then((following) => {
      this.following = following.val().length;
    });

    this.userService.getUserPosts().then((userPosts) => {
      try {
        userPosts.forEach((element) => {
          let p = element.val();
          this.posts.push(p["img"]);
          this.postsNumber++;
        });
      } catch (e) {
        console.error(e);
      }
    });
  }

  getUser() {
    return firebase.auth().currentUser;
  }

  getProfilePhoto() {
    return firebase
      .database()
      .ref("/users/" + this.userData.uid + "/profilePhoto")
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

  getFullName() {
    return firebase
      .database()
      .ref("/users/" + this.userData.uid + "/fullName")
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

  editProfile() {
    this.router.navigate(["/editmyprofile"]);
  }

  openFollowers(mymodal) {
    this.modalTitle = "Seguidores";
    let list = [];
    this.userService.getUserFollowers().then((seguidores) => {
      seguidores.val().forEach((element) => {
        firebase
          .database()
          .ref("/users/" + element)
          .once(
            "value",
            function (snapshot) {
              console.log(snapshot.val());
              let friend: Friend = {
                id: element,
                name: snapshot.val()["fullName"],
                photoUrl: snapshot.val()["profilePhoto"]
              };
              list.push(friend);
              console.log("friend", friend);
            },
            function (errorObject) {
              console.error("The read failed: " + errorObject);
            }
          );
      });
    });
    this.followersList = list;
    this.modalService.open(mymodal);
  }

  openFollowing(mymodal) {
    this.modalTitle = "Siguiendo";
    let list = [];
    this.userService.getUserFollowing().then((siguiendo) => {
      siguiendo.val().forEach((element) => {
        firebase
          .database()
          .ref("/users/" + element)
          .once(
            "value",
            function (snapshot) {
              console.log(snapshot.val());
              let friend: Friend = {
                id: element,
                name: snapshot.val()["fullName"],
                photoUrl: snapshot.val()["profilePhoto"]
              };
              list.push(friend);
              console.log("friend", friend);
            },
            function (errorObject) {
              console.error("The read failed: " + errorObject);
            }
          );
      });
    });
    this.followingList = list;
    this.modalService.open(mymodal);
  }
}
