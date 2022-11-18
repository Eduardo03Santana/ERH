// ANGULAR-IMPORTS
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';


// APP-IMPORTS
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Error404Component } from './error404/error404.component';
import { DepartamentoComponent } from './departamento/departamento.component';

// NGX-IMPORTS
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    FuncionarioComponent,
    DepartamentoComponent,
    HomeComponent,
    NavBarComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TooltipModule.forRoot(),
    AlertModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule,
    SortableModule.forRoot()
    
  ],
  providers: [BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
