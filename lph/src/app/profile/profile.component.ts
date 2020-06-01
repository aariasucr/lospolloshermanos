import {Component, OnInit} from "@angular/core";
import {UserService} from "../shared/user.service";
import * as firebase from "firebase";
import {Router} from "@angular/router";
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
  public postsNumber;
  public posts: Array<string> = [];

  constructor(
    private userService: UserService,
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

    this.getPostsNumber()
      .then((number) => {
        this.postsNumber = 0;
        number.val().forEach((element) => {
          if (element["date"] != "") {
            this.posts.push(element["link"]);
            this.postsNumber++;
          }
        });
      })
      .catch((error) => {
        console.error("error", error);
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

  getFollowersNumber() {
    return firebase
      .database()
      .ref("/users/" + this.userData.uid + "/followers")
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
      .ref("/users/" + this.userData.uid + "/following")
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
      .ref("/users/" + this.userData.uid + "/posts/")
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
}
