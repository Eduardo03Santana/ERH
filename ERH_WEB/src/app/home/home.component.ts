import { Component, NgModule, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Departamento } from '../models/departamento';
import { DepartamentosService } from '../services/departamento.service'



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public departamentos: Departamento[];
  public title: Title;
  constructor(departamento: DepartamentosService, title: Title) {
    departamento.getAll().subscribe(result => {
      this.departamentos = result;
      console.warn(this.departamentos[0]);
    }, error => console.error(error));
    this.departamentos = [];
    title.setTitle("Home")
    this.title = title;

  }

  ngOnInit(): void {
  }
}
