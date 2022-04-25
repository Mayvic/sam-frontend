import { AppService } from './../app.service';
import { debounceTime, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {
  public typeView = "view";

  public professores = [];
  public anos = [];
  public periodos = [0,1,2,3,4,5];
  public materias = [];

  public materiaForm: FormGroup;
  public periodoForm: FormGroup;

  constructor(
    private _service: AppService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this._getTypeView();

    if(this.typeView !== "view") {
      this._getProfessores();
      
      this._getAnos();
    }
    
    if(this.typeView !== "create"){
      this._getMaterias();
    }else{
      this._initForm(null).subscribe(resultado => {
        this.materiaForm = resultado;
      });

      this.periodoForm = this._formBuilder.group({
        ano: [this.anos[0], { validators: [Validators.required] }],
        periodo: [this.periodos[2] , { validators: [Validators.required] }],
      });  
    }

   
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
          console.log("response", response)
          this.materias = response;
          this._initForm(this.materias).subscribe(resultado => {
            this.materiaForm = resultado;
          });

          let periodo = response.periodo.slice('.');

          this.periodoForm = this._formBuilder.group({
            ano: [periodo[0], { validators: [Validators.required] }],
            periodo: [periodo[1] , { validators: [Validators.required] }],
          });  

        }, err => {
          alert(`error ${err?.error?.error}`);
          console.log("error", err);
        });

  }

  private _getTypeView() {
    this.activatedRoute.queryParams.subscribe((param) => {
      if(param['type']) this.typeView = param['type'];
    })
  }

  private _getAnos(){
    const date = new Date();
    const ano = date.getFullYear();

    for(let i=0; i < 5; i++){
      this.anos = [...this.anos,(ano+i).toString()];
    }
  }


  public criarMateria() {
    console.log("form", this.materiaForm)
    this.materiaForm.removeControl('id');
    this.materiaForm.removeControl('professorName');
    if (!this.materiaForm.valid) this.materiaForm.markAllAsTouched();
    else {
      console.log("cadastro");
      this._service.criarMateria(this.materiaForm.getRawValue())
        .subscribe(
          response => {
            if (response) alert('Matéria criada com sucesso');
            this._router.navigate(['materia'], {queryParams: {type: "view"} });

          }, err => {
            alert(`error ${err?.error?.error}`);
            console.log("error", err);
          });

    }
  }

  public editarMateria() {
    if (!this.materiaForm.valid) this.materiaForm.markAllAsTouched();
    else {
      this._service.editarMateria(this.materiaForm.getRawValue())
        .subscribe(
          response => {
            if (response) alert('Matéria editada com sucesso');
            this._router.navigate(['materia'], {queryParams: {type: "view"} });

          }, err => {
            alert(`error ${err?.error?.error}`);
            console.log("error", err);
          });

    }
  }


  private _initForm(materia: any): Observable<FormGroup> {
    let form = this._formBuilder.group({

      id: [materia && materia.id ? materia.id : null, { validators: [Validators.required] }],
      nome: [materia && materia.nome ? materia.nome : null, { validators: [Validators.required] }],
      descricao: [materia && materia.descricao ? materia.descricao : null, { validators: [Validators.required] }],
      codigo: [materia && materia.codigo ? materia.codigo : null, { validators: [Validators.required] }],
      codigo_entrada: [materia && materia.codigo_entrada ? materia.codigo_entrada : null, { validators: [Validators.required] }],
      periodo: [materia && materia.periodo ? materia.periodo : null, { validators: [Validators.required] }],
      professorId: [materia && materia.professor.id ? materia.professor.id : null, { validators: [Validators.required] }],
      professorName: [materia && materia.professor.user.name ? materia.professor.user.name : null],

    });

    return new Observable<FormGroup>(observer => observer.next(form));
  }

  private _getProfessores(){
    this._service.getMaterias(this.materiaForm.getRawValue(), 0)
    .subscribe(
    response => {
      this.professores = response;
      if(response.length == 0)  alert("Não há professores cadastrados");
    },err => {
        alert("error");
        console.log("error", err);
    });
  }

  ngAfterViewInit() {

  }

}



