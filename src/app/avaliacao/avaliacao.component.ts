import { AppService } from './../app.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css']
})
export class AvaliacaoComponent implements OnInit {
  public perguntasMateria = [];
  public perguntasProfessor = [];
  public perguntasAluno = [];
  public anos = [];
  public periodos = [0,1,2,3,4,5];


  public materias = [];
  public materiaSelecionada;

  public avaliacaoForm: FormGroup;
  public periodoForm: FormGroup;
  
  constructor(
    private _service: AppService,
    private _formBuilder: FormBuilder,
    private _router: Router,
  ) { }
  
  ngOnInit(): void {

     this._initForm(null).subscribe(resultado => {
      this.avaliacaoForm = resultado;
    });

    
    this._getAnos();

    this.periodoForm = this._formBuilder.group({
    
      ano: [ this.anos[0], { validators: [Validators.required] }],
      periodo: [ this.periodos[2] , { validators: [Validators.required] }],
    });  

    this._iniciaPerguntasMateria();
    this._iniciaPerguntasProfessor();
    this._iniciaPerguntasAluno();

    this._getMaterias();

    
    
    }

  private _criarPergunta(titulo: string, label: string, textosOpt: string[] = null, naoSeAplica: boolean = false ){
    return { titulo, label, textosOpt, naoSeAplica }
  }

  public criarAvaliacao(){
    if(!this.avaliacaoForm.valid) this.avaliacaoForm.markAllAsTouched();
    else{
      this._service.criarAvaliacao(this.avaliacaoForm.getRawValue())
      .subscribe(
        response => {
        if(response)alert('Avaliação criada com sucesso');
        this._router.navigate(['relatorio']);

      },err => {
        alert(`error ${err?.error?.error}`);
        console.log("error", err);
      });

    }
  }

  public selecionaMateria(data: any){
    this.materiaSelecionada = data;
  }

  private _getMaterias(){
    this._service.getMaterias(this.periodoForm.getRawValue(), 0)
    .subscribe(
    response => {
      this.materias = response;
      if(response.length == 0)  alert("Não há matérias nesse período");
    },err => {
        alert("error");
        console.log("error", err);
    });
  }

  private _getAnos(){
    const date = new Date();
    const ano = date.getFullYear();

    this.anos = [(ano-1).toString(), ano.toString()];
  }

  private _iniciaPerguntasMateria(){
    //PERGUNTAS MATERIAS
    this.perguntasMateria.push(this._criarPergunta("A materia foi apresentada com clareza?","clareza"));
    this.perguntasMateria.push(this._criarPergunta("A materia é relevante para sua formação?","relevancia"));
    this.perguntasMateria.push(this._criarPergunta("A ementa foi cumprida?","ementa"));
    this.perguntasMateria.push(this._criarPergunta("O conteúdo foi bem distribuido ao longo do período?","distribuicao"));
    this.perguntasMateria.push(this._criarPergunta("O material recomendado foi bom?","material"));
    this.perguntasMateria.push(this._criarPergunta("O laboratório foi bem utilizado?","lab", null, true));
    this.perguntasMateria.push(this._criarPergunta("A dificuldade da matéria estava nivelada com a turma?","dificuldade"));
  }

  private _iniciaPerguntasProfessor(){
    //PERGUNTAS PROFESSOR
    this.perguntasProfessor.push(this._criarPergunta("O professor domina o conteúdo da matéria?","dominio"));
    this.perguntasProfessor.push(this._criarPergunta("O professor se expressa de forma clara?","didatica" ));
    this.perguntasProfessor.push(this._criarPergunta("A apresentação em sala do conteúdo foi adequada? (slide, quadro e etc)?","apresentacao"));
    this.perguntasProfessor.push(this._criarPergunta("As avaliações produzidas pelo professor foram compatíveis com o apresentado na matéria?","avaliacoes"));
    this.perguntasProfessor.push(this._criarPergunta("O professor esteve disponível para dúvidas? (em sala, emails e etc)","disponibilidade"));
    this.perguntasProfessor.push(this._criarPergunta("O professor foi frequente e pontual?","assiduidade"));
    this.perguntasProfessor.push(this._criarPergunta("Faria alguma outra matéria com o professor ou o indicaria para outros alunos?","indicaria"));

  }

