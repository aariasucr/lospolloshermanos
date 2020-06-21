import {Component, OnInit} from '@angular/core';
import { NotificationService } from '../shared/notification.service';
import { UserService } from '../shared/user.service';
import { PostService } from '../shared/post.service';
import { Post } from '../shared/model';
import { NgForm } from '@angular/forms';
/** [FB] Actualización */
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: string[] = [];
  postRef: any;
  user = '';
  uploadedFileUrl = '';
  constructor(private postService: PostService,
              private notificationService: NotificationService,
              private userService: UserService,
              private firebaseDatabase: AngularFireDatabase,
              private firebaseAuth: AngularFireAuth) {}

  /*ngOnInit() {
    this.firebaseAuth.currentUser.then((userData) => {
      // console.log('userData en el componente', userData);
      if (!!userData && 'uid' in userData && !!userData.uid) {
        this.user = userData.uid; // Aquí se saca el user id que viene en una promesa desde firebase

        this.firebaseDatabase
          // .list(`posts/${this.user}`, (ref) => ref.limitToLast(100).orderByChild('created')) // crearle esta característica a los post
          .list(`posts/${this.user}`, (ref) => ref.limitToLast(10))
          .snapshotChanges()
          .subscribe((data) => {  // Cuando se detecte algún cambio en la base, va a ir a traer ese cambio de forma reactiva.
            console.log(data[0]["key"]);
            this.posts = data.map((e) => { // A cada elemento que viene, de los 100 que se traen, se le saca el val
              console.log(e.payload.val());
              return {
                ...(e.payload.val() as Post)
              };
            });
          });
      }
    });
  }*/

  ngOnInit() {
    this.firebaseAuth.currentUser.then((userData) => {
      // console.log('userData en el componente', userData);
      if (!!userData && 'uid' in userData && !!userData.uid) {
        this.user = userData.uid; // Aquí se saca el user id que viene en una promesa desde firebase

        this.firebaseDatabase
          // .list(`posts/${this.user}`, (ref) => ref.limitToLast(100).orderByChild('created')) // crearle esta característica a los post
          .list(`posts/${this.user}`, (ref) => ref.limitToLast(10))
          .snapshotChanges()
          .subscribe((data) => {  // Cuando se detecte algún cambio en la base, va a ir a traer ese cambio de forma reactiva.
            console.log(data[0]);
            this.posts = data.map((e) => { // A cada elemento que viene, de los 100 que se traen, se le saca el val
              console.log('***********', e.key);
              return e.key;
            });
          });
      }
    });
  }

  onSubmit(form: NgForm) {
    const content = form.value.content;
    this.firebaseAuth.currentUser.then((authData) => {
      this.userService.getUserDataFromFirebase(authData.uid).then((userData) => {
        // Pormesa que devuelve los datos del usuario
        this.postService
          .addNewPostAsync(userData.val().fullName, this.uploadedFileUrl, content)
          .then((results) => {
            this.notificationService.showSuccessMessage('Todo bien!', 'Publicación Creada');
          })
          .catch((error) => {
            this.notificationService.showErrorMessage('Error!!!', 'Error creando publicación');
          });
      });
    }).catch(err => {
      this.notificationService.showErrorMessage('Error!!!', err);
    });
  }

  onImagePicked(imageUrl: string) {
    console.log('url en firebase listo para guardar en la base de datos', imageUrl);
    this.uploadedFileUrl = imageUrl;
  }
}
