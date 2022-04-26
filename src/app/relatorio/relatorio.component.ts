import { AppService } from './../app.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {
  public perguntasMateria = [];
  public perguntasProfessor = [];
  public perguntasAluno = [];

  public anos = [];
  public periodos = [0,1,2,3,4,5];

  public materias = [];
  public materiaSelecionada;
  public textosOpt = [
    "Discordo Completamente",
    "Discordo",
    "Neutro",
    "Concordo",
    "Concordo Completamente"
  ]

  public relatorioForm: FormGroup;
  public periodoForm: FormGroup;
  
  constructor(
    private _service: AppService,
    private _formBuilder: FormBuilder,
  ) { }
  
  ngOnInit(): void {

    this._initForm(null).subscribe(resultado => {
     this.relatorioForm = resultado;
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
 
  public selecionaMateria(data: any){
    this.materiaSelecionada = data;

    this._service.getRelatorioMateria(data.id)
    .subscribe(
      response=>{
        this._initForm(response).subscribe(resultado => {
          this.relatorioForm = resultado;
         });
        
    },err => {
      if (err.status == 400){
        alert("Erro ao pegar o relatório");
      }
      console.log("error", err);
    })

    

  }

  private _getMaterias(){
    this._service.getMaterias(this.periodoForm.getRawValue())
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

  private _initForm(relatorio: any): Observable<FormGroup> {
    let form = this._formBuilder.group({
     
      materiaId: [ relatorio && relatorio.materiaId ? relatorio.materiaId : null, { validators: [Validators.required] }],
      count: [ relatorio && relatorio.count ? relatorio.count : 0, { validators: [Validators.required] }],
      
      materia: this._formBuilder.group({
        clareza: relatorio && relatorio.materia.clareza ? this.getCamposRelatorio(relatorio.materia.clareza) : null,
        relevancia: relatorio && relatorio.materia.relevancia ? this.getCamposRelatorio(relatorio.materia.relevancia) : null,
        ementa: relatorio && relatorio.materia.ementa ? this.getCamposRelatorio(relatorio.materia.ementa) : null,
        distribuicao: relatorio && relatorio.materia.distribuicao ? this.getCamposRelatorio(relatorio.materia.distribuicao) : null,
        material: relatorio && relatorio.materia.material ? this.getCamposRelatorio(relatorio.materia.material) : null,
        lab: relatorio && relatorio.materia.lab ? this.getCamposRelatorio(relatorio.materia.lab, true) : null,
        dificuldade: relatorio && relatorio.materia.dificuldade ? this.getCamposRelatorio(relatorio.materia.dificuldade) : null,
     }),

     professor: this._formBuilder.group({
       dominio: relatorio && relatorio.professor.dominio ? this.getCamposRelatorio(relatorio.professor.dominio) : null,
       didatica: relatorio && relatorio.professor.didatica ? this.getCamposRelatorio(relatorio.professor.didatica) : null,
       apresentacao: relatorio && relatorio.professor.apresentacao ? this.getCamposRelatorio(relatorio.professor.apresentacao) : null,
       avaliacoes: relatorio && relatorio.professor.avaliacoes ? this.getCamposRelatorio(relatorio.professor.avaliacoes) : null,
       disponibilidade: relatorio && relatorio.professor.disponibilidade ? this.getCamposRelatorio(relatorio.professor.disponibilidade) : null,
       assiduidade: relatorio && relatorio.professor.assiduidade ? this.getCamposRelatorio(relatorio.professor.assiduidade) : null,
       indicaria: relatorio && relatorio.professor.indicaria ? this.getCamposRelatorio(relatorio.professor.indicaria) : null,
     }),
  
     aluno: this._formBuilder.group({
       primeiraVez: relatorio && relatorio.aluno.primeira_vez ? this.getCamposRelatorio(relatorio.aluno.primeira_vez) : null,
       frequencia: relatorio && relatorio.aluno.frequencia ? this.getCamposRelatorio(relatorio.aluno.frequencia) : null,
       entendimento: relatorio && relatorio.aluno.entendimento ? this.getCamposRelatorio(relatorio.aluno.entendimento) : null,
       esforco: relatorio && relatorio.aluno.esforco ? this.getCamposRelatorio(relatorio.aluno.esforco) : null,
       preReq: relatorio && relatorio.aluno.pre_req ? this.getCamposRelatorio(relatorio.aluno.pre_req) : null,
       area: relatorio && relatorio.aluno.area ? this.getCamposRelatorio(relatorio.aluno.area) : null,
       conhecimento: relatorio && relatorio.aluno.conhecimento ? this.getCamposRelatorio(relatorio.aluno.conhecimento) : null,
     }),

      comentarios: relatorio && relatorio.comentarios ? this.getCampoComentario(relatorio.comentarios) : null,
   });   
   return new Observable<FormGroup>(observer => observer.next(form));
  }
  
  private getCamposRelatorio(pergunta: any, naoSeAplica?: boolean){
    if(naoSeAplica){
      return this._formBuilder.group({
        0: [ pergunta && pergunta["0"] ? pergunta["0"] : 0],
        1: [ pergunta && pergunta["1"] ? pergunta["1"] : 0],
        2: [ pergunta && pergunta["2"] ? pergunta["2"] : 0],
        3: [ pergunta && pergunta["3"] ? pergunta["3"] : 0],
        4: [ pergunta && pergunta["4"] ? pergunta["4"] : 0],
        5: [ pergunta && pergunta["5"] ? pergunta["5"] : 0],
      });
    }else{
      return this._formBuilder.group({
        1: [ pergunta && pergunta["1"] ? pergunta["1"] : 0],
        2: [ pergunta && pergunta["2"] ? pergunta["2"] : 0],
        3: [ pergunta && pergunta["3"] ? pergunta["3"] : 0],
        4: [ pergunta && pergunta["4"] ? pergunta["4"] : 0],
        5: [ pergunta && pergunta["5"] ? pergunta["5"] : 0],
      });
    }
  }

  private getCampoComentario(comentarios: any): FormArray{
    let comentarioForm = comentarios.map(comentario => {
      return this._formBuilder.control(comentario);
    });
    return this._formBuilder.array(comentarioForm);

  }
  ngAfterViewInit() {
    this.periodoForm.valueChanges.subscribe(value => {
      this._getMaterias();
      this.materiaSelecionada = null;
      this.relatorioForm.controls['materiaId'].setValue(null);
    });
  }
}
