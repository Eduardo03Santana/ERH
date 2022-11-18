import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


// APP IMPORTS
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { DepartamentoComponent } from './departamento/departamento.component';
import { Error404Component } from './error404/error404.component'


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'Home', title:"Home" },
  { path: 'Home', component: HomeComponent },
  { path: 'Funcionarios', component: FuncionarioComponent },
  { path: 'Departamentos', component: DepartamentoComponent },
  { path: '**', component: Error404Component }
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
