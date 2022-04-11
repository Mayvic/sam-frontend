import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from "../app.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInForm: FormGroup;

  constructor(
    private _service: AppService,
    private _formBuilder: FormBuilder,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  signIn(): void {
    this._service.login(this.signInForm.getRawValue()).subscribe(
      response => {

        localStorage.setItem('token', response.user.token.token);

        this._router.navigate(['avaliacao']);
    },
    err => {
      if (err.status == 400){
        console.log("Dados de login Inválidos");
        alert("Dados de login de Inválidos");
      }
      console.log("error", err);
    }
    
    )
  }

}
