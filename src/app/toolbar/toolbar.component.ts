import { AppService } from './../app.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  //0=aluno 1=professor 2=coordenador
  public type = 0;

  constructor(
    private _router: Router,
    private _service: AppService,
    ) { }

  ngOnInit(): void {
    this._getUsuario();
  }

  private _getUsuario() {

    this._service.getUsuario()
      .subscribe(
        response => {
          this.type = response.type;
          console.log("type", this.type)
        }, err => {
          alert(`error ${err?.error?.error}`);
          console.log("error", err);
        });

  }

  public goToAvaliacao(){
    console.log("avaliacao");
    this._router.navigate(['avaliacao']);
  }

  public goToRelatorio(){
    console.log("relatorio");

    this._router.navigate(['relatorio']);
  }

  public goToMateria(){
    console.log("materia");

    this._router.navigate(['materia'], {queryParams: {type: "create"} });
  }

  public goToEditarMateria(){
    console.log("materia");

    this._router.navigate(['materia'], {queryParams: {type: "edit"} });
  }

  public goToVisualizarMateria(){
    console.log("materia");

    this._router.navigate(['materia'], {queryParams: {type: "view"} });
  }

  public goToAluno(){
    console.log("aluno");

    this._router.navigate(['aluno']);
  }

  public goToLogout(){
    console.log("Sair");

    this._service.logout()
    .subscribe(
      response => {
      if(response)alert('Deslogado com sucesso');
      this._router.navigate(['login']);

    },err => {
      alert("error");
      console.log("error", err);
    });
  }

}
