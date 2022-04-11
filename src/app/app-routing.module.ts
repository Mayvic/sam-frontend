import { ToolbarComponent } from './toolbar/toolbar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AvaliacaoComponent } from './avaliacao/avaliacao.component';
import { RelatorioComponent } from './relatorio/relatorio.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'avaliacao', component: AvaliacaoComponent },
  { path: 'relatorio', component: RelatorioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
