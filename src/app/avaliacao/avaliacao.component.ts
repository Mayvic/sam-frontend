import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
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

  public materiaForm: FormGroup;
  public professorForm: FormGroup;
  public alunoForm: FormGroup;

  avaliacaoForm: FormGroup;
  
  constructor(
    private _formBuilder: FormBuilder,
  ) { }
  
  ngOnInit(): void {

      this.avaliacaoForm = this._initForm(null);
      console.log("form", this.avaliacaoForm)
      console.log("form2", this.avaliacaoForm.get('materia'))
      console.log("materia form", this.materiaForm.controls)

    //PERGUNTAS MATERIAS
    this.perguntasMateria.push(this._criarPergunta("A materia foi apresentada com clareza?","clareza"));
    this.perguntasMateria.push(this._criarPergunta("A materia é relevante para sua formação?","relevancia"));
    this.perguntasMateria.push(this._criarPergunta("A ementa foi cumprida?","ementa"));
    this.perguntasMateria.push(this._criarPergunta("O conteúdo foi bem distribuido ao longo do período?","distribuicao"));
    this.perguntasMateria.push(this._criarPergunta("O material recomendado foi bom?","material"));
    this.perguntasMateria.push(this._criarPergunta("O laboratório foi bem utilizado?","lab", null, true));
    this.perguntasMateria.push(this._criarPergunta("A dificuldade da matéria estava nivelada com a turma?","dificuldade"));

    // //PERGUNTAS PROFESSOR
    // this.perguntasProfessor.push(this._criarPergunta("O professor domina o conteúdo da matéria?"));
    // this.perguntasProfessor.push(this._criarPergunta("O professor se expressa de forma clara?"));
    // this.perguntasProfessor.push(this._criarPergunta("A apresentação em sala do conteúdo foi adequada? (slide, quadro e etc)?"));
    // this.perguntasProfessor.push(this._criarPergunta("As avaliações produzidas pelo professor foram compatíveis com o apresentado na matéria?"));
    // this.perguntasProfessor.push(this._criarPergunta("O professor esteve disponível para dúvidas? (em sala, emails e etc)"));
    // this.perguntasProfessor.push(this._criarPergunta("O professor foi frequente e pontual?"));
    // this.perguntasProfessor.push(this._criarPergunta("Faria alguma outra matéria com o professor ou o indicaria para outros alunos?"));


    // //PERGUNTAS ALUNO
    // this.perguntasAluno.push(this._criarPergunta("Quantas vezes cursou a matéria?", ["1", "2", "3", "4", "5+"]));
    // this.perguntasAluno.push(this._criarPergunta("Participava e estava presente nas aulas?"));
    // this.perguntasAluno.push(this._criarPergunta("Teve entendimento do conteúdo?"));
    // this.perguntasAluno.push(this._criarPergunta("Esforçou-se durante a matéria?"));
    // this.perguntasAluno.push(this._criarPergunta("Os pre-requisitos da matéria são justos e suficientes?"));
    // this.perguntasAluno.push(this._criarPergunta("Faria outra matéria da mesma aréa desta?"));
    // this.perguntasAluno.push(this._criarPergunta("Adquiriu conhecimento durante a disciplina?"));

    
  }

  private _criarPergunta(titulo: string, label: string, textosOpt: string[] = null, naoSeAplica: boolean = false ){
    return { titulo, label, textosOpt, naoSeAplica }
  }
  public criarAvaliacao(){
    console.log("formulario criado", this.avaliacaoForm)
  }

  private _initForm(avaliacao: any): FormGroup {
    let form = this._formBuilder.group({
     
      alunoId: [{ value: (avaliacao && avaliacao.alunoId ? avaliacao.alunoId : null)}, Validators.required],
      materiaId: [{ value: (avaliacao && avaliacao.materiaId ? avaliacao.materiaId : null)}, Validators.required],
      materia: this.getMateriaForm(avaliacao),

     professor: this._formBuilder.group({
       dominio: [{ value: (avaliacao && avaliacao.dominio ? avaliacao.dominio : null)}, Validators.required],
       didatica: [{ value: (avaliacao && avaliacao.didatica ? avaliacao.didatica : null)}, Validators.required],
       apresentacao: [{ value: (avaliacao && avaliacao.apresentacao ? avaliacao.apresentacao : null)}, Validators.required],
       avaliacoes: [{ value: (avaliacao && avaliacao.avaliacoes ? avaliacao.avaliacoes : null)}, Validators.required],
       disponibilidade: [{ value: (avaliacao && avaliacao.disponibilidade ? avaliacao.disponibilidade : null)}, Validators.required],
       assiduidade: [{ value: (avaliacao && avaliacao.assiduidade ? avaliacao.assiduidade : null)}, Validators.required],
       indicaria: [{ value: (avaliacao && avaliacao.indicaria ? avaliacao.indicaria : null)}, Validators.required],
     }),
  
     aluno: this._formBuilder.group({
       primeiraVez: [{ value: (avaliacao && avaliacao.primeiraVez ? avaliacao.primeiraVez : null)}, Validators.required],
       frequencia: [{ value: (avaliacao && avaliacao.frequencia ? avaliacao.frequencia : null)}, Validators.required],
       entendimento: [{ value: (avaliacao && avaliacao.entendimento ? avaliacao.entendimento : null)}, Validators.required],
       esforco: [{ value: (avaliacao && avaliacao.esforco ? avaliacao.esforco : null)}, Validators.required],
       preReq: [{ value: (avaliacao && avaliacao.preReq ? avaliacao.preReq : null)}, Validators.required],
       area: [{ value: (avaliacao && avaliacao.area ? avaliacao.area : null)}, Validators.required],
       conhecimento: [{ value: (avaliacao && avaliacao.conhecimento ? avaliacao.conhecimento : null)}, Validators.required],
     }),

      comentarios: [{ value: (avaliacao && avaliacao.comentarios ? avaliacao.comentarios : null)}, Validators.required],
   });

    return form;
  }

  private getMateriaForm(avaliacao: any){
    let form = this._formBuilder.group({
      clareza: [{ value: (avaliacao && avaliacao.clareza ? avaliacao.clareza : null)}, Validators.required],
      relevancia: [{ value: (avaliacao && avaliacao.relevancia ? avaliacao.relevancia : null)}, Validators.required],
      ementa: [{ value: (avaliacao && avaliacao.ementa ? avaliacao.ementa : null)}, Validators.required],
      distribuicao: [{ value: (avaliacao && avaliacao.distribuicao ? avaliacao.distribuicao : null)}, Validators.required],
      material: [{ value: (avaliacao && avaliacao.material ? avaliacao.material : null)}, Validators.required],
      lab: [{ value: (avaliacao && avaliacao.lab ? avaliacao.lab : null)}, Validators.required],
      dificuldade: [{ value: (avaliacao && avaliacao.dificuldade ? avaliacao.dificuldade : null)}, Validators.required],
   });

   this.materiaForm = form as FormGroup;
   return form;
  }

}