  private _iniciaPerguntasAluno(){
    //PERGUNTAS ALUNO
    this.perguntasAluno.push(this._criarPergunta("Quantas vezes cursou a matéria?","primeiraVez", ["1", "2", "3", "4", "5+"]));
    this.perguntasAluno.push(this._criarPergunta("Participava e estava presente nas aulas?","frequencia"));
    this.perguntasAluno.push(this._criarPergunta("Teve entendimento do conteúdo?","entendimento"));
    this.perguntasAluno.push(this._criarPergunta("Esforçou-se durante a matéria?","esforco"));
    this.perguntasAluno.push(this._criarPergunta("Os pre-requisitos da matéria são justos e suficientes?","preReq"));
    this.perguntasAluno.push(this._criarPergunta("Faria outra matéria da mesma aréa desta?","area"));
    this.perguntasAluno.push(this._criarPergunta("Adquiriu conhecimento durante a disciplina?","conhecimento"));
  
  }

  private _initForm(avaliacao: any): Observable<FormGroup> {
    let form = this._formBuilder.group({
     
      materiaId: [ avaliacao && avaliacao.materiaId ? avaliacao.materiaId : null, { validators: [Validators.required] }],
      codigo: [ avaliacao && avaliacao.codigo ? avaliacao.codigo : null, { validators: [Validators.required] }],
      
      materia: this._formBuilder.group({
        clareza: [ avaliacao && avaliacao.clareza ? avaliacao.clareza : null, { validators: [Validators.required] }],
        relevancia: [ avaliacao && avaliacao.relevancia ? avaliacao.relevancia : null, { validators: [Validators.required] }],
        ementa: [ avaliacao && avaliacao.ementa ? avaliacao.ementa : null, { validators: [Validators.required] }],
        distribuicao: [ avaliacao && avaliacao.distribuicao ? avaliacao.distribuicao : null, { validators: [Validators.required] }],
        material: [ avaliacao && avaliacao.material ? avaliacao.material : null, { validators: [Validators.required] }],
        lab: [ avaliacao && avaliacao.lab ? avaliacao.lab : null, { validators: [Validators.required] }],
        dificuldade: [ avaliacao && avaliacao.dificuldade ? avaliacao.dificuldade : null, { validators: [Validators.required] }],
     }),

     professor: this._formBuilder.group({
       dominio: [ avaliacao && avaliacao.dominio ? avaliacao.dominio : null, { validators: [Validators.required] }],
       didatica: [ avaliacao && avaliacao.didatica ? avaliacao.didatica : null, { validators: [Validators.required] }],
       apresentacao: [ avaliacao && avaliacao.apresentacao ? avaliacao.apresentacao : null, { validators: [Validators.required] }],
       avaliacoes: [ avaliacao && avaliacao.avaliacoes ? avaliacao.avaliacoes : null, { validators: [Validators.required] }],
       disponibilidade: [ avaliacao && avaliacao.disponibilidade ? avaliacao.disponibilidade : null, { validators: [Validators.required] }],
       assiduidade: [ avaliacao && avaliacao.assiduidade ? avaliacao.assiduidade : null, { validators: [Validators.required] }],
       indicaria: [ avaliacao && avaliacao.indicaria ? avaliacao.indicaria : null, { validators: [Validators.required] }],
     }),
  
     aluno: this._formBuilder.group({
       primeiraVez: [ avaliacao && avaliacao.primeiraVez ? avaliacao.primeiraVez : null, { validators: [Validators.required] }],
       frequencia: [ avaliacao && avaliacao.frequencia ? avaliacao.frequencia : null, { validators: [Validators.required] }],
       entendimento: [ avaliacao && avaliacao.entendimento ? avaliacao.entendimento : null, { validators: [Validators.required] }],
       esforco: [ avaliacao && avaliacao.esforco ? avaliacao.esforco : null, { validators: [Validators.required] }],
       preReq: [ avaliacao && avaliacao.preReq ? avaliacao.preReq : null, { validators: [Validators.required] }],
       area: [ avaliacao && avaliacao.area ? avaliacao.area : null, { validators: [Validators.required] }],
       conhecimento: [ avaliacao && avaliacao.conhecimento ? avaliacao.conhecimento : null, { validators: [Validators.required] }],
     }),

      comentarios: [ avaliacao && avaliacao.comentarios ? avaliacao.comentarios : null],
   });

    return new Observable<FormGroup>(observer => observer.next(form));
  }

  ngAfterViewInit() {
    this.periodoForm.valueChanges.subscribe(value => {
      this._getMaterias();
      this.materiaSelecionada = null;
      this.avaliacaoForm.controls['materiaId'].setValue(null);
    });
  }
}

