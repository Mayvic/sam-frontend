import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
  });
  }

  signIn(): void {
    console.log("logou");
  }

}
