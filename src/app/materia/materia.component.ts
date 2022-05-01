import { AppService } from './../app.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {
  public typeView = "create";

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
    this._getTypeView();
    this._getProfessores();
    this._getAnos();

    this._initForm(null).subscribe(resultado => {
      this.materiaForm = resultado;
    });

    this._initPeriodoForm().subscribe(resultado => {
      this.periodoForm = resultado;
    });

    if(this.typeView === "edit"){
      this._getMaterias();
    } else if (this.typeView === "create"){
      this. isMateriaSelecionada = true;
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
          this._initForm(response).subscribe(resultado => {
            this.materiaForm = resultado;
          });

          let periodo = response.periodo.split('.');

          this.periodoForm.controls['ano'].setValue(periodo[0]);
          this.periodoForm.controls['periodo'].setValue(Number(periodo[1]));
          this.isMateriaSelecionada = true;  

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
    const ano = Number(date.getFullYear());

    for(let i=0; i < 5; i++){
      this.anos = [...this.anos,(ano+i).toString()];
    }
  }

  public criarMateria() {
    this._preparePeriodo();
    this.materiaForm.removeControl('materiaId');
    this.materiaForm.removeControl('codigo_entrada');
    if (!this.materiaForm.valid) this.materiaForm.markAllAsTouched();
    else {
      this._service.criarMateria(this.materiaForm.getRawValue())
        .subscribe(
          response => {
            if (response) alert('Matéria criada com sucesso');
            this._router.navigate(['materia/view']);

          }, err => {
            alert(`error ${err?.error?.error}`);
            console.log("error", err);
          });

    }
  }

  public editarMateria() {
    this._preparePeriodo();
    if (!this.materiaForm.valid) this.materiaForm.markAllAsTouched();
    else {
      this._service.editarMateria(this.materiaForm.getRawValue())
        .subscribe(
          response => {
            if (response) alert('Matéria editada com sucesso');
            this._router.navigate(['materia/view']);
          }, err => {
            alert(`error ${err?.error?.error}`);
            console.log("error", err);
          });
    }
  }

  private _getProfessores(){
    this._service.getProfessores()
    .subscribe(
    response => {
      this.professores = response;
      if(response.length == 0)  alert("Não há professores cadastrados");
    },err => {
        alert("error");
        console.log("error", err);
    });
  }

  private _preparePeriodo(){
    this.materiaForm.controls["periodo"].setValue(`${this.periodoForm.get("ano").value}.${this.periodoForm.get("periodo").value}`)
  }

  private _initForm(materia: any): Observable<FormGroup> {
    let form = this._formBuilder.group({
      materiaId: [{value: (materia && materia.id ? materia.id : null), disabled: this.typeView === 'create' }, { validators: [Validators.required] }],
      nome: [ materia && materia.nome ? materia.nome : "", { validators: [Validators.required] }],
      codigo: [materia && materia.codigo ? materia.codigo : null, { validators: [Validators.required] }],
      periodo: [materia && materia.periodo ? materia.periodo : null, { validators: [Validators.required] }],
      professorId: [materia && materia.professor.id ? materia.professor.id : null, { validators: [Validators.required] }],
      descricao: [materia && materia.descricao ? materia.descricao : null, { validators: [Validators.required] }],
      codigo_entrada: [{value: materia && materia.codigo_entrada ? materia.codigo_entrada : null, disabled: true}, { validators: [Validators.required] }],

    });

    return new Observable<FormGroup>(observer => observer.next(form));
  }

  private _initPeriodoForm(): Observable<FormGroup> {
    let form = this._formBuilder.group({
      ano: [this.anos[0], { validators: [Validators.required] }],
      periodo: [this.periodos[2] , { validators: [Validators.required] }],
    });  

    return new Observable<FormGroup>(observer => observer.next(form));
  }

}



