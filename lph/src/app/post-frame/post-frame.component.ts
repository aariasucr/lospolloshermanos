import {Component, OnInit, Input} from "@angular/core";
import {Post, CommentPost} from "../shared/model";
import {PostService} from "../shared/post.service";
import {NotificationService} from "../shared/notification.service";
import {UserService} from "../shared/user.service";
import {AngularFireDatabase} from "@angular/fire/database";
import {AngularFireAuth} from "@angular/fire/auth";
import {PostCommentService} from "../shared/post-comment.service";
import {NgForm} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: "app-post-frame",
  templateUrl: "./post-frame.component.html",
  styleUrls: ["./post-frame.component.css"]
})
export class PostFrameComponent implements OnInit {
  private post: Post;
  @Input() postId = "";

  postRef: any;
  author = "";
  uploadedFileUrl = "";
  numComm = 0;
  numLikes = 0;
  public postLikedBy: string[];
  public route = "";
  public userDataId;
  public profilePicturePath = "";
  public fullName;
  private isLiked;
  private commentPost: CommentPost[] = [];
  public likePost: boolean;

  constructor(
    private postService: PostService,
    private notificationService: NotificationService,
    private userService: UserService,
    private router: Router,
    private postCommentService: PostCommentService,
    private firebaseDatabase: AngularFireDatabase,
    private firebaseAuth: AngularFireAuth
  ) {
    this.route = router.url;
  }

  ngOnInit() {
    this.likePost = false;
    this.postLikedBy = [];
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

          this.postService
            .getSpecifictPost(this.userDataId, this.postId)
            .then((postData) => {
              this.post = postData.val();
              console.log(this.post);
              try {
                this.postLikedBy = this.post["likedBy"];
              } catch (e) {
                console.error(e);
              }

              // Mapeo de datos que se muestran en el post
              this.isLiked = this.post["isLiked"];
              this.uploadedFileUrl = this.post["img"];
            })
            .catch((err) => {
              console.error("error", err);
            });
        }
      })
      .catch((error) => {
        console.error("error", error);
      });

    // Recupera la información de un post específico

    this.postCommentService
      .getAllPostComments(this.postId)
      .snapshotChanges()
      .subscribe((data) => {
        // Cuando se detecte algún cambio en la base, va a ir a traer ese cambio de forma reactiva.
        this.commentPost = data.map((e) => {
          // A cada elemento que viene, de los 100 que se traen, se le saca el val
          return {
            ...(e.payload.val() as CommentPost)
          };
        });
        this.numComm = this.commentPost.length;
      });
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
      .ref("posts/" + id + "/" + this.postId + "/likedBy")
      .set(this.postLikedBy);
  }

  onSubmit(form: NgForm) {
    console.log("Submit the msj!");

    const comment = form.value.comment;
    this.firebaseAuth.currentUser
      .then((authData) => {
        this.userService.getFullName(authData.uid).then((userData) => {
          // Pormesa que devuelve los datos del usuario
          console.log(userData.val());
          this.postCommentService
            .addNewPostCommentAsync(this.postId, userData.val(), comment)
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
  }
}
