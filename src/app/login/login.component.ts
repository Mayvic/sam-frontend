import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      
      console.log("response", response);
      alert("logooou");
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
