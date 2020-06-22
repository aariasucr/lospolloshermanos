import {Component, OnInit, Input} from "@angular/core";
import {Post} from "../shared/model";
import {PostService} from "../shared/post.service";
import {NotificationService} from "../shared/notification.service";
//import * as firebase from 'firebase';
import {UserService} from "../shared/user.service";
import {AngularFireDatabase} from "@angular/fire/database";
import {AngularFireAuth} from "@angular/fire/auth";

@Component({
  selector: "app-post-frame",
  templateUrl: "./post-frame.component.html",
  styleUrls: ["./post-frame.component.css"]
})
export class PostFrameComponent implements OnInit {
  @Input() posts: Post[] = [];
  // @Input() postId = '';

  postRef: any;
  author = "";
  uploadedFileUrl = "";
  numComm = 0;
  numLikes = 0;
  public userDataId;
  public profilePicturePath = "";
  public fullName;

  constructor(
    private postService: PostService,
    private notificationService: NotificationService,
    private userService: UserService,
    private firebaseDatabase: AngularFireDatabase,
    private firebaseAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.firebaseAuth.currentUser
      .then((userData) => {
        if (userData != null) {
          this.userDataId = userData.uid;

          this.userService
            .getProfilePhoto(this.userDataId)
            .then((photo) => {
              this.profilePicturePath = photo.val();
            })
            .catch((error) => {
              console.error("error", error);
            });

          this.userService
            .getFullName(this.userDataId)
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

    this.uploadedFileUrl = this.posts["img"];
    this.numComm = this.posts["numberComm"];
    this.numLikes = this.posts["numberLikes"];
  }
}
