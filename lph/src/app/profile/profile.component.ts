import {Component, OnInit} from "@angular/core";
import {UserService} from "../shared/user.service";
import * as firebase from "firebase";

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
  public postsNumber;

  database = firebase.database();

  constructor(private userService: UserService) {
    this.fullName = "nombre";
    this.profilePicturePath = "";
    this.userData = this.userService.getUserData();

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

    this.getFollowersNumber()
      .then((number) => {
        this.followers = number.val();
      })
      .catch((error) => {
        console.error("error", error);
      });

    this.getFollowingNumber()
      .then((number) => {
        this.following = number.val();
      })
      .catch((error) => {
        console.error("error", error);
      });

    this.getPostsNumber().then((number) => {
      this.postsNumber = number.val().length;
    });
  }

  ngOnInit() {
    //this.getProfilePhoto()
  }

  getProfilePhoto() {
    return firebase
      .database()
      .ref("/users/" + this.userData["user"].displayName + "/profilePhoto")
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
      .ref("/users/" + this.userData["user"].displayName + "/fullName")
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

  getFollowersNumber() {
    return firebase
      .database()
      .ref("/users/" + this.userData["user"].displayName + "/followers")
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

  getFollowingNumber() {
    return firebase
      .database()
      .ref("/users/" + this.userData["user"].displayName + "/following")
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

  getPostsNumber() {
    return firebase
      .database()
      .ref("/users/" + this.userData["user"].displayName + "/posts/")
      .once(
        "value",
        function (snapshot) {
          return snapshot.val();
        },
        function (errorObject) {
          console.log("The read failed: " + errorObject);
        }
      );
  }
}
