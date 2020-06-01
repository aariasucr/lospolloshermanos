import { Component, OnInit } from '@angular/core';
import {Post} from '../shared/model';
import {PostService} from '../shared/post.service';
import {NotificationService} from '../shared/notification.service';
import {NgForm} from '@angular/forms';
import * as firebase from 'firebase';
import { UserService } from '../shared/user.service';

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

  constructor(
    private postService: PostService,
    private notificationService: NotificationService,
    private userService: UserService) {}


  ngOnInit() {
    this.author = firebase.auth().currentUser.uid;
    console.log(`autor: ${this.author}`);

    /** Con firebase */
    this.postRef = firebase.database()
      .ref('posts')
      .child(this.author)
      .limitToLast(10);
      // .orderByChild('created');               esto también se ocupa en la nueva estructura

    this.postRef.on('child_added', data => {
      console.log(data);
      const newPost: Post = data.val();
      newPost.key = data.key;
      this.posts.push(newPost);
    });
  }

  onSubmit(form: NgForm) {
    const title = form.value.title;
    const content = form.value.content;

    this.userService.getUserDataFromFirebase(firebase.auth().currentUser.uid)
    .then(userData => {  // Pormesa que devuelve los datos del usuario
      this.postService.addNewPostAsync(title, content, userData.val().userName, this.uploadedFileUrl).then(results => {
        this.notificationService.showSuccessMessage('Todo bien!', 'Publicación Creada');
      }).catch(error => {
        this.notificationService.showErrorMessage('Error!!!', 'Error creando publicación');
      });
    });
  }

  onImagePicked(imageUrl: string) {
    console.log('url en firebase listo para guardar en la base de datos', imageUrl);
    this.uploadedFileUrl = imageUrl;
  }

}
