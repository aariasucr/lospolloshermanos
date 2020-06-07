import {Component, OnInit} from "@angular/core";
import {UserService} from "../shared/user.service";
import * as firebase from "firebase";
import {Router} from "@angular/router";
import {ModalService} from "../shared/modal.service";
import {Friend} from "../shared/model";
import {ThrowStmt} from "@angular/compiler";
import {NotificationService} from "../shared/notification.service";
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
  public followers = 0;
  public following = 0;
  public postsNumber = 0;
  public posts: Array<string> = [];
  modalTitle = "";
  public followersList: Array<Friend> = [];
  public followingList: Array<Friend> = [];
  public route = "";
  public isFollowing: Boolean;
  public followUnfollowBtn: string;

  constructor(
    private userService: UserService,
    private modalService: ModalService,
    private notificationService: NotificationService,
    private router: Router //private firebaseAuth: AngularFireAuth
  ) {
    this.route = router.url;
  }

  ngOnInit() {
    this.userData = this.getUser();
    this.isFollowing = this.isFollowingTo();
    this.followUnfollowBtn = "Seguir";

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

    this.getNumberFollowersAndFollowing();

    this.getPosts();
  }

  getUser() {
    return firebase.auth().currentUser;
  }

  getNumberFollowersAndFollowing() {
    if (this.route == "/myprofile") {
      this.userService.getUserFollowing().then((following) => {
        if (following.val() != null) {
          this.following = following.val().length;
        }
      });

      this.userService.getUserFollowers().then((followers) => {
        if (followers.val() != null) {
          this.followers = followers.val().length;
        }
      });
    } else {
      let userId = this.route.replace("/user", "");
      this.userService.getUserFollowing(userId).then((following) => {
        if (following.val() != null) {
          this.following = following.val().length;
        }
      });

      this.userService.getUserFollowers(userId).then((followers) => {
        if (followers.val() != null) {
          this.followers = followers.val().length;
        }
      });
    }
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
        if (seguidores.val() != null) {
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
        }
      });
    } else if (this.route.includes("user")) {
      let userId = this.route.replace("/user", "");
      this.userService.getUserFollowers(userId).then((seguidores) => {
        if (seguidores.val() != null) {
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
        }
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
        if (siguiendo.val() != null) {
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
        }
      });
    } else if (this.route.includes("user")) {
      let userId = this.route.replace("/user", "");
      this.userService.getUserFollowing(userId).then((siguiendo) => {
        if (siguiendo.val() != null) {
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
        }
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
    this.router.navigate([friendURl]);
    this.modalService.close();
  }

  isFollowingTo(): boolean {
    let f = false;
    if (this.route.includes("user/")) {
      let url = this.route.replace("/user/", "");
      this.userService.getUserFollowing().then((following) => {
        if (following.val() != null) {
          let i = 0;
          while (i < following.val().length && !f) {
            if (following.val()[i] == url) {
              f = true;
              this.followUnfollowBtn = "Dejar de seguir";
            }
            i++;
          }
        }
      });
    }
    return f;
  }

  startToFollowUnfollow() {
    let id = this.router.url.replace("/user/", "");
    let currentUser = this.userData.uid;
    if (this.followUnfollowBtn == "Seguir") {
      let followersArray: Array<string> = [];
      firebase
        .database()
        .ref("/followers/" + id)
        .once(
          "value",
          function (snapshot) {
            followersArray = snapshot.val();
            if (followersArray != null) {
              followersArray.push(currentUser);
            } else {
              followersArray = [currentUser];
            }
            firebase
              .database()
              .ref("/followers/" + id)
              .set(followersArray);
          },
          function (errorObject) {
            console.error("The read failed: " + errorObject);
          }
        );

      let followingArray: Array<string> = [];
      firebase
        .database()
        .ref("/following/" + currentUser)
        .once(
          "value",
          function (snapshot) {
            followingArray = snapshot.val();
            if (followingArray != null) {
              followingArray.push(id);
            } else {
              followingArray = [id];
            }
            firebase
              .database()
              .ref("/following/" + currentUser)
              .set(followingArray);
          },
          function (errorObject) {
            console.error("The read failed: " + errorObject);
          }
        );
      this.notificationService.showSuccessMessage("Éxito", "Ha empezado a seguir a");
      this.followUnfollowBtn = "Dejar de seguir";
    } else if (this.followUnfollowBtn == "Dejar de seguir") {
      let followersArray: Array<string> = [];
      firebase
        .database()
        .ref("/followers/" + id)
        .once(
          "value",
          function (snapshot) {
            followersArray = snapshot.val();
            if (followersArray != null) {
              followersArray.splice(followingArray.indexOf(currentUser));
            }
            firebase
              .database()
              .ref("/followers/" + id)
              .set(followersArray);
          },
          function (errorObject) {
            console.error("The read failed: " + errorObject);
          }
        );

      let followingArray: Array<string> = [];
      firebase
        .database()
        .ref("/following/" + currentUser)
        .once(
          "value",
          function (snapshot) {
            followingArray = snapshot.val();
            if (followingArray != null) {
              followingArray.splice(followingArray.indexOf(id));
            }
            firebase
              .database()
              .ref("/following/" + currentUser)
              .set(followingArray);
          },
          function (errorObject) {
            console.error("The read failed: " + errorObject);
          }
        );
      this.notificationService.showSuccessMessage("Éxito", "Ha dejado de seguir a");
      this.followUnfollowBtn = "Seguir";
    }
  }

  unfollowFromModal(id: string) {
    let currentUser = this.userData.uid;
    let followersArray: Array<string> = [];
    firebase
      .database()
      .ref("/followers/" + id)
      .once(
        "value",
        function (snapshot) {
          followersArray = snapshot.val();
          if (followersArray != null) {
            followersArray.splice(followingArray.indexOf(currentUser));
          }
          firebase
            .database()
            .ref("/followers/" + id)
            .set(followersArray);
        },
        function (errorObject) {
          console.error("The read failed: " + errorObject);
        }
      );

    let followingArray: Array<string> = [];
    firebase
      .database()
      .ref("/following/" + currentUser)
      .once(
        "value",
        function (snapshot) {
          followingArray = snapshot.val();
          if (followingArray != null) {
            followingArray.splice(followingArray.indexOf(id));
          }
          firebase
            .database()
            .ref("/following/" + currentUser)
            .set(followingArray);
        },
        function (errorObject) {
          console.error("The read failed: " + errorObject);
        }
      );
    this.notificationService.showSuccessMessage("Éxito", "Ha dejado de seguir a");
    this.followUnfollowBtn = "Seguir";
    this.modalService.close();
  }
}
