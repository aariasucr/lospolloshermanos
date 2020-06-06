import {Component, OnInit} from "@angular/core";
import {UserService} from "../shared/user.service";
import * as firebase from "firebase";
import {Router} from "@angular/router";
import {ModalService} from "../shared/modal.service";
import {Friend} from "../shared/model";
import {ThrowStmt} from "@angular/compiler";
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
  public route = "";
  public href = "";

  constructor(
    private userService: UserService,
    private modalService: ModalService,
    private router: Router //private firebaseAuth: AngularFireAuth
  ) {
    this.route = router.url;
  }

  ngOnInit() {
    this.href = "#";
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

    this.userService.getUserFollowing().then((following) => {
      this.following = following.val().length;
    });

    this.userService.getUserFollowers().then((followers) => {
      this.followers = followers.val().length;
    });

    this.getPosts();
  }

  getUser() {
    return firebase.auth().currentUser;
  }

  getPosts() {
    if (this.route == "/myprofile") {
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
    } else if (this.route.includes("user")) {
      let userId = this.route.replace("/user", "");
      this.userService.getUserPosts(userId).then((userPosts) => {
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
  }

  getProfilePhoto() {
    if (this.route == "/myprofile") {
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
    } else if (this.route.includes("user")) {
      let userId = this.route.replace("/user", "");
      return firebase
        .database()
        .ref("/users/" + userId + "/profilePhoto")
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
  }

  getFullName() {
    if (this.route == "/myprofile") {
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
    } else if (this.route.includes("user")) {
      let userId = this.route.replace("/user", "");
      return firebase
        .database()
        .ref("/users/" + userId + "/fullName")
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
  }

  editProfile() {
    this.router.navigate(["/editmyprofile"]);
  }

  openFollowers(mymodal) {
    this.modalTitle = "Seguidores";
    let list = [];
    if (this.route == "/myprofile") {
      this.userService.getUserFollowers().then((seguidores) => {
        seguidores.val().forEach((element) => {
          firebase
            .database()
            .ref("/users/" + element)
            .once(
              "value",
              function (snapshot) {
                let friend: Friend = {
                  id: element,
                  name: snapshot.val()["fullName"],
                  photoUrl: snapshot.val()["profilePhoto"]
                };
                list.push(friend);
              },
              function (errorObject) {
                console.error("The read failed: " + errorObject);
              }
            );
        });
      });
    } else if (this.route.includes("user")) {
      let userId = this.route.replace("/user", "");
      this.userService.getUserFollowers(userId).then((seguidores) => {
        seguidores.val().forEach((element) => {
          firebase
            .database()
            .ref("/users/" + element)
            .once(
              "value",
              function (snapshot) {
                let friend: Friend = {
                  id: element,
                  name: snapshot.val()["fullName"],
                  photoUrl: snapshot.val()["profilePhoto"]
                };
                list.push(friend);
              },
              function (errorObject) {
                console.error("The read failed: " + errorObject);
              }
            );
        });
      });
    }
    this.followersList = list;
    this.modalService.open(mymodal);
  }

  openFollowing(mymodal) {
    this.modalTitle = "Siguiendo";
    let list = [];
    if (this.route == "/myprofile") {
      this.userService.getUserFollowing().then((siguiendo) => {
        siguiendo.val().forEach((element) => {
          firebase
            .database()
            .ref("/users/" + element)
            .once(
              "value",
              function (snapshot) {
                let friend: Friend = {
                  id: element,
                  name: snapshot.val()["fullName"],
                  photoUrl: snapshot.val()["profilePhoto"]
                };
                list.push(friend);
              },
              function (errorObject) {
                console.error("The read failed: " + errorObject);
              }
            );
        });
      });
    } else if (this.route.includes("user")) {
      let userId = this.route.replace("/user", "");
      this.userService.getUserFollowing(userId).then((siguiendo) => {
        siguiendo.val().forEach((element) => {
          firebase
            .database()
            .ref("/users/" + element)
            .once(
              "value",
              function (snapshot) {
                let friend: Friend = {
                  id: element,
                  name: snapshot.val()["fullName"],
                  photoUrl: snapshot.val()["profilePhoto"]
                };
                console.log(snapshot.val());
                list.push(friend);
              },
              function (errorObject) {
                console.error("The read failed: " + errorObject);
              }
            );
        });
      });
    }
    this.followingList = list;
    this.modalService.open(mymodal);
  }

  goToFriendsProfile(friendURl: string) {
    if (friendURl == this.userData.uid) {
      friendURl = "/myprofile";
    } else {
      friendURl = "user/" + friendURl;
    }
    this.href = friendURl;
    this.router.navigate([friendURl]);
    this.modalService.close();
  }
}
