import { AppService } from './../app.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private _router: Router,
    private _service: AppService,
    ) { }

  ngOnInit(): void {
  }

  public goToAvaliacao(){
    console.log("avaliacao");
    this._router.navigate(['avaliacao']);
  }

  public goToRelatorio(){
    console.log("relatorio");

    this._router.navigate(['relatorio']);
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
