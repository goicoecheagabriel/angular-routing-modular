import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../interfaces/auth.interface';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  miFormulario: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get user() {
    return this.loginService.user
  }

  constructor(
    private fb: FormBuilder, 
    private loginService: LoginService, 
    private router: Router) {}

  campoNoEsValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }

  signin() {
    const user: User = {
      userName: this.miFormulario.controls.username.value.trim().toString(),
      password: this.miFormulario.controls.password.value.trim().toString()
    }
    this.loginService.signin( user ).subscribe(
      ( resp ) => {
        if( resp.ok ) {
          console.log('Recibimos un Token', resp.token);
          console.log("Recibimos un objeto", this.user)
          this.miFormulario.reset();
          this.router.navigate(['./dashboard/app'])
        }
      },
      ({ error }) => {
        console.log('Recibimos un error', error);
        this.miFormulario.reset();
        this.router.navigate(['./auth/login/hola'])
      }
    );
  }
}
