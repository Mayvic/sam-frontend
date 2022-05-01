import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AvaliacaoComponent } from './avaliacao/avaliacao.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { AlunoComponent } from './aluno/aluno.component';
import { MateriaComponent } from './materia/materia.component';
import { ViewMateriaComponent } from './view-materia/view-materia.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'avaliacao', component: AvaliacaoComponent },
  { path: 'relatorio', component: RelatorioComponent },
  { path: 'aluno', component: AlunoComponent },
  { path: 'materia', component: MateriaComponent },
  { path: 'materia/view', component: ViewMateriaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
