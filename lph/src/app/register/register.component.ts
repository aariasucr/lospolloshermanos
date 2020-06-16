import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {NotificationService} from '../shared/notification.service';
import {UserService} from '../shared/user.service';
import {NewAccount} from '../shared/model';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private userService: UserService,
    private firebaseDatabase: AngularFireDatabase,
    private firebaseAuth: AngularFireAuth
  ) {}

  ngOnInit() {}

  login() {
    this.router.navigate(['/login']);
  }

  register(form: NgForm) {
    const nombre = form.value.nombre;
    const apellido = form.value.apellido;
    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;
    const passConfirmation = form.value.password_confirmation;

    if (password === passConfirmation) {
     this.firebaseAuth
        .createUserWithEmailAndPassword(email, password)
        .then((userData) => {
          userData.user.updateProfile({
            displayName: username,
            photoURL:
              // tslint:disable-next-line: max-line-length
              'https://firebasestorage.googleapis.com/v0/b/lhp-ci2400.appspot.com/o/foto_inicial.jpg?alt=media&token=66d442c6-0bc9-4c84-b751-89507ae9db3a'
          });
          const newUserId = userData.user.uid;
          this.userService.performLogin(newUserId);
          let db: NewAccount;
          db = {
            fullName: nombre + ' ' + apellido,
            profilePhoto:
              // tslint:disable-next-line: max-line-length
              'https://firebasestorage.googleapis.com/v0/b/lhp-ci2400.appspot.com/o/foto_inicial.jpg?alt=media&token=66d442c6-0bc9-4c84-b751-89507ae9db3a'
          };

          this.firebaseDatabase.database
            .ref('/users/' + newUserId.toString())
            .set(db);

          this.router.navigate(["/home"]);
          this.notificationService.showSuccessMessage("Bienvenido", "Sesión iniciada");
        })
        .catch((error) => {
          console.log(error.message);
          this.notificationService.showErrorMessage('Error', error.message);
        });
    } else {
      this.notificationService.showErrorMessage('Error', 'Las contraseñas no coinciden.');
    }
  }
}
