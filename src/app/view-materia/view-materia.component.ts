import { AppService } from './../app.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-view-materia',
  templateUrl: './view-materia.component.html',
  styleUrls: ['./view-materia.component.css']
})
export class ViewMateriaComponent implements OnInit {

  public professores = [];
  public anos = [];
  public periodos = [0,1,2,3,4,5];
  public materias = [];
  public isMateriaSelecionada = false;

  public materiaForm: FormGroup;
  public periodoForm: FormGroup;

  constructor(
    private _service: AppService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this._initForm(null).subscribe(resultado => {
      this.materiaForm = resultado;
    });
    
      this._getMaterias();
   
  }

  private _getMaterias(){
    this._service.getMaterias()
    .subscribe(
    response => {
      this.materias = response;
      if(response.length == 0)  alert("Não há matérias cadastradas");
    },err => {
        alert("error");
        console.log("error", err);
    });
  }

  public getUmaMateria(id: string) {

    this._service.getUmaMateria(id)
      .subscribe(
        response => {
          this._initForm(response).subscribe(resultado => {
            this.materiaForm = resultado;
          });

          let periodo = response.periodo.split('.');

          this.periodoForm = this._formBuilder.group({
            ano: [{value: Number(periodo[0]), disabled: true}, { validators: [Validators.required] }],
            periodo: [{value: Number(periodo[1]), disabled: true}, { validators: [Validators.required] }],
          });
          this.isMateriaSelecionada = true;  

        }, err => {
          alert(`error ${err?.error?.error}`);
          console.log("error", err);
        });

  }

  private _initForm(materia: any): Observable<FormGroup> {
    let form = this._formBuilder.group({

      materiaId: [materia && materia.id ? materia.id : null, { validators: [Validators.required] }],
      nome: [ materia && materia.nome ? materia.nome : null, { validators: [Validators.required] }],
      codigo: [{value: materia && materia.codigo ? materia.codigo : null, disabled: true }, { validators: [Validators.required] }],
      periodo: [{value: materia && materia.periodo ? materia.periodo : null, disabled: true }, { validators: [Validators.required] }],
      professorName: [{value: materia && materia.professor.user.name ? materia.professor.user.name : null, disabled: true }],
      descricao: [{value: materia && materia.descricao ? materia.descricao : null, disabled: true }, { validators: [Validators.required] }],
      codigo_entrada: [{value: materia && materia.codigo_entrada ? materia.codigo_entrada : null, disabled: true}, { validators: [Validators.required] }],

    });

    return new Observable<FormGroup>(observer => observer.next(form));
  }

  ngAfterViewInit() {

  }

}




