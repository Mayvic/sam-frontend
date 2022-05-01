import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';
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
        }, err => {
          alert(`error ${err?.error?.error}`);
          console.log("error", err);
        });

  }

  public goToAvaliacao(){
    this._router.navigate(['avaliacao']);
  }

  public goToRelatorio(){
    this._router.navigate(['relatorio']);
  }

  public goToMateria(){
    this._router.navigate(['materia'], {queryParams: {type: "create"} });
  }

  public goToEditarMateria(){
    this._router.navigate(['materia'], {queryParams: {type: "edit"} });
  }

  public goToVisualizarMateria(){
    this._router.navigate(['materia/view']);
  }

  public goToAluno(){
    this._router.navigate(['aluno']);
  }

  public goToLogout(){
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
