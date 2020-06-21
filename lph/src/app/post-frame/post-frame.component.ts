import {Component, OnInit, Input} from '@angular/core';
import {Post} from '../shared/model';
import {PostService} from '../shared/post.service';
import {NotificationService} from '../shared/notification.service';
import {UserService} from '../shared/user.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';

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

  constructor(
    private postService: PostService,
    private notificationService: NotificationService,
    private userService: UserService,
    private firebaseDatabase: AngularFireDatabase,
    private firebaseAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.firebaseAuth.currentUser.then(userData => {
      this.userDataId = userData.uid;

      this.userService.getProfilePhoto(this.userDataId)
      .then((photo) => {
        this.profilePicturePath = photo.val();
      })
      .catch((error) => {
        console.error('error', error);
      });

      this.userService.getFullName(this.userDataId)
      .then((name) => {
        this.fullName = name.val();
      })
      .catch((error) => {
        console.error('error', error);
      });
      this.postService.getSpecifictPost(this.userDataId, this.postId)
      .then(postData => {
        this.post = postData.val();
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
  }

  incNumLikes(){
    console.log(this.numLikes);
    if(!this.isLiked){
      this.isLiked = true;
      this.numLikes = this.numLikes + 1;
    } else {
      this.isLiked = false;
      this.numLikes = this.numLikes - 1;
    }
  }
}
