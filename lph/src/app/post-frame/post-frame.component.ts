import {Component, OnInit} from '@angular/core';
import {Post} from '../shared/model';
import {PostService} from '../shared/post.service';
import {NotificationService} from '../shared/notification.service';
import * as firebase from 'firebase';
import {UserService} from '../shared/user.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-post-frame',
  templateUrl: './post-frame.component.html',
  styleUrls: ['./post-frame.component.css']
})
export class PostFrameComponent implements OnInit {
  private posts: Post[] = [];

  postRef: any;
  author = '';
  uploadedFileUrl = '';
  public userDataId;
  public profilePicturePath = '';
  public fullName;

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
        console.log('*****************************', photo.val());
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
    })
    .catch(error => {
      console.error('error', error);
    });
  }
}
