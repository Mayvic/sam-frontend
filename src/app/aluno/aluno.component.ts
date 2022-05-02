import { AppService } from './../app.service';
import { debounceTime, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent implements OnInit {
  public isEdit = false;
  public aluno = null;

  public alunoForm: FormGroup;

  constructor(
    private _service: AppService,
    private _formBuilder: FormBuilder,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this._initForm(null).subscribe(resultado => {
      this.alunoForm = resultado;
    });

    this._getAluno();
    
  }


  private _getAluno() {

    this._service.getAluno()
      .subscribe(
        response => {
          this.aluno = response.user;
          this.isEdit = (this.aluno !== null);
          this._initForm(this.aluno).subscribe(resultado => {
            this.alunoForm = resultado;
          });
        }, err => {
          alert(`error ${err?.error?.error}`);
          console.log("error", err);
        });

  }
  public criarAluno() {
    if (!this.alunoForm.valid) this.alunoForm.markAllAsTouched();
    else {
      this._service.criarAluno(this.alunoForm.getRawValue())
        .subscribe(
          response => {
            if (response) alert('Aluno criado com sucesso');
            this._router.navigate(['login']);

          }, err => {
            alert(`error ${err?.error?.error}`);
            console.log("error", err);
          });

    }
  }

  public editarAluno() {
    if (!this.alunoForm.valid) this.alunoForm.markAllAsTouched();
    else {
      this._service.editarAluno(this.alunoForm.getRawValue())
        .subscribe(
          response => {
            if (response) alert('Aluno editado com sucesso');
            this._router.navigate(['avaliacao']);

          }, err => {
            alert(`error ${err?.error?.error}`);
            console.log("error", err);
          });

    }
  }

  private _verificaSenha() {
    if (!(this.alunoForm.get("password").value === this.alunoForm.get("confirmPassword").value)) {
      this.alunoForm.controls["password"].setErrors({ 'incorrect': true });
      this.alunoForm.controls["confirmPassword"].setErrors({ 'incorrect': true });

    }
    else {
      this.alunoForm.controls["password"].setErrors(null);
      this.alunoForm.controls["confirmPassword"].setErrors(null);
    }
  }

  private _initForm(avaliacao: any): Observable<FormGroup> {
    let form = this._formBuilder.group({

      name: [avaliacao && avaliacao.name ? avaliacao.name : null, { validators: [Validators.required] }],
      email: [avaliacao && avaliacao.email ? avaliacao.email : null, { validators: [Validators.required, Validators.email] }],
      document: [avaliacao && avaliacao.document ? avaliacao.document : null, { validators: [Validators.required] }],
      password: [ null, { validators: [Validators.required] }],
      confirmPassword: [ null, { validators: [Validators.required] }],

    });

    return new Observable<FormGroup>(observer => observer.next(form));
  }

  ngAfterViewInit() {
    this.alunoForm.get("password").valueChanges
      .pipe(debounceTime(1000))
      .subscribe(value => {
        this._verificaSenha();
      });
    this.alunoForm.get("confirmPassword").valueChanges
      .pipe(debounceTime(1000))
      .subscribe(value => {
        this._verificaSenha();
      });
  }

}


