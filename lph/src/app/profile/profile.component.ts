import {Component, OnInit} from "@angular/core";
import {UserService} from "../shared/user.service";
import {Router} from "@angular/router";
import {ModalService} from "../shared/modal.service";
import {Friend, Message, CommentPost} from "../shared/model";
import {NgForm} from "@angular/forms";
//import {DatePipe} from "@angular/common";
import {NotificationService} from "../shared/notification.service";
import {AngularFireDatabase} from "@angular/fire/database";
import {AngularFireAuth} from "@angular/fire/auth";
import {CommentService} from "../shared/comment.service";
import {DatePipe} from "@angular/common";
import {PostCommentService} from "../shared/post-comment.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  public userDataId;
  public profilePicturePath = "";
  public fullName;
  public followers;
  public following;
  public postsNumber;
  public posts: Array<string>;
  modalTitle = "";
  public followersList: Array<Friend>;
  public followingList: Array<Friend>;
  public route = "";
  public isFollowing: boolean;
  public followUnfollowBtn: string;
  public selectedPost: string;
  public selectedPhoto: string;
  public postDescription: string;
  public postNumLikes: number;
  public postLikedBy: string[];
  public postNumComments: number;
  public postComments: Array<CommentPost> = [];
  public allowComments: boolean;
  public likePost: boolean;
  public followersArray: Array<string>;

  constructor(
    private datePipe: DatePipe,
    private userService: UserService,
    private commentService: CommentService,
    private modalService: ModalService,
    private notificationService: NotificationService,
    private router: Router,
    private firebaseDatabase: AngularFireDatabase,
    private firebaseAuth: AngularFireAuth,
    private postCommentService: PostCommentService
  ) {}

  ngOnInit() {
    this.followersArray = [];
    this.route = this.router.url;
    this.postLikedBy = [];
    this.allowComments = true;
    this.postNumComments = 0;
    this.postNumLikes = 0;
    this.likePost = false;
    this.selectedPhoto = "";
    this.selectedPost = "";
    this.postsNumber = 0;
    this.posts = [];
    this.followersList = [];
    this.followingList = [];
    this.followers = 0;
    this.following = 0;
    this.isFollowing = this.isFollowingTo();
    this.followUnfollowBtn = "Seguir";
    this.userDataId = "";
    this.firebaseAuth.currentUser
      .then((userData) => {
        if (userData != null) {
          this.userDataId = userData.uid;
          this.userService
            .getProfilePhoto(this.userDataId, this.route)
            .then((photo) => {
              this.profilePicturePath = photo.val();
            })
            .catch((error) => {
              console.error("error", error);
            });

          this.userService
            .getFullName(this.userDataId, this.route)
            .then((name) => {
              this.fullName = name.val();
            })
            .catch((error) => {
              console.error("error", error);
            });
        }
      })
      .catch((error) => {
        console.error("error", error);
      });

    this.getNumberFollowersAndFollowing();

    this.getPosts();
  }

  getNumberFollowersAndFollowing() {
    if (this.route === "/myprofile") {
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
    console.log("ruta profile", this.route);
    if (this.route === "/myprofile") {
      this.userService.getUserPosts().then((userPosts) => {
        console.log("entra a aqui propio");
        if (userPosts != null) {
          try {
            userPosts.forEach((element) => {
              let p = element.val();
              this.posts.push(p["img"]);
              this.postsNumber++;
            });
          } catch (e) {
            console.error(e);
          }
        } else {
          console.error("Error");
        }
      });
    } else if (this.route.includes("user")) {
      console.log("entra a aqui amigo");
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

  editProfile() {
    this.router.navigate(["/editmyprofile"]);
  }

  openFollowers(mymodal) {
    this.modalTitle = "Seguidores";
    let list = [];
    let id = "";
    if (this.route === "/myprofile") {
      id = this.userDataId;
    } else if (this.route.includes("user")) {
      id = this.route.replace("/user", "");
    }
    this.userService.getUserFollowers(id).then((seguidores) => {
      if (seguidores.val() != null) {
        seguidores.val().forEach((element) => {
          this.firebaseDatabase.database.ref("/users/" + element).once(
            "value",
            (snapshot) => {
              const friend: Friend = {
                id: element,
                name: snapshot.val()["fullName"],
                photoUrl: snapshot.val()["profilePhoto"]
              };
              list.push(friend);
            },
            (errorObject) => {
              console.error("The read failed: " + errorObject);
            }
          );
        });
      }
    });

    this.followersList = list;
    this.modalService.open(mymodal);
  }

  openFollowing(mymodal) {
    this.modalTitle = "Siguiendo";
    let list = [];
    let id = "";
    if (this.route === "/myprofile") {
      id = this.userDataId;
    } else if (this.route.includes("user")) {
      id = this.route.replace("/user", "");
    }

    this.userService.getUserFollowing(id).then((siguiendo) => {
      if (siguiendo.val() != null) {
        siguiendo.val().forEach((element) => {
          this.firebaseDatabase.database.ref("/users/" + element).once(
            "value",
            (snapshot) => {
              const friend: Friend = {
                id: element,
                name: snapshot.val()["fullName"],
                photoUrl: snapshot.val()["profilePhoto"]
              };
              list.push(friend);
            },
            (errorObject) => {
              console.error("The read failed: " + errorObject);
            }
          );
        });
      }
    });

    this.followingList = list;
    this.modalService.open(mymodal);
  }

  goToFriendsProfile(friendURl: string) {
    if (friendURl === this.userDataId) {
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
            if (following.val()[i] === url) {
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
    if (this.followUnfollowBtn === "Seguir") {
      this.follow(id);
    } else if (this.followUnfollowBtn === "Dejar de seguir") {
      this.unfollowFromModal(id);
    }
  }

  follow(id: string) {
    const currentUser = this.userDataId;
    this.followersArray = [];
    this.firebaseDatabase.database
      .ref("/followers/" + id)
      .once(
        "value",
        (snapshot) => {
          this.followersArray = snapshot.val();
          if (this.followersArray != null) {
            console.log("llega a followersArray", currentUser);
            if (!!currentUser) {
              this.followersArray.push(currentUser);
            }
          } else {
            this.followersArray = [currentUser];
          }
          this.firebaseDatabase.database.ref("/followers/" + id).set(this.followersArray);
          this.commentService.newFollower(id);
        },
        (errorObject) => {
          console.error("The read failed: " + errorObject);
        }
      )
      .then(() => {
        this.ngOnInit();
      });

    let followingArray: Array<string> = [];
    this.firebaseDatabase.database
      .ref("/following/" + currentUser)
      .once(
        "value",
        (snapshot) => {
          followingArray = snapshot.val();
          if (followingArray != null) {
            followingArray.push(id);
          } else {
            followingArray = [id];
          }
          this.firebaseDatabase.database.ref("/following/" + currentUser).set(followingArray);
        },
        (errorObject) => {
          console.error("The read failed: " + errorObject);
        }
      )
      .then(() => {
        this.ngOnInit();
      });
    this.notificationService.showSuccessMessage("Éxito", "Ha empezado a seguir a");
    this.followUnfollowBtn = "Dejar de seguir";
  }

  unfollowFromModal(id: string) {
    const currentUser = this.userDataId;
    let followersArray: Array<string> = [];
    this.firebaseDatabase.database.ref("/followers/" + id).once(
      "value",
      (snapshot) => {
        followersArray = snapshot.val();
        if (followersArray != null) {
          followersArray.splice(followingArray.indexOf(currentUser));
        }
        this.firebaseDatabase.database.ref("/followers/" + id).set(followersArray);
      },
      (errorObject) => {
        console.error("The read failed: " + errorObject);
      }
    );

    let followingArray: Array<string> = [];
    this.firebaseDatabase.database
      .ref("/following/" + currentUser)
      .once(
        "value",
        (snapshot) => {
          followingArray = snapshot.val();
          if (followingArray != null) {
            followingArray.splice(followingArray.indexOf(id));
          }
          this.firebaseDatabase.database.ref("/following/" + currentUser).set(followingArray);
        },
        (errorObject) => {
          console.error("The read failed: " + errorObject);
        }
      )
      .then(() => {
        this.ngOnInit();
      });
    this.notificationService.showSuccessMessage("Éxito", "Ha dejado de seguir");
    this.followUnfollowBtn = "Seguir";
    this.modalService.close();
  }

  openModalMessage(modal) {
    this.modalService.open(modal);
  }

  sendMessage(form: NgForm) {
    const mensaje = form.value.msg;
    if (mensaje !== "") {
      form.resetForm();
      let now = new Date();
      let n = this.datePipe.transform(now, "dd-MM-yyyy HH:mm");
      const current = new Date();

      const stamp = current.getTime();
      let nMessage: Message = {
        datetime: n,
        message: mensaje,
        sender: this.userDataId,
        timestamp: stamp
      };
      let messagesList: Array<Message> = [];
      let conversations: Array<string> = [];
      let roomsArray: Array<string> = [];
      let id = this.userDataId;
      let friendId = this.router.url.replace("/user/", "");

      let roomName = this.userDataId + "_" + friendId;
      let otherRoomName = friendId + "_" + this.userDataId;

      let db = this.firebaseDatabase.database;

      //Verifica el nombre de la sala de chat si existe, si no crea una
      this.firebaseDatabase.database
        .ref("/conversationsPerUser/" + id)
        .once("value", function (snapshot) {
          if (snapshot.val() != null) {
            roomsArray = snapshot.val();
            roomsArray.forEach((element) => {
              if (element.toString() == otherRoomName) {
                roomName = otherRoomName;
              }
            });
          }

          db.ref("/chatRooms/" + roomName + "/timestamp").set(stamp);

          let users = {user1: id, user2: friendId};
          db.ref("/chatRooms/" + roomName + "/users").set(users);
          db.ref("/chatRooms/" + roomName + "/messages").once("value", function (snapshot) {
            if (snapshot.val() != null) {
              messagesList = snapshot.val();
            }
            messagesList.push(nMessage);
            console.log("message list", messagesList);
            db.ref("/chatRooms/" + roomName + "/messages").set(messagesList);
          });

          db.ref("/conversationsPerUser/" + id).once("value", function (snapshot) {
            if (snapshot.val() != null) {
              conversations = snapshot.val();
            }
            if (!conversations.includes(roomName)) {
              conversations.push(roomName);
              console.log("conv", conversations);
              db.ref("/conversationsPerUser/" + id).set(conversations);
            }

            conversations = [];
            db.ref("/conversationsPerUser/" + friendId).once("value", function (snapshot) {
              if (snapshot.val() != null) {
                conversations = snapshot.val();
              }
              if (!conversations.includes(roomName)) {
                conversations.push(roomName);
                console.log("conv amigo", conversations);
                db.ref("/conversationsPerUser/" + friendId).set(conversations);
              }
            });
          });
        });
      this.commentService.newMessage(friendId);
    }
    this.notificationService.showSuccessMessage(
      "Mensaje enviado",
      "Su mensaje ha sido enviado con éxito."
    );
    this.modalService.close();
  }

  openModalPost(modal, photoUrl) {
    let id = this.userDataId;
    if (this.route.includes("/user")) {
      id = this.route.replace("/user", "");
    }
    this.userService.getUserPosts(id).then((posts) => {
      let keys = Object.keys(posts.val());
      keys.forEach((key) => {
        if (posts.val()[key].img == photoUrl) {
          this.selectedPost = key;
        }
      });
      this.selectedPhoto = photoUrl;
      try {
        this.postLikedBy = posts.val()[this.selectedPost]["likedBy"];
      } catch (e) {
        console.error(e);
      }

      if (this.postLikedBy != null && this.postLikedBy.length > 0) {
        if (this.postLikedBy.includes(this.userDataId)) {
          this.likePost = true;
        }
      } else {
        this.postLikedBy = [];
      }
      this.postDescription = posts.val()[this.selectedPost]["postDescription"];
      this.allowComments = posts.val()[this.selectedPost]["allowComments"];
      this.postCommentService
        .getAllPostComments(this.selectedPost)
        .snapshotChanges()
        .subscribe((comments) => {
          this.postComments = comments.map((e) => {
            return {
              ...(e.payload.val() as CommentPost)
            };
          });
          this.postNumComments = this.postComments.length;
          this.modalService.open(modal);
        });
    });
  }

  onSubmitComment(form: NgForm) {
    const comment = form.value.comment;
    if (comment != "" && comment != null) {
      this.firebaseAuth.currentUser
        .then((authData) => {
          this.userService.getFullName(authData.uid).then((userData) => {
            console.log(userData.val());
            this.postCommentService
              .addNewPostCommentAsync(this.selectedPost, userData.val(), comment)
              .then((results) => {
                this.notificationService.showSuccessMessage("Todo bien!", "Comentario Realizado");
              })
              .catch((error) => {
                this.notificationService.showErrorMessage("Error!!!", "Error creando comentario");
              });
          });
        })
        .catch((err) => {
          this.notificationService.showErrorMessage("Error!!!", err);
        });
    } else {
      this.notificationService.showErrorMessage(
        "Debes escribir algo",
        "No se pueden hacer comentarios sin contenido"
      );
    }
  }

  changeAllowComments() {
    this.allowComments = !this.allowComments;
    //console.log("entra a this.allowComments", this.allowComments);
    this.firebaseDatabase.database
      .ref("/posts/" + this.userDataId + "/" + this.selectedPost + "/allowComments")
      .set(this.allowComments);
    if (this.allowComments) {
      this.notificationService.showSuccessMessage(
        "Éxito.",
        "Se activaron los comentarios para esta publicación."
      );
    } else {
      this.notificationService.showSuccessMessage(
        "Éxito.",
        "Se descactivaron los comentarios para esta publicación."
      );
    }
  }

  incNumLikes() {
    let id = this.userDataId;
    if (this.route.includes("/user")) {
      id = this.route.replace("/user", "");
    }
    if (this.likePost) {
      this.postLikedBy = this.postLikedBy.filter((item) => item !== this.userDataId);
      this.likePost = false;
    } else {
      this.postLikedBy.push(this.userDataId);
      this.likePost = true;
    }
    this.firebaseDatabase.database
      .ref("posts/" + id + "/" + this.selectedPost + "/likedBy")
      .set(this.postLikedBy);
  }
}
