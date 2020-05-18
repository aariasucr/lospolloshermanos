import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private toast: ToastrService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;

    if(email == "q@q.com" && password == "123"){
      this.userService.performLogin();
      this.router.navigate(["/home"]);
      this.toast.success("Sesión iniciada", "Sesión iniciada", {
        closeButton: true,
        progressBar: true,
        progressAnimation: "increasing",
        timeOut: 2000
      })
    } else{
      this.toast.error("Usuario o contraseña incorrecto", "Error al iniciar sesión", {
        closeButton: true,
        progressBar: true,
        progressAnimation: "decreasing",
        timeOut: 3000
      });
    }
  }

}
