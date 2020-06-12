import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../shared/user.service';
import {Router} from '@angular/router';
import {NotificationService} from '../shared/notification.service';
// [FB] cambio por actualización
// import * as firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService,
    private firebaseAuth: AngularFireAuth
  ) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    /** const email = form.value.email;
    const password = form.value.password;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userData) => {
        this.userService.performLogin();
        this.router.navigate(['/home']);
        this.notificationService.showSuccessMessage('Bienvenido', 'Sesión iniciada');
      })
      .catch((error) => {
        this.notificationService.showErrorMessage('Usuario o contraseña incorrecto', error.message);
      }); */

      /** [FB] actualización */
      const email = form.value.email;
      const password = form.value.password;
      this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then((userData) => {
        this.userService.performLogin(userData.user.uid);
        this.router.navigate(['/home']);
        this.notificationService.showSuccessMessage('Bienvenido', 'Sesión iniciada');
      })
      .catch((error) => {
        this.notificationService.showErrorMessage('Usuario o contraseña incorrecto', error.message);
      });
  }
}
