import { ToolbarComponent } from './toolbar/toolbar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AvaliacaoComponent } from './avaliacao/avaliacao.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'avaliacao', component: AvaliacaoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
