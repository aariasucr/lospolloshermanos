import {Component, OnInit} from '@angular/core';
import { NotificationService } from '../shared/notification.service';
import { UserService } from '../shared/user.service';
import { PostService } from '../shared/post.service';
import { Post, UserData } from '../shared/model';
import { NgForm } from '@angular/forms';
/** [FB] Actualización */
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import { TransitiveCompileNgModuleMetadata } from '@angular/compiler';

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

   following = 0;
  followers = 0;
  userName: string
  usersData: UserData[] = [];   // Para el nombre y la foto poder ponerla en los post
  usersPostData: Post[] = [];   // Para toda la info de un post mandarla al frame del post
  listFollowersId: any[] = []; // Para los id de las personas que sigen a el usuario
  listFollowingsId: any[] = []; // Para los id de las personas que sige el usuario
  listGeneralUserAndPostData: any[] = [];

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
            console.log(data[0]);
            this.usersPostData = data.map((e) => { // A cada elemento que viene, de los 100 que se traen, se le saca el val
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
      if (!!userData && 'uid' in userData && !!userData.uid) {
        this.user = userData.uid; // Aquí se saca el user id que viene en una promesa desde firebase

        // Llena la lista de personas a la que sigue.
        this.userService.getUserFollowing(this.user).then((following) => {
          if (following.val() != null) {
            following.val().forEach((followingId) => {
              this.firebaseDatabase
              // .list(`posts/${this.user}`, (ref) => ref.limitToLast(100).orderByChild('created')) // crearle esta característica a los post
              .list(`posts/${followingId}`, (ref) => ref.limitToLast(10))
              .snapshotChanges()
              .subscribe((data) => {
                data.forEach((e) => {
                  const authorAndPostid = {
                  authorId: followingId,
                    postId: e.key,
                    created: e.payload.val()["created"]
                  };
                  console.log(authorAndPostid);
                  this.listGeneralUserAndPostData.push(authorAndPostid);
                });
              });
            });
          }
        });

        // Llena la lista de personas me siguen.
        this.userService.getUserFollowers(this.user).then((followers) => {
          console.log("Entro");
          if (followers.val() != null) {
            console.log("Entro2", followers.val());
            followers.val().forEach((followerId) => {
              console.log("Entro3", followerId);
              this.firebaseDatabase
              // .list(`posts/${this.user}`, (ref) => ref.limitToLast(100).orderByChild('created')) // crearle esta característica a los post
              .list(`posts/${followerId}`, (ref) => ref.limitToLast(10))
              .snapshotChanges()
              .subscribe((data) => {
                data.forEach((e) => {
                  console.log("Entro4");
                  const authorAndPostid = {
                  authorId: followerId,
                    postId: e.key,
                    created: e.payload.val()["created"]
                  };
                  console.log(authorAndPostid);
                  this.listGeneralUserAndPostData.push(authorAndPostid);
                });
              });
            });
          } else {
            console.log("No tiene seguidores");
          }
        });

        // Recoge los post del Usuario:
        this.firebaseDatabase
          // .list(`posts/${this.user}`, (ref) => ref.limitToLast(100).orderByChild('created')) // crearle esta característica a los post
          .list(`posts/${this.user}`, (ref) => ref.limitToLast(10))
          .snapshotChanges()
          .subscribe((data) => {  // Cuando se detecte algún cambio en la base, va a ir a traer ese cambio de forma reactiva.
            data.forEach((e) => {
              console.log("Entro4");
              const authorAndPostid = {
              authorId: this.user,
                postId: e.key,
                created: e.payload.val()["created"]
              };

              this.listGeneralUserAndPostData.push(authorAndPostid);
              console.log(this.listGeneralUserAndPostData);
            });
          });
      }
    });
  }

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
            console.log(data[0]);
            this.posts = data.map((e) => { // A cada elemento que viene, de los 100 que se traen, se le saca el val
              return e.key;
            });
          });

          /** Para recuperar datos del usuario */
        this.userService.getUserDataFromFirebase(this.user).then((userData) => {
            this.userName = userData.val().fullName;
          }).catch(err => {
            this.notificationService.showErrorMessage('Error!!!', err);
          });

        this.userService.getUserFollowing().then((following) => {
            if (following.val() != null) {
              this.following = following.val().length;
            }
          }).catch(err => {
            this.notificationService.showErrorMessage('Error!!!', err);
          });

        this.userService.getUserFollowers().then((followers) => {
            if (followers.val() != null) {
              this.followers = followers.val().length;
            }
          }).catch(err => {
            this.notificationService.showErrorMessage('Error!!!', err);
          });
      }
    });
  }*/

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
