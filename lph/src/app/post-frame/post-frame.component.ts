import {Component, OnInit, Input} from '@angular/core';
import { Post, CommentPost } from '../shared/model';
import {PostService} from '../shared/post.service';
import {NotificationService} from '../shared/notification.service';
import {UserService} from '../shared/user.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import { PostCommentService } from '../shared/post-comment.service';

@Component({
  selector: 'app-post-frame',
  templateUrl: './post-frame.component.html',
  styleUrls: ['./post-frame.component.css']
})
export class PostFrameComponent implements OnInit {
  private post: Post;
  @Input() postId = '';

  postRef: any;
  author = '';
  uploadedFileUrl = '';
  numComm = 0;
  numLikes = 0;
  public userDataId;
  public profilePicturePath = '';
  public fullName;
  private isLiked;
  private commentPost: CommentPost[] = []

  constructor(
    private postService: PostService,
    private notificationService: NotificationService,
    private userService: UserService,
    private postCommentService: PostCommentService,
    private firebaseDatabase: AngularFireDatabase,
    private firebaseAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.firebaseAuth.currentUser.then(userData => {
      this.userDataId = userData.uid;

      // Recupera la foto de perfil del usuario
      this.userService.getProfilePhoto(this.userDataId)
      .then((photo) => {
        this.profilePicturePath = photo.val();
      })
      .catch((error) => {
        console.error('error', error);
      });

      // Recupera el nombre del usuario
      this.userService.getFullName(this.userDataId)
      .then((name) => {
        this.fullName = name.val();
      })
      .catch((error) => {
        console.error('error', error);
      });

      // Recupera la información de un post específico
      this.postService.getSpecifictPost(this.userDataId, this.postId)
      .then(postData => {
        this.post = postData.val();

        // Mapeo de datos que se muestran en el post
        this.numComm = this.post["numberComm"];
        this.numLikes = this.post["numberLikes"];
        this.isLiked = this.post["isLiked"];
        this.uploadedFileUrl = this.post["img"];
      })
      .catch(err => {
        console.error('error', err);
      });
    })
    .catch(error => {
      console.error('error', error);
    });

    this.postCommentService.getAllPostComments(this.postId)
    .snapshotChanges()
    .subscribe((data) => {  // Cuando se detecte algún cambio en la base, va a ir a traer ese cambio de forma reactiva.
      this.commentPost = data.map((e) => { // A cada elemento que viene, de los 100 que se traen, se le saca el val
        console.log(e.payload.val());
        return {
          ...(e.payload.val() as CommentPost)
        };
      });
      console.log("......................", this.commentPost[0]["author"]);
    })
  }

  incNumLikes(){
    if (!this.isLiked) {
      this.isLiked = true;
      this.numLikes = this.numLikes + 1;
    } else {
      this.isLiked = false;
      this.numLikes = this.numLikes - 1;
    }
  }
}
