import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AvaliacaoComponent } from './avaliacao/avaliacao.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import {MatRadioModule} from '@angular/material/radio';
import { CustomRadioComponent } from './custom-radio/custom-radio.component';
import {MatSelectModule} from '@angular/material/select';
import { AlunoComponent } from './aluno/aluno.component';
import { MateriaComponent } from './materia/materia.component';
import { ViewMateriaComponent } from './view-materia/view-materia.component';
@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LoginComponent,
    AvaliacaoComponent,
    CustomRadioComponent,
    RelatorioComponent,
    AlunoComponent,
    MateriaComponent,
    ViewMateriaComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
  ],
  providers: [MatIconRegistry,],
  bootstrap: [AppComponent]
})
export class AppModule { }
